---
title: A preview on Spring Data Kay
source: https://spring.io/blog/2017/06/20/a-preview-on-spring-data-kay
scraped: 2026-02-23T16:28:27.435Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  June 20, 2017 | 1 Comment
---

# A preview on Spring Data Kay

_Engineering | Mark Paluch |  June 20, 2017 | 1 Comment_

As we’ve just shipped the fourth milestone release of Spring Data release train Kay, let’s take a look at the changes and features that come with the 13 modules on the train since our first milestone. This blog post covers a set of changes but is no means comprehensive of the 550+ changes between M2 and M4. To get a full list of changes, take a look into our [Jira](https://jira.spring.io/issues/?filter=15640) for [Kay M1](https://jira.spring.io/issues/?filter=15455), [M2](https://jira.spring.io/issues/?filter=15456), [M3](https://jira.spring.io/issues/?filter=15537), and [M4](https://jira.spring.io/issues/?filter=15637) changes.

Here’s a curated list of our key changes:

-   Adjustments in the reactive support
    
-   Composable repositories
    
-   Improved naming scheme for CRUD methods
    
-   Fluent MongoOperations API
    
-   Kotlin extension for MongoDB’s Template API
    
-   MongoDB Collation Support
    
-   Redis client configuration
    
-   Cassandra Lightweight transaction support and Query/Update objects
    
-   Java 9 compatibility
    
-   Upgrade to Elasticsearch 5.4
    

We’d love to hear your feedback and you’ll find how to get in touch with us at the end of this post.

## [](#changes-in-our-reactive-support)[](#changes-in-our-reactive-support)Changes in our reactive support

After we laid some [significant groundwork](https://spring.io/blog/2016/11/28/going-reactive-with-spring-data) with our initial draft for reactive data access with Redis, Cassandra and MongoDB late last year, Couchbase has joined the reactive party. The Couchbase driver is fully reactive built on RxJava 1, so the reactive Template API uses RxJava 1. Couchbase repositories work smoothly with RxJava 1 & 2 and Reactive Stream types.

Meanwhile, we added support for RxJava 2 types with our predefined `RxJava2CrudRepository` and `RxJava2SortingRepository` interfaces so you can use RxJava 2 types with all reactive repositories (Apache Cassandra, Couchbase, and MongoDB).

```
Copy@Repository
interface RxJava2PersonRepostitory extends
                    RxJava2SortingRepository<Person, String> {

  Flowable<Person> findByFirstnameAndLastname(String firstname, String lastname);

  Maybe<Person> findByLastname(String lastname);

  Single<Person> findProjectedByLastname(Maybe<String> lastname);

  Observable<ProjectedPerson> findProjectedByLastname(Single<String> lastname);
}
```

Spring Data goes GA in the next few months. That’s after RxJava 1’s feature freeze which won’t be maintained after March 2018 anymore. Therefore, we decided to deprecate our RxJava 1 repositories and to remove them with the upcoming release candidate. Rest assured, RxJava 1 support remains functional so you can copy these interfaces into your project code if you require RxJava 1 repositories.

If you’re a user of reactive MongoDB repositories, you might be interested to hear that we renamed `@InfiniteStream` to `@Tailable` to reflect the underlying cursor although infinite stream sounds quite fancy.

## [](#composable-repositories)[](#composable-repositories)Composable repositories

Spring Data Repositories are a tool to implement DDD-style repositories. The implementation of them has been designed to consist of 3 major parts: a store-specific base implementation, a query execution engine to back query methods and an optional custom implementation to link customized functionality into a repository instance.

Over time, we found that our initial design was limited when it comes to repository implementation aspects. A repository can provide Query-by-Example operations via `QueryByExampleExecutor` or Querydsl support though `QuerydslPredicateExecutor`. Both are orthogonal features to a store-specific base repository implementation and required some trickery to work.

The situation is similar to the custom implementation part: only a single custom implementation object was supported which required to bring all functionality you want to link into the repository object.

Composable repositories eliminate the mentioned design limitations by turning the composition-oriented approach into a first class citizen. A repository no is longer limited to a base implementation and a custom implementation but composed of fragments. A fragment represents an interface along with an implementation object. Multiple fragments form a composition used to implement a repository.

Consider the following repository declaration:

```
Copyclass Person extends Contact {
  // …
}

interface PersonRepository extends CrudRepository<Person, String>,
                                      ContactFragment,
                                      PersonBatchExecutor {
}

interface ContactFragment {
  Iterable<Contact> search(ContactQuery query);
}

interface PersonBatchExecutor {
  void bulkEdit(PersonQuery query, PersonUpdate update);
}
```

Up above, we have a simple domain object `Person` which is also a `Contact`. The repository is composed of CRUD operations: a `Contact` search via `ContactFragment` and some bulk operations through `PersonBatchExecutor`. Each interface repository is a fragment interface backed by an implementation.

Calls to the repository methods are routed according to their method implementations. The CRUD operations get routed to their store-specific implementations while a call to `search(ContactQuery query)` is routed to the user-provided implementation of `ContactFragment` (shown below).

While bootstrapping, the configuration component scans for implementations of the *declared* fragment interfaces:

```
Copyinterface ContactFragment {
  Iterable<Contact> search(ContactQuery query);
}

class ContactFragmentImpl implements ContactFragment {

  @Override
  Iterable<Contact> search(ContactQuery query) {
    // …
  }
}
```

Fragment implementations are fully-featured Spring beans. They are looked up by name using the fragment interface name and adding the implementation postfix, i.e. by default the implementation for `ContactFragment` is looked up as `ContactFragmentImpl`.

### [](#ordering-of-overrides)[](#ordering-of-overrides)Ordering of Overrides

Java allows composition of interfaces that declare the same method multiple times. From an API perspective, multiple methods with the same name and signature are merged into a single method without further differentiation.

On the implementation side, there can be multiple implementations available that declare the same method signature. Composable repositories use the **interface declaration order** to disambiguate amongst multiple implementations.

Look at the following example:

```
Copypublic interface ContactFragment {
  Iterable<Contact> search(ContactQuery query);
}

public interface PersonFragment {
  Iterable<Contact> search(ContactQuery query);
}

// Calls search(…) on ContactFragment
public interface PersonRepository implements CrudRepository<Person, String>,
  ContactFragment, PersonFragment {
  …
}

// Calls search(…) on PersonFragment
public interface PersonRepository implements CrudRepository<Person, String>,
  PersonFragment, ContactFragment {
  …
}
```

The first declaration of `PersonRepository` will first invoke the `search(…)` method on `ContactFragmentImpl` as `ContactFragment` is declared first. Thus, the second declaration will pick `PersonFragmentImpl` for the invocation of the `search(…)` method.

Store-specific aspects (like Querydsl) and the base implementation are fallbacks if no fragment contributes an implementation.

Composite repositories are an option to link custom implementation fragments. They provide a powerful way to define a single query and hook it in without losing the rest of Spring Data’s pre-built options. If you previously used the custom implementation functionality, rest assured, those will continue as expected.

## [](#improved-naming-for-crud-repository-methods)[](#improved-naming-for-crud-repository-methods)Improved naming for CRUD repository methods

In the first generation of Spring Data the naming scheme for methods in `CrudRepository` caused a couple problems. Especially the methods taking parameters that are generic type variables. Under some circumstances (such as domain or identifier type implementing `Iterable`) they could effectively resolve to the same methods and cause ambiguities caused by `save(…)` and `delete(…)`.

With the Kay release, we decided to rename methods guided by:

1.  Be able to find methods by name and (raw) parameter types.
    
2.  Methods named `…All(…)` affect a collection of items and/or return a collection.
    
3.  Methods taking an identifier are named `…ById(…)`.
    
4.  Let’s drop the `ID extends Serializable` requirement.
    

We no longer require `Serializable` identifiers after the method rename. It’s a constraint that was introduced by JPA’s identifier handling while Spring Data was purely used with JPA. Our NoSql stores do not enforce this serializable identifiers so removing this requirement reduces complexity at many places.

The new `CrudRepository` features a consistent naming scheme without causing resolution ambiguities:

```
Copyinterface CrudRepository<T, ID> extends Repository<T, ID> {

    S save(S entity);

    Iterable<S> saveAll(Iterable<S> entities)

    Optional<T> findById(ID id);

    boolean existsById(ID id);

    Iterable<T> findAllById(Iterable<ID> ids);

    void deleteById(ID id);

    void delete(T entity);

    void deleteAll(Iterable<? extends T> entities);
}
```

However, what if you previously had a property named `id` which isn’t the entity identifier? Doesn’t a query method for this property clash with `findById(…)` and the other …ById(…)\` methods?. It does.

If you run in such a scenario, you can insert a custom distinction in your method name, like `findPersonById(…)` if you work with `Person` entities. Spring Data’s method parsing uses prefix keywords like `find`, `exists`, `count`, and `delete` and a terminating `By` keyword. Everything you put in between `find` and `By` makes your method name more expressive and does not affect query derivation.

## [](#fluent-mongooperations-api)[](#fluent-mongooperations-api)Fluent MongoOperations API

The `MongoOperations` interface is one of the central components when it comes to more low level interaction with MongoDB. It offers a wide range of methods covering needs from collection / index creation and CRUD operations to more advanced functionality like map-reduce and aggregations.

Looking at `MongoOperations` one can find multiple overloads for each and every method. Most of them just cover optional / nullable parts of the API. While this can be quite handy, it also gets verbose almost the point of being unreadable.

```
Copy// ...excerpt from MongoOperations

<T> List<T> find(Query query, Class<T> entityClass);
<T> List<T> find(Query query, Class<T> entityClass, String collectionName);

<T> T findOne(Query query, Class<T> entityClass);
<T> T findOne(Query query, Class<T> entityClass, String collectionName);

<T> CloseableIterator<T> stream(Query query, Class<T> entityType);
<T> CloseableIterator<T> stream(Query query, Class<T> entityType, String collectionName);
```

With `FluentMongoOperations` we’ve introduced an interface specifically tailored for common methods of `MongoOperations` providing a more readable, fluent API. The entry points `insert(…)`, `find(…)`, `update(…)`, etc. follow a natural naming schema based on the operation to execute. Moving on from the entry point the API is designed to only offer context dependent methods guiding towards a terminating method that invokes the actual `MongoOperations` counterpart.

Let’s look at a concrete example. Imagine you’ve got a collection of Star Wars characters that includes `Jedi`s. In classic `MongoOperations` style the lookup of all entities in that collection would look something like:

```
CopyQuery query = new BasicQuery(new Document());
List<SWCharacter> all = ops.find(query, SWCharacter.class, "star-wars");
```

Using `FluentMongoOperations` this above can be expressed as

```
CopyList<SWCharacter> all = ops.find(SWCharacter.class)
  .inCollection("star-wars")
  .all();
```

If `SWCharacter` defines the collection via `@Document` or you are using the class name as the collection name, the `….inCollection("star-wars")` step can be skipped as shown below.

```
CopyList<SWCharacter> all = ops.find(SWCharacter.class).all();
```

Sometimes a collection in MongoDB holds entites of different types. Like a `Jedi` within a collection of `SWCharacter`s. Refining the request via `….as(Jedi.class)` will cause the query result to be mapped against `Jedi`.

```
CopyOptional<Jedi> luke = ops.find(SWCharacter.class)
  .as(Jedi.class)
  .matching(query(where("firstname").is("luke")))
  .one();
```

Switching between retrieving a single entity, multiple ones as `List` or `Stream` like is done via the terminating methods `first()`, `one()`, `all()` or `stream()`.

When writing a geo-spatial query via `near(NearQuery)` the number of terminating methods is altered to just the ones valid for executing a `geoNear` command in MongoDB fetching entities as `GeoResult` within `GeoResults`:

```
CopyGeoResults<Jedi> results = mongoOps.query(SWCharacter.class)
  .as(Jedi.class)
  .near(alderaan) // NearQuery.near(-73.9667, 40.78).maxDis…
  .all();
```

The same approach of working applies to the other API parts of `FluentMongoOperations`.

```
Copyops.update(Jedi.class)
  .matching(query(where("lastname").is("solo")))
  .apply(update("firstname", "han"))
  .upsert();

ops.remove(SWCharacter.class)
  .matching(query(where("name").is("yoda")))
  .all();

ops.aggregateAndReturn(Jedi.class)
  .by(newAggregation(Person.class, project("firstna...
  .all();
```

## [](#mongodb-collation-support)[](#mongodb-collation-support)MongoDB Collation Support

MongoDB 3.4 introduced native support for [Collations](https://docs.mongodb.com/manual/reference/collation/) that allow to specify language-specific rules for `String` comparison. Collations can now be used throughout most of MongoDB commands eg. when creating a collection or an index, but also for `query`, `findAndModify`, `remove` and other operations.

It is definitely worth mentioning that as of MongoDB 3.4 it is now possible to set up multiple indices involving the same fields using different collations. This is important for the query plan in MongoDB itself as only queries defining the same collation can actually make use of the index.

```
CopyCollectionOptions collectionOptions = CollectionOptions.empty()
  .collation(Collation.of("en_US")
     .strength(primary().includeCase()));

template.createCollection("persons", collectionOptions);

IndexDefinition index = new Index()
  .named("en-name-idx")
  .on("name", Direction.ASC)
  .collation(Collation.of("en").caseFirst(off()));

template.indexOps("persons").ensureIndex(index);
```

If no collation is provided, MongoDB will use a simple binary comparison that can also be set explicitly via `Collation.simple()`. To use `Collation` support throughout Spring Data MongoDB we’ve introduced various extension points for `Query`, `NearQuery`, `AggregationOptions`, and others.

```
CopyQuery query = query(where("firstName").is("Amél"))
  .collation(collation);

NearQuery nearQuery = near(-73.9667, 40.78)
  .query(where(…))
  .collation(Collation.of("fr")));

AggregationOptions options = new AggregationOptions.Builder()
  .collation(Collation.of("en_US"))
  .build();
```

At the time of writing, defining `Collation` via `@Indexed` is not supported. Moving forward we’ll add this feature utilizing Java 8 repeatable annotations.

## [](#redis-client-configuration)[](#redis-client-configuration)Redis client configuration

A configuration of Spring Data Redis connection factories can be cumbersome if you consider all of the various Redis operation modes (Standalone, Sentinel, Cluster). Using client-specific aspects (SSL support, pooling etc.) requires additional configuration objects or conditional configuration.

We organized Redis client configuration to environment- and client-specific parts. The environment-specific configuration contains endpoints, database, and authentication (password-based) details:

-   `RedisStandaloneConfiguration` - used for Redis Standalone. You can use it also to connect with a specific Redis Master or Slave node if using replication.
    
-   `RedisSentinelConfiguration` - used when your Redis nodes are managed by Redis Sentinel.
    
-   `RedisClusterConfiguration` - used for Redis Cluster.
    

Lettuce and Jedis, the two supported clients, are configured each with their client-specific configurations: `LettuceClientConfiguration` and `JedisClientConfiguration`. We introduced this split because each client evolves independent from the other, and there is only little common ground.

```
CopyRedisStandaloneConfiguration envConfig =
  new RedisStandaloneConfiguration("localhost", 6379);
envConfig.setDatabase(2);
envConfig.setPassword(RedisPassword.of("foobared"));

LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
        .clientResources(…)
        .clientOptions(…)
        .commandTimeout(Duration.ofMillis(500))
        .shutdownTimeout(Duration.ofMillis(200))
        .useSsl().disablePeerVerification()
        .build();

connectionFactory = new LettuceConnectionFactory(envConfig, clientConfig);

RedisStandaloneConfiguration envConfig =
  new RedisStandaloneConfiguration("localhost", 6379);
envConfig.setDatabase(2);
envConfig.setPassword(RedisPassword.of("foobared"));

JedisClientConfiguration clientConfig = JedisClientConfiguration.builder()
        .clientName(environment.getProperty("spring.application.name"))
        .connectTimeout(Duration.ofMillis(200))
        .readTimeout(Duration.ofMillis(500))
        .useSsl().sslParameters(…).and()
        .usePooling().poolConfig(…)
        .build();

connectionFactory = new JedisConnectionFactory(envConfig, clientConfig);
```

Previously, some properties were set on the connection factory, some with client-specific objects. The client configuration is immutable. You can still use connection factories without a client configuration, but we deprecated configuration setters.

## [](#spring-data-for-apache-cassandra)[](#spring-data-for-apache-cassandra)Spring Data for Apache Cassandra

With this release we streamlined the module’s library layout. Spring Data for Apache Cassandra used to ship with two libraries, Spring CQL and Spring Data Cassandra. With Spring Data Kay, we merged `spring-cql` into `spring-data-cassandra` as the majority of usage is inside `spring-data-cassandra` anyway. With this change, we a couple of package renames have been applied already. We’re going to finish those for the upcoming RC1 release.

### [](#cassandra-query--update-objects)[](#cassandra-query-update-objects)Cassandra Query & Update objects

`Query` and `Update` objects allow fine-grained control over query predicates and selective updates. Previously, we supported either persisting the whole row by updating all properties or CQL-based updates without mapping.

`Query` and `Update` now use details from the entity model to support property-to-Cassandra column mapping. Our query mapper converts values (mapped UDTs, datatype-specific conversions) prior query execution, so you’re not required to convert query values to their Cassandra-specific representation yourself.

```
Copyclass Person {

  @PrimaryKeyColumn(name="last_name", ordinal = 0, type = PARTITIONED)
  String lastname;

  @PrimaryKeyColumn(name="firs_tname", ordinal = 1, type = CLUSTERED)
  String firstname;

  List<String> episodes;

  String mood;
}

Query query = Query.query(Criteria.where("lastname").is("White"))
  .and(Criteria.where("firstname").in("Walter", "Skyler"))
  .sort(Sort.by("firstname").ascending())
  .withAllowFiltering()
  .limit(10);

List<Person> people = cassandraOperations.select(query, Person.class);
```

`Query` contains filter criteria, sorting and a set of query options to control query execution. You can use it with the Template API with various `select` and `update` methods to query data for selection or to constrain the update selection.

Speaking of which, `Update` allows you to specify a set of update assignments. `Update` supports all update operators as of Apache Cassandra 3.10 (set, add to list, remove from collection, and more).

```
CopyUpdate update = Update.update("mood", "Bad")
  .addTo("episodes").appendAll("S1E1", "S1E2");

Query query = Query.query(Criteria.where("lastname").is("White"))
  .and(Criteria.where("firstname").is("Skyler"))
  .queryOptions(WriteOptions.builder().ttl(100).build());

cassandraOperations.update(query, update, Person.class);
```

Find more details about `Query` and `Update` in the [reference documentation](http://docs.spring.io/spring-data/cassandra/docs/current-SNAPSHOT/reference/html/#cassandra-template.query).

### [](#lightweight-transactions)[](#lightweight-transactions)Lightweight transactions

Lightweight transactions (compare-and-set transactions) are supported with `insert` and `update` operations for entities through their query options. The operation result reports whether the transaction was applied by returning either the entity or `null`.

```
CopyInsertOptions lwtOptions = InsertOptions.builder().withIfNotExists().build();

User user = new User("heisenberg", "Walter", "White");
User inserted = template.insert(user, lwtOptions);
User second = template.insert(user, lwtOptions); // returns null
```

Our support for basic lightweight transactions ships with this release and we would love to hear your feedback.

## [](#java-9-compatibility)[](#java-9-compatibility)Java 9 compatibility

### [](#the-problem)[](#the-problem)The problem

The upcoming Java 9 release will behave differently from past releases. It will break many existing applications that don’t adapt to the changes. This is caused by the Java Platform Module System (JPMS) and the associated encapsulation of Java internals. There are three potential reasons applications might break:

-   Illegal use of Internal API. One gets an exception along these lines:
    
    module does not "open <package.abc>" to unnamed module @
    
-   Changed behavior of interal API (or removed internal API).
    
-   Unnamed modules by default only get access to the module `java.base`.
    

This is sufficient for many cases, but unfortunately not for all. So one might have to specify additional module as dependencies using `--add-modules <module name>`. [There is a list of all modules and their content](http://cr.openjdk.java.net/~mr/jigsaw/ea/module-summary.html) defined by Java itself which will help finding the proper module name to use.

### [](#spring-data-compatibility)[](#spring-data-compatibility)Spring Data compatibility

We are happy to announce that Spring Data is a good citizen on Java 9!

The team made changes to ensure that our code runs with Java 9 without any `--permit-illegal-access` command line parameter, which would be required to fix issues mentioned in the first bullet point. We also don’t use any APIs for which the second bullet point applies.

Unfortunately there are a couple caveats to this compatibility:

1.  It does not include some stores. We track what we know about their respective compatibility in [DATACMNS-1033](https://jira.spring.io/browse/DATACMNS-1033)
    
2.  You might still run into the issue of the third bullet. One known example is an exception like this:
    
    ```
    Copyjava.lang.NoClassDefFoundError: javax/xml/bind/JAXBException
    ```
    
    This can be fixed by adding `--add-modules java.xml.bind` to the call to `java`
    
3.  Currently, we can’t use generated property accessors (introduced in the Ingalls release train) as a generated property accessor can no longer be injected into the originating class loader. This causes a slight performance regression. We are still looking for a Java 9 compatible version that has the same performance characteristic as the Java 8 compatible version (see [DATACMNS-1080](https://jira.spring.io/browse/DATACMNS-1080) for details).
    
4.  Compiling and executing the tests still requires `--permit-illegal-access`
    

Everybody involved wants to make a migration to Java 9 as smooth as possible and you can really help with that. Get the early access release of JDK 9 and build and run your application with it. If you are having problems, please file an issue with the project you experience problems with.

### [](#unnamed-modules)[](#unnamed-modules)Unnamed modules

If you already looked into project Jigsaw, you might have noted that Spring Data comes without a proper module descriptor, i.e. as a so called unnamed module. This has the one major drawback that we can’t specify module dependencies in the module definition, but have to provide them at execution time using the `--add-modules` command line option.

The problem is that all the libraries we depend on would need to provide a module descriptor as well. And while we have very few required dependencies, we have many optional dependencies. Only when all these libraries provide proper modules can we start providing proper modules ourself.

## [](#upgrade-to-elasticsearch-54)[](#upgrade-to-elasticsearch-5-4)Upgrade to Elasticsearch 5.4

We upgraded Spring Data Elasticsearch (thanks to Moshin and Artur!) to 5.4 using the transport client.

This upgrade required some changes in our public API. The `scan` methods were replaced with `scroll` methods returning paged results in the Template API and aligned our annotations (`@CompletionField`, `@Field`, `@GeoPointField`, `@InnerField`) to Elasticsearch’s API.

## [](#summary)[](#summary)Summary

It’s been a long road since milestone one of Spring Data Kay and we hope you got a good impression of what the release train will ship. We’re going to add some minor features for the upcoming release candidate with a rather short stint to GA in early August. Reach out via [Jira](https://jira.spring.io/browse/DATACMNS), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-data), [Twitter](https://twitter.com/SpringData), or [Gitter](https://gitter.im/spring-projects/spring-data) if you have questions, feedback or want to discuss features with us.
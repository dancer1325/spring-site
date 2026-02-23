---
title: What\'s new in Spring Data Lovelace for Redis and Apache Cassandra?
source: https://spring.io/blog/2018/09/26/what-s-new-in-spring-data-lovelace-for-redis-and-apache-cassandra
scraped: 2026-02-23T15:12:08.125Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  September 26, 2018 | 0 Comments
---

# What's new in Spring Data Lovelace for Redis and Apache Cassandra?

_Engineering | Mark Paluch |  September 26, 2018 | 0 Comments_

This blog post explains the new and noteworthy in [Spring Data Lovelace](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Lovelace) for [Apache Cassandra](https://spring.io/blog/2018/09/26/what-s-new-in-spring-data-lovelace-for-redis-and-apache-cassandra#cassandra) and [Redis](https://spring.io/blog/2018/09/26/what-s-new-in-spring-data-lovelace-for-redis-and-apache-cassandra#redis). Make sure to also check out the blog post on [What’s new in Spring Data Lovelace for MongoDB?](https://spring.io/blog/2018/09/27/what-s-new-in-spring-data-lovelace-for-mongodb).

With Spring Data Lovelace just released in its generally available version last week, it’s time to have a brief walk through the new feature’s we have added. The release train is pretty packed with features.

In this blog post, I’ll be covering [Apache Cassandra](https://spring.io/blog/2018/09/26/what-s-new-in-spring-data-lovelace-for-redis-and-apache-cassandra#cassandra) and [Redis](https://spring.io/blog/2018/09/26/what-s-new-in-spring-data-lovelace-for-redis-and-apache-cassandra#redis).

# [](#spring-data-for-apache-cassandra)[](#cassandra)Spring Data for Apache Cassandra

With this release, we refined data access with Cassandra-specific types, introduced support for lifecycle events, improved the programming experience for both Java and Kotlin usage and included various other refinements. Let us take a look at how this release can help improve your data access to Cassandra.

## [](#map-and-tuple-refinements)[](#map-and-tuple-refinements)Map and Tuple Refinements

Map and Tuple data types are specific types in Cassandra that allow storing multiple values within a single column. Previously, we supported both types in their raw form in mapped entities, which means that you could use only maps with primitive keys and values. For tuples, you could only use `TupleValue`, the raw Cassandra driver type, without further mapping or even schema support.

With this release, we added mapping and conversion support for Map- and Tuple-typed properties. Maps can now contain non-primitive keys and values, and the conversion layer applies potentially registered converters.

Consider the following types:

```
Copy@UserDefinedType
class Manufacturer {

  String name;

  // getters/setters omitted
}

@Table
class Supplier {

  Map<Manufacturer, List<String>> acceptedCurrencies;

  // getters/setters omitted
}
```

`Manufacturer` is a mapped user-defined type that is used by the map as a key. Values are represented as `List` of strings. We can now refactor the code to use a proper `Currency` type (such as `java.util.Currency`) within the list. To do so, we provide converters between `String` and `Currency` and register these through `CassandraCustomConversions`. The following example shows how to do so:

```
Copyenum StringToCurrencyConverter implements Converter<String, Currency> {
  INSTANCE;

  @Override
  public Currency convert(String source) {
    return Currency.getInstance(source);
  }
}

enum CurrencyToStringConverter implements Converter<Currency, String> {

  INSTANCE;

  @Override
  public String convert(Currency source) {
    return source.getCurrencyCode();
  }
}

@Configuration
class MyCassandraConfiguration {

  public CassandraCustomConversions cassandraCustomConversions() {
    return new CassandraCustomConversions(
      Arrays.asList(StringToCurrencyConverter.INSTANCE, CurrencyToStringConverter.INSTANCE));
  }
}
```

After registering the converters, we can go forward and use `Currency` within the `Supplier` type to work with value objects instead of primitives, as the following example shows:

```
Copy@Table
class Supplier {

  Map<Manufacturer, List<Currency>> acceptedCurrencies;

  // getters/setters omitted
}
```

Tuples were not really usable with previous versions of Spring Data for Apache Cassandra. Using tuples required direct `Row` interaction and `TupleType` retrieval to create appropriate tuple values. Therefore, we decided to provide mapped tuple types, as the following example shows:

```
Copy@Table
class Supplier {

  List<Dependance> dependances;

  // getters/setters omitted
}

@Tuple
class Dependance {

  @Element(0) String address;
  @Element(1) String city;
  @Element(2) Currency currency;

  // getters/setters omitted
}
```

Mapped tuples are annotated with `@Tuple`, and the individual components of a tuple refer (by using `@Element(…)`) to their ordinal index within the tuple. The converter inspects loaded tuples and maps these onto regular Java classes that are part of your domain model. You no longer need to interact with `TupleType` and `TupleValue` directly – although you still can – but you can represent tuple values in a type-safe approach. Mapped tuples benefit from the various mapping-features of the converter and can refer to types that have a custom converter registered.

Support for maps and tuples also includes schema generation to rapidly set up a schema by deriving the type from your domain model.

See our [examples for mapped tuples](https://github.com/spring-projects/spring-data-examples/tree/be17e153049342e7bc7f3d63f93cc221da72dfab/cassandra/example/src/main/java/example/springdata/cassandra/convert) for further details.

## [](#lifecycle-events)[](#lifecycle-events)Lifecycle Events

The Cassandra mapping framework now includes several `org.springframework.context.ApplicationEvent` events that your application can respond to by registering special beans in the `ApplicationContext`. To intercept an object before it goes through the conversion process (which turns your domain object into a `Statement`), you can register a subclass of `AbstractCassandraEventListener` that overrides the `onBeforeSave` method. When the event is dispatched, your listener is called and passed the domain object before it goes into the converter. The following example shows how to use `onBeforeSave`:

```
Copypublic class BeforeConvertListener extends AbstractCassandraEventListener<Person> {
  @Override
  public void onBeforeSave(BeforeSaveEvent<Person> event) {
    // does some auditing manipulation, set timestamps, whatever
  }
}
```

Declaring these beans in your Spring ApplicationContext causes them to be invoked whenever the event is dispatched.

The following callback methods are present in `AbstractCassandraEventListener`:

-   `onBeforeSave`: Called in `CassandraTemplate` `save` operations **before** inserting or saving the row in the database.
    
-   `onAfterSave`: Called in `CassandraTemplate` `save` operations **after** inserting or saving the row in the database.
    
-   `onBeforeDelete`: Called in `CassandraTemplate` `delete` operations **before** deleting the row in the database.
    
-   `onAfterDelete`: Called in `CassandraTemplate` `delete` operation **after** deleting the row in the database.
    
-   `onAfterLoad`: Called in `CassandraTemplate` `select` and `selectOne` methods **after** the row has been retrieved from the database.
    
-   `onAfterConvert`: Called in `CassandraTemplate` `select` and `selectOne` methods **after** the row that has been retrieved from the database was converted to a POJO.
    

Lifecycle events are only emitted for root level types. Complex types used as properties within an entity root are not subject to event publication.

See our [examples for Lifecycle Events](https://github.com/spring-projects/spring-data-examples/blob/be17e153049342e7bc7f3d63f93cc221da72dfab/cassandra/example/src/test/java/example/springdata/cassandra/events/LifecycleEventsTests.java).

## [](#kotlin-extensions)[](#kotlin-extensions)Kotlin Extensions

Spring Data exposes methods that accept a target type to either query for or to project results values onto. Kotlin represents classes with its own type (`KClass`), which can be an obstacle when attempting to obtain a Java Class type.

Spring Data for Apache Cassandra ships with extensions that add overloads for methods that accept a type parameter by either using generics or accepting KClass directly, as the following example shows:

```
Copyoperations.getTableName<Person>()

operations.getTableName(Person::class)

operations.find<Person>().as<Contact>
  .matching(query(where("firstname").isEqualTo("luke"))).all();
```

See our [Cassandra Kotlin usage](https://github.com/spring-projects/spring-data-examples/tree/boot-next/cassandra/kotlin) examples for further details.

## [](#fluent-template-api)[](#fluent-template-api)Fluent Template API

The `CassandraOperations` interface is one of the central components when it comes to more low-level interaction with Apache Cassandra. It offers a wide range of methods that cover needs from batching and result streaming to CRUD operations. You can find multiple overloads for each method. Most of them cover optional or alternative parts of the API, such as query by CQL, `Statement`, or query by `Query`.

`FluentCassandraOperations` provides a more narrow interface for the common methods of `CassandraOperations` and provides a more readable, fluent API. The entry points (`insert(…)`, `query(…)`, `update(…)`, and others) follow a natural naming schema based on the operation to be run. Moving on from the entry point, the API is designed to offer only context-dependent methods that lead to a terminating method that invokes the actual `Cassandra` counterpart.

Consider a query example:

```
CopyList<Person> all = operations.query(Person.class)
  .inTable("people")
  .all();
```

This query queries the `people` table for all rows and maps the result onto the `Person` type. Omitting `inTable(…)` derives the table name from the entity type.

The next example uses projections and a query:

```
CopyList<Contact> all = operations.query(Person.class)
  .as(Contact.class)
  .matching(query(where("firstname").is("luke")))
  .all();
```

This query uses the table onto which the `Person` type is mapped and projects results (DTO or interface projection) on to `Contact`. The query itself is mapped by using field names from the `Person` type. You can switch between retrieving a single entity and retrieving multiple objects as a `List` or a `Stream` through the terminating methods: `first()`, `one()`, `all()`, or `stream()`.

The fluent API is type-safe, and intermediate objects are immutable. You can prepare base parts of your query and continue with a more specific execution, as the following example shows:

```
CopyTerminatingSelect<Contact> select = operations.query(Person.class)
  .as(Contact.class)
  .matching(query(where("firstname").is("luke")))

Contact contact = select.first();
long count = select.count();
```

See our [Kotlin example](https://github.com/spring-projects/spring-data-examples/tree/be17e153049342e7bc7f3d63f93cc221da72dfab/cassandra/kotlin) for further details.

Several other enhancements have found their way into the Spring Data for Apache Cassandra module so make sure to check out the [new features](https://docs.spring.io/spring-data/cassandra/docs/2.1.0.RELEASE/reference/html/#new-features.2-1-0) section in the reference documentation to learn more about reactive slice queries and exists/count projections.

# [](#spring-data-redis)[](#redis)Spring Data Redis

This release of Spring Data Redis ships with improvements across various themes that did not fit into the 2.0 release. Most of them smooth out the rough edges around Redis cluster usage. The core themes are:

-   Connection improvements
    
-   Refinements for Redis Cluster usage
    
-   Various improvements in the framework
    

## [](#connection-improvements)[](#connection-improvements)Connection Improvements

Redis supports various modes of operations: Standalone, Standalone with Replication, Redis Sentinel with or without Replication, Redis Cluster. We have covered Standalone, Redis Sentinel and Redis Cluster modes. The missing pieces so far have been reads from replicas. This release introduces support for Replica reads across the variety of Redis operation modes. The following example shows how to use this new feature:

```
CopyLettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder()
  .readFrom(ReadFrom.NEAREST)
  .build();

RedisSentinelConfiguration endpoint = new RedisSentinelConfiguration()
  .master("my-master")
  .sentinel("sentinel-host1", 26379)
  .sentinel("sentinel-host2", 26379);

LettuceConnectionFactory factory = new LettuceConnectionFactory(endpoint, clientConfiguration);
```

Specifying `ReadFrom` lets you select a particular node type when issuing read-only commands, such as `GET` or `SMEMBERS`. You can either use one of Lettuce’s pre-defined settings or create a new `ReadFrom` strategy. `ReadFrom` is considered in all setups where replicas are available: Redis Sentinel, Redis Cluster, and static Master/Replica setups, such as AWS ElastiCache, which brings us to the next improvement.

You can use AWS ElastiCache or any other static Master/Replica setup (that is, using Redis with one or more dedicated replicas) with Spring Data Redis and Lettuce to read from replica nodes. In previous releases, you were able to use the master node only. Take a look at the following configuration code snippet:

```
CopyLettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder().readFrom(ReadFrom.NEAREST).build();

RedisStaticMasterSlaveConfiguration endpoint = new RedisStaticMasterSlaveConfiguration("my-master-host", 6379)
  .node("my-replica-host1", 6379)
  .node("my-replica-host2", 6379);

LettuceConnectionFactory factory = new LettuceConnectionFactory(endpoint, clientConfiguration);
```

In this cod, we configure `LettuceConnectionFactory` to use multiple nodes without actually specifying the roles. Lettuce itself determines the role of the individual hosts and uses the nodes according to their roles.

The last refinement in this category is the use of local connections through Unix domain sockets. A Unix domain socket or IPC (inter-process communication) socket is a data communications endpoint for exchanging data between processes that run on the same host operating system. As with named pipes, Unix domain sockets support the transmission of a reliable stream of bytes that compares to TCP. Because Unix domain socket communication happens within the kernel only, communication bypasses networking and generally features an improved performance profile.

To use Unix domain sockets, you need to use Lettuce and add native extensions for Netty (either `netty-transport-native-epoll` when running on Linux or `netty-transport-native-kqueue` when running on MacOS). The following example configures communication with Redis through a socket:

```
CopyRedisSocketConfiguration endpoint = new RedisSocketConfiguration("/var/run/redis");

LettuceConnectionFactory factory = new LettuceConnectionFactory(endpoint);
```

## [](#redis-cluster-refinements)[](#redis-cluster-refinements)Redis Cluster Refinements

This release ships with refinements in connection handling for Redis Cluster connections that use the Lettuce driver. Previous versions did not share the underlying Lettuce connection to Redis Cluster, which manifested in performance degradations as new connections always established a new cluster connection. This behavior causes an impact when issuing multiple commands as, each command basically uses a new `RedisConnection`.

By default, native connection sharing is now enabled for Redis Cluster connections. Other usage patterns (such as Redis Standalone) have already been using connection sharing in previous versions. The following example shows how to create a `LettuceConnectionFactory` with a shared native connection:

```
CopyRedisClusterConfiguration clusterConfiguration = new RedisClusterConfiguration(…);

LettuceConnectionFactory factory = new LettuceConnectionFactory(clusterConfiguration);
factory.setShareNativeConnection(true);
```

Some operations, such as blocking operations, require dedicated connections to not impact other processes that would operate on the same native connection. You can enable pooling for Redis Cluster connections to buffer connection creation if your application heavily relies on blocking Redis commands. Enabling pooling is a client-configuration aspect. With pooling enabled, `LettuceConnectionFactory` applies pooling to the configured Redis usage scheme. You can use `LettucePoolingClientConfiguration` as entry-point to enable pooling, as the following example shows:

```
CopyLettucePoolingClientConfiguration clientConfiguration = LettucePoolingClientConfiguration.builder().poolConfig(…).build();
RedisClusterConfiguration clusterConfiguration = new RedisClusterConfiguration(…);

LettuceConnectionFactory factory = new LettuceConnectionFactory(clusterConfiguration, clientConfiguration);
```

With the introduction of `ReadFrom` settings and streamlined Cluster connection handling, we can now support Cluster-wide keyspace scanning by using the `SCAN` command. Behind the scenes, the driver maintains a stateful cursor that lets you iterate over all master/replica nodes that hold keys in a Cluster. Using the connection’s `scan(…)` method gives you the same experience as if it was used on a Redis Standalone setup, as the following example shows:

```
CopyCursor<byte[]> scan = clusterConnection.keyCommands()
  .scan(ScanOptions.scanOptions().match("foo*").build());
scan.forEachRemaining(key -> …);
```

Keyspace scanning also provides a reactive variant for all Redis operation modes. Calling `scan(…)` on the reactive Redis Template API returns a `Flux` of keys. The resulting `Flux` is backpressure-aware and translates demand into `SCAN` invocations if there is sufficient demand to scan the whole keyspace. It stops scanning if the demand is satisfied. The following example constructs such a `Flux`:

```
CopyFlux<String> scan = redisTemplate.scan(ScanOptions.scanOptions().match("something*").build());
```

## [](#redis-repository-improvements)[](#redis-repository-improvements)Redis Repository Improvements

This release ships with Query by Example support for Redis repositories. Query by Example is a user-friendly querying technique with a simple interface. It allows dynamic query creation and does not require you to write queries that contain field names. The nature of Query by Example does not require a query language, as the actual query derives from the `Example` object. You can now define an `Example` to query for indexed values that are stored in Redis hashes. Redis repositories can implement the `QueryByExampleExecutor` fragment to inherit Query by Example methods. Take a look at the following snippet:

```
Copyinterface PersonRepository extends CrudRepository<Person, String>, QueryByExampleExecutor<Person> {
}

PersonRepository repository = …;

Person eddard = new Person("eddard", "stark");
Person tyrion = new Person("tyrion", "lannister");
Person robb = new Person("robb", "stark");
Person jon = new Person("jon", "snow");
Person arya = new Person("arya", "stark");

repository.saveAll(Arrays.asList(eddard, tyrion, robb, jon, arya));

List<Person> result = repository.findAll(Example.of(new Person(null, "stark")));
```

This code inserts a bunch of `Person` objects. The `Example` object defines a probe, with only the last name set. The Query engine creates a query that includes only non-null fields (by default) querying for objects whose `lastname` is `stark`.

See the [Query-by-Example sample](https://github.com/spring-projects/spring-data-examples/blob/be17e153049342e7bc7f3d63f93cc221da72dfab/redis/repositories/src/test/java/example/springdata/redis/repositories/PersonRepositoryTests.java#L156) for further details.

Redis repositories now support type aliasing that you can use by annotating your domain classes with `@TypeAlias`. By default, type hints in Redis use the fully-qualified class name. You can apply aliasing to customize type names and to reduce Redis memory usage.

The following example persists an instance of a `Person`:

```
Copypackage com.acme;

@TypeAlias("person")
class Person {
  // …
}
```

This code causes the type hint (`person`) to be used instead of `com.acme.Person`. The corresponding commands that are used to store the entity in Redis are as follows:

```
CopyHMSET "person:19315449-cda2-4f5c-b696-9cb8018fa1f9" "_class" "person" "id" "19315449-cda2-4f5c-b696-9cb8018fa1f9"
```

Several other enhancements have found their way into the Redis module so make sure to check out the [new features](https://docs.spring.io/spring-data/redis/docs/2.1.0.RELEASE/reference/html/#new-in-2.1.0) section in the reference documentation to learn more about keyspace scanning, reactive Pub/Sub, and new commands.
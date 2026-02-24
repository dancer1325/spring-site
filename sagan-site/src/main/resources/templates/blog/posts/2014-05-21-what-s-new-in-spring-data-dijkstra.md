---
title: What\'s New In Spring Data Dijkstra?
source: https://spring.io/blog/2014/05/21/what-s-new-in-spring-data-dijkstra
scraped: 2026-02-23T22:30:33.640Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  May 21, 2014 | 6 Comments
---

# What's New In Spring Data Dijkstra?

_Engineering | Oliver Drotbohm |  May 21, 2014 | 6 Comments_

We've [just announced](https://spring.io/blog/2014/05/20/spring-data-release-train-dijkstra-goes-ga) the availability of the GA release of the Spring Data release train named Dijkstra. I'd like to use this chance to walk you through some of the features we added in this release.

## [](#5-new-modules-joining-the-train)5 new modules joining the train

The first big feature the release includes is the addition of 5 modules to the release train. Most of them have been around for quite a while but going forward we'll release them in sync with the other modules. The newly added modules are Spring Data [Elasticsearch](https://github.com/spring-projects/spring-data-elasticsearch), [Cassandra](http://projects.spring.io/spring-data-cassandra/), [Couchbase](http://projects.spring.io/spring-data-couchbase/), [Gemfire](http://projects.spring.io/spring-data-gemfire/) and [Redis](http://projects.spring.io/spring-data-redis/).

## [](#spring-data-commons)Spring Data Commons

A lot of the improvements of a release train usually end up in the Commons module so that the individual store modules can actually all benefit from the newly added features. Here are the most important ones for Dijkstra:

### [](#support-for-wrapper-types-as-return-values)Support for wrapper types as return values

For Spring Data repository methods that are declared to return a single instance of the domain type, the repository manages return `null` in case no result can be obtained. However, if we started the APIs from scratch instead of returning the instance directly, we probably rather would've used an `Optional` to make sure the clients don't accidentally forget the `null` checks.

`Optional` is a type provided by quite a few Java libraries these days. Google Guava has it and even more importantly, JDK 8 provides one as well. So with the Dijkstra release train we ship the possibility to use these types as wrappers for your return types and let the Spring Data repository infrastructure automatically wrap `null`s for you.

```java
Copyinterface CustomerRepository extends Repository<Customer, Long> {

  Optional<Customer> findOne(Long id);

  Optional<Customer> findByEmailAddress(EmailAddress emailAddress);
}
```

The first method you see here is a variant of `CrudRepository.findOne(…)`. Note, that the repository interface does not extend `CrudRepository` as this would result in a compile error as we cannot redeclare the `findOne(…)` method and change the return type. Thus, we recommend to simply craft your own base repository interface (as described in [the reference documentation](http://docs.spring.io/spring-data/jpa/docs/current/reference/html/repositories.html#repositories.definition-tuning) in case you'd like to change the behavior of `findOne(…)`.

The second method is a simple query method that uses query derivation to let the Spring Data infrastructure derive a query from the method name. We also detect `Optional` as a wrapper type here, execute the query and automatically wrap the result into an `Optional` instance.

### [](#asynchronous-repository-method-invocations)Asynchronous repository method invocations

In a related way we started to add asynchronous execution capabilities to repository methods. A query method can now return a `Future<T>` which will cause it to be executed asynchronously if it is annotated with `@Async`.

```java
Copyinterface CustomerRepository extends Repository<Customer, Long> {

  @Async
  @Query(" … long running query declaration … ")
  Future<List<Customer>> findByLongRunningQuery(String lastname);
}
```

The execution is then based on the Spring support for [asynchronous method invocations](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/scheduling.html#scheduling-annotation-support-async). We're also looking into more advanced asynchronous execution models like promises (potentially based on [Project Reactor](https://github.com/reactor/reactor)) to be added in future versions of Spring Data.

### [](#geo-spatial-types)Geo-spatial types

The MongoDB module (amongst others) always had support for Mongo's geo-spatial operations - both in `MongoTemplate` as well as in the repository abstraction. With the current release, we moved the core value types (e.g. `Shape`, `Point`, `Box`, `Distance` etc.) into the Spring Data Commons module. This will allow you to ubiquitously refer to the geo types and interact with all of the Spring Data modules supporting geo-spatial functionality without mapping those types into each other. Check out the [JavaDoc](http://docs.spring.io/spring-data/commons/docs/1.8.0.RELEASE/api/index.html?org/springframework/data/geo/package-summary.html) for details.

### [](#slices)Slices

Spring Data has always had support for pagination in the repository programming model. It allows you to access data on a page-by-page basis to iterate through large data sets. Besides the plain page content, the `Page` interface exposes API to find out about the total number of elements and pages available.

Calculating this number can be quite resource intensive (as usually an additional query has to be executed) and often times the only meta aspect that is interesting about a page is whether it has a next one, so that clients can go on retrieving more data. This is a pattern you can see in you Facebook time line for example.

The Dijkstra release now introduces a stripped down version of a `Page` called `Slice` which allows you to find out about whether the current slice has a following one:

```java
Copyinterface BlogPostRepository extends Repository<BlogPost, Long> {

  Slice<BlogPost> findByAuthorOrderByDateDesc(Author author, Pageable pageable);
}
```

You can now use the `Pageable` to express the page number and size you'd like to obtain and the Spring Data infrastructure will read one more item than requested and use the presence or non-presence of it as indicator for the next slice to be available.

### [](#derived-delete-queries)Derived delete queries

The query method derivation functionality now supports `deleteBy…` and `removeBy…` method prefixes to derive queries that remove managed domain types based on a given criteria.

```java
Copyinterface BlogPostRepository extends Repository<BlogPost, Long> {

  int deleteByDateBefore(Date date);
}
```

This has been implemented in the JPA, MongoDB and Solr modules for Dijkstra and will be added to other store modules going forward.

## [](#jpa-21-support)JPA 2.1 support

A core theme during the development of the JPA module for Dijkstra has been support for JavaEE 7 /JPA 2.1 features. The core areas we tackle with this release is the support for entity graphs on query executions as well as the execution of stored procedures.

### [](#entity-graphs)Entity graphs

Assume we have the following domain type definition:

```java
Copy@Entity
@NamedEntityGraph(name = "summary", attributeNodes = { 
  @NamedAttributeNode("firstname"),
  @NamedAttributeNode("lastname")})
class Customer {
  // properties ommitted
}
```

We can now refer to the named entity graph through the `@EntityGraph` annotation to indicate we want this graph to be applied to the query being executed.

```java
Copyinterface CustomerRepository extends Repository<Customer, Long> {

  @EntityGraph("summary")
  Optional<Customer> findByEmailAddress(EmailAddress emailAddress);
}
```

This will cause only the `firstname` and `lastname` property being loaded eagerly and all others prepared to be loaded lazily on access.

### [](#stored-procedures)Stored procedures

JPA 2.1 added the ability of executing stored procedures through the `EntityManager` API. Similarly to the sample above, the metadata for a stored procedure can be declared at the domain type. Assume you want to trigger a stored procedure that randomly creates passwords for customers:

```java
Copy@Entity
@NamedStoredProcedureQuery(name = "Customer.generateNewPassword", 
  procedureName = "generateNewPassword", parameters = {
    @StoredProcedureParameter(
      mode = ParameterMode.IN, name = "username", type = String.class),
    @StoredProcedureParameter(
      mode = ParameterMode.OUT, name = "password", type = String.class)})
class Customer {
  // properties ommitted
}
```

The stored procedure can be executed using a repository query method like this:

```java
Copyinterface CustomerRepository extends Repository<Customer, Long> {

  @Procedure
  String generateNewPassword(@Param("username") String username);
}
```

By default we will use the stored procedure meta-data we find using the well-known `DomainType.methodName` pattern and match this to the method declaration. For very simple procedure mappings like the one shown here, you could even omit the meta-data declaration as all of the meta-data can be derived from the method name. Find out more about the stored procedure support in the [reference documentation](http://docs.spring.io/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.stored-procedures).

## [](#transaction-support-for-redis)Transaction support for Redis

The latest version of the Redis module adds functionality to accumulate a set of operations that can be executed in batch. To achieve this `RedisTemplate` can now integrate with Spring's transaction synchronization by getting the `enableTransactionSupport` property configured to `true` (it defaults to `false`).

Enabling this feature will cause the `RedisConnection` to be bound to the current `Thread` and the `MULTI` command issued which allows the underlying Redis driver to potentially perform command queuing. If the transaction finishes without errors, the `EXEC` command is issued, if it fails, the accumulated commands are discarded using the `DISCARD` command.

Once enabled, connections will be bound to the current Thread, making sure that every write operation is piped to the same connection and queued up waiting for the surrounding transaction to finish. Read operations - e.g. the `KEYS` command - will still be executed immediately by using a fresh, non-thread-bound connection.

```java
Copy@Bean
public StringRedisTemplate redisTemplate() {

	StringRedisTemplate template = 
	  new StringRedisTemplate(redisConnectionFactory());
	// Enable transaction synchronization support
	template.setEnableTransactionSupport(true);

	return template;
}
```

The `RedisTemplate` configured like this can then be used with the following semantics:

```java
Copy// Executed on thread bound connection
template.opsForValue().set("foo", "bar");

// Read operation executed on separate connection
template.keys("*");

// Returns null as values set within transaction are not visible
// prior to transaction flush
template.opsForValue().get("foo");
```

## [](#complex-query-support-in-spring-data-solr)Complex query support in Spring Data Solr

Creating more complex queries using Spring Data Solr's criteria API has been requested for quite a while. So we decided to rewrite parts of the implementation leaving the API compatible to its prior versions.

Basically we moved away from the rather flat representation towards a tree like model preserving all the fluent API style we've been used to.

A Solr query `q=name:solr OR (type:spring AND category:data)` can now be expressed as:

```java
Copynew SimpleQuery(
  where("name").is("solr").or(
    where("type").is("spring").and("category").is("data")));
```

## [](#projections-in-spring-data-rest)Projections in Spring Data REST

A very common requirement for the REST resources exposed by Spring Data REST has been to be able to craft custom representations. This means, users wanted to either reduce the number of properties rendered in the response or inline associated entities to save server round trips. With Spring Data REST 2.1 we now ship a possibility to define custom projections on the server side. To do so, you declare an interface to contain exactly the properties you'd like to expose:

```java
Copy@Projection(name = "summary", types = Order.class)
interface OrderSummary {
	
  LocalDate getOrderedDate();

  CustomerSummary getCustomer();

  @Value("#{@shop.calculateTotal(target)}")
  Money getTotal();
}
```

This interface can be placed in the same package (or a sub-package) that `Order` resides in and will be auto-detected by Spring Data REST. It will cause all resources that expose a single order or a collection of orders to carry an additional parameter in the URI template to indicate the projection capability:

```javascript
Copy{ _links : {
    orders : { href : "…/orders{?projection}", templated : true }
  }
}
```

If a client now expands the template with `summary` for `projection`, we'll create a proxy on the server side, that will be handed over to Jackson for marshaling. Every getter will be forwarded to a property lookup on the actual target class (in this case `Order`).

In the example above `getCustomer()` refers to a related entity which would've been exposed as a link only in the non-projection scenario. By using the projection, we detect that the return type of the method is not `Customer`. This will cause in turn a projecting proxy to be created so that you get full control over the properties exposed. The projection interfaces can of course carry Jackson annotations to further customize the representation rendered.

For advanced use cases you can even equip the projection methods with `@Value` to return the result of a SpEL expression to the marshaller. In our sample here, we invoke a method on a Spring bean named `shop` and hand the proxy target instance to it to calculate the order total, which could consider rebates, taxes etc.

## [](#summary)Summary

With these elected examples I hope I could pique your curiosity to explore the modules contained in the Dijkstra release train. We're now going to continue our mission to simplify the implementation of data access layers with the launch of the next release train called [Evans](http://www.amazon.com/Eric-Evans/e/B001KDCO2I).
---
title: What\'s new in Spring Data 2021.0?
source: https://spring.io/blog/2021/04/20/what-s-new-in-spring-data-2021-0
scraped: 2026-02-23T13:25:35.866Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  April 21, 2021 | 2 Comments
---

# What's new in Spring Data 2021.0?

_Engineering | Mark Paluch |  April 21, 2021 | 2 Comments_

Spring Data 2021.0, codenamed Pascal, is the second release following the new six-month cadence. It ships with refinements to many existing interfaces and programming models. This blog post explains the following topics:

-   [Introduce `deleteAllById` for `CrudRepository` and `ReactiveCrudRepository`.](#delete-all-by-id)
    
-   [Support for Spring Core Java Flight Recorder (JFR) metrics.](#jfr)
    
-   [`QueryByExample` for R2DBC and Oracle support.](#query-by-example)
    
-   [Enable Type- and Refactoring-safe Use of `KProperty` and `KPropertyPath` for Property Path Rendering.](#kotlin)
    
-   [Enable Cassandra Prepared Statements for Repositories and `CassandraTemplate`.](#cassandra)
    
-   [Document Unwrapping Support & Relaxed Aggregation Type Checks for MongoDB.](#mongodb)
    
-   Repository projections & function execution for Apache Geode.
    
-   [Remove Spring Data Solr from the release train.](#solr)
    
-   [Support for](#jmolecules) [jMolecules](https://github.com/xmolecules/jmolecules).
    
-   [Spring Data REST aggregate reference mapping in DTOs.](#spring-data-rest)
    

## [](#introduce-deleteallbyid-for-crudrepository-and-reactivecrudrepository)[](#delete-all-by-id)Introduce `deleteAllById` for `CrudRepository` and `ReactiveCrudRepository`

Since its inception, `CrudRepository` has defined a method to delete individual entities by their identifiers. Back in the 1.x development line, `delete(…)` methods were overloaded to accept various argument types following `delete(ID id)` and `delete(Iterable<? extends T> entities)`.

With the Spring Data 2.0 release, we renamed the `CrudRepository` methods to express what argument a particular method would accept. After the rename, the methods looked like `deleteById(ID id)` and `deleteAll(Iterable<? extends T> entities)`. The refined naming convention allows for some room to introduce a delete method that deletes entities by their identifier. As of this release, both, `CrudRepository` and `ReactiveCrudRepository` define `deleteAllById(Iterable<? extends ID> ids)` to delete multiple entities.

Depending on the actual store module, this can be a batch delete (delete by query) if supported by the data store. The JPA implementation, for example, still materializes all entities first to immediately remove them, so that lifecycle callbacks are still invoked for the instances about to be deleted. An additional `deleteAllByIdInBatch(…)` has been introduced in `JpaRepoository` to also provide the faster execution variant using a batch query.

## [](#support-for-spring-core-java-flight-recorder-jfr-metrics)[](#jfr)Support for Spring Core Java Flight Recorder (JFR) metrics

[Java Flight Recorder (JFR)](https://docs.oracle.com/javacomponents/jmc-5-5/jfr-runtime-guide/preface_jfrrt.htm#JFRRT165) is a tool to collect, diagnose, and profile data about a running Java application. Its tight integration with the Java runtime allows low-overhead collection of events in production environments.

Spring Data repositories are typically bootstrapped on application startup, so they naturally contribute to startup time. The Pascal release introduces integration with Spring Framework’s support for capturing [startup events](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/metrics/jfr/FlightRecorderApplicationStartup.html), available since version 5.3. By enabling JFR recording, you can collect and analyze the following repository startup events:

**For each enabled Spring Data module (`@Enable…Repositories`)**

-   `spring.data.repository.scanning`: Repository interface scanning

**For each Repository**

-   `spring.data.repository.init`: Repository initialization
    
-   `spring.data.repository.metadata`: Metadata retrieval
    
-   `spring.data.repository.composition`: Assembly of the repository composition
    
-   `spring.data.repository.target`: Repository target creation
    
-   `spring.data.repository.proxy`: Repository proxy creation
    
-   `spring.data.repository.postprocessors`: Repository proxy post-processing
    

You can enable JFR recording by starting your application with `java -XX:StartFlightRecording:filename=recording.jfr,duration=10s -jar …` on all Java 9 or newer runtimes or Java 8 update 262 or later.

## [](#type--and-refactoring-safe-use-of-kproperty-and-kpropertypath-for-property-path-rendering)[](#kotlin)Type- and Refactoring-safe Use of `KProperty` and `KPropertyPath` for Property Path Rendering

The Spring Data Kotlin integration is a strong driver for "syntactic sugar" enhancements of our language-specific extensions. Kotlin allows referencing individual properties as property references (`data class Book(val title: String)`, `Book::title`). They are refactoring- and compile-safe, as the Kotlin compiler immediately rejects invalid references. Modern IDE support considers property references when renaming a property, eliminating the risk of lingering references within plain strings.

[Spring Data MongoDB 2.2](https://github.com/spring-projects/spring-data-mongodb/issues/3007) introduced support for `KProperty` and `KPropertyPath` for its `Criteria` API

**Classic usage of properties**

```
Copyval classic = Criteria("title").isEqualTo("Moby-Dick")
  .and("price").lt(950)

val typed = (Book::title isEqualTo "Moby-Dick")
  .and(Book::price).lt(950)
```

Spring Data Commons 2.5 promotes `KPropertyPath` as a top-level concept in Spring Data. To not require extensions or changes to all methods that accept a property path, you can use\`KPropertyPath\` with existing Spring Data utilities by rendering the property path:

```
Copy// KPropertyPath variant
Sort.by((Book::author / Author::name).toDotPath())

// String-path equivalent
Sort.by("author.name")

// KPropertyPath variant
ExampleMatcher.matching()
  .withMatcher((Book::author / Author::name).toDotPath(), contains())

// String-path equivalent
ExampleMatcher.matching()
  .withMatcher("author.name", contains())
```

## [](#removal-of-spring-data-for-apache-solr-from-the-release-train)[](#solr)Removal of Spring Data for Apache Solr from the Release Train

This release train no longer ships with Spring Data for Apache Solr. After [deprecating Spring Data Solr in 2020](https://spring.io/blog/2020/04/07/spring-data-for-apache-solr-discontinued), the team has decided to discontinue maintenance of the Solr module. However, we are going to keep shipping service releases for the maintained 4.2 and 4.3 development lines until they reach their end of life in May 2021 and November 2021, respectively. Moving forward, we recommend using [Spring Data Elasticsearch](https://github.com/spring-projects/spring-data-elasticsearch/) as the Spring Data module of choice for full-text search arrangements. Spring Data Elasticsearch is an actively maintained community module.

## [](#querybyexample-for-r2dbc-and-oracle-support)[](#query-by-example)`QueryByExample` for R2DBC and Oracle support

[Query by Example](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#query-by-example) is a user-friendly querying technique with a simple interface. It allows dynamic query creation and does not require writing queries that contain field names. In fact, Query by Example does not require you to write queries by using SQL at all. It is available for multiple Spring Data modules. As of Spring Data R2DBC 1.3, you can query relational data by using examples through Spring Data R2DBC’s implementation of `ReactiveQueryByExampleExecutor`.

```
CopyPersonRepository people  = …;
DatabaseClient client = …;

var skyler = new Person(null, "Skyler", "White", 45);
var walter = new Person(null, "Walter", "White", 50);
var flynn = new Person(null, "Walter Jr. (Flynn)", "White", 17);
var marie = new Person(null, "Marie", "Schrader", 38);
var hank = new Person(null, "Hank", "Schrader", 43);

var example = Example.of(new Person(null, null, "White", null));

people.count(example).as(StepVerifier::create)
  .expectNext(3L)
  .verifyComplete();

var example = Example.of(new Person(null, "Walter", "WHITE", null), matching()
  .withIgnorePaths("age"). //
  .withMatcher("firstname", startsWith())
  .withMatcher("lastname", ignoreCase()));

people.findAll(example).collectList()
  .as(StepVerifier::create)
  .consumeNextWith(actual -> {
    assertThat(actual).containsExactlyInAnyOrder(flynn, walter);
  })
  .verifyComplete();
```

Alongside other improvements, you can use Spring Framework 5.3.6 and Spring Data R2DBC 1.3 with Oracle’s [`oracle-r2dbc`](https://github.com/oracle/oracle-r2dbc) (`com.oracle.database.r2dbc:oracle-r2dbc`) driver. Creating `DatabaseClient` or `R2dbcEntityTemplate` by using the Oracle `ConnectionFactory` selects the appropriate bind marker strategy and dialect.

## [](#enabling-cassandra-prepared-statements-for-repositories-and-cassandratemplate)[](#cassandra)Enabling Cassandra Prepared Statements for Repositories and `CassandraTemplate`

Spring Data for Apache Cassandra accommodates for Cassandra-specific features wherever possible. Since its major rewrite in version 2.0, we introduced [`CachedPreparedStatementCreator`](https://docs.spring.io/spring-data/cassandra/docs/current/api/org/springframework/data/cassandra/core/cql/support/CachedPreparedStatementCreator.html) for prepared statement caching on the `CqlTemplate` level, which allowed the use of prepared statements using plain CQL.

With this release, we bring prepared statement support on `CassandraTemplate` and its reactive and asynchronous variants. In fact, prepared statements are enabled by default. The main difference between `CqlTemplate` and `CassandraTemplate` is the abstraction level and the responsibility of CQL statement creation. `CqlTemplate` requires CQL as input. `CassandraTemplate` uses entities as input and generates CQL statements based on the actual action that should be performed using the entity.

The change to provide prepared statement functionality comes with a few changes when issuing queries:

1.  Parameters are bound by index when using `StatementBuilder`. `StatementBuilder` is used in all arrangements when building CQL queries for entity-related operations.
    
2.  When binding parameters by index, inspecting a `SimpleStatement` renders parameter bind markers within its CQL. CQL logging of `CqlTemplate` is affected by this change as well: The logged CQL contains now `?` instead of the literal value.
    

These changes are required to allow statement preparation of parameterized statements. A statement to run is first prepared. Then, in a second step, it is bound with its actual parameters and then sent to the server for execution.

Cassandra’s Java driver keeps track of prepared statement caching, so no work is required in terms of bean setup. Generally, you should experience a better query performance. Also, keep in mind that prepared statement caching requires additional memory to keep track of the prepared statement.

You can disable prepared statement usage on `CassandraTemplate` and its reactive and asynchronous variants:

```
Copyvar template = new CassandraTemplate(session);
template.setUsePreparedStatements(false);
```

You can find more detail in the [Spring Data for Apache Cassandra reference documentation](https://docs.spring.io/spring-data/cassandra/docs/current/reference/html/#cassandra.template.prepared-statements).

## [](#document-unwrapping-support--relaxed-aggregation-type-checks-for-mongodb)[](#mongodb)Document Unwrapping Support & Relaxed Aggregation Type Checks for MongoDB

Value objects and record types help us create clearly structured domain models with maximum expressiveness. However, persisting those finely crafted models does not necessarily lead to a well-structured database document. What looks good in Java or Kotlin may cause unintended repetition of property names and deeply nested structures in the MongoDB native Document format that embeds entities within their parent structure. Consider the following trivial snippet and its representation:

```
Copyclass User {
  private String id;
  private Email email;
  // …
}

record Email (String email) {}

{
  "_id" : "9708-ac32-beb0",
  "email" : {
    "email" : "me@home.somewhere"
  },
  // …
}
```

Although this works, it is obviously not an idiomatic representation for a document store, and that is exactly where `@Unwrapped` comes into play. The annotation lets you flatten out (unwrap) a property into its parent:

```
Copy class User {
  private String id;
  @Unwrapped(onEmpty = OnEmpty.USE_NULL)
  private Email email;
  // …
}
```

`@Unwrapped` forces you to make a decision about how nonexistent values are treated by choosing an `onEmpty` (none of the fields represented by the record is present) behavior. For those of you who prefer less verbose annotations, feel free to use `@Unwrapped.Nullable` as an alternative or to create your own annotation by using `@Unwrapped` as a meta annotation. Either way, the resulting document looks much more appealing:

```
Copy{
  "_id" : "9708-ac32-beb0",
  "email" : "me@home.somewhere",
  // …
}
```

Both repositories and `MongoTemplate` are able to deal with unwrapped properties. See the [reference documentation](https://docs.spring.io/spring-data/mongodb/docs/3.2.0/reference/html/#unwrapped-entities) for more information. Also, check out the [examples for `@Unwrapped`](https://github.com/spring-projects/spring-data-examples/blob/211d1440a26eebe407ae044eca4f7318232299b8/mongodb/example/src/test/java/example/springdata/mongodb/unwrapping/UnwrappingIntegrationTests.java).

## [](#support-for-jmolecules)[](#jmolecules)Support for jMolecules

The Spring Data repository abstraction has always been a core concept within the project. It is a programming model for an architectural concept coined in Domain-Driven Design (DDD): the repository abstracts a collection of aggregates. In fact, Spring Framework itself aligns with a few other abstractions originating in DDD (such as services) and provides annotations to express them in user code. However, users often do not like to use framework-specific annotations and abstractions to express those concepts.

The [jMolecules](https://github.com/xmolecules/jmolecules) project focuses solely on providing annotation and type-based abstractions with which different architectural concepts for technology can integrate. It essentially inverts the relationship: user code depends only on jMolecules annotations and interfaces, and technology integration is then provided — in a second step — either from [the extensive jMolecules integrations library](https://github.com/xmolecules/jmolecules-integrations) or the frameworks themselves.

### [](#modeling-associations)[](#modeling-associations)Modeling Associations

One of the core abstractions in the Domain-Driven Design module of jMolecules is the `Association` interface. It is typed to an `AggregateRoot` as well as its `Identifier` and is used in domain models to express a relationship to an aggregate in a strongly typed way:

```
Copyclass Order implements AggregateRoot<Order, OrderIdentifier> {

  OrderIdentifier id;
  Association<Customer, CustomerIdentifier> customer;
}
```

Both `Order` and `Customer` are aggregates in this model, and the association between the two is explicitly mapped through the jMolecules `Association` type. Spring Data 2021.0.0 ships mapping support for `Association`s. They are properly detected as Spring Data associations and converted by using the identifier backing the instance.

To transparently enable the support for those abstractions, add `org.jmolecules.integrations:jmolecules-spring` to your classpath. Spring Data’s mapping infrastructure detects that and automatically registers the necessary converters in the conversion parts of our object mapping facilities.

Support for `Association` instances is also provided for JPA. However, in this case, Spring Data does not provide the actual translation, which is provided through integration with `AttributeConverter` implementations provided by jMolecules itself. Using [its ByteBuddy extension](https://github.com/xmolecules/jmolecules-integrations/tree/main/jmolecules-bytebuddy#reduce-boilerplate-for-aggregateroot-implementations) you can generate the necessary `AttributeConverter` implementations and annotation configuration.

### [](#mapping-between-identifiers-and-aggregate-instances)[](#mapping-between-identifiers-and-aggregate-instances)Mapping between identifiers and aggregate instances

jMolecules' `Identifier` interface incentivizes the use of dedicated identifier types for aggregates, as in the `OrderIdentifier` and `CustomerIdentifier` type used in the earlier example. When serializing the `Association`, we now effectively have to translate the instance into a `CustomerIdentifier` by calling `Association.getId()` and `Identifier.getId()` in turn to get to the value to actually persist. To materialize the association, we have to take the raw persisted value, create a `CustomerIdentifier` instance by using an exposed, static factory method named `….of(…)` and eventually call `Association.of(…)` again.

All these translation steps are implemented in [`jmolecules-integrations`](https://github.com/xmolecules/jmolecules-integrations) and transparently added by Spring Data to the Spring `ConversionService` for use by the framework. Assuming the `OrderIdentifier` is backed by a `String` representation of a `UUID`, that also means that Spring Data’s `DomainClassConverter` is able to automatically bind a fully materialized aggregate instance to a Spring MVC controller method:

```
Copy@RestController
class MyController {

  @GetMapping("/orders/{id}")
  HttpEntity<?> getOrders(@PathVariable("id") Order order) { /* … */ }
}
```

In this example, a GET request to `/orders/462a692d-…` automatically translates `462a692d-…` into an `OrderIdentifier` by using the jMolecules converters first and then using the repository declared for `Order` to look up the aggregate instance. While the [general mechanism](https://docs.spring.io/spring-data/commons/docs/current/reference/html/#core.web.basic.domain-class-converter) has been available for quite a while in Spring Data, the 2021.0.0 release adds the necessary, additional integration for jMolecules `Identifier` implementations.

## [](#spring-data-rest-aggregate-reference-mapping-for-dtos)[](#spring-data-rest)Spring Data REST Aggregate Reference Mapping for DTOs

The previously mentioned jMolecules `Converter` implementations are also used in all places in which Spring Data REST needs to obtain and transform aggregate identifiers into URIs. The module also ships with a new Jackson deserializer that allows binding Spring Data REST managed aggregate instances into DTOs by deserializing URIs properly. Assume you have `Order` managed by Spring Data REST and exposed through `/orders/…` and a customer controller arrangement that looks like this:

```
Copy@BasePathAwareController
class MyCustomController {

  @PostMapping("/orders")
  HttpEntity<?> postOrder(@RequestBody MyDto payload) {
    /* Process submission */
  }
}

@Data
class MyDto {
  List<Order> orders;
}
```

Now also assume the following payload submitted for the request:

```
Copy{
  "orders" : [
    "…/orders/462a692d-…"
  ]
}
```

Despite `MyDto` being an ordinary data transfer object, the `payload` instance contains the aggregate instance identified by `462a692d-…` as an element of the `orders` link.
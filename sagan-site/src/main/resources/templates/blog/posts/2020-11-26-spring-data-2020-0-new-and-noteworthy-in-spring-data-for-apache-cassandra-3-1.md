---
title: Spring Data 2020.0 - New and Noteworthy in Spring Data for Apache Cassandra 3.1
source: https://spring.io/blog/2020/11/26/spring-data-2020-0-new-and-noteworthy-in-spring-data-for-apache-cassandra-3-1
scraped: 2026-02-23T13:40:12.348Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  November 26, 2020 | 0 Comments
---

# Spring Data 2020.0 - New and Noteworthy in Spring Data for Apache Cassandra 3.1

_Engineering | Mark Paluch |  November 26, 2020 | 0 Comments_

[Spring Data `2020.0.0`](https://spring.io/blog/2020/11/06/spring-data-2020-0-new-and-noteworthy-a-general-overview) ships with Spring Data for Apache Cassandra 3.1. This release ships with numerous enhancements that refine existing functionality and introduce support for selected Cassandra 4 features:

-   Reactive auditing
-   Reactive SpEL support in `@Query` query methods.
-   Configuration of the keyspace per `Statement` through `CqlTemplate` and `QueryOptions`.
-   Revised `CqlOperations` with new `queryForStream(…)` methods returning a `Stream` with transparent pagination.
-   `DataClassRowMapper` to map Cassandra results to data classes via constructor creation/bean properties

## [](#reactive-auditing)Reactive Auditing

Reactive auditing is enabled by annotating your configuration class with `@EnableReactiveCassandraAuditing`. Registering a bean that implements `ReactiveAuditorAware` serves as an interface to obtain the current auditor. The following example shows the required configuration:

```java
Copy@Configuration
@EnableReactiveCassandraAuditing  
class ApplicationConfiguration {  
  
  @Bean  
  ReactiveAuditorAware<String> reactiveAuditorAware() {  
      return …;
   }  
}
```

After enabling reactive auditing, you can use Spring Data's auditing annotations in your domain class. If you have used Spring Data auditing before, then you may notice that there's no difference in setting up the domain model compared to imperative usage of Spring Data.

```java
Copypublic class Order implements Persistable<String> {  
    
   @Id String orderId;  
  
   @CreatedBy String createdBy;  
  
   @CreatedDate Instant createdDate;  
  
   @LastModifiedBy String lastModifiedBy;  
  
   @LastModifiedDate Instant lastModifiedDate;   
}
```

The domain class shown above refers to the auditor by using properties annotated with `@CreatedBy` and `@LastModifiedBy`. Properties that hold the creation or modification time are annotated with `@CreatedDate` or `@LastModifiedDate`, respectively.

You might have noticed that the domain class implements `Persistable`. To properly mark an entity as audited, Spring Data needs to know whether an entity is new or whether it should be considered to exist in the database. Typically, this happens by inspecting the `@Id` property to see whether it is `null`. Cassandra has no means to generate primary key values. New objects must be persisted with a provided identifier. Therefore, your domain model must express whether it should be considered new or existing (see `Persistable.isNew()`). Alternatively, Spring Data can inspect the `@Version` property when using optimistic locking to tell whether an entity should be considered new.

You can use Reactive Auditing through reactive Cassandra repositories and through `ReactiveCassandraTemplate`.

A final note on the migration: With the introduction of reactive auditing, the entire reactive auditing infrastructure is registered only when your configuration is marked with `@EnableReactiveCassandraAuditing`. The previous version (3.0.x) registered a lightweight auditing called `EntityCallback` when `@EnableCassandraAuditing` was configured. That is no longer the case, so make sure to revisit your annotation-based configuration if you have previously used auditing features.

You can read more about [auditing with Apache Cassandra](https://docs.spring.io/spring-data/cassandra/docs/current/reference/html/#auditing) in the [Spring Data Cassandra reference documentation](https://docs.spring.io/spring-data/cassandra/docs/current/reference/html/).

## [](#keyspace-configuration-per-statement)Keyspace configuration per Statement

Cassandra 4 allows specifying the target keyspace on a per-statement level. Instead of running statements in the logged keyspace, individual statements can target a different keyspace. To support this feature, Spring Data for Apache Cassandra allows configuration of the keyspace through:

-   `CqlTemplate` (including `AsyncCqlTemplate` and `ReactiveCqlTemplate`)
-   `QueryOptions` (including subclasses)

Configuring a keyspace on the Template API allows running all statements through a particular template on a different keyspace than the logged keyspace. A typical use case could be a keyspace per tenant model:

```java
CopyCqlSession cqlSession = …;  
CqlTemplate tenant1Template = new CqlTemplate(cqlSession);  
tenant1Template.setKeyspace(CqlIdentifier.fromCql("my-other-keyspace"));  
tenant1Template.queryForList("SELECT …");
```

`CqlTemplate` and its asynchronous and reactive variants are used by `CassandraTemplate` and the repository infrastructure, which allows wiring an entire stack to a different keyspace.

To customize the keyspace for individual operations on `CassandraTemplate`, you can use `QueryOptions` and its operation-specific subclasses to control the keyspace:

```java
CopyCassandraTemplate template = …;  
  
template.insert(person, InsertOptions.builder().keyspace("my-other-keyspace").build());
```

Note that this feature requires Cassandra 4, and it does not affect earlier Cassandra versions.

## [](#revised-cqltemplate-and-asynchronousreactive-variants)Revised CqlTemplate and asynchronous/reactive variants

With this release, we took the opportunity to refine our CQL Template API. For quite a while already, we wanted `CqlTemplate` to support Java 8 Stream, including transparent paging on `CqlTemplate`. Its reactive counterpart, `ReactiveCqlTemplate`, supported this feature with `queryForFlux` (since version 2.0). With this version, you can use `queryForStream` on `CqlTemplate`, allowing for lazy iteration over a `java.util.stream.Stream`:

```java
CopyCqlTemplate template = …;

Stream<String> stream = cqlTemplate.queryForStream("SELECT * from USERS", (row, index) -> row.getString(0));
```

Additionally, `queryForStream` serves `CassandraTemplate.stream(…)` to run queries that return a stream of entities.

The use of lightweight data classes and records (as of Java 15 and newer) becomes an increasingly popular choice for ad-hoc mapping of results. Instead of using the Entity-oriented `CassandraTemplate`, this release enables a more lightweight pattern to consume query results as plain Java beans, Kotlin data classes, and Java records. `DataClassRowMapper` is a dedicated `RowMapper` that instantiates classes following the data class/Java records pattern by inspecting their constructor properties. The following example illustrates Java Records usage:

```java
Copyrecord User(String id, String name, int age){}

CqlTemplate template = …;

Stream<User> stream = cqlTemplate.queryForStream("SELECT * from USERS", new DataClassRowMapper(User.class));
```

Here is the Kotlin data class variant:

```kotlin
Copydata class User(id: String, name: String, age: Int)

val stream : Stream<Person> = cqlTemplate.queryForStream("SELECT * from USERS", DataClassRowMapper<User>())
```

You can use `DataClassRowMapper` with all `CqlTemplate` variants as all of these accept `RowMapper`.
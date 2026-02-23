---
title: Spring Data R2DBC 1.0 M1 released
source: https://spring.io/blog/2018/12/12/spring-data-r2dbc-1-0-m1-released
scraped: 2026-02-23T15:04:36.292Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  December 12, 2018 | 12 Comments
---

# Spring Data R2DBC 1.0 M1 released

_Releases | Mark Paluch |  December 12, 2018 | 12 Comments_

It’s my pleasure to announce the first milestone of Spring Data R2DBC. Spring Data R2DBC is Spring's client project for [R2DBC](https://r2dbc.io). With Spring Data R2DBC you get end to end reactive ad-hoc query execution and Spring Data repositories for relational databases.

Spring Data R2DBC embraces functional-reactive integration of relational databases by providing `DatabaseClient` as its central abstraction. The following example shows how to bootstrap `DatabaseClient` without spinning up a Spring context:

```java
CopyPostgresqlConnectionFactory connFactory = new PostgresqlConnectionFactory(
  PostgresqlConnectionConfiguration.builder()
    .host(…)
    .database(…)
    .username(…)
    .password(…)
    .build());

DatabaseClient databaseClient = DatabaseClient.create(connFactory);
```

Spring Data R2DBC is built on top of R2DBC SPI so you can plug in various drivers (as of R2DBC 1.0 M6):

-   [Postgres](https://github.com/r2dbc/r2dbc-postgresql) (`io.r2dbc:r2dbc-postgresql`)
-   [H2](https://github.com/r2dbc/r2dbc-h2) (`io.r2dbc:r2dbc-h2`)
-   [Microsoft SQL Server](https://github.com/r2dbc/r2dbc-mssql) (`io.r2dbc:r2dbc-mssql`)

This Spring Data R2DBC milestone ships with the following initial feature set:

-   `DatabaseClient` as gateway to reactive generic SQL execution.
-   Reactive transaction support through `TransactionalDatabaseClient`.
-   Support functions such as `select()` and `insert()` to be used with mapped objects.
-   Dialect support for Postgres, H2, and Microsoft SQL Server.
-   Java Configuration support with `AbstractR2dbcConfiguration`.
-   Reactive Repository support through `@EnableR2dbcRepositories` and annotated `@Query` methods.
-   Exception Translation for R2DBC Exceptions into [Spring's DAO Exception hierarchy](https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#dao-exceptions).

Here's a collection of [examples](https://github.com/spring-projects/spring-data-examples/tree/master/r2dbc/example) for `DatabaseClient` usage. Note also the usage of native parameter bind markers:

```java
CopyMono<Integer> count = databaseClient.execute()
        .sql("INSERT INTO person (id, firstname, lastname) VALUES($1, $2, $3)")
        .bind("$1", 42055)
        .bind("$2", "Walter")
        .bindNull("$3", String.class)
        .fetch()
        .rowsUpdated();

Flux<Map<String, Object>> rows = databaseClient.select()
        .from("person")
        .orderBy(Sort.by(desc("id")))
        .fetch()
        .all();

Flux<Person> rows = databaseClient.select()
        .from(Person.class)
        .orderBy(Sort.by(desc("id")))
        .fetch()
        .all();
```

If you're already familiar with Spring Data's Repository abstraction, then you will recognize that Spring Data R2DBC repositories follow the exact same idea of extending `ReactiveCrudRepository`:

```java
Copyinterface PersonRepository extends ReactiveCrudRepository<Person, Integer> {

  @Query("SELECT * FROM person WHERE firstname like $1")
  Flux<Person> findByFirstNameContains(String firstname);

  @Query("SELECT * FROM legoset WHERE firstname = $1 AND lastname = $2")
  Mono<Person> findByFirstnameAndLastname(String firstname, String lastname);
}
```

You can obtain Spring Data R2DBC 1.0 M1 from our milestone repository. To do so, include the following lines in your `pom.xml` file:

```xml
Copy<repository>
  <id>spring-libs-milestone</id>
  <url>https://repo.spring.io/libs-milestone</url>
</repository>

<dependencies>
  <dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-r2dbc</artifactId>
    <version>1.0.0.M1</version>
  </dependency>
</dependencies>
```

We're excited to hear what you think about Spring Data R2DBC. Get in touch with [@SpringData](https://twitter.com/SpringData)!

To round things off, here are links to the changelog, GitHub repository, and examples:

-   Project Repository: [github.com/spring-projects/spring-data-r2dbc](https://github.com/spring-projects/spring-data-r2dbc)
-   Issue Tracker: [github.com/spring-projects/spring-data-r2dbc/issues](https://github.com/spring-projects/spring-data-r2dbc/issues)
-   Examples: [github.com/spring-projects/spring-data-examples](https://github.com/spring-projects/spring-data-examples/tree/master/r2dbc/example)
-   [Artifacts](https://repo.spring.io/libs-milestone/org/springframework/data/spring-data-r2dbc/1.0.0.M1/) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M1/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M1/reference/html/) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.M1/changelog.txt)
---
title: Reactive Programming and Relational Databases
source: https://spring.io/blog/2018/12/07/reactive-programming-and-relational-databases
scraped: 2026-02-23T15:05:09.065Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  December 07, 2018 | 23 Comments
---

# Reactive Programming and Relational Databases

_Engineering | Mark Paluch |  December 07, 2018 | 23 Comments_

Imperative code eats threads at the pace of incoming requests while [Software is eating the world](https://a16z.com/2016/08/20/why-software-is-eating-the-world/). This post discusses the assumptions for reactive programming on the JVM and what this means for integrations – in particular, relational databases.

The motivation to come up with a post is [the constant increase in reactive programming adoption](https://trends.google.de/trends/explore?date=today%205-y&q=reactive%20java) while some major building blocks are not yet available – in particular, the question: What about relational databases?

## [](#what-is-reactive-programming)What is Reactive Programming

There are a lot of answers about what Reactive Programming is and how this compares to [Reactive Systems](https://www.reactivemanifesto.org/). I see Reactive Programming as a programming model that facilitates scalability and stability by creating event-driven non-blocking functional pipelines that react to availability and processability of resources. Deferred execution, [concurrency and asynchronicity](https://projectreactor.io/docs/core/release/reference/#schedulers) are only a consequence of the underlying programming model.

The full benefits of reactive programming come into effect only if the entire stack is reactive and if all participating components (application code, runtime container, integrations) respect deferred execution, non-blocking APIs and the streaming nature of dataflow – basically following the underlying assumptions.

While it's possible to bring non-reactive components to an application that is written in a functional-reactive style, the net result is that the scalability and stability effects, the actual expected benefits, decrease. In the worst case, there's little or no difference in runtime behavior. However, reactive programming helps to improve the readability of code.

If we look across the reactive ecosystem, we will discover several frameworks, libraries, and integrations. Each of them has its specific strengths. A lot of functional areas are well covered, either with a generic approach or within the context of a particular reactive framework. So let's discuss relational database integrations.

## [](#relational-databases-and-reactive)Relational Databases and Reactive

It's [no secret that relational database are popular](https://db-engines.com/en/ranking) and, presumably, most enterprise projects rely heavily on relational database usage. In any case, the most asked question is: When will we get to APIs for reactive relational database integrations?

Java uses JDBC as the primary technology to integrate with relational databases. JDBC is of a blocking nature – there's nothing sensible one could do to mitigate the blocking nature of JDBC. The first idea for how to make calls non-blocking is offloading JDBC calls to an `Executor` (typically `Thread` pool). While this approach somewhat works, it comes with several drawbacks that neglect the benefits of a reactive programming model.

Thread pools require – no surprise – threads to run. Reactive runtimes typically use a limited number of threads that match the number of CPU cores. Additional threads introduce overhead and reduce the effect of thread limiting. Additionally, JDBC calls typically pile up in a queue, and once the threads are saturated with requests, the pool will block again. So, JDBC is right now not an option.

## [](#reactive-database-efforts)Reactive Database Efforts

There are a couple of independent drivers such as [Reactiverse's reactive-pg-client](https://github.com/reactiverse/reactive-pg-client). These drivers come with a vendor-specific API and aren't really suited for broader adoption. Client integrators would need to provide additional layers to expose a common API. New drivers cannot easily be plugged into the client library. In contrast, having a standard API would allow pluggability while decoupling clients from database specific solutions – a huge value for all.

Oracle announced [ADBA](https://blogs.oracle.com/java/jdbc-next:-a-new-asynchronous-api-for-connecting-to-a-database), which is an initiative to provide a standardized API for asynchronous database access in Java by using futures. Everything in ADBA is a work in progress, and the team behind ADBA is happy to get feedback. A bunch of Postgres folks is working on a [Postgres ADBA driver](https://github.com/pgjdbc/pgadba) that can be used for first experiments. [PgNio](https://github.com/cretz/pgnio) is another asynchronous driver for Postgres that started experimenting with ADBA.

ADBA's availability is unknown. It's definitely not coming with Java 12. The version of Java in which ADBA plans to debut is frankly unknown at this time.

The following snippet shows ADBA usage with `INSERT` and `SELECT` statements:

```java
CopyDataSource ds = dataSource();
CompletableFuture<Long> t;

try (Session session = ds.getSession()) {

  Submission<Long> submit = session
  .<Long>rowCountOperation(
    "INSERT INTO legoset (id, name, manual) " +
    "VALUES($1, $2, $3)")
    .set("$1", 42055, AdbaType.INTEGER)
    .set("$2", "Description", AdbaType.VARCHAR)
    .set("$3", null, AdbaType.INTEGER)
    .apply(Result.RowCount::getCount)
    .submit();

  t = submit.getCompletionStage().toCompletableFuture();
}

t.join();

CompletableFuture<List<Map<String, Object>>> t;
try (Session session = ds.getSession()) {

  Submission<List<Map<String, Object>>> submit = session
    .<List<Map<String, Object>>> rowOperation(
      "SELECT id, name, manual FROM legoset")
    .collect(collectToMap()) // custom collector
    .submit();
  t = submit.getCompletionStage().toCompletableFuture();
}

t.join();
```

Note that `collectToMap(…)` stands as an example of an application-provided function that extracts results into the desired return type.

TL;DR, there's no reactive API available to access relational databases.

## [](#r2dbc-to-the-rescue)R2DBC to the Rescue!

Lacking a standard API and the non-availability of drivers, a team at [Pivotal](https://pivotal.io/) started to investigate the idea of a reactive relational API that would be an ideal fit for reactive programming purposes. They came up with [R2DBC](http://r2dbc.io/) which stands for Reactive Relational Database Connectivity. As of now, R2DBC is an incubator project to evaluate the feasibility and to start discussions whether driver vendors are interested in supporting reactive/non-blocking/asynchronous drivers.

As of now, there are three driver implementations:

-   [PostgreSQL](https://github.com/r2dbc/r2dbc-postgresql)
-   [H2](https://github.com/r2dbc/r2dbc-h2)
-   [Microsoft SQL Server](https://github.com/r2dbc/r2dbc-mssql)

R2DBC comes with an API specification (`r2dbc-spi`) and a client (`r2dbc-client`) that makes the SPI usable for applications.

The following snippet shows R2DBC SPI usage with `INSERT` and `SELECT` statements:

```java
CopyConnectionFactory connectionFactory = null;

Mono<Integer> count = Mono.from(connectionFactory.create())
  .flatMapMany(it ->
    it.createStatement(
    "INSERT INTO legoset (id, name, manual) " +
    "VALUES($1, $2, $3)")
      .bind("$1", 42055)
      .bind("$2", "Description")
      .bindNull("$3", Integer.class)
      .execute())
  .flatMap(io.r2dbc.spi.Result::getRowsUpdated)
  .next();

Flux<Map<String, Object>> rows = Mono.from(connectionFactory.create())
  .flatMapMany(it -> it.createStatement(
    "SELECT id, name, manual FROM legoset").execute())
  .flatMap(it -> it.map((row, rowMetadata) -> collectToMap(row, rowMetadata)));
```

While the code above is sort of bulky, R2DBC also comes with a Client library project for a more humane user API. R2DBC SPI is not intended for direct usage but rather to be consumed through a client library.

The same code rewritten with R2DBC Client would be:

```java
CopyR2dbc r2dbc = new R2dbc(connectionFactory);

Flux<Integer> count = r2dbc.inTransaction(handle ->
  handle.createQuery(
    "INSERT INTO legoset (id, name, manual) " +
    "VALUES($1, $2, $3)")
    .bind("$1", 42055)
    .bind("$2", "Description")
    .bindNull("$3", Integer.class)
    .mapResult(io.r2dbc.spi.Result::getRowsUpdated));

Flux<Map<String, Object>> rows = r2dbc
  .inTransaction(handle -> handle.select(
    "SELECT id, name, manual FROM legoset")
  .mapRow((row, rowMetadata) -> collectToMap(row, rowMetadata));
```

Note that `collectToMap(…)` stands as example for an application-provided function that extracts results into the desired return type.

The Spring Data team started [Spring Data R2DBC](https://github.com/spring-projects/spring-data-r2dbc) as an incubator to provide reactive APIs through a database client and to support reactive repositories. The example code rewritten with Spring Data R2DBC would be:

```java
CopyDatabaseClient databaseClient = DatabaseClient.create(connectionFactory);

Mono<Integer> count = databaseClient.execute()
  .sql(
    "INSERT INTO legoset (id, name, manual) " +
    "VALUES($1, $2, $3)")
  .bind("$1", 42055)
  .bind("$2", "Description")
  .bindNull("$3", Integer.class)
  .fetch()
  .rowsUpdated();

Flux<Map<String, Object>> rows = databaseClient.execute()
  .sql("SELECT id, name, manual FROM legoset")
  .fetch()
  .all();
```

R2DBC and its eco-system are still young and ask for experiments and feedback to collect use cases and to see whether a reactive relational database integration would make sense.

## [](#jdbc-on-fibers)JDBC on Fibers

Let's talk about a combination of technologies. While JDBC and other technologies expose blocking APIs (mostly due to waiting on I/O), there's [Project Loom](https://openjdk.java.net/projects/loom/) in the making. Loom introduces `Fibers` as a light-weight abstraction that will turn blocking APIs into non-blocking ones. This is possible by stack switching as soon as an invocation hits a blocking API. So the underlying `Fiber` attempts to continue on a previous flow that was using a blocking API.

The `Fiber` execution model drastically reduces the number of required native threads. The consequence is better scalability and non-blocking behavior – by offloading blocking calls to a `Fiber`\-backed `Executor`. All we need here is a proper API that allows consumption of a non-blocking JDBC on `Fiber`s implementation.

## [](#conclusion)Conclusion

What does the future hold for reactive programming and relational databases? Honestly, I don't know. If I attempted an educated guess, I can see Project Loom and a Fiber-based Executor combined with well-established JDBC drivers as a potential game changer in the industry. With Java's accelerated release cadence, that may not be far away.

ADBA targets inclusion in the Java Standard runtime, which I foresee coming no sooner than Java 17, which would be sometime in 2021, according to the current schedule.

Contrast that with R2DBC, which is available now. It comes with drivers and clients and allows experimental usage. A neat side effect of R2DBC is that it exposes a fully reactive API while being independent of the underlying database engine. With releases already happening, there's no need to guess about Project Loom nor wait potentially three years to test drive an API. It's possible today with R2DBC.
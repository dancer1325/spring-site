---
title: Reactive Transactions with Spring
source: https://spring.io/blog/2019/05/16/reactive-transactions-with-spring
scraped: 2026-02-23T14:47:15.318Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  May 16, 2019 | 17 Comments
---

# Reactive Transactions with Spring

_Engineering | Mark Paluch |  May 16, 2019 | 17 Comments_

Back in 2016, our reactive journey started with Spring Framework 5 accompanied by a couple of reactive integrations. Throughout our journey, other projects joined the reactive movement. With R2DBC, we now also provide a reactive integration for SQL databases. With the growth of transaction-capable integrations, we constantly got asked:

## [](#does-spring-framework-support-reactive-transaction)Does Spring Framework support Reactive @Transaction?

At the time our journey began, we had no reactive form of transactional integrations, so this question was simple to answer: There’s no need for reactive transaction management.

Over time, MongoDB started to support multi-document transactions with MongoDB Server 4.0. R2DBC (the specification for reactive SQL database drivers) started to emerge, and we decided to pick up on R2DBC with Spring Data R2DBC. Both projects wanted to expose transactional behavior, so they eventually provided `inTransaction(…)` methods on their Template APIs to perform units of work guarded by native transactions.

While it is convenient to use an `inTransaction(…)` method for smaller chunks of work, it does not reflect the Spring way of supporting transactions. When working with imperative programming models, Spring Framework allows for two arrangements of transaction management: `@Transactional` and `TransactionTemplate` (declarative respective programmatic transaction management).

Both approaches to transaction management are built on top of `PlatformTransactionManager`, which manages transactions for transactional resources. `PlatformTransactionManager` can be either a Spring-provided transaction manager implementation or a Java EE one based on JTA.

Both approaches have in common that they bind the transactional state to `ThreadLocal` storage, which allows for transactional state management without passing a `TransactionStatus` object. Transaction management should happen in the background in a non-invasive manner. `ThreadLocal` works in imperative programming arrangements because of the underlying assumption that we do not engage threads to continue work within a transaction.

## [](#how-imperative-transaction-management-works)How Imperative Transaction Management Works

Transaction management needs to associate its transactional state with an execution. In imperative programming, this is typically a `ThreadLocal` storage – Transactional state is bound to a `Thread`. The underlying assumption is that transactional code gets executed on the same thread on which the container has invoked it.

Reactive programming models remove this fundamental assumption of imperative (synchronous/blocking) programming models. Taking a closer look at reactive execution, we can observe that code gets executed on different threads. This gets more visible when using inter-process communication. We can no longer safely assume that our code is fully executed on the same thread.

This change in assumptions invalidates transaction management implementations that rely on `ThreadLocal`.

Thread switches happen at arbitrary times, due to integrations and optimizations such as operator fusion. This change breaks all code that relies on `ThreadLocal`. The consequence is that we need a different arrangement to reflect transactional state without passing a `TransactionStatus` object all the time.

Associating out-of-band data is not a new requirement in the reactive space. We faced this requirement in other areas, such as the `SecurityContext` with Spring Security for reactive method security (to name one example). Project Reactor, the reactive library on top of which Spring builds its reactive support, has provided support for subscriber contexts since version 3.1.

Reactor `Context` is to reactive programming what `ThreadLocal` is to imperative programming: Contexts allow binding contextual data to a particular execution. For reactive programming, this is a `Subscription`. Reactor’s `Context` lets Spring bind the transaction state, along with all resources and synchronizations, to a particular `Subscription`. All reactive code that uses Project Reactor can now participate in reactive transactions. Code that returns scalar values and that wants to access transactional details must be rewritten to use reactive types to participate in transactions. Otherwise, the `Context` is not available.

## [](#reactive-transaction-management)Reactive Transaction Management

Starting with Spring Framework 5.2 M2, Spring supports reactive transaction management through the `ReactiveTransactionManager` SPI.

`ReactiveTransactionManager` is a transaction management abstraction for reactive and non-blocking integrations that uses transactional resources. It is a foundation for reactive `@Transactional` methods that return `Publisher` types and for programmatic transaction management that uses `TransactionalOperator`.

The first two reactive transaction manager implementations are:

-   R2DBC through Spring Data R2DBC 1.0 M2
-   MongoDB through Spring Data MongoDB 2.2 M4

Let’s take a look at how reactive transactions look like:

```java
Copyclass TransactionalService {

  final DatabaseClient db

  TransactionalService(DatabaseClient db) {
    this.db = db;
  }

  @Transactional
  Mono<Void> insertRows() {

    return db.execute()
      .sql("INSERT INTO person (name, age) VALUES('Joe', 34)")
      .fetch().rowsUpdated()
      .then(db.execute().sql("INSERT INTO contacts (name) VALUES('Joe')")
      .then();
  }
}
```

Reactive transactions look very similar to imperative transactions in annotation-driven arrangements. The main difference though is that we work with `DatabaseClient`, which is a reactive resource abstraction. All transaction management happens behind the scenes, leveraging Spring’s transaction interceptors and `ReactiveTransactionManager`.

Spring distinguishes (based on method return types) which type of transaction management to apply:

-   Method returns a `Publisher` type: Reactive Transaction Management
-   All other return types: Imperative Transaction Management

This distinction is significant, as you could still use imperative components such as a JPA or JDBC query. Wrapping these results into a `Publisher` type signals Spring to apply reactive rather than imperative transaction management. That being said, a reactive transaction arrangement does not open a `ThreadLocal`\-bound transaction, which is required for JPA or JDBC.

## [](#transactionaloperator)TransactionalOperator

As a next step, let’s take a look at programmatic transaction management by using `TransactionalOperator`:

```java
CopyConnectionFactory factory = …
ReactiveTransactionManager tm = new R2dbcTransactionManager(factory);
DatabaseClient db = DatabaseClient.create(factory);

TransactionalOperator rxtx = TransactionalOperator.create(tm);

Mono<Void> atomicOperation = db.execute()
  .sql("INSERT INTO person (name, age) VALUES('joe', 'Joe')")
  .fetch().rowsUpdated()
  .then(db.execute()
    .sql("INSERT INTO contacts (name) VALUES('Joe')")
    .then())
  .as(rxtx::transactional);
```

The code above contains some notable components:

-   `R2dbcTransactionManager`: This is the reactive transaction manager for a R2DBC `ConnectionFactory` .
-   `DatabaseClient`: The client provides access to SQL databases using R2DBC drivers.
-   `TransactionalOperator`: This operator associates all upstream R2DBC publishers with a transactional context. You can use it either operator style `as(…::transactional)` or call-back style with `execute(txStatus -> …)`.

Reactive transactions are started lazily upon subscription. The operator starts a transaction, sets the appropriate isolation level and associates the database connection with its subscriber context. All participating (upstream) `Publisher` instances use a single `Context`\-bound transactional connection.

Reactive-functional operator chains can be either linear (by using a single `Publisher`) or non-linear (by merging multiple streams). Reactive transactions affect all upstream `Publisher`s when using operator style. To limit the transaction scope to a particular set of `Publisher`s, apply callback style, as follows:

```java
CopyTransactionalOperator rxtx = TransactionalOperator.create(tm);

Mono<Void> outsideTransaction = db.execute()
  .sql("INSERT INTO person (name, age) VALUES('Jack', 31)")
  .then();

Mono<Void> insideTransaction = rxtx.execute(txStatus -> {
  return db.execute()
    .sql("INSERT INTO person (name, age) VALUES('Joe', 34)")
    .fetch().rowsUpdated()
    .then(db.execute()
      .sql("INSERT INTO contacts (name) VALUES('Joe Black')")
      .then());
  }).then();

Mono<Void> completion = outsideTransaction.then(insideTransaction);
```

In the example above, transaction management is limited to `Publisher` instances subscribed within `execute(…)`. Or, to put it differently, the transaction is scoped. `Publisher` instances within `execute(…)` participate in the transaction, and the `Publisher` named `outsideTransaction` performs its work outside the transaction.

R2DBC is one of Spring’s integrations with reactive transactions. Another integration is MongoDB through Spring Data MongoDB, which you can use to participate in multi-document transactions by using reactive programming.

Spring Data MongoDB ships with `ReactiveMongoTransactionManager` as a `ReactiveTransactionManager` implementation. It creates a session and manages transactions so that code executed within a managed transaction participates in multi-document transactions.

The following example shows programmatic transaction management with MongoDB:

```java
CopyReactiveTransactionManager tm 
  = new ReactiveMongoTransactionManager(databaseFactory);
ReactiveMongoTemplate template = …
template.setSessionSynchronization(ALWAYS);                                          

TransactionalOperator rxtx = TransactionalOperator.create(tm);

Mono<Void> atomic = template.update(Step.class)
  .apply(Update.set("state", …))
  .then(template.insert(EventLog.class).one(new EventLog(…))
  .as(rxtx::transactional)
  .then();
```

The code above sets up a `ReactiveTransactionManager` and uses `TransactionalOperator` to perform multiple write actions within a single transaction. `ReactiveMongoTemplate` gets configured to participate in reactive transactions.

## [](#next-steps)Next Steps

Reactive Transaction Management ships with Spring Framework 5.2 M2, Spring Data MongoDB 2.2 M4, and Spring Data R2DBC 1.0 M2 milestone releases. You can pick up these and start integrating reactive transaction management in your code. We look forward to community feedback so that we can smooth out any sharp edges before shipping release candidates in early June.
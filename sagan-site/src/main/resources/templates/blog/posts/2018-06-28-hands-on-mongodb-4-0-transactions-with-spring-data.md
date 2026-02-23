---
title: Hands on MongoDB 4.0 transactions with Spring Data
source: https://spring.io/blog/2018/06/28/hands-on-mongodb-4-0-transactions-with-spring-data
scraped: 2026-02-23T15:12:12.495Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  June 28, 2018 | 10 Comments
---

# Hands on MongoDB 4.0 transactions with Spring Data

_Engineering | Christoph Strobl |  June 28, 2018 | 10 Comments_

With [MongoDB 4.0](https://www.mongodb.com/transactions), ACID transactions have arrived in the `Document` store, enforcing all-or-nothing execution and maintaining data integrity. So, let’s get straight to it by looking at both the synchronous and the reactive execution models.

At the time of this writing, MongoDB multi-document transactions are supported across a single replica set and feel like the transactions you are probably familiar with from relational databases. Looking at the driver API, one feels immediately at home:

```
Copytry (ClientSession session = client.startSession()) {

    session.startTransaction();

    try {

        collection.insertOne(session, documentOne);
        collection.insertOne(session, documentTwo);

        session.commitTransaction();

    } catch (Exception e) {
        session.abortTransaction();
    }
}
```

Logical sessions build the foundation for MongoDB’s [causal consistency](https://docs.mongodb.com/manual/core/read-isolation-consistency-recency/#causal-consistency) and, of course, transactions, by helping coordinate operations across distributed nodes. Client sessions, obtainable from `client.startSession()`, should be short-lived and released once no longer needed. So make sure to `close()` them.

On a lower protocol level, the above snippet translates into the following series of commands, where you can clearly spot the session (`lsid`) present in each of them. The `startTransaction` flag is sent along with the first command, denoting the transaction start. Once completed, the transaction is then committed by sending `commitTransaction`.

```
Copy{ insert: "col", ordered: true, $db: "db",
  $clusterTime: { … },
  lsid: { id: { $binary: { base64 : "I3M7Nj…", … } } },
  txnNumber: 1,
  startTransaction: true,
  documents: [ { … } ] }

{ insert: "col", ordered: true, $db: "db",
  $clusterTime: { … },
  lsid: { id: { $binary: { base64 : "I3M7Nj…", … } } },
  txnNumber: 1,
  autocommit: false,
  documents: [ { …} ] }

{ commitTransaction: 1,
  $db: "admin",
  $clusterTime: { … },
  lsid: { id: { $binary: { base64 : "I3M7Nj…", … } } },
  txnNumber: 1 }
```

With the upcoming Spring Data [Lovelace](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Lovelace) release, the MongoDB module is going to ship with dedicated support for both synchronous and reactive transactions.

Starting with the synchronous part, you may already be familiar with [Spring Framework’s transaction support](https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#transaction). Therefore, the presence of a `MongoTransactionManager` is probably no surprise. The transaction manager itself is the entry point when it comes to annotation-based transaction support in the imperative world.

Now, as MongoDB did not support transactions in earlier versions, you explicitly have to register the `MongoTransactionManager` in your `ApplicationContext`. When you do so, `MongoTemplate` starts participating in managed transactions. This is a key point that you need to remember. The following example shows how to configure the transaction manager:

```
Copy@Configuration
class Config extends AbstractMongoConfiguration {

  @Bean
  MongoTransactionManager transactionManager(MongoDbFactory dbFactory) {
    return new MongoTransactionManager(dbFactory);
  }
}

@Service
class DocumentService {

  private final MongoOperations operations;

  DocumentService(MongoOperations operations) {
    this.operations = operations;
  }

  @Transactional
  void insertDocuments() {

    operations.insert(documentOne);
    operations.insert(documentTwo);
  }
}
```

Pretty straightforward, isn’t it? Well, sort of. But there are some non-obvious drawbacks. [Sharded cluster](https://docs.mongodb.com/manual/sharding/#sharded-cluster) environment support is expected for the next major release of MongoDB and errors when you try. Furthermore, as a MongoDB user, it’s likely that you are used to all the convenience it offers. Some of those features are not available inside a transaction, including pretty much all the meta commands, creating collections, indices, and the implicit collection creation when first using a collection. To avoid errors and frustration, please make sure to set up required structures up front. Also, some commands may behave a little different. `count` for example uses stashed collection statistics that can be inaccurate inside a transaction. The command errors and requires usage of an aggregation counting documents. The available drivers alread address this by offering an alternative `countDocuments` method utilizing the aggregation strategy.

With that in mind, let’s move on to reactive usage.

The [MongoDB ReactiveStreams driver](http://mongodb.github.io/mongo-java-driver-reactivestreams/) provides a reactive entry point to multi-document transactions. Piping the drivers native `Publisher` into [Reactor](https://projectreactor.io/) types lets you express transactional usage, as follows:

```
CopyMono.from(client.startSession()).flatMap(session -> {

  session.startTransaction();

  return Mono.from(collection.insertOne(session, documentOne))
    .then(Mono.from(collection.insertOne(session, documentTwo)))
    .onErrorResume(e -> Mono.from(session.abortTransaction())
      .then(Mono.error(e)))
    .flatMap(val -> Mono.from(session.commitTransaction())
      .then(Mono.just(val)))
    .doFinally(signal -> session.close());
});
```

We need to make sure the transaction terminates, either successfully or with a rollback. Therefore, `onErrorResume(…)` ensures the transaction rolls back upon failure as well as ensuring that the final `flatMap(…)` commits the transaction, both of which preserve the main flow result or error. And, as always, make sure to close the session (in the `doFinally(…)` block) when you don’t need it any more.

Unlike the sync part, there is, at the time of this writing, no reactive transaction manager available that would let you annotate methods with `@Transactional` and let you get on with doing the things that simply work.

Instead, you have access to a transaction closure through `ReactiveMongoTemplate.inTransaction(…)`. It takes care of all the required session, commit, and abort handling while maintaining the main flow result. The processing steps within the callback are executed inside a MongoDB transaction, while processing steps outside do not influence the transaction. This means that processing errors outside the closure do not lead to a transaction abort, as illustrated in the sample shown below.

```
Copytemplate.inTransaction().execute(action ->

    // All code in here runs inside the transaction
    action.insert(documentOne).then(action.insert(documentTwo)

  ).flatMap(val -> {
    // An exception here does not affect the transaction
  });
```

Just in case you seek access to the `ClientSession` throughout the flow, it is available in the Reactor `Context` and you can obtain it from `ReactiveMongoContext.getSession()`.

One last thing: we’d be more that happy if you give it a try and provide us with your feedback! So, check out the [Spring Data Examples](https://github.com/spring-projects/spring-data-examples) where you can already find a dedicated [project](https://github.com/spring-projects/spring-data-examples/tree/master/mongodb/transactions).

---

If you want to learn more about Spring Data or the Spring eco-system in general, the upcoming [SpringOne Platform](https://springoneplatform.io/) conference in Washington, D.C. is the perfect time and place to be. Checkout the [sessions](https://springoneplatform.io/2018/sessions) and register!
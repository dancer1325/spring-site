---
title: New in Spring Data Lovelace M2 - Get ready for MongoDB 3.6 and 4.0.
source: https://spring.io/blog/2018/04/18/new-in-spring-data-lovelace-m2-get-ready-for-mongodb-3-6-and-4-0
scraped: 2026-02-23T15:27:04.205Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  April 18, 2018 | 1 Comment
---

# New in Spring Data Lovelace M2 - Get ready for MongoDB 3.6 and 4.0.

_Engineering | Christoph Strobl |  April 18, 2018 | 1 Comment_

With the latest Spring Data Lovelace Milestone 2 release, the MongoDB module is stacking up new features that are coming your way in the near future. As you might have followed in the news, [MongoDB 4](https://www.mongodb.com/transactions) is going to bring ACID transactions to the Document store. The latest MongoDB 3.6 server release already ships with the main building block for those, [client sessions](https://docs.mongodb.com/manual/release-notes/3.6/#client-sessions).

You can read all about [isolation levels and causal consistency](https://docs.mongodb.com/manual/core/read-isolation-consistency-recency/#causal-consistency) in the MongoDB reference. In short, sessions let you execute operations in an order that respects their causal relationships.

With Spring Data MongoDB, `ClientSession` is right at your fingertips for both the imperative and the reactive world, as we have incorporated those into the already existing `MongoOperations` and `ReactiveMongoOperations`. To provide you with the utmost control and still enough convenience, managing the `ClientSession` lifecycle is up you, while the template takes care of passing the session on to the driver correctly. The following example shows how to create a `ClientSession`:

```
CopyClientSessionOptions sessionOptions = ClientSessionOptions.builder()
    .causallyConsistent(true)
    .build();

ClientSession session = client.startSession(sessionOptions);
```

Once a session is fetched from the MongoDB Java Driver, all you need to do is add it to the template to retrieve session-bound operations and `close()` the session when done, as shown in the following example:

```
CopyMongoOperations sessionBound = template.withSession(session);

Query query = query(where("name").is("Durzo Blint")
Person durzo = sessionBound.findOne(query), Person.class);

Person kylar = new Person("Kylar Stern");
kylar.setMaster(durzo);

sessionBound.insert(kylar);

session.close();
```

Using a reactive programming model, the above example looks a bit different, since we're about to obtain a session `Publisher` and want to make sure to not resolve it before actually subscribing. So, instead of obtaining a session-scoped `ReactiveMongoTemplate`, we get an instance of `ReactiveSessionScoped` that holds a reference to the session `Publisher` and offers execution and close handles, so that we can make sure to close the `ClientSession` in the `finally` block of the returned `Flux`, as shown in the following example:

```
CopyClientSessionOptions sessionOptions = ClientSessionOptions.builder()
    .causallyConsistent(true)
    .build();

// obtain a session, but do not subscribe to it
Publisher<ClientSession> session = client.startSession(sessionOptions);

template.withSession(session)
    .execute(action -> {

        Query query = query(where("name").is("Durzo Blint"));
        return action.findOne(query, Person.class)
            .flatMap(durzo -> {

                Person kylar = new Person("Kylar Stern");
                kylar.setMaster(durzo);

                return action.insert(kylar);
            });
    }, ClientSession::close) // make sure we close the session when finished
    .subscribe();
```

So far, so good, but didn't we mention transactions at the top of this article?

True, transactions will be part of [MongoDB 4.0](https://www.mongodb.com/transactions) and, yes, we're going to be ready for it. If you want to follow our efforts towards transaction support, make sure to [follow the development](https://jira.spring.io/browse/DATAMONGO-1920). Here's a quick glance at what you can expect.

`MongoTransactionManager` will be the gateway to the well known transaction support, allowing applications to use the [managed transaction](http://docs.spring.io/spring/docs/5.0.5/spring-framework-reference/html/transaction.html) features of Spring. The `MongoTransactionManager` will create and bind a `ClientSession` to the thread. Transactions are started, committed, or aborted, while `MongoTemplate` automatically detects existing `ClientSession`s and operates on them accordingly, as shown in the following example:

```
Copy@Configuration
public class Config extends AbstractMongoConfiguration {

  @Bean
  MongoTransactionManager transactionManager(MongoDbFactory dbFactory) {
    return new MongoTransactionManager(dbFactory);
  }

  // ...
}

@Service
public class NightAngel {

  @Autowired PersonRepository repository;

  @Transactional
  public void trainAzoth() {

    Person durzo = repository.findByName("Durzo Blint");

    Person kylar = new Person("Kylar Stern");
    kylar.setMaster(durzo);

    repository.save(kylar);    
  }
}
```
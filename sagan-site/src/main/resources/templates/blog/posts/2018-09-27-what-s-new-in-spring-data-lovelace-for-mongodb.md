---
title: What\'s new in Spring Data Lovelace for MongoDB?
source: https://spring.io/blog/2018/09/27/what-s-new-in-spring-data-lovelace-for-mongodb
scraped: 2026-02-23T15:12:03.739Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  September 27, 2018 | 1 Comment
---

# What's new in Spring Data Lovelace for MongoDB?

_Engineering | Christoph Strobl |  September 27, 2018 | 1 Comment_

The past year has seen a lot of enhancements brought to the NoSQL Store including a bunch of new features and extended capabilities. We collaborated closely with the driver team at MongoDB, so the release already ships with decent support for sessions, change streams, schema validation, and (of course) transactions.

The most interesting new feature is probably MongoDB 4.0’s support for [Multi-Document Transactions](https://www.mongodb.com/transactions). If you have followed this blog before, you have probably read our [Hands on Guide](https://spring.io/blog/2018/06/28/hands-on-mongodb-4-0-transactions-with-spring-data) that explains both `ClientSessions` (which are the main building block) and transactions themselves. In short, SpringData provides you with everything you need to leverage [Spring managed transaction support](https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#transaction) in your project. To use it, declare `MongoTransactionManager` in your configuration, as the following example shows:

```
Copy@Configuration
class Config extends AbstractMongoConfiguration {

  @Bean
  MongoTransactionManager transactionManager(MongoDbFactory dbFactory) {
    return new MongoTransactionManager(dbFactory);
  }
}
```

Transactions operate on top of snapshots and, therefore, changes made during a transaction appear a little odd within the oplog. Thankfully, [change streams](https://docs.mongodb.com/manual/changeStreams/) have been introduced in MongoDB 3.6 to replace the current oplog tailing with a well supported solution that is capable of untangling entries during a transaction. Change streams let you get notified whenever a certain event happens on the database or even the collection level. It provides the means to filter events by using Aggregations but also lets you resume the stream at a given checkpoint or timestamp. Consuming a change stream feels most natural when done with a reactive API, as the following example shows:

```
CopyFlux changeStream = reactiveTemplate
  .changeStream(newAggregation(match(where("operationType").is("insert"))),
    Person.class, ChangeStreamOptions.empty(), "users");
```

The preceding stream returns only new documents that are inserted into the `users` collection and maps those to the `Person` domain type. To achieve the same by using a synchronous API creates a long running blocking task that needs to be delegated to a separate component, a `MessageListenerContainer`, as the following example shows:

```
CopyMessageListenerContainer container =
  new DefaultMessageListenerContainer(template);
container.start();

MessageListener<ChangeStreamDocument<Document>, Person> listener =
  System.out::println;

ChangeStreamRequest request = ChangeStreamRequest.builder()
  .collection("users")
  .filter(newAggregation(match(where("operationType").is("insert")))
  .publishTo(listener)
  .build();

container.register(request, Person.class);

// …

container.stop();
```

Having a `MessageListenerContainer` in place opens up other possibilities. Using infinite streams with a tailable cursor on a capped collection has been limited to the reactive API so far. Now it is a matter of passing a `SubscriptionRequest` to the container, as the following example shows:

```
CopyMessageListener<Document, Person> listener = System.out::println;

TailableCursorRequest request = TailableCursorRequest.builder()
  .collection("users")
  .filter(query(where("active").eq(true)))
  .publishTo(listener)
  .build();

container.register(request, Person.class);
```

The preceding snippet listens to inserts on the `users` collection and publishes `Messages` on the console. For quite a while, MongoDB has allowed validating documents that are added to a collection or updated within a collection by using a validator that follows the overall query syntax. With its new version, MongoDB extended this validation by adding support for [JSON Schema](https://docs.mongodb.com/manual/core/schema-validation/#json-schema), which lets you define the document blueprint in more object oriented approach.

```
Copy{
  "type": "object",
  "required": [ "lastname" ],
  "properties": {
    "lastname": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "properties": {
        "postCode": { "type": "string", "minLength": 4, "maxLength": 5 }
      }
    }
  }
}
```

The `MongoJsonSchema` and its builder is the Spring Data API gateway to defining a schema for your collection. The following example shows how to use it:

```
CopyMongoJsonSchema jsonSchema = MongoJsonSchema.builder()
  .required("lastname")
  .properties(
     string("lastname"),
     object("address")
       .properties(string("postCode").minLength(4).maxLength(5))
  ).build();

CollectionOptions options = CollectionOptions.empty().schema(jsonSchema);

template.createCollection(Person.class, options);
```

Still, MongoDB, being a schema-less store, lets fields have different types on a per-document level. You can also use the schema to query for documents that match the blueprint without having to force a validation onto the collection, as the following example shows:

```
Copytemplate.query(Person.class)
  .matching(query(matchingDocumentStructure(jsonSchema))).all();
```

Another minor but noticeable enhancement to the MongoDB module comes in the form of distinct value queries that let you retrieve a distinct list of all values assigned to a single field. As mentioned before, fields do not necessarily have to have the same data type. That is why, by default, `distinct` returns an untyped `Collection`. The following example shows how to use `distinct`:

```
CopyList<Object> distinctValues = template.query(Person.class)
  .distinct("active")
  .all();
```

The active flag might be a mixture of maybe "y/n", "true/false" and "0/1" pairs represented as `String`, `boolean`, and (maybe) `int32` within the store itself. However, in cases where you are certain about at least the property type, it may be useful to use the `as` projection to obtain a strongly typed collection. The following example uses the `as` projection:

```
CopyList<Boolean> distinctValues = template.query(Person.class)
  .distinct("active")
  .as(Boolean)
  .all();
```

Several other enhancements have found their way into the MongoDB module, but we do not have the space to address them here. Make sure to check out the [new features](https://docs.spring.io/spring-data/mongodb/docs/2.1.0.RELEASE/reference/html/#new-features.2-1-0) section in the reference documentation to learn more about reactive MapReduce, default sorting, `findAndReplace(…)` methods, and new Aggregation operators and stages.
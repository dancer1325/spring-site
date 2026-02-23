---
title: Case Study: Aggregator Function and Processor
source: https://spring.io/blog/2020/10/26/case-study-aggregator-function-and-processor
scraped: 2026-02-23T13:38:17.845Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  October 26, 2020 | 0 Comments
---

# Case Study: Aggregator Function and Processor

_Engineering | Artem Bilan |  October 26, 2020 | 0 Comments_

This article is part of a blog series that explores the newly redesigned Spring Cloud Stream applications based on Java Functions. In this episode, we are investigating the Aggregator function and its relationship with the Splitter function. We will see how we can customize the default behavior. We will also take a look at the importance of configuring a shared message store for the aggregator.

Here are all the previous parts of this blog series.

-   [Introducing Function Based Streaming Applications](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)
    
-   [Function Composition with Streaming Applications](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)
    
-   [How to Build a Supplier and Source Application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)
    
-   [How to Build a Consumer and Sink Application](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)
    
-   [Build and Run a Simple Stream Application](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)
    
-   [Case Study: HTTP Request Function and Processor](https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor)
    
-   [Case Study: File Source and MongoDB Sink](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb)
    
-   [Case Study: Relational Database Source and File Sink](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink)
    
-   [Case Study: Remote File Ingest with Spring Cloud Data Flow](https://spring.io/blog/2020/09/29/case-study-remote-file-ingest-with-spring-cloud-data-flow)
    

## [](#aggregator-function)[](#aggregator-function)Aggregator function

The Aggregator function is the basis for the `[AggregatingMessageHandler](https://docs.spring.io/spring-integration/docs/current/reference/html/message-routing.html#aggregator)` from Spring Integration, inheriting most of its functionality and exposes commonly used aggregator options as configuration properties. See `AggregatorFunctionProperties` (or next section) for more information. The aggregator function is fully reactive and defined as a `Function<Flux<Message<?>>, Flux<Message<?>>`. That’s because an aggregator logic does not require it to produce a reply immediately. Rather, it stores the current message in a message store, grouped with other messages to be collected or reduced to some result, until the conditions required to release the result are met. This way it feels natural to have inbound messages as a stream (`Flux`) and let them be combined via an aggregator to output stream (also a `Flux`). So, what we just need is to `subscribe()` to the result of the Aggregator function to initiate the flow. In fact, this is exactly what happens automatically when use such a reactive function in Spring Cloud Stream application when we use: the framework builds for us a `Flux` of messages from input destination and processes a resulting `Flux` on output destination.

## [](#usage)[](#usage)Usage

Typically an aggregator is used in combination with the [Splitter](https://docs.spring.io/spring-integration/docs/current/reference/html/message-routing.html#splitter), which transforms a single incoming message into several outgoing message inluding some sequence detail headers. After some individual item processing (transforming, enriching etc.) we add an aggregator to combine those items back to a single message. The mentioned sequence detail headers are used as default correlation and release strategies to store messages in groups and make a decision when and how to combine and produce a single message. It feels natural to build such processing logic with function composition, which we will discuss later. But for now let’s imagine (for simplicity) that we have some data we would like to combine into a single message!

First of all we need to add a dependency for the aggregator function in our Spring Boot project:

```
Copy<dependency>
    <groupId>org.springframework.cloud.fn</groupId>
    <artifactId>aggregator-function</artifactId>
</dependency>
```

And that’s it! The aggregator function bean will be auto-configured just enough to let us autowire the function into our code and use it:

```
Copy@Autowired
Function<Flux<Message<?>>, Flux<Message<?>>> aggregatorFunction;
...
Flux<Message<?>> input =
        Flux.just(MessageBuilder.withPayload("2")
                .setHeader(IntegrationMessageHeaderAccessor.CORRELATION_ID, "some_mey")
                .setHeader(IntegrationMessageHeaderAccessor.SEQUENCE_NUMBER, 2)
                .setHeader(IntegrationMessageHeaderAccessor.SEQUENCE_SIZE, 2)
                .build(),
         MessageBuilder.withPayload("1")
                .setHeader(IntegrationMessageHeaderAccessor.CORRELATION_ID, "some_mey")
                .setHeader(IntegrationMessageHeaderAccessor.SEQUENCE_NUMBER, 1)
                .setHeader(IntegrationMessageHeaderAccessor.SEQUENCE_SIZE, 2)
                .build());

Flux<Message<?>> output = this.aggregatorFunction.apply(input);

output.as(StepVerifier::create)
            .assertNext((message) ->
                    assertThat(message)
                            .extracting(Message::getPayload)
                            .isInstanceOf(List.class)
                            .asList()
                            .hasSize(2)
                            .contains("1", "2"))
            .thenCancel()
            .verify();
```

In this code snippet we demonstrate how two simple messages with predefined sequence details are combined to a single `List<String>`. All the hard work is done inside the `aggregatorFunction` and its default correlation and release strategies. This also includes a default group combinator options which builds a list of payloads from messages in the released group.

More complex use-cases and configuration options we will review in the next sections.

## [](#a-persistent-state-store)[](#a-persistent-state-store)A persistent state store

The data and information we process and operate in our application is really the most important part of the application. We need to think twice about when to keep the data in memory instead of some external store. In most cases we would use some database for a state store and/or messaging middleware to prevent data loss between producer and consumer. As an added bonus, this gives different instances in a cluster an access to the shared store for smooth distributed computation.

A persistent state store is not required for the Aggregator function to work, but is necessary in production to avoid data loss and ensure fail-over.

## [](#configuration)[](#configuration)Configuration

The configuration options (`AggregatorFunctionProperties`) for the Aggregator functions are straight forward and fully aligned with high-level options for the `[AggregatingMessageHandler](https://docs.spring.io/spring-integration/docs/current/reference/html/message-routing.html#aggregator)`. Here they are:

-   `correlation` - a SpEL expression to determine a correlation key (group id) from the incoming messages. Such an expression (if provided) builds an `ExpressionEvaluatingCorrelationStrategy` for the underlying `AggregatingMessageHandler`. By default (when not provided), the `AggregatingMessageHandler` uses a `HeaderAttributeCorrelationStrategy` which is based on the `IntegrationMessageHeaderAccessor.CORRELATION_ID` - a header which can be populated upstream by the splitter, or `PublishSubscribeChannel` or recipient-list router.
    
-   `release` - a SpEL expression to determine if stored message group should be released and emitted as an output message. Such an expression (if provided) builds an `ExpressionEvaluatingReleaseStrategy` for the underlying `AggregatingMessageHandler`. By default (when not provided), the `AggregatingMessageHandler` uses a `SimpleSequenceSizeReleaseStrategy` which is based on the stored group size and an `IntegrationMessageHeaderAccessor.SEQUENCE_SIZE` - a header which can be populated upstream by the splitter, or `PublishSubscribeChannel` or recipient-list router.
    
-   `aggregation` - a SpEL expression to build an output result from the released message group. This expression (if provided) contributes to the `ExpressionEvaluatingMessageGroupProcessor` for the underlying `AggregatingMessageHandler`. By default (when not provided), the `AggregatingMessageHandler` uses a `DefaultAggregatingMessageGroupProcessor` which just combines payloads of messages in group into the `List` and merge their headers.
    
-   `groupTimeout` - a SpEL expression to schedule a background task for expiring the group when no more messages arrive to it. See more information about this option in [Spring Integration](https://docs.spring.io/spring-integration/docs/current/reference/html/message-routing.html#agg-and-group-to).
    
-   `messageStoreType` - a value from the `AggregatorFunctionProperties.MessageStoreType` constant class to indicate which `MessageGroupStore` implementation to use for storing the messages until the group for them is released. The supported `MessageGroupStore` are: `ConfigurableMongoDbMessageStore`, `RedisMessageStore`, `GemfireMessageStore`, `JdbcMessageStore` and `SimpleMessageStore` which is default one and stores messages on in the memory. This is the most important option which should be chosen according the target environment and available persistent store. It has more value when an Aggregator function is deployed as clustered instance (e.g. via Spring Cloud Data Flow when used as a part of the `aggregator-processor`), so sharing the state you may produce messages into an aggregator on one instance, but they can be released on a different one. And with this you won’t lose messages when application is crashed. The dependencies for the `MessageGroupStore` implementations are packed into the final function uber jar and auto-configured according this options. Only the difference comes with the JDBC, where we have to supply an appropriate driver according target environment requirements. See more information about `MessageGroupStore` abstraction in [Spring Integration System Management](https://docs.spring.io/spring-integration/docs/current/reference/html/system-management.html#message-store) and in the previous blog post how to [supply JDBC driver](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink). All the configuration options for those persistent stores are just the same what Spring Boot provides for us to auto-configure them.
    
-   `messageStoreEntity` - this option is specific only for some `MessageGroupStore` implementation: it refers to the client region for Gemfire/Geode; the table prefix for JDBC; a collection name in case of MongoDB. For the rest of implementations it is ignored.
    

See more information about those components in [Spring Integration](https://docs.spring.io/spring-integration/docs/current/reference/html/index.html) and respective function implementations (if any) in the [Stream Applications](https://github.com/spring-cloud/stream-applications) project.

So, if we want to run an Aggregator function (as a standalone, as a Spring Cloud Stream [processor](https://github.com/spring-cloud/stream-applications/tree/master/applications/processor/aggregator-processor) or as a part of Spring Cloud Data Flow stream definition) with some custom properties and against shared MongoDB store, we may declare it like this:

java -jar aggregator-processor-kafka-3.0.0-SNAPSHOT.jar --aggregator.correlation=T(Thread).currentThread().id --aggregator.release=!messages.?\[payload == 'bar'\].empty --aggregator.aggregation=#this.?\[payload == 'foo'\].!\[payload\] --aggregator.messageStoreType=mongodb --aggregator.message-store-entity=aggregatorTest --spring.data.mongodb.uri=mongodb://localhost/test

Where the values for these properties are:

-   `aggregator.correlation` - the consumer thread id as a key for messages to group;
    
-   `aggregator.release` - a SpEL expression against message group to release it only when `bar` payload has arrived;
    
-   `aggregator.aggregation` - a SpEL expression to select and project a message group collection where only messages with `foo` payload are combined to the final result;
    
-   `aggregator.messageStoreType` - use a MongoDb `MessageGroupStore` implementation;
    
-   `aggregator.message-store-entity` - a collection name in MongoDb database;
    
-   `spring.data.mongodb.uri` - the MongoDb database connection.
    

The same configuration properties set remains unaffected even if we compose this function with others in the custom Spring Boot application. See the next section for more information.

## [](#composition)[](#composition)Composition

The Aggregator function may not make sense by itself in a production solution. Of course, in most cases, it is used in combination with other upstream and downstream functions. As mentioned before, it is typical to have an aggregator to be composed with a [splitter](https://github.com/spring-cloud/stream-applications/tree/master/functions/function/splitter-function) pre-processing. It is possible to compose these functions programmatically using Java API via `Function.andThan()` and `Function.compose()`, but, since these methods are very type strict, we would need to perform some intermediate conversions between to satisfy functions' inputs and outputs. With the [Spring Cloud Function](https://spring.io/projects/spring-cloud-function) library on board, we can bypass the hard programming work of writing various conversions, while retaining the required sequence details message headers. We rather will rely on the type inference and out-of-the-box conversion capabilities in the framework and to keep our composition as simple as possible.

Let’s assume we have an input JSON like this:

```
Copy{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ]
  }
}
```

And our task is to provided the book names as a single comma-delimited string.

We just need to compose three out-of-the-box functions into a single Spring Cloud Function (or Stream) application. The dependencies for these functions are: `splitter-function`, `spel-function` and our `aggregator-function`. The configuration properties for such an application might be like this:

spring.cloud.function.definition=splitterFunction|spelFunction|aggregatorFunction splitter.expression=#jsonPath(payload,'$.store.book') spel.function.expression=title aggregator.aggregation=T(org.springframework.util.StringUtils).collectionToCommaDelimitedString(#this.!\[payload\])

We could use a similar stream definition and configuration with Spring Cloud Data Flow. The only difference is that messages from/to the functions will travel over the binder, using pre-built processor applications. You could actually use this composition in something like the [Mongo DB source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/mongodb-source). One more point to keep in mind with Spring Cloud Data Flow is that Aggregator function is type-agnostic and consumes messages with a `byte[]` payload. If you are planning to perform some complex logic against payload, as in the above expressions, you probably need to compose this function with one upstream to convert the `byte[]` payload into a domain object or some other compatible type like `HashMap`. If payload is a JSON representation, it always can be accessed with a `#jsonPath()` SpEL function we showed above for splitter expression.

See more information about [functions composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1) in one of the previous blog post for this series.

## [](#conclusion)[](#conclusion)Conclusion

This blog blog walked through the details of an Aggregator `Function` and how it is used in the Spring Cloud Stream Aggregator Processor. We also looked at how to use the configuration properties for this function. We then took a deep dive into a few variants of using the aggregator in a standalone application, exploring various features along the way. Finally, we saw how we can easily switch `MessageGroupStore` implementation for persistent state in the aggregator between messages.

## [](#stay-tuned)[](#stay-tuned)Stay tuned

This series is going to continue. In the next coming weeks, we will look at more functions and applications.
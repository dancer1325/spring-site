---
title: Kafka Streams and Spring Cloud Stream
source: https://spring.io/blog/2018/04/19/kafka-streams-and-spring-cloud-stream
scraped: 2026-02-23T15:26:54.912Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  April 19, 2018 | 1 Comment
---

# Kafka Streams and Spring Cloud Stream

_Engineering | Soby Chacko |  April 19, 2018 | 1 Comment_

On the heels of the recently announced Spring Cloud Stream [Elmhurst.RELEASE](https://spring.io/blog/2018/04/10/announcing-general-availability-of-spring-cloud-stream-elmhurst-release-2-0-0-release), we are pleased to present another blog installment dedicated to Spring Cloud Stream’s native integration with the Apache Kafka Streams library. Let’s review the new improvements.

### [](#messagechannel-binders)[](#messagechannel-binders)MessageChannel Binders

Spring Cloud Stream framework enables application developers to write event-driven applications that use the strong foundations of Spring Boot and Spring Integration. The underpinning of all these is the binder implementation, which is responsible for communication between the application and the message broker. These binders are `MessageChannel`\-based implementations.

### [](#enter-kafka-streams-binder)[](#enter-kafka-streams-binder)Enter Kafka Streams Binder

While the contracts established by Spring Cloud Stream are maintained from a programming model perspective, Kafka Streams binder does not use `MessageChannel` as the target type. The binder implementation natively interacts with Kafka Streams “types” - `KStream` or `KTable`. Applications can directly use the Kafka Streams primitives and leverage Spring Cloud Stream and the Spring ecosystem without any compromise.

**Note**: The Kafka Streams binder is not a replacement for using the library itself.

### [](#getting-started)[](#getting-started)Getting Started

A quick way to generate a project with the necessary components for a Spring Cloud Stream Kafka Streams application is through the Spring Initializr - see below.

![kafka streams initializr](https://raw.githubusercontent.com/spring-cloud/spring-cloud-stream-binder-kafka/master/spring-cloud-stream-binder-kafka-docs/src/main/asciidoc/images/kafka-streams-initializr.png)

### [](#simple-example)[](#simple-example)Simple Example

Here is a simple word-count application written in Spring Cloud Stream and Kafka Streams.

```
Copy@EnableBinding(KafkaStreamsProcessor.class)
public static class WordCountProcessorApplication {

  @StreamListener("input")
  @SendTo("output")
  public KStream<?, WordCount> process(KStream<Object, String> input) {

     return input
           .flatMapValues(
              value -> Arrays.asList(value.toLowerCase().split("\\W+")))
           .map((key, value) -> new KeyValue<>(value, value))
           .groupByKey()
           .windowedBy(TimeWindows.of(5000)
                   .count(Materialized.as("wordcounts"))
           .toStream()
           .map((key, value) ->
             new KeyValue<>(null, new WordCount(key.key(), value));
  }
}
```

-   `@EnableBinding` annotation with `KafkaStreamsProcessor` convey the framework to perform binding on Kafka Streams targets. You can have your own interfaces with multiple “input” and “output” bindings, too.
    
-   `@StreamListener` instructs the framework to allow the application to consume events as `KStream` from a topic that is bound on the "input" target.
    
-   `process()` - a handler that receives events from the `KStream` containing textual data. The business logic counts the number of each word and stores the total count over a time-window (5 seconds in this case) in a state store. The resulting `KStream` contains the word and its corresponding count in that time window.
    

Here is a complete [version](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kafka-streams-samples/kafka-streams-word-count) of this example.

[Josh Long](https://spring.io/team/jlong) ([@starbuxman](https://twitter.com/starbuxman?lang=en)) has put together a screencast that goes into much detail about the various features of the Kafka Streams binding support.

### [](#benefits)[](#benefits)Benefits

-   Developers familiar with Spring Cloud Stream (eg: `@EnableBinding` and `@StreamListener`), can extend it to building stateful applications by using the Kafka Streams API.
    
-   Developers can leverage the framework’s content-type conversion for inbound and outbound conversion or switch to the native SerDe’s provided by Kafka.
    
-   Port existing Kafka Streams workloads into a standalone cloud-native application and be able to orchestrate them as coherent data pipelines using Spring Cloud Data Flow.
    
-   An application runs as-is - no lock-in with any cloud platform vendor.
    

### [](#features)[](#features)Features

-   Interoperability between Kafka Streams and Kafka binder’s `MessageChannel` bindings
    
-   Multiple Kafka Streams types (such as `KStream` and `KTable`) as Handler arguments
    
-   Content-type conversion for inbound and outbound streams
    
-   Property toggles to switch between framework vs. native Kafka SerDe’s for inbound and outbound message conversion
    
-   Error handling support
    
-   Dead Letter Queue (DLQ) support for records in deserialization error
    
-   Branching support
    
-   Interactive-query support
    

### [](#multiple-output-bindings-aka-branching)[](#multiple-output-bindings-aka-branching)Multiple Output Bindings (aka Branching)

Kafka Streams binder lets you send to multiple output topics (Branching API in Kafka Streams).

Here is the outline for such a method.

```
Copy@StreamListener("input")
@SendTo({"output1","output2","output3"})
public KStream<String, String>[] process(KStream<Object, String> input) {
...
}
```

Notice that the return type on the method is `KStream[]`. See this [example](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kafka-streams-samples/kafka-streams-branching) for more details on how this works.

### [](#multiple-input-bindings)[](#multiple-input-bindings)Multiple Input Bindings

The Kafka Streams binder also let you bind to multiple inputs of `KStream` and `KTable` target types, as the following example shows:

```
Copy  @StreamListener
  public void process(@Input("input") KStream<String, PlayEvent> playEvents,
                         @Input("inputX") KTable<Long, Song> songTable) {
...
   }
```

Notice the use of multiple inputs on the method argument list. Here you can see two `@Input` annotations - one for `KStream` and another for `KTable`.

Here is a working version of this [example](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kafka-streams-samples/kafka-streams-table-join).

### [](#framework-content-type-vs-native-kafka-serde)[](#framework-content-type-vs-native-kafka-serde)Framework Content-type vs. Native Kafka SerDe

Similar to `MessageChannel` based binder implementations, Kafka Streams binder also supports content-type conversion on the incoming and outgoing streams. Any other type of data serialization is entirely handled by Kafka Streams itself. The framework-provided content-type conversion on the edges can be disabled. Instead, you can delegate the responsibilities entirely to Kafka, using the SerDe facilities provided by Kafka Streams.

When relying on the Kafka Streams binder for the content-type conversion, it is applied only for “value” (that is, the payload) in the message. The “keys” are always converted by Kafka SerDe’s.

Please refer to the [documentation](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#_message_conversion) for detailed information about how content-type negotiation and serialization is addressed in the Kafka Streams binder.

### [](#error-handling)[](#error-handling)Error Handling

Kafka Streams library has built-in support for handling deserialization exceptions [(KIP-161)](https://cwiki.apache.org/confluence/display/KAFKA/KIP-161%3A+streams+deserialization+exception+handlers). In addition to native deserialization error-handling support, the Kafka Streams binder also provides support to route errored payloads to a DLQ. See this [documentation](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#_error_handling) section for details.

Here is a [sample](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kafka-streams-samples/kafka-streams-dlq-sample) that demonstrates DLQ facilities in the Kafka Streams binder.

### [](#interactive-query)[](#interactive-query)Interactive Query

Kafka Streams lets you query state stores interactively from the applications, which can be used to gain insights into ongoing streaming data. The Kafka Streams binder API exposes a class called `QueryableStoreRegistry`. You can access this as a Spring bean in your application by injecting this bean (possibly by autowiring), as the following example shows:

```
Copy@Autowired
QueryableStoreRegistry queryableStoreRegistry;

ReadOnlyKeyValueStore<Object, Object> keyValueStore =
	queryableStoreRegistry.getQueryableStoreType("my-store",
                         QueryableStoreTypes.keyValueStore());
```

Here are [basic](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kafka-streams-samples/kafka-streams-interactive-query-basic) and an [advanced](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kafka-streams-samples/kafka-streams-interactive-query-advanced) examples demonstrating the interactive query capabilities through the binder.

### [](#mixing-kafka-streams-and-messagechannel-based-binders)[](#mixing-kafka-streams-and-messagechannel-based-binders)Mixing Kafka Streams and MessageChannel based binders

If the application use case requires the usage of both the `MessageChannel`\-based Kafka binder and the Kafka Streams binder, both of them can be used in the same application. In that case, you can have multiple `StreamListener` methods or a combination of source and sink/processor type methods. The following example of an application shows how multiple `StreamListener` methods can be used to target various types of bindings:

```
Copy@StreamListener("binding2")
@SendTo("output")
public KStream<?, WordCount> process(KStream<Object, String> input) {
}

@StreamListener("binding1")
public void sink(String input) {

}

interface MultipleProcessor {

	String BINDING_1 = "binding1";
	String BINDING_2 = "binding2";
	String OUTPUT = "output";

	@Input(BINDING_1)
	SubscribableChannel binding1();

	@Input(BINDING_2)
	KStream<?, ?> binding2();

	@Output(OUTPUT)
	KStream<?, ?> output();
}
```

In this example, the first method is a Kafka Streams processor and the second method is a regular `MessageChannel`\-based consumer. Although you can have multiple methods with differing target types (`MessageChannel` vs Kafka Stream type), it is not possible to mix the two within a single method.

### [](#conclusion)[](#conclusion)Conclusion

In this article, we saw the higher level constructs and usage samples exposed through the Spring Cloud Stream Kafka Streams binder. In addition to allowing the use of Spring Cloud Stream’s `MessageChannel` based binders, this binder implementation lets us develop, test, and produce stateful applications consistently.

Check out the [project](http://cloud.spring.io/spring-cloud-stream/) page and the [documentation](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/). As always, we welcome feedback and contributions, so please reach out to us on [GitHub](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka), [Stack Overflow](https://stackoverflow.com/tags/spring-cloud-stream), and [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).
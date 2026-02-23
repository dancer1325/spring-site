---
title: Creating a function for consuming data and generating Spring Cloud Stream Sink applications
source: https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications
scraped: 2026-02-23T13:37:44.419Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  August 03, 2020 | 1 Comment
---

# Creating a function for consuming data and generating Spring Cloud Stream Sink applications

_Engineering | Soby Chacko |  August 03, 2020 | 1 Comment_

This is part 4 of the blog series in which we are introducing java functions for Spring Cloud Stream applications.

Other parts in the series.

[Part 1 - General Introduction](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)

[Part 2 - Function Composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)

[Part 3 - Supplier function and Source application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)

In the [last blog](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source) in this series, we saw how we can use a `java.util.function.Supplier` to generate a Spring Cloud Stream source. In this new edition, we will see how a consuming function can be developed and tested using `java.util.function.Consumer` and `java.util.function.Function`. Later on, we will briefly explain the generation of a Spring Cloud Stream sink application from this consumer.

## [](#writing-a-consumer)[](#writing-a-consumer)Writing a Consumer

The idea behind writing a consumer is relatively simple. We consume data from some external source and hand it over to the business logic in the consumer. As in the case of a `Supplier`, as we saw in the [previous blog](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source), the action occurs inside the business logic implementation. If we use libraries to help us do all the heavy lifting such as Spring Integration, then it becomes a matter of simply delegating the data received to the library through an appropriate API. However, if there are no such libraries available, we need to write all that code by ourselves. Let’s take a concrete example to demonstrate this.

### [](#writing-a-consumer-for-apache-pulsar)[](#writing-a-consumer-for-apache-pulsar)Writing a Consumer for Apache Pulsar

[Apache Pulsar](https://pulsar.apache.org/) is a popular messaging middleware system. Let’s assume for a moment that we want to write a generic Java `Consumer` that receives data from somewhere and then forwards it to Pulsar. Without getting too much into the details , here is a trivial `Consumer` that accomplishes this. The basic implementation code is taken from [here](https://pulsar.apache.org/docs/en/client-libraries-java/#producer).

```
Copy@Bean
public org.apache.pulsar.client.api.Producer producer() {
  String pulsarBrokerRootUrl = "pulsar://localhost:6650";
  PulsarClient client = PulsarClient.create(pulsarBrokerRootUrl);
  String topic = "persistent://sample/standalone/ns1/my-topic";
  return client.createProducer(topic);
}

@Bean
public Consumer<byte[]> pulsarConsumer(Producer producer) {
  return payload -> {
     producer.send(payload);
  };
}
```

Once again, this is shown for illustrative purposes and may not be a complete implementation of sending data to Apache Pulsar. Nevertheless, this demonstrates the concepts that we want to convey. Looking at the consumer, we can see that the code is trivial; all we are doing inside the lambda expression is calling the `send` method on the Apache Pulsar `Producer`.

We can inject the above consumer into an application and invoke it’s `accept` method programmatically, providing the data. As we have seen in the previous blog, the diagram below expresses an idea of running the function standalone or as part of a data orchestration pipeline on platforms like [Spring Cloud Data Flow](https://spring.io/projects/spring-cloud-dataflow).

![Stream Applications Layered Architecture for Functions](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/stream-applications-dataflow-faas.png?raw=true)

Ok, that consumer was pretty straightforward, we might think to ourselves. What about if we would like to do something where things are a tad more involved? Below, we will do exactly that.

### [](#writing-a-consuming-function-for-rsocket)[](#writing-a-consuming-function-for-rsocket)Writing a consuming function for RSocket

[RSocket](https://rsocket.io/) is a bi-directional binary protocol for which Spring Framework provides excellent [support](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#rsocket). RSocket provides a fire and forget model, allowing us to send messages to a RSocket server without receiving a response. We want to write a consumer for this model using TCP where the consumer receives external data and then pushes it to the RSocket server. The [Java implementation](https://github.com/rsocket/rsocket-java) for RSocket is based on [Project Reactor](https://projectreactor.io/).Therefore when we write a consumer we need to use reactive types and patterns (similar to the reactive feed supplier in the [previous blog](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)).

When using the fire and forget strategy, RSocket returns a `Mono<Void>`, which our consumer needs to return from the function. However, in the case of `java.util.function.Consumer`, we cannot return anything. Therefore we have to write a function with the signature `Function<String, Mono<Void>> rsocketConsumer()`. Since the function returns a `Mono<Void>`, this is semantically equivalent to writing a consumer. The user of the function needs to get a reference to the `Mono` and subscribe to it. Similar patterns are used in the out of the box consumers, we already provide for [MongoDB](https://github.com/spring-cloud/stream-applications/blob/master/functions/consumer/mongodb-consumer/src/main/java/org/springframework/cloud/fn/consumer/mongo/MongoDbConsumerConfiguration.java) and [Cassandra](https://github.com/spring-cloud/stream-applications/blob/master/functions/consumer/cassandra-consumer/src/main/java/org/springframework/cloud/fn/consumer/cassandra/CassandraConsumerConfiguration.java).

When setting up the project, include the following maven dependency.

```
Copy<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-rsocket</artifactId>
</dependency>
```

This starter dependency from Spring Boot will transitively bring all the RSocket dependencies to our project.

Before we write the function code, let’s write a `ConfigurationProperties` class to define some core properties that the function needs.

```
Copy@ConfigurationProperties("rsocket.consumer")
public class RsocketConsumerProperties {

  private String host = "localhost";

  private int port = 7000;

  private String route;
…
}
```

As we can see, using the prefix `rsocket.consumer` , we define three properties - `host` and `port` are for the RSocket server and `route` is an endpoint on the server.

Now that we have the configuration properties , let’s create a `Configuration` class to configure our function bean.

```
Copy@Configuration
@EnableConfigurationProperties(RsocketConsumerProperties.class)
public class RsocketConsumerConfiguration {

  @Bean
  public Function<String, Mono<Void>> rsocketConsumer(RSocketRequester.Builder builder,
                                            RsocketConsumerProperties rsocketConsumerProperties) {
     final Mono<RSocketRequester> rSocketRequester = builder.connectTcp(rsocketConsumerProperties.getHost(),
           rsocketConsumerProperties.getPort());

     return input -> rSocketRequester
                 .flatMap(requester -> requester.route(rsocketConsumerProperties.getRoute())
                       .data(input)
                       .send());
  }
}
```

We are injecting a builder that comes from Spring Boot auto-configuration into the function that helps us with creating an `RSocketRequester`. Using this builder we create a `Mono<RSocketRequester>` with a TCP connection. The `connectTcp` API method takes the RSocket host and port information. Once we get a handle onto `RSocketRequester` then we use that inside the lambda provided in the function.

We call `flatMap` on `Mono<RSocketRequester>` and for each incoming message, we specify the `route` and the data that needs to be sent before calling the `send` method that ultimately pushes the data to the RSocket server.

That’s all it takes to write a function that consumes data and then sends it to a RSocket server using the fire and forget interaction model. Keep in mind that this code looks very simple because of the various `RSocket` support and abstractions that Spring Framework underneath provides us.

Let’s write a quick test to verify that the function works as expected.

As we did with the reactive supplier in the previous blog, add this following dependency to the project. This helps us with testing reactive components.

```
Copy<dependency>
  <groupId>io.projectreactor</groupId>
  <artifactId>reactor-test</artifactId>
  <scope>test</scope>
</dependency>
```

Following is the test with other necessary components.

```
Copy@SpringBootTest(properties = {"spring.rsocket.server.port=7000", "rsocket.consumer.route=test-route"})
public class RsocketConsumerTests {

  @Autowired
  Function<Message<?>, Mono<Void>> rsocketConsumer;

  @Autowired
  TestController controller;

  @Test
  void testRsocketConsumer() {

     rsocketConsumer.apply(new GenericMessage<>("Hello RSocket"))
           .subscribe();

     StepVerifier.create(this.controller.fireForgetPayloads)
           .expectNext("Hello RSocket")
           .thenCancel()
           .verify();
  }

  @SpringBootApplication
  @ComponentScan
  static class RSocketConsumerTestApplication{}

  @Controller
  static class TestController {
     final ReplayProcessor<String> fireForgetPayloads = ReplayProcessor.create();

     @MessageMapping("test-route")
     void someMethod(String payload) {
        this.fireForgetPayloads.onNext(payload);
     }
  }
}
```

A quick explanation of the testing components.

-   We provide the property `spring.rsocket.server.port` on `SpringBootApplication`. This allows Spring Boot to auto-configure a default RSocket server for testing. Hard coding the port to `7000` here since that is the default port used by Spring Boot when auto configuring the components. This is the same default we used in properties above. We also specify the `route` that we want to use in our test.
    
-   There is a `Controller` provided with a method annotated with `MessageMapping` where it intercepts messages arriving at the route that we specified in the test. Each incoming record on the Server at the route is passed into a `Flux` where it can be replayed later in the test during assertion.
    
-   In the test, we are calling the `apply` method on the injected `RSocket` consumer that we wrote earlier and providing it with a test message.
    
-   Finally, we use a `StepVerifier` to verify that the message was sent successfully to the `RSocket` server.
    

## [](#generating-spring-cloud-stream-sink-application-from-the-rsocket-consumer)[](#generating-spring-cloud-stream-sink-application-from-the-rsocket-consumer)Generating Spring Cloud Stream Sink application from the RSocket Consumer

In the [last blog](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source), we covered how to generate a Spring Cloud Stream source application from a Supplier function in much detail. You can follow the same patterns that we used there for generating a sink application from the RSocket function that we wrote above. We are not rehashing all the details involved here. Use the many different sink applications provided [here](https://github.com/spring-cloud/stream-applications/tree/master/applications/sink) as a template. When we test the function with the test binder in Spring Cloud Stream, send the message to the `InputDestination`. Spring Cloud Stream will send it downstream to the RSocket server. Then we can use the same verification strategies we used in the unit test above. See [this](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/current/reference/html/spring-cloud-stream.html#_testing) for more information on testing Spring Cloud Stream components using the test binder.

## [](#conclusion)[](#conclusion)Conclusion

In this blog post, we saw how we can write a plain consumer that consumes data and acts upon it, using Apache Pulsar as an example. We then explored how to develop a reactive consumer in the form of `Function<String, Mono<Void>>` with RSocket fire and forget strategy to guide us. We also demonstrated how this reactive consumer can be unit tested. Please follow the procedures laid out in this article for writing your own data consumers and if you do so, consider [contributing](https://github.com/spring-cloud/stream-applications/blob/master/docs/Contributing.adoc) a pull request.

### [](#stay-tuned)[](#stay-tuned)Stay tuned…​

Look for more deep dives and focused topics in the coming weeks. With the next blog in this series, we are starting a set of case studies in which we explore the already existing functions and applications.
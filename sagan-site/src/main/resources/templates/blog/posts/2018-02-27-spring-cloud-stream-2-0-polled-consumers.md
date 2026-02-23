---
title: Spring Cloud Stream 2.0 - Polled Consumers
source: https://spring.io/blog/2018/02/27/spring-cloud-stream-2-0-polled-consumers
scraped: 2026-02-23T16:07:48.981Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  February 27, 2018 | 0 Comments
---

# Spring Cloud Stream 2.0 - Polled Consumers

_Engineering | Gary Russell |  February 27, 2018 | 0 Comments_

> *This is the second blog in a series of pre-release blogs in preparation for Spring Cloud Stream 2.0.0.RELEASE.*

### [](#preface)Preface

Spring Cloud Stream 2.0 introduces polled consumers, where the application can control message processing rates.

#### [](#introduction)Introduction

Spring Cloud Stream has the concepts of producers and consumers; when using the messaging paradigm, `MessageChannel`s are bound to destinations (e.g. Kafka topics, Rabbit Exchanges/Queues). To-date, on the consumer side, messages are delivered whenever an idle consumer is available. In effect, the broker controls the rate of delivery; usually, the next message is delivered immediately after the current one is processed.

2.0 introduces polled consumers, where the application can control the rate of message consumption. Polled consumers are supported by the Kafka and RabbitMQ binders.

#### [](#details)Details

With polled consumers, instead of binding a `MessageChannel` to the destination, we bind a `PollableMessageSource`; for example, a `PolledProcessor` binding might be configured like so:

```java
Copypublic interface PolledProcessor {

    @Input
    PollableMessageSource destIn();

    @Output
    MessageChannel destOut();

}
```

The message source has a method:

```java
Copyboolean poll(MessageHandler handler);
```

The message is not acknowledged until the handler's `handleRequest` method exits.

The `MessageHandler` is the interface from spring-messaging; you can provide one of the standard Spring Integration message handlers, or your own implementation (often a lambda). Because the `handleMessage` method takes a `Message<?>` argument, there is no type information and the payload will not be converted.

However, message conversion [as discussed in the first blog in this series](https://spring.io/blog/2018/02/26/spring-cloud-stream-2-0-content-type-negotiation-and-transformation) can be applied to polled consumers as well. In order to communicate the type information to the conversion service, we provide a parameterized type reference in the overloaded `poll()` method:

```java
Copyboolean poll(MessageHandler handler, ParameterizedTypeReference<?> type)
```

And the message payload will be converted to the type, which can be simple, for example with a content type of `text/plain`:

-   `new ParameterizedTypeReference<String>() {}`

or more complex with, for example a JSON content type:

-   `new ParameterizedTypeReference<Map<String, Foo>>() {}`

#### [](#putting-it-all-together)Putting it all Together

The following simple Spring Boot application provides a complete example; it receives String payloads, converts them to upper case and forwards the result to another destination.

```java
Copy@SpringBootApplication
@EnableBinding(Blog2Application.PolledProcessor.class)
public class Blog2Application {

  private final Logger logger =
  	  LoggerFactory.getLogger(Blog2Application.class);

  public static void main(String[] args) {
    SpringApplication.run(Blog2Application.class, args);
  }

  @Bean
  public ApplicationRunner runner(PollableMessageSource source,
  	    MessageChannel dest) {
    return args -> {
      while (true) {
        boolean result = source.poll(m -> {
          String payload = (String) m.getPayload();
          logger.info("Received: " + payload);
          dest.send(MessageBuilder.withPayload(payload.toUpperCase())
              .copyHeaders(m.getHeaders())
              .build());
        }, new ParameterizedTypeReference<String>() { });
        if (result) {
          logger.info("Processed a message");
        }
        else {
          logger.info("Nothing to do");
        }
        Thread.sleep(5_000);
      }
    };
  }

  public static interface PolledProcessor {

    @Input
    PollableMessageSource source();

    @Output
    MessageChannel dest();

  }

}
```

### [](#conclusion)Conclusion

Applications can now control the rate at which messages are consumed.

For more information, see [Using Polled Consumers](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.BUILD-SNAPSHOT/reference/htmlsingle/index.html#_using_polled_consumers) in the reference manual.

We encourage you to provide feedback using one of the following facilities:

-   [Project's GitHub Issues](https://github.com/spring-cloud/spring-cloud-stream/issues)
-   [Stack Overflow channel](https://stackoverflow.com/tags/spring-cloud-stream)
-   [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-stream)

Enjoy!
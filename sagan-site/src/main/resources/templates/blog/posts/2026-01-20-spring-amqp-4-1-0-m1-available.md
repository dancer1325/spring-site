---
title: Spring AMQP 4.1.0 Milestone 1 Available
source: https://spring.io/blog/2026/01/20/spring-amqp-4-1-0-m1-available
scraped: 2026-02-22T22:02:29.373Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 20, 2026 | 0 Comments
---

# Spring AMQP 4.1.0 Milestone 1 Available

_Releases | Artem Bilan |  January 20, 2026 | 0 Comments_

Hi Spring fans!

It is my pleasure today to share with you the start for Spring AMQP minor version and its `4.1.0-M1` is available with some new fature to try.

The new `spring-amqp-client` module has been added to provide Spring-friendly components for [AMQP 1.0](https://www.amqp.org/resources/specifications) protocol intraction. It is based on the [ProtonJ 2 Client](https://github.com/apache/qpid-protonj2/blob/main/protonj2-client/README.md) library and exposes an API based on well-known `spring-amqp` core module foundation. It does not have any RabbitMQ-related dependencies, but can work well with RabbitMQ broker with some [destination address adjustments](https://www.rabbitmq.com/docs/amqp#addresses). The infrastructure of `spring-amqp-client` is represented by the `AmqpConnectionFactory` abstraction with a `SingleAmqpConnectionFactory` as implementation to share the same ProtonJ connection between consumers and producers. The low-level API for excahnging messages with AMQP 1.0 peer is represeted by the `AmqpClient` which is similar, by design, to `WebClient` and `JdbcClient` in Spring Framework, and can be treated as `AmqpTemplate` in other Spring AMQP modules. The `AmqpClient` comes with builder for its configuration and exposes a fleunt API for `to(address)` and `from(address)` operations, e.g.:

```java
CopyCompletableFuture<Boolean> sendFuture =
        this.amqpClient
                .to("/queues/" + TEST_SEND_QUEUE2)
                .body("convert")
                .priority(7)
                .header("test_header", "test_value")
                .messageId("some_id")
                .userId("guest")
                .durable(false)
                .send();
```

The `AmqpMessageListenerContainer` is a `MessageListenerContainer` implementation and plays exactly same role as amny other listener containers in all Spring Messaging projects. This container subscrires to the AMQP addresses, and emits deliveries as Spring AMQP messages to the provided `MessageListener` in the event-driver manner:

```java
CopyBlockingQueue<Message> receivedMessages = new LinkedBlockingQueue<>();
@Bean
AmqpMessageListenerContainer amqpMessageListenerContainer(AmqpConnectionFactory connectionFactory) {
    var amqpMessageListenerContainer = new AmqpMessageListenerContainer(connectionFactory);
    amqpMessageListenerContainer.setQueueNames(QUEUE_NAMES);
    amqpMessageListenerContainer.setConsumersPerQueue(3);
    amqpMessageListenerContainer.setAutoAccept(false);
    amqpMessageListenerContainer.setReceiveTimeout(Duration.ofMillis(100));
    amqpMessageListenerContainer.setAdviceChain(new DebugInterceptor());
    amqpMessageListenerContainer.setupMessageListener(this.receivedMessages::add);
    return amqpMessageListenerContainer;
}
```

The `@EnableAmqp` annotation can be used on the `@Configuration` classes to expose some `spring-amqp-client` infrastrcuture. For now, it provides only a `org.apache.qpid.protonj2.client.Client` bean. With upcoming milestones we are going to implement a high-level `@AmqpListener` annotation with similar functionality to well-known `@RabbitListener` (see also `@KafkaListener`, `@JmsListener` or `@ServiceActivator`).

Don't hesitate to rich us out with any feedback!

We are also planning to implement `sendAndReceive()` & `receiveAndReply()` operations. Will look into transactions support as well.

See the [Release Notes](https://github.com/spring-projects/spring-amqp/releases/tag/v4.1.0-M1) and [What's New](https://docs.spring.io/spring-amqp/reference/4.1/whats-new.html) for more information.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub Issues](https://github.com/spring-projects/spring-amqp/issues) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)
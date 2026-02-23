---
title: Spring Integration, AMQP and Kafka Release Candidates Available
source: https://spring.io/blog/2018/09/24/spring-integration-amqp-and-kafka-release-candidates-available
scraped: 2026-02-23T15:13:00.043Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 24, 2018 | 0 Comments
---

# Spring Integration, AMQP and Kafka Release Candidates Available

_Releases | Artem Bilan |  September 24, 2018 | 0 Comments_

On behalf of Spring Integration team I’m pleased to announce Release Candidates for the Spring Messaging projects. Each is based on the recently released [Spring Framework 5.1 GA](https://spring.io/blog/2018/09/21/spring-framework-5-1-goes-ga), has upgraded dependencies and will be part of the upcoming [Spring Boot 2.1 M4](https://github.com/spring-projects/spring-boot/milestone/122) - just in time for [Spring One Platform](https://springoneplatform.io/)!

The artifacts for these projects are available in the [Spring Milestone](http://repo.spring.io/milestone/) repository.

Please, refer to the `What’s New` chapter in each Reference Manual for more information about new features and notable changers for each project mentioned below.

### [](#spring-amqp)[](#spring-amqp)Spring AMQP

[2.1.0.RC1](https://github.com/spring-projects/spring-amqp/releases/tag/v2.1.0.RC1) release notes.

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [JIRA](https://jira.spring.io/browse/AMQP) | [Documentation](http://docs.spring.io/spring-amqp/docs/2.1.0.RC1/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-amqp) | [Gitter](https://gitter.im/spring-projects/spring-amqp)

### [](#spring-for-apache-kafka)[](#spring-for-apache-kafka)Spring for Apache Kafka

[2.2.0.RC1](https://github.com/spring-projects/spring-kafka/releases/tag/v2.2.0.RC1) Release notes.

[Project Page](http://projects.spring.io/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](http://docs.spring.io/spring-kafka/docs/2.2.0.RC1/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)

### [](#spring-integration)[](#spring-integration)Spring Integration

[5.1.0.RC1](https://github.com/spring-projects/spring-integration/releases/tag/v5.1.0.RC1) release notes.

There are several features I would like to mention here since they are not documented yet (we are going to do that during GA release):

-   Java DSL `fluxTransform()` operator

To hand off the message processing to Reactive Streams, the Java DSL for Spring Integration introduced an intermediate `fluxTransform()`, e.g.

```
CopyIntegrationFlow integrationFlow = f -> f
    .split()
    .<String, String>fluxTransform(flux -> flux
                                .map(Message::getPayload
                                .map(String::toUpperCase))
    .aggregate();
```

This operator accepts an argument in form of `Function<? super Flux<Message<I>>, ? extends Publisher<O>>`. The Framework injects `FluxMessageChannel` s before and after calling this function. The it builds a `Flux` to store a request message to the subscriber context, calls `Flux.transform()` with the provided function and copies headers from the request message if the result from the function is not a `Message<?>` already.

-   Reactive Polling

Another new feature is a **Reactive polling** for the `SourcePollingChannelAdapter`. If the output channel is an instance of `FluxMessageChannel`, the Framework transform all the polling options to the `Flux.generate()` based on the result of the `trigger.nextExecutionTime(triggerContext)` and a combination with the `Mono.delay(duration)` to achieve a polling feature reactive manner.

-   Other Java DSL changes

Also we added several other convenient operators to Java DSL, like `nullChannel()` and `logAndReply()`.

And finally the Java DSL has been improved for an improved Kotlin experience without breaking changes for regular Java configuration.

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub](https://github.com/spring-projects/spring-integration) | [JIRA](https://jira.spring.io/browse/INT) | [Documentation](http://docs.spring.io/spring-integration/docs/5.1.0.RC1/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-integration) | [Gitter](https://gitter.im/spring-projects/spring-integration)

### [](#spring-integration-extension-for-spring-for-apache-kafka)[](#spring-integration-extension-for-spring-for-apache-kafka)Spring Integration extension for Spring for Apache Kafka

[3.1.0.RC1](https://github.com/spring-projects/spring-integration-kafka/releases/tag/v3.1.0.RC1) Release notes.

Based on the above mentioned Spring for Apache Kafka `2.2.0.RC1` and Spring Integration `5.1.0.RC1`, provides some compatibility fixes (especially with Kotlin) and some minor features, like an `onPartitionsAssignedSeekCallback` for the `KafkaInboundGateway` and `KafkaMessageDrivenChannelAdapter`.

See Spring for Apache Kafka [Reference Manual](http://docs.spring.io/spring-kafka/docs/2.2.0.RC1/reference/html) for more information about this extension.

### [](#feedback-welcome)[](#feedback-welcome)Feedback Welcome!

Please, try all these new bits and come back to us with any feedback via any available channel. We will appreciate the help before we are going to GAs in mid October just in time for Spring Boot `2.1 GA`!

Thank you everyone who contributed to all these project any possible way!

### [](#springone-platform-2018)[](#springone-platform-2018)SpringOne Platform 2018

Right now we are heading to start an epic event in Spring and Pivotal world - [Spring One Platform](https://springoneplatform.io/)! Gary Russell is going to talk about [Spring for Apache Kafka](https://springoneplatform.io/2018/sessions/walking-up-the-spring-for-apache-kafka-stack) together with Viktor Gamov from Confluent and I will talk about [Spring Cloud Stream Binder for Google Cloud Pub/Sub](https://springoneplatform.io/2018/sessions/global-event-streams-made-simple-with-spring-cloud-stream-cloud-pub-sub) together with Kir Titievsky from Google Cloud Platform. Please, join us if you are here or watch video later!
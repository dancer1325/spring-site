---
title: Spring for Apache Kafka 1.0 Milestone 2 Available
source: https://spring.io/blog/2016/04/11/spring-for-apache-kafka-1-0-milestone-2-available
scraped: 2026-02-23T19:20:02.972Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 11, 2016 | 5 Comments
---

# Spring for Apache Kafka 1.0 Milestone 2 Available

_Releases | Artem Bilan |  April 11, 2016 | 5 Comments_

I am pleased to announce that the `spring-kafka` (Spring for Apache Kafka) Second Milestone for version `1.0` is now available.

The artifacts `org.springframework.kafka:spring-kafka:1.0.0.M2` and `org.springframework.kafka:spring-kafka-test:1.0.0.M2` are available in the [Milestone](https://repo.spring.io/milestone/) repository.

Changes since the [First Milestone](https://spring.io/blog/2016/03/14/spring-for-apache-kafka-milestone-1-available) include:

-   `KafkaTemplate.send()` methods now return `ListenableFuture<SendResult<K, V>>`

to track publishing to the Kafka topic asynchronously.

-   The `MessagingMessageListenerAdapter` (for `@KafkaListener` method) can now infer the type for `payload` conversion from the method arguments.
-   A `StringJsonMessageConverter`, which can use the type inference to build the target object from JSON content using the Jackson `ObjectMapper`.
-   `RECEIVED_` headers have been added from the `Listener` to avoid clashing (re-routing) to the same `topic` with the same `messageKey` when sending, e.g. with the Spring Integration Adapters.
-   More testing utilities.

See also the [Reference Manual](http://docs.spring.io/spring-kafka/docs/1.0.0.M2/reference/htmlsingle/) for more information.

# [](#spring-integration-kafka-support)Spring Integration Kafka Support

Don't miss the [First Milestone](https://spring.io/blog/2016/04/11/spring-integration-kafka-support-2-0-0-m1-is-now-available) for Spring Integration Kafka 2.0 which is fully based on this Spring for Apache Kafka foundation.

# [](#next-steps)Next Steps

-   The Spring Boot Kafka starter and AutoConfiguration is [in progress](https://github.com/spring-projects/spring-boot/pull/5516).
-   A new Binder implementation for [spring-cloud-stream](http://cloud.spring.io/spring-cloud-stream/).
-   Flesh out the documentation, set up a project page etc.

Also we looking into the version `1.1` already to implement the interaction with Kafka using Reactive Streams with [Reactor](http://projectreactor.io/)'s `Flux` and `Mono` abstractions. At the same time the Apache Kafka [0.10.0](https://cwiki.apache.org/confluence/display/KAFKA/Release+Plan+0.10.0) with its [Kafka Streams](http://www.confluent.io/blog/introducing-kafka-streams-stream-processing-made-simple) feature, which would also be good addition into Spring for Apache Kafka 1.1, too.

Meanwhile we look forward to your feedback and if all goes well plan to release `1.0.0.RELEASE` in the next few weeks!

[Project Page](https://github.com/spring-projects/spring-kafka) | [Documentation](http://docs.spring.io/spring-kafka/docs/1.0.0.M2/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
---
title: New Major Releases of Spring for Apache Kafka and Spring for RabbitMQ
source: https://spring.io/blog/2022/11/21/new-major-releases-of-spring-for-apache-kafka-and-spring-for-rabbitmq
scraped: 2026-02-23T10:32:18.704Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  November 21, 2022 | 1 Comment
---

# New Major Releases of Spring for Apache Kafka and Spring for RabbitMQ

_Releases | Gary Russell |  November 21, 2022 | 1 Comment_

I am pleased to announce that new major releases (3.0.0) for Spring for Apache Kafka and Spring for RabbitMQ are now available.

## [](#common-changes)[](#common-changes)Common Changes

The 3.0.x versions of these projects have the following common changes

-   they depend on Java version 17 or later
    
-   they depend on Spring Framework 6.0.x
    
-   support for creating native GraalVM applications
    
-   support for micrometer observability and tracing
    
-   Bill of Materials POMs are now provided to help with dependency management
    

## [](#spring-for-apache-kafka)[](#spring-for-apache-kafka)Spring for Apache Kafka

-   support for a global single `EmbeddedKafkaBroker` (across multiple test classes)
    
-   several enhancements for `@RetryableTopic` (non-blocking retries)
    
-   `KafkaTemplate` methods now return `CompleteableFuture` instead of `ListenableFuture`, which has been deprecated
    

For information about all changes in this release, see [What’s New](https://docs.spring.io/spring-kafka/docs/3.0.0/reference/html/#whats-new-part).

In addition, `2.9.3` and `2.8.11` maintenance releases are now available.

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/3.0.0/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka)

## [](#spring-for-rabbitmq)[](#spring-for-rabbitmq)Spring for RabbitMQ

-   support for RabbitMQ super streams, with single active consumers, has been added
    
-   the previously deprecated remoting support has been removed
    
-   the `AsyncRabbitTemplate` and `RabbitStreamTemplate` methods now return `CompleteableFuture` instead of `ListenableFuture`, which has been deprecated
    

For information about all changes in this release, see [What’s New](https://docs.spring.io/spring-amqp/docs/3.0.0/reference/html/#whats-new).

In addition, the `2.4.8` maintenance release is now available.

[Project Page](https://spring.io/projects/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [Issues](https://github.com/spring-projects/spring-amqp/issues) | [Documentation](https://docs.spring.io/spring-amqp/docs/3.0.0/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-amqp)
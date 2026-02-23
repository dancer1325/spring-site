---
title: Spring for Apache Kafka 2.2 Released
source: https://spring.io/blog/2018/10/29/spring-for-apache-kafka-2-2-released
scraped: 2026-02-23T15:08:58.794Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  October 29, 2018 | 1 Comment
---

# Spring for Apache Kafka 2.2 Released

_Releases | Gary Russell |  October 29, 2018 | 1 Comment_

I am pleased to announce that Spring for Apache Kafka 2.2.0.RELEASE is now available.

While the 2.1.x release is compatible with the 2.0.0 `kafka-clients` jar, (since 2.1.9), this version requires 2.0.0 (and provides a 2.0.0 embedded broker for testing).

### [](#highlights)[](#highlights)Highlights

-   The `SeekToCurrentErrorHandler` can now "skip" records that fail repeatedly
    
-   Such "skipped" records can be published to a dead-letter topic (or otherwise disposed of by application code)
    
    -   Headers are added with diagnostics about the failure
        
-   When using transactions, the same functionality can be achieved with the default `AfterRollbackProcessor`
    
-   You can now use the listener container factory to create any arbitrary listener container, not just containers for `@KafkaListener` s
    
    -   This allows more convenient use of Spring Boot’s auto configuration properties for any container
        
-   `@KafkaListener` annotations can now override the container factory’s `concurrency` and `autoStartup` properties
    
-   The new `ErrorhandlingDeserializer` can catch deserialization exceptions which are then routed to the `ErrorHandler`
    
-   The embedded kafka broker can now be used with JUnit 5 tests
    

For more information see the [What’s New chapter in the documentation](https://docs.spring.io/spring-kafka/docs/2.2.0.RELEASE/reference/html/whats-new-part.html#spring-kafka-intro-new) and the [change log](https://github.com/spring-projects/spring-kafka/releases).

In addition, Spring Integration for Apache Kafka (`spring-integration-kafka`) 3.1.0.RELEASE is available; it is based on Spring for Apache Kafka 2.2 and Spring Integration 5.1.

[Project Page](http://projects.spring.io/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](http://docs.spring.io/spring-kafka/docs/2.2.0.RELEASE/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)
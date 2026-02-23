---
title: Spring For Apache Kafka 2.1 RC1 and 2.0.1 & 1.3.1 Available
source: https://spring.io/blog/2017/11/09/spring-for-apache-kafka-2-1-rc1-and-2-0-1-1-3-1-available
scraped: 2026-02-23T16:15:59.892Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 09, 2017 | 0 Comments
---

# Spring For Apache Kafka 2.1 RC1 and 2.0.1 & 1.3.1 Available

_Releases | Artem Bilan |  November 09, 2017 | 0 Comments_

We are pleased to announce the first Release Candidate for the version `2.1` of the Spring for Apache Kafka:

```
Copyrepositories {
    maven { url 'http://repo.spring.io/milestone' }
}
compile "org.springframework.kafka:spring-kafka:2.1.0.RC1"
```

The general reason for so quick point release is the [recently released](https://kafka.apache.org/downloads) Apache Kafka `1.0.0` version. There are no critical feature in that release, but some breaking changes in the `kafka.admin` and `kafka.streams` have been introduced. Therefore this release represents mostly compatibility with Apache Kafka `1.0.0`:

-   Deprecate `bounce()` and `waitUntilSynced()` in the `KafkaEmbedded` since respective API in the `AdminUtils` have been removed
    
-   The `KStreamBuilderFactoryBean` now uses `StreamsBuilder` instead of deprecated `KStreamBuilder`
    
-   The `@EmbeddedKafka.brokerProperties()` can be configured with the properties placeholders
    
-   The SpEL expressions in the `@KafkaListener` attributes now can be used simplified since `BeanFactory` resolver is supplied with the `TemplateAwareExpressionParser`
    
-   A `NonResponsiveConsumerEvent` has been introduced to track the sate of the `ListenerContainer` for possible target Broker unavailability
    
-   A `SeekToCurrentErrorHandler` has been introduced which allows to `seek()` the consumer after an exception
    

The version `2.1` is a foundation for Kafka auto configuration in the upcoming Spring Boot `2.0`.

Maintenance version `2.0.1` is available and provides some critical bug fixes, compatibility with Apache Kafka `1.0.0` and back ported features mentioned for version `2.1`.

The version `1.3.1` has been released mainly to support Apache Kafka `1.0.0` and provide critical bug fixes.

See the [Project Page](http://projects.spring.io/spring-kafka/) for a complete matrix of `spring-kafka`, `spring-integration-kafka` and `kafka-clients` version compatibility.

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)
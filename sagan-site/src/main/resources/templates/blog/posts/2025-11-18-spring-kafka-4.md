---
title: Spring for Apache Kafka 4.0.0 goes GA
source: https://spring.io/blog/2025/11/18/spring-kafka-4
scraped: 2026-02-22T22:10:58.898Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  November 18, 2025 | 0 Comments
---

# Spring for Apache Kafka 4.0.0 goes GA

_Releases | Soby Chacko |  November 18, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, we are pleased to announce that Spring for Apache Kafka `4.0.0` is now generally available. We extend our gratitude to all contributors who made this release possible.

#### [](#release-journey-and-highlights)Release Journey and Highlights

The development of Spring for Apache Kafka `4.0.0` began in March 2025 with the first milestone release and progressed through five milestone releases and one release candidate over an 8-month development cycle before reaching general availability in November 2025.

This release includes new features, bug fixes, improved documentation, and updated dependencies.

##### [](#major-highlights)Major Highlights

**Kafka 4.0 and Apache Kafka Queues Support (KIP-932)**

-   Upgraded to Apache Kafka client version `4.1.1`
-   Added comprehensive support for Kafka's new share consumer pattern (Preview Mode)
-   Introduced `SharedConsumerContainer` and factory support with full acknowledgment capabilities
-   Added `ShareKafkaListener` annotation for queue-based consumption

**Observability and Tracing Enhancements**

-   Per-record observations support in batch listeners
-   Enhanced reply tracing for `ReplyingKafkaTemplate`
-   Improved error metric collection with proper exception reporting

**Spring Framework 7.0 Integration**

-   Full compatibility with Spring Framework `7.0.0`
-   JSpecify nullability annotations throughout the codebase
-   Removed dependency on Spring Retry in favor of Spring Framework's core retry mechanism

**Jackson 3 Support**

-   Added Jackson 3 (`tools.jackson`) support while maintaining Jackson 2 compatibility
-   Jackson 2 support is now deprecated

**Performance Optimizations**

-   Improved `acknowledge(int index)` performance in batch acknowledgment
-   Optimized ArrayList allocations in `BatchMessagingMessageConverter`
-   Added header match performance caching

**Other Notable Features**

-   Support for adding (not just overriding) record interceptors
-   Configurable `CompositeBatchInterceptor`
-   `KafkaAdmin.deleteTopics()` method
-   Enhanced SpEL/placeholder resolution in `RetryableTopic`
-   Improved container stopping events with proper reason tracking
-   Enhanced `SmartMessageConverter` support for batch listeners

##### [](#release-notes)Release Notes

`4.0.0` release notes: [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0)

##### [](#earlier-milestone-releases)Earlier Milestone Releases

-   [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M1](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M1)
-   [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M2](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M2)
-   [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M3](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M3)
-   [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M4](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M4)
-   [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M5](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M5)
-   [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-RC1](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-RC1)

#### [](#spring-boot-integration)Spring Boot Integration

The `4.0.0` release will be integrated into the upcoming Spring Boot `4.0.0` release.

#### [](#other-releases)Other Releases

In addition to the `4.0.0` GA, we also released a patch release for [3.3.11](https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.11). The `3.3.11` release will be integrated with the upcoming Spring Boot `3.5.8` and `3.4.12` releases.

Two commercial versions of Spring for Apache Kafka—[3.2.12](https://docs.enterprise.spring.io/spring-kafka/reference/index.html) and [3.1.14](https://docs.enterprise.spring.io/spring-kafka/reference/3.1/index.html)—have also been released. These enterprise releases will be integrated into the upcoming Spring Boot commercial releases `3.3.16` and `3.2.19`, respectively.

#### [](#community-feedback)Community Feedback

As always, we welcome your feedback and suggestions.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference/4.0/) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
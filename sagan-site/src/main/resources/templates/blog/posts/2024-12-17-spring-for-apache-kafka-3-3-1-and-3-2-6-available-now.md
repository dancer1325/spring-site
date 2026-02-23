---
title: Spring for Apache Kafka 3.3.1, and 3.2.6 are Available Now
source: https://spring.io/blog/2024/12/17/spring-for-apache-kafka-3-3-1-and-3-2-6-available-now
scraped: 2026-02-23T07:57:12.799Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  December 17, 2024 | 0 Comments
---

# Spring for Apache Kafka 3.3.1, and 3.2.6 are Available Now

_Releases | Soby Chacko |  December 17, 2024 | 0 Comments_

We are pleased to announce the availability of point releases for of Spring for Apache Kafka versions `3.3.1` and `3.2.6 `. We thank everyone who contributed to these releases.

#### [](#release-notes)Release Notes

See the release notes for more details on what's included in these releases:

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.1](https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.1)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.6](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.6)

#### [](#kafka-client-390-compatibility)Kafka Client 3.9.0 compatibility

The `3.3.1` version is compatible with Kafka Client version `3.9.0`, but the compile time dependency in the framework is on Kafka client version `3.8.1`. To use Kafka client version `3.9.0` or above with `3.3.1`, the applications need to manually upgrade the Kafka client version. To see more details on how to override the Kafka client versions when using Spring Boot, see [this](https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html).

#### [](#spring-boot-integration)Spring Boot Integration

The `3.3.1` and `3.2.6` releases will be integrated with upcoming Spring Boot `3.4.1` and `3.3.7` respectively.

#### [](#staying-in-touch-with-the-project)Staying in touch with the project

Following are the usual avenues where you can engage with the project.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
---
title: Spring for Apache Kafka 4.0.0-M1, 3.3.4, and 3.2.8 are Available Now
source: https://spring.io/blog/2025/03/18/spring-kafka-4-0-0-M1-and-3-3-4-and-3-2-8-available-now
scraped: 2026-02-23T07:49:47.877Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  March 18, 2025 | 0 Comments
---

# Spring for Apache Kafka 4.0.0-M1, 3.3.4, and 3.2.8 are Available Now

_Releases | Soby Chacko |  March 18, 2025 | 0 Comments_

We are pleased to announce the first milestone release of Spring for Apache Kafka `4.0.x` generation. The major theme in the `4.0.0-M1` milestone is upgrading the framework to be compatible with Spring Framework `7.0.0-M3`. Several other dependencies are updated to their respective next major versions, such as Kotlin support, which is updated to version `2.1.10`.

Another theme in the `4.0.0-M1` release is that all the former `org.springframework.lang` nullability annotations have been migrated to JSpecify-based [Null Safety](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/core/null-safety.html#null-safety-migrating) improvements. For more information, see this [blog post](https://spring.io/blog/2025/03/10/null-safety-in-spring-apps-with-jspecify-and-null-away) on the Spring support for JSpecify and NullAway. In the upcoming milestones, we are planning to build on this first round of new nullability changes and continue to make further refinements in this area.

In addition to the `4.0.0-M1` release, we are also happy to release the next point GA versions for Spring for Apache Kafka `3.3.4` and `3.2.8`.

We extend our gratitude to all contributors who made these releases possible.

#### [](#release-notes)Release Notes

See the release notes for more details on what's included in these releases:

[https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M1](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M1)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.4](https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.4)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.8](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.8)

#### [](#kafka-client-400)Kafka Client `4.0.0`

The next milestone of Spring for Apache Kafka will add support for the newly released Kafka Client `4.0.0` version, and will be a major theme in version `4.0.0-M2`.

#### [](#kafka-client-390-compatibility)Kafka Client `3.9.0` compatibility

Spring for Apache Kafka version `3.3.4` is compatible with Kafka Client `3.9.0`, though the framework's compile-time dependency remains Kafka Client `3.8.1`. To use Kafka Client `3.9.0` or later with version `3.3.4`, applications must manually upgrade their Kafka Client version.

For instructions on overriding Kafka Client versions in Spring Boot, please refer to [https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html\[this](https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html%5Bthis) guide\].

#### [](#spring-boot-integration)Spring Boot Integration

The `3.3.4` and `3.2.8` releases will be integrated into the upcoming Spring Boot `3.4.4` and `3.3.10` releases respectively. Version `3.3.4` will also be included in the Spring Boot `3.5.x` line and will be available with the upcoming Spring Boot `3.5.0-M3` release.

#### [](#staying-in-touch-with-the-project)Staying in Touch with the Project

We encourage the community to provide us with any feedback on any of these releases.

Following are the usual avenues where you can engage with the project.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
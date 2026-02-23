---
title: Spring for Apache Kafka 4.0.0-M5 is Available Now
source: https://spring.io/blog/2025/09/17/spring-kafka-4
scraped: 2026-02-23T07:29:47.717Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  September 17, 2025 | 0 Comments
---

# Spring for Apache Kafka 4.0.0-M5 is Available Now

_Releases | Soby Chacko |  September 17, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, we are pleased to announce that Spring for Apache Kafka `4.0.0-M5` has been released. We also released a patch GA version `3.3.10`. We extend our gratitude to all contributors who made these releases possible.

This is the final milestone release for the 4.0 series. We plan to release the first release candidate (RC1) next month.

#### [](#whats-new-in-400-m5)What's New in 4.0.0-M5

**Jackson 3 Support**: Added comprehensive Jackson 3 support across all serialization and messaging components. The framework automatically detects and prefers Jackson 3 when available, while Jackson 2 components remain deprecated but backward compatible.

**Spring Retry Removal**: Replaced Spring Retry dependency with [Spring Framework 7's core retry support](https://spring.io/blog/2025/09/09/core-spring-resilience-features). Note that this is a breaking change requiring configuration updates.

**Kafka 4.1.0 Upgrade**: Updated to Apache Kafka `4.1.0` client with improved share consumer handling and API usage optimizations.

You can find more details in the [reference documentation](https://docs.spring.io/spring-kafka/reference/4.0/).

#### [](#release-notes)Release Notes

`4.0.0-M5` release notes: [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M5](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M5)

`3.3.10` release notes: [https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.10](https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.10)

#### [](#spring-boot-integration)Spring Boot Integration

The `4.0.0-M5` release will be integrated into the upcoming Spring Boot `4.0.0-M3` release.

The `3.3.10` release will be included in the upcoming Spring Boot `3.5.6` and `3.4.10` releases.

#### [](#staying-in-touch)Staying in Touch

We encourage the community to provide feedback on these releases.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
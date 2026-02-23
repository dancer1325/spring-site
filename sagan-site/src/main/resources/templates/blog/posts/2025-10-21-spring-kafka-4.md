---
title: Spring for Apache Kafka 4.0.0-RC1 is Available Now
source: https://spring.io/blog/2025/10/21/spring-kafka-4
scraped: 2026-02-23T07:25:34.381Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  October 21, 2025 | 0 Comments
---

# Spring for Apache Kafka 4.0.0-RC1 is Available Now

_Releases | Soby Chacko |  October 21, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, we are pleased to announce that Spring for Apache Kafka `4.0.0-RC1` has been released. We extend our gratitude to all contributors who made this release possible.

This is our first and final release candidate before the `4.0.0` GA release. We encourage the community to test this release candidate and provide feedback on any issues or concerns before we proceed with the general availability release.

#### [](#whats-new-in-400-rc1)What's New in 4.0.0-RC1

**Share Consumer Enhancements**: Expanded share consumer capabilities with comprehensive acknowledgment support, concurrency configuration, and factory-level container properties. The share consumer implementation now includes proper poison message protection and delivery count tracking. Speaking of Share Consumers, we recently published a [dedicated blog](https://spring.io/blog/2025/10/14/introducing-spring-kafka-share-consumer) covering in detail the support for this feature in Spring for Apache Kafka.

**Improved Interceptor Configuration**: Added the ability to configure interceptors directly on listener container factories, providing more flexibility in message processing pipelines.

**Dependency Updates**: Upgraded to Jackson 3.0.0 (GA), JUnit 6.0.0, and other dependency refinements to ensure compatibility with the latest ecosystem components.

Several bug fixes are also included in this release, addressing transaction handling edge cases and retry topic configuration issues.

You can find complete details in the [reference documentation](https://docs.spring.io/spring-kafka/reference/4.0/).

#### [](#release-notes)Release Notes

`4.0.0-RC1` release notes: [https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-RC1](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-RC1)

#### [](#spring-boot-integration)Spring Boot Integration

The `4.0.0-RC1` release will be integrated into the upcoming Spring Boot `4.0.0-RC1` release.

#### [](#community-feedback)Community Feedback

As we approach the GA release, we value your input. Please test this release candidate in your applications and report any issues or feedback through our GitHub repository.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference/4.0/) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
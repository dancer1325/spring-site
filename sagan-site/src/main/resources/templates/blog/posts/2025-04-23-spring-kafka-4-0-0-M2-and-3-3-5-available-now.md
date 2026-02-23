---
title: Spring for Apache Kafka 4.0.0-M2, and 3.3.5 are Available Now
source: https://spring.io/blog/2025/04/23/spring-kafka-4-0-0-M2-and-3-3-5-available-now
scraped: 2026-02-23T07:44:46.199Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  April 23, 2025 | 0 Comments
---

# Spring for Apache Kafka 4.0.0-M2, and 3.3.5 are Available Now

_Releases | Soby Chacko |  April 23, 2025 | 0 Comments_

We are pleased to announce the second milestone release of Spring for Apache Kafka `4.0.x` generation - `4.0.0-M2`, which now supports Apache Kafka `4.0.0`.

#### [](#key-changes-in-400-m2)Key Changes in 4.0.0-M2

-   The Kafka client in `4.0.0-M2` has been updated to `4.0.0`
-   All ZooKeeper related support is now dropped from the `4.0.0-M2`, since Apache Kafka `4.0.0` has completely removed ZooKeeper dependency and now exclusively uses KRaft for leadership election and quorum management
-   The `EmbeddedKafkaBroker` utility that Spring for Apache Kafka provides for testing purposes will no longer work with ZooKeeper, as it only supports the KRaft protocol
-   We also verified that the next generation consumer rebalance protocol introduced via [KIP-848](https://cwiki.apache.org/confluence/display/KAFKA/KIP-848%3A+The+Next+Generation+of+the+Consumer+Rebalance+Protocol) works seamlessly via [Spring for Apache Kafka 4.0.0-M2](https://docs.spring.io/spring-kafka/reference/4.0/kafka/receiving-messages/rebalance-listeners.html#new-rebalalcne-protocol)

In addition to the `4.0.0-M2` release, we are also happy to release the next point GA versions for Spring for Apache Kafka `3.3.5`.

We extend our gratitude to all contributors who made these releases possible.

#### [](#release-notes)Release Notes

See the release notes for more details on what's included in these releases:

[https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M2](https://github.com/spring-projects/spring-kafka/releases/tag/v4.0.0-M2)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.5](https://github.com/spring-projects/spring-kafka/releases/tag/v3.3.5)

#### [](#kafka-client-compatibility)Kafka Client Compatibility

##### [](#kafka-client-400)Kafka Client `4.0.0`

To use Kafka client `4.0.0` in Spring for Apache Kafka, you must upgrade to the version `4.0.0-M2`, since this is a major upgrade.

##### [](#kafka-client-390-compatibility)Kafka Client `3.9.0` compatibility

Spring for Apache Kafka version `3.3.5` is compatible with Kafka Client `3.9.0`, though the framework's compile-time dependency remains Kafka Client `3.8.1`. To use Kafka Client `3.9.0` or later with version `3.3.5`, applications must manually upgrade their Kafka Client version.

For instructions on overriding Kafka Client versions in Spring Boot, please see [this guide](https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html).

#### [](#spring-boot-integration)Spring Boot Integration

The `3.3.5` release will be integrated into the upcoming Spring Boot `3.4.5` and `3.5.0-RC1` releases.

#### [](#staying-in-touch-with-the-project)Staying in Touch with the Project

We encourage the community to provide us with any feedback on any of these releases.

The following are the usual avenues where you can engage with the project.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
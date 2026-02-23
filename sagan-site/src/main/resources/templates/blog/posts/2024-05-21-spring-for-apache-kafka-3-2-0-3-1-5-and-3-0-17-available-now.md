---
title: Spring for Apache Kafka 3.2.0, 3.1.5 and 3.0.17 available now
source: https://spring.io/blog/2024/05/21/spring-for-apache-kafka-3-2-0-3-1-5-and-3-0-17-available-now
scraped: 2026-02-23T08:40:24.312Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  May 21, 2024 | 0 Comments
---

# Spring for Apache Kafka 3.2.0, 3.1.5 and 3.0.17 available now

_Releases | Soby Chacko |  May 21, 2024 | 0 Comments_

On behalf of the team and everyone in the community who contributed, we are pleased to announce the general availability of Spring for Apache Kafka `3.2.0`.

**Spring for Apache Kafka 3.2.0**

Th `3.2.0` GA version includes new additions, feature enhancements, bug fixes, and documentation updates. For more details on all the changes in the `3.2.0` release, please see [https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0).

The upcoming Spring Boot `3.3.0` will include the `3.2.0` version of Spring for Apache Kafka.

Since this is the first GA version in the `3.2.x` line, here is a recap of all the enhancements and features that went into this new generation of Spring for Apache Kafka.

-   This version uses the Kafka Client version `3.7.0`, that introduced the [new consumer group protocol](https://cwiki.apache.org/confluence/display/KAFKA/The+Next+Generation+of+the+Consumer+Rebalance+Protocol+%28KIP-848%29+-+Early+Access+Release+Notes). This is included as an early access feature in the `3.7.0` client and not meant to be used in production. We recommend the new consumer group protocol at this point only for testing purposes. By default, the classic consumer is used in Spring for Apache Kafka and when testing the new consumer group protocol, that must be opted in using the `group.protocol` consumer property. For more information, see [this](https://docs.spring.io/spring-kafka/reference/whats-new.html#x32-kafka-client-version).
-   Here is a new [sample application](https://github.com/spring-projects/spring-kafka/blob/main/samples/sample-07/README.adoc) that demonstrates the early access version of the new consumer group protocol.
-   The `KRaft` mode is disabled by default in `Embeddedkafka` due to certain limitations in `KafkaClusterTestKit`. If anyone wants to try `EmbeddedKafka` in `KRaft` mode, they have to enable it via the `kraft` property on the `EmbeddedKafka`. In addition, the new consumer group protocol only works in `kraft` mode and therefore, when testing this new protocol, we recommend not using `EmbeddedKafka` with `kraft` mode enabled due to the aforementioned limitations in `KafkaClusterTestKit`. To test the new consumer group protocol, we recommend using a real broker in `KRaft` mode. For more info, see [here](https://docs.spring.io/spring-kafka/reference/whats-new.html#x32-testing-support-changes).
-   Ability to [enforce a rebalance](https://docs.spring.io/spring-kafka/reference/3.2-SNAPSHOT/kafka/receiving-messages/enforced-rebalance.html#page-title) on the Consumer programmatically.
-   New API for [interactive queries](https://docs.spring.io/spring-kafka/reference/streams.html#kafka-streams-iq-support) in Kafka Streams support in the framework.
-   Customizations on the [transaciton id suffix](https://docs.spring.io/spring-kafka/reference/kafka/transactions.html#transaction-id-suffix-fixed).
-   Provide a way to [route to different DLT's](https://docs.spring.io/spring-kafka/reference/retrytopic/features.html#exc-based-custom-dlt-routing) based on exception types in non-blocking retries.
-   Asynchronous [Kafka Listener return types](https://docs.spring.io/spring-kafka/reference/kafka/receiving-messages/async-returns.html).
-   Improvements in [AfterRollbackProcessor](https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html#after-rollback) to skip entire batch of records that keeps failing.
-   Non-blocking retries support on class level `@KafkaListener`. For more detail see [here](https://docs.spring.io/spring-kafka/reference/retrytopic.html)
-   `RetryTopicConfiguration` [improvements](https://docs.spring.io/spring-kafka/reference/retrytopic/retry-config.html#find-retry-topic-config)
-   New API method to seek to an offset based on a user provided function. For more information, see the [reference docs](https://docs.spring.io/spring-kafka/reference/kafka/seek.html#seek).
-   `@PartitionOffset` support for [seek position](https://docs.spring.io/spring-kafka/reference/kafka/receiving-messages/listener-annotation.html#manual-assignment).
-   Removed many of the Apache Kafka specific native runtime hints in Spring for Apache Kafka in preference to the same support in [graalvm-reachability-metadata](https://github.com/oracle/graalvm-reachability-metadata/tree/master).

In addition, more enhancements and bug fixes have been made on throughout the `3.2.0` journey. For information on all changes, see the corresponding milestones and RC releases.

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-M1](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-M1)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-M2](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-M2)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-RC1](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-RC1)

**Spring for Apache Kafka 3.1.5 and 3.0.17**

Spring for Apache Kafka `3.1.5` and `3.0.17` have also been released. `3.0.17` is the last patch release in the `3.0.x` generation as this is out of OSS support. This version is only going to be commercially available going forward. For more details on the commercial support line, please see the [support timeline](https://spring.io/projects/spring-kafka#support).

Both patch releases include a few improvements and bug fixes. For more details, see the following change logs.

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.0.17](https://github.com/spring-projects/spring-kafka/releases/tag/v3.0.17)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.1.5](https://github.com/spring-projects/spring-kafka/releases/tag/v3.1.5)

Spring Boot `3.1.12` and `3.2.6` releases will include Spring for Apache Kafka `3.0.17` and `3.1.15`, respectively.

We want to express our gratitude to everyone who contributed to these releases. Your contributions are invaluable and play a crucial role in the continuous improvement of Spring for Apache Kafka.

#### [](#staying-in-touch-with-the-project)Staying in touch with the project

The following are the usual avenues to engage with the project.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
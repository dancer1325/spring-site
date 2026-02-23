---
title: Spring for Apache Kafka 3.0.16, 3.1.4 and 3.2.0-RC1 Available Now
source: https://spring.io/blog/2024/04/16/spring-for-apache-kafka-3-0-16-3-1-4-and-3-2-0-rc1-available-now
scraped: 2026-02-23T08:46:06.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Soby Chacko |  April 16, 2024 | 0 Comments
---

# Spring for Apache Kafka 3.0.16, 3.1.4 and 3.2.0-RC1 Available Now

_Releases | Soby Chacko |  April 16, 2024 | 0 Comments_

On behalf of the entire team and everyone in the community who contributed, we are pleased to announce the general availability of Spring for Apache Kafka `3.0.16` and `3.1.4`.

Both of these GA releases include a few improvements and bug fixes. For more details, see the following change logs.

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.0.16](https://github.com/spring-projects/spring-kafka/releases/tag/v3.0.16)

[https://github.com/spring-projects/spring-kafka/releases/tag/v3.1.4](https://github.com/spring-projects/spring-kafka/releases/tag/v3.1.4)

Spring Boot `3.1.11` and `3.2.5` releases will include Spring for Apache Kafka `3.0.16` and `3.1.14`, respectively.

In addition, we are pleased to announce the first release candidate for Spring for Apache Kafka 3.2.0 (`3.2.0-RC1`). This release candidate includes new additions, feature enhancements, bug fixes, and documentation updates. Some notable improvements include:

-   @PartitionOffset now supports `TopicPartitionOffset.SeekPosition`
-   More observability-related enhancements
-   Since most of the Apache Kafka-specific native hints have been migrated to the [graalvam-reachability-metadata](https://github.com/oracle/graalvm-reachability-metadata/tree/master) repository, removed those hints in Spring for Apache Kafka
-   Optionally allow a Kafka Streams processor to leave the consumer group when closing the streams

For more details on all the changes in the `3.2.0-RC1`, see [https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-RC1](https://github.com/spring-projects/spring-kafka/releases/tag/v3.2.0-RC1).

The upcoming Spring Boot `3.3.0-RC1` will include the `3.2.0-RC1` version of Spring for Apache Kafka.

The next step on the release journey is the GA release for `3.2.0` on May 20th. During the next few weeks, we will address fixing any reported bugs, adding more testing, improving documentation, etc.

We want to express our gratitude to everyone who contributed to these releases. Your contributions are invaluable and play a crucial role in the continuous improvement of Spring for Apache Kafka.

#### [](#staying-in-touch-with-the-project)Staying in touch with the project

The following are the usual avenues to engage with the project.

[GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/reference) | [Stack Overflow](https://stackoverflow.com/tags/spring-kafka)
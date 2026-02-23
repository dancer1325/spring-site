---
title: Spring for Apache Kafka 1.0.3 available now
source: https://spring.io/blog/2016/08/12/spring-for-apache-kafka-1-0-3-available-now
scraped: 2026-02-23T19:07:49.801Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  August 12, 2016 | 0 Comments
---

# Spring for Apache Kafka 1.0.3 available now

_Releases | Artem Bilan |  August 12, 2016 | 0 Comments_

It is my pleasure to announce that the Spring for Apache Kafka [1.0.3](https://github.com/spring-projects/spring-kafka/milestone/9?closed=1) maintenance release [is available now](http://projects.spring.io/spring-kafka/).

As usual, thanks to the community for any feedback and contribution as always!

This release contains several important bug fixes, including a memory leak when using manual acknowledgments; therefore an upgrade is highly recommended.

The addressed issues can be found [here](https://github.com/spring-projects/spring-kafka/milestone/9?closed=1).

The project now properly handles kafka messages with `null` payloads, which is a common use case used to "delete" a key when using [Kafka Log Compaction](https://cwiki.apache.org/confluence/display/KAFKA/Log+Compaction). `@KafkaListener` methods will now receive a `null` argument for such messages.

`spring-messaging` (and hence `spring-integration-kafka`) doesn’t support messages with a `null` payload. In `spring-integration-kafka` (version [2.0.1](https://github.com/spring-projects/spring-integration-kafka/milestone/3?closed=1)) such messages are represented with a payload of type `KafkaNull` - see the [Project README](https://github.com/spring-projects/spring-integration-kafka) for complete details.

[Project Page](http://projects.spring.io/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Documentation](http://docs.spring.io/spring-kafka/reference/htmlsingle/)
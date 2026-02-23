---
title: Spring for Apache Kafka 2.9 Release Candidate Available
source: https://spring.io/blog/2022/07/07/spring-for-apache-kafka-2-9-release-candidate-available
scraped: 2026-02-23T10:45:11.732Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  July 07, 2022 | 0 Comments
---

# Spring for Apache Kafka 2.9 Release Candidate Available

_Releases | Gary Russell |  July 07, 2022 | 0 Comments_

I am pleased to announce that the release candidate Spring for Apache Kafka 2.9.0 is now available (2.9.0-RC1) in the [Spring Milestone Repo](https://repo.spring.io/milestone).

This version is not provided by Spring Boot dependency management, but it can be used with Boot 2.7 (or 2.6), as long as you override the Kafka dependencies as described in [this appendix](https://docs.spring.io/spring-kafka/docs/2.9.0-RC1/reference/html/#update-deps), especially if you are using the embedded Kafka broker.

### [](#notable-changes)[](#notable-changes)Notable Changes

-   This version uses the 3.2.0 `kafka-clients` version
    
-   Non-blocking retry bootstrapping is now more robust
    
-   New Error Handler Mode
    

By default, after an error, the `DefaultErrorHandler` performs seeks on the remaining records from the last poll and re-fetches them from the broker on the next poll. With high error rates and large `max.poll.records`, this can cause unnecessary strain on the network. For this reason, the error handler has a new property `seekAfterError`, when set to `false`, instead of seeking the records, the remaining records are retained in memory and the consumer paused for the next poll (or multiple polls if the error handler is configured to use the `ContainerPausingBackOffHandler`).

-   Pausing Containers

By default, when you `pause()` a container, it actually pauses when all the records from the previous poll have been processed. This version adds the `pauseImmediate` container property, which, when `true`, causes the container to pause after the current record is processed.

For information about all changes in this release, see [What’s New](https://docs.spring.io/spring-kafka/docs/2.9.0-RC1/reference/html/#whats-new-part).

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.9.0-RC1/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)
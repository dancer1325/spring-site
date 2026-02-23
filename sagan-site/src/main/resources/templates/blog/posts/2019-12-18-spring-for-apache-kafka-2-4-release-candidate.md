---
title: Spring for Apache Kafka 2.4 Release Candidate
source: https://spring.io/blog/2019/12/18/spring-for-apache-kafka-2-4-release-candidate
scraped: 2026-02-23T14:18:17.516Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  December 18, 2019 | 0 Comments
---

# Spring for Apache Kafka 2.4 Release Candidate

_Releases | Gary Russell |  December 18, 2019 | 0 Comments_

Hot on the heels of the recent Apache Kafka 2.4.0 release, I am pleased to announce the release candidate for Spring for Apache Kafka 2.4 - 2.4.0.RC1 - is available in the [Spring milestone repository](https://repo.spring.io/milestone).

This version is essentially functionally equivalent to 2.3.x, but is compiled against the 2.4.0 `kafka-clients` and supports the new incremental rebalancing protocol.

The 2.4.0 kafka clients are not binary compatible with Spring for Apache Kafka 2.3 so if you wish to use the 2.4.0 clients, you must upgrade to this version. See the appendix in the reference manual for how to override the jar versions, especially if you are using Spring Boot and/or the test embedded kafka broker.

We expect to release the GA shortly.

At the time of writing, it is expected that the next Spring Boot version (2.3) will pull in 2.4.x of this project via its dependency management.

[Project Page](https://spring.io/projects/spring-kafka/) | [GitHub](https://github.com/spring-projects/spring-kafka) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Documentation](https://docs.spring.io/spring-kafka/docs/2.4.0..RC1/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-kafka) | [Gitter](https://gitter.im/spring-projects/spring-kafka)
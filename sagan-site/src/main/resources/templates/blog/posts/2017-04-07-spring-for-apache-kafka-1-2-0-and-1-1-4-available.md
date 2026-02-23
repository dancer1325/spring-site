---
title: Spring For Apache Kafka 1.2.0 and 1.1.4 Available
source: https://spring.io/blog/2017/04/07/spring-for-apache-kafka-1-2-0-and-1-1-4-available
scraped: 2026-02-23T16:34:57.100Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  April 07, 2017 | 0 Comments
---

# Spring For Apache Kafka 1.2.0 and 1.1.4 Available

_Releases | Gary Russell |  April 07, 2017 | 0 Comments_

We are pleased to announce that these maintenance releases of Spring for Apache Kafka are now available, 1.2.0.RELEASE and 1.1.4.RELEASE.

These versions include several bug fixes and improvements, as well as introduce support for [KStreams](http://docs.spring.io/spring-kafka/docs/1.2.0.RELEASE/reference/htmlsingle/#kafka-streams).

They are functionally equivalent; the 1.2.0.RELEASE is based on the 0.10.2.0 `kafka-clients` jar and 1.1.4.RELEASE can be used with 0.10.0.x and 0.10.1.x.

While 1.1.4.RELEASE will work at runtime with a 0.10.2.x client library, some breaking changes in the embedded kafka API means that the embedded kafka Junit `@Rule` in `spring-kafka-test` will not work and 1.2.0.RELEASE is required for that.

[Project Page](http://projects.spring.io/spring-kafka/) | [Issues](https://github.com/spring-projects/spring-kafka/issues) | [Contributing](https://github.com/spring-projects/spring-kafka/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-kafka) | [Chat](https://gitter.im/spring-projects/spring-kafka)
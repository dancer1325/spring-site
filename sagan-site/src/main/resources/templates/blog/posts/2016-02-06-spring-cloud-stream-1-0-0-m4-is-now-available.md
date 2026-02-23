---
title: Spring Cloud Stream 1.0.0.M4 is now available
source: https://spring.io/blog/2016/02/06/spring-cloud-stream-1-0-0-m4-is-now-available
scraped: 2026-02-23T19:28:57.564Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  February 06, 2016 | 3 Comments
---

# Spring Cloud Stream 1.0.0.M4 is now available

_Releases | Marius Bogoevici |  February 06, 2016 | 3 Comments_

On behalf of the team, I am pleased to announce the release of [Spring Cloud Stream 1.0.0.M4](http://cloud.spring.io/spring-cloud-stream/). The new release comes with a few major changes and enhancements, and it defines core abstractions and primitives that we believe to be essential for the development of distributed real-time data processing applications. To name some of them:

#### [](#default-publish-subscribe-semantics)Default publish-subscribe semantics

The most important change in Spring Cloud Stream 1.0.0.M4 is the way in which applications interact with each other. We have opted for a default publish-subscribe model, in which each application that receives messages from a given destination will receive a copy of the message. This is a better fit for the processing model of stream applications, where intermediate topics act as data hubs for the various intersecting data streams, also making scenarios such as tapping easier and more efficient. This feature goes hand in hand with the next, which is [consumer groups](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M4/reference/htmlsingle/index.html#_consumer_group_support).

#### [](#consumer-groups-for-load-balancing-and-partitioning)Consumer groups for load balancing and partitioning

Of course, if there are multiple instances of a given application, we want them to act as competing or partitioned consumers - messages should be sent to one and only one of the instances that run in parallel. This can be done now in Spring Cloud Stream 1.0.0.M4 by the use of [consumer groups](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M4/reference/htmlsingle/index.html#_consumer_group_support). Input bindings may specify a consumer group at runtime, e.g. `spring.cloud.stream.bindings.input.group=myGroup`. If multiple applications do so, they become part of the same group and messages will be distributed between them, either via a load-balancing or a partitioning strategy (controlled by a different set of configuration). This concept has been inspired by Kafka, but different binder implementations have different [approaches](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M4/reference/htmlsingle/index.html#_binder_spi) to providing this feature, and this is a first class concept in the framework.

#### [](#binder-spi-simplifications)Binder SPI simplifications

While not exposed to the general user, the Binder SPI is an important part of Spring Cloud Stream, and ensures that the framework remains flexible and extensible. In this release, we have taken radical steps of [simplifying](https://github.com/spring-cloud/spring-cloud-stream/blob/master/spring-cloud-stream/src/main/java/org/springframework/cloud/stream/binder/Binder.java) the SPI, making it easier for developers to create their own implementations, if necessary, besides the already provided Kafka, Rabbit and Redis. (As a fair warning, we are planning a few more changes to the Binder SPI, before the RC release).

#### [](#kafka-binder-offset-resetting-and-start-offset-control)Kafka binder offset resetting and start offset control

The Kafka binder now supports resetting offsets at start via the `spring.cloud.stream.binder.kafka.resetOffsets` property, allowing an application to resume consumption from either the beginning or the end of the partitions it subscribes to, via the `spring.cloud.stream.binder.kafka.startOffset` property which can be set either to `earliest` or `latest` offset. The latter can be used for controlling the starting offset of a newly launched application.

#### [](#health-indicator-support)Health indicator support

Spring Cloud Stream now takes advantage of the Spring Boot's application health management support, by exposing a [health indicator](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M4/reference/htmlsingle/index.html#_health_indicator) for the binders, reflecting the status of the middleware connection. This feature is currently supported for Rabbit and Redis, and is particularly important if the binders use a different connection than the default one provided by Boot.

The whole list of enhancements and fixes can be viewed in [GitHub](https://github.com/spring-cloud/spring-cloud-stream/issues?q=milestone%3A1.0.0.M4+is%3Aclosed).

[Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream) is a core component of [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) along with [Spring Cloud Task](http://cloud.spring.io/spring-cloud-task/), and provides the foundation for [Spring Cloud Bus](http://cloud.spring.io/spring-cloud-bus/).

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/springcentral).
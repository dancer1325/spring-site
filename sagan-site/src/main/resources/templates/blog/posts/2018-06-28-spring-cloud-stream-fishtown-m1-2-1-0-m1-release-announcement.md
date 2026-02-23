---
title: Spring Cloud Stream Fishtown.M1 /2.1.0.M1 Release Announcement
source: https://spring.io/blog/2018/06/28/spring-cloud-stream-fishtown-m1-2-1-0-m1-release-announcement
scraped: 2026-02-23T15:20:24.560Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  June 28, 2018 | 0 Comments
---

# Spring Cloud Stream Fishtown.M1 /2.1.0.M1 Release Announcement

_Engineering | Oleg Zhurakousky |  June 28, 2018 | 0 Comments_

We are pleased to announce the first Milestone of the Spring Cloud Stream Fishtown release train - Fishtown.M1/2.1.0.M1.

Spring Cloud Stream Fishtown 2.1.0.M1 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream/2.1.0.M1/) repository. The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vFishtown.M1) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

The following section provides a brief summary of features and improvements included in this release.

### [](#notable-features-improvements--enhancements)Notable Features, Improvements & enhancements

#### [](#core)Core

-   Support for Message Listener container customization by simply registering implementation of `ListenerContainerCustomizer` bean.
-   Binding properties precedence support. This feature allows default binding properties to be overriden with specific binding properties. For example.

```
Copyspring.cloud.stream.default.contentType=text/plain
spring.cloud.stream.default.producer.partitionCount=1
spring.cloud.stream.bindings.output.producer.partitionCount=4
```

In the above, the default content type for all bindings is set to `text/plain`. Also, all producer bindings `partitionCount` is set to `1` with the exception of *output* destination bindings where it is set to `4`

-   In addition to the existing *input* binding actuator endpoints, support for *output* binding actuator endpoints was added as well.

#### [](#rabbit-binder)Rabbit Binder

-   Exposed support for setting queue length as and overflow policy
-   Multiplex support

#### [](#kafka-binder)Kafka Binder

-   Wild cards are now supported in kafka topic names in the binder \[kafka binder\]
-   New annotation `KafkaStreamsStateStore` for creating state stores in lower level processor API in kafka streams \[kafka streams binder\]
-   Removing the creation of unnecessary repartition topics in the kafka streams binder
-   Consuming from multiple topics in kafka streams binder
-   Improvements in in interactive query support in kafka streams binder - Multiple consumers and querying across them are now supported.
-   `QueryableStoreRegistry` is deprecated and a new API is provided called `InteractiveQueryService`. In addition to provide ability to query state stores, this API also gives information about the host where the consumer is running.
-   Multiplex support

Various other enhancements and bug [fixes](https://github.com/spring-cloud/spring-cloud-stream/milestone/43?closed=1)

Once again huge thanks to all the community contributors!!!

> NOTE:

If the applications are created from Spring Initializr, they need to add this BOM snippet in maven dependency management before the spring-cloud BOM declaration:

```
Copy<dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-stream-dependencies</artifactId>
           <version>Fishtown.M1</version>
           <type>pom</type>
           <scope>import</scope>
</dependency>
```

#### [](#next-steps)Next Steps

The M2 is planned for the end of July and will contain primarily new binding features as well as integration with [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/)

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).
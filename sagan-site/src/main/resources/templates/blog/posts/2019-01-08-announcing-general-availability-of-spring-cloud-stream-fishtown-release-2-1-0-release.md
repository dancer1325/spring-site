---
title: Announcing General Availability of Spring Cloud Stream - Fishtown.RELEASE (2.1.0.RELEASE)
source: https://spring.io/blog/2019/01/08/announcing-general-availability-of-spring-cloud-stream-fishtown-release-2-1-0-release
scraped: 2026-02-23T15:02:56.624Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  January 08, 2019 | 0 Comments
---

# Announcing General Availability of Spring Cloud Stream - Fishtown.RELEASE (2.1.0.RELEASE)

_Engineering | Oleg Zhurakousky |  January 08, 2019 | 0 Comments_

After an exciting journey, we are pleased to announce the General Availability release of the [Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-stream) Fishtown release train - Fishtown.RELEASE/2.1.0.RELEASE.

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-stream-dependencies</artifactId>
            <version>Fishtown.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Spring Cloud Stream Fishtown (2.1.0.RELEASE) is available for use in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-stream/2.1.0.RELEASE/) and the [Spring Repo](http://repo.spring.io/libs-release/org/springframework/cloud/spring-cloud-stream/2.1.0.RELEASE/).

---

# [](#this-release-encompasses-the-following)This release encompasses the following:

### [](#notable-dependency-upgrades)Notable Dependency Upgrades

-   Spring Boot 2.1.x
-   Reactor Californium.RELEASE
-   Spring Cloud Function 2.0.0.RELEASE

#### [](#core)Core

-   Support for [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) programming model (see [M2 release announcement](https://spring.io/blog/2018/08/28/spring-cloud-stream-fishtown-m2-2-1-0-m2-release-announcement) for more details)
-   Support for Message Listener container customization by simply registering implementation of `ListenerContainerCustomizer` bean.
-   Binding properties precedence support (see [M1 release announcement](https://spring.io/blog/2018/06/28/spring-cloud-stream-fishtown-m1-2-1-0-m1-release-announcement) for more details)
-   Support for *output* binding actuator endpoints was added as well.

#### [](#rabbit-binder)Rabbit Binder

-   Exposed support for setting queue length as and overflow policy
-   Multiplex support
-   Support for Consumer Tags

#### [](#kafka-binder)Kafka Binder

-   Wild cards are now supported in kafka topic names in the binder \[kafka binder\]
-   New annotation `KafkaStreamsStateStore` for creating state stores in lower level processor API in kafka streams \[kafka streams binder\]
-   Removing the creation of unnecessary repartition topics in the kafka streams binder
-   Consuming from multiple topics in kafka streams binder
-   Improvements in in interactive query support in kafka streams binder - Multiple consumers and querying across them are now supported.
-   `QueryableStoreRegistry` is deprecated and a new API is provided called `InteractiveQueryService`. In addition to provide ability to query state stores, this API also gives information about the host where the consumer is running.
-   Multiplex support

Once again huge thanks to all the community contributors!!!

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).
---
title: Spring Cloud Stream Elmhurst.RC1 /2.0.0.RC1 Release Announcement
source: https://spring.io/blog/2018/02/23/spring-cloud-stream-elmhurst-rc1-2-0-0-rc1-release-announcement
scraped: 2026-02-23T16:08:06.664Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  February 23, 2018 | 0 Comments
---

# Spring Cloud Stream Elmhurst.RC1 /2.0.0.RC1 Release Announcement

_Engineering | Oleg Zhurakousky |  February 23, 2018 | 0 Comments_

After a long and exciting journey we are pleased to announce the first Release Candidate of the Spring Cloud Stream Elmhurst release train - Elmhurst.RC1/2.0.0.RC1.

Spring Cloud Stream Elmhurst 2.0.0.RC1 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream/2.0.0.RC1/) repository. The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.RC1) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

Given that this is a Release Candidate the following section provides a brief summary of features and improvements not just included in this release but for 2.0 in general, with details to follow in a form of upcoming blogs and documentation updates in preparation for 2.0.0.RELEASE.

### [](#new-features)New Features

-   Polling Source as an alternative to the event-driven message consumption.
-   Custom MessageConverters via `@StreamMessageConverter` annotation.
-   New Test Binder - a binder backed by Spring Integration to support testing at the level of binder destinations rather then its internal channels.
-   Actuator endpoints for binding control - allows one to not only see the existing bindings but to manage their lifecycle (i.e., stop/start etc)
-   Micrometer, micrometer, micrometer! - Metrics support is now based on [Micrometer](https://github.com/micrometer-metrics/micrometer)
-   Complete revamping of Kafka Streams binder - details to follow.

### [](#improvements--enhancements)Improvements & enhancements

-   Improved and consistent Content-Type negotiation
-   StreamListener Infrastructure enhancements to deal with multiple destinations
-   Configurable RetryTemplate
-   Configurable Web environment - optional by default yet giving user a choice to bring reactive (Netty) or conventional (Tomcat) based on the provided boot starter.
-   Partitioning is now Spring configured - providing for more user flexibility when customizations around partitioning is required.
-   Actuator is becoming optional -
-   Initializer (start.spring.io) improvements - improved user experience when creating new Spring Cloud Stream applications.

Various other enhancements and bug [fixes](https://github.com/spring-cloud/spring-cloud-stream/milestone/31?closed=1)

Once again huge thanks to all the community contributors!!! Without your help we wouldn't be here!

#### [](#next-steps)Next Steps

As mentioned the 2.0.0.RELEASE is planned in the next few weeks, so please take it for a spin stay tuned and tell us about it [here](https://github.com/spring-cloud/spring-cloud-stream/issues).

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).
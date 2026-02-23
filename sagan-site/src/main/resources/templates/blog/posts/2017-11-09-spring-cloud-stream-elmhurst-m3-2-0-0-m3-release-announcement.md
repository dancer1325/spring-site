---
title: Spring Cloud Stream Elmhurst.M3 /2.0.0.M3 Release Announcement
source: https://spring.io/blog/2017/11/09/spring-cloud-stream-elmhurst-m3-2-0-0-m3-release-announcement
scraped: 2026-02-23T16:15:37.963Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  November 09, 2017 | 0 Comments
---

# Spring Cloud Stream Elmhurst.M3 /2.0.0.M3 Release Announcement

_Engineering | Oleg Zhurakousky |  November 09, 2017 | 0 Comments_

We are pleased to announce the 2.0.0.M3 release of the Spring Cloud Stream Elmhurst release train.

Spring Cloud Stream Elmhurst 2.0.0.M3 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream/2.0.0.M3/) repository. The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.M3) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

The following sections list new features and improvements included in this release:

### [](#improved-content-type-resolution)Improved Content Type Resolution

The content-type resolution has been improved and consolidated in the [channel interceptors](https://docs.spring.io/spring-integration/reference/htmlsingle/#channel-interceptors), which makes it configurable for situations that require application-level customizations. Also, based on the community feedback, we now set the default content-type as `application/json`. However, it is still possible to override it via `BindingProperties` or it can be passed with the `Message` coming from an upstream application.

### [](#support-for-apache-kafka-011)Support for Apache Kafka 0.11+

This release comes with full support for Apache Kafka 0.11+ including support for [native headers](https://kafka.apache.org/0110/javadoc/index.html?org/apache/kafka/common/header/Headers.html).

While we strongly recommend upgrading your Kafka broker, this release still supports 0.10 Kafka broker, however you’d need to set the `headerMode` to either `none` or `embedded`.

### [](#a-note-about-samples)A note about Samples

As always, great way to learn any new technology or a framework is trying it out and applying it on a use-case. We see a variety of use-cases coming from the community and the customers. To further improve the learning experience, we [continue to add more samples](https://github.com/spring-cloud/spring-cloud-stream-samples), and it has had a few new additions recently. Use it or fork it; as well, share your experiences by submitting examples to engage with the broader community. We welcome contributions!

#### [](#next-steps)Next Steps

We are hoping to get to a stable release-candidate state by [SpringOne Platform 2017](https://springoneplatform.io/). Please try it out and give us feedback and do that often!

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).
---
title: Spring Cloud Stream Ditmars/1.3 Release Candidate Announcement
source: https://spring.io/blog/2017/09/14/spring-cloud-stream-ditmars-1-3-release-candidate-announcement
scraped: 2026-02-23T16:22:32.334Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  September 14, 2017 | 0 Comments
---

# Spring Cloud Stream Ditmars/1.3 Release Candidate Announcement

_Releases | Gary Russell |  September 14, 2017 | 0 Comments_

We are pleased to announce that the release candidate Spring Cloud Stream Ditmars.RC1 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone/) repository. The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vDitmars.RC1) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

## [](#kafka-streams-for-apache-kafka)[](#kafka-streams-for-apache-kafka)Kafka Streams for Apache Kafka

This release targets the promotion of [Kafka Streams for Apache Kafka](https://docs.spring.io/spring-cloud-stream/docs/Ditmars.RC1/reference/htmlsingle/#_kafka_streams_binding_capabilities_of_spring_cloud_stream) support as a top-level project in the Apache Kafka binder implementation. With Kafka Streams for Apache Kafka positioned as a first-class citizen, developers can now build Spring Cloud Stream applications by taking advantage of the Kafka Streams API at the binding level, so that it is much simpler to implement real-time data-processing business functions. The developers can focus on the functionality as opposed to the infrastructure and the messaging middleware configuration specifics, which Spring Cloud Stream tackles head-on by addressing it out-of-the-box. In addition to writing standard stream processing applications, Spring Cloud Stream binder for Kafka Streams enables developers to write applications that leverage on the interactive query features of Kafka Streams. Check out the [samples](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/kstream) for more details.

## [](#apache-kafka-011)[](#apache-kafka-0-11)Apache Kafka 0.11

By popular demand from customers and the community, we are excited to also announce Apache Kafka 0.11 support for Spring Cloud Stream. Given the foundation projects (Spring for Apache Kafka and Spring Integration Kafka) are adding the 0.11 support more explicitly in their next major releases, the team made sure to make 0.11 available as a preview-release for Spring Cloud Stream by back porting it to a minor release. For that reason, there is a 0.11 branch that explicitly adds support for the Apache Kafka 0.11 release. For early adopters who are interested in upgrading to this release, we have released it as a [stand alone artifact](http://repo.spring.io/libs-milestone/org/springframework/cloud/spring-cloud-stream-binder-kafka11/1.3.0.RC1/). Similarly, there is an [artifact for the kstream binder for 0.11](http://repo.spring.io/libs-milestone/org/springframework/cloud/spring-cloud-stream-binder-kstream11/1.3.0.RC1/).

Note

As a reminder, the Spring Cloud Stream 2.0 release of Apache Kafka binder implementation will default to Apache Kafka 0.11 and that will be the only version supported in this next major release. The older Apache Kafka versions will be supported in the 1.3.x release line of Spring Cloud Stream.

## [](#error-handling)[](#error-handling)Error Handling

Further improving the error handling support, we have simplified [producer- and consumer-level exception handling](https://docs.spring.io/spring-cloud-stream/docs/Ditmars.RC1/reference/htmlsingle/#binder-error-channels). The creation and orchestration of error channels and the global representation of the same have been reimplemented in this release train, too.

Apart from this, a variety of bug-fixes and improvements are part of the release. For more details, please refer to project level release markers in the [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vDitmars.RC1).

For next steps, we are planning to release the general availability of the Spring Cloud Stream Ditmars release train by the end of this month. As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).

See the [project page](http://cloud.spring.io/spring-cloud-stream/) for more information.
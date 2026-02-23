---
title: Spring Cloud Stream 1.3 goes GA
source: https://spring.io/blog/2017/10/06/spring-cloud-stream-1-3-goes-ga
scraped: 2026-02-23T16:14:59.964Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Vinicius Carvalho |  October 06, 2017 | 1 Comment
---

# Spring Cloud Stream 1.3 goes GA

_Engineering | Vinicius Carvalho |  October 06, 2017 | 1 Comment_

We are pleased to announce the general availability release of the Spring Cloud Stream Ditmars release train.

[Spring Cloud Stream Ditmars.RELEASE](https://docs.spring.io/spring-cloud-stream/docs/Ditmars.RELEASE/reference/htmlsingle/) is available for use in the [Spring Release](http://repo.spring.io/libs-release) repository. The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vDitmars.RELEASE) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

The following sections list new features included in this release.

# [](#apache-kafka)Apache Kafka

## [](#kafka-streams-for-apache-kafka)Kafka Streams for Apache Kafka

Spring Cloud Stream automates discovery and auto-configuration, and it provides a simple approach to facilitating the interactivity between application business-logic and Apache Kafka. With most of the standard message broker-specific settings exposed as Spring Boot properties, it is easy to use and override to adapt to business needs.

Further enhancing the Apache Kafka integration, the Kafka Streams integration has been promoted to be a top-level construct in Apache Kafka’s binder implementation.

Thanks to having the Kafka Streams API baked into the framework, both simple and more complex data processing functions can be built as Spring Boot applications. All you need is the `spring-cloud-stream-binder-kstream` dependency in the classpath - it's that easy to get started. This integration includes a partition-level local state to further simplify solving for event-driven processors, data aggregators, continuous-queries, and transformations.

The following screencast shows it in action.

## [](#apache-kafka-011)Apache Kafka 0.11

By popular demand from customers and the community, we have added support for Apache Kafka 0.11. Though it is supported today, we haven't switched to it as the default in this release. 0.11 will be a default in the upcoming 2.0.0.RELEASE. For that reason, for early adopters who are interested in upgrading to this release, we have released it as a [standalone artifact](https://search.maven.org/#search%7Cga%7C1%7Cspring-cloud-stream-binder-kafka11).

## [](#consumer-lag-metrics)Consumer Lag Metrics

With [@hekonsek](https://github.com/hekonsek)'s contribution, there is a new metrics addition that can help with consumer-lag forensics. This is helpful for situations involving whether or not to auto-scale the consumer depending on the dynamic traffic patterns.

# [](#rabbitmq)RabbitMQ

## [](#lazy-queues)Lazy Queues

If reducing I/O footprint is a requirement, there is now support for "Lazy Queues" in the [RabbitMQ binder implementation](https://docs.spring.io/spring-cloud-stream/docs/Ditmars.BUILD-SNAPSHOT/reference/htmlsingle/#_rabbit_producer_properties). Likewise, DLQ support for "Lazy Queues" is also available.

## [](#resilient-retries)Resilient Retries

A typical scale-out setup of RabbitMQ involves a collection of RabbitMQ nodes connected with a load-balancer in front. Upon a node failure, to embrace it and recover, there is now a fix in place for eventual recovery with the help of retries.

## [](#distinct-connection-factories)Distinct Connection Factories

To avoid deadlocks at the consumers when the shared connection is blocked by a busy producer, this release adds support for separate connection factories for non-transactional producers.

# [](#amazon-kinesis-incubating)Amazon Kinesis (incubating)

The community-driven [binder implementation for Amazon Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) has had significant progress; however, it couldn't make it to the Ditmars release-train given the upstream dependencies from the Spring Cloud ecosystem of projects. We hope to continue the momentum and graduate the kinesis-binder in the upcoming 2.0.0 milestones. We would like to thank our community champions Peter Oates ([@oatesp](https://github.com/oatesp)) and Jacob Severson ([@JacobASeverson](https://github.com/JacobASeverson)) for their valuable time and quality contributions.

# [](#error-handling)Error Handling

Ditmars release-train revisits the error-handling support in the core framework. We have simplified the producer- and consumer-level exception handling. For instance, there is an error channel (`<destination>.errors`) to receive a copy of messages that fail, and the global Spring Integration `errorChannel` remains available. The creation, orchestration, and global representation of error channels are in this release train.

#Spring Cloud Stream 2.0

The 1.3 release marks the last iteration on the 1.x series and Boot 1.5. The next major release-train (Elmhurst) includes a complete overhaul of several core functionalities. The following themes are under consideration: Spring Boot 2.0 compatibility, better content-type resolution, a further simplified error-handling experience, and smarter binding-lifecycle hooks to start, stop and pause consumers. This is actively under development, and we hope to get to a stable release-candidate state by [SpringOne Platform 2017](https://springoneplatform.io/). We are excited about the work-in-progress!

Lastly, a variety of bug-fixes and improvements are part of the release. For more details, please refer to project-level release markers from the [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vDitmars.RELEASE).

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).
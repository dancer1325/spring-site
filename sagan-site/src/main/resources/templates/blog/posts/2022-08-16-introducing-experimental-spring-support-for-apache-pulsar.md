---
title: Introducing Experimental Spring Support for Apache Pulsar
source: https://spring.io/blog/2022/08/16/introducing-experimental-spring-support-for-apache-pulsar
scraped: 2026-02-23T10:22:15.867Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  August 16, 2022 | 4 Comments
---

# Introducing Experimental Spring Support for Apache Pulsar

_Engineering | Soby Chacko |  August 16, 2022 | 4 Comments_

We are happy to announce that we are incubating a new [experimental Spring project](https://github.com/spring-projects-experimental/spring-pulsar) for Apache Pulsar. This project aims to provide Spring-friendly APIs, building blocks, and programming models for writing Java applications that interact with Apache Pulsar.

[Apache Pulsar](https://pulsar.apache.org/) is a popular messaging system with a growing ecosystem of developers in the enterprise messaging and streaming space. Here are some main features and advantages of using Apache Pulsar for messaging-based software applications:

-   Apache Pulsar provides both the traditional queuing semantics of RabbitMQ, ActiveMQ, and others and the log-based structure of Apache Kafka through various subscription models.
-   The broker in Apache Pulsar is stateless, and the storage is not part of the broker. Instead, it uses another Apache project called Bookkeeper to separate the storage layer from the broker. Because of this fundamental design, scaling up Apache Pulsar brokers is easy.
-   Apache Pulsar uses distributed logs, called ledgers, leveraged through Bookkeeper. These ledgers distribute across multiple nodes of Bookkeeper.
-   Another advantage of separating the storage layer (ledgers) from the serving layer (brokers) is that they can scale separately.
-   Topic partitioning is a feature, not a requirement. You only need to use partitioning if the use case demands it.
-   Built-in geo-replication mechanisms.
-   Built-in multi-tenancy capabilities.

Historically, Spring has provided comprehensive support for popular JVM-based messaging systems. [JMS](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#jms) support is part of the core Spring Framework. Spring offers extensive support for AMQP and Kafka through their relevant counterparts in the Spring ecosystem - [Spring AMQP](https://spring.io/projects/spring-amqp) and [Spring for Apache Kafka](https://spring.io/projects/spring-kafka). In addition, various messaging-related support is available in popular Spring projects such as [Spring Integration](https://spring.io/projects/spring-integration) and [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream). Since Apache Pulsar is growing as a messaging broker, we started experimenting with a new Spring project dedicated to it by using the [Java client](https://pulsar.apache.org/docs/client-libraries-java/) for Apache Pulsar.

From an application developer’s standpoint, Apache Pulsar offers many of the same features that Apache Kafka provides, such as creating a producer to publish, a consumer to consume, and so on. Therefore, in the experimental Spring for Apache Pulsar, we model the design based on the fundamental design principles in Spring for Apache Kafka. You may notice many similarities in Spring for Apache Pulsar if you are familiar with the APIs of Spring for Apache Kafka. With this in mind, here are some current themes and features of Spring for Apache Pulsar:

-   `PulsarTemplate` for quickly publishing to Pulsar topics using one-liner send methods.
-   Provide a `PulsarListener` annotation to write high-level Pulsar consumers.
-   `MessageListenerContainer` infrastructure to support PulsarListener.
-   Both record and batch-based `PulsarListener` consumption.
-   Pulsar Producer and Consumer factories
-   Automatic message acknowledgment by the framework.
-   Various acknowledgment modes (for example, **MANUAL**, **RECORD**, **BATCH**, and others).
-   Spring Boot auto-configuration components.

This list of features is not exhaustive by any means, but we hope this list is a good starting point.

As we are still on the ground floor of this initiative, we would greatly appreciate any feedback. Especially if you are a Spring user writing Apache Pulsar-based applications, we would love to hear about your experience using this library.

We are planning to add more features and capabilities to this framework soon. We welcome any collaboration from the community in the form of bug reports, feature requests, pull requests, and other types of feedback.

## [](#spring-for-apache-pulsar-resources)Spring for Apache Pulsar Resources

[Spring for Apache Pulsar GitHub repository](https://github.com/spring-projects-experimental/spring-pulsar)

[Reference Documentation](https://docs.spring.io/spring-pulsar/docs/current-SNAPSHOT/reference/html/)

[Sample Applications](https://github.com/spring-projects-experimental/spring-pulsar/tree/main/spring-pulsar-sample-apps)
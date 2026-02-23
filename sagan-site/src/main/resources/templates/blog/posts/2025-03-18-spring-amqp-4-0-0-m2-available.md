---
title: Spring AMQP 4.0 Milestone 2 Available
source: https://spring.io/blog/2025/03/18/spring-amqp-4-0-0-m2-available
scraped: 2026-02-23T07:49:04.845Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 18, 2025 | 0 Comments
---

# Spring AMQP 4.0 Milestone 2 Available

_Releases | Artem Bilan |  March 18, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the second Milstone for `4.0.0` of Spring AMQP.

The patch versions `3.1.10` and `3.2.4` also have been released.

The most notable fature of this `4.0.0-M2` is a new `spring-rabbitmq-client` module which brings support for AMQP 1.0 protocol on RabbitMQ. This module is based on a new `com.rabbitmq.client:amqp-client` library which is only desiged for RabbitMQ with AMQP 1.0. Therefore this library, as well as `spring-rabbitmq-client` cannot be used with any arbitrary AMQP 1.0 broker. The JMS bridge AMQP over 1.0 is recommended for such an integration.

The `spring-rabbitmq-client` brings implementation of well-known Spring AMQP abstractions:

-   `RabbitAmqpTemplate` - the `AsyncAmqpTemplate` implementation for performing template operations against RabbitMQ AMQP 1.0 connection;
-   `RabbitAmqpListenerContainer` - the `MessageListenerContainer` implementation to consume messages from queues using RabbitMQ AMQP 1.0 connection;
-   `RabbitAmqpMessageListenerAdapter` - the AMQP 1.0 specific `MessagingMessageListenerAdapter` extension for the `@RabbitListener` support;
-   `RabbitAmqpAdmin` - the `AmqpAdmin` implementation for RabbitMQ AMQP 1.0 connection to manage topology.

See more info in the [Release Notes](https://github.com/spring-projects/spring-amqp/releases/tag/v4.0.0-M2).

Don't hasitate to reach us out in GitHub issues for the project!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub Issues](https://github.com/spring-projects/spring-amqp/issues) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)
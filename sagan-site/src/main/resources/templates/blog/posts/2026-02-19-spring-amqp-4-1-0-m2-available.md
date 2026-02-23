---
title: Spring AMQP 4.1.0 Milestone 2 Available
source: https://spring.io/blog/2026/02/19/spring-amqp-4-1-0-m2-available
scraped: 2026-02-23T12:33:42.336Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 19, 2026 | 0 Comments
---

# Spring AMQP 4.1.0 Milestone 2 Available

_Releases | Artem Bilan |  February 19, 2026 | 0 Comments_

Hi Spring fans!

It is my pleasure today to share with you the Spring AMQP `4.1.0-M2` is available with some new fature to try.

Notable changes in this release:

-   The new `spring-amqp-client` module has gotten new API for programatic `MessageListenerContainer` configuration and registration: `AmqpMessagingListenerAdapter`, `AmqpMessageListenerContainerFactory`, `AmqpListenerEndpoint`, `AmqpListenerEndpointRegistry` etc.
-   With upcoming milestones, based on that new API, we are going to implement a high-level `@AmqpListener` annotation with similar functionality to well-known `@RabbitListener` (see also `@KafkaListener`, `@JmsListener` or `@ServiceActivator`).
-   The `TestUtils.getPropertyValue()` was changed to be based on the generic argument for easier adoption in the tests code.
-   More common classes were moved from the `spring-rabbit` module to `spring-amqp` for additional consumption from the new `spring-amqp-client`.
-   All the dependencies upgaded to their latest major/minor versions.

See the [Release Notes](https://github.com/spring-projects/spring-amqp/releases/tag/v4.1.0-M2) and [What's New](https://docs.spring.io/spring-amqp/reference/4.1/whats-new.html) for more information.

Don't hesitate to rich us out with any feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub Issues](https://github.com/spring-projects/spring-amqp/issues) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)
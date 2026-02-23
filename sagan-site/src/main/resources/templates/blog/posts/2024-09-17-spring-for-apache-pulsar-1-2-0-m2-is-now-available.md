---
title: Spring for Apache Pulsar 1.2.0-M2 is now available
source: https://spring.io/blog/2024/09/17/spring-for-apache-pulsar-1-2-0-m2-is-now-available
scraped: 2026-02-23T08:17:15.927Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Chris Bono |  September 17, 2024 | 0 Comments
---

# Spring for Apache Pulsar 1.2.0-M2 is now available

_Releases | Chris Bono |  September 17, 2024 | 0 Comments_

On behalf of the team and everyone who has contributed, I’m happy to announce that Spring for Apache Pulsar `1.2.0-M2` has been released and is now available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

The release will be included in the upcoming Spring Boot [3.4.0-M3](https://github.com/spring-projects/spring-boot/milestones/3.4.0-M3) release.

This release includes numerous enhancements, documentation improvements, bug fixes, and dependency upgrades.

Notable new features include:

-   **Message Container Startup Policy** - you can now configure the message listener container startup failure policy to `stop`, `continue`, or `retry` ([more details](https://docs.spring.io/spring-pulsar/docs/1.2.0-M2/reference/whats-new.html#_message_container_startup_policy))
    
-   **Message Container Factory Customizers (Spring Boot)** - the upcoming Spring Boot `3.4.0-M3` has introduced a generic message container factory customizer (`PulsarContainerFactoryCustomizer<T extends PulsarContainerFactory<?, ?>>`) that can be used to further configure one or more of the auto-configured message listener container factories that back the `@PulsarListener`, `@PulsarReader`, and `@ReactivePulsarListener` ([more details](https://docs.spring.io/spring-pulsar/docs/1.2.0-M2/reference/whats-new.html#_message_container_startup_policy))
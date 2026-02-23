---
title: Spring Integration 6.4.0-M1 Available
source: https://spring.io/blog/2024/07/17/spring-integration-6-4-0-m1-available
scraped: 2026-02-23T08:26:47.178Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 17, 2024 | 0 Comments
---

# Spring Integration 6.4.0-M1 Available

_Releases | Artem Bilan |  July 17, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the first Milestone for Spring Integration `6.4.0` generation.

In addition the regular bug fixes and dependency upgrades were release as Spring Integration `6.3.2` and `6.2.7`.

Here are some notable improvements and new features in Spring Integration 6.4:

-   The distributed `LockRegistry` implementations now throw a `ConcurrentModificationException` on `unlock()` operation if ownership of the lock is lost in DB.
-   Since `LobHandler` API has been deprecated in Spring Framework `6.2` for removal, we also deprecated respective API in JDBC message store components in favor of internal byte array handling by the JDBC drivers.
-   The `ZeroMqMessageHandler` can now also bind port.
-   The subscription identifier has been improved for MQTT v5 channel adapters.
-   The Reactor context is now propagate to the reply `CompletableFuture`.
-   The `ClientSession` is now closed by the `SftpSession`.

See [What's New in 6.4](https://docs.spring.io/spring-integration/reference/6.4/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.3-to-6.4-Migration-Guide) contains some breaking changes in this new version.

We are looking for any feedback on `6.4` generation to further improve the Framework and your experience in upcoming milestones.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
---
title: Spring Integration 7.1.0-M1 Available
source: https://spring.io/blog/2026/02/19/spring-integration-7-1-0-m2-released
scraped: 2026-02-23T12:33:46.691Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 19, 2026 | 0 Comments
---

# Spring Integration 7.1.0-M1 Available

_Releases | Artem Bilan |  February 19, 2026 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce Spring Integration `7.1.0-M2` version.

In addition, the `7.0.3` and `6.5.7` versions with bug fixes and dependency upgrades have been released.

Some notable changes in `7.1.0-M2`:

-   The new `spring-integration-cloudevents` module has been improved with a `FromCloudEventTransformer` and `CloudEvents` DSL API;
-   The new `spring-integration-grpc` module has been improved for Java DSL API;
-   The `TestUtils.getPropertyValue()` is now generic arguement based for easier adoption in the tests code;
-   Resolved more deprecations from Spring AMQP in `spring-integration-amqp` module and made bytecode compatible with previous version;
-   The `RedisMessageStore` now supports `GETDEL` command from Redis 6.2.+.

See [What's New in 7.1](https://docs.spring.io/spring-integration/reference/7.1/whats-new.html) for more details. And also don't miss a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-7.0-to-7.1-Migration-Guide) for any observed breaking changes in this version.

We have a lot of planning yet for upcoming milestones, however, don't hesitate to rich us out with any feedback or ideas!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
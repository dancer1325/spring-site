---
title: Spring Integration 6.5 Milestone 2 Available
source: https://spring.io/blog/2025/02/19/spring-integration-6-5-M2-released
scraped: 2026-02-23T07:52:26.280Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 19, 2025 | 0 Comments
---

# Spring Integration 6.5 Milestone 2 Available

_Releases | Artem Bilan |  February 19, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the second Milestone of Spring Integration `6.5.0` generation.

In addition, the `6.3.8` and `6.4.2` versions with bug fixes and dependency upgrades have been released.

Some notable changes in `6.5.0-M2` are:

-   The `StreamTransformer` now removes an `IntegrationMessageHeaderAccessor.CLOSEABLE_RESOURCE` header after closing it;
-   The inbound channel adapters for Apache Kafka now generate `ID` & `TIMESTAMP` headers by default to be consistent with the rest of similar channel adapters in Spring Integration;
-   A custom `TaskScheduler` is now propagated via `DelayerEndpointSpec`;
-   The `SftpSession` now follows symlinks for its `list` operations via `STAT` command;
-   The latest milestones for Micrometer, Spring Data and Spring Security dependencies.

See [What's New in 6.5](https://docs.spring.io/spring-integration/reference/6.5/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.4-to-6.5-Migration-Guide) contains some breaking changes in this new version.

We also will start looking into Spring Integration `7.0` based on Spring Framework `7.0`. Don't hesitate to reach us out in GitHub issues for the the project with any feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
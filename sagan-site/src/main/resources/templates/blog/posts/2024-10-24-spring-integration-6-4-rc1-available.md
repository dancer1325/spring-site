---
title: Spring Integration 6.4 RC1 Available
source: https://spring.io/blog/2024/10/24/spring-integration-6-4-rc1-available
scraped: 2026-02-23T08:10:32.816Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 24, 2024 | 0 Comments
---

# Spring Integration 6.4 RC1 Available

_Releases | Artem Bilan |  October 24, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the first Release Candidate for Spring Integration `6.4.0` generation.

In addition the regular bug fixes and dependency upgrades were release as Spring Integration `6.3.5` and `6.2.10`.

Here are some notable improvements and new features in Spring Integration 6.4 since previously announced [Milestone 3](https://spring.io/blog/2024/09/18/spring-integration-6-4-0-m3-available):

-   The Python scripting support has been migrate to GraalVM Polyglot. Now Python 3 language version can be used in your scripts. Plus all the benefits from third-party libraries;
-   The `RedisLockRegistry` can now be configured with a `TaskScheduler` for automatic locks renewal in the store;
-   The `SourcePollingChannelAdapterSpec` now can be configured with a custom `TaskScheduler`, e.g. for some `TaskDecorator` use-case;
-   The `@SpringIntegrationTest` can now be used for test classes hierarchy, including `@Nested` configuration;
-   Plus a lot of dependency upgrades to their latest versions.

See [What's New in 6.4](https://docs.spring.io/spring-integration/reference/6.4/whats-new.html) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.3-to-6.4-Migration-Guide) contains some breaking changes in this new version.

We are looking for any feedback on `6.4` generation to further improve the Framework and your experience in upcoming GA release in November.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
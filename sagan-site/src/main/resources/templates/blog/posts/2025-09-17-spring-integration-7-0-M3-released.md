---
title: Spring Integration 7.0 Milestone 3 Available
source: https://spring.io/blog/2025/09/17/spring-integration-7-0-M3-released
scraped: 2026-02-23T07:29:52.031Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 17, 2025 | 0 Comments
---

# Spring Integration 7.0 Milestone 3 Available

_Releases | Artem Bilan |  September 17, 2025 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce the Third Milestone of Spring Integration `7.0.0` generation. For convenience, the `7.0.0-M3` artifacts are also available in Maven Central.

In addition, the `6.5.2` and `6.4.7` versions with bug fixes and dependency upgrades have been released.

Some notable changes in `7.0.0-M3` are:

-   JUnit 6 upgrade;
-   The Nullability via JSpecify and Nullaway is applied to every single package in the project;
-   The `AbstractPersistentAcceptOnceFileListFilter` implementations now deal with full remote file to avoid conflict with the same file name in different directories;
-   The `AbstractInboundFileSynchronizer` now caches the `Session.list()` result (after filtering) between polls when `maxFetchSize` is limited;
-   The Spring Retry dependnecy has been removed and its API has been replaced with similar one in the [Spring Framework Core](https://spring.io/blog/2025/09/09/core-spring-resilience-features);
-   All the available major/minor dependency upgrades.

See [What's New in 7.0](https://docs.spring.io/spring-integration/reference/7.0/whats-new.html#whats-new-part) for more details.

Also a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.x-to-7.0-Migration-Guide) contains some breaking changes in this new version.

We are heading now to code freeze in Release Candidate 1 in October. Don't hesitate to reach us out in GitHub issues for the project with any feedback!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
---
title: Spring Framework 6.1 M2 released
source: https://spring.io/blog/2023/07/13/spring-framework-6-1-m2-released
scraped: 2026-02-23T09:36:17.669Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  July 13, 2023 | 0 Comments
---

# Spring Framework 6.1 M2 released

_Releases | Brian Clozel |  July 13, 2023 | 0 Comments_

On behalf of the Spring Framework framework team, it is my pleasure to announce that the second Spring Framework 6.1 milestone release is available from [repo.spring.io/milestone](htts://repo.spring.io/milestone) now. This new version builds on the [main 6.1 themes introduced in the first milestone](https://spring.io/blog/2023/06/15/spring-framework-6-1-m1-released) and adds new ones: `@Scheduled` improvements and the introduction of `RestClient`.

## [](#main-themes-status-update)Main themes status update

The Data Binding and validation worked has made progress and we have now completed the ["Built-in Web Support for Method Bean Validation" umbrella issue](https://github.com/spring-projects/spring-framework/issues/30645) and [documented the feature accordingly](https://docs.spring.io/spring-framework/reference/6.1/web/webmvc/mvc-controller/ann-validation.html).

Thanks to the Virtual Threads theme, [blocking execution of WebFlux Controllers can now be scheduled on a `VirtualThreadTaskExecutor`](https://github.com/spring-projects/spring-framework/issues/30678), if available.

The Checkpoint/Restore feature is still ongoing, with [developer experience updates](https://github.com/spring-projects/spring-framework/issues/30876) and [lifecycle improvements of `ThreadPoolTaskExecutor` and `ThreadPoolTaskScheduler`](https://github.com/spring-projects/spring-framework/issues/30831)

## [](#new-61-themes)New 6.1 themes

This version introduces a new and exciting `RestClient` type. This is an important feature that deserves its own blog post: [check out Arjen's take on the new `RestClient`](https://spring.io/blog/2023/07/13/new-in-spring-6-1-restclient).

We are improving the `@Scheduled` support with two new features. You can now [use multiple `TaskSchedulers` thanks to a new `scheduler` attribute on the `@Scheduled` annotation](https://github.com/spring-projects/spring-framework/issues/20818). The Observability enthusiasts also requested metrics and traces support for `@Scheduled` methods - [it's now available with a direct Micrometer instrumentation](https://github.com/spring-projects/spring-framework/issues/29883#issuecomment-1591896876).

## [](#whats-next)What's next

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x) for details about the specific features shipped so far.

The first Spring Boot 3.2 milestone [will be released next week](https://calendar.spring.io/). Perfect timing for trying out the new features and preparing for future upgrades! Let us know how it goes, you have a chance to help us shape this 6.1 generation for its general availability in November.
---
title: Spring Framework 7.0.3 Available Now
source: https://spring.io/blog/2026/01/15/spring-framework-7-0-3-available-now
scraped: 2026-02-22T22:02:17.710Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  January 15, 2026 | 0 Comments
---

# Spring Framework 7.0.3 Available Now

_Releases | Brian Clozel |  January 15, 2026 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring Framework `7.0.3` is available now.

Spring Framework `7.0.3` ships with [65 fixes and documentation improvements](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.3). This version will be shipped next week with Spring Boot `4.0.2`.

This release brings a noteworthy change - Spring Framework will now lazily pause an unused test `ApplicationContext` the 1st time a different context is used. You can override this behavior by setting the `spring.test.context.cache.pause` property to `ALWAYS`, or disable pausing altogether by setting that to `NEVER`. Check out the [release notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#pausing-of-test-application-contexts) and [reference documentation](https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/ctx-management/context-pausing.html) to learn more about test context pausing.

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
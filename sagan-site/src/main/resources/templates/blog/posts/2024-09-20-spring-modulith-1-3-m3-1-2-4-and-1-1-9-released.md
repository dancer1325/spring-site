---
title: Spring Modulith 1.3 M3, 1.2.4, and 1.1.9 released
source: https://spring.io/blog/2024/09/20/spring-modulith-1-3-m3-1-2-4-and-1-1-9-released
scraped: 2026-02-23T08:15:55.494Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  September 20, 2024 | 1 Comment
---

# Spring Modulith 1.3 M3, 1.2.4, and 1.1.9 released

_Releases | Oliver Drotbohm |  September 20, 2024 | 1 Comment_

I am happy to announce the availability of Spring Modulith 1.3 M3, 1.2.4, and 1.1.9. While the latter two ship the usual bugfixes and service release bugfix upgrades, I am particularly delighted about the milestone releases as it contains two major community contributions. Here are the most significant new features:

-   Support for change-aware test execution (contributed by [@lukasdo](https://github.com/lukasdo) and [@davidbilge](https://github.com/davidbilge)) which [optimizes test runs](https://docs.spring.io/spring-modulith/reference/testing.html#change-aware-test-execution) along the changes made to the application by skipping tests not affected by those.
-   A new [deleting event publication completion mode](https://docs.spring.io/spring-modulith/reference/events.html#publication-registry.completion) to — as the name suggests — immediately delete completed event publications.
-   Support for [contributing application modules from other packages](https://docs.spring.io/spring-modulith/reference/fundamentals.html#contributing-application-modules) and external JARs.
-   Support for Microsoft SQL Server in JDBC-based event publication registry (contributed by [@oyjoh](https://github.com/oyjoh), [GH-804](https://github.com/spring-projects/spring-modulith/issues/804)).
-   Deprecate `spring.modulith.republish-outstanding-events-on-restart` in favor of the variant residing in `spring.modulith.test.…` ([GH-823](https://github.com/spring-projects/spring-modulith/issues/823)).

There is still a bit of time for feedback until we wrap up the iteration with the first release candidate at the end of October.
---
title: Spring Modulith 1.3 M2, 1.2.3, and 1.1.8 released
source: https://spring.io/blog/2024/08/23/spring-modulith-1-3-m2-1-2-3-and-1-1-8-released
scraped: 2026-02-23T08:19:56.596Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 23, 2024 | 0 Comments
---

# Spring Modulith 1.3 M2, 1.2.3, and 1.1.8 released

_Releases | Oliver Drotbohm |  August 23, 2024 | 0 Comments_

It is my pleasure to announce the availability of Spring Modulith 1.3 M2, 1.2.3, and 1.1.8. They all contain bug fixes and upgrades to the latest versions of dependencies. Here are the most important features of the releases:

-   Support for nested application modules (1.3 M2 only). See the [reference documentation](https://docs.spring.io/spring-modulith/reference/1.3/fundamentals.html#modules.nested) for details. – [GH-578](https://github.com/spring-projects/spring-modulith/issues/578)
-   Event publication completion now issues a by-id query to significantly improve performance and reduce load on the database (1.3 M2 only). – [GH-258](https://github.com/spring-projects/spring-modulith/issues/258)
-   Minor performance improvements for event completion (all releases). – [GH-749](https://github.com/spring-projects/spring-modulith/issues/749)

For details, please check out the change logs for [1.3 M2](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.0-M2), [1.2.3](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.3), and [1.1.8](https://github.com/spring-projects/spring-modulith/releases/tag/1.1.8). We appreciate any kind of feedback, in particular regarding the milestone release, in the GitHub [discussions](https://github.com/spring-projects/spring-modulith/discussions).
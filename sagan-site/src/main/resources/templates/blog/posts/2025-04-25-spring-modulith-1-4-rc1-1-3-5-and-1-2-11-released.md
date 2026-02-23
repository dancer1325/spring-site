---
title: Spring Modulith 1.4 RC1, 1.3.5, and 1.2.11 released
source: https://spring.io/blog/2025/04/25/spring-modulith-1-4-rc1-1-3-5-and-1-2-11-released
scraped: 2026-02-23T07:44:19.610Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  April 25, 2025 | 0 Comments
---

# Spring Modulith 1.4 RC1, 1.3.5, and 1.2.11 released

_Releases | Oliver Drotbohm |  April 25, 2025 | 0 Comments_

I am happy to announce the availability of Spring Modulith 1.4 RC1, 1.3.5, and 1.2.11. While the latter contain a few bug fixes and the usual dependency upgrades to the latest Spring Boot releases, the milestone also includes a few new features:

-   Performance improvements both in the core event publication registry and the observability instrumentation. ([GH-1146](https://github.com/spring-projects/spring-modulith/issues/1146), [GH-1149](https://github.com/spring-projects/spring-modulith/issues/1149))
-   The Scenario API only considers non-empty collections as successful state transitions by default ([GH-1131](https://github.com/spring-projects/spring-modulith/issues/1131))
-   Refinements in the core `ApplicationModule(s)` abstractions and documentation generation ([GH-1150](https://github.com/spring-projects/spring-modulith/issues/1150), [GH-1152](https://github.com/spring-projects/spring-modulith/issues/1152))
-   Minor (internal) cleanups ([GH-1153](https://github.com/spring-projects/spring-modulith/issues/1153), [GH-1122](https://github.com/spring-projects/spring-modulith/issues/1122))

The bugfix releases can be found on Maven Central, the milestone one is available from [http://repo.spring.io/milestone](http://repo.spring.io/milestone). Find more information about the releases in the official change logs for [1.2.11](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.11), [1.3.5](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.5), and [1.4 RC1](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.0-RC1).
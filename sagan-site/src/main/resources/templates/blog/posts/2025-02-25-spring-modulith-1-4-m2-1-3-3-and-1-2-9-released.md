---
title: Spring Modulith 1.4 M2, 1.3.3, and 1.2.9 released
source: https://spring.io/blog/2025/02/25/spring-modulith-1-4-m2-1-3-3-and-1-2-9-released
scraped: 2026-02-23T07:51:39.256Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 25, 2025 | 0 Comments
---

# Spring Modulith 1.4 M2, 1.3.3, and 1.2.9 released

_Releases | Oliver Drotbohm |  February 25, 2025 | 0 Comments_

I am happy to announce the availability of Spring Modulith 1.4 M2, 1.3.3, and 1.2.9. While the latter contain a few bug fixes and the usual dependency upgrades to the latest Spring Boot releases, the milestone release ships a couple of important new features.

-   The observability module now automatically creates counters for application events published by modules. A new `ModulithEventMetrics` API has been introduced and can be used through `ModulithEventMetricsCustomizer` beans registered in the `ApplicationContext` ([GH-1068](https://github.com/spring-projects/spring-modulith/issues/1068)).
-   The runtime support has been revamped to avoid the dependency on an external library to topologically sort application modules, so that they can be traversed in dependency order ([GH-1060](https://github.com/spring-projects/spring-modulith/issues/1060)). This allows assuming a stable module order in the application metadata file that – previously only created in AOT mode – is now also written when generating documentation ([GH-1063](https://github.com/spring-projects/spring-modulith/issues/1063)). That in turn allows us to avoid the full bootstrap of an `ApplicationModules` instance at runtime, for example, to execute `ApplicationModuleListener` beans ([GH-1062](https://github.com/spring-projects/spring-modulith/issues/1062), [GH-1065](https://github.com/spring-projects/spring-modulith/issues/1065)).
-   The event publication infrastructure has been revamped to now also support structurally identical events ([GH-1056](https://github.com/spring-projects/spring-modulith/issues/1056)).

The bugfix releases can be found on Maven Central, the milestone one is available from [http://repo.spring.io/milestone](http://repo.spring.io/milestone). Find more information about the releases in the official change logs for [1.2.9](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.9), [1.3.3](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.3), and [1.4 M2](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.0-M2).
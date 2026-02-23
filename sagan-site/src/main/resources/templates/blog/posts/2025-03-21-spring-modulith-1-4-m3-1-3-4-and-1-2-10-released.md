---
title: Spring Modulith 1.4 M3, 1.3.4, and 1.2.10 released
source: https://spring.io/blog/2025/03/21/spring-modulith-1-4-m3-1-3-4-and-1-2-10-released
scraped: 2026-02-23T07:48:20.578Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 21, 2025 | 0 Comments
---

# Spring Modulith 1.4 M3, 1.3.4, and 1.2.10 released

_Releases | Oliver Drotbohm |  March 21, 2025 | 0 Comments_

I am happy to announce the availability of Spring Modulith 1.4 M3, 1.3.4, and 1.2.10. While the latter contain a few bug fixes and the usual dependency upgrades to the latest Spring Boot releases, the milestone also includes a few new features:

-   Integration tests using `@ApplicationModuleTest` can now consume bean instances of classes declared in test sources. ([GH-202](https://github.com/spring-projects/spring-modulith/issues/202))
-   The global `PublishedEvents` instance registered in an `ApplicationContext` will now be an `AssertablePublishedEvents` if AssertJ is on the classpath. ([GH-1110](https://github.com/spring-projects/spring-modulith/issues/1110))
-   We fixed a performance regression in `JavaPackage` the erroneously repeatedly recomputed all sub packages. (also fixed in 1.3.4 and 1.2.10, [GH-1098](https://github.com/spring-projects/spring-modulith/issues/1098))

The bugfix releases can be found on Maven Central, the milestone one is available from [http://repo.spring.io/milestone](http://repo.spring.io/milestone). Find more information about the releases in the official change logs for [1.2.10](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.10), [1.3.4](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.4), and [1.4 M3](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.0-M3).
---
title: Spring Modulith 1.4.1 and 1.3.7 released
source: https://spring.io/blog/2025/06/23/spring-modulith-1-4-1-and-1-3-7-released
scraped: 2026-02-23T07:38:28.982Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  June 23, 2025 | 0 Comments
---

# Spring Modulith 1.4.1 and 1.3.7 released

_Releases | Oliver Drotbohm |  June 23, 2025 | 0 Comments_

I am pleased to announce the availability of Spring Modulith 1.4.1 and 1.3.7. The releases contain the usual dependency upgrades to the latest Spring Boot and Framework versions. 1.4.1 additionally ships the following bug fixes and improvements:

## [](#improvements)Improvements

-   Reflection metadata missing in JSONPath lookup for application module identifiers on GraalVM [#1250](https://github.com/spring-projects/spring-modulith/issues/1250)
-   Prevent application module misconfiguration due to invalid additional packages [#1247](https://github.com/spring-projects/spring-modulith/issues/1247)

## [](#bugs)Bugs

-   Incompatible path handling for KAPT with Maven [#1255](https://github.com/spring-projects/spring-modulith/issues/1255)
-   Fix automatic module name of Moments artifact [#1220](https://github.com/spring-projects/spring-modulith/issues/1220)

Find more details in the full changelogs for [1.4.1](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.1) and [1.3.7](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.7).
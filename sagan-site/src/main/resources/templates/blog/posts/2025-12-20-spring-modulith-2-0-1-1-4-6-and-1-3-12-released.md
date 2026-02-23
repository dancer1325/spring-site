---
title: Spring Modulith 2.0.1, 1.4.6, and 1.3.12 released
source: https://spring.io/blog/2025/12/20/spring-modulith-2-0-1-1-4-6-and-1-3-12-released
scraped: 2026-02-22T22:04:18.366Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  December 20, 2025 | 0 Comments
---

# Spring Modulith 2.0.1, 1.4.6, and 1.3.12 released

_Releases | Oliver Drotbohm |  December 20, 2025 | 0 Comments_

Spring Modulith Christmas came early this year and I am happy to announce the release of Spring Modulith 2.0.1, 1.4.6, and 1.3.12. The releases contain the usual platform upgrades around Spring Boot and Framework. On top of that, we ship the following improvements and bug fixes:

-   Allow resetting the shift in `TimeMachine` (2.0.1 – [#1491](https://github.com/spring-projects/spring-modulith/issues/1491))
-   `@ApplicationModuleTest` does not bootstrap beans from test configuration (2.0.1 – [#1495](https://github.com/spring-projects/spring-modulith/issues/1495), 1.4.6 – [#1494](https://github.com/spring-projects/spring-modulith/issues/1494)),
-   CGLib proxy created for `JdbcEventPublicationRepositoryV2`causing issues in native image (2.0.1 – [#1493](https://github.com/spring-projects/spring-modulith/issues/1493))
-   `ClassNotFoundException` for `package-info` from `JavaPackage` during runtime bootstrap (2.0.1 – [#1487](https://github.com/spring-projects/spring-modulith/issues/1487))

Note that 1.3.12 marks the last release of the 1.3 generation as the underlying Boot generation [went out of open-source support](https://spring.io/blog/2025/12/18/spring-boot-3-4-13-available-now) with its latest release.

Find more details about the releases in the full changelog for [2.0.1](https://github.com/spring-projects/spring-modulith/releases/tag/2.0.1), [1.4.6](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.6) and [1.3.12](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.12) generations.
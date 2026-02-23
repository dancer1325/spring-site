---
title: Spring Modulith 1.0 RC2 released
source: https://spring.io/blog/2023/08/16/spring-modulith-1-0-rc2-released
scraped: 2026-02-23T09:29:27.707Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 16, 2023 | 0 Comments
---

# Spring Modulith 1.0 RC2 released

_Releases | Oliver Drotbohm |  August 16, 2023 | 0 Comments_

In preparation for the GA release next Monday, we have just shipped 1.0 RC2 of Spring Modulith. We took the chance to fold in some feedback regarding some tiny inconsistencies that would've been inconvenient to fix post 1.0 GA.

-   The Event Publication Registry now consistently uses `event_publication` as table name for the relational stores and as collection name for MongoDB [GH-265](https://github.com/spring-projects/spring-modulith/issues/265), [GH-266](https://github.com/spring-projects/spring-modulith/issues/266)
-   Improved JPA event publication completion [GH-261](https://github.com/spring-projects/spring-modulith/issues/261)
-   Actuator exposing the module structure renamed to `modulith` [GH-268](https://github.com/spring-projects/spring-modulith/issues/268)
-   Explicit declaration of `@ApplicationModule(allowedDependencies = {})` now does not allow any outgoing dependencies [GH-267](https://github.com/spring-projects/spring-modulith/issues/267)

Find the full change log [here](https://github.com/spring-projects/spring-modulith/releases/tag/1.0.0-RC2), the slightly updated reference documentation [here](https://docs.spring.io/spring-modulith/docs/1.0.0-RC2/reference/html/).
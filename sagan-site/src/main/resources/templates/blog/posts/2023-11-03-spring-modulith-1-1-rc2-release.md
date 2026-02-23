---
title: Spring Modulith 1.1 RC2 released
source: https://spring.io/blog/2023/11/03/spring-modulith-1-1-rc2-release
scraped: 2026-02-23T09:12:30.617Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 03, 2023 | 0 Comments
---

# Spring Modulith 1.1 RC2 released

_Releases | Oliver Drotbohm |  November 03, 2023 | 0 Comments_

I am happy to announce the availability of Spring Modulith 1.1 RC2. We took the chance to incorporate feedback from the community to tweak a few internals of features newly introduced in the 1.1 generation. We have also managed to sneak a few new ones into the release:

-   Support for AWS SNS / SQS in event externalization (contributed by [Maciej Walkowiak](https://github.com/maciejwalkowiak)) [GH-344](https://github.com/spring-projects/spring-modulith/issues/344)
-   Allowing to define a listener identifier via `@ApplicationModuleListener` [GH-346](https://github.com/spring-projects/spring-modulith/issues/346)
-   Re-instantiated, general compatibility with Spring Boot 3.1 and Framework 6.0 [GH-357](https://github.com/spring-projects/spring-modulith/issues/357)
-   Upgrade to Spring Boot 3.2 RC2 [GH-354](https://github.com/spring-projects/spring-modulith/issues/354)

Find the full release [change log](https://github.com/spring-projects/spring-modulith/releases/tag/1.1.0-RC2) on GitHub. We are looking forward to your feedback and the 1.1 GA release currently scheduled for end of November.
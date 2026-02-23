---
title: Spring Framework 6.1 M5 released
source: https://spring.io/blog/2023/09/14/spring-framework-6-1-m5-released
scraped: 2026-02-23T09:23:35.075Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  September 14, 2023 | 0 Comments
---

# Spring Framework 6.1 M5 released

_Releases | Brian Clozel |  September 14, 2023 | 0 Comments_

On behalf of the Spring Framework team, it is my pleasure to announce that the fifth and final Spring Framework 6.1 milestone release is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now. We initially planned for this release to be the first release candidate, but decided to release another milestone and shorten the release candidate phase.

Spring Framework 6.1.0-M5 ships [99 fixes and improvements](https://github.com/spring-projects/spring-framework/milestone/333?closed=1).

## [](#new-features)New Features

This new milestone ships new interesting features, such as:

-   Support for one-time `@Scheduled` tasks
-   The new `RestClient` has now [its own section in the reference documentation](https://docs.spring.io/spring-framework/reference/6.1/integration/rest-clients.html#rest-restclient) and is instrumented for Observability
-   Jetty 12 upgrade
-   Context Propagation support for `@Async` and `@Scheduled` invocations
-   Declarative `ContextCustomizer` support with `@ContextCustomizerFactories` in Spring Test

This also ships improvements for all existing applications:

-   Performance improvements in Spring WebFlux
-   Better error handling in Servlet applications, attempting to reset the response content if possible
-   Many improvements for the Kotlin Coroutine support in web applications
-   Further improvements in the lifecycle of HTTP resources for CRaC support
-   Hibernate footprint optimizations for GraalVM native applications

## [](#whats-next)What's next

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x) for details about the specific features shipped so far.

The third Spring Boot 3.2 milestone [will be released next week](https://calendar.spring.io/). This is a good opportunity to test existing applications with it and report any wrinkle in the upgrade process.
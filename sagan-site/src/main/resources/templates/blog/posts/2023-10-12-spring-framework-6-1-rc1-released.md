---
title: Spring Framework 6.1 RC1 released
source: https://spring.io/blog/2023/10/12/spring-framework-6-1-rc1-released
scraped: 2026-02-23T09:18:08.180Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  October 12, 2023 | 0 Comments
---

# Spring Framework 6.1 RC1 released

_Releases | Brian Clozel |  October 12, 2023 | 0 Comments_

On behalf of the Spring Framework team, it is my pleasure to announce that the first Spring Framework 6.1 release candidate is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now.

Spring Framework 6.1.0-RC1 ships [75 fixes and improvements](https://github.com/spring-projects/spring-framework/releases/tag/v6.1.0-RC1).

## [](#new-features)New Features

This first release candidate ships a few new features:

-   Spring Framework 6.1 requires now a Jackson 2.14 baseline and supports the [new `DatatypeFeature`](https://github.com/FasterXML/jackson-databind/wiki/DatatypeFeatures)
-   We have made further AOT improvements, reduced the runtime reflection and prepared Framework for upcoming reachability changes in GraalVM
-   You can now use an `OutputStream` as a source of data in reactive web APIs, thanks to a new `BodyInserter` method variant
-   Functional web frameworks now allow headers manipulation when serving static resources; this makes it easier to write HTTP caching response headers.

We will be now focusing on stabilizing APIs and behavior before the GA release in November.

## [](#whats-next)What's next

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x) for details about the specific features shipped so far.

The first Spring Boot 3.2 release candidate [will be released next week](https://calendar.spring.io/).
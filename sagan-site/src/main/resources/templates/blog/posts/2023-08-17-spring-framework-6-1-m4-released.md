---
title: Spring Framework 6.1 M4 released
source: https://spring.io/blog/2023/08/17/spring-framework-6-1-m4-released
scraped: 2026-02-23T09:29:18.405Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  August 17, 2023 | 0 Comments
---

# Spring Framework 6.1 M4 released

_Releases | Brian Clozel |  August 17, 2023 | 0 Comments_

On behalf of the Spring Framework framework team, it is my pleasure to announce that the fourth Spring Framework 6.1 milestone release is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now. This is the final milestone release for this new generation and we are scheduling the first release candidate in a month.

Spring Framework 6.1.0-M4 ships [62 fixes and improvements](https://github.com/spring-projects/spring-framework/milestone/330?closed=1).

## [](#new-features)New Features

This new milestone ships new interesting features, such as:

-   Introduce `JdbcClient` (a JDBC variant of the R2DBC `DatabaseClient`)
-   Observability support for JMS (`@JmsListener` and `JmsTemplate`)
-   `@HttpExchange` annotations are now supported for server side handling (mapping requests to controllers methods)
-   `CompletableFuture` support for `@Cacheable` methods
-   New improvements on the web binding and validation theme

This also ships improvements for all existing applications:

-   Improved support for `DatabaseClient`
-   We tightened a bit the `@Bean` configuration model to better prevent invalid configurations
-   Better `@TestPropertySource` support (resource patterns, custom file extensions, text blocks)

## [](#whats-next)What's next

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x) for details about the specific features shipped so far.

The second Spring Boot 3.2 milestone [will be released next week](https://calendar.spring.io/) - this is the last stop before the release candidate phase, where we will stabilize new features. This is the right time to send your feedback about those new features!
---
title: Spring Modulith 1.3 RC1, 1.2.5, and 1.1.10 released
source: https://spring.io/blog/2024/10/28/spring-modulith-1-3-rc1-1-2-5-and-1-1-10-released
scraped: 2026-02-23T08:09:50.118Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  October 28, 2024 | 0 Comments
---

# Spring Modulith 1.3 RC1, 1.2.5, and 1.1.10 released

_Releases | Oliver Drotbohm |  October 28, 2024 | 0 Comments_

On behalf of the community, I am delighted to announce the avability of Spring Modulith 1.3 RC1, 1.2.5, and 1.1.10. While the service releases contain a few bugfixes and the usual dependency updates, the release candidate is packed with features and improvements such as (full change log [here](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.0-RC1)):

-   An [archiving event publication completion mode](https://docs.spring.io/spring-modulith/reference/1.3/events.html#publication-registry.completion) (thanks to [Cora Iberkleid](https://github.com/ciberkleid) for the contribution).
-   Support for [MariaDB](https://github.com/spring-projects/spring-modulith/issues/836) (thanks, [@Fezlight](https://github.com/Fezlight)) and [Oracle DB](https://github.com/spring-projects/spring-modulith/issues/866) (thanks to [@DSXVII](https://github.com/DSXVII)) in the JDBC-based event publication registry.
-   Support to externalize events into a [Spring (Integration) `MessageChannel`](https://github.com/spring-projects/spring-modulith/pull/869) via the new `spring-modulith-events-messaging` artifact (thanks to [Josh Long](https://github.com/joshlong) for the contribution).
-   Event externalization now allows to [add headers to the messages](https://github.com/spring-projects/spring-modulith/issues/855) sent out and uses the Spring Message abstraction for broker interaction where feasible.
-   Support for [SpEL expressions in `@Externalized`](https://github.com/spring-projects/spring-modulith/issues/881).
-   [Deprecate event externalization for Amazon SQS and SNS](https://github.com/spring-projects/spring-modulith/issues/671) in favor of the implementation in Spring Cloud AWS (thanks to [Marcin Slowiak](https://github.com/mslowiak)).
-   Support for [custom application module identifiers](https://github.com/spring-projects/spring-modulith/issues/846) via `@ApplicationModule` / `@Module`.
-   [Automatic technical architecture validation for jMolecules](https://github.com/spring-projects/spring-modulith/issues/862) (Hexagonal, Onion and Layered Architecture).
-   Application Module Canvases generated now [contain Javadoc](https://github.com/spring-projects/spring-modulith/issues/854) for listed types and event listener methods.

The release candidate is the perfect opportunity to give the new features a try or even just validate that you can safely upgrade from the 1.2 generation. We are shooting for a GA release right after Spring Boot 3.4 end of November.
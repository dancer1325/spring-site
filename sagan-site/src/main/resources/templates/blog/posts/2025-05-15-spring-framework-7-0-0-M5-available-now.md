---
title: Spring Framework 7.0.0-M5 available now
source: https://spring.io/blog/2025/05/15/spring-framework-7-0-0-M5-available-now
scraped: 2026-02-23T07:39:57.320Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  May 15, 2025 | 0 Comments
---

# Spring Framework 7.0.0-M5 available now

_Releases | Brian Clozel |  May 15, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce a new milestone for the next Spring Framework generation. The fifth milestone continues delivering new features and refinements on top of [7.0.0-M1](https://spring.io/blog/2025/01/23/spring-framework-7-0-0-M1-available-now), [7.0.0-M2](https://spring.io/blog/2025/02/13/spring-framework-7-0-0-M2-available-now), [7.0.0-M3](https://spring.io/blog/2025/03/13/spring-framework-7-0-0-M3-available-now) and [7.0.0-M4](https://spring.io/blog/2025/04/17/spring-framework-7-0-0-M4-available-now).

## [](#jackson-30-support)Jackson 3.0 support

As of [#33798](https://github.com/spring-projects/spring-framework/issues/33798), we default to supporting Jackson 3.x in our entire stack, falling back to Jackson 2.x. Support for the Jackson 2.x generation has been deprecated in Spring Framework, and our current plan is to disable its auto-detection in 7.1, and remove its support entirely in 7.2.

Jackson 3.x uses a new `tools.jackson` package, which differs from the usual `com.fasterxml.jackson`. Classes from the "jackson-annotation" artifact (like `@JsonView`, `@JsonTypeInfo`) remain in the `com.fasterxml.jackson` package for easier upgrade.

There is no Jackson 3.x equivalent for `Jackson2ObjectMapperBuilder`, we now recommend using Jackson's `JsonMapper.builder()`, `CBORMapper.builder()` and others as replacements.

We will update the relevant section of the [Spring Framework 7.0 Upgrade guide](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#jackson-3x-support).

## [](#api-versioning-update)API versioning update

Our new API versioning feature got new updates, with now the ability to validate supported API versions only against explicitly configured ones, or setting the default version in `RestClient` and `WebClient`.

We added [new sections on API versioning](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc/mvc-config/api-version.html#page-title) in the official reference documentation.

## [](#and-much-more)And much more!

As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M5) for more details and [read the global 7.0 release notes for upgrade concerns](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes).

7.0.0-M5 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
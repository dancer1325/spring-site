---
title: Spring Framework 7.0.0-M6 available now
source: https://spring.io/blog/2025/06/12/spring-framework-7-0-0-M6-available-now
scraped: 2026-02-23T07:38:19.877Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  June 12, 2025 | 1 Comment
---

# Spring Framework 7.0.0-M6 available now

_Releases | Brian Clozel |  June 12, 2025 | 1 Comment_

On behalf of the team and everyone who has contributed, I am pleased to announce a new milestone for the next Spring Framework generation. The M6 continues delivering new features and refinements on top of [7.0.0-M1](https://spring.io/blog/2025/01/23/spring-framework-7-0-0-M1-available-now), [7.0.0-M2](https://spring.io/blog/2025/02/13/spring-framework-7-0-0-M2-available-now), [7.0.0-M3](https://spring.io/blog/2025/03/13/spring-framework-7-0-0-M3-available-now), [7.0.0-M4](https://spring.io/blog/2025/04/17/spring-framework-7-0-0-M4-available-now) and [7.0.0-M5](https://spring.io/blog/2025/05/15/spring-framework-7-0-0-M5-available-now).

We've made lots of refinements on features delivered in previous milestones, but we also have a new feature that we would like to share.

## [](#retry-support-in-spring-core)Retry support in Spring Core

We have been working on the [Spring Retry project](https://github.com/spring-projects/spring-retry) for a very long time. The Spring team decided that it was time to trim unnecessary features, revisit some of its API and merge the resulting work into the "spring-core" module of Spring Framework. This new Retry support is located in the `org.springframework.core.retry` package, we will update the reference documentation soon.

In the meantime, [Spring projects like Spring Batch are already working on using this in place of spring-retry](https://github.com/spring-projects/spring-batch/issues/4868).

## [](#and-much-more)And much more!

As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M6) for more details and [read the global 7.0 release notes for upgrade concerns](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes).

7.0.0-M6 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
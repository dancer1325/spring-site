---
title: Spring Batch 5.0 RC1 is out!
source: https://spring.io/blog/2022/10/20/spring-batch-5-0-rc1-is-out
scraped: 2026-02-23T10:36:46.406Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 20, 2022 | 0 Comments
---

# Spring Batch 5.0 RC1 is out!

_Releases | Mahmoud Ben Hassine |  October 20, 2022 | 0 Comments_

It is finally here! The first release candidate of Spring Batch 5 is now available from our [milestone repository](https://repo.spring.io/milestone). In this release, we worked on the following items:

-   Execution context Meta-data improvement
-   GemFire support removal

This blog post walks through these two changes in details. For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-RC1).

## [](#execution-context-meta-data-improvement)Execution context Meta-data improvement

In addition to what Spring Batch already persists in the execution context with regard to runtime information (like the step type, the restart flag, etc), this release adds an important detail in the execution context which is the Spring Batch version that was used to serialize the context.

While this seems a detail, it has a huge added value when debugging upgrade issues with regard to execution context serialization and deserialization.

## [](#gemfire-support-removal)GemFire support removal

Based on the [decision to discontinue](https://github.com/spring-projects/spring-data-geode#notice) the support of Spring Data for Apache Geode, the support for Apache Geode in Spring Batch was removed.

The code was moved to the [spring-batch-extensions](https://github.com/spring-projects/spring-batch-extensions) repository as a community-driven effort.

## [](#whats-next)What's next?

We are planning to roll out a second release candidate early November and release 5.0.0 GA by the end of November, in time for Spring Boot 3.0.0. We would appreciate your help to try this release candidate out and share your feedback with us on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch) and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch). You can find a migration guide [here](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide).

I would like to thank all contributors who had a role in this first release candidate!

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-RC1/reference/html/index-single.html)
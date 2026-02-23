---
title: Spring Cloud Task 2.1.0.M1 is now available
source: https://spring.io/blog/2018/11/05/spring-cloud-task-2-1-0-m1-is-now-available
scraped: 2026-02-23T15:07:36.526Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  November 05, 2018 | 0 Comments
---

# Spring Cloud Task 2.1.0.M1 is now available

_Releases | Glenn Renfro |  November 05, 2018 | 0 Comments_

We are pleased to announce that Spring Cloud Task 2.1.0M1 is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

Spring Cloud Task 2.1.0.M1 is intended to be the version of the framework aligned with Spring Boot 2.1.0. Updates from 2.0.x include:

-   Update all dependencies.
-   Spring Cloud Task is now enabled through auto-configuration.
-   The `exitCode` of a `TaskExecution` is `null` when a task is executing.
-   Spring Cloud Task compiles and runs on Java 8, 9, 10, 11.

Let's walk through these updates in more detail.

## [](#update-to-all-dependencies)Update to All Dependencies

As stated earlier, this release brings Spring Cloud Task into alignment with Spring Boot 2.1. This includes updating all dependencies.

## [](#spring-cloud-task-is-now-enabled-through-auto-configuration)Spring Cloud Task Is Now Enabled through Auto-configuration

Goodbye to `@EnableTask` and hello to **auto-configuration**! Spring Cloud Task is now enabled through auto-configuration. To use it, add the `spring-cloud-starter-task` dependency to your Maven pom or Gradle build file.

## [](#task-executions-exitcode-is-null-when-a-task-executes)Task Execution's `exitCode` Is Null When a Task Executes

In previous releases of Spring Cloud Task, the `TaskExecution` returned from Spring Cloud Task methods always showed that a running task's `exitCode` was `0`. Now the TaskExecutions returned from Spring Cloud Task have an `exitCode` of `null` if the task is still executing.

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly via Twitter to [@michaelminella](https://twitter.com/michaelminella) or [@cppwfs](https://twitter.com/cppwfs)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.1.0.M1/reference/htmlsingle/)
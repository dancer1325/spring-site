---
title: Spring Cloud Task 2.1.0 GA is now available
source: https://spring.io/blog/2019/01/22/spring-cloud-task-2-1-0-ga-is-now-available
scraped: 2026-02-23T15:00:00.948Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  January 22, 2019 | 0 Comments
---

# Spring Cloud Task 2.1.0 GA is now available

_Releases | Glenn Renfro |  January 22, 2019 | 0 Comments_

We are pleased to announce that Spring Cloud Task 2.1.0.RELEASE is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

Spring Cloud Task 2.1.0.RELEASE is intended to be the version of the framework aligned with Spring Boot 2.1.0. Updates from 2.1.x include:

-   Update all dependencies.
-   Spring Cloud Task infrastructure components are now enabled through auto-configuration.
-   The `exitCode` of a `TaskExecution` is `null` when a task is executing.
-   Spring Cloud Task is compatible with Java 8, 9, 10, 11.

Let's walk through these updates in more detail.

## [](#update-to-all-dependencies)Update to All Dependencies

As stated earlier, this release brings Spring Cloud Task into alignment with Spring Boot 2.1. This includes updating all dependencies.

## [](#spring-cloud-task-foundation-components-are-now-enabled-through-auto-configuration)Spring Cloud Task Foundation Components are Now Enabled through Auto-configuration

Auto configuration is now used to create the `TaskExplorer`, `TaskRepository`, and other beans but does not create the `TaskLifecycleListener` (the bean that executes the Spring Cloud Task core functionality). We added this feature to let users who are building their own applications that are not tasks monitor or browse the task repository by using the provided auto configuration. The `TaskLifecycleListener` bean is created when a user adds the `@EnableTask` to their application or configuration.

## [](#task-executions-exitcode-is-null-when-a-task-executes)Task Execution's `exitCode` Is Null When a Task Executes

In previous releases of Spring Cloud Task, the `TaskExecution` returned from Spring Cloud Task always showed that a running task's `exitCode` was `0`. Now the `TaskExecution` instances returned from Spring Cloud Task have an `exitCode` of `null` if the task is still executing.

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), on [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly via Twitter to [@michaelminella](https://twitter.com/michaelminella) or [@cppwfs](https://twitter.com/cppwfs)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.1.0.RELEASE/reference/htmlsingle/)
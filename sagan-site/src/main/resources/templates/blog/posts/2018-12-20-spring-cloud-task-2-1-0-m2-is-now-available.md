---
title: Spring Cloud Task 2.1.0.M2 is now available
source: https://spring.io/blog/2018/12/20/spring-cloud-task-2-1-0-m2-is-now-available
scraped: 2026-02-23T15:04:13.684Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  December 20, 2018 | 0 Comments
---

# Spring Cloud Task 2.1.0.M2 is now available

_Releases | Glenn Renfro |  December 20, 2018 | 0 Comments_

We are pleased to announce that Spring Cloud Task 2.1.0.M2 is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

Spring Cloud Task 2.1.0.M2 is intended to be the version of the framework aligned with Spring Boot 2.1.0. Updates from 2.1.0.M1 include:

-   Update all dependencies.
-   By popular demand, `@EnableTask` is back.
-   Bug Fixes.

Let's walk through these updates in more detail.

## [](#enabletask-is-back)@EnableTask is back

By popular demand, `@EnableTask` is back, with a twist! In this case, `AutoConfiguration` is still being used to create the `TaskExplorer`, `TaskConfigurer`, and other beans but does not create the `TaskLifecycleListener` (the bean that adds the Task Lifecycle to your application). The `TaskLifecycleListener` bean is created when a user adds the `@EnableTask` to their application or configuration. We added this back to let users who are building their own applications that are not tasks but monitor or browse the task repository build applications by using the provided autoconfiguration.

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly via Twitter to [@michaelminella](https://twitter.com/michaelminella) or [@cppwfs](https://twitter.com/cppwfs)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.1.0.M1/reference/htmlsingle/)
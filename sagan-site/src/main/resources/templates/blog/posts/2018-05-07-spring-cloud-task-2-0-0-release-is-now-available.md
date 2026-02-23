---
title: Spring Cloud Task 2.0.0.RELEASE is now available
source: https://spring.io/blog/2018/05/07/spring-cloud-task-2-0-0-release-is-now-available
scraped: 2026-02-23T15:23:46.228Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  May 07, 2018 | 0 Comments
---

# Spring Cloud Task 2.0.0.RELEASE is now available

_Releases | Michael Minella |  May 07, 2018 | 0 Comments_

We are pleased to announce that Spring Cloud Task 2.0.0.RELEASE is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

Spring Cloud Task 2.0.0.RELEASE is intended to be the version of the framework aligned with Spring Boot 2. Updates from 1.2.x include:

-   Updates to all dependencies.
-   Restricting concurrent task execution.
-   A failed batch job execution fails a task.

Let's walk through these updates in more detail.

## [](#update-to-all-dependencies)Update to All Dependencies

As stated earlier, this is the generally available release that brings Spring Cloud Task into alignment with Spring Boot 2. This includes updating all dependencies as well as updating the minimum version of java to JDK 8+.

## [](#restricting-concurrent-task-execution)Restricting Concurrent Task Execution

Spring Cloud Task is intended to be used to execute finite workloads in a cloud environment. Many workloads that fall into that category need to be executed serially. Preventing multiple instances of a given task from executing provides important value. This release adds the ability to prevent multiple instances of a given task from being executed at the same time. This functionality is built on the distributed locking mechanisms built into Spring Integration. Once the required dependencies from Spring Integration (`spring-integration-core` and `spring-integration-jdbc`, to be specific) are included, you can configure a single property on your task (`spring.cloud.task.singleInstanceEnabled=true`) to prevent multiple instances from executing. If this property is set to `true` (it is `false` by default), a second attempt at executing the task while the first is running causes the second task execution to fail, indicating that the task is already running.

More information on this feature can be found in the documentation [here](https://docs.spring.io/spring-cloud-task/docs/2.0.0.RELEASE/reference/htmlsingle/#_restricting_spring_cloud_task_instances).

## [](#a-failed-batch-job-execution-fails-a-task)A Failed Batch Job Execution Fails a Task

By default, the mechanisms that run Spring Batch jobs within Spring Boot log any job failures and happily continue along. However, that means that a task running a Spring Batch job always completes successfully. This release enables the ability for a Spring Batch job that fails to cause the task that enclosed it to fail. Like all things Spring, we make this hard to consume.... Just set the property `spring.cloud.task.batch.failOnJobFailure=true` (`false` is the default). With that property set, if a job is run within the configured task and fails, the task results in a failure (indicated via an exit code of 1).

More information on this feature can be found in the documentation [here](https://docs.spring.io/spring-cloud-task/docs/2.0.0.RELEASE/reference/htmlsingle/#batch-failures-and-tasks).

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.0.0.RELEASE/reference/htmlsingle/)
---
title: Spring Cloud Task 2.2.1 GA is now available
source: https://spring.io/blog/2019/11/25/spring-cloud-task-2-2-1-ga-is-now-available
scraped: 2026-02-23T14:25:15.105Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Glenn Renfro |  November 25, 2019 | 0 Comments
---

# Spring Cloud Task 2.2.1 GA is now available

_Engineering | Glenn Renfro |  November 25, 2019 | 0 Comments_

We are pleased to announce that the Spring Cloud Task 2.2.1.RELEASE is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

The Spring Cloud Task 2.2.1.RELEASE is intended to be the version of the framework aligned with Spring Boot 2.2.x. Updates in this new version include:

-   Update all dependencies.
-   Micrometer support.
-   Updated documentation with improved format.
-   Task apps launched when using Spring Batch partitioning now have external-execution-id populated.

Let's walk through these updates in more detail.

## [](#update-to-all-dependencies)Update to All Dependencies

As stated earlier, this release brings Spring Cloud Task into alignment with Spring Boot 2.2.x. This includes updating all dependencies.

## [](#micrometer-support)Micrometer Support

Task applications built on the Spring Cloud Task 2.2.0 version can be configured to emit Task and Batch metrics to the pre-configured monitoring systems supported by Micrometer. The task-specific metrics include task duration and task execution status. You can read more about this new feature [here](https://dataflow.spring.io/docs/feature-guides/batch/monitoring/). If you have not heard about Micrometer, it provides a simple facade over the instrumentation clients for the most popular monitoring systems, letting you instrument your JVM-based application code without vendor lock-in. You can read more about it [here](https://micrometer.io/).

## [](#updated-documentation-with-improved-format)Updated Documentation with Improved Format

To improve the readability and usefulness of the Spring Cloud Task reference documentation, we have spent some time updating the format and syntax of the documentation. Some of these changes include reference links on the left hand side of page for quick access to key topics as well as a new style to make the docs more readable. They can be found [here](https://docs.spring.io/spring-cloud-task/docs/2.2.1.RELEASE/reference/). Let us know what you think!

## [](#task-apps-launched-when-using-partitioning-now-have-external-execution-id-populated)Task Apps Launched When Using Partitioning Now Have external-execution-id Populated

Spring Cloud Task now captures the execution ID provided by the platform for each partitioned task launch and stores that as a part of the task execution record for that partition. (You can think of an external execution ID as the PID (and is the PID if you launch your task on your local system). This lets you use the platform's tools to diagnose issues with your apps by being able to search the platform for the ID it provided.

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), on [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly via Twitter to [@michaelminella](https://twitter.com/michaelminella) or [@cppwfs](https://twitter.com/cppwfs)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.1.0.RELEASE/reference/htmlsingle/)
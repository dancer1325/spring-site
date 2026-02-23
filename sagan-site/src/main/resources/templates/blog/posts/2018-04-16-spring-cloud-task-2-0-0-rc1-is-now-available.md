---
title: Spring Cloud Task 2.0.0.RC1 is now available
source: https://spring.io/blog/2018/04/16/spring-cloud-task-2-0-0-rc1-is-now-available
scraped: 2026-02-23T15:26:29.084Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  April 16, 2018 | 0 Comments
---

# Spring Cloud Task 2.0.0.RC1 is now available

_Releases | Michael Minella |  April 16, 2018 | 0 Comments_

We are pleased to announce that Spring Cloud Task 2.0.0.RC1 is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

This release includes upgrades to existing dependencies as well as some nice new features. Let's take a look at what's new in this release.

### [](#compatibility-with-spring-cloud-stream-20)Compatibility with Spring Cloud Stream 2.0

Spring Cloud Stream 2.0 was [released a few days ago](https://spring.io/blog/2018/04/10/announcing-general-availability-of-spring-cloud-stream-elmhurst-release-2-0-0-release) and provides a collection of impressive enhancements. Spring Cloud Task is updated and supports Spring Cloud Stream 2.0

### [](#multiple-datasource-sample)Multiple DataSource Sample

A common point of confusion for Spring Cloud Task is how to configure a task application when using multiple DataSource beans. In this release, we provided a sample that demonstrates how that should work. You can find that sample [here](https://github.com/spring-cloud/spring-cloud-task/tree/master/spring-cloud-task-samples/multiple-datasources).

### [](#features-release-in-previous-milestones)Features Release in Previous Milestones

Beyond the above new features, other features that are included in the 2.0 line include the following:

-   Restricting task instances: Via configuration, you can prevent multiple instances of a task from executing.
-   Batch jobs fail the task: By setting the `spring.cloud.task.batch.failOnJobFailure` flag to `true`, if a Spring Batch job executed within the task fails, the task fails as well.

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.0.0.RC1/reference/htmlsingle/)
---
title: Spring Batch 5.0 RC2 available now
source: https://spring.io/blog/2022/11/09/spring-batch-5-0-rc2-available-now
scraped: 2026-02-23T10:34:41.036Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  November 09, 2022 | 0 Comments
---

# Spring Batch 5.0 RC2 available now

_Releases | Mahmoud Ben Hassine |  November 09, 2022 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that the second and final release candidate of Spring Batch 5 is now available from our [milestone repository](https://repo.spring.io/milestone).

In this release, we worked on the following items:

-   Full MariaDB support
-   Native support improvements
-   Observability improvements

This blog post walks through these changes in details. For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-RC2).

## [](#full-mariadb-support)Full MariaDB support

Up until v4.3, Spring Batch provided support for MariaDB by considering it as MySQL. In this release, MariaDB is now treated as a separate database product with its own DDL script and `DataFieldMaxValueIncrementer`.

## [](#native-support-improvements)Native support improvements

The effort towards providing support to compile Spring Batch applications as native executables using the GraalVM native-image compiler has started in v4.2 and was shipped as experimental in v4.3.

We have also worked on improving that support in previous milestones of Spring Batch 5. In this release candidate, we have significantly improved the native support by providing the necessary Ahead-Of-Time processing and reflection hints to natively compile Spring Batch applications with GraalVM.

## [](#observability-improvements)Observability improvements

In addition to introducing tracing support in previous milestones, we have taken the opportunity of this release candidate to revisit the built-in metrics provided by Spring Batch and enrich them with new metrics.

In this release candidate, we have added two metrics:

-   `job.launch.count`: This is `Counter` that reports how many jobs have been launched through the `JobLauncher`. This can be convenient for environments where batch jobs are scheduled and executed in a continuously running JVM.
-   `step.active`: This metric of type `LongTaskTimer` reports the currently active (ie running) step in a specific job. This metric is useful in situations where a job has several steps and one wants to know in which step the processing is currently happening.

## [](#whats-next)What's next?

I would like to thank all contributors who had a role in this release! You can try Spring Batch `5.0.0-RC2` with Spring Boot `3.0.0-RC2`. We are planning to release Spring Batch `5.0` GA later this November 2022, so we would be grateful to our community to give this last release candidate a try and submit feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch) and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-RC2/reference/html/index-single.html)
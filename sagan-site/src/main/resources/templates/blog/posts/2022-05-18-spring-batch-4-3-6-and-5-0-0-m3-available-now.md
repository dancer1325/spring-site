---
title: Spring Batch 4.3.6 and 5.0.0-M3 available now
source: https://spring.io/blog/2022/05/18/spring-batch-4-3-6-and-5-0-0-m3-available-now
scraped: 2026-02-23T12:41:46.640Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  May 18, 2022 | 1 Comment
---

# Spring Batch 4.3.6 and 5.0.0-M3 available now

_Releases | Mahmoud Ben Hassine |  May 18, 2022 | 1 Comment_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring Batch 4.3.6 has been released to Maven Central and that Spring Batch 5.0.0-M3 is now available from our [milestone repository](https://repo.spring.io/milestone).

Spring Batch 4.3.6 is a patch release that comes with a number of bug fixes, enhancements, and dependency updates. For more details about the changes, see the [change log](https://github.com/spring-projects/spring-batch/releases/tag/4.3.6).

This blog post is more about 5.0.0-M3, which comes with three major features:

-   Native support improvements
-   UTF-8 by default
-   New Maven Bill of Materials

Moreover, this milestone release comes with a number of enhancements, bug fixes, and dependency updates. See the [change log](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M3) for more details about the content of this milestone.

## [](#native-support-improvements)Native support improvements

Our effort towards providing support to compile Spring Batch applications as native executables by using the GraalVM native-image compiler started in v4.2 and was shipped as experimental in v4.3.

In this milestone release, the native support has been significantly improved, and we want to share with you some of the benchmarks we have been working on in that area. The following benchmarks are based on the [batch-io](https://github.com/spring-projects-experimental/spring-native/tree/main/samples/batch-io) sample from the [Spring Native](https://github.com/spring-projects-experimental/spring-native) project. These benchmarks show a comparison of the startup time and total execution time of the same batch application executed with a regular JVM and as a native executable:

![perf-native](https://raw.githubusercontent.com/benas/spring-batch-lab/main/issues/native203/perf-native.png)

The values shown here are the average of 10 executions of the sample using the following software and hardware setup:

-   JVM: OpenJDK version "17" 2021-09-14
-   GraalVM: OpenJDK Runtime Environment GraalVM CE 22.0.0.2
-   MacOS BigSur v11.6.2 (CPU: 2,4 GHz 8-Core Intel Core i9, Memory: 32 GB 2667 MHz DDR4)

As these benchmarks show, a native Spring Batch application is two times faster at startup and almost ten times faster at runtime! This really is a game changer for cloud native batch workloads!

Our plan is to continue to improve the native support for Spring Batch in the upcoming milestones and ship it as stable in v5.0 GA. If you want to help us in this mission, we encourage you to try to compile your existing applications as native executables and report any issue or share any benchmark that might help to the Spring Batch and Spring Native teams.

## [](#utf-8-by-default)UTF-8 by default

Several issues related to character encoding have been reported over the years in different areas of the framework, such as inconsistent default encoding between file-based item readers and writers, serialization/deserialization issues when dealing with multi-byte characters in the execution context, and others.

In the same spirit as [JEP 400](https://openjdk.java.net/jeps/400) and following the [UTF-8 manifesto](http://utf8everywhere.org), we have changed the default encoding to `UTF-8` in all areas of the framework and made this default configurable where appropriate.

## [](#new-maven-bill-of-materials)New Maven Bill of Materials

This feature has been requested several times and is finally shipped in this milestone release. It is now possible to use the newly added Maven BOM to import Spring Batch modules with a consistent version number.

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this milestone release! As we continue our work on Spring Batch 5, we look forward to your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch), and StackOverflow.

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-M2/reference/html/index-single.html)
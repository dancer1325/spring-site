---
title: Spring Batch 6.0.0 GA is out!
source: https://spring.io/blog/2025/11/19/spring-batch-6-0-0-ga
scraped: 2026-02-22T22:10:21.861Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  November 19, 2025 | 0 Comments
---

# Spring Batch 6.0.0 GA is out!

_Releases | Mahmoud Ben Hassine |  November 19, 2025 | 0 Comments_

Dear Spring Batch community,

On behalf of the team and everyone who has contributed, I am pleased to announce the release of Spring Batch 6.0.0 GA!

Spring Batch 6.0 is a major release that builds upon the foundations in Spring Framework 7.0, and will be available through Spring Boot 4.0 to provide a robust and efficient batch processing framework. This general availability release includes all the features and improvements introduced in the previous release candidates, along with additional enhancements based on community feedback.

Some of the key highlights of Spring Batch 6.0.0 GA include:

-   Upgrade to the latest Spring dependencies like Spring Framework 7.0, Spring Data 4.0, and Spring Integration 7.0
-   Comprehensive null safety through JSpecify
-   New, more robust and faster implementation of the chunk-oriented processing model
-   New, enhanced concurrency model for better throughput and improved performance
-   Support for local data chunking with multiple threads
-   Support for remote step executions
-   SEDA style with Spring Integration message channels
-   Graceful shutdown support and ability to recover failed job executions
-   Support for observability events with the Java Flight Recorder (JFR)
-   New modern command line job operator
-   Lambda style configuration
-   Jackson 3 support
-   Batch infrastructure configuration improvements
-   And more!

You can find more details about the new features and improvements in the [official documentation](https://docs.spring.io/spring-batch/reference/6.0/whatsnew.html). For a comprehensive list of changes, please refer to the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v6.0.0).

I would like to thank all contributors who had a role in this release! Your feedback and contributions have been invaluable in shaping Spring Batch 6.0.0 GA.

Cheers, Mahmoud

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/6.0/index.html)
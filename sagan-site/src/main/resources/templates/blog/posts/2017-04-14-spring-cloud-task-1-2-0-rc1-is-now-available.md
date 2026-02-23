---
title: Spring Cloud Task 1.2.0.RC1 is now available
source: https://spring.io/blog/2017/04/14/spring-cloud-task-1-2-0-rc1-is-now-available
scraped: 2026-02-23T16:34:28.555Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  April 14, 2017 | 0 Comments
---

# Spring Cloud Task 1.2.0.RC1 is now available

_Releases | Glenn Renfro |  April 14, 2017 | 0 Comments_

We are pleased to announce that Spring Cloud Task 1.2.0.RC1 is now available via Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#spring-cloud-task-120rc1-offers-the-following-features)Spring Cloud Task 1.2.0.RC1 offers the following features:

-   Upgrade to Spring Cloud Stream Chelsea GA.
-   Renamed `closecontext.enable` to `closecontext.enabled` as to match the Spring Boot style for enabled properties.
-   Task name can be set when creating a `TaskExecution` externally, allowing the launcher to set the name in a persistent manor.
-   Added `Ordered` Interface to Task Events and Batch Job Events so the user can establish when task or batch events are emitted from their Spring Cloud Task application.
-   Cleaned up Spring Cloud Task dependencies.
-   Update default task name creation to prevent conflicts with JMX.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@cppwfs](https://twitter.com/cppwfs)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/1.2.0.RC1/reference/htmlsingle/)
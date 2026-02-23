---
title: Spring Cloud Task 1.1.0.M2 is now available
source: https://spring.io/blog/2016/10/12/spring-cloud-task-1-1-0-m2-is-now-available
scraped: 2026-02-23T19:01:24.839Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  October 12, 2016 | 0 Comments
---

# Spring Cloud Task 1.1.0.M2 is now available

_Releases | Glenn Renfro |  October 12, 2016 | 0 Comments_

We are pleased to announce that Spring Cloud Task 1.1.0.M2 is now available via Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new-in-spring-cloud-task-110m2)What's new in Spring Cloud Task 1.1.0.M2

This release continues to progress on 1.1.0's main theme of improving overall task functionality as well as migrating features that existed within Spring XD to Spring Cloud Task. The main updates for this release are the following:

-   *Support for Generated Task Id* - A common use case for a Spring Cloud Task application is to launch it within a PaaS, like Cloud Foundry or other cloud infrastructure. Because of this, there may be a delay between the launch request and the actual application beginning. Worse, the system responsible for launching the application may not actually launch the task for reasons outside of Spring Cloud Task's control (lack of resources, network issues, etc). This feature allows the caller to register that a task has been requested to run. This way, no request of a task is lost between the request and the actual start of the Boot application.
-   *Support for External Execution Id* - When executing a task on a PaaS or other cloud infrastructure, there is typically a mapping that needs to occur between the task's execution id and the id provided by the underlying system. This feature provides the ability to correlate those two for things like log management, audit, etc.

## [](#whats-next)What's next

Spring Cloud Task 1.1.0 is expected to be GA before the end of the year in line with Spring Cloud Data Flow 1.1.0. Between now and then, we'll be adding additional capabilities to better integrate with Spring Cloud Data Flow.

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/current/reference/htmlsingle/)
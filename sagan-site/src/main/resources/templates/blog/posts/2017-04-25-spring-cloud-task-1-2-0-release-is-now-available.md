---
title: Spring Cloud Task 1.2.0.RELEASE is now available
source: https://spring.io/blog/2017/04/25/spring-cloud-task-1-2-0-release-is-now-available
scraped: 2026-02-23T16:14:55.134Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  April 25, 2017 | 0 Comments
---

# Spring Cloud Task 1.2.0.RELEASE is now available

_Releases | Glenn Renfro |  April 25, 2017 | 0 Comments_

We are pleased to announce that Spring Cloud Task 1.2.0.RELEASE is now available via Github, Maven Central, and the Pivotal download repository. Many thanks to all of those who contributed to this release. This release represents the first GA release of the 1.2 line.

## [](#whats-new-in-spring-cloud-task-120release)What's new in Spring Cloud Task 1.2.0.RELEASE

The Spring Cloud Task 1.2.0.RELEASE is intended to continue the integrations required for Spring Cloud Data Flow, this release provides the following features.

-   Better `DataSource` integration between task and batch - This release makes configuring a shared `DataSource` between task and batch repositories to be simpler.
-   Allow the user to easily configure a prefix for the task tables - Similar to how Spring Batch allows a user to configure a prefix for the batch repository tables, Spring Cloud Task now exposes the ability to configure a prefix for task repository tables via a Spring Boot property.
-   Allows an external process to update the external execution id - Prior to this release, the external execution id (the execution id for the underlying platform) had to be updated by the task itself. In some use cases, this is not possible. This release exposes the ability to update the external execution id outside the scope of the task itself.
-   Add support for parent execution ids - In complex use cases, the ability for one task to launch multiple other tasks is very common. Spring Cloud Task has already supported this via partitioned batch jobs launching worker nodes as tasks. This release provides the ability within the task repository to associate the parent child relationship that occurs from that capability (both in the batch use case and with raw tasks).
-   Task name can be set when creating a `TaskExecution` externally, allowing the launcher to set the name in a persistent manor.
-   Added `Ordered` Interface to Task Events and Batch Job Events so the user can establish when task or batch events are emitted from their Spring Cloud Task application.
-   Renamed `closecontext.enable` to `closecontext.enabled` as to match the Spring Boot style for enabled properties.
-   Various bug fixes and documentation updates.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@cppwfs](https://twitter.com/cppwfs)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/1.2.0.RELEASE/reference/htmlsingle/)
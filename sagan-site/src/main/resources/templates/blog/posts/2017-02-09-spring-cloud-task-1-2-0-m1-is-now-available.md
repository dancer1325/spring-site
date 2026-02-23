---
title: Spring Cloud Task 1.2.0.M1 is now available
source: https://spring.io/blog/2017/02/09/spring-cloud-task-1-2-0-m1-is-now-available
scraped: 2026-02-23T18:37:39.082Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  February 09, 2017 | 1 Comment
---

# Spring Cloud Task 1.2.0.M1 is now available

_Releases | Michael Minella |  February 09, 2017 | 1 Comment_

We are pleased to announce that Spring Cloud Task 1.2.0.M1 is now available via Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#spring-cloud-task-120m1-offers-the-following-features)Spring Cloud Task 1.2.0.M1 offers the following features:

This is the first milestone for the 1.2.x line of Spring Cloud Task. Intended to continue the integrations required for Spring Cloud Data Flow, this release provides the following new features:

-   Better DataSource integration between task and batch - This release makes configuring the DataSource used by the task/batch integration easier.
    
-   Allows an external process to update the external execution id - Prior to this release, the external execution id (the execution id for the underlying platform) had to be updated by the task itself. In some use cases, this is not possible. This release exposes the ability to update the external execution id outside the scope of the task itself.
    
-   Allow the user to configure a prefix for the task tables - Similar to how Spring Batch allows a user to configure a prefix for the batch repository tables, Spring Cloud Task now exposes the ability to configure a prefix for task repository tables as well.
    
-   Add support for parent execution ids - In complex use cases, the ability for one task to launch multiple other tasks is very common. Spring Cloud Task has already supported this via partitioned batch jobs launching worker nodes as tasks. This release provides the ability within the task repository to associate the parent child relationship that occurs from that capability (both in the batch use case and with raw tasks).
    
-   Upgrade to Spring Cloud Camden SR5 - This release is compatible with Spring Cloud Camden's recent SR5 release.
    

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

Finally, if you're in the Atlanta area February 22-24, learn more about Spring Cloud Task at [DevNexus](https://devnexus.com/s/index)! I'll be speaking about it and it's integration with Spring Batch as well as Spring Cloud Data Flow. You can learn about my talks here: [Michael Minella](https://devnexus.com/s/speakers/2423)

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/current/reference/htmlsingle/)
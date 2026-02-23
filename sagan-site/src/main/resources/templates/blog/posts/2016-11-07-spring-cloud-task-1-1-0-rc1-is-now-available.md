---
title: Spring Cloud Task 1.1.0.RC1 is now available
source: https://spring.io/blog/2016/11/07/spring-cloud-task-1-1-0-rc1-is-now-available
scraped: 2026-02-23T18:59:16.452Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  November 07, 2016 | 0 Comments
---

# Spring Cloud Task 1.1.0.RC1 is now available

_Releases | Glenn Renfro |  November 07, 2016 | 0 Comments_

We are pleased to announce that Spring Cloud Task 1.1.0.RC1 is now available via Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#spring-cloud-task-110-offers-the-following-features)Spring Cloud Task 1.1.0 offers the following features:

This release continues to progress on 1.1.0's main theme of improving overall task functionality as well as migrating features that existed within Spring XD to Spring Cloud Task. The feature set for 1.1.0 includes:

-   *Updated error message handling* - 1.1.0 adds a new column to the `TASK_EXECUTION` table, `ERROR_MESSAGE`. This new column will be where any exception that is thrown causing the failure of a task to be recorded (this is changed from the `EXIT_MESSAGE` field in previous versions). This change allows for the `EXIT_MESSAGE` field to be better utilized for orchestration of tasks.
-   *Improved options for customizing the launch of partitioned job workers* - When using the `DeployerPartitionHandler`, 1.1.0 now provides abstractions around customizing the environment variables and command line arguments on a per partition basis.
-   *Support for external execution id* - When executing a task on a PaaS or other cloud infrastructure, there is typically a mapping that needs to occur between the task's execution id and the id provided by the underlying system. This feature provides the ability to correlate those two for things like log management, audit, etc.
-   *Support externalized task execution recording* - This capability goes along with the support for an external execution id in that this allows the launching system to record a task execution's existence prior to it's start.
-   *DB2 Support* - Thanks to community for adding the DB2 support for Task Repository.
-   *Partition Job Samples* - Checkout the updated partitioned batch-job sample and the updated instructions on how to orchestrate them as short-lived Tasks in Local, Cloud Foundry, Mesos, YARN and Kubernetes.

## [](#whats-next)What's next

Spring Cloud Task 1.1.0 is expected to be GA next week with Spring Cloud Data Flow 1.1.0. Spring Cloud Task is considered to be feature complete, and the time between RC and GA we will be hardening the release for GA.

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/current/reference/htmlsingle/)
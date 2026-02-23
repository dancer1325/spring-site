---
title: Spring Cloud Task 1.0.3.RELEASE and 1.1.0.M1 are now available
source: https://spring.io/blog/2016/09/09/spring-cloud-task-1-0-3-release-and-1-1-0-m1-are-now-available
scraped: 2026-02-23T19:05:52.281Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  September 09, 2016 | 0 Comments
---

# Spring Cloud Task 1.0.3.RELEASE and 1.1.0.M1 are now available

_Releases | Michael Minella |  September 09, 2016 | 0 Comments_

We are pleased to announce that Spring Cloud Task 1.0.3.RELEASE and 1.1.0.M1 are now available via Maven Central, Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new-in-spring-cloud-task-103release)What's new in Spring Cloud Task 1.0.3.RELEASE

1.0.3.RELEASE represents the next minor release for the 1.0.x branch. It's a minor update that cleans up the dependency management within the project to be in alignment with how the rest of the Spring Cloud portfolio manages it's dependencies.

## [](#whats-new-in-spring-cloud-task-110m1)What's new in Spring Cloud Task 1.1.0.M1

Spring Cloud Task 1.1.0's main theme is to improve overall support of task functionality and continue to migrate features that were found in Spring XD's containers for batch jobs to Spring Cloud Task. The main updates for this release are the following:

-   *Updated error message handling* - This release adds a new column to the `TASK_EXECUTION` table, `ERROR_MESSAGE`. This new column will be where any exception that is thrown causing the failure of a task to be recorded (this is changed from the `EXIT_MESSAGE` field in previous versions). This change allows for the `EXIT_MESSAGE` field to be better utilized for orchestration of tasks.
-   *Improved options for customizing the launch of partitioned job workers* - When using the `DeployerPartitionHandler`, 1.1.0 now provides abstractions around customizing the environment variables and command line arguments on a per partition basis. This is an improvement of the all or nothing option available in the 1.0.x branch.

## [](#whats-next)What's next

Spring Cloud Task 1.1.0 is expected to be GA before the end of the year in line with Spring Cloud Data Flow 1.1.0. Between now and then, we'll be refining the partitioning model as well as adding additional capabilities to better integrate with Spring Cloud Data Flow.

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/current/reference/htmlsingle/)
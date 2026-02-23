---
title: Spring Cloud Task 1.1.0.RELEASE is now available
source: https://spring.io/blog/2016/11/22/spring-cloud-task-1-1-0-release-is-now-available
scraped: 2026-02-23T18:57:53.500Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  November 22, 2016 | 0 Comments
---

# Spring Cloud Task 1.1.0.RELEASE is now available

_Releases | Michael Minella |  November 22, 2016 | 0 Comments_

We are pleased to announce that Spring Cloud Task 1.1.0.RELEASE is now available via Github and the Pivotal download repository. Many thanks to all of those who contributed to this release.

## [](#spring-cloud-task-110-offers-the-following-features)Spring Cloud Task 1.1.0 offers the following features:

This is the generally available release (GA) for 1.1.0. This release addresses key enhancements to the project to allow for better coverage of operational concerns for tasks in a cloud environment. Features new to the 1.1.0 line include:

-   *Updated error handling* - 1.0.x stored stack traces that were the result of task executions within the `TaskExecution#exitMessage` field, requiring that this field perform double duty. First it was available for orchestration of tasks (similar to `StepExecution#exitStatus` in Spring Batch) as well as the storage of stack traces for debugging. In the 1.1.0 release, error messages have been moved to a new field `TaskExecution#errorMessage` so that each field has it's own, dedicated use.
    
-   *Updated customization options for partitioned batch jobs* - In the 1.0.x line for Spring Cloud Task, when launching workers as tasks, there was not a way to customize the command line arguments provided to them. This is an issue in environments like CloudFoundry where you can use command line args to customize configuration without the need to re-push your app. In the new 1.1.0 release, we provide the ability to customize command line arguments via the `CommandLineArgsProvider` which is similar in functionality to the `EnvironmentVariablesProvider` introduced in 1.0.2.
    
-   *External execution id persistence* - When running a task in a cloud environment, there is typically a separate id associated with the infrastructure for the task's execution. The id that YARN uses in the history server or the task id used by CloudFoundry are examples of these ids. Spring Cloud Task 1.1.0 now provides the ability to persist this external execution id for the ability to map one to the other.
    
-   *Record the request of a task execution* - When launching tasks on some form of infrastructure like Kubernetes or CloudFoundry, there can be a lag between the time the task execution is requested vs when it actually starts. Compounding this issue is the fact that if there is a problem with the platform, the task may not get launched at all. If this does occur, you'll still want a record of the request. Spring Cloud Task 1.1.0 introduces the ability to record that a task is expected to start prior to it's execution actually beginning. Allowing the launcher to record this request and the task itself will update it's status accordingly.
    
-   *Additional database support for the task repository* - 1.1.0 introduces a community contributed schema to support DB2 as a datastore for the task repository.
    

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/current/reference/htmlsingle/)
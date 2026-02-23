---
title: Spring Batch 6.0.0-RC1 is out!
source: https://spring.io/blog/2025/10/22/spring-batch-6-0-0-rc1-released
scraped: 2026-02-23T07:24:53.092Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 22, 2025 | 0 Comments
---

# Spring Batch 6.0.0-RC1 is out!

_Releases | Mahmoud Ben Hassine |  October 22, 2025 | 0 Comments_

On behalf of the team and all contributors, I am pleased to announce that Spring Batch `6.0.0-RC1` is now available from Maven Central!

This release candidate comes with following features and improvements:

-   Graceful Shutdown support
-   SEDA style with Spring Integration message channels
-   Local chunking support
-   Jackson 3 support
-   Remote step support

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v6.0.0-RC1).

## [](#graceful-shutdown-support)Graceful Shutdown support

Spring Batch 6.0 introduces support for graceful shutdown of batch jobs. This feature allows you to stop a running job execution in a controlled manner, ensuring that interruption signals are correctly sent to running steps.

When a graceful shutdown is initiated, the job execution will stop currently active steps and updates the job repository with a consistent state that enables restartability. Once running steps have finished, the job execution will be marked as stopped, and any necessary cleanup operations will be performed.

## [](#local-chunking-support)Local chunking support

Similar to remote chunking, local chunking is a new feature that allows you to process chunks of items in parallel, locally within the same JVM using multiple threads. This is particularly useful when you have a large number of items to process and want to take advantage of multi-core processors. With local chunking, you can configure a chunk-oriented step to use multiple threads to process chunks of items concurrently. Each thread will read, process and write its own chunk of items independently, while the step will manage the overall execution and commit the results.

## [](#seda-style-with-spring-integration-message-channels)SEDA style with Spring Integration message channels

In Spring Batch 5.2, we introduced the concept of SEDA (Staged Event-Driven Architecture) style processing using local threads with the `BlockingQueueItemReader` and `BlockingQueueItemWriter` components. Building on that foundation, Spring Batch 6.0 introduces support for SEDA style processing at scale using Spring Integration messaging channels. This allows you to decouple the different stages of a batch job and process them asynchronously using message channels. By leveraging Spring Integration, you can easily configure and manage the messaging channels, as well as take advantage of features like message transformation, filtering, and routing.

## [](#jackson-3-support)Jackson 3 support

Spring Batch 6.0 has been upgraded to support Jackson 3.x for JSON processing. This upgrade ensures compatibility with the latest features and improvements in the Jackson library, while also providing better performance and security. All JSON-related components in Spring Batch, such as the `JsonItemReader` and `JsonFileItemWriter`, as well as the `JacksonExecutionContextStringSerializer` have been updated to use Jackson 3.x by default.

The support for Jackson 2.x has been deprecated and will be removed in a future release. If you are currently using Jackson 2.x in your Spring Batch applications, it is recommended to upgrade to Jackson 3.x to take advantage of the latest features and improvements.

## [](#remote-step-support)Remote step support

This release introduces support for remote step executions, allowing you to execute steps of a batch job on remote machines or clusters. This feature is particularly useful for large-scale batch processing scenarios where you want to distribute the workload across multiple nodes to improve performance and scalability. Remote step execution is based on Spring Integration message channels, which enable communication between the local job execution environment and the remote step executors.

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 6, we look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions) and [X](https://twitter.com/springbatch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/6.0/index.html)
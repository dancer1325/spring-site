---
title: Spring Batch 6.0.0-M3 and 5.2.3 are out!
source: https://spring.io/blog/2025/09/17/spring-batch-6-0-0-m3-5-2-3-released
scraped: 2026-02-23T07:29:26.600Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  September 17, 2025 | 0 Comments
---

# Spring Batch 6.0.0-M3 and 5.2.3 are out!

_Releases | Mahmoud Ben Hassine |  September 17, 2025 | 0 Comments_

On behalf of the team and all contributors, I am pleased to announce that Spring Batch `6.0.0-M3` and `5.2.3` are now available in Maven Central!

Version `5.2.3` is a maintenance release that includes several bug fixes and dependency upgrades. You can find the complete list of changes in the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.2.3).

This blog post is more about the `6.0.0-M3` milestone release, which comes with following features and improvements:

-   New concurrency model
-   Ability to stop all kinds of steps
-   Observability with the Java Flight Recorder

For the complete list of changes, please check its release notes [here](https://github.com/spring-projects/spring-batch/releases/tag/v6.0.0-M3).

## [](#new-concurrency-model)New concurrency model

Prior to this release, the concurrency model based on the "parallel iteration" concept required a lot of state synchronization at different levels and had several limitations related to throttling and backpressure, leading to confusing transaction semantics and poor performance.

This release revisits that model and comes with a new, simplified approach to concurrency based on the producer-consumer pattern. A concurrent chunk-oriented step now uses a bounded internal queue between the producer thread and consumer threads. Items are put in the queue as soon as they are ready to be processed, and consumer threads take items from the queue as soon as they are available for processing. Once a chunk is ready to be written, the producer thread pauses until the chunk is written, and then resumes producing items.

This new model is more efficient, easier to understand and provides better performance for concurrent executions.

## [](#ability-to-stop-all-kinds-of-steps)Ability to stop all kinds of steps

As of v5.2, it is only possible to externally stop `Tasklet` steps through `JobOperator#stop`. If a custom `Step` implementation wants to handle external stop signals, it just can't.

This release adds a new interface, named `StoppableStep`, that extends `Step` and which can be implemented by any step that is able to handle external stop signals.

## [](#observability-with-the-java-flight-recorder)Observability with the Java Flight Recorder

In addition to the existing Micrometer metrics, Spring Batch 6.0 introduces support for the Java Flight Recorder (JFR) to provide enhanced observability capabilities.

JFR is a powerful profiling tool built into the Java Virtual Machine. It allows you to capture detailed information about the runtime behavior of your applications with minimal performance overhead.

This release introduces several JFR events to monitor key aspects of a batch job execution, including (but not limited to) job and step executions, item reads and writes, as well as transaction boundaries.

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 6, we look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions) and [X](https://twitter.com/springbatch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/6.0/index.html)
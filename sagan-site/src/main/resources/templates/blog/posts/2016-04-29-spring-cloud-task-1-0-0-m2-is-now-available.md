---
title: Spring Cloud Task 1.0.0.M2 is now available
source: https://spring.io/blog/2016/04/29/spring-cloud-task-1-0-0-m2-is-now-available
scraped: 2026-02-23T19:17:46.544Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  April 29, 2016 | 0 Comments
---

# Spring Cloud Task 1.0.0.M2 is now available

_Releases | Michael Minella |  April 29, 2016 | 0 Comments_

We are pleased to announce the release of [Spring Cloud Task](http://cloud.spring.io/spring-cloud-task/) 1.0.0.M2. This is the second milestone of the Spring Cloud Task project with some exciting new features!

## [](#whats-new)What's New?

With the M1 release of Spring Cloud Task, we introduced the concept of a task, the `@EnableTask` annotation, and the general concept of a microservice that has an end. We've been quite busy since then. Some of the highlights of what is new include:

-   Spring Cloud Task Listeners
-   Integration with Spring Cloud Stream
-   Integration with Spring Batch
-   More samples

Let's take a look at what each of these include.

## [](#spring-cloud-task-listeners)Spring Cloud Task Listeners

It can be useful to execute logic around a task, before or after (or both). This release introduces both an interface, `TaskExecutionListener`, as well as annotations `@BeforeTask` and `@AfterTask` that allow a user to define logic to be executed either before a task is executed or once it is complete.

## [](#integration-with-spring-cloud-stream)Integration with Spring Cloud Stream

Integrating Spring Cloud Task with [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) creates a powerful tool for developers to orchestrate data microservices. In this release of Spring Cloud Task, we have added a few integration points between the two projects.

The first integration point is the ability to launch tasks based on messages sent via a stream. By creating a Boot application using the `@EnableTaskLauncher` annotation and the correct dependencies, you'll have a Spring Cloud Stream Sink that listens for `TaskLaunchRequest` messages. For each message that is received, the launcher sink will launch the requested task.

```
Copy@SpringBootApplication
@EnableTaskLauncher
public class TaskSinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskSinkApplication.class, args);
	}
}
```

As of the writing of this post, launchers for both local and Apache YARN are both available with CloudFoundry, Apache Mesos, and Kubernetes all currently in development.

The other integration point between Spring Cloud Task and Spring Cloud Stream is the ability for Spring Cloud Task to publish events to Spring Cloud Stream channels. Including the `spring-cloud-task-stream` dependency (as well as a Spring Cloud Stream binder of your choice) added to your project, the task will automatically emit messages both on the start and end of your task. Specifically, the task will emit the `TaskExecution` at each of those points allowing upstream applications to be notified when a task is starting as well as when it ends and the result.

## [](#integration-with-spring-batch)Integration with Spring Batch

A common use case for using Spring Cloud Task is to run Spring Batch jobs. Because of this, we've added a couple of interesting integration points between the two projects in a new module `spring-cloud-task-batch`.

The first integration point is the emission of batch informational messages via Spring Cloud Stream channels. Similar to the functionality provided by Spring XD's containers, a batch job run as a task (with the appropriate dependencies) can emit informational messages with no additional configuration. The following listeners emit events of some kind:

-   `JobExecutionListener`
-   `StepExecutionListener`
-   `ChunkListener`
-   `ItemReadListener`
-   `ItemProcessListener`
-   `ItemWriteListener`
-   `SkipListener`

The second integration point is a new `PartitionHandler`, the `DeployerPartitionHandler`. This `PartitionHandler` implementation allows workers in a remote partitioning batch job to be launched as tasks instead of being deployed in advance and being required to listen for work. This provides the benefit of having workers only deployed and running when they are doing work and should be shut down and cleaned up once that work is complete. The `DeployerPartitionHandler` delegates the launching of tasks to a Spring Cloud Deployer implementation so any deployer impl that supports task launching can be used with this new `PartitionHandler`.

## [](#more-samples)More Samples

The easiest way to understand how things work is to see them in action. Because of this, we've beefed up our samples module to provide examples of all of the functionality mentioned here as well as some of the more basic use cases. You can view our new samples on [Github](https://github.com/spring-cloud/spring-cloud-task/tree/master/spring-cloud-task-samples).

## [](#where-do-we-go-from-here)Where do we go from here?

We have a bit more work to do before we get our RC release out which should be in line with [Spring Cloud Data Flow's](http://cloud.spring.io/spring-cloud-dataflow/) related release. We'll be busy working on any final issues within Spring Cloud Task as well as providing whatever else Spring Cloud Data Flow needs.

## [](#tell-us-what-you-think)Tell us what you think!

Spring Cloud Task is a new and exciting project that we feel fills an under served area of enterprise development. However, we want to know what you think. Please let us know via the issues in [Github Issues](https://github.com/spring-cloud/spring-cloud-task/issues) , [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), or directly on [Twitter](https://twitter.com/michaelminella)!
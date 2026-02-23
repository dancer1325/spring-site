---
title: Spring Cloud Task 1.0.1.RELEASE is now available
source: https://spring.io/blog/2016/07/11/spring-cloud-task-1-0-1-release-is-now-available
scraped: 2026-02-23T19:10:55.954Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  July 11, 2016 | 5 Comments
---

# Spring Cloud Task 1.0.1.RELEASE is now available

_Releases | Michael Minella |  July 11, 2016 | 5 Comments_

We are pleased to announce the release of [Spring Cloud Task](https://cloud.spring.io/spring-cloud-task/) 1.0.1.RELEASE. This is the recommended GA release for Spring Cloud Task and is available from Maven Central as well as the usual other locations.

## [](#how-did-we-get-here)How did we get here?

Spring Cloud Task, is a step in an evolution of data applications in the Spring portfolio. As we announce this release, it may be helpful to look at how we got to this point.

### [](#it-began-with-spring-batch)It began with Spring Batch

Built upon the Spring portfolio, the evolution of this type of finite workload really began with [Spring Batch](https://projects.spring.io/spring-batch/). One of the main workload specific extensions of the Spring framework, Spring Batch provided functionality for performing finite amounts of processing in an enterprise friendly way. With multiple processing models (`Tasklet` vs Chunk) as well as scalability options that allowed for optimizing data processing both within a single JVM and using multiple JVMs. Spring Batch has served as the standard bearer of finite processing on the JVM for many years.

### [](#introducing-spring-xd)Introducing Spring XD

[Spring XD](http://projects.spring.io/spring-xd/) served as the next step in the evolution to Spring Cloud Task. Spring XD provided the ability to orchestrate Spring Batch jobs in a distributed environment. However, Spring XD, while providing a great tool for the orchestration of batch jobs, identified for us the need for a tool that was a bit more abstract than a job. When looking at use cases in the big data world (and since beyond), there are many that don't require the overhead of a batch job and so forcing that model onto processes didn't make sense. That got us thinking...

### [](#a-look-at-modern-runtimes)A look at modern runtimes

The rearchitecting of Spring XD into [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) also provided us with some insights. When looking at modern application runtimes like [Cloud Foundry](http://cloudfoundry.org/), [Mesos](http://mesos.apache.org/), [YARN](https://hadoop.apache.org/docs/r2.7.1/hadoop-yarn/hadoop-yarn-site/YARN.html), and [Kubernetes](http://kubernetes.io/), we identified that most of them provided facilities for short lived applications. However, the way a user interacted with them, tracked their results, etc was different from runtime to runtime. On Cloud Foundry, [Diego](https://docs.cloudfoundry.org/concepts/diego/diego-architecture.html) provides the concept of a task but their results are ephemeral. On YARN, there is the Job History Server that may or may not be configured. Kubernetes keeps the pods around after the job has been completed.

Providing a single consistent way of constructing finite data microservices in a platform independent way as well as providing both operational and functional features would be useful...

## [](#which-brings-us-to-spring-cloud-task)Which brings us to Spring Cloud Task

Spring Cloud Task was born out of the idea that there are functions that need to be executed in an enterprise environment that do not require a long running application.

Spring Cloud task provides the following capabilities:

-   *A simple programming model -* Spring Cloud Task builds upon [Spring Boot](http://projects.spring.io/spring-boot/) and provides additional features to it. By using the `@EnableTask` annotation, you get the capabilities of Spring Cloud Task with no additional code.
-   *A Task repository -* Spring Cloud Task provides the ability to monitor and record the results of tasks in a platform independent way. So regardless of if you're using bare metal, Cloud Foundry, Kubernetes, Mesos, etc... the way to operationalize tasks remains the same.
-   *Extension points -* Spring Cloud Task provides the ability to extend a task with listeners. This allows you to execute logic before and after your task as well as when something goes wrong.
-   *Integration with Spring Batch -* Running a Spring Batch job as a Spring Cloud Task allows for it to be dynamically managed at runtime via Spring Cloud Data Flow. Instead of having the job listening in a container waiting to be executed, Spring Cloud Task provides the ability to run batch jobs as tasks on their own or orchestrated via Spring Cloud Data Flow providing greater elasticity in your environment. Spring Cloud Task also provides a [`PartitionHandler`](http://docs.spring.io/spring-batch/apidocs/org/springframework/batch/core/partition/PartitionHandler.html) that allows the launching of workers as tasks for partitioned jobs.
-   *Integration with Spring Cloud Stream -* Spring XD provided the ability to launch jobs as well as monitor them via messages. Spring Cloud Task brings that same functionality to developers without the impact of the XD container. With the correct dependencies on the classpath, Spring Cloud Task provides the ability to have tasks and jobs (run as tasks) to emit informational messages as well as have tasks launched via messages with [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream/).

## [](#whats-new-in-the-101release)What's new in the 1.0.1.RELEASE?

All of the main features mentioned above were available in the 1.0.0.RC1 release and can be read about [here](https://spring.io/blog/2016/06/17/spring-cloud-task-1-0-0-rc1-is-now-available). What is different in this release is that the dependencies have been refactored so that instead of including `spring-cloud-task-core` and any of the additional task modules desired, you can now include just the `spring-cloud-task-starter` dependency and the other spring modules you want to obtain the expected functionality.

For example, if a developer wants to write a batch job that is run as a task, instead of needing the `spring-cloud-task-core`, `spring-cloud-task-batch`, and `spring-boot-starter-batch` in your pom, now you only need the `spring-cloud-task-starter` and the `spring-boot-starter-batch`. The batch features will be automatically bootstrapped for you (with simple options for overrides as with all Boot autoconfig).

## [](#where-to-from-here)Where to from here?

Spring Cloud Task is now GA and we're excited to hear from you. Our short-term focus will be to improve Spring Cloud Task's interoperability with Spring Cloud Data Flow and the runtimes it supports. However, we look forward to hearing from you in the comments below, elsewhere online on [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task) and [Twitter](https://twitter.com/i/notifications), as well as in person at [Spring One Platform](https://springoneplatform.io/) next month!
---
title: Introducing Spring Cloud Task
source: https://spring.io/blog/2016/01/27/introducing-spring-cloud-task
scraped: 2026-02-23T19:29:57.617Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  January 27, 2016 | 15 Comments
---

# Introducing Spring Cloud Task

_Releases | Michael Minella |  January 27, 2016 | 15 Comments_

Today we are pleased to introduce a new project in the Spring portfolio, [Spring Cloud Task](http://cloud.spring.io/spring-cloud-task/). Under the umbrella of the [Spring Cloud](http://projects.spring.io/spring-cloud/) grouping of projects and the sister project of [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/), Spring Cloud Task aims to bring functionality required to support short lived microservices to Spring Boot based applications. With this blog post, we are releasing our first milestone of the project and are eager for your input and feedback.

## The Goals of Spring Cloud Task

In most cases, the modern cloud environment is designed around the execution of processes that are not expected to end (think web applications or stream modules). If they do, it's considered a failure by the platform and they are typically restarted. While many platforms do have some method to execute a process that is expected to end (a batch job for example), the results of that execution are typically not maintained in a consumable way. Yet for mission critical applications, even though they are short lived, they still have the same non-functional requirements long lived processes have.

While this functionality is useful in a cloud environment, the same issues can arise in a traditional deployment model as well. When executing Spring Boot applications via a scheduler like cron, it can be useful to be able to monitor the results of the application after it’s completion.

A Spring Cloud Task takes the approach that a Spring Boot application can have a start and an end and still be production grade. Batch applications are just one example of where short lived processes can be helpful.

## Getting Started

In this first release of Spring Cloud Task, we introduce the basics of the configuration mechanisms as well as a repository to record what happens when a task is executed. Those who are familiar with [Spring Batch](http://projects.spring.io/spring-batch/) and its job repository should find the general paradigms of Spring Cloud Task familiar.

To get familiar with Spring Cloud Task, the easiest way is to write an application. The documentation walks you through the creation of an initial task and its execution. You can read more about that [here](http://docs.spring.io/spring-cloud-task/1.0.0.M1/reference/htmlsingle/#getting-started-developing-first-task).

## Where we're going

Tasks will be a new primitive within [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) in the coming releases allowing users to execute virtually any Spring Boot application as a short lived task. This provides the flexibility to run everything from a simple `CommandLineRunner` to a full batch job in dynamic way, allowing resources to be consumed on demand and returned once complete. The upcoming releases including Spring Cloud Task 1.0 GA which we plan for just before Spring Cloud Data Flow goes 1.0 GA, will be adding features to support that effort.

## Tell us what you think!

Spring Cloud Task is a new and exciting project that we feel fills an under served area of enterprise development. However, we want to know what you think. Please let us know via the issues in [Github Issues](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/questions/tagged/spring-cloud), or directly on [Twitter](http://twitter.com/springcentral)!
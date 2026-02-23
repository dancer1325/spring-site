---
title: Spring Batch and Spring Batch Admin Releases
source: https://spring.io/blog/2015/01/16/spring-batch-and-spring-batch-admin-releases
scraped: 2026-02-23T22:00:25.295Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  January 16, 2015 | 11 Comments
---

# Spring Batch and Spring Batch Admin Releases

_Releases | Michael Minella |  January 16, 2015 | 11 Comments_

We are pleased to announce a number of Spring Batch related releases today. A bug fix release for Spring Batch, a bug fix release for Spring Batch Admin and a milestone release for the new version of Spring Batch Admin are all now available.

## Spring Batch 3.0.3

Spring Batch 3.0.3 represents the latest maintenance release for Spring Batch, addressing a number of enhancements and minor bug fixes. New features in Spring Batch 3.0.3 include:

### Improved Support For JSR-352 Custom Infrastructures

Before this release, the only way to override the infrastructure provided by Spring Batch out of the box for JSR-352 configured jobs was to include the configuration in the job's context. This prevented the ability to configure a global override for really shared components. With 3.0.3, you can now specify the location of a Spring configuration via a System property that can override the existing infrastructure.

### Optional Polling For Partitioned Results

When using remote partitioning, the master needs a way to be notified that the slave partitions have completed their work. Historically that has been accomplished by each slave replying to the master, the results being aggregated, and then the master being notified that all the slaves have completed. However, this required extra configuration that may not be necessary. Since the slaves in a partitioned job maintain their state in the same job repository that the master does, the master can just poll the job repository to see if the slaves are complete. This release adds the ability to configure the `MessageChannelPartitionHandler` to poll the job repository instead of waiting for response messages. You can read more about the configuration of this new feature in the documentation for the [`MessageChannelPartitionHandler`](http://docs.spring.io/spring-batch/trunk/apidocs/org/springframework/batch/integration/partition/MessageChannelPartitionHandler.html).

This isn't a complete list of updates, but highlight the major new features. You can see exactly what changed in Spring Batch's Jira issue tracker here: [https://jira.spring.io/browse/BATCH/](https://jira.spring.io/browse/BATCH/)

## Spring Batch Admin

### 1.3.1

The first of two Spring Batch Admin releases we are making available today is the first maintenance release for the Spring Batch Admin 1.3 line. This release addresses a number of minor bugs, the list of which can be found in Jira here: [https://jira.spring.io/browse/BATCHADM/](https://jira.spring.io/browse/BATCHADM/)

### 2.0.0.M1

The biggest question I received at SpringOne2GX this past year was "What's going on with Spring Batch Admin?" Spring Batch Admin had its last update in July (shortly before SpringOne2GX last year), but it wasn't much of a feature upgrade. It was released to update the dependencies and address some bugs. Since then, we've been hard at work updating a number of features to bring Spring Batch Admin up to date. Today we announce the first milestone towards that goal.

#### JSR-352 Support

Spring Batch Admin, as part of the 2.0.0.M1 release, will now support JSR-352 configured jobs. By dropping your XML based configuration in the `/META-INF/batch-jobs` directory as the spec requires, Spring Batch Admin will load the job to be launchable by the REST endpoints and the current UI. All of the monitoring aspects provided by Spring Batch Admin (viewing the executions, start/stop/restart, etc) are available.

#### Java Configuration Support

As the shift within the Spring community has been going from XML based configuration to java based configuration, Spring Batch Admin is keeping up. As of this release, Spring Batch Admin supports the configuration of a package to scan for java configured Spring Batch jobs. As with any other batch jobs, these will be loaded and available for execution just like their XML counterparts.

It's important to note, that while Spring Batch Admin now supports java based configuration, you won't want to use `@EnableBatchProcessing` with it. There's a reason for that. `@EnableBatchProcessing` provides a collection of infrastructure that is already provided out of the box by Spring Batch Admin. Configuring jobs via java config for use within Spring Batch Admin is exactly the same as if you were using `@EnableBatchProcessing`...without using that annotation. You still get the ability to autowire the `JobBuilderFactory` and `StepBuilderFactory` just like you normally would.

#### REST Endpoint Updates

As part of the work the Spring XD team has been doing in their administration UI, they have created a completely new set of batch related REST endpoints. This release migrates those endpoints into Spring Batch Admin for all to consume. Off of the `/batch` path lives a collection of endpoints that provide functionality similar to the existing REST API, however goes much further. The new API follows HATEOAS principles allowing for API discovery and traversal. While the support of HATEOAS is a work in progress, this release provides a look into where we're going with this.

#### The Future of Spring Batch Admin

Like all of the Spring projects, we strive to make things backwards compatible as much as reasonable possible. Because of that, Spring Batch Admin 2.0 is undergoing some major changes to allow backwards compatibility in the future. These changes include, the removal of an "official" UI, and deprecation of the older version of the REST API. *This release does not contain any of these changes.* These changes will be coming before Spring Batch Admin 2.0 is generally available. It is our desire to be open and transparent as to the direction of the project.

Anyone that has followed the rate of change in the UI space over the past few years can quickly discern that picking a modern front-end technology and being able to maintain backwards compatibility for the foreseeable future is not possible right now. The rate of breaking changes is just too great right now. When factoring this into our desire to provide tools at the forefront of their related space, we've decided to remove the UI as a formal part of the project. That being said, we still understand that a client is an important piece of what Spring Batch Admin brings to the table. Because of this, it is our plan to provide a collection of sample projects that demonstrate a couple different client options. This will allow us to evolve client options independently of the core framework/API in a way that doesn't prevent us from being backwards compatible.

We will also be deprecating the older version of the REST API. The new API takes a step forward in the REST API maturity model, moving from basic CRUD over HTTP to support for true resources. While the new REST endpoints are still a work in progress, once they are feature complete, we will deprecate the old ones to focus development efforts on improving and evolving the new set.

### Where We Go From Here

We will continue to work on the changes mentioned above and currently plan on another release early in the second quarter of this year. We are excited about the future of Spring Batch Admin and look forward to your feedback in [Jira](https://jira.spring.io/browse/BATCH/), [Github](https://github.com/spring-projects/spring-batch), [StackOverflow](http://stackoverflow.com/tags/spring-batch/info), and social media!
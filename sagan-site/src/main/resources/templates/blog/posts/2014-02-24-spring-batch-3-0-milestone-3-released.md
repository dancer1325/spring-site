---
title: Spring Batch 3.0 Milestone 3 Released
source: https://spring.io/blog/2014/02/24/spring-batch-3-0-milestone-3-released
scraped: 2026-02-24T07:40:23.811Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  February 24, 2014 | 7 Comments
---

# Spring Batch 3.0 Milestone 3 Released

_Releases | Michael Minella |  February 24, 2014 | 7 Comments_

Today we are pleased to announce the final milestone release towards Spring Batch 3.0 ([download](http://s3.amazonaws.com/dist.springframework.org/milestone/BATCH/spring-batch-3.0.0.M3-no-dependencies.zip)). This release demonstrates our support of JSR-352 and currently supports all its required features. We also added a number of new features to Spring Batch for existing Spring Batch users. Spring Batch is a lightweight, comprehensive framework for the development of robust batch applications.

## Features in Milestone 3

As the final milestone for the Spring Batch 3.0.0 release, all major features for this release are complete. The major features for this release include:

-   JSR-352 support
-   Promote Spring Batch Integration to Spring Batch
-   Upgrade to support Spring 4 and Java 8
-   Other fixes and improvements

## JSR-352 Support

Spring has invested a large amount of time and resources in our contribution to this spec. Our collaboration with the other industry experts via the JCP, JSR-352 validates that the batch patterns that Spring Batch has implemented and battle tested over the past six years in countless production environments is the best approach for building mission critical batch applications in the enterprise.

3.0.0.M3 is the first release of Spring Batch that is compliant with JSR-352 in that it passes all 152 of the SE TCK tests. The Spring Batch implementation of JSR-352 allows users to use the familiar components of Spring Batch and still maintain compliance with java standards. Spring Batch supports the configuration of jobs via the JSR-352 based XML, injection of batch artifacts developed against the javax.batch.\* interfaces using the injection methods defined in the JSR (Spring's dependency injection, batch.xml, and inline configuration), as well as all scalability options provided in JSR-352 (splits and partitioning via threads).

Our goal for our implementation was simple: follow the rules of the JSR without breaking the rules already defined by Spring Batch. In other words, implement the specification without impacting existing Spring Batch users. We have done this by providing two "paths" for implementing batch jobs. The first is the traditional Spring Batch way. Using the Spring Batch XML or Spring's java configuration, developing against the Spring Batch interfaces, etc. This will not change as part of the 3.0 release. The second "path" is the JSR path. This method of development uses the JSR-352 defined XML schema to configure your jobs, uses the JSR's `JobOperator` for launching jobs and managing the metadata, and developers write code against the JSR's APIs. It is important to note that these are two distinctly different paths. While using Spring Batch components will work with JSR-352 based jobs, their use within those contexts will be dictated by the JSR's rules. An example of this would be the injection of the contexts defined in JSR-352 (`StepContext` and `JobContext`). If a job is configured using traditional Spring Batch methods and launched the via regular Spring Batch components, those contexts will not be available to the batch artifacts. However, if you configure the job via the JSR-352 XML and launch it via the JSR-352 `JobOperator`, those contexts will be injected where appropriate.

It is important to point out that Spring Batch does not just implement JSR-352. It goes much further than the spec in a number of ways:

-   Components - Spring Batch provides 17 different `ItemReader` implementations, 16 `ItemWriter` implementations, and many other components that have years of testing in production environments under their belts.
-   Scalability - JSR-352 provides scaling options for a single JVM only (partitioning and splits both via threads). Spring Batch provides multi-JVM scalability options including remote partitioning and remote chunking.
-   Spring dependency injection - While JSR-352 provides a form of "dependency injection light", there are a number of limitations that it places on the construction of batch artifacts (must use no-arg constructors for example). Spring Batch is built on Spring and benefits from the power of the Spring Framework's capabilities.
-   Java based configuration - While Spring's XML based configuration options are well known, Spring and specifically Spring Batch, provide the option to configure your jobs using the type safety of java based configuration.
-   Hadoop/Big Data integration - Spring Batch is a foundational tool for interacting with Hadoop and other big data stores in the Spring ecosystem. Spring for Apache Hadoop provides a number of batch related extensions to use Spring Batch to orchestrate work on a Hadoop cluster. Spring XD builds on Spring Batch by providing both execution capabilities, but also management functionality similar to Spring Batch Admin for any environment.

Spring will continue to participate in the evolution of JSR-352 as it goes through maintenance revisions and look forward to further contributions to the JCP process.

## Promote Spring Batch Integration to Spring Batch

Spring Batch Integration has been a little known sub project of Spring Batch Admin for a few years now. However, given how powerful the features this library provides and it's usefulness in enterprise development, we decided to move it from under the Spring Batch Admin umbrella to under the Spring Batch umbrella. Designed to provide useful components that bridge batch and integration processing, Spring Batch Integration provides a number of options for launching and scaling batch applications. Features include:

-   Asynchronous ItemProcessor/ItemWriter - Executes the `ItemProcessor` logic on another thread, returning a `Future` to the `ItemWriter`. Once the `Future` returns, the result is written.
-   `JobLaunchingMessageHandler`/`JobLaunchingMessageGateway` - Provides the ability to launch jobs via Spring Messages received over channels.
-   Remote Chunking - Provides the ability to execute `ItemProcessor` logic remotely (across multiple JVMs) via a master/slave configuration.
-   Remote Partitioning - Provides the ability to execute full chunks remotely (read/process/write across multiple JVMs) via a master/slave configuration.

These components have allowed Spring Batch applications to seamlessly integrate and scale in many enterprises.

## Upgrade to support Spring 4 and Java 8

As part of our efforts to keep dependencies up to date, we have updated Spring Batch and it's various modules to support Spring 4. Because of these updates, Spring 4 will be the minimum supported version of Spring for Spring Batch 3.0.0.M3. This not only brings along the numerous list of new features found in Spring 4, but it also provides the ability to run on Java 8 immediately.

## Other fixes and improvements

Beyond the above large new features, we have also added some smaller features and continued to fix bugs. New features we added include the addition of a `JobScope` and support for SQLite.

## Roadmap to a release candidate

So what's left? As we approach our release candidate, there is still some minor work to be done. We are still taking a hard look at the dependencies for Spring Batch and looking to upgrade as many as possible.

## Conclusion

3.0.0.M3 marks a key milestone for Spring Batch. It allows developers to test out the JSR-352 based functionality while still having the foundation of Spring and Spring Batch to rely upon. It also brings new features to the framework. We look forward to your comments and feedback in the forums, in social media, and in person!
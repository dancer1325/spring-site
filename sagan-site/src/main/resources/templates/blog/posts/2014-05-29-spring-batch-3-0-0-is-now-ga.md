---
title: Spring Batch 3.0.0 is now GA
source: https://spring.io/blog/2014/05/29/spring-batch-3-0-0-is-now-ga
scraped: 2026-02-23T22:28:27.468Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  May 29, 2014 | 8 Comments
---

# Spring Batch 3.0.0 is now GA

_Releases | Michael Minella |  May 29, 2014 | 8 Comments_

Today we are pleased to announce the release of Spring Batch 3.0. This release of Spring Batch provides support for JSR-352 - we are committed to providing that support, as well as a number of new features for our existing Spring Batch community.

## Features in Spring Batch 3.0

The major features for this release include:

-   JSR-352 support
-   Promotion of Spring Batch Integration into Spring Batch
-   Complete overhaul of dependencies
-   Support for SQLite
-   Job scope
-   Removal of "archetypes" in favor of Spring Boot
-   Switch from Maven to Gradle for building Spring Batch

## JSR-352 Support

Providing one of the most important new features in JEE7, JSR-352 brings standardization of batch processing to the java stack. The Spring team not only provided extensive input into the spec with two team members on the expert group, but Spring Batch served as the inspiration for most of the programming model. Spring Batch 3.0 continues the Spring commitment to JSR-352 by providing the most production tested code base to implement this specification.

It's important to note the differences between JSR-352 and Spring Batch. JSR-352 provides three things:

-   An API for building batch components
-   An XML based DSL for configuring batch components
-   A contract of how batch components interact

JSR-352 does not provide any *implementations* of batch components. Spring Batch provides 17 readers, 16 writers and countless other utilities and extensions that have been tested for years in enterprise production environments. Spring Batch provides scalability options beyond a single JVM. Finally Spring Batch provides big data support both through the Spring for Apache Hadoop project and as a cornerstone of Spring XD.

To read more about Spring Batch's implementation of JSR-352, visit our reference documentation here: [http://docs.spring.io/spring-batch/trunk/reference/html/jsr-352.html](http://docs.spring.io/spring-batch/trunk/reference/html/jsr-352.html)

## Promote Spring Batch Integration to Spring Batch

From the outside looking in, it can be confusing to determine when to use Spring Batch and when to use Spring Integration. To be truthful, there isn't always a solid either/or answer. In many cases, the combination of the two technologies is the best option to provide robust, scalable solutions. This is why Spring Batch Integration was developed. A collection of Spring Batch extensions, this module allows developers to use Spring Integration to extend the power of Spring Batch. Functionality like multi-JVM scalability and message driven job launching are provided with no custom code and minimal configuration with this module.

The functionality provided in Spring Batch Integration extend batch processing beyond what JSR-352 provides capabilities to provide robust, enterprise grade solutions. You can read more about Spring Batch Integration and it's components in the reference documentation here: [http://docs.spring.io/spring-batch/trunk/reference/html/springBatchIntegration.html](http://docs.spring.io/spring-batch/trunk/reference/html/springBatchIntegration.html).

## Complete overhaul of dependencies

As part of an ongoing effort across the Spring portfolio, the Spring Batch third party dependencies have been updated. This allows users of Spring Batch to use the latest and greatest of the libraries they trust with Spring Batch.

## Support for SQLite

Most integration test scenarios use HSQLDB as a datasource due to its ability to easily create in-memory databases. However, there are times when a simple, single file, option would be nicer. For that reason, we have added SQLite as a supported database for the Spring Batch repository.

## Job scope

Spring Batch provides two custom bean scopes. The first, step scope, has been around for years as a way to delay bean initialization until the step the bean is used by is executed. With Spring Batch 3.0, we've added a job scope. This will allow the ability to lazily initialize job level components (JobExecutionListeners for example) as well as provide functionality like job parameter injection to those components. You can read more about the job scope in the reference manual here: [http://docs.spring.io/spring-batch/trunk/reference/html/configureStep.html#job-scope](http://docs.spring.io/spring-batch/trunk/reference/html/configureStep.html#job-scope).

## Removal of "archetypes" in favor of Spring Boot

Spring Batch has traditionally provided a sample maven project as a way to bootstrap a Spring Batch project. With Spring Boot, we've removed those projects in favor of using the dynamic bootstrapping capabilities that Spring Boot provides. We believe that Boot provides a far superior option to what the old "archetypes" provided.

## Move from Maven to Gradle

Finally, this release is the first for Spring Batch to move from Maven to Gradle for an internal build system. This change will have zero effect on developers consuming the jars. They will still be available via Maven Central for maven users.

## Looking forward

With this release, we look forward to planning and developing our 3.1 release. The 3.1 release will have two major themes: simplification and supporting the Spring XD efforts.

For the simplification side, we want to improve the usability of Spring Batch to a point where it can be considered for less "heavy" processes. By focusing here, it allows developers to "grow" a solution. Many times things that start out as simple scripts and evolve into processes enterprises need to lean on for mission critical functionality. We want Spring Batch to be a consideration at the script stage so that when that functionality needs an enterprise grade solution, it's already there.

Beyond core Spring Batch functionality, Spring Batch serves as a core technology for Spring XD. We will continue to expand Spring Batch's capabilities to support big data solutions through Spring XD and Spring for Apache Hadoop.

## Conclusion

3.0.0 represents the completion of the next major milestone for Spring Batch. It brings the standards that JSR-352 provides to our community as well as providing an exhaustive collection of additional features for the advanced user. We look forward to your feedback in the forums, social media, and in person at [SpringOne2GX](http://springone2gx.com/register)!
---
title: Spring Batch 3.0.0.RC1 is now available
source: https://spring.io/blog/2014/05/13/spring-batch-3-0-0-rc1-is-now-available
scraped: 2026-02-23T22:33:01.567Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  May 13, 2014 | 0 Comments
---

# Spring Batch 3.0.0.RC1 is now available

_Releases | Michael Minella |  May 13, 2014 | 0 Comments_

Today we are pleased to announce the release candidate for Spring Batch 3.0. This release of Spring Batch provides the support for JSR-352 we are committed to providing as well as a number of new features for our existing Spring Batch community.

## Features in Release Candidate 1

The major features for this release include:

-   JSR-352 support
-   Promotion of Spring Batch Integration into Spring Batch
-   Complete overhaul of dependencies
-   Support for SQLite
-   Job scope
-   Switch from Maven to Gradle for building Spring Batch

## JSR-352 Support

JSR-352 is the batch JSR and was released as 1.0 late last year. As Spring Batch served as the inspiration for much of the programming model of this JSR, Spring is committed to supporting it. With the 3.0 release, Spring Batch is compliant with JSR-352 passing all TCK tests. It provides the most production-tested implementation of the JSR.

Creating batch jobs that comply with the standards of this JSR should feel very familiar to users of Spring Batch. The XML configuration and interfaces are very similar to the existing Spring Batch. Below is an example JSR-352 batch job

\`\`\`xml \`\`\`

Spring Batch's implementation of JSR-352 was developed to allow the most flexibility for existing Spring Batch users. We allow developers to use existing ItemReader, ItemProcessor, ItemWriters, etc in conjunction with the configuration facilities that JSR-352 provides. This provides developers a complete library of production-tested components for building robust batch jobs.

To read more about Spring Batch's implementation of JSR-352, visit our reference documentation here: [http://docs.spring.io/spring-batch/trunk/reference/html/jsr-352.html](http://docs.spring.io/spring-batch/trunk/reference/html/jsr-352.html)

## Promote Spring Batch Integration to Spring Batch

The line between when to use Spring Batch or Spring Integration is often a blurry one. There are many use cases where one works better than the other. However, there are also many use cases where they can be used together to build robust and scalable data processing systems. Spring Batch Integration provides a collection of components to use Spring Batch and Spring Integration together. Use cases that Spring Batch Integration provide for include:

-   Asynchronous item processing
-   Remote chunking
-   Launching batch jobs via messages
-   Remote partitioning

These capabilities take batch processing beyond what JSR-352 provides and allows users to develop batch applications that scale beyond a single JVM. You can read more about Spring Batch Integration and it's components in the reference documentation here: [http://docs.spring.io/spring-batch/trunk/reference/html/springBatchIntegration.html](http://docs.spring.io/spring-batch/trunk/reference/html/springBatchIntegration.html).

## Complete overhaul of dependencies

We took this opportunity to review all third party dependencies for Spring Batch and bring them up to date. As part of this exercise, we also brought them in alignment with the other projects in the Spring portfolio to allow for the easiest experience in adding Spring Batch to an existing application (or adding other projects to a Spring Batch project).

## Support for SQLite

While HSQLDB is useful for many testing scenarios, a file based system like SQLite can also be very useful. With the 3.0 release we have added the job repository DDL for SQLite to address these use cases.

## Job scope

Spring Batch's step scope allows developers to delay the creation of objects until a particular step is executed. This functionality has also exposed the ability to provide late binding of properties in batch artifacts. With this 3.0 release, Spring Batch introduces a Job scope. This scope works in the same way as the step scope (delays the creation of objects via proxies), however it delays the creation until the job executes instead of the step. This can be helpful when defining multiple jobs in a context or when heavy weight initialization processes occur in step level components. You can read more about the job scope in the reference manual here: [http://docs.spring.io/spring-batch/trunk/reference/html/configureStep.html#job-scope](http://docs.spring.io/spring-batch/trunk/reference/html/configureStep.html#job-scope).

## Move from Maven to Gradle

Finally, this release is the first for Spring Batch to move from Maven to Gradle for an internal build system. This change will have zero effect on developers consuming the jars. They will still be available via Maven Central for maven users.

## Conclusion

3.0.0.RC1 represents the completion of the next major milestone for Spring Batch. It brings the standards that JSR-352 provides to our community as well as providing an exhaustive collection of additional features for the advanced user. We look forward to your feedback in the forums, social media, and in person at [SpringOne2GX](http://springone2gx.com/register)!
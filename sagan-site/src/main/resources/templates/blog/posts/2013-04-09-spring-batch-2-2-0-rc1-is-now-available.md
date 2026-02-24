---
title: Spring Batch 2.2.0 RC1 is now available
source: https://spring.io/blog/2013/04/09/spring-batch-2-2-0-rc1-is-now-available
scraped: 2026-02-24T08:06:14.925Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  April 09, 2013 | 0 Comments
---

# Spring Batch 2.2.0 RC1 is now available

_Releases | Michael Minella |  April 09, 2013 | 0 Comments_

We are pleased to announce that Spring Batch 2.2.0.RC1 is now available via the SpringSource Milestone repository. [Spring Batch Home](http://www.springsource.org/spring-batch) | [Source on GitHub](https://github.com/SpringSource/spring-batch) | [Reference Documentation](http://static.springsource.org/spring-batch/)

## Support for Spring Data

[Spring Data](http://www.springsource.org/spring-data) is a collection of projects intended to make it easier to develop Spring-powered applications that use new data access technologies such as non-relational databases. Based on a model of exposing [Repository](http://static.springsource.org/spring-data/commons/docs/current/api/org/springframework/data/repository/Repository.html) objects, Spring Data allows applications to access data in a simple and consistent way across many new platforms. Spring Batch 2.2.0.RC1 now provides `ItemReader` and `ItemWriter` implementations for a number of the data stores supported by Spring Data including MongoDB, Neo4j, and Gemfire (write only). In addition, Spring Batch 2.2.0.RC1 now has a `RepositoryItemReader` and `RepositoryItemWriter` that will read and write items from custom Spring Data `Repository` implementations.

## Java Configuration

With this release, Spring Batch 2.2.0.RC1 now supports Java based job definitions. Building a job definition with java configuration is now available via the new `@EnableBatchProcessing` annotation and a collection of builders that allow you to construct jobs, steps, flows, splits, etc. By using the `@EnableBatchProcessing` annotation the following features are enabled:

-   Creation of StepScope - Allowing the configuration of beans via `@Scope("step")`
-   `@Autowired` - A `JobRepository`, `JobLauncher`, `JobRegistry`, `PlatformTransactionManager`, `JobBuilderFactory` and `StepBuilderFactory` are all available to be autowired into your context.

## Non-identifying Job Parameters

Spring Batch 2.2.0.RC1 now supports the use of job parameters that do not contribute to the generation of a JobInstance's identity. As part of this update, the `JobParameters` is no longer associated with a `JobInstance` and is now associated with a `JobExecution`. To support this change, the job repository schema has updated and a migration script has been provided. You can read the details about the migration script in the [Getting Started Guide](http://static.springsource.org/spring-batch/getting-started.html).

## Other Improvements and Bug Fixes

With the release of Spring Batch 2.2.0.RC1, a host of other improvements and bug fixes have been added. The complete list of updates for this release can be found in the [changelog](http://static.springsource.org/spring-batch/migration/index.html) for this revision.

## Links

[Spring Batch Home](http://www.springsource.org/spring-batch) | [Source on GitHub](https://github.com/SpringSource/spring-batch) | [Reference Documentation](http://static.springsource.org/spring-batch/)
---
title: Spring Batch 5.0.0-M5 is available now!
source: https://spring.io/blog/2022/08/24/spring-batch-5-0-0-m5-is-available-now
scraped: 2026-02-23T10:43:00.079Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  August 24, 2022 | 2 Comments
---

# Spring Batch 5.0.0-M5 is available now!

_Releases | Mahmoud Ben Hassine |  August 24, 2022 | 2 Comments_

I am pleased to announce that Spring Batch `5.0.0-M5` is now available from our [milestone repository](https://repo.spring.io/milestone). The main theme of this milestone is improving testing support in Spring Batch. This post walks through the major changes in this area as well as other changes introduced in this milestone release. For the complete list of changes, see the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M5).

## [](#test-utilities-configuration-updates)Test utilities configuration updates

Up to version 4.3, the `JobLauncherTestUtils` used to autowire the job under test with the goal of facilitating the test setup. But what if multiple jobs are defined in the test context? And what if no `Job` beans are defined at all? So while this autowiring was convenient for most cases, it turned out to cause several issues in the aforementioned situations. In this release, and based on community feedback, we have decided to remove the autowiring of any job in `JobLauncherTestUtils`.

Similarly, the `JobRepositoryTestUtils` used to autowire a `DataSource` from the application context. Again, what if no data source or multiple data sources are defined in the test context? In this version, the `JobRepositoryTestUtils` was updated to work against the `JobRepository` interface, without having to deal with any implementation details of the repository (such as a data source, for example).

If you define those utility beans manually in your test context or import them through `@SpringBatchTest`, you would manually set the job under test or the test data source when multiple beans of those types are defined in your test context.

## [](#migration-to-junit-jupiter)Migration to JUnit Jupiter

In this milestone release, the entire test suite of Spring Batch was migrated to JUnit 5. While this does not impact end users directly, it helps the Batch team as well as community contributors to use the next generation of JUnit to write better tests.

## [](#improved-documentation)Improved documentation

In this milestone release, the documentation was updated to use the [Spring Asciidoctor Backend](https://github.com/spring-io/spring-asciidoctor-backends). This backend ensures that all projects from the portfolio follow the same documentation style. For consistency with other projects, the reference documentation of Spring Batch was updated to use this backend in this release. You can check the new version of the reference documentation [here](https://docs.spring.io/spring-batch/docs/5.0.0-M5/reference/html/).

## [](#deprecations-and-api-changes)Deprecations and API changes

This release includes a number of deprecations and API changes.

### [](#deprecations)Deprecations

This milestone release introduces the following deprecations:

-   The Hibernate (cursor/paging) item reader and item writer were deprecated in favor of using the JPA-based ones.
-   The `org.springframework.batch.test.AssertFile` utility class was deprecated in favor of similar utilities provided by modern test libraries.

### [](#api-changes)API changes

In this release, we introduced a breaking change in the `ItemWriter` interface:

```
Copypublic interface ItemWriter<T> {

-- void write(List<? extends T> items) throws Exception;
++ void write(Chunk<? extends T> items) throws Exception;

}
```

While this change seems small, we believe it has a huge added value in terms of better encapsulation and consistency in using a coherent language across different areas and APIs of the framework. The `ItemWriteListener` API was changed to use the `Chunk` API as well.

As the `Chunk` API implements `java.lang.Iterable`, this change does not impact any client code that iterates over the list of items. Moreover, this change does not impact any example that uses a lambda expression to define an `ItemWriter`, as the type of the items is inferred. See the [migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide) for all details about the changed APIs.

## [](#dependencies-upgrades)Dependencies upgrades

Major dependencies have been upgraded to the following versions:

-   Upgrade to Spring Framework 6.0.0-M5
-   Upgrade to Spring Data 2022.0.0-M5
-   Upgrade to Spring Integration 6.0.0-M4
-   Upgrade to Spring AMQP 3.0.0-M3
-   Upgrade to Spring for Apache Kafka 3.0.0-M5
-   Upgrade to Micrometer 1.10.0-M4
-   Upgrade to Hibernate 6.1.2.Final

## [](#feedback)Feedback

We would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 5, we look forward to your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch) and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-M5/reference/html/index-single.html)
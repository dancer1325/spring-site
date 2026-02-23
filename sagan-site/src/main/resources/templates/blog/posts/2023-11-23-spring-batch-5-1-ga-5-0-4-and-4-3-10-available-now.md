---
title: Spring Batch 5.1 GA, 5.0.4 and 4.3.10 available now!
source: https://spring.io/blog/2023/11/23/spring-batch-5-1-ga-5-0-4-and-4-3-10-available-now
scraped: 2026-02-23T09:07:35.337Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  November 23, 2023 | 0 Comments
---

# Spring Batch 5.1 GA, 5.0.4 and 4.3.10 available now!

_Releases | Mahmoud Ben Hassine |  November 23, 2023 | 0 Comments_

On behalf of the team and all contributors, I am pleased to announce that Spring Batch 5.1.0, 5.0.4 and 4.3.10 are now available from Maven Central repository.

Versions 5.0.4 and 4.3.10 are drop-in replacements for their respective previous patch releases and come with bug fixes, documentation improvements and dependency updates. You can find the complete list of changes in the release notes: [5.0.4](https://github.com/spring-projects/spring-batch/releases/tag/v5.0.4) and [4.3.10](https://github.com/spring-projects/spring-batch/releases/tag/4.3.10).

This blog post is more about Spring Batch 5.1, which includes a number of improvements and new features:

-   Dependencies upgrade
-   Virtual Threads support
-   Memory management improvement in the `JpaItemWriter`
-   New synchronized decorators for item readers and writers
-   New cursor-based `MongoItemReader`
-   Bulk inserts support in `MongoItemWriter`
-   New item reader and writer for Redis
-   Automatic configuration of `JobRegistryBeanPostProcessor`
-   Ability to start a job flow with a decision
-   Ability to provide a custom `JobKeyGenerator`
-   MongoDB Job Repository (Experimental)
-   Composite Item Reader (Experimental)
-   New documentation based on Antora
-   Revamped samples
-   Enhanced issue reporting guide

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.1.0).

## [](#dependencies-upgrade)Dependencies upgrade

This release upgrades Spring dependencies to the following versions:

-   Spring Framework 6.1.0
-   Spring Integration 6.2.0
-   Spring Data 3.2.0
-   Spring Kafka 3.1.0
-   Spring AMQP 3.1.0
-   Spring LDAP 3.2.0
-   Micrometer 1.12.0

## [](#virtual-threads-support)Virtual Threads support

Embracing JDK 21 LTS is one of the main themes for Spring Batch 5.1, especially the support of virtual threads from Project Loom. In this release, virtual threads can be used in all areas of the framework, like running a concurrent step with virtual threads or launching multiple steps in parallel using virtual threads.

Thanks to the well designed separation of concerns in Spring Batch, threads are not managed directly. Thread management is rather delegated to `TaskExecutor` implementations from Spring Framework. This programming to interface approach allows you to switch between `TaskExecutor` implementations in a transparent and a flexible way.

In Spring Framework 6.1, a new `TaskExecutor` implementation based on virtual threads has been introduced, which is the `VirtualThreadTaskExecutor`. This `TaskExecutor` can be used in Spring Batch wherever a `TaskExecutor` is required. The following example shows how to configure a multi-threaded step using virtual threads:

```java
Copy@Bean
public VirtualThreadTaskExecutor taskExecutor() {
	return new VirtualThreadTaskExecutor("spring-batch-");
}

@Bean
public Step step(JobRepository jobRepository, PlatformTransactionManager transactionManager,
				 ItemReader<Integer> itemReader, ItemWriter<Integer> itemWriter,
				 VirtualThreadTaskExecutor taskExecutor) {
	return new StepBuilder("step", jobRepository).<Integer, Integer>chunk(2, transactionManager)
		.reader(itemReader)
		.writer(itemWriter)
		.taskExecutor(taskExecutor)
		.build();
}
```

## [](#memory-management-improvement-in-the-jpaitemwriter)Memory management improvement in the JpaItemWriter

When using the `JpaItemWriter`, the JPA persistence context can quickly grow when the chunk size is large enough. This might lead to `OutOfMemoryError` errors if not cleared appropriately in a timely manner.

In this milestone release, a new option named `clearPersistenceContext` has been introduced in the `JpaItemWriter` to clear the persistence context after writing each chunk of items. This option improves the memory management of chunk-oriented steps dealing with large amounts of data and configured with a big chunk size.

## [](#new-synchronized-decorators-for-item-readers-and-writers)New synchronized decorators for item readers and writers

Up to version 5.0, Spring Batch provided two decorators `SynchronizedItemStreamReader` and `SynchronizedItemStreamWriter` to synchronize thread access to `ItemStreamReader#read` and `ItemStreamWriter#write`. Those decorators are useful when using non thread-safe item streams in multi-threaded steps.

While those decorators work with `ItemStream` implementations, they are not usable with non-item streams. For example, those decorators cannot be used to synchronize access to `ListItemReader#read` or `KafkaItemWriter#write`.

For users convenience, this release introduces new decorators for non-item streams as well. With this new feature, all item readers and writers in Spring Batch can now be synchronized without having to write custom decorators.

## [](#new-cursor-based-mongoitemreader)New cursor-based MongoItemReader

Up to version 5.0, the `MongoItemReader` provided by Spring Batch used pagination, which is based on MongoDB's `skip` operation. While this works well for small/medium data sets, it starts to perform poorly with large data sets.

This release introduces the `MongoCursorItemReader`, a new cursor-based item reader for MongoDB. This implementation uses cursors instead paging to read data from MongoDB, which improves the performance of reads on large collections.

For consistency with other cursor/paging readers, the current `MongoItemReader` has been renamed to `MongoPagingItemReader`.

## [](#bulk-inserts-support-in-mongoitemwriter)Bulk inserts support in MongoItemWriter

Up to version 5.0, the `MongoItemWriter` supported two operations: `upsert` and `delete`. While the `upsert` operation works well for both inserts and updates, it does not perform well for items that are known to be new in the target collection.

Similar to the `persist` and `merge` operations in the `JpaItemWriter`, this release adds a new operation named `insert` in the `MongoItemWriter`, which is designed for bulk inserts. This new option performs better than `upsert` for new items as it does not require an additional lookup to check if items already exist in the target collection.

## [](#new-item-reader-and-writer-for-redis)New item reader and writer for Redis

A typical case of using Redis within the context of Spring Batch is populating/clearing a cache with reference data before/after a job execution. This is a common performance improvement pattern that is useful to query data from the cache instead of issuing multiple queries to the main database during the execution of the job.

In this release, a new `RedisItemReader` and `RedisItemWriter` based on [Spring Data Redis](https://spring.io/projects/spring-data-redis) have been introduced in the library of built-in item readers and writers. The reader can be configured with a `ScanOptions` to scan the key set to read from Redis. The writer is configurable with a `RedisTemplate` to write items to Redis.

## [](#automatic-configuration-of-jobregistrybeanpostprocessor)Automatic configuration of JobRegistryBeanPostProcessor

When configuring a `JobOperator` in a Spring Batch application, it is necessary to register the jobs in the operator's `JobRegistry`. This registration process is either done manually or automatically by adding a `JobRegistryBeanPostProcessor` bean to the application context.

In this release, the default configuration of Spring Batch (ie when using `@EnableBatchProcessing` or extending `DefaultBatchConfiguration`) now automatically registers a `JobRegistryBeanPostProcessor` bean in the application context. This simplifies the configuration process and improves the user experience when using a `JobOperator`.

## [](#ability-to-start-a-job-flow-with-a-decision)Ability to start a job flow with a decision

When using the XML configuration style, it is possible to start a job flow with a decider thanks to the `decision` element. However, up to version 5.0, it was not possible to achieve the same flow definition with the Java API.

This release adds a new option to the `JobBuilder` API to start a job flow with a `JobExecutionDecider`. This makes both configuration styles more consistent.

## [](#ability-to-provide-a-custom-jobkeygenerator)Ability to provide a custom JobKeyGenerator

By default, Spring Batch identifies job instances by calculating a hash of the identifying job parameters. While it is unlikely to need to customize this identification process, Spring Batch still provides a strategy interface for users to override the default mechanism through the `JobKeyGenerator` API.

Up to version 5.0, it was not possible to provide a custom key generator without having to create a custom `JobRepository` and `JobExplorer`. In this version, it is now possible to provide a custom `JobKeyGenerator` through the factory beans of `JobRepository` and `JobExplorer`.

## [](#mongodb-job-repository-experimental)MongoDB Job Repository (Experimental)

This feature introduces new implementations of `JobRepository` and `JobExplorer` backed by MongoDB. This long-awaited feature is now available as experimental and marks the introduction of the first NoSQL meta-data store for Spring Batch.

## [](#composite-item-reader-experimental)Composite Item Reader (Experimental)

This feature introduces a composite `ItemReader` implementation. Similar to the `CompositeItemProcessor` and `CompositeItemWriter`, the idea is to delegate reading to a list of item readers in order. This is useful when there is a requirement to read data having the same format from different sources (files, databases, etc).

## [](#new-documentation-based-on-antora)New documentation based on Antora

The reference documentation was updated to use [Antora](https://antora.org). This update introduces a number of improvements, including but not limited to:

-   Multi-version documentation: it is now possible to navigate from one version to another thanks to the drop down version list in the left side menu.
-   Integrated search experience: powered by [Algolia](https://docsearch.algolia.com), the search experience in now better thanks to the integrated search box at the top left of the page
-   Improved configuration style toggle: the toggle to switch between the XML and Java configuration styles for code snippets is now located near each sample, rather than the top of each page

You can check the new documentation version [here](https://docs.spring.io/spring-batch/reference/index.html).

## [](#updated-getting-started-guides)Updated getting started guides

The [Getting started guide](https://spring.io/guides/gs/batch-processing/) has been around for a long time and served well as a showcase of how to use Spring Batch with Spring Boot. However, not all our users are Spring Boot users, and one of the frequent asks is to provide the same getting started experience with plain Spring Batch.

For this reason, we introduced a new [Two minutes tutorial](https://github.com/spring-projects/spring-batch#two-minutes-tutorial) with a step-by-step guide to create a Spring Batch project and implement a simple "Hello world" job. This should improve the getting started experience for non Boot users. That said, the current Spring Boot based guide has been updated to the latest Spring Boot 3 version to show how to use new features in Spring Batch 5 like Java Records support.

## [](#revamped-samples)Revamped samples

In this release, we have reworked all the code examples in our samples suite. Samples are now organized by feature in separate packages. This makes it easier for you to understand and learn about specific features in Spring Batch. The main `README` file includes a table that shows available samples and the features they cover: [Spring Batch Samples](https://github.com/spring-projects/spring-batch/tree/main/spring-batch-samples).

Moreover, each sample has now its own `README` file that explains the sample in details and provides the instructions to run it. Samples can now be run as unit tests from an IDE or from the command line, to get a "clone and run" experience. With the new structure in place, you are literally two commands away from having a running Spring Batch sample in your local environment!

Finally, most samples are now implemented in two Spring configuration styles: Java configuration style and XML configuration style. This makes it easier for you to compare both configuration styles and help you when migrating XML configurations to Java configurations.

## [](#enhanced-issue-reporting-guide)Enhanced issue reporting guide

Just like having a good user experience when tying out a new project or contributing to an existing project is important, we believe that having a good experience when reporting issues is also important. For this reason, and as part of the "Improving the Getting Started Experience" theme, we have reworked the issue reporting process to provide a step-by-step guide on how to report issues: [Issue Reporting Guide](https://github.com/spring-projects/spring-batch/blob/main/ISSUE_REPORTING.md).

The new guide includes a project template with a minimal complete verifiable example that works with an embedded datasource. This template is a starting point for you to edit as needed in order to reproduce an issue. The guide also provides a Docker + TestContainers template for issues that involve non embeddable databases like PostgreSQL or MySQL.

## [](#whats-next)What's next?

First, I would like to thank all contributors who had a role in this release! Spring Batch 5.1.0 comes with Spring Boot 3.2.0.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/index.html)
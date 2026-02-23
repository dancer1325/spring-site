---
title: Spring Batch 4.3.0-M1 is released now!
source: https://spring.io/blog/2020/06/26/spring-batch-4-3-0-m1-is-released-now
scraped: 2026-02-23T13:56:12.239Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  June 26, 2020 | 1 Comment
---

# Spring Batch 4.3.0-M1 is released now!

_Releases | Mahmoud Ben Hassine |  June 26, 2020 | 1 Comment_

On behalf of the Spring Batch team, I am pleased to announce that Spring Batch 4.3.0-M1 is now available from our [milestone repository](https://repo.spring.io/milestone/).

## [](#whats-new)What’s new?

This release is packed with new features, performance improvements, and bug fixes, as well as documentation and dependency updates! You can find the complete list of changes in the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/4.3.0-M1), but here are the major highlights:

## [](#new-features)New features

#### [](#1-new-synchronized-itemstreamwriter)1\. New synchronized `ItemStreamWriter`

Similar to the `SynchronizedItemStreamReader`, we added a `SynchronizedItemStreamWriter`. This feature is useful in multi-threaded steps where concurrent threads need to be synchronized to not override each other's writes.

#### [](#2-add-support-for-named-queries-in-jpapagingitemreader)2\. Add support for named queries in `JpaPagingItemReader`

Up until now, it was possible to use named queries with the `JpaPagingItemReader`. However, this required the creation of a custom query provider, as follows:

```java
CopyJpaPagingItemReader<Foo> reader = new JpaPagingItemReaderBuilder<Foo>()
    .name("fooReader")
    .queryProvider(new AbstractJpaQueryProvider() {
       @Override
       public Query createQuery() {
          return getEntityManager().createNamedQuery("allFoos", Foo.class);
       }

       @Override
       public void afterPropertiesSet() throws Exception {
       }
    })
    // set other properties on the reader
    .build();
```

In this release, we introduced a `JpaNamedQueryProvider` next to the `JpaNativeQueryProvider` to ease the configuration, which can now be written like this:

```java
CopyJpaPagingItemReader<Foo> reader = new JpaPagingItemReaderBuilder<Foo>()
		.name("fooReader")
		.queryProvider(new JpaNamedQueryProvider("allFoos", Foo.class))
		// set other properties on the reader
		.build();
```

#### [](#3-simplify-the-configuration-of-spring-batch-tests-with-junit-5)3\. Simplify the configuration of Spring Batch tests with JUnit 5

Similar to how many Spring Boot test annotations are meta-annotated with `@ExtendWith(SpringExtension.class)` (like `@SpringBootTest`, `@WebMvcTest`, and others), we updated `@SpringBatchTest` to be meta-annotated with `@ExtendWith(SpringExtension.class)`. This simplifies the configuration when writing tests with JUnit Jupiter.

Please note that this feature does not affect JUnit 4 users, it only concerns JUnit 5 based tests.

## [](#performance-improvements)Performance improvements

Along the same lines of performance improvements we introduced in [version 4.2](https://spring.io/blog/2019/10/02/spring-batch-4-2-in-now-ga#performance-improvements), we continued our work on improving several parts of the framework in this release as well.

#### [](#1-use-bulk-writes-in-repositoryitemwriter)1\. Use bulk writes in `RepositoryItemWriter`

Up to version 4.2, it was required to specify the method name to use to save an item to the database. This method was then called in a `for` loop to save all items. In order to use `CrudRepository#saveAll`, it was required to extend `RepositoryItemWriter` and override `write(List)`, which is not convenient.

In this release, we made the `RepositoryItemWriter` use `CrudRepository#saveAll` by default. This changes improves the performance of the writer by a **factor of 2**, according to our benchmark [repository-item-writer-benchmark](#footnotes):

![perf-repository-item-write](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/gh3720/perf-repository-item-writer.png)

#### [](#2-use-bulk-writes-in-mongoitemwriter)2\. Use bulk writes in `MongoItemWriter`

Up until now, the `MongoItemWriter` used `MongoOperations#save()` in a `for` loop to save items to the database. In this release, we replaced this mechanism with a single call to `BulkOperations`. With this change, the `MongotItemWriter` is **25x faster** than the previous version, according to our benchmark [mongo-item-writer-benchmark](#footnotes):

![perf-mongo-item-writer](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/gh3713/perf-mongo-item-writer.png)

#### [](#3-job-startrestart-time-improvement)3\. Job start/restart time improvement

When starting a new job (or restarting a failed job), Spring Batch does a number of checks to validate a few conditions:

-   Check if the current execution is a new one or a restart of a failed one
-   Check if the number of executions does not exceed the start limit
-   Additional checks....

All of these checks involve a call to `JobRepository.getStepExecutionCount` to count the number of step executions. Up to v4.2, the implementation of this method was loading all job executions and step executions to do the count in-memory on the framework side. In this release, we have changed the implementation to do a single call to the database with a `count` query. This change improves memory usage as well as the method's response time (by a **factor of 6** according to our benchmark [step-execution-count-benchmark](#footnotes)), which, in turn, improves the overall start time of steps and jobs:

![perf-step-execution-count](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/gh3657/perf-step-execution-count.png)

## [](#dependency-upgrades)Dependency Upgrades

This release upgrades Spring projects dependencies to the following versions:

-   Spring Framework 5.3.0-M1
-   Spring Data 2020.0.0-M1
-   Spring Integration 5.4.0-M1
-   Spring AMQP 2.3.0-M1

Spring Batch v4.3.0-M1 can be consumed with Spring Boot 2.4.0-M1, which is planned to be released next week. Stay tuned!

## [](#feedback-and-contributions)Feedback and contributions

I would like to thank all contributors, especially [Parikshit Dutta](https://github.com/parikshitdutta) for his numerous contributions to this release! We look forward to your feedback on this milestone on [Twitter](https://twitter.com/springbatch), [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Github](https://github.com/spring-projects/spring-batch/issues/new/choose).

## [](#footnotes)Footnotes

All benchmarks have been performed on a Macbook Pro with 16Go RAM, 2.9 GHz Intel Core i7 CPU, MacOS Catalina 10.15.5, and Oracle JDK 1.8.0\_201. You can find the source code of all benchmarks in the following links:

-   repository-item-writer-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/gh3720](https://github.com/benas/spring-batch-lab/tree/master/issues/gh3720)
-   mongo-item-writer-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/gh3713](https://github.com/benas/spring-batch-lab/tree/master/issues/gh3713)
-   step-execution-count-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/gh3657](https://github.com/benas/spring-batch-lab/tree/master/issues/gh3657)

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.3.0-M1/reference/html/index.html)
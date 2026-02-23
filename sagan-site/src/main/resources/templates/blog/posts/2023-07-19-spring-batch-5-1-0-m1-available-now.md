---
title: Spring Batch 5.1.0-M1 available now!
source: https://spring.io/blog/2023/07/19/spring-batch-5-1-0-m1-available-now
scraped: 2026-02-23T09:34:29.551Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  July 19, 2023 | 0 Comments
---

# Spring Batch 5.1.0-M1 available now!

_Releases | Mahmoud Ben Hassine |  July 19, 2023 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that the first milestone of Spring Batch 5.1 is now available from our [milestone repository](https://repo.spring.io/ui/native/milestone/org/springframework/batch/).

This milestone release comes with the following features:

-   Dependencies upgrade
-   Virtual Threads support
-   Memory management improvement in the JpaItemWriter
-   New synchronized decorators for item readers and writers

This blog post walks through these features in more details. For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.1.0-M1).

## [](#dependencies-upgrade)Dependencies upgrade

This milestone release upgrades Spring dependencies to the following versions:

-   Spring Framework 6.1.0-M2
-   Spring Integration 6.2.0-M1
-   Spring Data 3.2.0-M1
-   Spring LDAP 3.2.0-M1
-   Micrometer 1.12.0-M1

## [](#virtual-threads-support)Virtual Threads support

Embracing JDK 21 LTS is one of the main themes for Spring Batch 5.1, especially the support of virtual threads from Project Loom. In this release, virtual threads can be used in all areas of the framework, like running a concurrent step with virtual threads or launching multiple steps in parallel using virtual threads.

Thanks to the well designed separation of concerns in Spring Batch, threads are not managed directly. Thread management is rather delegated to `TaskExecutor` implementations from Spring Framework. This programming-to interface approach allows you to switch between `TaskExecutor` implementations in a transparent and a flexible way.

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

## [](#whats-next)What's next?

First, I would like to thank all contributors who had a role in this release! You can try Spring Batch 5.1.0-M1 with Spring Boot 3.2.0-M1. We are planning to release Spring Batch 5.1 GA later this November 2023.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.1.0-M1/reference/html/index.html)
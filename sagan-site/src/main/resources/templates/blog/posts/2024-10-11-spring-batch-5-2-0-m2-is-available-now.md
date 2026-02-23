---
title: Spring Batch 5.2.0-M2 is available now!
source: https://spring.io/blog/2024/10/11/spring-batch-5-2-0-m2-is-available-now
scraped: 2026-02-23T08:13:46.279Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 11, 2024 | ...
---

# Spring Batch 5.2.0-M2 is available now!

_Releases | Mahmoud Ben Hassine |  October 11, 2024 | ..._

I am pleased to announce that the second milestone of Spring Batch 5.2 is now available from our milestones repository. This blog post walks you through the main changes in Spring Batch 5.2:

-   MongoDB job repository support
-   New resourceless job repository
-   Composite item reader implementation
-   New adapters for java.util.function APIs
-   Concurrent steps with blocking queue item reader and writer

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.2.0-M2).

## [](#mongodb-job-repository-support)MongoDB job repository support

This release introduces the first NoSQL job repository implementation which is backed by MongoDB. Similar to relational job repository implementations, Spring Batch comes with a script to create the necessary collections in MongoDB in order to save and retrieve batch meta-data.

This implementation requires MongoDB version 4 or later and is based on Spring Data MongoDB. In order to use this job repository, all you need to do is define a `MongoTemplate` and a `MongoTransactionManager` which are required by the newly added `MongoDBJobRepositoryFactoryBean`:

```
Copy@Bean
public JobRepository jobRepository(MongoTemplate mongoTemplate, MongoTransactionManager transactionManager) throws Exception {
	MongoJobRepositoryFactoryBean jobRepositoryFactoryBean = new MongoJobRepositoryFactoryBean();
	jobRepositoryFactoryBean.setMongoOperations(mongoTemplate);
	jobRepositoryFactoryBean.setTransactionManager(transactionManager);
	jobRepositoryFactoryBean.afterPropertiesSet();
	return jobRepositoryFactoryBean.getObject();
}
```

Once the MongoDB job repository defined, you can inject it in any job or step as a regular job repository. You can find a complete example in the [MongoDBJobRepositoryIntegrationTests](https://github.com/spring-projects/spring-batch/blob/main/spring-batch-core/src/test/java/org/springframework/batch/core/repository/support/MongoDBJobRepositoryIntegrationTests.java).

## [](#new-resourceless-job-repository)New resourceless job repository

In v5, the in-memory Map-based job repository implementation was removed for several reasons. The only job repository implementation that was left in Spring Batch was the JDBC implementation, which requires a data source. While this works well with in-memory databases like H2 or HSQLDB, requiring a data source was a strong constraint for many users of our community who used to use the Map-based repository without any additional dependency.

In this release, we introduce a `JobRepository` implementation that does not use or store batch meta-data in any form (not even in-memory). It is a "NoOp" implementation that throws away batch meta-data and does not interact with any resource (hence the name "resourceless job repository", which is named after the "resourceless transaction manager").

This implementation is intended for use-cases where restartability is not required and where the execution context is not involved in any way (like sharing data between steps through the execution context, or partitioned steps where partitions meta-data is shared between the manager and workers through the execution context, etc).

This implementation is suitable for one-time jobs executed in their own JVM. It works with transactional steps (configured with a `DataSourceTransactionManager` for instance) as well as non-transactional steps (configured with a `ResourcelessTransactionManager`). The implementation is not thread-safe and should not be used in any concurrent environment.

## [](#composite-item-reader-implementation)Composite item reader implementation

Similar to the `CompositeItemProcessor` and `CompositeItemWriter`, we introduce a new `CompositeItemReader` implementation that is designed to read data sequentially from several sources having the same format. This is useful when data is spread over different resources and writing a custom reader is not an option.

A `CompositeItemReader` works like other composite artifacts, by delegating the reading operation to regular item readers in order. Here is a quick example showing a composite reader that reads persons data from a flat file then from a database table:

```
Copy@Bean
public FlatFileItemReader<Person> itemReader1() {
    return new FlatFileItemReaderBuilder<Person>()
            .name("personFileItemReader")
            .resource(new FileSystemResource("persons.csv"))
            .delimited()
            .names("id", "name")
            .targetType(Person.class)
            .build();
}

@Bean
public JdbcCursorItemReader<Person> itemReader2() {
    String sql = "select * from persons";
    return new JdbcCursorItemReaderBuilder<Person>()
            .name("personTableItemReader")
            .dataSource(dataSource())
            .sql(sql)
            .beanRowMapper(Person.class)
            .build();
}

@Bean
public CompositeItemReader<Person> itemReader() {
    return new CompositeItemReader<>(Arrays.asList(itemReader1(), itemReader2()));
}
```

## [](#new-adapters-for-javautilfunction-apis)New adapters for java.util.function APIs

Similar to `FucntionItemProcessor` that adapts a `java.util.function.Function` to an item processor, this release introduces several new adapters for other `java.util.function` interfaces like `Supplier`, `Consumer` and `Predicate`.

The newly added adapters are: `SupplierItemReader`, `ConsumerItemWriter` and `PredicateFilteringItemProcessor`. For more details about these new adapters, please refer to the [org.springframework.batch.item.function](https://github.com/spring-projects/spring-batch/tree/main/spring-batch-infrastructure/src/main/java/org/springframework/batch/item/function) package.

## [](#concurrent-steps-with-blocking-queue-item-reader-and-writer)Concurrent steps with blocking queue item reader and writer

The [staged event-driven architecture](https://en.wikipedia.org/wiki/Staged_event-driven_architecture) (SEDA) is a powerful architecture style to process data in stages connected by queues. This style is directly applicable to data pipelines and easily implemented in Spring Batch thanks to the ability to design jobs as a sequence of steps.

The only missing piece here is how to read and write data to intermediate queues. This release introduces an item reader and item writer to read data from and write it to a `BlockingQueue`. With these two new classes, one can design a first step that prepares data in a queue and a second step that consumes data from the same queue. This way, both steps can run concurrently to process data efficiently in a non-blocking, event-driven fashion.

## [](#whats-next)What's next?

I would like to thank all contributors who had a role in this release! This milestone marks the feature freeze release for 5.2.0. We will start working on making this version stable in the upcoming 5.2.0-RC1 and then 5.2.0 GA in November.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

Please note that 5.1.x will be out of OSS support by November 22, 2024. Therefore, I encourage our users to start planning to upgrade their apps to Spring Batch 5.2.0 as soon as it is released.

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/index.html)
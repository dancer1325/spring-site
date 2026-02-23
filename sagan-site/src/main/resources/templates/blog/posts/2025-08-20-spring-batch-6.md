---
title: Spring Batch 6.0.0-M2 available now
source: https://spring.io/blog/2025/08/20/spring-batch-6
scraped: 2026-02-23T07:32:20.088Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  August 20, 2025 | 0 Comments
---

# Spring Batch 6.0.0-M2 available now

_Releases | Mahmoud Ben Hassine |  August 20, 2025 | 0 Comments_

I am pleased to announce that Spring Batch `6.0.0-M2` is available now from Maven Central!

In this milestone release, we shipped the following features and improvements:

-   Dependencies upgrade
-   New implementation of the chunk-oriented processing model
-   Ability to recover abruptly failed job executions

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v6.0.0-M2).

## [](#dependencies-upgrade)Dependencies upgrade

In this milestone release, the Spring dependencies are upgraded to the following versions:

-   Spring Framework: 7.0.0-M8
-   Spring Integration: 7.0.0-M2
-   Spring AMQP: 4.0.0-M4
-   Spring Kafka: 4.0.0-M4
-   Spring Data: 4.0.0-M5
-   Spring Ldap: 4.0.0-M2
-   Micrometer: 1.16.0-M2

Please note that this release is compatible with Java 17+.

## [](#new-implementation-of-the-chunk-oriented-processing-model)New implementation of the chunk-oriented processing model

This is not a new feature, but rather a new, enhanced implementation of the chunk-oriented processing model. This new implementation was introduced as an experimental addition in version 5.1, and is now available as stable in version 6.0.

The new implementation is provided in the `ChunkOrientedStep` class, which is a replacement for the `ChunkOrientedTasklet` / `TaskletStep` classes.

Here is an example of how to define a `ChunkOrientedStep` by using its builder:

```java
Copy@Bean
public Step chunkOrientedStep(JobRepository jobRepository, JdbcTransactionManager transactionManager,
    ItemReader<Person> itemReader, ItemProcessor<Person, Person> itemProcessor, ItemWriter<Person> itemWriter) {
    
    int chunkSize = 100;
    return new ChunkOrientedStepBuilder<Person, Person>(jobRepository, transactionManager, chunkSize)
        .reader(itemReader)
        .processor(itemProcessor)
        .writer(itemWriter)
        .build();
}
```

Moreover, fault-tolerance features were adapted as follows:

-   The retry feature is now based on the retry functionality introduced in [Spring Framework 7](https://docs.spring.io/spring/reference/7.0/core/resilience.html), instead of the previous Spring Retry library
-   The skip feature has been slightly adapted to the new implementation, which is now entirely based on the `SkipPolicy` interface

Here is a quick example of how to use the retry and skip features with the new `ChunkOrientedStep`:

```java
Copy@Bean
public Step faulTolerantChunkOrientedStep(JobRepository jobRepository, JdbcTransactionManager transactionManager,
    ItemReader<Person> itemReader, ItemProcessor<Person, Person> itemProcessor, ItemWriter<Person> itemWriter) {

    // retry policy configuration
    int maxAttempts = 10;
    var retrybaleExceptions = Set.of(TransientException.class);
    RetryPolicy retryPolicy = RetryPolicy.builder()
        .maxAttempts(maxAttempts)
        .includes(retrybaleExceptions)
        .build();

    // skip policy configuration
    int skipLimit = 50;
    var skippableExceptions = Set.of(FlatFileParseException.class);
    SkipPolicy skipPolicy = new LimitCheckingItemSkipPolicy(skipLimit, skippableExceptions);

    // step configuration
    int chunkSize = 100;
    return new ChunkOrientedStepBuilder<Person, Person>(jobRepository, transactionManager, chunkSize)
        .reader(itemReader)
        .processor(itemProcessor)
        .writer(itemWriter)
        .faultTolerant()
        .retryPolicy(retryPolicy)
        .skipPolicy(skipPolicy)
        .build();
}
```

Please refer to the [migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-6.0-Migration-Guide) for more details on how to migrate from the previous implementation to the new one.

## [](#ability-to-recover-failed-job-executions)Ability to recover failed job executions

Prior to v6, if a job execution fails abruptly, it was not possible to recover it without a manual database update. This was error-prone and not consistent across different job repositories (as it required a few SQL statements for JDBC databases and some custom statements for NoSQL stores).

This milestone release introduces a new method named `recover` in the `JobOperator` interface that allows you to recover failed job executions consistently across all job repositories.

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 6, we look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions) and [X](https://twitter.com/springbatch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/6.0/index.html)
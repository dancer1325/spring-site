---
title: Spring Batch 4.2.0.RC1 is released!
source: https://spring.io/blog/2019/09/17/spring-batch-4-2-0-rc1-is-released
scraped: 2026-02-23T14:36:20.237Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  September 17, 2019 | 0 Comments
---

# Spring Batch 4.2.0.RC1 is released!

_Releases | Mahmoud Ben Hassine |  September 17, 2019 | 0 Comments_

On behalf of the Spring Batch team, I am pleased to announce the release of Spring Batch 4.2.0.RC1. We have been working on some performance improvements in the core framework, and this post highlights the major changes.

## [](#major-performance-improvements)Major Performance Improvements

We have made some performance improvements, including:

-   [Enhanced Step Partitioning](#enhanced-step-partitioning)
-   [Improved Job Stop](#improved-job-stop)
-   [Faster Writes with the `JpaItemWriter`](#faster-writes-with-the-jpaitemwriter)
-   [Optimized Bean Mapping with the `BeanWrapperFieldSetMapper`](#optimized-bean-mapping-with-the-beanwrapperfieldsetmapper)

### [](#enhanced-step-partitioning)Enhanced Step Partitioning

Starting a partitioned step is an area where the framework wasn't well optimized. In this version, we have dug deep into the partitioning process to figure out the root cause of this performance issue. One of the main steps of the partitioning process is to find the last step execution (to see if the current execution is a restart). We found that looking up the last step execution involved loading all step executions from all job executions for a given job instance in-memory, which is obviously inefficient!

We replaced this code with a SQL query that does the lookup at the database level, to return only the last step execution. The results are outstanding: Partitioning a step execution into 5000 partitions is almost 10x faster with this approach, according to our benchmark [partitioned-step-benchmark](#footnotes):

![perf-partitioning](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/batch2716/perf-partitioning.png)

### [](#improved-job-stop)Improved Job Stop

Things can go wrong when running a job.. and gracefully stopping a destructive job should be fast and efficient in order to avoid data corruption. Up until v4.1, stopping a job using the `CommandLineJobRunner` suffered from a poor performance, due to loading all job executions in memory in order to find whether a job execution is currently running. With this approach, stopping a job can take minutes with a production database that has thousands of job executions in it!

In this release, we optimized the stop process by using a SQL query that does the filtering at the database level. Again, the results are impressive: With 100.000 job executions of a given job in the database, stopping the job is almost 40x faster with this approach, according to our benchmark [stop-benchmark](#footnotes):

![perf-stop](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/batch2422/perf-stop.png)

### [](#faster-writes-with-the-jpaitemwriter)Faster Writes with the `JpaItemWriter`

The `JpaItemWriter` uses the `javax.persistence.EntityManager#merge` function to write items in a JPA persistence context. This makes sense when the persistent state of items is unknown or known to be an update. However, in many file ingestion jobs where data is known to be new and should be considered as inserts, using `javax.persistence.EntityManager#merge` is not efficient.

In this release, we introduced a new option in the `JpaItemWriter` to use `persist` rather than `merge` in such scenarios. With this new option, a file ingestion job that uses the `JpaItemWriter` to insert 1 million items in a database is 2x faster according to our benchmark [jpa-writer-benchmark](#footnotes):

![perf-jpaitemwriter](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/batch2462/perf-jpaitemwriter.png)

### [](#optimized-bean-mapping-with-the-beanwrapperfieldsetmapper)Optimized Bean Mapping with the `BeanWrapperFieldSetMapper`

The `BeanWrapperFieldSetMapper` provides a nice feature that lets us use fuzzy matching of field names of a given JavaBean (Camel case, nested properties, and so on). However, when field names match column names, exact matching can be enabled by setting the `distanceLimit` parameter to 0.

In this release, we fixed a performance issue in the `BeanWrapperFieldSetMapper` that was introspecting field names by using reflection on each iteration, even when exact matching was requested (by setting `distanceLimit=0`). The result is that item mapping is now 1.5x faster than the previous version according to our JMH benchmark [bean-mapping-benchmark](#footnotes):

![perf-mapping](https://raw.githubusercontent.com/benas/spring-batch-lab/master/issues/batch1801/perf-mapping.png)

## [](#feedback)Feedback

Please note that these numbers may vary in your case. We encourage you to try out Spring Batch 4.2.0.RC1 (which can be consumed with Spring Boot 2.2.0.M6) and share your feedback. Please refer to the change log of version [4.2.0.RC1](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10090&version=17487) and [4.2.0.M3](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10090&version=17628) for the complete list of changes.

Feel free to ping [@michaelminella](https://www.twitter.com/michaelminella) or [@b\_e\_n\_a\_s](https://www.twitter.com/b_e_n_a_s) on Twitter or to ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](https://jira.spring.io/projects/BATCH/).

## [](#whats-next)What's next

We plan to stabilize this new release candidate for the upcoming Spring Batch 4.2.0.RELEASE planned for September 30th, 2019. Stay tuned!

## [](#footnotes)Footnotes

All benchmarks have been performed on a Macbook Pro 16Go RAM, 2.9 GHz Intel Core i7 CPU, MacOS Mojave 10.14.5, Oracle JDK 1.8.0\_201. You can find the source code of all benchmarks in the following links:

-   partitioned-step-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/batch2716](https://github.com/benas/spring-batch-lab/tree/master/issues/batch2716)
-   stop-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/batch2422](https://github.com/benas/spring-batch-lab/tree/master/issues/batch2422)
-   jpa-writer-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/batch2462](https://github.com/benas/spring-batch-lab/tree/master/issues/batch2462)
-   bean-mapping-benchmark: [https://github.com/benas/spring-batch-lab/tree/master/issues/batch1801](https://github.com/benas/spring-batch-lab/tree/master/issues/batch1801)

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.2.x/reference/html/index.html)
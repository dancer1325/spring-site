---
title: Spring Cloud Task 2.3.0-M1 is now available!
source: https://spring.io/blog/2020/05/11/spring-cloud-task-2-3-0-m1-is-now-available
scraped: 2026-02-23T14:01:31.047Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  May 11, 2020 | 1 Comment
---

# Spring Cloud Task 2.3.0-M1 is now available!

_Releases | Michael Minella |  May 11, 2020 | 1 Comment_

We are pleased to announce that Spring Cloud Task 2.3.0-M1 is now available on Github and the Spring download repository. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's New?

Spring Cloud Task 2.3.0-M1 is intended to be the version of the framework aligned with Spring Boot 2.3. Updates from 2.2.x include:

-   Updates to all dependencies.
-   Support for specifying a `PlatformTransactionManager` to be used by Spring Cloud Task.
-   A starter for singl-step Spring Batch jobs.

Let's walk through these updates in more detail.

## [](#update-to-all-dependencies)Update to All Dependencies

As stated earlier, this is first milestone release that brings Spring Cloud Task into alignment with Spring Boot 2.3. This includes updating all dependencies to be in alignment with Spring Boot and Spring Cloud.

## [](#support-for-specifying-a-platformtransactionmanager-to-be-used-by-spring-cloud-task)Support for specifying a `PlatformTransactionManager` to be used by Spring Cloud Task

When using more than one `DataSource`, Spring Cloud Task provides the ability to specify which `DataSource` is to be used by the framework's `TaskRepository`. However, previously, there was no easy way to configure which `PlatformTransactionManager` to use. This release now exposes updates to allow specific configuration of a `PlatformTransactionManager` for the framework to use.

## [](#starter-for-single-step-batch-jobs)Starter for Single-step Batch Jobs

One area where we are expanding Spring Cloud Task's functionality for 2.3 is the addition of a starter that will let users configure a single-step Spring Batch job through properties alone. This release includes the capabilities to configure a job through properties that can read and write from a flat file through properties. Let's take a look at an example of how this would work.

To use this starter, first add it to your Spring Boot based project as a dependency, as shown below:

```
Copy...
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-single-step-batch-job</artifactId>
	<version>2.3.0-M1</version>
</dependency>
...
<repository>
	<id>Spring Milestone</id>
	<url>https://repo.spring.io/lib-milestones-local/</url>
</repository>

```

```
Copy...
maven { url 'https://repo.spring.io/lib-milestones-local/' }
...
compile "org.springframework.cloud:spring-cloud-starter-single-step-batch-job:2.3.0-M1"
...
```

With the starter added to your project (assuming you've already created the Spring Boot main class with the `@EnableBatchProcessing` annotation on it), the only other work you need to do is to configure your job. Say you have the following input file:

```
Copycustomer1,100
customer2,101
customer3,102
customer4,103
customer5,104
customer6,105
customer7,106
customer8,107
customer9,108
```

In the above input file, the first column in the CSV is a customer name, and the second column is the balance. If we wanted to configure a job to read in the file and reformat it by reversing the columns, we would create an `application.yml`, as follows:

```
Copyspring:
  batch:
      job:
        jobName: sample
        stepName: step1
        chunkSize: 5
        flatfilereader:
          delimited: true
          names: customer,number
          name: itemReader
          resource: /input.csv
        flatfilewriter:
          formatted: true
          format: "%s has a balance of %s"
          name: itemWriter
          names: customer,number
          resource: file:///tmp/output.txt
```

If you are familiar with Spring Batch, this configuration should look familiar to you. We begin by defining the name of the job and the name of the step within it. We also provide a chunk size to indicate how many records per transaction to process. From there, we configure an `ItemReader` and `ItemWriter` (`FlatFileItemReader` and `FlatFileItemWriter`, respectively) for our step to use. If we want, we can also implement an `ItemProcessor`, and the starter will autowire it into our step.

With the above configured, our batch job will read our file in and write it out in the requested format. The output from the sample file above would look something like this:

```
Copycustomer1 has a balance of 100
customer2 has a balance of 101
customer3 has a balance of 102
customer4 has a balance of 103
customer5 has a balance of 104
customer6 has a balance of 105
customer7 has a balance of 106
customer8 has a balance of 107
customer9 has a balance of 108
```

This milestone includes auto-configuration for the `FlatFileItemReader` and `FlatFileItemWriter`. For our GA release (scheduled later this year), we expect to have the following all available as auto-configured options:

-   `FlatFileItemReader`
-   `FlatFileItemWriter`
-   `JdbcPagingItemReader`
-   `JdbcCursorItemReader`
-   `JdbcBatchItemWriter`
-   `KafkaItemReader`
-   `KafkaItemWriter`
-   `AmqpItemReader`
-   `AmqpItemWriter`

If there are others you feel should be on the list, be sure to let us know on Github!

## [](#what-do-you-think)What Do You Think?

We look forward to your feedback on these new features in [Github](https://github.com/spring-cloud/spring-cloud-task/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-task), [Gitter](https://gitter.im/spring-cloud/spring-cloud-task), or directly on Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Cloud Task Home](https://cloud.spring.io/spring-cloud-task/) | [Source on GitHub](https://github.com/spring-cloud/spring-cloud-task) | [Reference Documentation](http://docs.spring.io/spring-cloud-task/docs/2.3.0-M1/reference/htmlsingle/)
---
title: Spring Batch 6.0.0-M1 is out!
source: https://spring.io/blog/2025/07/23/spring-batch-6
scraped: 2026-02-23T07:35:05.621Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  July 23, 2025 | 1 Comment
---

# Spring Batch 6.0.0-M1 is out!

_Releases | Mahmoud Ben Hassine |  July 23, 2025 | 1 Comment_

On behalf of the team and all contributors, I am pleased to announce that Spring Batch `6.0.0-M1` is available now from Maven Central! This first milestone introduces several new features, enhancements and bug fixes. It also includes a number of API breaking changes and deprecations.

This blog post walks you through the following major changes:

-   Dependencies upgrade
-   Batch infrastructure configuration improvements
-   New command line job operator
-   Deprecations and pruning

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/6.0.0-M1) and the [migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-6.0-Migration-Guide).

## [](#dependencies-upgrade)Dependencies upgrade

In this major release, the Spring dependencies are upgraded to the following versions:

-   Spring Framework 7.0
-   Spring Integration 7.0
-   Spring Data 4.0
-   Spring LDAP 4.0
-   Spring AMQP 4.0
-   Spring Kafka 4.0
-   Micrometer 1.16

Please note that this release is compatible with Java 17 and above.

## [](#batch-infrastructure-configuration-improvements)Batch infrastructure configuration improvements

#### [](#new-annotations-and-classes-for-batch-infrastructure-configuration)New annotations and classes for batch infrastructure configuration

Before v6, the `@EnableBatchProcessing` annotation was tied to a JDBC-based infrastructure. This is not the case anymore. Two new annotations have been introduced to configure the underlying job repository: `@EnableJdbcJobRepository` and `@EnableMongoJobRepository`.

Starting from v6, `@EnableBatchProcessing` allows you to configure the common attributes of the batch infrastructure, while store-specific attributes can be specified with the new dedicated annotations.

Here is an example of how to use these annotations:

```java
Copy@EnableBatchProcessing(taskExecutorRef = "batchTaskExecutor")
@EnableJdbcJobRepository(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
class MyJobConfiguration {

	@Bean
	public Job job(JobRepository jobRepository) {
		return new JobBuilder("job", jobRepository)
                    // job flow omitted
                    .build();
	}
}
```

Similarly, the programmatic model based on `DefaultBatchConfiguration` has been updated by introducing two new configuration classes to define store-specific attributes: `JdbcDefaultBatchConfiguration` and `MongoDefaultBatchConfiguration`. These classes can be used to configure specific attributes of each job repository as well as other batch infrastructure beans programmatically.

#### [](#resourceless-batch-infrastructure-by-default)Resourceless batch infrastructure by default

The `DefaultBatchConfiguration` class has been updated to provide a "resourceless" batch infrastructure by default (based on the `ResourcelessJobRepository` implementation introduced in v5.2). This means that it no longer requires an in-memory database (like H2) for the job repository, which was previously necessary for batch metadata storage.

Moreover, this change will improve the default performance of batch applications when the meta-data is not used, as the `ResourcelessJobRepository` does not require any database connections or transactions.

Finally, this change will help to reduce the memory footprint of batch applications, as the in-memory database is no longer required for metadata storage.

#### [](#batch-infrastructure-configuration-simplification)Batch infrastructure configuration simplification

Before v6, the typical configuration of a non-trivial Spring Batch application was quite complex and required a lot of beans: `JobRepository`, `JobLauncher`, `JobExplorer`, `JobOperator`, `JobRegistry`, `JobRegistrySmartInitializingSingleton` and so on. This required a lot of configuration and sometimes duplicate code, like for example the need to configure the same execution context serializer on both the `JobRepository` and `JobExplorer`.

In this release, several changes have been made to simplify the batch infrastructure configuration:

-   `JobRepository` now extends the `JobExplorer` interface, so there is no need to define a separate `JobExplorer` bean.
-   `JobOperator` now extends the `JobLauncher` interface, so there is no need to define a separate `JobLauncher` bean.
-   `JobRegistry` is now smart enough to auto-register jobs automatically, so there is no need to define a separate `JobRegistrySmartInitializingSingleton` bean or a `JobRegistryBeanPostProcessor`.

This reduces the number of beans required for a typical batch application and simplifies the configuration code.

## [](#new-command-line-job-operator)New command line job operator

Spring Batch provided a `CommandLineJobRunner` since version 1. While this runner served its purpose well over the years, it started to show some limitations when it comes to extensibility and customisation. Many issues like static initialisation, non-standard way of handling options and parameters and lack of extensibility have been reported.

Moreover, these issues made it impossible to reuse that runner in Spring Boot, which resulted in duplicate code in both projects as well behaviour divergence (like job parameters incrementer behaviour differences) that is confusing to many users.

This release introduces a modern version of `CommandLineJobRunner`, named `CommandLineJobOperator`, that allows you to operate batch jobs from the command line (start, stop, restart and so on) and that is customisable, extensible and updated to the new changes introduced in Spring Batch 6.

## [](#deprecations-and-pruning)Deprecations and pruning

As with any major release, some features have been deprecated or removed in Spring Batch 6.0. The following changes are worth noting:

-   All deprecated APIs and features from previous versions have been removed
-   Modular configurations through `@EnableBatchProcessing(modular = true)` has been deprecated
-   Several APIs have been deprecated in this version, in order to simplify the core API and reduce its scope

Fore more details about these changes, please refer to the [migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-6.0-Migration-Guide).

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 6, we look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions) and [X](https://twitter.com/springbatch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/6.0/index.html)
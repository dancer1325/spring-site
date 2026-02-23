---
title: Spring Batch 5.2.0-M1 is out!
source: https://spring.io/blog/2024/09/18/spring-batch-5-2-0-m1-is-out
scraped: 2026-02-23T08:16:50.309Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  September 18, 2024 | 0 Comments
---

# Spring Batch 5.2.0-M1 is out!

_Releases | Mahmoud Ben Hassine |  September 18, 2024 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that the first milestone of Spring Batch 5.2 is now available from our milestones repository. This blog post walks you through the main changes in Spring Batch 5.2:

-   Dependencies upgrade
-   Query hints support in JPA item readers
-   Data class support in JDBC item readers
-   Configurable line separator in `RecursiveCollectionLineAggregator`
-   Job registration improvements

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.2.0-M1).

## [](#dependencies-upgrade)Dependencies upgrade

In this release, the Spring dependencies are upgraded to the following versions:

-   Spring Framework: 6.2.0-RC1
-   Spring Retry: 2.0.9
-   Micrometer: 1.14.0-M3
-   Spring Integration: 6.4.0-M3
-   Spring AMQP: 3.2.0-M3
-   Spring Kafka: 3.3.0-M3
-   Spring Data: 3.4.0-M1
-   Spring Ldap: 3.2.6

## [](#query-hints-support-in-jpa-item-readers)Query hints support in JPA item readers

Up until version 5.1, the JPA cursor and paging item readers did not support query hints (like the fetch size, timeout, etc). Users were required to provide a custom query provider in order to specify custom hints.

In this release, JPA readers and their respective builders were updated to accept query hints when defining the JPA query to use.

## [](#data-class-support-in-jdbc-item-readers)Data class support in JDBC item readers

This release introduces a new method in the builders of JDBC cursor and paging item readers that allows users to specify a `DataClassRowMapper` when the type of items is a data class (Java record or Kotlin data class).

The new method named `dataRowMapper(TargetType.class)` is similar to the `beanRowMapper(TargetType.class)` and is designed to make the configuration of row mappers consistent between regular classes (Java beans) and data classes (Java records).

## [](#configurable-line-separator-in-recursivecollectionlineaggregator)Configurable line separator in RecursiveCollectionLineAggregator

Up until now, the line separator property in `RecursiveCollectionLineAggregator` was set to the System's line separator value. While it is possible to change the value through a System property, this configuration style is not consistent with other properties of batch artifacts.

This release introduces a new setter in `RecursiveCollectionLineAggregator` that allows users to configure a custom value of the line separator without having to use System properties.

## [](#job-registration-improvements)Job registration improvements

In version 5.1, the default configuration of batch infrastructure beans was updated to automatically populate the job registry by defining a `JobRegistryBeanPostProcessor` bean in the application context. After a recent update in Spring Framework that changed the log level in `BeanPostProcessorChecker`, several warnings related to the `JobRegistryBeanPostProcessor` were logged in a typical Spring Batch application. These warnings are due to the `JobRegistryBeanPostProcessor` bean having a dependency to a `JobRegistry` bean, which is not recommended and might cause bean lifecycle issues.

These issues have been resolved in this release by changing the mechanism of populating the `JobRegistry` from using a `BeanPostProcessor` to using a `SmartInitializingSingleton`. The `JobRegistryBeanPostProcessor` is now deprecated in favor of the newly added `JobRegistrySmartInitializingSingleton`.

## [](#whats-next)What's next?

I would like to thank all contributors who had a role in this release! Spring Batch 5.2.0-M1 comes with Spring Boot 3.4.0-M3.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/index.html)
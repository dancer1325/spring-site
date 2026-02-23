---
title: Spring Batch 5.1.0-M3 available now!
source: https://spring.io/blog/2023/09/20/spring-batch-5-1-0-m3-available-now
scraped: 2026-02-23T09:22:39.207Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  September 20, 2023 | 0 Comments
---

# Spring Batch 5.1.0-M3 available now!

_Releases | Mahmoud Ben Hassine |  September 20, 2023 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring Batch 5.1.0-M3 is now available from our milestone repository.

This new milestone introduces the following main features:

-   Dependencies upgrade
-   New item reader and writer for Redis
-   Automatic configuration of `JobRegistryBeanPostProcessor`
-   Ability to start a job flow with a decision
-   Ability to provide a custom `JobKeyGenerator`
-   New documentation based on Antora

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.1.0-M3).

## [](#dependencies-upgrade)Dependencies upgrade

This milestone release upgrades Spring dependencies to the following versions:

-   Spring Framework 6.1.0-M5
-   Spring Integration 6.2.0-M3
-   Spring Data 3.2.0-M3
-   Spring LDAP 3.2.0-M3
-   Spring AMQP 3.1.0-M1
-   Spring Kafka 3.1.0-M1
-   Micrometer 1.12.0-M3

## [](#new-item-reader-and-writer-for-redis)New item reader and writer for Redis

A typical case of using Redis within the context of Spring Batch is populating/clearing a cache with reference data before/after a job execution. This is a common performance improvement pattern that is useful to query data from the cache instead of issuing multiple queries to the main database during the execution of the job.

In this milestone release, a new `RedisItemReader` and `RedisItemWriter` based on [Spring Data Redis](https://spring.io/projects/spring-data-redis) have been introduced in the library of built-in item readers and writers. The reader can be configured with a `ScanOptions` to scan the key set to read from Redis. The writer is configurable with a `RedisTemplate` to write items to Redis.

## [](#automatic-configuration-of-jobregistrybeanpostprocessor)Automatic configuration of JobRegistryBeanPostProcessor

When configuring a `JobOperator` in a Spring Batch application, it is necessary to register the jobs in the operator's `JobRegistry`. This registration process is either done manually or automatically by adding a `JobRegistryBeanPostProcessor` bean to the application context.

In this milestone release, the default configuration of Spring Batch (ie when using `@EnableBatchProcessing` or extending `DefaultBatchConfiguration`) now automatically registers a `JobRegistryBeanPostProcessor` bean in the application context. This simplifies the configuration process and improves the user experience when using a `JobOperator`.

## [](#ability-to-start-a-job-flow-with-a-decision)Ability to start a job flow with a decision

When using the XML configuration style, it is possible to start a job flow with a decider thanks to the `decision` element. However, up to version 5.0, it was not possible to achieve the same flow definition with the Java API.

This milestone release adds a new option to the `JobBuilder` API to start a job flow with a `JobExecutionDecider`. This makes both configuration styles more consistent.

## [](#ability-to-provide-a-custom-jobkeygenerator)Ability to provide a custom JobKeyGenerator

By default, Spring Batch identifies job instances by calculating a hash of the identifying job parameters. While it is unlikely to need to customize this identification process, Spring Batch still provides a strategy interface for users to override the default mechanism through the `JobKeyGenerator` API.

Up to version 5.0, it was not possible to provide a custom key generator without having to create a custom `JobRepository` and `JobExplorer`. In this version, it is now possible to provide a custom `JobKeyGenerator` through the factory beans of `JobRepository` and `JobExplorer`.

## [](#new-documentation-based-on-antora)New documentation based on Antora

The reference documentation was updated to use [Antora](https://antora.org). This update introduces a number of improvements, including but not limited to:

-   Multi-version documentation: it is now possible to navigate from one version to another thanks to the drop down version list in the left side menu.
-   Integrated search experience: powered by [Algolia](https://docsearch.algolia.com), the search experience in now better thanks to the integrated search box at the top left of the page
-   Improved configuration style toggle: the toggle to switch between the XML and Java configuration styles for code snippets is now located near each sample, rather than the top of each page

You can check the new documentation version [here](https://docs.spring.io/spring-batch/reference/index.html).

## [](#whats-next)What's next?

### [](#share-your-feedback)Share your feedback!

First, I would like to thank all contributors who had a role in this release! You can try Spring Batch 5.1.0-M3 with Spring Boot 3.2.0-M3. We are planning to release Spring Batch 5.1 GA later this November 2023.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

### [](#upgrade-to-spring-batch-5)Upgrade to Spring Batch 5

I would like to remind our users that Spring Batch 4.3.x will be out of OSS support on November, 18th 2023. Please consider upgrading your applications to Spring Batch 5 at your earliest convenience. You can find the migration guide to v5 [here](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide).

Feel free to reach out to the Spring Batch team on Github if you need help on migrating your existing applications to Spring Batch 5!

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/5.1/index.html)
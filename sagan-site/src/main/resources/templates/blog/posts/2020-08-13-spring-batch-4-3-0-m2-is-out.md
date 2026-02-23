---
title: Spring Batch 4.3.0-M2 is out!
source: https://spring.io/blog/2020/08/13/spring-batch-4-3-0-m2-is-out
scraped: 2026-02-23T13:51:54.324Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  August 13, 2020 | 0 Comments
---

# Spring Batch 4.3.0-M2 is out!

_Releases | Mahmoud Ben Hassine |  August 13, 2020 | 0 Comments_

On behalf of the Spring Batch team, I am pleased to announce that Spring Batch 4.3.0-M2 is now available from our [milestone repository](https://repo.spring.io/milestone/).

## [](#whats-new)What’s new?

This release comes with a number of new features and enhancements that you can find in the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/4.3.0-M2), but here are the major highlights:

#### [](#1-kafka-support-enhancements)1\. Kafka support enhancements

By default, the `KafkaItemReader` reads a topic from the beginning. When we initially introduced this reader in v4.2, it was not possible to configure it to read records from a custom offset. In this release, we added this feature. As a result of this addition, it is now possible to configure the reader to start from the offset stored in Kafka.

#### [](#2-micrometer-support-enhancements)2\. Micrometer support enhancements

Micrometer support has been introduced in v4.2 last year, and we got a lot of feedback since then. One of the requested features is the ability to know the currently active jobs. Spring Batch provides a metric called `spring.batch.job.active` that gives the number of currently active jobs. However, until now, this metric did not let you know which specific jobs are currently active. In this release, we enriched the metric tags to make this possible.

#### [](#3-add-a-new-jobparametersincrementer-implementation)3\. Add a new `JobParametersIncrementer` implementation

The `RunIdIncrementer` serves its purpose well in most cases: It increments a job parameter called `run.id`, which is typically used as job instance discriminator. However, in some circumstances (such as un-ordered database sequences, concurrent access to the incrementer, and others), this incrementer might generate non-unique values, which prevents new job instances from being launched.

In this release, we introduced a new `JobParametersIncrementer` that is based on a [`DataFieldMaxValueIncrementer`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/support/incrementer/DataFieldMaxValueIncrementer.html) from Spring Framework. This incrementer provides stronger guarantees on the uniqueness of generated values compared to the `RunIdIncrementer`.

## [](#dependency-upgrades)Dependency Upgrades

This release upgrades Spring projects dependencies to the following versions:

-   Spring Framework 5.3.0-M2
-   Spring Data 2020.0.0-M2
-   Spring Integration 5.4.0-M2
-   Spring AMQP 2.3.0-M2
-   Spring for Apache Kafka 2.6.0-M1

Spring Batch v4.3.0-M2 can be consumed with Spring Boot 2.4.0-M2, which is planned to be released soon. Stay tuned!

## [](#feedback-and-contributions)Feedback and contributions

I would like to thank all contributors who made this release possible! We look forward to your feedback on this milestone on [Twitter](https://twitter.com/springbatch), [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Github](https://github.com/spring-projects/spring-batch/issues/new/choose).

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/docs/4.3.0-M2/reference/pdf/spring-batch-reference.pdf)
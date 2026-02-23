---
title: Spring Batch 4.2 in now GA!
source: https://spring.io/blog/2019/10/02/spring-batch-4-2-in-now-ga
scraped: 2026-02-23T14:23:18.217Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 02, 2019 | 0 Comments
---

# Spring Batch 4.2 in now GA!

_Releases | Mahmoud Ben Hassine |  October 02, 2019 | 0 Comments_

On behalf of the Spring Batch team, I am pleased to announce the general availability of Spring Batch 4.2, which includes a number of new features and performance improvements!

## [](#new-features)New Features

Spring Batch 4.2 includes the following new features:

-   [Batch Metrics with Micrometer](#batch-metrics-with-micrometer)
-   [Support for Apache Kafka](#support-for-apache-kafka)
-   [Support for Apache Avro](#support-for-apache-avro)

#### [](#batch-metrics-with-micrometer)Batch Metrics with Micrometer

Spring Batch has always provided users with various metrics through the job repository. However, the ability to consume these metrics and react to them in real time has been muted by the use of a database as the metrics store. This release introduces a new feature that lets you monitor your batch jobs by using a true metrics store through [Micrometer](https://micrometer.io/). By default, Spring Batch collects metrics (such as job duration, step duration, item read and write throughput, and others) and registers them in Micrometer’s global metrics registry under the `spring.batch` prefix. These metrics can be sent to any monitoring system supported by Micrometer.

#### [](#support-for-apache-kafka)Support for Apache Kafka

Apache Kafka has quickly become a key data store in the modern enterprise. This release adds new `ItemReader` and `ItemWriter` implementations for Apache Kafka:

-   `KafkaItemReader` can read messages from a single partition or multiple partitions of the same topic. This `ItemReader` is stateful and supports restarting by beginning at the last known good offset.
-   `KafkaItemWriter` uses a `KafkaTemplate` from the Spring for Apache Kafka project to send messages to a given topic.

You can find a comprehensive [Spring Tips](https://www.youtube.com/watch?v=UJesCn731G4) installment about it (by Josh Long).

#### [](#support-for-apache-avro)Support for Apache Avro

Apache Avro is a popular data serialization system and is widely used in today's streaming and batch applications. This release adds support to read and write Avro data files.

## [](#performance-improvements)Performance Improvements

This release comes with some major performance improvements that we described in detail in a [previous post](https://spring.io/blog/2019/09/17/spring-batch-4-2-0-rc1-is-released). Here is an excerpt of the major changes:

-   Enhanced Step Partitioning
-   Improved Job Stop
-   Faster Writes with the `JpaItemWriter`
-   Optimized Bean Mapping with the `BeanWrapperFieldSetMapper`

## [](#other-important-changes)Other Important Changes

We also made the following significant changes:

-   [Dependencies Update](#dependencies-update)
-   [Updated Documentation](#updated-documentation)
-   [Master/Slave Terminology Replacement](#master-slave-terminology-replacement)

#### [](#dependencies-update)Dependencies Update

Spring Batch 4.2 is based on Spring Framework 5.2 and has been updated to use Spring Integration 5.2 and Spring Data 2.2.

#### [](#updated-documentation)Updated Documentation

The [reference documentation](https://docs.spring.io/spring-batch/4.2.x/reference/html/index.html) has been updated to match the same style as the other Spring projects.

#### [](#masterslave-terminology-replacement)Master/Slave Terminology Replacement

Words matter. The use of the words "master" and "slave" within our software can be hurtful to members of our community. Given our goal to be as inclusive as possible, we want to do our best to make that right. In this version, the "master"/"slave" terminology used in our APIs (i.e. `RemoteChunkingMasterStepBuilder`) and the batch XML namespace (i.e. `remote-chunking-slave` element) have been deprecated and replaced with equivalents that use "manager" and "worker" instead. In the next major version, we will remove the derivatives that use the "master" and "slave" nomenclature permanently.

## [](#whats-next)What's Next?

We will be working on bug fix releases for all branches of the v4 line (v4.0, v4.1 and v4.2). Please note that v4.0.4 will be the last bug fix release for the 4.0 line, so we highly recommend users to migrate to the latest and greatest: v4.2!

Spring Batch 4.2 can be consumed by using Spring Boot 2.2.0.RC1. Please give it a try and share your feedback! Feel free to ping [@michaelminella](https://www.twitter.com/michaelminella) or [@b\_e\_n\_a\_s](https://www.twitter.com/b_e_n_a_s) on Twitter or to ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](https://jira.spring.io/projects/BATCH/).

## [](#spring-batch-at-springone-platform)Spring Batch at SpringOne Platform

[SpringOne Platform](https://springoneplatform.io) is around the corner and will be held in Austin next week! Michael Minella and I will have the pleasure to share with you some of the nice new features of Spring Batch v4.2 in our joint talk [Batch Processing in 2019](https://springoneplatform.io/2019/sessions/batch-processing-in-2019). We hope to see you there!

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.2.x/reference/html/index.html)
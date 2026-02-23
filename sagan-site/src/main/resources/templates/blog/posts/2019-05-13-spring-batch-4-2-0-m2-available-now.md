---
title: Spring Batch 4.2.0.M2 available now!
source: https://spring.io/blog/2019/05/13/spring-batch-4-2-0-m2-available-now
scraped: 2026-02-23T14:48:38.897Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  May 13, 2019 | 3 Comments
---

# Spring Batch 4.2.0.M2 available now!

_Releases | Mahmoud Ben Hassine |  May 13, 2019 | 3 Comments_

I am pleased to announce that Spring Batch 4.2.0.M2 is available now from our [milestone repository](https://repo.spring.io/milestone/).

## [](#whats-new)What’s new?

This release adds a new item reader and a new item writer for [Apache Kafka](https://kafka.apache.org):

-   `KafkaItemReader` can read messages from a single partition or multiple partitions of the same topic. This reader stores message offsets in the `ExecutionContext` to support restart.
-   `KafkaItemWriter` uses a `KafkaTemplate` from the [Spring for Apache Kafka](https://spring.io/projects/spring-kafka) project to send messages to a given topic.

I would like to thank [Mathieu Ouellet](https://github.com/mouellet) for his amazing contribution in adding support for Apache Kafka in Spring Batch!

## [](#feedback)Feedback

Spring Batch `4.2.0.M2` can be consumed with Spring Boot `2.2.0.M3`. We look forward to hearing your feedback on this second milestone! Feel free to ping [@michaelminella](https://www.twitter.com/michaelminella) or [@*benas*](https://www.twitter.com/_benas_) on Twitter or to ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](https://jira.spring.io/projects/BATCH/).

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.2.x/reference/html/index.html)
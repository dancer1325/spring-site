---
title: Spring Batch 4.2.0.M1 available now
source: https://spring.io/blog/2019/04/24/spring-batch-4-2-0-m1-available-now
scraped: 2026-02-23T14:50:05.848Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  April 24, 2019 | 0 Comments
---

# Spring Batch 4.2.0.M1 available now

_Releases | Mahmoud Ben Hassine |  April 24, 2019 | 0 Comments_

I am pleased to announce that the first milestone of Spring Batch 4.2 has been released and is available from our [milestone repository](https://repo.spring.io/milestone/).

The major feature of this release is the addition of batch metrics with [Micrometer](https://micrometer.io).

## [](#batch-metrics-with-micrometer)Batch Metrics with Micrometer

This release introduces a new feature that lets you monitor your batch jobs by using Micrometer. By default, Spring Batch collects metrics (such as job duration, step duration, item read and write throughput, and others) and registers them in Micrometer's global metrics registry under the `spring.batch` prefix. These metrics can be sent to any [monitoring system](https://micrometer.io/docs/concepts#_supported_monitoring_systems) supported by Micrometer.

For more details about this new feature, please refer to the [Monitoring and Metrics](https://docs.spring.io/spring-batch/4.2.x/reference/html/monitoring-and-metrics.html) section of the reference documentation.

## [](#other-updates)Other updates

In addition to Micrometer support, this milestone includes other improvements:

-   The reference documentation has been updated to match the same style as the other Spring projects
-   Dependencies have been updated to the latest milestones of Spring projects:

Spring Framework `5.2.0.M1`, Spring Data `2.2.0.M3` and Spring Integration `5.2.0.M1`

-   A number of other small improvements and bug fixes

For a complete list of changes, please check the [change log](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10090&version=17267).

## [](#feedback)Feedback

Spring Batch `4.2.0.M1` can be consumed with Spring Boot `2.2.0.M2`. Go ahead and create your next Spring Batch app on [start.spring.io](https://start.spring.io)! We have also created a [new sample](https://github.com/spring-projects/spring-batch/tree/master/spring-batch-samples#batch-metrics-with-micrometer) to show how to monitor Spring Batch jobs with Micrometer, [Prometheus](https://prometheus.io), and [Grafana](https://grafana.com).

We look forward to hearing your feedback on this first milestone! Feel free to ping [@michaelminella](https://www.twitter.com/michaelminella) or [@*benas*](https://www.twitter.com/_benas_) on Twitter or to ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](https://jira.spring.io/projects/BATCH/).

## [](#whats-next)What's next?

The next milestone will ship support for [Apache Kafka](https://kafka.apache.org). We are planning to add a new item reader and writer to read data from and write it to Kafka topics. Stay tuned!

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.2.x/reference/html/index.html)
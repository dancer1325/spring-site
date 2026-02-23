---
title: Spring Cloud Data Flow 1.6 RC1 released
source: https://spring.io/blog/2018/07/23/spring-cloud-data-flow-1-6-rc1-released
scraped: 2026-02-23T15:18:58.018Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 23, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.6 RC1 released

_Releases | Mark Pollack |  July 23, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `1.6 RC1`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.6.0.RC1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.6.0.RC1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.6.0.RC1/reference/htmlsingle/#kubernetes-getting-started).

## [](#here-are-the-release-highlights)[](#here-are-the-release-highlights)Here are the release highlights:

## [](#pcf-scheduler)[](#pcf-scheduler)PCF Scheduler

The Pivotal Cloud Foundry implementation of Scheduler improved on a few fronts to enhance the developer experience. Validation of the cron-expression and proactive measures to prevent the scheduler service from creating incorrect schedules is now part of this release.

## [](#dashboard)[](#dashboard)Dashboard

The stream deployment history is available for review from the Dashboard. It is convenient to review the context-specific history of a stream from a central location; especially, when the CI/CD systems continually deploy new version application artifacts that belong to the stream.

## [](#batch-database-schema-and-optimization)[](#batch-database-schema-and-optimization)Batch Database Schema and Optimization

Thanks to the community for thorough validation and feedback on the database schema. The batch and task schemas have enhanced for the cases when there are large numbers of Task executions for MySQL and PostgreSQL. Optimizations for other databases are on their way.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).
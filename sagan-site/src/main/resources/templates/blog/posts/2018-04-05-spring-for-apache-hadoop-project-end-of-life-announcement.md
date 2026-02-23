---
title: Spring for Apache Hadoop project End-Of-Life announcement
source: https://spring.io/blog/2018/04/05/spring-for-apache-hadoop-project-end-of-life-announcement
scraped: 2026-02-23T15:29:36.752Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Thomas Risberg |  April 05, 2018 | 1 Comment
---

# Spring for Apache Hadoop project End-Of-Life announcement

_News | Thomas Risberg |  April 05, 2018 | 1 Comment_

Dear Spring community,

The Spring team hereby announces that the [Spring for Apache Hadoop project](https://projects.spring.io/spring-hadoop) will reach End-Of-Life status twelve months from today on April 5th, 2019. We will publish occasional 2.5.x maintenance releases as needed up until that point and will then move the project to the attic. The current Spring for Apache Hadoop 2.5.0 release is built using Apache Hadoop version 2.7.3 and should be compatible with the latest releases of the most popular Hadoop distributions.

The [Spring Cloud Stream App Starter - HDFS Sink](https://github.com/spring-cloud-stream-app-starters/hdfs) applications rely on the Spring for Apache Hadoop project. Moving forward, we will port the required capabilities directly onto the HDFS App Starter project. Spring Cloud Data Flow would continue to orchestrate the HDFS sink applications into coherent streaming pipelines.

We recommend that all users switch to use Spring Cloud Data Flow and Spring Cloud Stream App Starters HDFS sinks for any future projects.

All the best,

Thomas & Janne
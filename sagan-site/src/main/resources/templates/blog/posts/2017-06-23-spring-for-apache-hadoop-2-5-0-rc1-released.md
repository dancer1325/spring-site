---
title: Spring for Apache Hadoop 2.5.0.RC1 released
source: https://spring.io/blog/2017/06/23/spring-for-apache-hadoop-2-5-0-rc1-released
scraped: 2026-02-23T16:27:59.417Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 23, 2017 | 0 Comments
---

# Spring for Apache Hadoop 2.5.0.RC1 released

_Releases | Thomas Risberg |  June 23, 2017 | 0 Comments_

## [](#new-release-candidate-for-spring-for-apache-hadoop-25)New release candidate for Spring for Apache Hadoop 2.5

We are pleased to announce the Spring for Apache Hadoop 2.5 release candidate release.

The 2.5 version is primarily a bug fix and version upgrade release.

See the release [changelog](http://docs.spring.io/spring-hadoop/docs/2.5.0.RC1/changelog.txt) for details.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.5.0.RC1 (default - Apache Hadoop stable 2.7.3)
-   2.5.0.RC1-cdh5 (Cloudera CDH 5.10)
-   2.5.0.RC1-hdp26 (Hortonworks HDP 2.6)

## [](#spring-for-apache-hadoop-future)Spring for Apache Hadoop Future

The Hadoop ecosystem is shifting and we think it is time to adapt the Spring for Apache Hadoop (SHDP) project to these shifting trends. We will maintain the SHDP 2.x version with bug fixes and version upgrades but we don’t plan on adding features. All new development will go into version 3.0 of SHDP.

Spring for Apache Hadoop 3.0 will be a rewrite based on the existing code but we will only port over some parts of the code base. We will rely on Spring Boot configuration in Java code and will no longer support the XML namespace. We will focus on HDFS readers and writers, Apache Spark integration and Spring Batch support. The Hive, Pig, HBase and MapReduce code will have much lower priority and will initially not be included. If there is strong demand we'll consider adding this code back in future releases.

We will initially focus on the following areas:

-   Java 8 minimum requirement
-   Hadoop 3.0 support
-   Spring Boot 2.0 support
-   HDFS readers and writers
-   Spark 2.0 integration
-   Spring Batch 4.0 item readers and writers plus builders

We hope that the code based on the plain Apache Hadoop dependencies will work across different distros so we are not planning on releasing Cloudera and Hortonworks specific versions. If this assumption proves problematic we'll revisit this decision.

Please provide feedback so we can prioritize the work on new features scheduled for 3.0. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
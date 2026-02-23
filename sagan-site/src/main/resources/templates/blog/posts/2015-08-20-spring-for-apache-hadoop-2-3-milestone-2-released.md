---
title: Spring for Apache Hadoop 2.3 Milestone 2 released
source: https://spring.io/blog/2015/08/20/spring-for-apache-hadoop-2-3-milestone-2-released
scraped: 2026-02-23T19:44:11.424Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  August 20, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.3 Milestone 2 released

_Releases | Thomas Risberg |  August 20, 2015 | 0 Comments_

We are pleased to announce the Spring for Apache Hadoop 2.3 M2 milestone release.

The most important enhancements in this release:

-   New batch tasklets: Support for running a simple Spark app \[[SHDP-397](https://jira.spring.io/browse/SHDP-397)\] and for running a simple Sqoop2 Job \[[SHDP-506](https://jira.spring.io/browse/SHDP-506)\]
-   Better boot support: Add jobHistoryAddress to SpringHadoopProperties for Boot configuration \[[SHDP-517](https://jira.spring.io/browse/SHDP-517)\]
-   YARN: Support dots in yarn container group names \[[SHDP-515](https://jira.spring.io/browse/SHDP-515)\]

See the release [changelog](http://docs.spring.io/spring-hadoop/docs/2.3.0.M2/changelog.txt) for details.

The new support for running a Spark job on YARN via a Spring Batch tasklet opens possibilities for integrating Spark tasks in a larger Spring Batch flow We will show a simple example of this at the upcoming [SpringOne 2GX](http://springone2gx.com/) conference during our ["Hadoop Workflows and Distributed YARN Apps using Spring technologies"](https://2015.event.springone2gx.com/schedule/sessions/hadoop_workflows_and_distributed_yarn_apps_using_spring_technologies.html) presentation. In this presentation we'll also explore how Hadoop based apps can take advantage of a cloud-native development approach.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.3.0.M2 (default - Apache Hadoop stable 2.7.1)
-   2.3.0.M2-hadoop26 (Apache Hadoop 2.6.0)
-   2.3.0.M2-phd30 (Pivotal HD 3.0)
-   2.3.0.M2-cdh5 (Cloudera CDH 5.4)
-   2.3.0.M2-hdp23 (Hortonworks HDP 2.3)

Please provide feedback so we can prioritize the work on new features scheduled for 2.3 (see previous [blog post](https://spring.io/blog/2015/05/21/spring-for-apache-hadoop-2-2-rc1-released) for a list) and any additional feature requests. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
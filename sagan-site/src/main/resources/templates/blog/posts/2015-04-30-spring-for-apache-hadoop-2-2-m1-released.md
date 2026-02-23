---
title: Spring for Apache Hadoop 2.2 M1 released
source: https://spring.io/blog/2015/04/30/spring-for-apache-hadoop-2-2-m1-released
scraped: 2026-02-23T21:04:32.449Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 30, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.2 M1 released

_Releases | Thomas Risberg |  April 30, 2015 | 0 Comments_

We are pleased to announce the Spring for Apache Hadoop 2.2 M1 milestone releases.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.2.0.M1 (default - Apache Hadoop stable 2.6.0)
-   2.2.0.M1-phd21 (Pivotal HD 2.1)
-   2.2.0.M1-phd30 (Pivotal HD 3.0)
-   2.2.0.M1-cdh5 (Cloudera CDH5)
-   2.2.0.M1-hdp22 (Hortonworks HDP 2.2)

The most important enhancements in the Spring for Apache Hadoop 2.2 M1 release:

-   Remove support for running with JDK 6, Java 7 or later is now required
-   Improvements to the HDFS writer to support syncable writes and a new timeout option
-   Add support for Pivotal HD 3.0
-   Update CLoudera CDH 5 to use version 5.3.3
-   Update Hortonworks HDP 2.2 version to 2.2.4.0
-   Update Kite SDK to version 1.0
-   Update Spring project versions to the latest

For the next milestones and releases we are planning on working on the following features:

-   Better Java Configuration support.
-   Add better support for for Hiveserver2 including a batch tasklet.
-   Basic support for a batch tasklet to run Spark apps.
-   Better boot support throughout the different modules.
-   Improved security support (i.e. the YARN Boot CLI interaction, etc).
-   Enhancements to have seamless integration with spring-cloud components (i.e. spring-cloud-cluster).

Please provide feedback so we can prioritize the work on these features and any additional feature requests. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
---
title: Spring for Apache Hadoop 2.2 RC1 released
source: https://spring.io/blog/2015/05/21/spring-for-apache-hadoop-2-2-rc1-released
scraped: 2026-02-23T19:51:43.059Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  May 21, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.2 RC1 released

_Releases | Thomas Risberg |  May 21, 2015 | 0 Comments_

We are pleased to announce the Spring for Apache Hadoop 2.2 RC1 milestone releases. This is the last planned release before the 2.2 GA release in approximately 2 weeks.

The most important changes/enhancements in the Spring for Apache Hadoop 2.2 version are:

-   Remove support for running with JDK 6, Java 7 or later is now required
-   Improvements to the HDFS writer to support syncable writes and a new timeout option
-   Add support for Pivotal HD 3.0
-   Update CLoudera CDH 5 to use version 5.3.3
-   Update Hortonworks HDP 2.2 version to 2.2.4.0
-   Update Kite SDK to version 1.0
-   Update Spring project versions to the latest

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.2.0.RC1 (default - Apache Hadoop stable 2.6.0)
-   2.2.0.RC1-phd21 (Pivotal HD 2.1)
-   2.2.0.RC1-phd30 (Pivotal HD 3.0)
-   2.2.0.RC1-cdh5 (Cloudera CDH5)
-   2.2.0.RC1-hdp22 (Hortonworks HDP 2.2)

The biggest changes for the next 2.3 version will in be the Hive support:

-   We will update the Hive features to use the 1.x series of Apache Hive. Hive 1.x dropped support for Hiveserver v1 and the corresponding Thrift client. This means we will have to remove the code we have to support these features including the Hive namespace for XML configuration. We will replace these features with new implementations that use the JDBC client for equivalent functionality. There will be some changes needed to the configuration when moving from Hiveserver v1 to Hiveserver v2 (hiveserver2). Anyone relying on the Hive v1 features should continue to use the Spring for Apache Hadoop 2.2.x or earlier versions.

We are also planning on working on the following features for 2.3:

-   Better Java Configuration support.
-   Basic support for a batch tasklet to run Spark apps.
-   Better boot support throughout the different modules.
-   Improved security support (i.e. the YARN Boot CLI interaction, etc).
-   Enhancements to have seamless integration with spring-cloud components (i.e. spring-cloud-cluster).

Please provide feedback so we can prioritize the work on these features and any additional feature requests. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
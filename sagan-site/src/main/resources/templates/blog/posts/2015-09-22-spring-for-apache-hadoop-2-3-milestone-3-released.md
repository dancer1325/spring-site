---
title: Spring for Apache Hadoop 2.3 Milestone 3 released
source: https://spring.io/blog/2015/09/22/spring-for-apache-hadoop-2-3-milestone-3-released
scraped: 2026-02-23T19:42:12.147Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  September 22, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.3 Milestone 3 released

_Releases | Thomas Risberg |  September 22, 2015 | 0 Comments_

We are pleased to announce the Spring for Apache Hadoop 2.3 M3 milestone release.

The most important enhancements in this release:

-   Update build to use Spring Framework 4.2.1, Boot 1.3.0.M5, Batch 3.0.5 [\[SHDP-509\]](https://jira.spring.io/browse/SHDP-509)
-   Move annotation config to separate sub-project to reduce dependencies for spring-data-hadoop-boot [\[SHDP-525\]](https://jira.spring.io/browse/SHDP-525)
-   Add additional properties to Spark Tasklet [\[SHDP-397\]](https://jira.spring.io/browse/SHDP-397)
-   Upgrade build to use to Spark 1.5.0 [\[SHDP-521\]](https://jira.spring.io/browse/SHDP-521)

See the release [changelog](http://docs.spring.io/spring-hadoop/docs/2.3.0.M3/changelog.txt) for details.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.3.0.M3 (default - Apache Hadoop stable 2.7.1)
-   2.3.0.M3-hadoop26 (Apache Hadoop 2.6.0)
-   2.3.0.M3-phd30 (Pivotal HD 3.0)
-   2.3.0.M3-phd21 (Pivotal HD 2.1)
-   2.3.0.M3-cdh5 (Cloudera CDH 5.4)
-   2.3.0.M3-hdp23 (Hortonworks HDP 2.3)

Please provide feedback so we can prioritize the work on new features scheduled for 2.3 (see previous [blog post](https://spring.io/blog/2015/05/21/spring-for-apache-hadoop-2-2-rc1-released) for a list) and any additional feature requests. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
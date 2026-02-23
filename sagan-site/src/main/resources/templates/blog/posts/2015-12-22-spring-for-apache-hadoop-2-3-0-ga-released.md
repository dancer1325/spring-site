---
title: Spring for Apache Hadoop 2.3.0 GA released
source: https://spring.io/blog/2015/12/22/spring-for-apache-hadoop-2-3-0-ga-released
scraped: 2026-02-23T19:32:44.080Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  December 22, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.3.0 GA released

_Releases | Thomas Risberg |  December 22, 2015 | 0 Comments_

We are pleased to announce the Spring for Apache Hadoop 2.3.0 GA release.

Spring for Apache Hadoop 2.3 adds the following new features and improvements:

-   Added support for Hive 1.x and updated HiveTemplate to work with HiveServer2
-   New batch tasklet for Apache Spark, see docs for a usage [example](http://docs.spring.io/spring-hadoop/docs/2.3.0.RELEASE/reference/html/springandhadoop-spark.html)
-   Added FlushTimeoutTrigger to StoreObjectSupport to allow to flush to disk during writes
-   Replaced internal state machine implementation with new "spring-statemachine" project
-   Added jobHistoryAddress to SpringHadoopProperties for Boot configuration
-   Update build to use Spring Framework 4.2.4, Spring Batch 3.0.6.RELEASE, Spring Boot 1.3.1.RELEASE and Spring Integration 4.2.4.RELEASE.

See the release [changelog](http://docs.spring.io/spring-hadoop/docs/2.3.0.RELEASE/changelog.txt) for details.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.3.0.RELEASE (default - Apache Hadoop stable 2.7.1)
-   2.3.0.RELEASE-hadoop26 (Apache Hadoop 2.6.0)
-   2.3.0.RELEASE-phd30 (Pivotal HD 3.0)
-   2.3.0.RELEASE-phd21 (Pivotal HD 2.1)
-   2.3.0.RELEASE-cdh5 (Cloudera CDH 5.4)
-   2.3.0.RELEASE-hdp23 (Hortonworks HDP 2.3)

Please provide feedback so we can prioritize the work on new features scheduled for 2.4. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
---
title: Spring for Apache Hadoop 2.0 RC2 released
source: https://spring.io/blog/2014/04/02/spring-for-apache-hadoop-2-0-rc2-released
scraped: 2026-02-24T07:34:11.560Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 02, 2014 | 0 Comments
---

# Spring for Apache Hadoop 2.0 RC2 released

_Releases | Thomas Risberg |  April 02, 2014 | 0 Comments_

We are pleased to announce that Spring for Apache Hadoop version 2.0 has reached the Release Candidate stage. The latest release is 2.0.0.RC2. We are moving closer to the GA release, so this is a good time to give this new 2.0 version a try.

---

> ***The spring-yarn framework makes it easier for you to develop Spring based applications that can be deployed to run on Hadoop v2 using YARN***

---

The main focus for Spring for Apache Hadoop 2.0 is to add YARN application development support in addition to continue to provide improvements in the HDFS and MapReduce support. You can see many of these new YARN features in use in the [YARN samples](https://github.com/SpringSource/spring-hadoop-samples/tree/master/yarn) and we will be publishing new [Spring IO Guides](https://spring.io/guides) the coming weeks.

The YARN support introduced in Spring for Apache Hadoop 2.0:

-   The support for YARN features is provided in the new spring-yarn sub-project. The spring-yarn framework makes it easier for you to develop Spring based applications that can be deployed to run on Hadoop v2 using YARN.
-   We have also integrated the YARN support with Spring Boot so that you can deploy Spring Boot applications on YARN.
-   Spring Boot promotes an annotation based programming model and we have added annotation based configuration for Hadoop YARN features.

The default distribution for the Spring for Apache Hadoop 2.0 releases is the current Apache Hadoop 2 stable release which is 2.2.0.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.0.0.RC2 (default - Apache Hadoop stable 2.2.0)
-   2.0.0.RC2-hadoop12 (Apache Hadoop stable 1.2.1)
-   2.0.0.RC2-phd1 (Pivotal HD 1.1)
-   2.0.0.RC2-cdh4 (Cloudera CDH4 MR1)
-   2.0.0.RC2-cdh5 (Cloudera CDH5 YARN beta)
-   2.0.0.RC2-hdp13 (Hortonworks HDP 1.3)
-   2.0.0.RC2-hdp20 (Hortonworks HDP 2.0)

By the next release candidate (due in a couple of weeks) we expect to add the following distributions:

-   Apache Hadoop 2.4.0
-   Pivotal HD 2.0
-   Cloudera CDH5 GA
-   Hortonworks HDP 2.1

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).
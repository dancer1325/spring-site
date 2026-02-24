---
title: Spring for Apache Hadoop 2.0 M5 released
source: https://spring.io/blog/2014/02/06/spring-for-apache-hadoop-2-0-m5-released
scraped: 2026-02-24T07:42:47.246Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  February 06, 2014 | 1 Comment
---

# Spring for Apache Hadoop 2.0 M5 released

_Releases | Thomas Risberg |  February 06, 2014 | 1 Comment_

We are pleased to announce the Spring for Apache Hadoop 2.0 M5 milestone releases. We are moving closer to a release candidate, so this is a good time to highlight what is new in this 2.0 version and how it compares to 1.0.

Spring for Apache Hadoop 1.0 primarily targets using HDFS and MapReduce with either MapReduce v1 or MapReduce v2 (YARN). The default distribution is Apache Hadoop 1.2.1 with additional "flavors" provided for other distributions: Hadoop 2.2.0, Pivotal HD 1.1, Cloudera CDH4 MR1 or MR2 YARN and Hortonworks HDP 1.3.

The main focus for Spring for Apache Hadoop 2.0 is to add YARN application development support in addition to continue to provide improvements in the HDFS and MapReduce support. The default distribution for the 2.0 releases going forward is Apache Hadoop 2.2.0.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.0.0.M5 (default - Apache Hadoop stable 2.2.0)
-   2.0.0.M5-hadoop12 (Apache Hadoop stable 1.2.1)
-   2.0.0.M5-phd1 (Pivotal HD 1.1)
-   2.0.0.M5-cdh4 (Cloudera CDH4 MR1)
-   2.0.0.M5-cdh5 (Cloudera CDH5 YARN beta)
-   2.0.0.M5-hdp20 (Hortonworks HDP 2.0)

The most important enhancements in the Spring for Apache Hadoop 2.0 version:

-   The support for YARN features is provided in the new spring-yarn sub-project. The spring-yarn framework makes it easier for you to develop Spring based applications that can be deployed to run on Hadoop v2 using YARN.
-   We have also integrated the YARN support with Spring Boot so that you can deploy Spring Boot applications on YARN. We will be following up with a blog post to explain this feature in much more detail.
-   Spring Boot promotes an annotation based programming model and we have added annotation based configuration for Hadoop YARN features.

You can see many of these new YARN features in use in the [YARN samples](https://github.com/SpringSource/spring-hadoop-samples/tree/master/yarn)

We have also added a spring-data-hadoop-store sub-project to provide better support for writing data to HDFS using DataWriter and DataReader implementation supporting formats like text files and SequenceFiles with or without compression. This new sub-project also integrates with the Dataset support from [Kite SDK](http://kitesdk.org/).

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).
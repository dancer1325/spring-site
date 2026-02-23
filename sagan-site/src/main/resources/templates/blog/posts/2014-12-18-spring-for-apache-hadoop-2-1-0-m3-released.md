---
title: Spring for Apache Hadoop 2.1.0.M3 Released
source: https://spring.io/blog/2014/12/18/spring-for-apache-hadoop-2-1-0-m3-released
scraped: 2026-02-23T22:02:48.999Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  December 18, 2014 | 0 Comments
---

# Spring for Apache Hadoop 2.1.0.M3 Released

_Releases | Thomas Risberg |  December 18, 2014 | 0 Comments_

We are pleased to announce the third milestone release of Spring for Apache Hadoop 2.1. The release is now available in the [Spring IO repository](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-hadoop/2.1.0.M3/)

We have worked on improving the YARN and data store writers. There are also new @Configuration changes and improvements to the Boot auto configuration features. See the [full changelog](http://docs.spring.io/spring-hadoop/docs/2.1.0.M3/changelog.txt) for more details.

Beginning with the Spring for Apache Hadoop 2.1 version, we now only support Hadoop 2.0 APIs and no longer provide backwards compatibility with older Hadoop v1 distributions. If you need support for older Hadoop versions please use the 2.0.4 or 1.1.0 versions of Spring for Apache Hadoop.

We provide support and "flavored" versions for the following distributions:

-   Apache Hadoop 2.4.1 (2.1.0.M3-hadoop24)
-   Apache Hadoop 2.5.1 (2.1.0.M3)
-   Apache Hadoop 2.6.0 (2.1.0.M3-hadoop26)
-   Pivotal HD 2.1 (2.1.0.M3-phd21)
-   Cloudera CDH5 (2.1.0.M3-cdh5)
-   Hortonworks HDP 2.1 (2.1.0.M3-hdp21)

The default distribution version is now Apache Hadoop 2.5.1. We continue to update the supported versions and have now added Apache Hadoop 2.6.0. We also added Hortonworks HDP 2.2 to the build and will provide that option as a pre-packaged flavor in the next release.

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).
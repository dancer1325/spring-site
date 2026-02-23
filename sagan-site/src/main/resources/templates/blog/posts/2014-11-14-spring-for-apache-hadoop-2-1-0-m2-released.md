---
title: Spring for Apache Hadoop 2.1.0.M2 Released
source: https://spring.io/blog/2014/11/14/spring-for-apache-hadoop-2-1-0-m2-released
scraped: 2026-02-23T22:07:26.691Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  November 14, 2014 | 0 Comments
---

# Spring for Apache Hadoop 2.1.0.M2 Released

_Releases | Thomas Risberg |  November 14, 2014 | 0 Comments_

We are pleased to announce the second milestone release of Spring for Apache Hadoop 2.1. The release is now available in the [Spring IO repository](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-hadoop/2.1.0.M2/)

There are lots of version upgrades for the 2.1.0.M2 release: Spring Framework 4.1.2, Spring Boot 1.2.0.RC1 and more. See the [full changelog](http://docs.spring.io/spring-hadoop/docs/2.1.0.M2/changelog.txt) for more details.

We updated the Kite SDK dataset support to 0.17.0 and this means there are some changes to the API. The use of a namespace in addition to the basePath is now mandatory. The `DatasetTemplate` now also uses `ViewCallback`s instead of a partition expression for querying the data.

Beginning with the Spring for Apache Hadoop 2.1 version, we now only support Hadoop 2.0 APIs and no longer provide backwards compatibility with older Hadoop v1 distributions. If you need support for older Hadoop versions please use the 2.0.3 or 1.1.0 versions of Spring for Apache Hadoop.

We provide support and "flavored" versions for the following distributions:

-   Apache Hadoop 2.4.1 (2.1.0.M2-hadoop24)
-   Apache Hadoop 2.5.1 (2.1.0.M2)
-   Pivotal HD 2.1 (2.1.0.M2-phd21)
-   Cloudera CDH5 (2.1.0.M2-cdh5)
-   Hortonworks HDP 2.1 (2.1.0.M2-hdp21)

The default distribution version is changed to be Apache Hadoop 2.5.1. We have added support for Pivotal HD 2.1 and updated the Cloudera CDH version to CDH 5.2. We will continue to update the supported versions and expect to support Apache Hadoop 2.6.0 and Hortonworks HDP 2.2 in the next release.

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).
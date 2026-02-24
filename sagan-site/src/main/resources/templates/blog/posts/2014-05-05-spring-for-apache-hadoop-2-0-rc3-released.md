---
title: Spring for Apache Hadoop 2.0 RC3 released
source: https://spring.io/blog/2014/05/05/spring-for-apache-hadoop-2-0-rc3-released
scraped: 2026-02-24T07:25:32.886Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  May 05, 2014 | 0 Comments
---

# Spring for Apache Hadoop 2.0 RC3 released

_Releases | Thomas Risberg |  May 05, 2014 | 0 Comments_

We are happy to announce that Spring for Apache Hadoop version 2.0 RC3 has just been released.

---

> ***Now includes support for the latest Hadoop distributions - Pivotal HD 2.0, Cloudera CDH5 and Hortonworks HDP 2.1***

---

Other than version upgrades, the changes in this version revolve around partitioning support for writing datasets [SHDP-327](https://jira.spring.io/browse/SHDP-327).

The main focus for Spring for Apache Hadoop 2.0 is to add YARN application development support in addition to continue to provide improvements in the HDFS and MapReduce support. You can see many of these new YARN features in use in the [YARN samples](https://github.com/SpringSource/spring-hadoop-samples/tree/master/yarn) and in the new [Spring IO Guides](https://spring.io/guides?filter=yarn).

The default distribution for the Spring for Apache Hadoop 2.0 releases is the current Apache Hadoop 2 stable release which is 2.2.0.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.0.0.RC3 (default - Apache Hadoop stable 2.2.0)
-   2.0.0.RC3-hadoop12 (Apache Hadoop stable 1.2.1)
-   2.0.0.RC3-phd1 (Pivotal HD 1.1)
-   2.0.0.RC3-phd20 (Pivotal HD 2.0)
-   2.0.0.RC3-cdh4 (Cloudera CDH4 MR1)
-   2.0.0.RC3-cdh5 (Cloudera CDH5 YARN)
-   2.0.0.RC3-hdp13 (Hortonworks HDP 1.3)
-   2.0.0.RC3-hdp20 (Hortonworks HDP 2.0)
-   2.0.0.RC3-hdp21 (Hortonworks HDP 2.1)

For instructions on how to build with these versions see the [project wiki](https://github.com/spring-projects/spring-hadoop/wiki#building-using-supported-distributions).

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).
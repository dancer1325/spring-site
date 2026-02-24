---
title: Spring for Apache Hadoop 2.0 is now GA
source: https://spring.io/blog/2014/06/11/spring-for-apache-hadoop-2-0-is-now-ga
scraped: 2026-02-23T22:26:51.947Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 11, 2014 | 0 Comments
---

# Spring for Apache Hadoop 2.0 is now GA

_Releases | Thomas Risberg |  June 11, 2014 | 0 Comments_

We are pleased to announce that Spring for Apache Hadoop version 2.0 is now GA.

---

> ***Providing support for Hadoop v2.0 and YARN while maintaining compatibility with Hadoop v1.0***

---

It's been well over a year since Spring for Apache Hadoop 1.0 was [released](http://spring.io/blog/2013/02/26/spring-for-apache-hadoop-1-0-goes-ga). Spring was part of VMware at that time. Spring for Apache Hadoop 1.0 supported Hadoop 1.0.4 and 1.1.1 but not the latest 2.0 alpha versions. A lot has changed since then. Spring is now part of Pivotal which brings us together with a great portfolio of open source technologies. The Apache Hadoop project has released several new versions of Hadoop including 2.2.0 which introduces the YARN framework. So, it was only natural to keep moving the Spring for Apache Hadoop project forward. For the Spring for Apache Hadoop 2.0 release the major themes are:

-   provide support for new versions and distributions like

-   Apache Hadoop 2.2.0, 2.4.0
-   Pivotal HD 2.0
-   Cloudera CDH 5
-   Hortonworks HDP 2.1

-   maintain compatibility with Hadoop v1.0
-   provide a great programming model for developing YARN applications
-   add new features like

-   new writers and readers for working with HDFS data
-   new support for writing and reading POJO Datasets using the Kite SDK

We have [sample](https://github.com/SpringSource/spring-hadoop-samples) applications available for showing how to use the more commonly used features. We also have some [Spring IO Guides](http://spring.io/guides?filter=yarn) for developing Spring YARN applications.

The target distribution for the Spring for Apache Hadoop 2.0 GA release is the current Apache Hadoop v2 stable release which is 2.2.0. This is the version used for the 2.0.0.RELEASE's transitive dependencies.

For other versions or distributions we continue to provide specific artifacts with their respective transitive dependencies in the Spring IO release repository:

-   2.0.0.RELEASE (default - Apache Hadoop stable 2.2.0)
-   2.0.0.RELEASE-hadoop24 (Apache Hadoop latest 2.4.0)
-   2.0.0.RELEASE-hadoop12 (Apache Hadoop stable 1.2.1)
-   2.0.0.RELEASE-phd1 (Pivotal HD 1.1)
-   2.0.0.RELEASE-phd20 (Pivotal HD 2.0)
-   2.0.0.RELEASE-cdh4 (Cloudera CDH4 MR1)
-   2.0.0.RELEASE-cdh5 (Cloudera CDH5 YARN)
-   2.0.0.RELEASE-hdp13 (Hortonworks HDP 1.3)
-   2.0.0.RELEASE-hdp20 (Hortonworks HDP 2.0)
-   2.0.0.RELEASE-hdp21 (Hortonworks HDP 2.1)

For instructions on how to build with these versions see the [project wiki](https://github.com/spring-projects/spring-hadoop/wiki#building-using-supported-distributions).

The versions for Apache Hadoop 2.2.0, 2.4.0 and 1.2.1 are also available in the Maven Central repository.

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. There will be deep dive sessions on Spring for Apache Hadoop along with general Big Data talks to provide an introduction to the landscape and challenges in developing Big Data applications.
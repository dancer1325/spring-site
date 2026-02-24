---
title: Spring for Apache Hadoop 1.0.2 GA and 2.0 M2 released
source: https://spring.io/blog/2013/11/14/spring-for-apache-hadoop-1-0-2-ga-and-2-0-m2-released
scraped: 2026-02-24T07:52:58.596Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  November 14, 2013 | 0 Comments
---

# Spring for Apache Hadoop 1.0.2 GA and 2.0 M2 released

_Releases | Thomas Risberg |  November 14, 2013 | 0 Comments_

We are happy to announce the Spring for Apache Hadoop 1.0.2 GA and 2.0 M2 milestone releases.

Both of these releases provide bug fixes, upgraded Spring project versions and support for the new Pivotal HD 1.1 release. The 1.0.2 release adds support for the new Hadoop 2.2 stable release. The 2.0.0.M2 release provides support for CDH4 YARN clusters and an improved implementation for the HdfsResourceLoader (this implementation will be back-ported to the next 1.0.3 GA release).

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository. The 1.0.2.RELEASE and 1.0.2.RELEASE-hadoop22 versions are also available in Maven Central.

For 1.0.2.RELEASE:

-   1.0.2.RELEASE (default - Apache Hadoop stable 1.2.1 stable)
-   1.0.2.RELEASE-hadoop22 (Apache Hadoop 2.2.0 stable)
-   1.0.2.RELEASE-cdh4 (Cloudera CDH 4.3.1 MR1)
-   1.0.2.RELEASE-hdp13 (Hortonworks HDP 1.3)
-   1.0.2.RELEASE-phd1 (Pivotal HD 1.1)

Please see the wiki page for build configuration instructions: [https://github.com/spring-projects/spring-hadoop/wiki](https://github.com/spring-projects/spring-hadoop/wiki)

For 2.0.0.M2:

-   2.0.0.M2 (default - Apache Hadoop stable 1.2.1)
-   2.0.0.M2-hadoop20 (Apache Hadoop 2.0.6 alpha)
-   2.0.0.M2-phd1 (Pivotal HD 1.0)
-   2.0.0.M2-cdh4yarn (CDH 4.3.1 YARN)

We are planning on adding support for the new Apache Hadoop 2.2.0 stable release in the next 2.0 milestone release.

The Apache Hadoop project did make some API changes to the YARN code in the Hadoop 2.1 beta release so this will cause some backwards compatibility issues with Hadoop 2.0 alpha based code.

For more project specific information please see the Project page [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/).
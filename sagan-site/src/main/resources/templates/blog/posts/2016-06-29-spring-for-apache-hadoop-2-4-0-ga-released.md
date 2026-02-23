---
title: Spring for Apache Hadoop 2.4.0 GA released
source: https://spring.io/blog/2016/06/29/spring-for-apache-hadoop-2-4-0-ga-released
scraped: 2026-02-23T19:12:09.457Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 29, 2016 | 1 Comment
---

# Spring for Apache Hadoop 2.4.0 GA released

_Releases | Thomas Risberg |  June 29, 2016 | 1 Comment_

We are pleased to announce the Spring for Apache Hadoop 2.4.0 GA release.

In addition to version upgrades for Hadoop distros Spring for Apache Hadoop 2.4 adds the following improvements:

-   Add build support for HDP 2.4 \[SHDP-557\]
-   Create utils sub-project \[SHDP-556\]
-   Fix issue where NetworkUtils may find wrong default address \[SHDP-546\]
-   Missing trailing slash on spring.yarn.applicationDir path fails to localize \[SHDP-562\]

See the release [changelog](http://docs.spring.io/spring-hadoop/docs/2.4.0.RELEASE/changelog.txt) for details.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.4.0.RELEASE (default - Apache Hadoop stable 2.7.1)
-   2.4.0.RELEASE-phd30 (Pivotal HD 3.0)
-   2.4.0.RELEASE-cdh5 (Cloudera CDH 5.7)
-   2.4.0.RELEASE-hdp23 (Hortonworks HDP 2.3)
-   2.4.0.RELEASE-hdp24 (Hortonworks HDP 2.4)

Please provide feedback so we can prioritize the work on new features scheduled for 2.5. You can use JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)
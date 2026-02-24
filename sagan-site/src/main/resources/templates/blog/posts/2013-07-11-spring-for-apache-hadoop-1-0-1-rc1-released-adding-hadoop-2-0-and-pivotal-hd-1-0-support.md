---
title: Spring for Apache Hadoop 1.0.1.RC1 released - adding Hadoop 2.0 and Pivotal HD 1.0 support
source: https://spring.io/blog/2013/07/11/spring-for-apache-hadoop-1-0-1-rc1-released-adding-hadoop-2-0-and-pivotal-hd-1-0-support
scraped: 2026-02-24T08:02:05.018Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  July 11, 2013 | 0 Comments
---

# Spring for Apache Hadoop 1.0.1.RC1 released - adding Hadoop 2.0 and Pivotal HD 1.0 support

_Releases | Thomas Risberg |  July 11, 2013 | 0 Comments_

We are happy to announce a new release candidate 1.0.1.RC1 for the Spring for Apache Hadoop project. This release candidate introduces support for Apache Hadoop 1.1.2, Hortonworks HDP 1.2, Apache Hadoop 2.0.3-alpha as well as support for Pivotal HD 1.0. The support for these versions are in addition to the already supported versions of Apache Hadoop 1.0.4 and Cloudera CDH 3 and CDH 4. This brings us to support for no less than 7 different Hadoop versions.

To make it easier to configure project builds using these varying versions we will be introducing specific flavors of the Maven artifacts and POMs with their respective transitive dependencies. For this 1.0.1.RC1 release we are introducing three additional artifact versions -- 1.0.1.RC1-cdh4 (Cloudera CDH 4), 1.0.1.RC1-pdh1 (Pivotal HD 1.0) and 1.0.1.RC1-hadoop11 (Apache Hadoop 1.1.2 and Hortonworks HDP 1.2). By using these versions as your dependency you will be pulling in their respective transitive dependencies instead of the dependencies from the Apache Hadoop 1.0.4 release that you would get when using the plain 1.0.1.RC1 version.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Hadoop&version=1.0.1.RC1) | [JavaDocs](http://static.springsource.org/spring-data/hadoop/docs/1.0.1.RC1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/hadoop/docs/1.0.1.RC1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/hadoop/docs/1.0.1.RC1/changelog.txt)

For more information on Spring for Apache Hadoop, see the project [home page](http://www.springsource.org/spring-data/hadoop) for reference documentation and the sample applications.

We look forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?87-Hadoop) or in the [issue tracker](https://jira.springsource.org/browse/SHDP).
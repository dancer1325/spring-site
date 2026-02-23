---
title: Spring XD 1.1 M1 and 1.0.2 released
source: https://spring.io/blog/2014/11/19/spring-xd-1-1-m1-and-1-0-2-released
scraped: 2026-02-23T22:06:34.402Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  November 19, 2014 | 0 Comments
---

# Spring XD 1.1 M1 and 1.0.2 released

_Engineering | Mark Pollack |  November 19, 2014 | 0 Comments_

On behalf of the Spring XD team, I am very pleased to announce the first milestone release of Spring XD 1.1 and the 1.0.2 maintenance release.

Download Links:

-   1.0.2.RELEASE: [zip](http://repo.spring.io/release/org/springframework/xd/spring-xd/1.0.2.RELEASE/spring-xd-1.0.2.RELEASE-dist.zip), 1.1.0.M1 RELEASE: [zip](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.1.0.M1/spring-xd-1.1.0.M1-dist.zip)

In addition to [bug fixes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=11401&version=14808), Spring XD 1.0.2 now supports Apache Hadoop 2.5.1. Pivotal PHD 2.1 and Cloudera CDH 5.1.3.

The 1.1 M1 release includes [bug fixes and enhancements](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=11401&version=14644) as well as several new features:

-   [Run a Spark Application as a batch job](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#running-spark-application-as-a-batch-job)
-   [Python based processors and sinks](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Python-Module)
-   [Kafka source](https://github.com/spring-projects/spring-xd/wiki/Sources#kafka) and [sink](https://github.com/spring-projects/spring-xd/wiki/Sinks#kafka-sink)
-   HDFS sink supports [writing to a Kerberized Hadoop Cluster](https://github.com/spring-projects/spring-xd/wiki/Hadoop-Kerberos)
-   [LDAP Authentication](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#ldap-authentication)
-   [Modules can be created using Java @Configuration classes](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#create-the-module-application-context-file) as an alternative to XML
-   [Redis sink](https://github.com/spring-projects/spring-xd/wiki/Sinks#redis) and [JDBC Source](https://github.com/spring-projects/spring-xd/wiki/Sources#jdbc-source)
-   [Hadoop distribution updates.](https://github.com/spring-projects/spring-xd/wiki/Running-Distributed-Mode#using-hadoop) Support for Apache Hadoop 2,4.1/2.5.1 (default), Pivotal PHD 2.0/2.1, Cloudera CDH 5.2, and Hortonworks HDP 2.1. Apache Hadoop 2.2 support was removed
-   [Configurable location of Spring XD’s top level node in Zookeeper](https://github.com/spring-projects/spring-xd/wiki/Running-Distributed-Mode#setting-up-zookeeper)

Of note for the next release of Spring XD 1.1 RC1 we will be including support for

-   A Kafka based message bus in addition to revamped Kafka support based on the low level consumer API
-   Modules that use [Reactor’s Stream API](https://reactor.github.io/docs/api/2.0.0.M1/reactor/rx/Stream.html)
-   Processor and Sink modules that use Spark Streaming
-   Simplified module contribution based on Spring Boot

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)
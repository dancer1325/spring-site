---
title: Spring XD 1.0.0.M5 Released
source: https://spring.io/blog/2014/01/10/spring-xd-1-0-0-m5-released
scraped: 2026-02-24T07:47:31.868Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  January 10, 2014 | 0 Comments
---

# Spring XD 1.0.0.M5 Released

_Engineering | Mark Pollack |  January 10, 2014 | 0 Comments_

The **Spring XD** team is pleased to announce that **Spring XD 1.0.0 Milestone 5** is now [**available for download**](http://projects.spring.io/spring-xd/#quick-start).

Spring XD makes it easy to solve common big data problems such as data ingestion and export, real-time analytics, and batch workflow orchestration. This release includes several notable new features:

-   Pre-defined batch jobs for [JDBC to HDFS](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#jdbc-to-hdfs-import-jdbchdfs)
-   Many additional [job shell commands](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#_job_commands) for controlling and reporting on batch jobs.
-   Hadoop Dataset [Avro sink](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#avro) that uses the Kite SDK
-   [HDFS sink](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#hdfs) now supports codecs (gzip, snappy, bzip2, lzo) and fine-grained control over file naming
-   [JMS source](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#jms) module now support Topics in addition to Queues
-   Improved support for use of [Gemfire Locators](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#gemfire)
-   [Aggregator module](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#aggregator) for batching that also supports a backing message store for checkpointing the event stream to memory, Redis, or a relational database.
-   Support for [separate control and data transport protocols](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/#_starting_spring_xd_in_distributed_mode)
-   XD servers are now built on top of [Spring Boot](http://projects.spring.io/spring-boot/)

Having addressed 140+ Jira issues in this milestone release, please consult the [changelog](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=11401&version=14285) and the [reference manual](http://docs.spring.io/spring-xd/docs/1.0.0.M5/reference/html/) for more information.

Also available are several [sample applications](https://github.com/spring-projects/spring-xd-samples) and [scripts to deploy Spring XD to EC2](https://github.com/spring-projects/spring-xd-ec2)

Also, if you're a Mac user and [Homebrew](http://brew.sh/) connoisseur, installing Spring XD is as simple as executing:

```
Copy$ brew tap pivotal/tap
```

```
Copy$ brew install springxd
```

For more information please see the Spring XD [project website](http://projects.spring.io/spring-xd/). Lastly, if you're new to Spring XD, please don't forget to also checkout the [QCon SF 2013 Session Reply: Introducing Spring XD](https://spring.io/blog/2013/11/20/qcon-sf-2013-session-replay-introducing-spring-xd).
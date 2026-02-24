---
title: Spring XD 1.0.0.M4 Released
source: https://spring.io/blog/2013/11/14/spring-xd-1-0-0-m4-released
scraped: 2026-02-24T07:53:02.900Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  November 14, 2013 | 0 Comments
---

# Spring XD 1.0.0.M4 Released

_Releases | Gunnar Hillert |  November 14, 2013 | 0 Comments_

The **Spring XD** team is pleased to announce that **Spring XD 1.0.0 Milestone 4** is now [**available for download**](http://projects.spring.io/spring-xd/#quick-start).

Spring XD makes it easy to solve common big data problems such as data ingestion and export, real-time analytics, and batch workflow orchestration. This release includes several notable new features:

-   [Batch Processing UI](https://github.com/spring-projects/spring-xd/wiki/AdminUI)
-   Improved [Type Conversion](https://github.com/spring-projects/spring-xd/wiki/Type-Conversion)
-   [Composite](http://docs.spring.io/spring-xd/docs/1.0.0.M4/reference/html/#_composing_modules) Modules
-   Improved DSL parsing and [Tap functionality](http://docs.spring.io/spring-xd/docs/1.0.0.M4/reference/html/#taps) (**Note**: breaking syntax change)
-   New sources: [Reactor based syslog](https://github.com/spring-projects/spring-xd/wiki/Sources#wiki-syslog), [tcp-client](http://docs.spring.io/spring-xd/docs/1.0.0.M4/reference/html/#tcp-client)
-   Expression based processors can invoke a [pre-registered JSON Path function](https://github.com/spring-projects/spring-xd/wiki/Processors#wiki-filter).
-   [Pre-defined Batch jobs](http://docs.spring.io/spring-xd/docs/1.0.0.M4/reference/html/#_pre_packaged_batch_jobs) for HDFS to JDBC, HDFS to MongoDB, Files to HDFS, and Files to JDBC
-   [New commands for listing available modules and their definition](http://docs.spring.io/spring-xd/docs/1.0.0.M4/reference/html/#_module_commands).
-   [Deployment Scripts for EC2 in new project](https://github.com/spring-projects/spring-xd-ec2).
-   Support for Pivotal HD 1.1
-   Shell access to HDFS via WebHDFS protocol

Having addressed 170+ Jira issues in this milestone release, please consult the [**changelog**](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=11401&version=14270) and the [reference manual](http://docs.spring.io/spring-xd/docs/1.0.0.M4/reference/html/) for more information.

Also, if you're a Mac user and [Homebrew](http://brew.sh/) connoisseur, installing Spring XD is as simple as executing:

```
Copy$ brew tap pivotal/tap
```

```
Copy$ brew install springxd
```

For more information please see the Spring XD [project website](http://projects.spring.io/spring-xd/). Lastly, if you're new to Spring XD, please don't forget to also checkout the Spring XD [Getting Started Guide](https://spring.io/guides/gs/spring-xd/).
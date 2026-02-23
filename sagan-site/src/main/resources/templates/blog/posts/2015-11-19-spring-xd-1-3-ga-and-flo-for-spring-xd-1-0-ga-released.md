---
title: Spring XD 1.3 GA and Flo for Spring XD 1.0 GA released
source: https://spring.io/blog/2015/11/19/spring-xd-1-3-ga-and-flo-for-spring-xd-1-0-ga-released
scraped: 2026-02-23T19:35:15.815Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  November 19, 2015 | 0 Comments
---

# Spring XD 1.3 GA and Flo for Spring XD 1.0 GA released

_Engineering | Mark Pollack |  November 19, 2015 | 0 Comments_

Today we are pleased to announce the general availability of Spring XD 1.3 and Flo for Spring XD 1.0.

-   Spring XD 1.3 GA: [zip](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.3.0.RELEASE/spring-xd-1.3.0.RELEASE-dist.zip), [brew](http://docs.spring.io/spring-xd/docs/1.3.0.RELEASE/reference/html/#osx-homebrew-installation) and [rpm](http://docs.spring.io/spring-xd/docs/1.3.0.RELEASE/reference/html/#redhatcentos-installation).
-   Flo for Spring XD 1.0 GA: [zip](https://network.pivotal.io/products/p-spring-flo/).

In addition to bug fixes we have also added several new features in the 1.3 release line

-   [Job Composition DSL](http://docs.spring.io/spring-xd/docs/1.3.0.RELEASE/reference/html/#composed-jobs) allows for the creation of a complex graph of job executions.
-   [Flo for Spring XD](https://blog.pivotal.io/big-data-pivotal/features/the-new-flo-for-spring-xd) designer supports creating [composed jobs](http://docs.pivotal.io/spring-flo/building-composed-jobs.html).
-   Admin UI supports execution history of composed jobs.
-   [Cassandra Sink](http://docs.spring.io/spring-xd/docs/1.3.0.RELEASE/reference/html/#cassandra) and [Header Enricher Processor](http://docs.spring.io/spring-xd/docs/1.3.0.RELEASE/reference/html/#header-enricher)
-   [Gpfdist sink](http://docs.spring.io/spring-xd/docs/1.3.0.RELEASE/reference/html/#gpfdist) now supports update operations and full range of control file options
-   Spark 1.3.1 Support
-   A timeout value for flushing writes to HDFS in order to ensure data is persisted on the HDFS DataNode’s disks.
-   General dependency upgrades, Spring Data Gosling, SI 4.2, and Boot 1.2
-   Hadoop distribution version updates to Apache Hadoop 2.7.1 and Hortonworks Data Platform 2.2. Pivotal Hadoop 2.1, 3.0 and Cloudera Hadoop 5.3

The next release line introduces a major redesign to the underlying architecture and breaking up Spring XD into several independent projects. Building upon Spring Boot and Spring Cloud capabilities, Spring XD is actively being redesigned as [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) - a cloud native programming and operating model for composable message-driven microservices. More details can be found in the blog posts: [Introducing Spring Cloud Data Flow](http://blog.pivotal.io/pivotal-cloud-foundry/products/introducing-spring-cloud-data-flow) and [A Quick Look At Spring Cloud Data Flow](http://blog.pivotal.io/pivotal-perspectives/features/a-quick-look-at-spring-cloud-data-flow). InfoQ also summarizes the changes in the article [SpringXD being Re-architected and Re-branded to Spring Cloud Data Flow](http://www.infoq.com/news/2015/09/spring-cloud-data-flow).

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)
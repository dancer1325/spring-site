---
title: Introducing Spring XD
source: https://spring.io/blog/2013/04/23/introducing-spring-xd
scraped: 2026-02-24T08:06:00.901Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  April 23, 2013 | 4 Comments
---

# Introducing Spring XD

_Engineering | Mark Fisher |  April 23, 2013 | 4 Comments_

Today we are officially kicking off a new initiative called [Spring XD](http://projects.spring.io/spring-xd) whose theme is "tackling Big Data complexity"1.

The Spring Data team has been incredibly busy over the past few years, not only providing support for NoSQL datastores but also simplifying the development experience with Hadoop. With the creation of the [Spring for Apache Hadoop project](http://www.springsource.org/spring-data/hadoop), we made it easier to get started developing Hadoop applications by providing a rich configuration model and a consistent programming model across Hadoop ecosystem projects such as Hive and Pig. As Spring users would expect, one can:

1.  Configure and run MapReduce jobs as container managed objects.
2.  Use template helper classes for HDFS, HBase, Pig and Hive to remove boilerplate code from your applications.

Spring for Apache Hadoop provides a strong foundation for building Hadoop applications. Spring XD builds upon these foundational assets and further simplifies the process of creating real-world big data solutions. Specifically, Spring XD addresses common big data use-cases such as:

1.  High throughput distributed data ingestion into HDFS from a variety of input sources.
2.  Real-time analytics at ingestion time, e.g. gathering metrics and counting values.
3.  Hadoop workflow management via batch jobs that combine interactions with standard enterprise systems (e.g. RDBMS) as well as Hadoop operations (e.g. MapReduce, HDFS, Pig, Hive or Cascading).
4.  High throughput data export, e.g. from HDFS to a RDBMS or NoSQL database.

The [Spring Data](http://shop.oreilly.com/product/0636920024767.do) book covers several of these use-cases, and the sample code for that book is available in our [GitHub repository](https://github.com/springsource/spring-data-book). Those examples are built upon Spring Batch and Spring Integration in addition to the Spring for Apache Hadoop project.

When it comes to managing event-driven data ingestion streams, [Spring Integration](http://www.springsource.org/spring-integration) provides a proven model, inspired by the well-established [Enterprise Integration Patterns](http://enterpriseintegrationpatterns.com/). Likewise, [Spring Batch](http://www.springsource.org/spring-batch) is a powerful solution for managing workflows, with robust support for the most important requirements such as job state management and retry/restart capabilities, and is the basis for [JSR-352](http://jcp.org/en/jsr/detail?id=352).

Extending the frameworks to support Big Data use-cases started with the book examples, but with Spring XD we aim to take that support to another level. First, we will provide a consistent model that spans the four use-case categories listed above. That model will be immediately familiar to those with Spring experience. Second, as Spring XD evolves we will be moving well beyond the API layer to provide an out-of-the-box executable server, a pluggable module system, a simple model for distributing data collection instances on or off the Hadoop cluster, and more.

If this sounds interesting to you, get involved! You can fork the [repository](https://github.com/springsource/spring-xd) and/or monitor [JIRA](https://jira.springsource.org/browse/XD). It's practically a clean-slate now, but we wanted to make sure that our community members had a chance to get in on the ground floor. As always, we consider the feedback from our broad and passionate community to be our greatest asset. We have been doing a lot of prototyping over the past year, so you will see some code drops soon. Also, we plan to post blogs after each sprint so that you can follow along with the progress. And, if you haven't yet registered for [SpringOne](http://www.springone2gx.com/conference/santa_clara/2013/09/home), please do; Spring XD will be featured prominently.

Finally, be sure to sign up for our live streaming event tomorrow (April 24th): [Pivotal: A New Platform for a New Era](http://www.gopivotal.com).

1XD = eXtreme Data or 'x' as in y = mx + b ;-)
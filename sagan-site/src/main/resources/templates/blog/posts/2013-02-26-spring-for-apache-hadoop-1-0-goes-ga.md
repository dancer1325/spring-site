---
title: Spring for Apache Hadoop 1.0 Goes GA
source: https://spring.io/blog/2013/02/26/spring-for-apache-hadoop-1-0-goes-ga
scraped: 2026-02-24T08:08:53.898Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  February 26, 2013 | 0 Comments
---

# Spring for Apache Hadoop 1.0 Goes GA

_Engineering | Costin Leau |  February 26, 2013 | 0 Comments_

We are happy to announce the first GA [release](http://www.springsource.org/download/community?project=Spring%2520Data%2520Hadoop) (1.0) for Spring for Apache Hadoop, almost one year to the date from the release of its [first milestone](http://blog.springsource.org/2012/02/29/introducing-spring-hadoop/) release. During that time we have incorporated a great deal of your feedback to drive the road-map, so thanks everyone from the community who have helped! While new features have been added over the year, the goal of Spring for Apache Hadoop remains the same, to simplify the development of Hadoop based applications.

[Download](http://www.springsource.com/download/community?project=Spring Data Hadoop "Download") it now, or view the maven artifacts [here](http://www.springsource.org/spring-data/hadoop#maven).

### Simplified Programming Model & Consistency

What we have observed is that using the standard out of the box tools that come with Hadoop, you an easily end up with Hadoop applications that are poorly structured collection of command line utilities, scripts and pieces of code stiched together. The different origins of the various projects in the Hadoop ecosystem, such as [Hive](http://hive.apache.org/) and [Pig](http://pig.apache.org/) focusing on declarative usage or [Cascading](http://www.cascading.org/) and [HBase](http://hbase.apache.org/) for a programmatic angle, have led to different approaches to configuration and API designs.

Spring for Apache Hadoop provides a consistent programming and configuration model across a wide range of Hadoop ecosystem projects: rather then dictating what to use, the framework embraces and enhances your technology stack, staying true to the core Spring principles.

Spring’s familiar Template API design pattern is applied to Hadoop, with the results being helper classes such as [HBaseTemplate](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/hbase.html), [HiveTemplate](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/hive.html#hive:template) and [PigTemplate](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/pig.html#pig:template). This brings with it familiar Spring data access Template features such as translation to Spring’s portable data access exception hierarchy, thread-safe access to underlying resources, and lightweight object mapping features. Java-centric APIs, such as Cascading, can be used freely, [with or without](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/cascading.html) additional configuration, through Spring Framework's excellent Java configuration.

### Start small and grow as needed

Another theme that has emerged over the past year is to encourage the approach where you can start small and grow into complex solutions. The introduction of various [Runner](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/runners.html) classes allows the execution of [Hive](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/hive.html#hive:runner), [Pig](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/pig.html#pig:runner) scripts, vanilla Map/Reduce or Streaming [jobs](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/hadoop.html#hadoop:job-runner), Cascading flows but also invocation of *pre* and *post* generic JVM-based [scripting](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/fs.html#scripting:api:scripts) all through the familiar JDK [Callable](http://docs.oracle.com/javase/6/docs/api/java/util/concurrent/Callable.html) contract. You can mix and match the runners as needed but as complexity grows, one can easily *upgrade* to [Spring Batch](http://static.springsource.org/spring-batch/), such that multiple steps can be coordinated in a stateful manner and administered using a REST API. Spring Batch’s rich functionality for handling the ETL processing of large file translates directly into Hadoop use cases for the ingestion and export of files form HDFS. The use of Spring Hadoop in combination with [Spring Integration](http://www.springsource.org/spring-integration) allows for rich processing of event streams that can be transformed, enriched, filtered, before being read and written from HDFS or other storages such as NOSQL stores, for which [Spring Data](http://www.springsource.org/spring-data) provides plenty of support. We have covered a variety of scenarios through the [sample applications](https://github.com/SpringSource/spring-hadoop-samples/) (no need to compile them, they are already compiled and ready to be downloaded) that complement the comprehensive user documentation (it includes even a [section](http://static.springsource.org/spring-hadoop/docs/1.0.0.RELEASE/reference/html/appendix-amazon-emr.html) on how to get stared with Spring for Apache Hadoop using Amazon’s Elastic MapReduce service). Additionally, as a companion to the samples, one can use the recent [Spring Data book](http://shop.oreilly.com/product/0636920024767.do)[\[1\]](#royalties) for the full feature set that can be achieved using Spring technologies, Hadoop and NOSQL.

### Portability

Spring for Apache Hadoop is being [tested daily](https://build.springsource.org/browse/SPRINGDATAHADOOP) against the various Hadoop 1.x distributions (such as vanilla Apache Hadoop, Cloudera CDH3 and CDH4, Greenplum HD): we want to make sure SHDP works reliably no matter your Hadoop environment. We are working actively to improve the user experience - Spring for Apache Hadoop is provided out of the box in the [Greenplum HD](http://www.greenplum.com/products/greenplum-hd) distribution. We keep a close eye on Hadoop 2.x development and working towards providing support for it in the near future as well.

If you are using Spring for Apache Hadoop, we would love to hear from you. Please take our [survey](https://www.research.net/s/we-use-spring-for-apache-hadoop) and share your experiences.

As always, we look forward to your feedback!

\[1\] The author royalties from Spring Data book sales are donated to [Creative Commons](http://creativecommons.org/about) organization.
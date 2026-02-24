---
title: Highlights of Spring for Apache Hadoop 1.0.0 M2
source: https://spring.io/blog/2012/06/13/highlights-of-spring-for-apache-hadoop-1-0-0-m2
scraped: 2026-02-24T08:20:44.926Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  June 13, 2012 | 0 Comments
---

# Highlights of Spring for Apache Hadoop 1.0.0 M2

_Engineering | Costin Leau |  June 13, 2012 | 0 Comments_

I am happy to announce that the second milestone (1.0.0.M2) of [Spring for Apache Hadoop](http://www.springsource.org/spring-data/hadoop) project is [available](http://www.springsource.org/download/community?project=Spring%20Data%20Hadoop). In this blog post, I would like to quickly highlight the major new features in M2.

#### HBase DAO support

One of the most versatile and powerful feature in Spring Framework is the Data Access Object (or DAO) support. With Spring for Hadoop 1.0.0 M2, the same functionality was added for HBase. Users of the popular template and callback pattern should feel right at home as the framework handles the table lookup, resource cleanup and exception conversion, letting the developer focus on what really matters. See the API and reference docs for more information. By the way, we also included a new sample in the distribution, hbase-crud, to help you get started right away.

#### Cascading Taps

In M2, we have expanded the integration with [Cascading](http://www.cascading.org/) library by [Tap](http://static.springsource.org/spring-hadoop/docs/1.0.0.M2/reference/html/cascading.html#cascading:tap:local>introducing</a> dedicated <a href=)s for Spring Framework and Spring Integration resources. The richness of Spring Integration adapters (whether inbound or outbound) such as File, TCP, Twitter, FTP, RSS (just to name a few) is now available to Cascading (and its extensions such as [Cascalog](https://github.com/nathanmarz/cascalog) or [Scalding](https://github.com/twitter/scalding)). And we are just getting started - expect more news on this front.

#### Hadoop Security

With M2, moving from a vanilla Hadoop install (such as a dev machine) to a fully Kerberos-secured Hadoop cluster is transparent. The File-System, Map/Reduce and Pig components are all security-aware, executing under proper credentials and supporting user impersonation. See the dedicated [chapter](http://static.springsource.org/spring-hadoop/docs/1.0.0.M2/reference/html/security.html) for more information.

#### Enhanced vanilla Map/Reduce support

Since the beginning, Spring for Apache Hadoop offered extensive support for Map/Reduce jobs - whether it is vanilla or traditional Java Map/Reduce, [streaming](http://hadoop.apache.org/common/docs/current/streaming.html) or [tool](http://hadoop.apache.org/common/docs/current/api/index.html?org/apache/hadoop/util/Tool.html)ing. In M2, we have added [support](http://static.springsource.org/spring-hadoop/docs/snapshot/reference/html/hadoop.html#hadoop:generic-options) for Hadoop [generic options](http://hadoop.apache.org/common/docs/stable/commands_manual.html#Generic+Options) across the board, making job provisioning, either by naming resources individually or through pattern matching, a one-liner. Further more, we have enhanced the bootstrapping of jar-based jobs - rather then requiring the classes to be on the classpath, the job can be fully loaded, in isolation, from the jar. The classes (and their dependencies) do not *leak* into the application which avoids all sorts of versioning conflicts and dependency *creep*. The tool declaration has been improved to automatically read the Jar metadata and its [Main-Class](http://docs.oracle.com/javase/tutorial/deployment/jar/appman.html), offering a powerful, fully managed [replacement](http://static.springsource.org/spring-hadoop/docs/1.0.0.M2/reference/html/hadoop.html#hadoop:tool-scripts) to Hadoop shell jar invocations.

#### Two New Samples

Last but not least, two new samples have been added to the distribution: hbase-crud, which I mentioned before showcasing the declarative and programmatic HBase support and pig-scripting, demoing the JVM and Pig scripting: the former doing data preparations in HDFS for the latter, which does data analysis. There are more samples in the pipeline and if you would like to see anything in particular, [tell](http://forum.springsource.org/forumdisplay.php?f=80) us.

I hope you enjoy this new milestone. Go ahead, [grab](http://www.springsource.org/download/community?project=Spring%20Data%20Hadoop) 1.0.0 M2, take it for a spin and let us know what you think!

#### Other News: Project Serengeti

As far as new releases go, Spring for Apache Hadoop 1.0.0 M2 is not the only news on the Hadoop front. Today, VMware takes the curtains off project [Serengeti](http://projectserengeti.org/), for virtualized and Highly Available Hadoop. See Richard McDougall's [blog post](http://cto.vmware.com/project-serengeti-theres-a-virtual-elephant-in-my-datacenter) on the motivations behind it, the current status and road-map.
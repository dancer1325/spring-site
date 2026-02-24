---
title: Introducing Spring YARN getting started guides
source: https://spring.io/blog/2014/06/13/introducing-spring-yarn-getting-started-guides
scraped: 2026-02-23T22:25:31.369Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Janne Valkealahti |  June 13, 2014 | 0 Comments
---

# Introducing Spring YARN getting started guides

_Engineering | Janne Valkealahti |  June 13, 2014 | 0 Comments_

Now that [Spring for Apache Hadoop version 2.0 is GA](http://spring.io/blog/2014/06/11/spring-for-apache-hadoop-2-0-is-now-ga) I'd like use this opportunity to introduce our new Spring IO getting started [guides](http://spring.io/guides) for builing Hadoop YARN applications.

We have a generic guides how to work with Spring YARN using Gradle or Maven. Our guides are designed to work with both build systems.

-   [Building Spring YARN Projects with Gradle](http://spring.io/guides/gs/gradle-yarn)
-   [Building Spring YARN Projects with Maven](http://spring.io/guides/gs/maven-yarn)

These two guides are demonstrating a familiar 'hello world' application type having a very minimalistic code base. Behaviour of these applications are identical having a difference in a project structure. While most of our guides are based on multi-project structures, building an application using Spring YARN surely is not limited to that. The second one demonstrates how an application can be created using a single project.

-   [Simple YARN Application](http://spring.io/guides/gs/yarn-basic)
-   [Simple Single Project YARN Application](http://spring.io/guides/gs/yarn-basic-single)

Spring YARN contains first class testing support for YARN applications. Focus of this guide is to show how a simple application can be tested using Hadoop's mini clusters as cluster replacement in your unit tests. You don't need to have a real running Hadoop instance.

-   [Testing YARN Application](http://spring.io/guides/gs/yarn-testing)

The last two guides demonstrate how a Spring Batch Steps can be partitioned on Hadoop YARN. The second guide show how a failed Batch job can be restarted and how only the remaining steps are executed on Hadoop YARN.

-   [Batch YARN Application](http://spring.io/guides/gs/yarn-batch-processing)
-   [Restartable Batch YARN Application](http://spring.io/guides/gs/yarn-batch-restart)
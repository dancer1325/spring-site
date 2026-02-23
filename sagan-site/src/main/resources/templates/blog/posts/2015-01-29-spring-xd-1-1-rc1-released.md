---
title: Spring XD 1.1 RC1 released
source: https://spring.io/blog/2015/01/29/spring-xd-1-1-rc1-released
scraped: 2026-02-23T21:57:27.230Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  January 29, 2015 | 0 Comments
---

# Spring XD 1.1 RC1 released

_Engineering | Mark Pollack |  January 29, 2015 | 0 Comments_

On behalf of the Spring XD team, I am very pleased to announce that the Spring XD 1.1 Release Candidate is now [available for download.](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.1.0.RC1/spring-xd-1.1.0.RC1-dist.zip)

The 1.1 RC1 release includes several new features as well as bug fixes.

One theme in the 1.1 release is around Stream processing. The 1.1 M2 version introduced support for Reactor’s Stream API in processing modules. The 1.1 RC1 release adds support for stream processing using RxJava’s Observable API and Spark Streaming alongside the existing Spark job support. By providing a range of options, you can pick the functional programming model that best suits the task at hand.

Spark Streaming integration features include:

-   [XD Processor modules](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Data-Stream-Processor-Module#spark-streaming) that act as drivers for workloads on the Spark Cluster.
-   An XD processor’s input DStream is generated from data received on the XD Message Bus, and the RDDs from its output DStream are sent to the bus. This allows you to immediately take advantage of the many Source modules to drive computation in Spark and direct the output to XD Sinks. This removes a great amount of complex code that you would need to write otherwise, such as mapping Kafka partitions to multiple DStreams.
-   The Spark Streaming driver process is automatically restarted if it dies due to the inherent module redeployment features of XD.
-   Simplify development and testing of Spark applications by decoupling your Spark computation code from code to setup input and output data. This allows creating integration tests using a test message bus to send specific data to the Spark module’s input channel and assert on the results contained in the output channel.

RxJava integration features include:

-   [Development of processor modules using RxJava’s Observable API](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Data-Stream-Processor-Module#rxjava-streams) This allows you to use a functional programming model to process event streams. Combined with XD’s support for [Data Partitioning on the Message Bus](https://github.com/spring-projects/spring-xd/wiki/Deployment#stream-partitioning), you can create very powerful distributed stream processing solutions.
-   Support for mapping input messages to one or multiple Observerble Stream instances, for example allowing a Stream per Kafka partition.
-   Refer to the [rxjava-moving-average](https://github.com/spring-projects/spring-xd-samples/tree/master/rxjava-moving-average) project for an example of using RxJava’s Observable API.

Other features include:

-   [Container Group Management when running XD on YARN](https://github.com/jvalkeal/spring-xd/wiki/Running-on-YARN#working-with-container-groups). You can now create groups of XD Admin and XD Container instances on YARN. Groups can specify the number of initial member instances, ramp up or down the number of instances at runtime, and specify specific machines or racks where they will be deployed. If any YARN containers fail, they will automatically restarted to maintain the number of instances specified for the group.
-   Refactored Kafka Based Message Bus and Kafka Source based on the new [Spring Integration Kafka client library](https://github.com/spring-projects/spring-integration-kafka). For the Kafka Source, this translates into new options, such as specifying the partitions that a source can listen to, or the starting offsets for replayability.
-   Gemfire source and sink support for multiple locators.
-   Improved tooling and updated examples for custom module development.

Feedback is very important, so please keep in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)
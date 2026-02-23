---
title: Spring XD 1.1 M2 and 1.0.3 released
source: https://spring.io/blog/2014/12/23/spring-xd-1-1-m2-and-1-0-3-released
scraped: 2026-02-23T22:02:35.866Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  December 23, 2014 | 1 Comment
---

# Spring XD 1.1 M2 and 1.0.3 released

_Engineering | Mark Pollack |  December 23, 2014 | 1 Comment_

On behalf of the Spring XD team, I am very pleased to announce the second milestone release of Spring XD 1.1 and the 1.0.3 maintenance release.

Download Links:

-   1.1.0.M2 RELEASE: [zip](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.1.0.M2/spring-xd-1.1.0.M2-dist.zip), 1.0.3.RELEASE: [zip](http://repo.spring.io/release/org/springframework/xd/spring-xd/1.0.3.RELEASE/spring-xd-1.0.3.RELEASE-dist.zip)

The 1.1 M2 release includes bug fixes and enhancements as well as several new features:

-   [Kafka based Message Bus](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#kafka). If Kafka is your middleware du jour, you will feel right at home.
-   [Batching and compression support for RabbitMQ](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#rabbitmq) provides significantly increased effective message rate throughput.
-   Develop Processor modules using [Project Reactor’s](https://github.com/reactor/reactor) Stream API. The [Stream API](https://reactor.github.io/docs/api/2.0.0.M2/reactor/rx/Stream.html) is based on the [Reactive Streams specification](http://www.reactive-streams.org/) that provides a standard for asynchronous stream processing with non-blocking backpressure. This allows you to use a functional programming model as the basis for processing event streams. Combined with XD’s support for [Data Partitioning on the Message Bus](https://github.com/spring-projects/spring-xd/wiki/Deployment#stream-partitioning), you can create very powerful distributed stream processing solutions.
-   [Easily develop, test, and package custom modules](https://github.com/spring-projects/spring-xd/wiki/Modules#module-packaging). A parent pom bootstraps all the dependencies required for building a custom module and bundles your module and dependencies into a single uberjar file. There is also support for [integration testing your module](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#write-a-test) with JUnit using an embedded single node server.
-   [Upload custom modules](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#register-the-module) to the admin server over HTTP.
-   [Role based authorization of REST endpoints](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#customizing-authorization) give you control over “who can do what”.
-   [File based authentication](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#file-based-authentication) as a simple alternative to LDAP.
-   [Sqoop Batch job integration](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#running-sqoop-as-a-batch-job-sqoop)

Please see the [reactor-moving-average project](https://github.com/spring-projects/spring-xd-samples/tree/master/reactor-moving-average) for an example of using Reactor’s Stream API and the [si-dsl-module](https://github.com/spring-projects/spring-xd-samples/tree/master/si-dsl-module) for a complete example of developing a custom module.

Of note for the next release of Spring XD 1.1 RC1 we will be including support for

-   Processor modules that use Spark Streaming
-   Processor modules that use RxJava
-   Kafka Message Bus and Kafka source improvements based on a revamped [Spring Kafka Library](https://github.com/spring-projects/spring-integration-kafka)
-   Granular security ACLs to support who can create or destroy streams and jobs

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)
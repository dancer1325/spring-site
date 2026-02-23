---
title: Spring XD 1.1 GA and 1.0.4 released
source: https://spring.io/blog/2015/02/12/spring-xd-1-1-ga-and-1-0-4-released
scraped: 2026-02-23T21:55:25.055Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 12, 2015 | 1 Comment
---

# Spring XD 1.1 GA and 1.0.4 released

_Releases | Mark Pollack |  February 12, 2015 | 1 Comment_

Six months after the 1.0 GA release, the team is happy to announce the availability of Spring XD 1.1 GA.

Download Links:

-   1.1.0.RELEASE: [zip](http://repo.spring.io/release/org/springframework/xd/spring-xd/1.1.0.RELEASE/spring-xd-1.1.0.RELEASE-dist.zip), [homebrew](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#osx-homebrew-installation), [yum](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#redhatcentos-installation).
-   1.0.4.RELEASE: [zip](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.0.4.RELEASE/spring-xd-1.0.4.RELEASE-dist.zip).

Please read [Sabby Anandan's blog](https://spring.io/blog/2015/02/12/spring-xd-data-driven-connectivity-within-a-unified-platform) for a general overview of Spring XD. Specific to 1.1, a ton of features have been added. Here are some that will give you the most bang for your big data buck.

-   Stream Processing with [Reactor](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Data-Stream-Processor-Module#reactor-streams), [RxJava](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Data-Stream-Processor-Module#rxjava-streams), [Spark Streaming](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Data-Stream-Processor-Module#spark-streaming) and [Python](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Python-Module)
-   Orchestrate [Spark](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#running-spark-application-as-a-batch-job-sparkapp) and [Sqoop](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#running-sqoop-as-a-batch-job-sqoop) Batch Jobs
-   [Kafka](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#kafka) based message bus, [source](https://github.com/spring-projects/spring-xd/wiki/Sources#kafka) and [sink](https://github.com/spring-projects/spring-xd/wiki/Sinks#kafka-sink) along with [new general purpose high level Kafka APIs](https://spring.io/blog/2015/02/09/spring-integration-kafka-extension-1-0-ga-is-available)
-   [Batching and compression for RabbitMQ](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#rabbitmq)
-   Easily develop, [test](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#write-a-test), and [package custom modules](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#register-the-module) and [upload](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Processor-Module#register-the-module) them to the admin server.
-   [Containers group management when running XD on YARN](https://github.com/spring-projects/spring-xd/wiki/Running-on-YARN#working-with-container-groups)
-   [Role based authorization of REST endpoints](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#customizing-authorization) and [LDAP](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#ldap-authentication)/[file](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#file-based-authentication) based authentication
-   Support for Pivotal, Hortonworks, and Cloudera Hadoop distributions.

There are [two dozen sample applications available](https://github.com/spring-projects/spring-xd-samples), so check them out.

As a sneak peek of things to come, Andy Clement and his team are working on an amazing UI for authoring and monitoring XD Streams. Here is a screen shot based on the [analytics-dashboard application](https://github.com/spring-projects/spring-xd-samples/tree/master/analytics-dashboard).

![Flo](https://raw.githubusercontent.com/markpollack/spring-xd-images/master/spring-xd-flo.png)

Stay tuned!

Feedback is very important, so please keep in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)
---
title: Spring XD 1.2 RC1 Released
source: https://spring.io/blog/2015/06/02/spring-xd-1-2-rc1-released
scraped: 2026-02-23T19:50:16.374Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 02, 2015 | 0 Comments
---

# Spring XD 1.2 RC1 Released

_Releases | Mark Pollack |  June 02, 2015 | 0 Comments_

On behalf of the Spring XD team, I am very pleased to announce that the Spring XD 1.2 Release Candidate is now [available for download](http://repo.spring.io/simple/libs-milestone-local/org/springframework/xd/spring-xd/1.2.0.RC1/spring-xd-1.2.0.RC1-dist.zip). You can also install using [rpm](http://docs.spring.io/spring-xd/docs/1.2.0.RC1/reference/html/#redhatcentos-installation)

The 1.2 RC1 release includes bug fixes as well as several new features and enhancements.

-   Apache Ambari plugin to automate the deployment of Spring XD to a Hadoop cluster. Read more in the [release blog for the plugin](https://spring.io/blog/2015/06/02/apache-ambari-meets-spring-xd).
-   A new Analytics tab in the UI that allows you to easily view gauges, counters, field-value counters and aggregate counters.
-   Performance improvements for the Kafka Message Bus that places it on par with the performance benchmark applications that ship with Kafka. An upcoming blog will discuss XD performance in more detail
-   Improved HA support for the Rabbit Message Bus, XD containers connect to the Rabbit Broker that hosts the queue that is being consumed
-   Support for the Sqoop metastore and other [Sqoop integration improvements](https://jira.spring.io/browse/XD-2938)
-   Support for multiple topics in the Kafka source.
-   Add rolloverTime option to HDFS sink
-   Support incremental data import with jdbchdfs job
-   Ability to tap Spark streaming processors
-   Support arbitrary JavaMail properties in the mail source
-   Several new source/sink modules
    -   [Video Capture source](https://github.com/spring-projects/spring-xd-modules/tree/master/videocap) (community contributed)
    -   FTP source and sink (community contributed)
    -   [load-generator](https://github.com/spring-projects/spring-xd-modules/tree/master/load-generator-source) source and [throughput](https://github.com/spring-projects/spring-xd-modules/tree/master/throughput) sink
    -   [xslt-transformer](https://github.com/spring-projects/spring-xd-modules/tree/master/xslt-transformer) (community contributed)
    -   [language classifier processor](https://github.com/spring-projects/spring-xd-modules/tree/master/spring-xd-lang-detector)
-   The gpfdist sink is now included in the XD distribution
-   Performance improvements for reactor based processor
-   Support for Oracle as a batch repository
-   Change from log4j to Logback logging framework

The full list of [issues fixed for 1.2 RC1](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=11401&version=14959) is available in JIRA.

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).
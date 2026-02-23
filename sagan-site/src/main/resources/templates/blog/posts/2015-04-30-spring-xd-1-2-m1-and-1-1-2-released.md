---
title: Spring XD 1.2 M1 and 1.1.2 released
source: https://spring.io/blog/2015/04/30/spring-xd-1-2-m1-and-1-1-2-released
scraped: 2026-02-23T21:04:28.093Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 30, 2015 | 0 Comments
---

# Spring XD 1.2 M1 and 1.1.2 released

_Releases | Mark Pollack |  April 30, 2015 | 0 Comments_

On behalf of the Spring XD team, I am very pleased to announce the first milestone release of Spring XD 1.2 and the 1.1.2 maintenance release.

Download Links:

-   1.1.2.RELEASE: [zip](http://repo.spring.io/release/org/springframework/xd/spring-xd/1.1.2.RELEASE/spring-xd-1.1.2.RELEASE-dist.zip)
-   1.2.0.M1: [zip](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.2.0.M1/spring-xd-1.2.0.M1-dist.zip)

You can also install using [brew](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#osx-homebrew-installation) and [rpm](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#redhatcentos-installation)

The full list of [issues fixed for 1.1.2](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=11401&version=14989) is available in JIRA. Of note the 1.1.2 release provides PHD 3.0 support.

The 1.2 M1 release includes bug fixes as well and several new features and enhancements:

-   [PHD 3.0 support](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#using-hadoop)
-   [MongoDB Source](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#mongodb-source), a [community contribution](https://github.com/spring-projects/spring-xd/commits?author=agandhinit) from Abhinav Gandhi
-   Module registry backed by HDFS
-   [Greenplum gpload](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#_running_gpload_as_a_batch_job_code_gpload_code) as provided batch job. This allows for efficient loading from CSV files into Greenplum DB/HAWQ.
-   [gpfdist sink](https://github.com/spring-projects/spring-xd-modules/tree/master/gpfdist) that adheres to the gpfdist protocol. This allows for streaming data in parallel into Greenplum DB/HAWQ.
-   Zookeeper distributed queue based deployment for streams and jobs.
-   [Improved error handling for RabbitMQ](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#error-handling-message-delivery-failures) with Dead Letter Queue and durable queue support for pub/sub named channels (tap: and topic:)
-   [Sqoop integration improvements](http://docs.spring.io/spring-xd/docs/1.2.0.M1/reference/html/#_running_sqoop_as_a_batch_job_code_sqoop_code), support for merge and codegen commands as well as running against a secured Hadoop cluster.
-   Kafka message bus improvements, customized partition count for topics created by the message bus. (module.\[modulename\].producer.minParitionCount)
-   Improved performance characteristics for [TupleBuilder](https://jira.spring.io/browse/XD-2911) and the [JDBC to HDFS](https://jira.spring.io/browse/XD-2815) job
-   Spark Streaming integration improvements, reliable receiver support and bug fixes.

The full list of [issues fixed for 1.2 M1](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=11401&version=14898) is available in JIRA.

Of note for the next release of Spring XD 1.2 RC1 we will be including support for

-   Kafka message bus [improvements](http://bit.ly/1Q3yc6T)
-   Cassandra sink
-   [Elastic search sink](https://github.com/mbogoevici/elasticsearch-sink)
-   Improved HA support for RabbitMQ
-   Incremental data import for JDBC to HDFS job

The Beta version of Spring Flo for XD - an HTML5 based canvas for creating data pipelines, analytics dashboards, and monitoring - will be released along with XD 1.2 GA. For a sneak peak at the work in progress, watch this screencast:

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Expect a number of significant new announcements this year. Check recent blog posts to see what I mean and there is more to come!

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).
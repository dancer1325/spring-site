---
title: Spring XD 1.0.0.M7 Released
source: https://spring.io/blog/2014/06/03/spring-xd-1-0-0-m7-released
scraped: 2026-02-23T22:27:37.366Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 03, 2014 | 0 Comments
---

# Spring XD 1.0.0.M7 Released

_Releases | Mark Pollack |  June 03, 2014 | 0 Comments_

The Spring XD team is pleased to announce that Spring XD Milestone 7 is now [available for download](http://repo.spring.io/simple/libs-milestone-local/org/springframework/xd/spring-xd/1.0.0.M7/spring-xd-1.0.0.M7-dist.zip).

Highlights of this release

-   [Transport Data Partitioning](https://github.com/spring-projects/spring-xd/wiki/XD-Distributed-Runtime#partitioned-stream-deployment-examples): By default, messages are delivered to multiple instances of a stream module in a round-robin manner. However, if a module performs operations such that it can not consume random messages from the stream, then you can partition the stream based on its content so that similar messages are always delivered to the same module instance. For example, if a processing module is performing stateful operations on a per-customer basis, the stream can be partitioned based on the customerId field in the message. This is done in by specifying partition properties in the deployment manifest. A small example is shown below.
    
-   [HDFS](https://github.com/spring-projects/spring-xd/wiki/Sinks#partition-path-expression) and [HDFS DataSet](https://github.com/spring-projects/spring-xd/wiki/Sinks#hdfs-dataset-with-options) Sink improvements: These sinks now support writing to multiple paths and files based on partition functions. Look at the [HDFS Partitioning Samples](https://github.com/spring-projects/spring-xd-samples/tree/master/hdfs-partitioning) for several ways to use the partitioning features.
    
-   [Distributed Runtime enchancements](https://jira.spring.io/browse/XD-1473)
    
-   [Deployment manifest for jobs](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#deployment-manifest-support-for-job)
    
-   [Update to support newer Hadoop Distributions](https://github.com/spring-projects/spring-xd/wiki/Running-Distributed-Mode#using-hadoop): Now 8 in total.
    
-   [Admin UI Enhancements](https://github.com/spring-projects/spring-xd/wiki/AdminUI)
    
-   [Configurable options for the Rabbit Message Bus](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration#rabbitmq): Configure options such as message delivery options, concurrency settings, and High Availability policy. These options can also be overridden for a specific module, e.g. modue.http.producer.deliveryMode=NON\_PERSISTENT
    
-   Improved module coverage in automated system tests
    

**Data Partitioning Example**

To demonstrate the data partitioning functionality, start two containers using Rabbit as the transport. In the shell

```text
Copystream create words --definition "http | splitter --expression=payload.split(' ') | log"  

stream deploy words --properties module.splitter.producer.partitionKeyExpression=payload,module.log.count=2  

http post --data "How much wood would a woodchuck chuck if a woodchuck could chuck wood"  
```

In one container log you will see

16:33:27,486 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - How  
16:33:27,507 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - chuck  
16:33:27,508 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - chuck

and in the other

16:33:27,503 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - much  
16:33:27,512 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - wood  
16:33:27,513 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - would  
16:33:27,514 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - a  
16:33:27,520 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - woodchuck  
16:33:27,522 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - if  
16:33:27,523 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - a  
16:33:27,524 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - woodchuck  
16:33:27,526 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - could  
16:33:27,528 INFO SimpleAsyncTaskExecutor-1 sink.words:155 - wood

This shows that messages that contain the same word are directed to the same container instance.

Note that partitioning is only supported when using RabbitMQ as a transport. Support for Redis as a transport will be available in the next release

**Wrapping up**

You can also install Spring XD on OSX [using homebrew](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#osx-homebrew-installation) and on RHEL/CentOs [using yum](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#redhatcentos-installation).

The Spring XD [project home](http://projects.spring.io/spring-xd/) is the central hub for learning more about Spring XD. Some useful links are the [reference docs](http://docs.spring.io/spring-xd/docs/1.0.0.M7/reference/html/), [sample applications](https://github.com/spring-projects/spring-xd-samples), and [QCon SF 2013 Session Replay: Introducing Spring XD](https://spring.io/blog/2013/11/20/qcon-sf-2013-session-replay-introducing-spring-xd).

We look forward to your comments and feedback:

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD)

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. There will be deep dive sessions on Spring XD along with general Big Data talks to provide an introduction to the landscape and challenges in developing Big Data applications.
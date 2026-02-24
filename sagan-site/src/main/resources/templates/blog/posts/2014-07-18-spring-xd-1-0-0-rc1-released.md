---
title: Spring XD 1.0.0.RC1 Released
source: https://spring.io/blog/2014/07/18/spring-xd-1-0-0-rc1-released
scraped: 2026-02-23T22:19:53.623Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 18, 2014 | 1 Comment
---

# Spring XD 1.0.0.RC1 Released

_Releases | Mark Pollack |  July 18, 2014 | 1 Comment_

The Spring XD team is pleased to announce that Spring XD Release Candidate 1 is now [available for download](http://repo.spring.io/simple/libs-milestone-local/org/springframework/xd/spring-xd/1.0.0.RC1/spring-xd-1.0.0.RC1-dist.zip). You can also install Spring XD on OSX [using homebrew](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#osx-homebrew-installation) and on RHEL/CentOs [using yum](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#redhatcentos-installation).

Highlights of this release

-   [Direct binding](https://github.com/spring-projects/spring-xd/wiki/Deployment#direct-binding): Deployments can be configured to avoid modules sending data over the Message Bus if they are co-located in the same container. Using this option increases throughput and lowers latency but can not be applied to all deployment topologies.
-   [Stream Deployment State](https://github.com/spring-projects/spring-xd/wiki/Deployment#deployment-states): The state of stream is calculated throughout the lifetime of the deployment. For example, if a subset of the modules that comprise a stream have failed, the overall state of the stream changes from Deployed to Incomplete. Once the failures have been addressed, the state of the stream returns to Deployed.
-   Improved [REST API](https://github.com/spring-projects/spring-xd/wiki/REST-API): The URI structure has been made more consistent for job management.
-   Support for Rabbit [HA](https://www.rabbitmq.com/ha.html) and [SSL](https://www.rabbitmq.com/ssl.html) configuration. You can now use mirrored queues to improve the availability of the Message Bus in case of failures. Rabbit Source and Sink modules also support [these options](https://github.com/spring-projects/spring-xd/wiki/MessageBus#rabbit-message-bus-high-availability-ha-configuration).
-   [Spring IO Platform 1.0.1 Compliant](http://docs.spring.io/platform/docs/1.0.1.RELEASE/reference/html/): User contributed modules or extensions to the servers can rely on the Spring IO platform to select the correct versions of dependent libraries.
-   HTTP source improvements: Now support [HTTPS](https://github.com/spring-projects/spring-xd/wiki/Sources#http-with-options).
-   Support partitioning for filejdbc job.
-   Added [MongoDB sink](https://github.com/spring-projects/spring-xd/wiki/Sinks#mongo).
-   UI enchancements.
-   [Support for Hadoop 2.4.1](https://github.com/spring-projects/spring-xd/wiki/Running-Distributed-Mode#using-hadoop) in addition to five other versions.
-   Reduced distribution footprint.

The Spring XD [project home](http://projects.spring.io/spring-xd/) is the central hub for learning more about Spring XD. Some useful links are the [reference docs](http://docs.spring.io/spring-xd/docs/1.0.0.RC1/reference/html/), [sample applications](https://github.com/spring-projects/spring-xd-samples), and [QCon SF 2013 Session Replay: Introducing Spring XD](https://spring.io/blog/2013/11/20/qcon-sf-2013-session-replay-introducing-spring-xd).

We look forward to your comments and feedback:

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD)

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. There will be deep dive sessions on Spring XD along with general Big Data talks to provide an introduction to the landscape and challenges in developing Big Data applications.
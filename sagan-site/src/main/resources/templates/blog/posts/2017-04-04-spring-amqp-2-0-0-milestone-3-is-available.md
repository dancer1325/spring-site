---
title: Spring AMQP 2.0.0 Milestone 3 is Available
source: https://spring.io/blog/2017/04/04/spring-amqp-2-0-0-milestone-3-is-available
scraped: 2026-02-23T16:33:01.167Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  April 04, 2017 | 0 Comments
---

# Spring AMQP 2.0.0 Milestone 3 is Available

_Releases | Gary Russell |  April 04, 2017 | 0 Comments_

We are pleased to announce that the third milestone for the Spring AMQP 2.0 release (2.0.0.M3) is now available.

[36 JIRA Issues](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15861) are included in this release, including bug fixes and a number of new features:

-   Initial support for broker-less integration testing - the `TestRabbitTemplate` discovers listener containers in the application context and invokes those containers' listeners for `send()` and `sendAndReceive()` operations. We intend to flush out this capability with more features before GA, including routing, and simulation of the various exchange types supported by RabbitMQ. Feedback is welcome.
    
-   Rollback with an external transaction manager is now consistent with local transactions.
    
-   The 4.1.x `amqp-client` library is now the default.
    
-   The `RabbitTemplate` now has an `invoke()` method which allows multiple operations to be performed sequentially on the same channel. This also enables features such as `waitForConfirmsOrDie()` provided by the underlying library, when sending multiple messages to the same channel.
    
-   `null` message properties are no longer included in `toString()` which makes debug logs easier to read.
    
-   `@QueueBinding` annotations now support multiple routing keys, and support custom exchange types.
    

We would like to thank several community members for their ongoing active contributions to the framework; scan [the commits](https://github.com/spring-projects/spring-amqp/commits/master) and give them some kudos!

We are working towards the M4 release in time for the Spring Boot 2.0 milestone; with the GA in early summer; shortly after the Spring Framework 5.0 release.

For a complete list of changes in 2.0, also see the release notes for [2.0.0.M1](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15711) and [2.0.0.M2](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15775), as well as [2.0.0.M3](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15861).

[Project Page](http://projects.spring.io/spring-amqp/) | [JIRA](https://jira.spring.io/browse/AMQP) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp) | [Chat](https://gitter.im/spring-projects/spring-amqp)
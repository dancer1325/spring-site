---
title: Spring AMQP 1.3.0.M1 and 1.2.1.RELEASE Available
source: https://spring.io/blog/2014/01/13/spring-amqp-1-3-0-m1-and-1-2-1-release-available
scraped: 2026-02-24T07:46:59.803Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  January 13, 2014 | 0 Comments
---

# Spring AMQP 1.3.0.M1 and 1.2.1.RELEASE Available

_Releases | Gary Russell |  January 13, 2014 | 0 Comments_

We are pleased to announce the availability of these two releases; the [1.2.1.RELEASE](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=14200) contains a few minor bug fixes, while the [1.3.0.M1 milestone release](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=14314) contains some significant new features, including:

-   The listener container concurrency can be changed without first stopping the container and the listeners will be adjusted accordingly
-   The listener container can dynamically adjust the concurrent consumers, based on workload
-   The Connection Factory can now cache connections rather than all users sharing the same connection
-   The RabbitTemplate now has several convenient `receiveAndReply` methods
-   A fluent Java API is now provided to build a `Message`
-   There is now a `SimpleRoutingConnectionFactory` to determine which connection factory to use at runtime

See the [What's new](http://docs.spring.io/spring-amqp/docs/1.3.0.M1/reference/html/whats-new.html#d4e76) and [release notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10450&version=14314) for a full list of new features. Jump to the [project page](http://projects.spring.io/spring-amqp/) for links to documentation etc.
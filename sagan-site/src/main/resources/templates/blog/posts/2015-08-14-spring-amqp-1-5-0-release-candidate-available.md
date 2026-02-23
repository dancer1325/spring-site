---
title: Spring AMQP 1.5.0 Release Candidate Available
source: https://spring.io/blog/2015/08/14/spring-amqp-1-5-0-release-candidate-available
scraped: 2026-02-23T19:42:51.994Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  August 14, 2015 | 0 Comments
---

# Spring AMQP 1.5.0 Release Candidate Available

_Releases | Gary Russell |  August 14, 2015 | 0 Comments_

We are pleased to announce that the release candidate for the 1.5 release (`1.5.0.RC1`) is now available.

New features and improvements in this release include:

## [](#enhanced-ha-queue-support)Enhanced HA Queue Support

The high availability queue support has been enhanced in that you can configure a listener container to connect to the broker that is currently the master for the container's queue. If the connection is lost, the new master is determined and a connection to that broker is established.

## [](#rabbittemplate-blocking-receive)RabbitTemplate Blocking Receive

It is now possible to use the the `RabbitTemplate` to receive ad-hoc messages. Previously, only a non-blocking `receive()` was available.

## [](#sendandreceive-operations-returns)SendAndReceive Operations (returns)

It is now possible to configure the `RabbitTemplate` to throw an exception while waiting for a reply if a message is returned by the broker.

## [](#messagelisteneradapter)MessageListenerAdapter

The `MessageListenerAdapter` can be configured to invoke different methods, based on the queue the message was received from.

## [](#milestone)Milestone

As a reminder, the following new features were previously announced when [milestone 1](https://spring.io/blog/2015/05/08/spring-amqp-1-4-5-release-and-1-5-0-m1-available) was released:

-   Class-level `@RabbitListener`
-   Auto-Declare Queues and Bindings for `@RabbitListener`
-   Configurable Exchange/Routing Key for Replies
-   RabbitManagementTemplate REST abstraction

Complete information about the contents of this release can be seen in the [JIRA release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15010). Also see the ["what's new" section in the reference manual](http://docs.spring.io/spring-amqp/docs/1.5.0.RC1/reference/html/_introduction.html#_changes_in_1_5_since_1_4).

Please try out these new features and improvements; it is your last chance for feedback before the final release planned for early September, just in time for SpringOne.

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.
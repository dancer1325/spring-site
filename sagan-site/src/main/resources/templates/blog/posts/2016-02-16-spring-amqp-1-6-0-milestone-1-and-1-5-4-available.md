---
title: Spring AMQP 1.6.0 Milestone 1 (and 1.5.4) Available
source: https://spring.io/blog/2016/02/16/spring-amqp-1-6-0-milestone-1-and-1-5-4-available
scraped: 2026-02-23T19:27:06.484Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  February 16, 2016 | 0 Comments
---

# Spring AMQP 1.6.0 Milestone 1 (and 1.5.4) Available

_Engineering | Gary Russell |  February 16, 2016 | 0 Comments_

We are pleased to announce the availability of the first milestone of the 1.6 version of Spring AMQP.

Some highlights of this release:

-   A new jar `spring-rabbit-test` containing a test harness to help with testing `@RabbitListener` methods; see [the testing chapter](http://docs.spring.io/spring-amqp/docs/1.6.0.M1/reference/html/_reference.html#testing).
    
-   Multiple `@RabbitListener` annotations on a method (when using Java 8) and the `@RabbitListeners` annotation (for pre-Java 8), each allowing the same method to be the listener method for multiple listener containers.
    
-   Full support for the [Delayed Message Exchange](https://www.rabbitmq.com/blog/2015/04/16/scheduling-messages-with-rabbitmq/) RabbitMQ plugin.
    
-   An `AsyncRabbitTemplate` returning `ListenableFuture<?>` for request/reply messaging.
    
-   An option to publish `ApplicationEvents` when listener containers go idle.
    

For a complete list of new features, see the [What's new?](http://docs.spring.io/spring-amqp/docs/1.6.0.M1/reference/html/_introduction.html#_changes_in_1_6_since_1_5) as well as the [JIRA Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15297).

Visit the [project page](http://projects.spring.io/spring-amqp/) for links to downloads, documentation etc.

In addition, the 1.5.4.RELEASE is available with a few [minor bug fixes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15454).
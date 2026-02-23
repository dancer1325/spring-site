---
title: Spring AMQP 1.7 RC1 available now
source: https://spring.io/blog/2016/12/28/spring-amqp-1-7-rc1-available-now
scraped: 2026-02-23T18:53:05.031Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  December 28, 2016 | 0 Comments
---

# Spring AMQP 1.7 RC1 available now

_Releases | Artem Bilan |  December 28, 2016 | 0 Comments_

On behalf of the Spring Integration team I’d like to announce the first (and final) Release Candidate of Spring AMQP [1.7](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15809), which is available in the [Milestone Repository](https://repo.spring.io/milestone/).

This release is mainly an intermediate between version `1.6.x` and `2.0` for Spring Boot `1.5` and IO Platform `Brussels` compatibility.

Anyway there are several improvements and new features to explain here:

-   Upgrade to Amqp Client 4.0 with appropriate `RabbitConnectionFactoryBean` changes
    
-   Upgrade to Log4j 2.7 and required braking change fix for the `log4j2.AmqpAppender`
    
-   Upgrade to Spring Retry 1.2 with important `StatefulRetryOperationsInterceptor.setUseRawKey(true)` for backward compatibility
    
-   a new `spring-rabbit-junit` artifact is provided with several utilities (like `BrokerRunning` `@Rule`) which can be useful for testing Spring AMQP applications
    
-   The `SimpleMessageListenerContainer` can now be started without queues to listen to at all. They can be provided later at runtime via `addQueues()`
    
-   a `ConnectionNameStrategy` is provided for the `ConnectionFactory` to allow to identify application connections in the Broker or other monitoring and tracing tools
    

Also thanks to all the Community members who provide contributions any way, especially for reporting bugs and immediate fixes for them.

We are expecting GA release just before Spring Boot `1.5 GA`, so there is plenty of time to try this release out and come back to us with any feedbacks. At the same time we are working on Spring AMQP `2.0` based on Spring Framework `5.0` and Java 8 features.

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp) | [Documentation](http://docs.spring.io/spring-amqp/reference/html/) | [Chat](https://gitter.im/spring-projects/spring-amqp)
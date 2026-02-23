---
title: Spring AMQP 1.7.0.RELEASE (and 1.6.7) Available
source: https://spring.io/blog/2017/01/19/spring-amqp-1-7-0-release-and-1-6-7-available
scraped: 2026-02-23T18:42:45.178Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  January 19, 2017 | 0 Comments
---

# Spring AMQP 1.7.0.RELEASE (and 1.6.7) Available

_Releases | Gary Russell |  January 19, 2017 | 0 Comments_

On behalf of the Spring Integration team I’d like to announce that Spring AMQP [1.7.0.RELEASE](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15856) is now available.

This release is mainly an intermediate version between `1.6.x` and `2.0` for Spring Boot `1.5` and IO Platform `Brussels` dependencies compatibility.

However, there are several improvements and new features to explain here:

-   Upgrade to Amqp Client 4.0 with appropriate `RabbitConnectionFactoryBean` changes
    
-   Upgrade to Log4j 2.7 and required breaking change fix for the `log4j2.AmqpAppender`
    
-   Upgrade to Spring Retry 1.2 with important `StatefulRetryOperationsInterceptor.setUseRawKey(true)` for backward compatibility
    
-   a new `spring-rabbit-junit` artifact is provided with several utilities (like `BrokerRunning` `@Rule`) which can be useful for testing Spring AMQP applications
    
-   The `SimpleMessageListenerContainer` can now be started without queues to listen to at all. They can be provided later at runtime via `addQueues()`
    
-   a `ConnectionNameStrategy` is provided for the `ConnectionFactory` to allow to identify application connections in the Broker or other monitoring and tracing tools
    

These were previously announced with the [release candidate](https://spring.io/blog/2016/12/28/spring-amqp-1-7-rc1-available-now).

In addition; several bug fixes have been included as well as the addition of a new `CorrelationDataPostProcessor` for the `RabbitTemplate` to enable creation/update of correlation data for publisher confirms, after message conversion has occurred.

This feature is also available in the [1.6.7 Maintenance Release](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15854), which is also available now.

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp) | [Documentation](http://docs.spring.io/spring-amqp/reference/html/) | [Chat](https://gitter.im/spring-projects/spring-amqp)
---
title: Spring AMQP 2.0 Milestone 1 Available
source: https://spring.io/blog/2016/11/30/spring-amqp-2-0-milestone-1-available
scraped: 2026-02-23T18:56:15.338Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  November 30, 2016 | 0 Comments
---

# Spring AMQP 2.0 Milestone 1 Available

_Releases | Gary Russell |  November 30, 2016 | 0 Comments_

We are pleased to announce the first milestone of Spring AMQP 2.0 is now available.

For a complete list of changes; see the [what’s new in the reference manual](http://docs.spring.io/spring-amqp/docs/2.0.0.M1/reference/html/_introduction.html#whats-new) and the [release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15711).

Here are some highlights of this release

-   The framework is now fully Java 8 based; several functional interfaces are provided for convenient Lambda implementations (callbacks, `ReplyingMessageListener` etc). Java 8 is now a requirement. It is also based on [Spring Framework 5.0](https://spring.io/blog/2016/11/08/spring-framework-5-0-m3-released).
    
-   The framework uses the new [4.0 amqp-client library](http://www.rabbitmq.com/blog/2016/11/24/rabbitmq-java-client-4-0-is-released/).
    
-   A new `DirectMessageListenerContainer` is now available alongside the existing `SimpleMessageListenerContainer`. The new container actually has a simpler architecture and the listener is called directly on the amqp-client thread (hence the name `Direct…​`). See [Choosing a Container](http://docs.spring.io/spring-amqp/docs/2.0.0.M1/reference/html/_reference.html#choose-container) to help you decide which container is appropriate for your application.
    
-   A subclass - `DirectReplyToMessageLisenerContainer` - is also provided, specifically for using the RabbitMQ [Direct ReplyTo](https://www.rabbitmq.com/direct-reply-to.html) feature for request/reply messaging. This is now used by the `RabbitTemplate` (by default) rather than creating a consumer per request/reply as was the case previously. Consumers are cached for reuse.
    
-   The `AsyncRabbitTemplate` now supports direct replyTo, utilizing the new container; previously the async template did not support direct replyTo.
    
-   `@RabbitListener` annotations can now be configured with an error handler and the ability to send exceptions to the sender when request/reply messaging is being used.
    
-   Connection and channel listeners now receive shutdown signals.
    
-   You can now assign names to connections created by Spring AMQP - the name appears on the RabbitMQ Admin UI.
    
-   Limited stateful retry (1 redelivery attempt) is now available (when an inbound message does not have a message id) without the need to configure a `MissingMessageIdAdvice` which has now been removed from the framework. Spring Retry 1.2 is required to support this feature.
    
-   The log4j appender is no longer provided due to the EOL of log4j (the log4j2 and logback appenders remain available).
    

Please take this opportunity to test these new capabilities and provide feedback. The next milestone will be early next year, with GA in the first quarter. Please use [JIRA](https://jira.spring.io/browse/AMQP) to vote for backlog issues, or add requests for new features you would like to see in this major new release.

See the [project page](http://projects.spring.io/spring-amqp/) for download and documentation links.

We monitor the [spring-amqp](http://stackoverflow.com/tags/spring-amqp/info) tag on Stack Overflow as well as Gitter for [spring-amqp](https://gitter.im/spring-projects/spring-amqp).
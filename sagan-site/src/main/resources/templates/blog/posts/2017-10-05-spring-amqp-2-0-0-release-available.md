---
title: Spring AMQP 2.0.0 RELEASE Available
source: https://spring.io/blog/2017/10/05/spring-amqp-2-0-0-release-available
scraped: 2026-02-23T16:19:46.971Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 05, 2017 | 2 Comments
---

# Spring AMQP 2.0.0 RELEASE Available

_Releases | Artem Bilan |  October 05, 2017 | 2 Comments_

I am pleased to announce that the `2.0.0.RELEASE` of Spring AMQP is now available in the [Spring release repository](https://repo.spring.io/release/) and Maven Central.

First of all thanks to all community members for any feedback and contributions to make this new instalment of Spring for AMQP and RabbitMQ support project!

Some highlights what we have after [a year and a couple months](https://github.com/spring-projects/spring-amqp/commit/2ee8c34a8cea2c7f6706943d8092e7d9996ba4fa) of amazing team work:

-   Full Java 8 and Spring Framework `5.0` support;
    
-   New `spring-rabbit-junit` artifact with some useful testing utilities including `BrokerRunning` JUnit `@Rule`;
    
-   The `amqp-client` library of version `5.0`;
    
-   A `DirectMessageListenerContainer` to allow to consume messages directly on the client thread instead of queue-based logic in the `SimpleMessageListenerContainer`;
    
-   A `ConnectionNameStrategy` option for the `ConnectionFactory` to name target Broker connections for possible diagnostics;
    
-   new `RabbitOperations.invoke()` for batch of template operation on the dedicated, thread-bound channel;
    
-   `Encoder` support for the Logback `AmqpAppender`;
    
-   Removed deprecated API since previous version;
    
-   And, of course, a ton of bug fixes!
    

For a complete list of changes in `2.0`, see [What’s New in the reference manual](http://docs.spring.io/spring-amqp/docs/2.0.0.RELEASE/reference/html/_introduction.html#_changes_in_2_0_since_1_7).

Also, make sure you’re not going to miss this year’s [SpringOne Platform](https://springoneplatform.io) conference that’s packed with many Spring talks, opportunities to learn about the latest and greatest features and of course some previews about what we’re planning to do next. Discounted pricing is running out soon!

[Project Page](http://projects.spring.io/spring-amqp/) | [JIRA](https://jira.spring.io/browse/AMQP) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp) | [Chat](https://gitter.im/spring-projects/spring-amqp)
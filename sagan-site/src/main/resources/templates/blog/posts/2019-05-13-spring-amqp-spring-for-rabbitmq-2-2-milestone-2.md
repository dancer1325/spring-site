---
title: Spring AMQP (Spring for RabbitMQ) 2.2 Milestone 2
source: https://spring.io/blog/2019/05/13/spring-amqp-spring-for-rabbitmq-2-2-milestone-2
scraped: 2026-02-23T14:48:47.625Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  May 13, 2019 | 0 Comments
---

# Spring AMQP (Spring for RabbitMQ) 2.2 Milestone 2

_Releases | Gary Russell |  May 13, 2019 | 0 Comments_

We are pleased to announce the availability of the second milestone of the Spring AMQP 2.2 release - 2.2.0.M2.

### [](#highlights)[](#highlights)Highlights

-   Spring Data "Projection Interfaces" are now supported by the Jackson message converter.
    
-   `@RabbitListener` methods can now receive batched messages as a `List<?>` instead of one-at-a-time.
    
-   You can now override the default acknowledge mode and executor directly on the `@RabbitListener` annotation.
    

For more information, see the [What’s New](https://docs.spring.io/spring-amqp/docs/2.2.0.M2/reference/html/#whats-new) chapter and the change logs.

-   [Change log for M1](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.M1).
    
-   [Change log for M2](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.M2).
    

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [JIRA](https://jira.spring.io/browse/AMQP) | [Documentation](http://docs.spring.io/spring-amqp/docs/2.2.0.M2/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-amqp) | [Gitter](https://gitter.im/spring-projects/spring-amqp)
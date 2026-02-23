---
title: Spring for RabbitMQ (Spring AMQP) 2.2 is now available
source: https://spring.io/blog/2019/10/02/spring-for-rabbitmq-spring-amqp-2-2-is-now-available
scraped: 2026-02-23T14:34:55.903Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  October 02, 2019 | 0 Comments
---

# Spring for RabbitMQ (Spring AMQP) 2.2 is now available

_Releases | Gary Russell |  October 02, 2019 | 0 Comments_

We are pleased to announce the following maintenance releases are now available.

**All users are encouraged to upgrade to these versions**

-   [2.2.0.RELEASE (**new**)](https://github.com/spring-projects/spring-amqp/releases/tag/v2.2.0.RELEASE).
    
-   [2.1.8.RELEASE (**maintenance**)](https://github.com/spring-projects/spring-amqp/releases/tag/v2.1.8.RELEASE).
    

The 2.2.0 release is the first release of the newest line for this project.

[What’s New](https://docs.spring.io/spring-amqp/docs/2.2.0.RELEASE/reference/html/#whats-new) chapter for more information, but here are a few highlights:

-   Micrometer `Timer` s are now supported to monitor listener performance.
    
-   `@RabbitListener` s can now receive a batch of messages in a `List<?>`, batches can either be created on the producer side, or a `SimpleMessageListenerContainer` can create a batch from incoming discrete messages.
    
-   Spring Data Projection interfaces are now supported as `@RabbitListener` payloads.
    
-   An option is now provided to shuffle the `Addresses` before connecting, instead of always trying the addresses in order.
    

[Project Page](https://spring.io/projects/spring-amqp/) | [GitHub](https://github.com/spring-projects/spring-amqp) | [Issues](https://github.com/spring-projects/spring-amqp/issues) | [Documentation](https://docs.spring.io/spring-amqp/docs/2.1.8.RELEASE/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-amqp) | [Gitter](https://gitter.im/spring-projects/spring-amqp)
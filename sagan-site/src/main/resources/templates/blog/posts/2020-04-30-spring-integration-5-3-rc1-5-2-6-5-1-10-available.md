---
title: Spring Integration 5.3 RC1, 5.2.6 & 5.1.10 Available
source: https://spring.io/blog/2020/04/30/spring-integration-5-3-rc1-5-2-6-5-1-10-available
scraped: 2026-02-23T14:02:45.240Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 30, 2020 | 0 Comments
---

# Spring Integration 5.3 RC1, 5.2.6 & 5.1.10 Available

_Releases | Artem Bilan |  April 30, 2020 | 0 Comments_

I’m pleased to announce the [first](https://github.com/spring-projects/spring-integration/releases/tag/v5.3.0.RC) (and the last) release candidate for Spring Integration `5.3`.

This release ships several bug fixes, a bunch of new features and improvements and will be picked up by Spring Boot `2.3 RC1`.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile 'org.springframework.integration:spring-integration-core:5.3.0.RC1'
```

### [](#the-most-important-new-features-are)[](#the-most-important-new-features-are)The most important new features are:

-   The `MongoDbChangeStreamMessageProducer` - a reactive `MessageProducerSupport` implementation for the Spring Data `ReactiveMongoOperations.changeStream(String, ChangeStreamOptions, Class)` API. This component produces a `Flux` of messages with a `body` of `ChangeStreamEvent` as the payload by default and some change stream related headers (see `MongoHeaders`).
    
-   The `ReactiveMessageSourceProducer` - a reactive implementation of the `MessageProducerSupport` to wrap a provided `MessageSource` into a `Flux` for on demand `receive()` calls.
    
-   The `ReceiveMessageAdvice` - a former `AbstractMessageSourceAdvice` is graduated now to more common advice approach which can be used also for the `PollableChannel.receive()` proxying.
    
-   The `TcpOutboundGateway` now can work in an `async` mode - you’ll get an actual reply from the returned `Future`.
    
-   We also have applied a GitHub default community health. Check this out when you try to raise a new issue [https://github.com/spring-projects/spring-integration/issues/new/choose!](https://github.com/spring-projects/spring-integration/issues/new/choose!)
    

See `What’s New?` in the [Reference Manual](https://docs.spring.io/spring-integration/docs/5.3.0.RC1/reference/html/whats-new.html#whats-new) for more information. Also see a blog post for the previous [Milestone 3](https://spring.io/blog/2020/03/11/spring-integration-5-3-milestone-3-available).

We’re looking forward to your feedback for upcoming GA in May!

In addition to this `5.3 RC1` we also have released maintenance versions - `5.2.6` & `5.1.10` with some bug fixes and upgrades. Based on Spring Integration `5.3 RC1` and Spring for Apache Kafka `2.5 RC1` a `spring-integration-kafka-3.3.0.RC1` was also released to pick up improvements and new feature from its "parents".

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
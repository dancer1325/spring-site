---
title: Spring Integration 6.3.0-M2, 6.2.3 & 6.1.7 Available Now
source: https://spring.io/blog/2024/03/20/spring-integration-6-3-0-m2-6-2-3-and-6-1-7-available-now
scraped: 2026-02-23T08:50:09.159Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 20, 2024 | 0 Comments
---

# Spring Integration 6.3.0-M2, 6.2.3 & 6.1.7 Available Now

_Releases | Artem Bilan |  March 20, 2024 | 0 Comments_

Dear Spring community,

On behalf of Spring Integration team, it is my pleasure to announce `6.3.0-M2` version of the project which is available from [Spring Milestone Repository](https://repo.spring.io/milestone).

In addition, bug fixes versions `6.1.7` & `6.2.3` have been released as well into Maven Central.

The notable changes in `6.3`:

-   Kotlin DSL is compatible now with upcoming [Kotlin 2.0](https://kotlinlang.org/docs/whatsnew-eap.html)
    
-   The `spring-integration-security` module has been removed altogether in favor of `SecurityContextChannelInterceptor` & `SecurityContextPropagationChannelInterceptor` from the `spring-security-messaging` module of Spring Security project
    
-   The `ObservationPropagationChannelInterceptor` is deprecated since it does not carry out a proper observation state between threads or even persistent store.
    

Instead, an observation has to be enabled on the `MessageChannel` and respective `MessageHandler` as a subscriber to this channel. This way a tracing information is propagated via message headers using `PRODUCER` & `CONSUMER` kinds for spans.

-   The `MessageHistory` header is now mutable giving some performance improvement when we don't create a new message on every track
    
-   The `MessageChannel` implementations based on the `UnicastingDispatcher` now can be configured with a `Predicate<Exception> failoverStrategy` for dynamic decision for the failover on the exception thrown from the current `MessageHandler`
    
-   The `Mqttv5PahoMessageDrivenChannelAdapter` uses now subscription identifiers to support shared subscriptions
    
-   A new `MockIntegrationContext.substituteTriggerFor()` API has been added for testing module to easily adjust time-based configurations during test.
    

Many thanks to everyone contributed!

See [What's New](https://docs.spring.io/spring-integration/reference/6.3/whats-new.html#whats-new) in the documentation and don't forget about a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.2-to-6.3-Migration-Guide).

Cheers, Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
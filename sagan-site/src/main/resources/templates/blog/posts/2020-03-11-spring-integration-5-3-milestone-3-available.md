---
title: Spring Integration 5.3 Milestone 3 Available
source: https://spring.io/blog/2020/03/11/spring-integration-5-3-milestone-3-available
scraped: 2026-02-23T14:08:42.987Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 11, 2020 | 0 Comments
---

# Spring Integration 5.3 Milestone 3 Available

_Releases | Artem Bilan |  March 11, 2020 | 0 Comments_

I’m pleased to announce the [third](https://github.com/spring-projects/spring-integration/releases/tag/v5.3.0.M3) milestone for Spring Integration `5.3`.

This release ships several bug fixes, a bunch of new features and improvements and will be picked up by Spring Boot `2.3 M3` in the near future.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile "org.springframework.integration:spring-integration-core:5.3.0.M3"
```

### [](#the-most-important-new-features-are)[](#the-most-important-new-features-are)The most important new features are:

-   Reactive transactions support. The `ReactiveTransactionManager` can now be configured for endpoints which produces reactive type for replies or just implement `ReactiveMessageHandler`.
    
-   `ReactiveRequestHandlerAdvice` - a `MethodInterceptor` for message handlers producing a `Mono` as a payload for reply. The `BiFunction<Message<?>, Mono<?>, Publisher<?>>` customized is applied for the returned `Mono` via `Mono.transform(Function)` operator to add some aspects into a produced result. Typically it is used for `timeout`, `retry`, `tag` options applied for the remote reactive requests, e.g. Webflux or RSocket.
    
-   Kotlin DSL. As we promised [before](https://spring.io/blog/2020/01/23/spring-integration-5-3-milestone-1-available), we have merged `spring-integration-kotlin-dsl` project into core one for general availability and for further possible improvements which are possible only with direct access to core Spring Integration classes. See `org.springframework.integration.dsl.IntegrationFlowDsl.kt` for more information.
    
-   Web Services Java DSL. With a lot of community requests the Java DSL components for Web Services modules has made it into project. See `org.springframework.integration.ws.dsl.Ws` for more information.
    

See `What’s New?` in the [Reference Manual](https://docs.spring.io/spring-integration/docs/5.3.0.M3/reference/html/whats-new.html#whats-new) for more information.

We’re looking forward to your feedback for upcoming RC in April!

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
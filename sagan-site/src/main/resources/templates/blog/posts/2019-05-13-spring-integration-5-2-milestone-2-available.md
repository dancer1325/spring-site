---
title: Spring Integration 5.2 Milestone 2 Available
source: https://spring.io/blog/2019/05/13/spring-integration-5-2-milestone-2-available
scraped: 2026-02-23T14:48:51.985Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 13, 2019 | 0 Comments
---

# Spring Integration 5.2 Milestone 2 Available

_Releases | Artem Bilan |  May 13, 2019 | 0 Comments_

On behalf of Spring Integration team I am pleased to announce that Spring Integration `5.2.0.M2` is available.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile "org.springframework.integration:spring-integration-core:5.2.0.M2"
```

### [](#highlights)[](#highlights)Highlights

-   The [RSocket](https://github.com/rsocket/rsocket-java) channel adapters are available now for full reactive network interaction between client and server. See `spring-integration-rsocket` module and `RSocketInboundGateway` & `RSocketOutboundGateway` JavaDocs, respectively
    
-   Kotlin Jsr223 scripting support has been added into `spring-integration-scripting` module
    
-   The `CacheRequestHandlerAdvice` was introduced to perform caching operations on the `handleRequestMessage()` method in the `AbstractReplyProducingMessageHandler` implementations
    
-   The `RateLimiterRequestHandlerAdvice` is also available for limiting access to the `handleRequestMessage()` method logic
    
-   The `Splitter` component now can be configured with a `discardChannel` to send those request messages for which a splitting function returns empty collection
    
-   The `MailReceiver` implementations can now be configured with the `autoCloseFolder = false` option to not close the mail folder just after fetching, allowing a proper mail message multi-part content processing
    

For more information see the [What’s New chapter in the documentation](https://docs.spring.io/spring-integration/docs/5.2.0.M2/reference/html/#whats-new-part) and the change logs.

-   [Change log for M1](https://github.com/spring-projects/spring-integration/releases/tag/v5.2.0.M1)
    
-   [Change log for M2](https://github.com/spring-projects/spring-integration/releases/tag/v5.2.0.M2)
    

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
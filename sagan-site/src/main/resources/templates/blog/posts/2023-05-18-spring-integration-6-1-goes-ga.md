---
title: Spring Integration 6.1 goes GA
source: https://spring.io/blog/2023/05/18/spring-integration-6-1-goes-ga
scraped: 2026-02-23T09:50:03.638Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 18, 2023 | 0 Comments
---

# Spring Integration 6.1 goes GA

_Releases | Artem Bilan |  May 18, 2023 | 0 Comments_

Dear Spring community,

Hope you enjoy [Spring IO anniversary](https://2023.springio.net/) in Barcelona these days. I'm not there this years for many reasons. Either way, it is my pleasure to announce that Spring Integration `6.1.0` is generally available now from Maven Central.

In addition, bug fixes version `5.5.18` has been released.

The Spring Integration `6.1` version is a natural evolution of `6.x` generation with fixes and improvements which didn't make it into `6.0`. Plus we listen to community and make some possibly, but convenient for target projects breaking changes.

Some highlights of this new version include:

-   Upgrades to the latest dependencies, but only if they don't break the public API we expose
    
-   Added Protobuf transformers support (shout out to [Christian Tzolov](https://spring.io/team/tzolov))
    
-   Migration of Zip extension to respective module in the core project
    
-   The `MessageFilter` now emits a WARN log when a request message is dropped making it, technically, not silent as it was before
    
-   Now gateways and replying handlers don't block forever for sending and receiving operations.
    

The default timeout in the framework is chosen to be `30` seconds

-   The `ContextHolderRequestHandlerAdvice` was introduced to manage `ThreadLocal` values around handler method
    
-   The convenient `handleReactive()` terminal operator was added to Java DSL
    
-   The `IntegrationComponentSpec.get()` of Java DSL has been deprecated in favor of just that spec exposure as a bean to avoid misconfiguration problems where the spec internals might be lost
    
-   a `PartitionedChannel` was introduced for implementing a logic when messages with the same partition key must be processed in the consumer in the same thread.
    

See [What's New](https://docs.spring.io/spring-integration/docs/6.1.0/reference/html/whats-new.html#whats-new) in the documentation and don't forget about a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.0-to-6.1-Migration-Guide).

The Spring Boot `3.1.0` will be released today including Spring Integration `6.1`.

Now we have switched to version `6.2` which is going to be based on Spring Framework `6.1` with much more exciting features and improvements.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
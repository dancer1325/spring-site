---
title: Spring Integration 5.2 GA Available
source: https://spring.io/blog/2019/10/02/spring-integration-5-2-ga-available
scraped: 2026-02-23T14:34:38.405Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 02, 2019 | 0 Comments
---

# Spring Integration 5.2 GA Available

_Releases | Artem Bilan |  October 02, 2019 | 0 Comments_

Dear Spring Community,

On behalf of Spring Integration team I’m excited to announce that Spring Integration `5.2.0.RELEASE` is available.

It can be downloaded from our [release repository](https://repo.spring.io/release) and Maven Central:

```
Copycompile "org.springframework.integration:spring-integration-core:5.2.0.RELEASE"
```

### [](#whats-new-in-this-generation)[](#whats-new-in-this-generation)What’s New in this generation?

-   RSocket Support - an `RSocketInboundGateway` and `RSocketOutboundGateway` are implemented for Reactive Streams support in the RSocket protocol. See `spring-integration-rsocket` module.
    
-   `FluxAggregatorMessageHandler` to produces window or buffer results based on the Project Reactor `Flux` grouping and windowing functionality.
    
-   `RateLimiterRequestHandlerAdvice` and `CacheRequestHandlerAdvice` are available for AOP aspects around `MessageHandler.handleMessage()`.
    
-   JSR223 implementation for Kotlin Scripts has been added into `spring-integration-scripting` module.
    
-   The FTP and SFTP modules now provide an event listener for certain Apache Mina FTP/SFTP server events.
    
-   Simple Apache Avro transformers are now provided.
    
-   Many other improvements throughout the project.
    

See `What’s New?` in the [Reference Manual](https://docs.spring.io/spring-integration/docs/current/reference/html/whats-new.html#whats-new) and [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.1-to-5.2-Migration-Guide) for more information and possible breaking changes.

### [](#in-addition)[](#in-addition)In Addition

The maintenance `5.1.8.RELEASE` version has been released as well including some improvements and bug fixes.

The `spring-integration-kafka:3.2.0.RELEASE` is available, too, and it is based on Spring Integration `5.2` and Spring for Apache Kafka `2.3`.

Also we would like to share with you that we have just started an extension project for Spring Integration Kotlin DSL. A preview version is available on Maven Central as well:

```
Copycompile "org.springframework.integration:spring-integration-kotlin-dsl:0.0.1.RELEASE"
```

See the [GitHub Project Page](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-kotlin-dsl) for more information.

Grab it while it is still hot and you are welcome for any feedback.

See you all next week at [Spring One Platform](https://springoneplatform.io/)!

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
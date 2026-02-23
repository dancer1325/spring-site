---
title: Spring Integration 5.5 RC1, 5.4.6 & 5.3.7 Available
source: https://spring.io/blog/2021/04/14/spring-integration-5-5-rc1-5-4-6-5-3-7-available
scraped: 2026-02-23T13:26:38.671Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 15, 2021 | 0 Comments
---

# Spring Integration 5.5 RC1, 5.4.6 & 5.3.7 Available

_Releases | Artem Bilan |  April 15, 2021 | 0 Comments_

Dear Spring community,

On behalf of the team and all the contributors, it’s my pleasure to announce a `Release Candidate 1` for Spring Integration `5.5`, plus Spring Integration `5.4.6` & `5.3.7` patch versions.

The latest two can be downloaded from Maven Central and it is recommended to upgrade your projects or just pull them transitively from respective latest Spring Boot patch versions!

The Release Candidate is available from the [https://repo.spring.io/milestone/](https://repo.spring.io/milestone/) repository:

```
Copycompile 'org.springframework.integration:spring-integration-core:5.5.0-RC1'
```

Here is a highlight of changes made to Spring Integration `5.5 RC1` since previously announced [Milestone 3](https://spring.io/blog/2021/03/18/spring-integration-5-5-m3-5-4-5-available):

-   A basic support for [Spring Native](https://github.com/spring-projects-experimental/spring-native) compatibility - a lot of bean definition reflection has been reworked to the functional style, which improves a start up time even for regular JVM application!
    
-   WebSocket server endpoint-based channel adapters can now be registered (and removed) at runtime;
    
-   The `MessageGroup` abstraction has now a `condition` property which can be consulted later on instead of the whole group iteration. The `AbstractCorrelatingMessageHandler`, in turn, exposes a `BiFunction<Message<?>, String, String> conditionSupplier` to extract possible group condition from the currently processed message;
    
-   The `DelayHandler` now registers a `TransactionSynchronization` to schedule a delay task only when current transaction is committed;
    
-   Some other bug fixes and minor improvements, including IMAP idle channel adapter race condition, the exception swallowing in the `IntegrationReactiveUtils`, the `ByteBuffer` cast to `Buffer` for Java 8 compatibility. Many of them have been back-ported to the mentioned above `5.3.7` & `5.4.6` patch versions.
    

See [What’s New](https://docs.spring.io/spring-integration/docs/5.5.0-RC1/reference/html/whats-new.html) in documentation for more information. Be sure to consult the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.4-to-5.5-Migration-Guide) since the upgrade may cause some breaking changes!

Any feedback and contributions are welcome while we are heading to `GA` in May!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
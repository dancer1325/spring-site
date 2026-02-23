---
title: Spring Integration 5.5.7 Available
source: https://spring.io/blog/2021/12/21/spring-integration-5-5-7-available
scraped: 2026-02-23T12:59:06.787Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  December 21, 2021 | 0 Comments
---

# Spring Integration 5.5.7 Available

_Releases | Artem Bilan |  December 21, 2021 | 0 Comments_

Dear Spring community,

On behalf of the team and all the contributors, it’s my pleasure to wish you a Merry Christmas and Happy New Year and present you a fresh Spring Integration `5.5.7` [release](https://github.com/spring-projects/spring-integration/releases/tag/v5.5.7).

It can be obtained from Maven Central and it is recommended to upgrade your projects or just pull it transitively from respective latest Spring Boot patch version!

```
Copycompile 'org.springframework.integration:spring-integration-core:5.5.7'
```

The notable changes and important bug fixes are:

-   JDBC message store SQL scripts now quote a `CONDITION` column name for those RDBMS vendors which have this word as reserved. It is likely in the next major `6.0` version we will rename it to `GROUP_CONDITION`. So, it is recommended to upgrade to this `5.5.7` version if you deal with `JdbcMessageStore` for your aggregators.
    
-   Not mentioned previously, but high demanded by Community and introduced in version `5.5.5`, the MQTT v5 channel adapters are present now in the `spring-integration-mqtt` module. They are `Mqttv5PahoMessageDrivenChannelAdapter` and `Mqttv5PahoMessageHandler`, respectively. See [Reference Manual](https://docs.spring.io/spring-integration/docs/current/reference/html/mqtt.html#mqtt-v5) for more information.
    
-   Web Services Java DSL has been fixed for the proper options propagation and honoring possible defaults in the `WebServiceTemplate`.
    
-   The `RedisLockRegistry` now uses a pub/sub for handling distributed unlocking functionality instead of busy-spin loop.
    
-   Java DSL’s `toReactivePublisher()` has now a variant with a `autoStartOnSubscribe` with the meaning do not start emitting messages from endpoints until a subscription happens to the returned `Publisher`.
    
-   The Java DSL parsing logic has been improved for better performance.
    
-   Java DSL also has now a high-level API for `IntegrationFlow` composition via its new `from(IntegrationFlow)` and `to(IntegrationFlow)` operators. See [Reference Manual](https://docs.spring.io/spring-integration/docs/current/reference/html/dsl.html#integration-flows-composition) for more information.
    
-   And we also did tremendous internal refactoring to meet new Spring Native AOT engine requirements and expectations. Now Spring Integration is compatible with GraalVM native images as never!
    

Be sure to consult the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.4-to-5.5-Migration-Guide) since the upgrade may cause some breaking changes.

Stay tuned for Spring Boot `2.6.2` and Spring Native `0.11.1`!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
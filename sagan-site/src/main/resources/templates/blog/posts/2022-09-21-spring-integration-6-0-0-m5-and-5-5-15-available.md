---
title: Spring Integration 6.0.0-M5 and 5.5.15 Available
source: https://spring.io/blog/2022/09/21/spring-integration-6-0-0-m5-and-5-5-15-available
scraped: 2026-02-23T10:36:31.229Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 21, 2022 | 1 Comment
---

# Spring Integration 6.0.0-M5 and 5.5.15 Available

_Releases | Artem Bilan |  September 21, 2022 | 1 Comment_

Dear Spring community,

I’d like to share with you an availability of the latest `Milestone 5` of new Spring Integration `6.0` generation.

It can be obtained from [Spring Milestone repository](https://repo.spring.io/milestone):

```
CopydependencyManagement {
    imports {
        mavenBom 'org.springframework.integration:spring-integration-bom:6.0.0-M5'
    }
}
```

Also, Spring Integration `5.5.15` has been released with some critical bug fixed and upstream dependencies deprecation resolutions. It is recommended to upgrade if you have missed some intermediate releases before or just pull it transitively from upcoming Spring Boot `2.6.12` or `2.7.4`!

With the whole Spring portfolio move to Java `17` and Jakarta EE, it was a tremendous internal framework refactoring to support new Java language level and `jakarta` namespace. Plus this includes an upgrade to the latest dependencies which are Jakarta EE compatible or have some breaking changes we couldn’t move to before.

The notable changes throughout the whole Spring Integration `6.0`

-   Spring AOT support - a lot was reworked internally in the framework to satisfy native images expectations and some reflection, proxy and serialization hints are exposed.
    
-   GraphQL support - a new `spring-integration-graphql` module has been added. It is fully based on a new in portfolio [Spring for GraphQL](https://spring.io/projects/spring-graphql) project and its `GraphQlMessageHandler` is a reactive implementation of the outbound gateway and can perform all `query`, `mutation` & `subscription` GraphQL operations.
    
-   The MQTT module now provides a `ClientManager` abstraction to allow to share the same MQTT client for different channel adapters.
    
-   The `spring-integration-smb` and `spring-integration-hazelcast` [extensions](https://github.com/spring-projects/spring-integration-extensions) have been migrated to the core project for better community visibility. We are planing to migrate more extensions to achieve a better developer experience and maintenance goals.
    
-   A `PostgresSubscribableChannel` has been introduced to rely on the native PostgreSQL push notifications feature. This way an interaction with a `JdbcChannelMessageStore` is not pollable, but rather a plain subscription where we pull a message from the DB whenever a notification happens from PostgreSQL.
    
-   Micrometer Observability - an `ObservationRegistry` instrumentation infrastructure has been added. The `AbstractMessageHandler` now emits a `CONSUMER` observations instead of just `Timer` when an `ObservationRegistry` is injected. An `ObservationPropagationChannelInterceptor` must be used on async and distributed message channels where we would like to propagate an `Observation` from the producer to consumer to continue a trace.
    
-   The `IntegrationFlows` factory is now deprecated in favor of the same functionality migrated directly to the `IntegrationFlow` interface.
    
-   The RMI module is completely removed in favor of other, more secure network protocols.
    
-   Apache Camel support - a new `spring-integration-camel` module has been added. Its `CamelMessageHandler` implementation is aimed for easier calls of Apache Camel routes from Spring Integration flows. It is based on a Camel’s `ProducerTemplate` and can perform `InOnly`, `InOut` and `InOptionalOut` exchanges carrying Spring Integration messages to/from Apache Camel routes.
    
-   All the messaging annotations (`@ServiceActivator`,`@Transformer`, `@Splitter` etc.) are now `@Repeatable`, so you can use the same POJO method in different integration flows.
    
-   The `log()` operator of the `IntegrationFlow` is now non-terminal - its ambiguity in the end of flow has been resolved and now the behavior of the flow remains the same if there was no `log()` operator.
    
-   The `RedisLockRegistry` can now work in pub-sub mode to mitigate a busy-spin concern whenever it is possible and lock can be obtained immediately on pub-sub notification.
    

Also, see a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.x-to-6.0-Migration-Guide) for breaking changes in the framework and its modules.

Give it a try before we go a release candidate in October and you are welcome with any feedback!

See you in person this December at [SpringOne](https://springone.io/2022/sessions/whats-new-in-spring-integration-60) to discuss these and other Spring Integration features!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
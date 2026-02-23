---
title: Spring Integration 5.5 goes GA
source: https://spring.io/blog/2021/05/19/spring-integration-5-5-goes-ga
scraped: 2026-02-23T13:20:40.757Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 19, 2021 | 0 Comments
---

# Spring Integration 5.5 goes GA

_Releases | Artem Bilan |  May 19, 2021 | 0 Comments_

Dear Spring community,

On behalf of the team and all the contributors, it’s my pleasure to announce a General Availability for Spring Integration `5.5`, plus Spring Integration `5.4.7` patch release.

Both versions can be obtained from Maven Central and it is recommended to upgrade your projects or just pull them transitively from respective latest Spring Boot patch versions!

```
Copycompile 'org.springframework.integration:spring-integration-core:5.5.0'
```

Spring Integration `5.4.7` version contains mostly critical bug fixes and here is a highlight of notable changes made to Spring Integration `5.5`, which, in general, is based on the community feedback to make the framework useful for end-user use-cases:

-   A support for [Spring Native](https://github.com/spring-projects-experimental/spring-native) compatibility - a lot of bean definition reflection has been reworked to the functional style, which improves a start up time even for regular JVM application!
    
-   The `FileAggregator` component was introduced. See its JavaDocs for more info;
    
-   All the persistent `MessageGroupStore` implementations provide a `streamMessagesForGroup(Object groupId)` contract based on the target database streaming API;
    
-   The `integrationGlobalProperties` custom bean now has to be an instance of `org.springframework.integration.context.IntegrationProperties` instead of deprecated `java.util.Properties` representation. All these Integration properties are now exposed as auto-configuration properties in Spring Boot;
    
-   The `maxMessagesPerPoll == 0` for an `AbstractPollingEndpoint` is treated now as to skip calling the source;
    
-   A `@Reactive` sub-annotation was introduced for annotation configuration to apply a `Function<? super Flux<Message<?>>, ? extends Publisher<Message<?>>> reactiveCustomizer` for underlying consumer endpoint and make it as reactive independently of the input channel. Same behavior can be achieved in Java DSL via `ConsumerEndpointSpec.reactive()` option;
    
-   MongoDb message sources now have an optional `update` to mark document which have just been pulled from the collection;
    
-   WebSocket server endpoint-based channel adapters can now be registered (and removed) at runtime;
    
-   The `MessageGroup` abstraction has now a `condition` property which can be consulted later on instead of the whole group iteration. The `AbstractCorrelatingMessageHandler`, in turn, exposes a `BiFunction<Message<?>, String, String> conditionSupplier` to extract possible group condition from the currently processed message;
    
-   The `DelayHandler` now registers a `TransactionSynchronization` to schedule a delay task only when current transaction is committed;
    
-   The [GreenMail](https://greenmail-mail-test.github.io/greenmail/) library is used now for email integration tests.
    

See [What’s New](https://docs.spring.io/spring-integration/docs/5.5.0/reference/html/whats-new.html) in documentation for more information. Be sure to consult the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.4-to-5.5-Migration-Guide) since the upgrade may cause some breaking changes.

Stay tuned for Spring Boot `2.5.0` later today!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
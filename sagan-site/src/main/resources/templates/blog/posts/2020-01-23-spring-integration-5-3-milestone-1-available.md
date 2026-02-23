---
title: Spring Integration 5.3 Milestone 1 Available
source: https://spring.io/blog/2020/01/23/spring-integration-5-3-milestone-1-available
scraped: 2026-02-23T14:08:47.819Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 23, 2020 | 1 Comment
---

# Spring Integration 5.3 Milestone 1 Available

_Releases | Artem Bilan |  January 23, 2020 | 1 Comment_

Dear Spring Community,

On behalf of the Spring Integration team I’m excited to announce that with the New Year we have some news to share with you. First of all, it is an honor to have taken over the lead role for the Spring Integration project. [Gary Russell](https://spring.io/team/grussell) is still in the team and he leads [Spring AMQP](https://spring.io/projects/spring-amqp) and [Spring for Apache Kafka](https://spring.io/projects/spring-kafka) projects. Secondly we have just released the first milestone for Spring Integration of version `5.3`.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile "org.springframework.integration:spring-integration-core:5.3.0.M1"
```

This version is going to be a foundation for the upcoming Spring Boot `2.3`.

And more news below!

### [](#whats-new-in-this-generation)[](#whats-new-in-this-generation)What’s New in this generation?

-   Upgrade to Gradle `6.1`, so now we also publish Gradle modules into Maven repository.
    
-   Upgrade to the latest dependencies, including [Spring Data Neumann](https://spring.io/blog/2020/01/16/spring-data-neumann-m1-released).
    
-   Removal of deprecations from the previous version, so if you are going to upgrade soon consider to fix all the deprecation warnings if favor of their replacements. Of course, we try to keep a compatibility with previous version because Spring Cloud Hoxton is going to support both Spring Boot `2.2` & `2.3`.
    
-   Adding native support for the `ReactiveMessageHandler`.
    
-   Reactive Channel Adapter implementations for MongoDb. In fact the `ReactiveMongoDbStoringMessageHandler` is an implementation of mentioned above `ReactiveMessageHandler`.
    
-   The `GatewayProxyFactoryBean` now doesn’t proxy `default` methods in the service interface.
    
-   We have added an `IntegrationPattern` abstraction to indicate which enterprise integration pattern (an `IntegrationPatternType`) and category a Spring Integration component belongs to.
    

See `What’s New?` in the [Reference Manual](https://docs.spring.io/spring-integration/docs/5.3.0.M1/reference/html/whats-new.html#whats-new) for more information.

### [](#in-addition)[](#in-addition)In Addition

We are working on a project which is going to provide a Web UI for integration graph representation including runtime metrics for messages processing on channels and endpoints. Here is a screenshot how it looks now:

[![Spring Integration Graph](https://raw.githubusercontent.com/artembilan/sandbox/master/images/IntegrationGraph.png)](https://raw.githubusercontent.com/artembilan/sandbox/master/images/IntegrationGraph.png)

We are planning on open-sourcing the project soon, so stay tuned!

Also we made some progress in Spring Integration Kotlin DSL. It now looks more "Kotlinish" style! A preview version is available in [snapshot repository](https://repo.spring.io/snapshot):

```
Copycompile "org.springframework.integration:spring-integration-kotlin-dsl:0.0.3.BUILD-SNAPSHOT"
```

This is how it looks now:

```
Copy@Bean
fun someFlow() =
    integrationFlow {
        filter<String> { it === "test" }
        wireTap {
                    handle { println(it.payload) }
                }
        transform<String, String> { it.toUpperCase() }
    }
```

See the [GitHub Project Page](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-kotlin-dsl) for more information.

We have plans to merge this project into a core one after some team review and feedback from the community.

Grab them to try in your projects and share your experience!

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
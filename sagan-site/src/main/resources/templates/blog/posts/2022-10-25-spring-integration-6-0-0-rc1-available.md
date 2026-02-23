---
title: Spring Integration 6.0.0-RC1 Available
source: https://spring.io/blog/2022/10/25/spring-integration-6-0-0-rc1-available
scraped: 2026-02-23T10:36:22.392Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 25, 2022 | 0 Comments
---

# Spring Integration 6.0.0-RC1 Available

_Releases | Artem Bilan |  October 25, 2022 | 0 Comments_

Dear Spring community,

I was so eager to find and fix bugs in the latest Spring Integration release, that missed to announce a `6.0 RC1` last week. But I believe it is still worth to mention it even after [Spring Boot 3.0.0-RC1 announcement](https://spring.io/blog/2022/10/20/spring-boot-3-0-0-rc1-available-now) since there is a number of notable changes and improvements.

So, please, welcome Spring Integration `6.0` first Release Candidate. It can be obtained from [Spring Milestone repository](https://repo.spring.io/milestone):

```
CopydependencyManagement {
    imports {
        mavenBom 'org.springframework.integration:spring-integration-bom:6.0.0-RC1'
    }
}
```

Here you can find important changes after the previously announced [Spring Integration `6.0.0-M5`](https://spring.io/blog/2022/09/21/spring-integration-6-0-0-m5-and-5-5-15-available):

-   `spring-integration-amqp` has added support for RabbitMQ Streams;
    
-   `spring-integration-sftp` has been migrated from an old unsupported `jsch` library to more modern Apache MINA;
    
-   `spring-integration-gemfire` was removed according to dropped support for Apache Geode in Spring Data;
    
-   `spring-integration-scripting` has added a GraalVM Polyglot support for JavaScript invocations;
    
-   The Apache Groovy DSL for Spring Integration extension project has been migrated to the `spring-integration-groovy` module code base;
    
-   The Spring Integration for Apache Cassandra extension project has been migrated as a `spring-integration-cassandra` module;
    
-   The Kotlin Coroutines support has been added to the `@ServiceActivator` POJO functions, also messaging gateway methods can now be as suspended functions;
    
-   The AOP `ChannelSecurityInterceptor` in the `spring-integration-security` module has been deprecated in favor of `AuthorizationChannelInterceptor`.
    

Also, see a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.x-to-6.0-Migration-Guide) for breaking changes in the framework and its modules.

It would be great if you give it a chance and come back to us with reports, so it may make it into GA next month.

See you in person this December at [SpringOne](https://springone.io/2022/sessions/whats-new-in-spring-integration-60)!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)
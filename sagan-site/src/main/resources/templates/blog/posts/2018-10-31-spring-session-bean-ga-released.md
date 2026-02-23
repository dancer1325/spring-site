---
title: Spring Session Bean GA Released
source: https://spring.io/blog/2018/10/31/spring-session-bean-ga-released
scraped: 2026-02-23T15:08:03.836Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  October 31, 2018 | 0 Comments
---

# Spring Session Bean GA Released

_Releases | Rob Winch |  October 31, 2018 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community, I’m pleased to announce the general availability of Spring Session BOM Bean. This is the first release based on Spring Session 2.1 and can be easily consumed with freshly released [Spring Boot 2.1](https://spring.io/blog/2018/10/30/spring-boot-2-1-0). Please read on for the highlights of the release.

## [](#same-site-cookie-support-for-httpsession-integration)[](#same-site-cookie-support-for-code-httpsession-code-integration)Same-Site Cookie support for `HttpSession` integration

Same-Site Cookie is another mechanism that [helps developers to protect from Cross-Site Request Forgery](https://scotthelme.co.uk/csrf-is-dead/). Our `DefaultCookieSerializer` has been enhanced to support adding `SameSite` attribute to session cookie produced by Spring Session. The `SameSite` attribute is enabled by default with value `Lax` and is customizable using `DefaultCookieSerializer#setSameSite`.

Note that the equivalent support for `WebSession` is present in the Spring WebFlux itself starting with Spring Framework 5.1.

## [](#httpsessionbindinglistener-support)[](#code-httpsessionbindinglistener-code-support)`HttpSessionBindingListener` support

Spring Session now supports [`HttpSessionBindingListener`](https://javaee.github.io/javaee-spec/javadocs/javax/servlet/http/HttpSessionBindingListener.html) and will properly invoked callbacks on implementations of this API. This also means that it is now possible to use `@PreDestroy` on session scoped beans, since that feature is realized using Spring Framework’s `DestructionCallbackBindingListener` which is a concrete implementation of `HttpSessionBindingListener`.

## [](#custom-serialization-for-redis-websession-integration)[](#custom-serialization-for-redis-code-websession-code-integration)Custom serialization for Redis `WebSession` integration

Our Redis `WebSession` integration can now be easily configured to use a custom serialization mechanism. In a similar fashion like with Redis `HttpSession` integration, this can be achived by providing a `@Bean` of type `RedisSerializer<Object>` that is named `springSessionDefaultRedisSerializer`:

```
Copy@EnableRedisWebSession
static class SessionConfig {

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        // configure and return a serializer of your choice
    }

}
```

## [](#performance-improvements-for-jdbc-httpsession-integration)[](#performance-improvements-for-jdbc-code-httpsession-code-integration)Performance improvements for JDBC `HttpSession` integration

We have added a couple of performance improvements for our JDBC `HttpSession` integration:

-   lazy deserialization of session attributes - session attributes will now be deserialized on first access, rather than on retrieval of `HttpSession` from database, which can for many HTTP request avoid the cost of deserialization completely
    
-   option for disabling transactions - for users that want to avoid the cost of transactions, `JdbcOperationsSessionRepository` now offers a constructor that takes only `JdbcOperations` and uses a no-op `TransactionOperations` implementation internally
    

## [](#support-for-java-11)[](#support-for-java-11)Support for Java 11

Spring Session now supports recently released Java 11, while the required version of course stays at Java 8. Our CI pipeline has been enhanced so that the project is now continuosly verified against Java 11.

## [](#dependency-upgrades)[](#dependency-upgrades)Dependency Upgrades

Spring Session 2.1 is based on the following latest and greatest releases of key dependencies:

-   Spring Framework 5.1
    
-   Spring Data Lovelace
    
-   Spring Security 5.1
    
-   Project Reactor Californium
    

## [](#other)[](#other)Other

Complete details of Spring Session 2.1 release can be found in the following changelogs:

-   [`2.1.1.RELEASE`](https://github.com/spring-projects/spring-session/milestone/46?closed=1)
    
-   [`2.1.0.RELEASE`](https://github.com/spring-projects/spring-session/milestone/28?closed=1)
    
-   [`2.1.0.RC1`](https://github.com/spring-projects/spring-session/milestone/42?closed=1)
    
-   [`2.1.0.M3`](https://github.com/spring-projects/spring-session/milestone/41?closed=1)
    
-   [`2.1.0.M2`](https://github.com/spring-projects/spring-session/milestone/39?closed=1)
    
-   [`2.1.0.M1`](https://github.com/spring-projects/spring-session/milestone/29?closed=1)
    

[Project Page](https://projects.spring.io/spring-session/) | [Documentation](https://docs.spring.io/spring-session/docs/2.1.0.RELEASE/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Gitter](https://gitter.im/spring-projects/spring-session) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session)
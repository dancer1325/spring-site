---
title: Spring Framework 7.0.0-M7 available now
source: https://spring.io/blog/2025/07/17/spring-framework-7-0-0-M7-available-now
scraped: 2026-02-23T07:36:24.636Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  July 17, 2025 | 0 Comments
---

# Spring Framework 7.0.0-M7 available now

_Releases | Brian Clozel |  July 17, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce a new milestone for the next Spring Framework generation. We have compiled all the upgrade information, new features and deprecations on the [Spring Framework 7.0 release notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes) preview page.

## [](#resilience-features)Resilience Features

After the introduction of the `org.springframework.core.retry` package in 7.0.0-M6, effectively moving features from the former "spring-retry" project, we recently introduced dedicated `@Retryable`, `@ConcurrencyLimit` and `@EnableResilientMethods` annotations. This is now documented in the ["Resilience Features" section of the reference documentation](https://docs.spring.io/spring/reference/7.0-SNAPSHOT/core/resilience.html).

## [](#introducing-jmsclient-and-revisiting-jdbcclient)Introducing JmsClient and revisiting JdbcClient

After JdbcClient and RestClient in 6.1, we are now introducing a `JmsClient`: with common send and receive operations against a JMS destination, dealing with Spring's common `Message` or with payload values, throwing `MessagingException` in alignment with the "spring-messaging" module. This is effectively an alternative to `JmsMessagingTemplate`, also delegating to Spring's `JmsTemplate` for performing actual operations.

You can find [code snippets in the JmsClient Javadoc](https://docs.spring.io/spring-framework/docs/7.0.0-SNAPSHOT/javadoc-api/org/springframework/jms/core/JmsClient.html).

## [](#api-versioning-updates)API Versioning updates

We have significantly improved the API Versioning support in this release. On top of resolving API versions in media types, applications now support API deprecations, validation, a fixed set of versions, and more. This is completing the umbrella ticket for this feature and we documented it in the [API Versioning for MVC](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webmvc-versioning.html) and [API Versioning for WebFlux](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/web/webflux-versioning.html) sections of the reference documentation.

## [](#message-converters-configuration-with-httpmessageconverters)Message converters configuration with HttpMessageConverters

Similar to the codecs configuration on the reactive side with `WebClient` and WebFlux server applications, we have introduced the new `HttpMessageConverters` class for an easier and centralized experience when it comes to classpath detection of HTTP message converters and their global setup.

In practice, you will encounter them on new configuration methods. For example, [WebMvcConfigurer#configureMessageConverters](https://docs.spring.io/spring-framework/docs/7.0.0-SNAPSHOT/javadoc-api/org/springframework/web/servlet/config/annotation/WebMvcConfigurer.html#configureMessageConverters\(org.springframework.http.converter.HttpMessageConverters.ServerBuilder\)) will let you configure a custom message converter. There are similar methods on `RestTemplate` and `RestClient` as well.

## [](#pausing-of-test-application-contexts)Pausing of Test Application Contexts

The Spring TestContext framework is caching application context instances within test suites for faster runs. As of Spring Framework 7.0, we now [pause test application contexts when they're not used](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/testing/testcontext-framework/ctx-management/caching.html). This means an application context stored in the context cache will be stopped when it is no longer actively in use and automatically restarted the next time the context is retrieved from the cache. Specifically, the latter will restart all auto-startup beans in the application context, effectively restoring the lifecycle state.

## [](#and-much-more)And much more!

There are plenty of other changes, like the Kotlin 2.2.0 upgrade, or [the Hibernate 7.0 support and Hibernate 5.x/6.x backwards compatibility concerns](https://github.com/spring-projects/spring-framework/issues/35111). As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M7) for more details.

7.0.0-M7 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
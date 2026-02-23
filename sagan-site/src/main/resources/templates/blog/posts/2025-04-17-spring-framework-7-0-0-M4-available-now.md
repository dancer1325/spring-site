---
title: Spring Framework 7.0.0-M4 Available Now
source: https://spring.io/blog/2025/04/17/spring-framework-7-0-0-M4-available-now
scraped: 2026-02-23T07:39:52.974Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  April 17, 2025 | 2 Comments
---

# Spring Framework 7.0.0-M4 Available Now

_Releases | Brian Clozel |  April 17, 2025 | 2 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce a new milestone for the next Spring Framework generation. The fourth milestone continues delivering new features and refinements on top of [7.0.0-M1](https://spring.io/blog/2025/01/23/spring-framework-7-0-0-M1-available-now), [7.0.0-M2](https://spring.io/blog/2025/02/13/spring-framework-7-0-0-M2-available-now) and [7.0.0-M3](https://spring.io/blog/2025/03/13/spring-framework-7-0-0-M3-available-now).

## [](#class-file-api-usage-for-java-24-apps)Class-File API usage for Java 24+ apps

Spring Framework reads class bytecode to collect metadata about the application code. Historically we have used a slim ASM fork for this purpose, through the `MetadataReaderFactory` and `MetadataReader` types in the `org.springframework.core.type.classreading` package. Although Spring applications typically have no direct exposure to this API, this is especially useful when parsing `@Configuration` classes or looking for annotations on application code.

Java 24 introduced a new [Class-File API with JEP 484](https://openjdk.org/jeps/484) for reading and writing classes as Java bytecode. Spring Framework 7.0 adopts this feature for Java 24+ applications with a new `ClassFileMetadataReader` implementation in spring-core. This should be completely transparent for applications and enabled automatically for Java 24+ runtimes.

## [](#new-optional-to-object-converter)New `Optional` to `Object` converter

Spring Framework 7.0 will automatically convert an `Optional<T>` to its contained object thanks to a new `OptionalToObjectConverter`. For example, this can be used to transparently unwrap `Optional<T>` arguments for method invocations in SpEL expressions.

## [](#http-interface-clients)HTTP interface clients

[`HttpServiceProxyFactory` makes it easy to create a proxy for an HTTP interface](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/integration/rest-clients.html#rest-http-interface). However, it's clear from community feedback that more needs to be done to help with creating tens, maybe hundreds of HTTP service proxies. With this feature, each service can be associated with a suitably configured HTTP client, and the service can be exposed as a bean to the application. Our goal here is to provide foundational support for this use case and enable Spring Boot and Spring Cloud users. We also want to give the Spring Cloud OpenFeign community a migration path to HTTP interface services.

7.0-M4 brings a new registry for HTTP Interface Proxies with an extensible registration DSL. Please [refer to the upgrade notes for an example](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#registry-for-http-interface-proxies) and stay tuned for more information on this feature.

## [](#api-versioning-update)API versioning update

Our new API versioning feature got new updates, with support on the client side and in tests. We'll update the reference documentation and [upgrade notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#api-versioning-support-in-web-applications) to expand a bit more on that.

## [](#and-much-more)And much more!

As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M4) for more details and [read the global 7.0 release notes for upgrade concerns](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes).

7.0.0-M4 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
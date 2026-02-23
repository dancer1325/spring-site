---
title: Spring Cloud 2025.1.0 (aka Oakwood) has been released
source: https://spring.io/blog/2025/11/25/spring-cloud-2025-1-0-aka-oakwood-has-been-released
scraped: 2026-02-22T22:08:11.979Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  November 25, 2025 | 0 Comments
---

# Spring Cloud 2025.1.0 (aka Oakwood) has been released

_Releases | Spencer Gibb |  November 25, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2025.1.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2025.1.0/). You can check out the 2025.1.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1-Release-Notes).

## [](#notable-changes-in-the-202510-release-train)Notable Changes in the 2025.1.0 Release Train

This is a major release, each project has been updated to version 5.0.0. This release is based on Spring Framework 7 and Spring Boot 4.

A complete list of changes for this release can found in the [2025.1.0 GitHub Project](https://github.com/orgs/spring-cloud/projects/186).

### [](#spring-cloud-release)Spring Cloud Release

-   The `spring-cloud-stater-parent` artifact has been removed ([#437](https://github.com/spring-cloud/spring-cloud-release/issues/437))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Spring Cloud Gateway now has null-safety annotations for all public API classes with JSpecify ([#3953](https://github.com/spring-cloud/spring-cloud-gateway/issues/3953))
-   Retry filter based on Spring Framework's retry functionality ([#3970](https://github.com/spring-cloud/spring-cloud-gateway/pull/3970))
-   Initial support for JSpecify ([#3944](https://github.com/spring-cloud/spring-cloud-gateway/pull/3944))
-   Use Google libraries for JSON processing in gRPC ([#3853](https://github.com/spring-cloud/spring-cloud-gateway/pull/3853))
-   Remove deprecated artifacts in favor of new ones. The new artifacts are `spring-cloud-gateway-server-web{flux|mvc}` and `spring-cloud-gateway-proxyexchange-web{flux|mvc}` [#3858](https://github.com/spring-cloud/spring-cloud-gateway/issues/3858)
-   New API Versioning Predicate in Server WebFlux [#3864](https://github.com/spring-cloud/spring-cloud-gateway/issues/3864)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Spring Cloud Commons now has null-safety annotations for all public API classes with JSpecify ([#1594](https://github.com/spring-cloud/spring-cloud-commons/pull/1594))
-   Add LoadBalancer API versioning support [#1582](https://github.com/spring-cloud/spring-cloud-commons/pull/1582)
-   LoadBalancer integration for Spring Interface Clients AutoConfiguration [#1491](https://github.com/spring-cloud/spring-cloud-commons/pull/1491), [#1492](https://github.com/spring-cloud/spring-cloud-commons/pull/1492)
-   CircuitBreaker integration for Spring Interface Clients AutoConfiguration [#1538](https://github.com/spring-cloud/spring-cloud-commons/issues/1538)

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   A new module has been added with a Spring Cloud Circuitbreaker implementation using the new [resilience support in Spring Framework 7.0.0](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#resilience-features-retrytemplate-retryable-concurrencylimit). (#[256](https://github.com/spring-cloud/spring-cloud-circuitbreaker/pull/256)
-   The module `spring-cloud-circuitbreaker-spring-retry` has been placed in maintenance only mode and will be removed when [Spring Retry](https://github.com/spring-projects/spring-retry) is no longer supported.
-   Upgrade Resilience4j to 2.3.0
-   The version of Spring Cloud Circuit Breaker has moved to 5.0.x to align with the rest of the release train, skipping version 4.0.x

### [](#spring-cloud-config)Spring Cloud Config

-   Transition to use Jackson 3 ([#3131](https://github.com/spring-cloud/spring-cloud-config/pull/3131))
-   Removed all deprecated classes and methods ([#2908](https://github.com/spring-cloud/spring-cloud-config/pull/2908))

### [](#spring-cloud-stream)Spring Cloud Stream

-   Support for caching and logging control options for KTable materialization
-   Support for consumer priority support in Rabbit binder properties
-   Migration to Jackson 3
-   The artifact `org.springframework.cloud:spring-cloud-stream-binder-kafka-reactive` has been removed as Reactor Kafka has been discontinued. See [this blog post](https://spring.io/blog/2025/05/20/reactor-kafka-discontinued) for more information.

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Remove RestTemplate support ([#4504](https://github.com/spring-cloud/spring-cloud-netflix/pull/4504))

### [](#spring-cloud-consul)Spring Cloud Consul

-   Replaced `ewcid-api` with a non-blocking interface client ([#475](https://github.com/spring-cloud/spring-cloud-consul/issues/475))
-   Replaced 3rd party Consul HTTP Client with Interface Clients [#840](https://github.com/spring-cloud/spring-cloud-consul/pull/840)

### [](#spring-cloud-function)Spring Cloud Function

-   Significant enhancements in the discovery of complex input/output types.
-   Support for post-processing Kotlin functions. Although the feature is mostly used in Spring Cloud Stream, the supporting implementation is in Spring Cloud Functions.
-   Support for preserving AWS Context in AWS Custom Runutime support of AWS Lambda
-   Migration to Jackson 3
-   Discontinue spring-cloud-function-rscoket
-   Discontinue spring-cloud-function-deployer

### [](#spring-cloud-contract)Spring Cloud Contract

-   Removed support for REST Assured due to [support being dropped in Spring REST Docs](https://github.com/spring-projects/spring-restdocs/issues/1000).
-   stubrunner. -> spring.cloud.contract.stubrunner. property migration ([#2309](https://github.com/spring-cloud/spring-cloud-contract/pull/2309))
-   Removed `javax.inject` and `javax.annotation` support [#2206](https://github.com/spring-cloud/spring-cloud-contract/issues/2206)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Leader election info contributor can now be disabled by setting `management.info.leader.enabled=false` ([#2085](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/2085))
-   Deprecated classes and methods have been removed, and numerous other improvements to public classes have been made. See the [milestone](https://github.com/spring-cloud/spring-cloud-kubernetes/issues?q=is%3Aclosed%20milestone%3A%225.0.0-M4%22) for a complete list of changes
-   Upgraded Kubernetes Java Client to 24.0.0
-   Upgraded Fabric8 Kubernetes Client to 7.4.0
-   The version of Spring Cloud Kuberentes has moved to 5.0.x to align with the rest of the release train, skipping version 4.0.x

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Remove deprecations. ([#1268](https://github.com/spring-cloud/spring-cloud-openfeign/pull/1268))

The following modules were updated as part of 2025.1.0:

Module

Version

Issues

Spring Cloud Stream

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v5.0.0))

Spring Cloud Netflix

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v5.0.0))

Spring Cloud Starter Build

2025.1.0

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.1.0))

Spring Cloud Commons

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v5.0.0))

Spring Cloud Circuitbreaker

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v5.0.0))

Spring Cloud Gateway

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v5.0.0))

Spring Cloud Config

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v5.0.0))

Spring Cloud Build

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v5.0.0))

Spring Cloud Consul

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v5.0.0))

Spring Cloud Function

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v5.0.0))

Spring Cloud Contract

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v5.0.0))

Spring Cloud Vault

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v5.0.0))

Spring Cloud Task

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v5.0.0))

Spring Cloud Kubernetes

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v5.0.0))

Spring Cloud Openfeign

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v5.0.0))

Spring Cloud Zookeeper

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v5.0.0))

Spring Cloud Bus

5.0.0

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v5.0.0))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2025.1.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    ...
</dependencies>
```

or with Gradle:

```groovy
Copyplugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.0'
  id 'io.spring.dependency-management' version '1.1.7'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2025.1.0")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
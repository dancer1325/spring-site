---
title: Spring Cloud 2025.1.0-RC1 (aka Oakwood) has been released
source: https://spring.io/blog/2025/11/13/spring-cloud-2025-1-0-RC1-aka-oakwood-has-been-released
scraped: 2026-02-23T07:21:57.273Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  November 13, 2025 | 0 Comments
---

# Spring Cloud 2025.1.0-RC1 (aka Oakwood) has been released

_Releases | Spencer Gibb |  November 13, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud 2025.1.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.1.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1-Release-Notes).

## [](#notable-changes-in-the-202510-release-train)Notable Changes in the 2025.1.0 Release Train

Highlights of this release are support for [Spring Boot 4.0.0-RC2](https://spring.io/blog/2025/11/06/spring-boot-4-0-0-RC2-available-now), updates for Jackson 3 support, initial support for [JSpecify Null-Safety](https://spring.io/blog/2025/11/12/null-safe-applications-with-spring-boot-4), dependency updates and bug fixes.

A complete list of changes for this release can found in the [2025.1.0-RC1 GitHub Project](https://github.com/orgs/spring-cloud/projects/185).

### [](#spring-cloud-function)Spring Cloud Function

-   Significant enhancements in the discovery of complex input/output types.
-   Support for post-processing Kotlin functions. Although the feature is mostly used in Spring Cloud Stream, the supporting implementation is in Spring Cloud Functions.
-   Support for preserving AWS Context in AWS Custom Runutime support of AWS Lambda
-   Migration to Jackson 3

### [](#spring-cloud-consul)Spring Cloud Consul

-   Replaced `ewcid-api` with a non-blocking interface client ([#475](https://github.com/spring-cloud/spring-cloud-consul/issues/475))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Spring Cloud Gateway now has null-safety annotations for all public API classes with JSpecify ([#3953](https://github.com/spring-cloud/spring-cloud-gateway/issues/3953))
-   Retry filter based on Spring Framework's retry functionality ([#3970](https://github.com/spring-cloud/spring-cloud-gateway/pull/3970))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Spring Cloud Commons now has null-safety annotations for all public API classes with JSpecify ([#1594](https://github.com/spring-cloud/spring-cloud-commons/pull/1594))

### [](#spring-cloud-vault)Spring Cloud Vault

-   Uses Spring Vault RC2

### [](#spring-cloud-stream)Spring Cloud Stream

-   Support for caching and logging control options for KTable materialization
-   Support for consumer priority support in Rabbit binder properties
-   Migration to Jackson 3

### [](#spring-cloud-config)Spring Cloud Config

-   Transition to use Jackson 3 ([#3131](https://github.com/spring-cloud/spring-cloud-config/pull/3131))

### [](#spring-cloud-contract)Spring Cloud Contract

-   Removed support for REST Assured due to [support being dropped in Spring REST Docs](https://github.com/spring-projects/spring-restdocs/issues/1000).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Leader election info contributor can now be disabled by setting `management.info.leader.enabled=false` ([#2085](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/2085))

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   A new module has been added with a Spring Cloud Circuitbreaker implementation using the new [resilience support in Spring Framework 7.0.0](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#resilience-features-retrytemplate-retryable-concurrencylimit). (#[256](https://github.com/spring-cloud/spring-cloud-circuitbreaker/pull/256)
-   The module `spring-cloud-circuitbreaker-spring-retry` has been placed in maintenance only mode and will be removed when [Spring Retry](https://github.com/spring-projects/spring-retry) is no longer supported.

The following modules were updated as part of 2025.1.0-RC1:

Module

Version

Issues

Spring Cloud Function

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v5.0.0-RC1))

Spring Cloud Zookeeper

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v5.0.0-RC1))

Spring Cloud Consul

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v5.0.0-RC1))

Spring Cloud Gateway

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v5.0.0-RC1))

Spring Cloud Bus

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v5.0.0-RC1))

Spring Cloud Commons

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v5.0.0-RC1))

Spring Cloud Vault

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v5.0.0-RC1))

Spring Cloud Stream

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v5.0.0-RC1))

Spring Cloud Openfeign

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v5.0.0-RC1))

Spring Cloud Netflix

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v5.0.0-RC1))

Spring Cloud Config

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v5.0.0-RC1))

Spring Cloud Build

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v5.0.0-RC1))

Spring Cloud Contract

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v5.0.0-RC1))

Spring Cloud Starter Build

2025.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.1.0-RC1))

Spring Cloud Task

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v5.0.0-RC1))

Spring Cloud Kubernetes

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v5.0.0-RC1))

Spring Cloud Circuitbreaker

5.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v5.0.0-RC1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy    <repositories>
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2025.1.0-RC1</version>
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
  id 'org.springframework.boot' version '4.0.0-RC2'
  id 'io.spring.dependency-management' version '1.1.7'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2025.1.0-RC1")
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
//...
```
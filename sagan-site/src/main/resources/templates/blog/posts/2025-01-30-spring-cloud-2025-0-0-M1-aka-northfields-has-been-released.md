---
title: Spring Cloud 2025.0.0-M1 (aka Northfields) has been released
source: https://spring.io/blog/2025/01/30/spring-cloud-2025-0-0-M1-aka-northfields-has-been-released
scraped: 2026-02-23T07:54:21.984Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  January 30, 2025 | 0 Comments
---

# Spring Cloud 2025.0.0-M1 (aka Northfields) has been released

_Releases | Spencer Gibb |  January 30, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2025.0](https://cloud.spring.io) (aka Northfields) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0-Release-Notes).

## [](#notable-changes-in-the-202500-m1-release)Notable Changes in the 2025.0.0-M1 Release

Spring Cloud 2025.0.0-M1 depends on Spring Boot 3.5.0-M1. See all issues and pull requests that are part of the release [here](https://github.com/orgs/spring-cloud/projects/158).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Adds support for spring-cloud-function and spring-cloud-stream handlers [#3646](https://github.com/spring-cloud/spring-cloud-gateway/pull/3646)
-   Adds support for a Bucket4jRateLimiter in server webflux [#2955](https://github.com/spring-cloud/spring-cloud-gateway/pull/2955)
-   Deprecate WebClientRouting infrastructure. This will be removed in 5.0 later this year. [#3680](https://github.com/spring-cloud/spring-cloud-gateway/issues/3680)
-   New Module and Starter names have been created and the old names are deprectated. The new and deprecated artifacts are listed in the table below [#3645](https://github.com/spring-cloud/spring-cloud-gateway/pull/3645). These new names clarify the two styles of gateway (server or proxy exchange) as well as the two web stacks from Spring Framework (Web MCV and WebFlux). Use of the deprecated artifacts will add a warning message in the logs.

Deprecated Artifact

New Artifact

spring-cloud-gateway-server

spring-cloud-gateway-server-webflux

spring-cloud-gateway-server-mvc

spring-cloud-gateway-server-webmvc

spring-cloud-starter-gateway-server

spring-cloud-starter-gateway-server-webflux

spring-cloud-starter-gateway-server-mvc

spring-cloud-starter-gateway-server-webmvc

spring-cloud-gateway-mvc

spring-cloud-gateway-proxyexchange-webmvc

spring-cloud-gateway-webflux

spring-cloud-gateway-proxyexchange-webflux

### [](#spring-cloud-config)Spring Cloud Config

-   Add property to disable adding invalid prefix when decryption fails [#2708](https://github.com/spring-cloud/spring-cloud-config/issues/2632)

### [](#spring-cloud-stream)Spring Cloud Stream

-   Clarify that having a custom error handler disables auto send to DLQ [3063](https://github.com/spring-cloud/spring-cloud-stream/pull/3063).
    
-   GH-3062: Fix `KafkaBinderMetrics` for resource leaks [3064](https://github.com/spring-cloud/spring-cloud-stream/pull/3064).
    

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Allow customising Apache HTTP Client 5 `RequestConfig` in `EurekaClientHttpRequestFactorySupplier` [4394](https://github.com/spring-cloud/spring-cloud-netflix/pull/4394)

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Adds support for reactive bulkheads [#166](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/166)

### [](#spring-cloud-function)Spring Cloud Function

-   Change "synchronized" to reentrant lock for virtual-threads [#1188](https://github.com/spring-cloud/spring-cloud-function/pull/1188)

---

The following modules were updated as part of 2025.0.0-M1:

Module

Version

Issues

Spring Cloud Openfeign

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.3.0-M1))

Spring Cloud Config

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.3.0-M1))

Spring Cloud Build

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.3.0-M1))

Spring Cloud Stream

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.3.0-M1))

Spring Cloud Netflix

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.3.0-M1))

Spring Cloud Circuitbreaker

3.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.3.0-M1))

Spring Cloud Contract

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.3.0-M1))

Spring Cloud Commons

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.3.0-M1))

Spring Cloud Consul

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.3.0-M1))

Spring Cloud Gateway

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.3.0-M1))

Spring Cloud Vault

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.3.0-M1))

Spring Cloud Function

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.3.0-M1))

Spring Cloud Dependencies

2025.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-release/releases/tag/v2025.0.0-M1))

Spring Cloud Task

3.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.3.0-M1))

Spring Cloud Kubernetes

3.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.3.0-M1))

Spring Cloud Bus

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.3.0-M1))

Spring Cloud Zookeeper

4.3.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.3.0-M1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<repositories>
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
            <version>2025.0.0-M1</version>
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
  id 'org.springframework.boot' version '3.5.0-M1'
  id 'io.spring.dependency-management' version '1.1.7'
}

//...

ext {
  set('springCloudVersion', "2025.0.0-M1")
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
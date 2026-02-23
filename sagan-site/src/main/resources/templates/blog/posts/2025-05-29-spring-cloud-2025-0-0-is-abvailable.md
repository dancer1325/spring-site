---
title: Spring Cloud 2025.0.0 (aka Northfields) has been released
source: https://spring.io/blog/2025/05/29/spring-cloud-2025-0-0-is-abvailable
scraped: 2026-02-23T07:40:26.896Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 29, 2025 | 3 Comments
---

# Spring Cloud 2025.0.0 (aka Northfields) has been released

_Releases | Spencer Gibb |  May 29, 2025 | 3 Comments_

On behalf of the community, I am pleased to announce the General Availability (GA) of the [Spring Cloud 2025.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2025.0.0/). You can check out the 2025.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0-Release-Notes).

## [](#notable-changes-in-the-202500-release-train)Notable Changes in the 2025.0.0 Release Train

This release is compatible with Spring Boot 3.5.0. See all issues and pull requests that are part of the release [here](https://github.com/orgs/spring-cloud/projects/175). Below are highlights from all the milestones leading up to the GA release.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Adds support for spring-cloud-function and spring-cloud-stream handlers [#3646](https://github.com/spring-cloud/spring-cloud-gateway/pull/3646).
-   Adds support for a Bucket4jRateLimiter in server webflux [#2955](https://github.com/spring-cloud/spring-cloud-gateway/pull/2955).
-   Deprecate `WebClientRouting` infrastructure. This will be removed in 5.0 later this year. [#3680](https://github.com/spring-cloud/spring-cloud-gateway/issues/3680)
-   New Module and Starter names have been created, and the old names are deprecated. The new and deprecated artifacts are listed in the table below [#3645](https://github.com/spring-cloud/spring-cloud-gateway/pull/3645). These new names clarify the two styles of gateway (server or proxy exchange) as well as the two web stacks from Spring Framework (Web MCV and WebFlux). Use of the deprecated artifacts will add a warning message in the logs.

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

-   Migration to new property prefixes to match the new module names: [#3361](https://github.com/spring-cloud/spring-cloud-gateway/issues/3361), [#3362](https://github.com/spring-cloud/spring-cloud-gateway/issues/3362), [#3363](https://github.com/spring-cloud/spring-cloud-gateway/issues/3363), [#3647](https://github.com/spring-cloud/spring-cloud-gateway/issues/3647). Use `spring-boot-properties-migrator` to support the deprecated prefixes. The table below lists the module or starter, its old prefix, and the new replacement prefix.

Module/Starter

Deprecated prefix

New prefix

spring-cloud-starter-gateway-server-webflux

spring.cloud.gateway.\*

spring.cloud.gateway.server.webflux.\*

spring-cloud-starter-gateway-server-webmvc

spring.cloud.gateway.mvc.\*

spring.cloud.gateway.server.webmvc.\*

spring-cloud-gateway-proxyexchange-webflux

spring.cloud.gateway.proxy.\*

spring.cloud.gateway.proxy-exchange.webflux.\*

spring-cloud-gateway-proxyexchange-webmvc

spring.cloud.gateway.proxy.\*

spring.cloud.gateway.proxy-exchange.webmvc.\*

-   The `X-Forwarded-*` and `Forwarded` header functionality will be disabled by default with the fix versions. If you require `X-Forwarded-*` or `Forwarded` header functionality, set `spring.cloud.gateway.server.webflux.trusted-proxies` to a Java Regular Expression that specifies the proxies whose headers you trust. If you are using Spring Cloud Gateway Server MVC (only available from 4.1.x onward) set `spring.cloud.gateway.mvc.trusted-proxies`. For example for Spring Cloud Gateway Server:

```properties
Copyspring.cloud.gateway.server.webflux.trusted-proxies=10\.0\.0\..*
```

For example, for Spring Cloud Gateway Server WebMVC:

```properties
Copyspring.cloud.gateway.server.webmvc.trusted-proxies=10\.0\.0\..*
```

### [](#spring-cloud-config)Spring Cloud Config

Support YAML specific profile documents in AWS S3 buckets ([#2825](https://github.com/spring-cloud/spring-cloud-config/pull/2825)).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Kubernetes as a Composite config source [#1873](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1873).
-   *Breaking Change* Upgrade To Fabric8 7.3.1 [#1923](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1923).

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Added support for reactive bulkheads [#231](https://github.com/spring-cloud/spring-cloud-circuitbreaker/pull/231).

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Allow customizing Apache HTTP Client 5 `RequestConfig` in `EurekaClientHttpRequestFactorySupplier` [#4391](https://github.com/spring-cloud/spring-cloud-netflix/issues/4391).

---

The following modules were updated as part of 2025.0.0:

Module

Version

Issues

Spring Cloud Config

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.3.0))

Spring Cloud Build

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.3.0))

Spring Cloud Openfeign

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.3.0))

Spring Cloud Stream

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.3.0))

Spring Cloud Netflix

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.3.0))

Spring Cloud Commons

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.3.0))

Spring Cloud Circuitbreaker

3.3.0

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.3.0))

Spring Cloud Contract

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.3.0))

Spring Cloud Consul

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.3.0))

Spring Cloud Gateway

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.3.0))

Spring Cloud Vault

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.3.0))

Spring Cloud Starter Build

2025.0.0

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.0.0))

Spring Cloud Function

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.3.0))

Spring Cloud Task

3.3.0

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.3.0))

Spring Cloud Kubernetes

3.3.0

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.3.0))

Spring Cloud Bus

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.3.0))

Spring Cloud Zookeeper

4.3.0

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.3.0))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [X](https://x.com/SpringCloud).

---

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
            <version>2025.0.0</version>
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
  id 'org.springframework.boot' version '3.5.0'
  id 'io.spring.dependency-management' version '1.1.7'
}

//...

ext {
  set('springCloudVersion', "2025.0.0")
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
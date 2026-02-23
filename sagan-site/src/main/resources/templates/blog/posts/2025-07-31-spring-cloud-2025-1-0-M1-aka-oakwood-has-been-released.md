---
title: Spring Cloud 2025.1.0-M1 (aka Oakwood) has been released
source: https://spring.io/blog/2025/07/31/spring-cloud-2025-1-0-M1-aka-oakwood-has-been-released
scraped: 2026-02-23T07:33:47.872Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  July 31, 2025 | 0 Comments
---

# Spring Cloud 2025.1.0-M1 (aka Oakwood) has been released

_Releases | Olga Maciaszek-Sharma |  July 31, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2025.1](https://cloud.spring.io) (aka Oakwood) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2025.1.0-M1/). You can check out the 2025.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1-Release-Notes).

## [](#notable-changes-in-the-202510-m1-release)Notable Changes in the 2025.1.0-M1 Release

Spring Cloud 2025.0.0-M1 depends on Spring Boot 4.0.0-M1. See all issues and pull requests that are part of the release [here](https://github.com/orgs/spring-cloud/projects/165).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Remove deprecated artifacts in favor of new ones. The new artifacts are `spring-cloud-gateway-server-web{flux|mvc}` and `spring-cloud-gateway-proxyexchange-web{flux|mvc}` [#3858](https://github.com/spring-cloud/spring-cloud-gateway/issues/3858)
-   New API Versioning Predicate in Server WebFlux [#3864](https://github.com/spring-cloud/spring-cloud-gateway/issues/3864)

### [](#spring-cloud-commons)Spring Cloud Commons

-   LoadBalancer integration for Spring Interface Clients AutoConfiguration [#1491](https://github.com/spring-cloud/spring-cloud-commons/pull/1491), [#1492](https://github.com/spring-cloud/spring-cloud-commons/pull/1492)
-   CircuitBreaker integration for Spring Interface Clients AutoConfiguration [#1538](https://github.com/spring-cloud/spring-cloud-commons/issues/1538)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Removed `javax.inject` and `javax.annotation` support [#2206](https://github.com/spring-cloud/spring-cloud-contract/issues/2206)

### [](#spring-cloud-config)Spring Cloud Config

-   Removed all deprecated classes and methods ([#2908](https://github.com/spring-cloud/spring-cloud-config/pull/2908))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   The version of Spring Cloud Kuberentes has moved to 5.0.x to align with the rest of the release train, skipping version 4.0.x

### [](#spring-cloud-circuit-breaker)Spring Cloud Circuit Breaker

-   The version of Spring Cloud Circuit Breaker has moved to 5.0.x to align with the rest of the release train, skipping version 4.0.x

### [](#spring-cloud-stream)Spring Cloud Stream

-   The artifact `org.springframework.cloud:spring-cloud-stream-binder-kafka-reactive` has been removed as Reactor Kafka has been discontinued. See [this blog post](https://spring.io/blog/2025/05/20/reactor-kafka-discontinued) for more information.

### [](#spring-cloud-consul)Spring Cloud Consul

-   Replaced 3rd party Consul HTTP Client with Interface Clients [#840](https://github.com/spring-cloud/spring-cloud-consul/pull/840)

---

The following modules were updated as part of 2025.0.0-M1:

Module

Version

Issues

Spring Cloud OpenFeign

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v5.0.0-M1))

Spring Cloud Config

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v5.0.0-M1))

Spring Cloud Build

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v5.0.0-M1))

Spring Cloud Stream

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v5.0.0-M1))

Spring Cloud Netflix

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v5.0.0-M1))

Spring Cloud Circuitbreaker

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v5.0.0-M1))

Spring Cloud Contract

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v5.0.0-M1))

Spring Cloud Commons

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v5.0.0-M1))

Spring Cloud Consul

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v5.0.0-M1))

Spring Cloud Gateway

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v5.0.0-M1))

Spring Cloud Vault

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v5.0.0-M1))

Spring Cloud Function

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v5.0.0-M1))

Spring Cloud Dependencies

2025.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-release/releases/tag/v2025.1.0-M1))

Spring Cloud Task

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v5.0.0-M1))

Spring Cloud Kubernetes

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v5.0.0-M1))

Spring Cloud Bus

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v5.0.0-M1))

Spring Cloud Zookeeper

5.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v5.0.0-M1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

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
            <version>2025.1.0-M1</version>
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
  id 'org.springframework.boot' version '4.0.0-M1'
  id 'io.spring.dependency-management' version '1.1.7'
}

//...

ext {
  set('springCloudVersion', "2025.1.0-M1")
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
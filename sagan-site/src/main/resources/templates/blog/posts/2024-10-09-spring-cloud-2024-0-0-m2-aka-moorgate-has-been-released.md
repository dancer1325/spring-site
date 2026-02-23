---
title: Spring Cloud 2024.0.0-M2 (aka Moorgate) Has Been Released
source: https://spring.io/blog/2024/10/09/spring-cloud-2024-0-0-m2-aka-moorgate-has-been-released
scraped: 2026-02-23T08:13:39.361Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 09, 2024 | 0 Comments
---

# Spring Cloud 2024.0.0-M2 (aka Moorgate) Has Been Released

_Releases | Ryan Baxter |  October 09, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud 2024.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2024.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2024.0-Release-Notes).

## [](#notable-changes-in-the-202400-m2-release-train)Notable Changes in the 2024.0.0-M2 Release Train

This release of Spring Cloud is based on Spring Boot 3.4.0-M3.

The GitHub project for this release can be found [here](https://github.com/orgs/spring-cloud/projects/153/views/1).

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Support `ignorecase` with `Pageable` ([#1047](https://github.com/spring-cloud/spring-cloud-openfeign/pull/1047))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Create a TrustStore without requiring a KeyStore ([#1394](https://github.com/spring-cloud/spring-cloud-commons/pull/1394))

### [](#spring-cloud-config)Spring Cloud Config

-   Resources can be stored and received with a given charset ([#2115](https://github.com/spring-cloud/spring-cloud-config/issues/2115))
-   Add MongoDB environment repository support [(#2390)](https://github.com/spring-cloud/spring-cloud-config/pull/2390)
-   Support Multiple Labels In Environment Repositories [(#2449)](https://github.com/spring-cloud/spring-cloud-config/issues/2449)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Webflux Java DSL gets a method to nest boolean predicates [(#2598 )](https://github.com/spring-cloud/spring-cloud-gateway/pull/2598)
-   Adds an enabled flag to a route [(#3026)](https://github.com/spring-cloud/spring-cloud-gateway/pull/3026)
-   QPS, Latency etc metrics added to grafana template [(#3014)](https://github.com/spring-cloud/spring-cloud-gateway/pull/3014)
-   Fix for same redis rate limiter bucket used with multiple routes [(#2517)](https://github.com/spring-cloud/spring-cloud-gateway/pull/2517)

### [](#spring-cloud-stream)Spring Cloud Stream

Spring Cloud Stream `4.2.0-M2` release contains some new enhancements and bug fixes. For more information, see [here](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.0-M2).

For further details, see the [4.2.0-M2 milestone](https://github.com/spring-cloud/spring-cloud-stream/milestone/98?closed=1).

The following modules were updated as part of 2024.0.0-M2:

Module

Version

Issues

Spring Cloud Bus

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.2.0-M2))

Spring Cloud Contract

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.2.0-M2))

Spring Cloud Circuitbreaker

3.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.2.0-M2))

Spring Cloud Zookeeper

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.2.0-M2))

Spring Cloud Task

3.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.2.0-M2))

Spring Cloud Kubernetes

3.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.2.0-M2))

Spring Cloud Starter Build

2024.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2024.0.0-M2))

Spring Cloud Netflix

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.2.0-M2))

Spring Cloud Openfeign

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.2.0-M2))

Spring Cloud Commons

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.2.0-M2))

Spring Cloud Consul

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.2.0-M2))

Spring Cloud Config

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.2.0-M2))

Spring Cloud Vault

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.2.0-M2))

Spring Cloud Build

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.2.0-M2))

Spring Cloud Gateway

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.2.0-M2))

Spring Cloud Stream

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.0-M2))

Spring Cloud Function

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.2.0-M2))

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
            <version>2024.0.0-M2</version>
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
  id 'org.springframework.boot' version '3.4.0-M3'
  id 'io.spring.dependency-management' version '1.1.6'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2024.0.0-M2")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
---
title: Spring Cloud 2025.0.0-M2 (aka Northfields) has been released
source: https://spring.io/blog/2025/03/03/spring-cloud-2025-0-0-m2-is-abvailable
scraped: 2026-02-23T07:51:34.861Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  March 03, 2025 | 3 Comments
---

# Spring Cloud 2025.0.0-M2 (aka Northfields) has been released

_Releases | Spencer Gibb |  March 03, 2025 | 3 Comments_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud 2025.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0.0-Release-Notes).

## [](#notable-changes-in-the-202500-m2-release-train)Notable Changes in the 2025.0.0-M2 Release Train

This milestone is compatible with Spring Boot 3.5.0-M2. See all issues and pull requests that are part of the release [here](https://github.com/orgs/spring-cloud/projects/167).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support rewriting request parameters in Server WebMVC [#3669](https://github.com/spring-cloud/spring-cloud-gateway/pull/3669).
-   Bug fixes for multipart data and retry in Server WebMVC.

### [](#spring-cloud-config)Spring Cloud Config

Bug fixes and dependency updates.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Manage the version of okhttp in commons [#1470](https://github.com/spring-cloud/spring-cloud-commons/pull/1470).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Kubernetes as a Composite config source [#1873](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1873)

The following modules were updated as part of 2025.0.0-M2:

Module

Version

Issues

Spring Cloud Config

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.3.0-M2))

Spring Cloud Build

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.3.0-M2))

Spring Cloud Openfeign

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.3.0-M2))

Spring Cloud Stream

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.3.0-M2))

Spring Cloud Netflix

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.3.0-M2))

Spring Cloud Commons

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.3.0-M2))

Spring Cloud Circuitbreaker

3.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.3.0-M2))

Spring Cloud Contract

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.3.0-M2))

Spring Cloud Consul

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.3.0-M2))

Spring Cloud Gateway

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.3.0-M2))

Spring Cloud Vault

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.3.0-M2))

Spring Cloud Starter Build

2025.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.0.0-M2))

Spring Cloud Function

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.3.0-M2))

Spring Cloud Task

3.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.3.0-M2))

Spring Cloud Kubernetes

3.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.3.0-M2))

Spring Cloud Bus

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.3.0-M2))

Spring Cloud Zookeeper

4.3.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.3.0-M2))

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
            <version>2025.0.0-M2</version>
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
  set('springCloudVersion', "2025.0.0-M2")
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
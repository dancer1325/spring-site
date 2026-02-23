---
title: Spring Cloud 2025.0.0-RC1 (aka Northfields) has been released
source: https://spring.io/blog/2025/05/01/spring-cloud-2025-0-0-rc1-released
scraped: 2026-02-23T07:44:02.122Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  May 01, 2025 | 0 Comments
---

# Spring Cloud 2025.0.0-RC1 (aka Northfields) has been released

_Releases | Ryan Baxter |  May 01, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud 2025.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0-Release-Notes).

## [](#notable-changes-in-the-202500-release-train)Notable Changes in the 2025.0.0 Release Train

This release is based on Spring Boot 3.5.0-RC1.

For a complete list of changes made in this release see [this project on GitHub](https://github.com/orgs/spring-cloud/projects/174).

### [](#spring-cloud-config)Spring Cloud Config

-   Support YAML specific profile documents in AWS S3 buckets ([#2825](https://github.com/spring-cloud/spring-cloud-config/pull/2825))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Allow registering custom filters and predicates as beans ([#3250](https://github.com/spring-cloud/spring-cloud-gateway/issues/3250))
-   Support setting Spring.webflux.base-path and supporting it in path predicate ([#2984](https://github.com/spring-cloud/spring-cloud-gateway/pull/2984))
-   Add Permissions-Policy as configurable option to SecureHeaders GatewayFilter ([#2975](https://github.com/spring-cloud/spring-cloud-gateway/issues/2975))
-   Support for reloading httpClient connectTimeout Configuration ([#3679](https://github.com/spring-cloud/spring-cloud-gateway/pull/3679))

### [](#spring-cloud-task)Spring Cloud Task

-   Added deprecation notifications for Remote Partitioning and Task Launcher ([1d4e159](https://github.com/spring-cloud/spring-cloud-task/commit/1d4e1593ac41b0bc192fca6bef7a15a52ab3dbcc))

### [](#spring-cloud-stream)Spring Cloud Stream

-   StreamBridge does not add dynamic Bindings to Output/Input binding lifecycle ([#3106](https://github.com/spring-cloud/spring-cloud-stream/issues/3106))

### [](#spring-cloud-function)Spring Cloud Function

-   Spring Cloud Function Web is essentially deprecated with Spring Cloud Function support in Spring Cloud Gateway as the replacement.
-   Deprecate RSocket module ([#1267](https://github.com/spring-cloud/spring-cloud-function/issues/1267))
-   Allow adapter to listen for additional http verbs ([#1271](https://github.com/spring-cloud/spring-cloud-function/pull/1271))

The following modules were updated as part of 2025.0.0-RC1:

Module

Version

Issues

Spring Cloud Netflix

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.3.0-RC1))

Spring Cloud Starter Build

2025.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.0.0-RC1))

Spring Cloud Consul

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.3.0-RC1))

Spring Cloud Config

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.3.0-RC1))

Spring Cloud Build

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.3.0-RC1))

Spring Cloud Gateway

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.3.0-RC1))

Spring Cloud Zookeeper

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.3.0-RC1))

Spring Cloud Contract

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.3.0-RC1))

Spring Cloud Circuitbreaker

3.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.3.0-RC1))

Spring Cloud Task

3.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.3.0-RC1))

Spring Cloud Kubernetes

3.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.3.0-RC1))

Spring Cloud Bus

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.3.0-RC1))

Spring Cloud Commons

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.3.0-RC1))

Spring Cloud Openfeign

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.3.0-RC1))

Spring Cloud Stream

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.3.0-RC1))

Spring Cloud Function

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.3.0-RC1))

Spring Cloud Vault

4.3.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.3.0-RC1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy
    <repositories>
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
            <version>2025.0.0-RC1</version>
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
  id 'org.springframework.boot' version '3.5.0-RC1'
  id 'io.spring.dependency-management' version '1.1.7'
}

//...

ext {
  set('springCloudVersion', "2025.0.0-RC1")
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
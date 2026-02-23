---
title: Spring Cloud 2025.0.0-M3 (aka Northfields) has been released
source: https://spring.io/blog/2025/04/08/spring-cloud-2025-0-0-m3-released
scraped: 2026-02-23T07:47:22.317Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  April 08, 2025 | 0 Comments
---

# Spring Cloud 2025.0.0-M3 (aka Northfields) has been released

_Releases | Ryan Baxter |  April 08, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud 2025.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0.0-Release-Notes).

## [](#notable-changes-in-the-202500-release-train)Notable Changes in the 2025.0.0 Release Train

A complete list of all changes in this release can be found in [this project on GitHub](https://github.com/orgs/spring-cloud/projects/170).

The release is based off of Spring Boot 3.5.0-M3.

### [](#spring-cloud-stream)Spring Cloud Stream

-   Add ability to define bindings dynamically with `BindingsLifecycleController`
-   Add ability to modify existing binidngs with `BindingsLifecycleController`
-   Fix SpEL Expresion serialization for Actuator

### [](#spring-cloud-function)Spring Cloud Function

-   Change the behavior of `MessageConverterHelper` to ensure users can force failures at individual Message convertes
-   Ensure header names are process in case-insensitive (RFC 2616)
-   Fix Kotlin function type discovery

### [](#spring-cloud-commons)Spring Cloud Commons

-   Manage the version of okhttp in commons ([#1470](https://github.com/spring-cloud/spring-cloud-commons/pull/1470))

### [](#spring-cloud-config)Spring Cloud Config

-   Config Server: S3 integration should consume the same files as in Git intergation [#1829](https://github.com/spring-cloud/spring-cloud-config/issues/1829)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Add support for default routing functionality to functions in server webmvc [#3716](https://github.com/spring-cloud/spring-cloud-gateway/pull/3716)
-   Performance enhancement for request rate limiter lua script. [#3693](https://github.com/spring-cloud/spring-cloud-gateway/pull/3693)
-   Initial functionality for default function routing [#3691](https://github.com/spring-cloud/spring-cloud-gateway/pull/3691)
-   Query param route predicate - extension of QueryRoutePredicateFactory [#3472](https://github.com/spring-cloud/spring-cloud-gateway/pull/3472)
-   Adding Forwarded-by header to Requests [#2658](https://github.com/spring-cloud/spring-cloud-gateway/pull/2658)

The following modules were updated as part of 2025.0.0-M3:

Module

Version

Issues

Spring Cloud Stream

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.3.0-M3))

Spring Cloud Openfeign

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.3.0-M3))

Spring Cloud Netflix

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.3.0-M3))

Spring Cloud Commons

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.3.0-M3))

Spring Cloud Circuitbreaker

3.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.3.0-M3))

Spring Cloud Contract

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.3.0-M3))

Spring Cloud Consul

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.3.0-M3))

Spring Cloud Config

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.3.0-M3))

Spring Cloud Build

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.3.0-M3))

Spring Cloud Gateway

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.3.0-M3))

Spring Cloud Function

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.3.0-M3))

Spring Cloud Starter Build

2025.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.0.0-M3))

Spring Cloud Vault

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.3.0-M3))

Spring Cloud Task

3.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.3.0-M3))

Spring Cloud Kubernetes

3.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.3.0-M3))

Spring Cloud Zookeeper

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.3.0-M3))

Spring Cloud Bus

4.3.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.3.0-M3))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
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
            <version>2025.0.0-M3</version>
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

```
Copybuildscript {
dependencies {
classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
}
}

repositories {
maven {
url 'https://repo.spring.io/milestone'
}
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2025.0.0-M3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
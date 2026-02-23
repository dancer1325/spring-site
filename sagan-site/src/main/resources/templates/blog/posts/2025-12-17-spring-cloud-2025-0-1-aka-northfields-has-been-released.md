---
title: Spring Cloud 2025.0.1 (aka Northfields) Has Been Released
source: https://spring.io/blog/2025/12/17/spring-cloud-2025-0-1-aka-northfields-has-been-released
scraped: 2026-02-22T22:05:06.125Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 17, 2025 | 0 Comments
---

# Spring Cloud 2025.0.1 (aka Northfields) Has Been Released

_Releases | Ryan Baxter |  December 17, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2025.0.1](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2025.0.1/). You can check out the 2025.0.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.0.1-Release-Notes).

## [](#notable-changes-in-the-202501-release-train)Notable Changes in the 2025.0.1 Release Train

This release is based on Spring Boot 3.5.8.

For a complete list of changes in this release, see [this GitHub project](https://github.com/orgs/spring-cloud/projects/176).

The module `spring-cloud-starter-parent` has been deprecated and will be removed in the next major release.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Upgrade kubernetes java client to 19.0.3 ([#1926](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1926))
-   Add the ability to disable leader info contributor ([#2086](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/2086))

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Set max requests based on http client properties ([#1286](https://github.com/spring-cloud/spring-cloud-openfeign/pull/1286))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Add new property for GatewayTagsProvider ([#4013](https://github.com/spring-cloud/spring-cloud-gateway/pull/4013))
-   [CVE-2025-41243](https://spring.io/security/cve-2025-41243)

### [](#spring-cloud-config)Spring Cloud Config

-   Allow file based repos to continue on error when fetching multiple labels ([#3130](https://github.com/spring-cloud/spring-cloud-config/pull/3130))
-   File monitor should skip repository uris with placeholders ([#3112](https://github.com/spring-cloud/spring-cloud-config/pull/3112))
-   Do not return profile-specific property sources ([#3023](https://github.com/spring-cloud/spring-cloud-config/pull/3023))

The following modules were updated as part of 2025.0.1:

Module

Version

Issues

Spring Cloud Bus

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.3.1))

Spring Cloud Starter Build

2025.0.1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.0.1))

Spring Cloud Kubernetes

3.3.1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.3.1))

Spring Cloud Function

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.3.1))

Spring Cloud Zookeeper

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.3.1))

Spring Cloud Commons

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.3.1))

Spring Cloud Task

3.3.1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.3.1))

Spring Cloud Vault

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.3.1))

Spring Cloud Openfeign

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.3.1))

Spring Cloud Circuitbreaker

3.3.1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.3.1))

Spring Cloud Netflix

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.3.1))

Spring Cloud Stream

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.3.1))

Spring Cloud Gateway

4.3.3

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.3.3))

Spring Cloud Build

4.3.2

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.3.2))

Spring Cloud Consul

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.3.1))

Spring Cloud Config

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.3.1))

Spring Cloud Contract

4.3.1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.3.1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2025.0.1</version>
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

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2025.0.1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
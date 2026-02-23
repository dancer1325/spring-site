---
title: Spring Cloud 2025.1.1 (aka Oakwood) Has Been Released
source: https://spring.io/blog/2026/01/29/spring-cloud-2025-1-1-aka-oakwood-has-been-released
scraped: 2026-02-22T21:59:23.965Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  January 29, 2026 | 0 Comments
---

# Spring Cloud 2025.1.1 (aka Oakwood) Has Been Released

_Releases | Ryan Baxter |  January 29, 2026 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2025.1.1](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2025.1.1/). You can check out the 2025.1.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1-Release-Notes).

## [](#notable-changes-in-the-202511-release-train)Notable Changes in the 2025.1.1 Release Train

Spring Cloud 2025.0.0 is incompatible with Spring Boot 4.0.1 and later 4.0.x releases due to changes in Spring Boot. This Spring Cloud release introduces compatibility with Spring Boot 4.0.1 and later 4.0.x release for the 2025.1.x Spring Cloud release train.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   New leader election implementations for the Kubernetes Java Client ([#2107](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/2107)) and Fabric8 Client ([#2108](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/2108))

The following modules were updated as part of 2025.1.1:

Module

Version

Issues

Spring Cloud Netflix

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v5.0.1))

Spring Cloud Stream

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v5.0.1))

Spring Cloud Consul

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v5.0.1))

Spring Cloud Circuitbreaker

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v5.0.1))

Spring Cloud Starter Build

2025.1.1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.1.1))

Spring Cloud Config

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v5.0.1))

Spring Cloud Build

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v5.0.1))

Spring Cloud Gateway

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v5.0.1))

Spring Cloud Bus

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v5.0.1))

Spring Cloud Vault

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v5.0.1))

Spring Cloud Contract

5.0.2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v5.0.2))

Spring Cloud Function

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v5.0.1))

Spring Cloud Task

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v5.0.1))

Spring Cloud Kubernetes

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v5.0.1))

Spring Cloud Commons

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v5.0.1))

Spring Cloud Openfeign

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v5.0.1))

Spring Cloud Zookeeper

5.0.1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v5.0.1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2025.1.1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2025.1.1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
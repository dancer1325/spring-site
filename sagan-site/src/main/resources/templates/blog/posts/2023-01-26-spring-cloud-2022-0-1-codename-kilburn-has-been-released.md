---
title: Spring Cloud 2022.0.1 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2023/01/26/spring-cloud-2022-0-1-codename-kilburn-has-been-released
scraped: 2026-02-23T10:15:19.876Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  January 26, 2023 | 1 Comment
---

# Spring Cloud 2022.0.1 (codename Kilburn) Has Been Released

_Releases | Ryan Baxter |  January 26, 2023 | 1 Comment_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0.1](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2022.0.1/). You can check out the 2022.0.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0.1-Release-Notes).

## [](#notable-changes-in-the-202201-release-train)Notable Changes in the 2022.0.1 Release Train

This release is compatible with Spring Boot 3.0.2.

### [](#spring-cloud-function)Spring Cloud Function

Few minor [enhancements and bug fixes](spring-cloud-function-context)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Implement A `CatalogWatch` For Kubernetes Java Client ((1042)\[[https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1042](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1042)\])

### [](#spring-cloud-stream)Spring Cloud Stream

Number of [enhancements and bug fixes](https://github.com/spring-cloud/spring-cloud-stream/milestone/85?closed=1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Provided setter for `DefaultServiceInstance.secure` ([#1089](https://github.com/spring-cloud/spring-cloud-commons/pull/1089))
-   Optimised selectors for weighted load-balancing to ensure that selection is always O(1) time ([#1184](https://github.com/spring-cloud/spring-cloud-commons/pull/1184)

### [](#spring-cloud-gateway)Spring Cloud Gateway

A number of bugs were fixed, in particular

-   Fixed memory leak of CacheRequestBodyGatewayFilter ([#2842](https://github.com/spring-cloud/spring-cloud-gateway/pull/2842))
-   Kotlin Route DSL restored ([#2813](https://github.com/spring-cloud/spring-cloud-gateway/issues/2813))

The following modules were updated as part of 2022.0.1:

Module

Version

Issues

Spring Cloud Function

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/45?closed=1))

Spring Cloud Task

3.0.1

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/70?closed=1))

Spring Cloud Kubernetes

3.0.1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/56?closed=1))

Spring Cloud Openfeign

4.0.1

Spring Cloud Bus

4.0.1

Spring Cloud Stream

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/85?closed=1))

Spring Cloud Commons

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/111?closed=1))

Spring Cloud Contract

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/98?closed=1))

Spring Cloud Netflix

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/117?closed=1))

Spring Cloud Consul

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/65?closed=1))

Spring Cloud Config

4.0.1

Spring Cloud Build

4.0.1

Spring Cloud Starter Build

2022.0.1

Spring Cloud Gateway

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/75?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2022.0.1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
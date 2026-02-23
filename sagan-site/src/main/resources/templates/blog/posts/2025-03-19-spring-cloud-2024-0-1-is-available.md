---
title: Spring Cloud 2024.0.1 (aka Moorgate) has been released
source: https://spring.io/blog/2025/03/19/spring-cloud-2024-0-1-is-available
scraped: 2026-02-23T07:48:47.446Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  March 19, 2025 | 0 Comments
---

# Spring Cloud 2024.0.1 (aka Moorgate) has been released

_Releases | Ryan Baxter |  March 19, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the [Spring Cloud 2024.0.1](https://cloud.spring.io) Release Train (aka Moorgate) is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2024.0.1/). You can check out the 2024.0.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2024.0-Release-Notes).

## [](#notable-changes-in-the-202401-release-train)Notable Changes in the 2024.0.1 Release Train

This Spring Cloud release is primarily a bugfix release and is based on Spring Boot 3.4.3.

A complete list of issues addressed in this release can be found in [this project](https://github.com/orgs/spring-cloud/projects/163).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   KubernetesEnvironmentRepository can be used as a composite config source in the config server ([#1873](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1873))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Support configuring bean names as well as bean types for extra-refreshable and never-refreshable ([#1457](https://github.com/spring-cloud/spring-cloud-commons/pull/1457))

### [](#spring-cloud-stream)Spring Cloud Stream

-   Enabling lazy initialization breaks Kafka Streams [#3065](https://github.com/spring-cloud/spring-cloud-stream/issues/3065)
-   Clarify that having a custom error handler disables auto send to DLQ [#3063](https://github.com/spring-cloud/spring-cloud-stream/pull/3063)
-   Add `spring.cloud.stream.function.autodetect` to `additional-spring-configuration-metadata.json` [#3052](https://github.com/spring-cloud/spring-cloud-stream/issues/3052)
-   fix(observability): register ObservationRegistry for dynamic MessageChannels in StreamBridge (#3033) [#3036](https://github.com/spring-cloud/spring-cloud-stream/pull/3036)
-   Batch-Capable Producer Bindings [#2969](https://github.com/spring-cloud/spring-cloud-stream/issues/2969)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Enable body caching in CircuitBreakerFilterFactory ([#3543](https://github.com/spring-cloud/spring-cloud-gateway/pull/3543))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Allow customising Apache HttpClient 5 RequestConfig in EurekaClientHttpRequestFactorySupplier ([#4391](https://github.com/spring-cloud/spring-cloud-netflix/issues/4391))

The following modules were updated as part of 2024.0.1:

Module

Version

Issues

Spring Cloud Vault

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.2.1))

Spring Cloud Bus

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.2.1))

Spring Cloud Task

3.2.1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.2.1))

Spring Cloud Zookeeper

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.2.1))

Spring Cloud Kubernetes

3.2.1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.2.1))

Spring Cloud Function

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.2.2))

Spring Cloud Commons

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.2.1))

Spring Cloud Circuitbreaker

3.2.1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.2.1))

Spring Cloud Openfeign

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.2.1))

Spring Cloud Starter Build

2024.0.1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2024.0.1))

Spring Cloud Stream

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.1))

Spring Cloud Consul

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.2.1))

Spring Cloud Gateway

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.2.1))

Spring Cloud Contract

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.2.1))

Spring Cloud Config

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.2.1))

Spring Cloud Build

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.2.1))

Spring Cloud Netflix

4.2.1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.2.1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

---

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2024.0.1</version>
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
    <!-- ... -->
</dependencies>
```

or with Gradle:

```groovy
Copyplugins {
    id 'java'
    id 'org.springframework.boot' version '3.4.3'
    id 'io.spring.dependency-management' version '1.1.7'
}

// ..

repositories {
    mavenCentral()
}

ext {
    set('springCloudVersion', "2024.0.1")
}

dependencies {
    implementation 'org.springframework.cloud:spring-cloud-starter-config'
    implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    // ..
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}
```
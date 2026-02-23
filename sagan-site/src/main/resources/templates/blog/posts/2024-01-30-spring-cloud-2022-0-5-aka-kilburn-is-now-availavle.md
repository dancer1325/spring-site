---
title: Spring Cloud 2022.0.5 (aka Kilburn) Is Now Availavle
source: https://spring.io/blog/2024/01/30/spring-cloud-2022-0-5-aka-kilburn-is-now-availavle
scraped: 2026-02-23T08:58:27.366Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  January 30, 2024 | 0 Comments
---

# Spring Cloud 2022.0.5 (aka Kilburn) Is Now Availavle

_Releases | Ryan Baxter |  January 30, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0.5](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2022.0.5/). You can check out the 2022.0.5 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0.5-Release-Notes).

## [](#notable-changes-in-the-202205-release-train)Notable Changes in the 2022.0.5 Release Train

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Fix regression removing the ability to customize config server bootstrapper ([#324](https://github.com/spring-cloud/spring-cloud-zookeeper/issues/324))

### [](#spring-cloud-function)Spring Cloud Function

Added support for running web workloads (e.g., SpringMVC) as native executables in serverless environments (e.g., AWS). More documentation to come, but you can see sample here - [https://github.com/aws/serverless-java-container/tree/main/samples/springboot3/pet-store-native](https://github.com/aws/serverless-java-container/tree/main/samples/springboot3/pet-store-native)

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Customizable groupExecutorService in Resilience4J CircuitBreakerFactory ([#180](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/180))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Adds links to other paths for \`/actuator/gateway ([#3128](https://github.com/spring-cloud/spring-cloud-gateway/issues/3128))

### [](#spring-cloud-config)Spring Cloud Config

-   Register a new class to resolve properties during bootstrap ([#2375](https://github.com/spring-cloud/spring-cloud-config/pull/2375))

### [](#spring-cloud-consul)Spring Cloud Consul

-   Fix regression removing the ability to customize config server bootstrapper ([#833](https://github.com/spring-cloud/spring-cloud-consul/pull/833))

### [](#spring-cloud-contract)Spring Cloud Contract

-   Fix [CVE 2024-22236](https://spring.io/security/cve-2024-22236)

The following modules were updated as part of 2022.0.5:

Module

Version

Issues

Spring Cloud Vault

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.0.2))

Spring Cloud Bus

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.0.3))

Spring Cloud Zookeeper

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.0.2))

Spring Cloud Openfeign

4.0.6

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.0.6))

Spring Cloud Commons

4.0.5

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.0.5))

Spring Cloud Task

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.0.4))

Spring Cloud Kubernetes

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.0.5))

Spring Cloud Function

4.0.6

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.0.6))

Spring Cloud Circuitbreaker

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.0.4))

Spring Cloud Netflix

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.0.4))

Spring Cloud Starter Build

2022.0.5

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2022.0.5))

Spring Cloud Stream

4.0.5

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.0.5))

Spring Cloud Gateway

4.0.9

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.0.9))

Spring Cloud Build

4.0.6

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.0.6))

Spring Cloud Config

4.0.5

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.0.5))

Spring Cloud Consul

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.0.4))

Spring Cloud Contract

4.0.5

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.0.5))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.5</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2022.0.5'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
---
title: Spring Cloud 2022.0.4 (aka Kilburn) Is Available
source: https://spring.io/blog/2023/07/28/spring-cloud-2022-0-4-aka-kilburn-is-available
scraped: 2026-02-23T09:32:29.614Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  July 28, 2023 | 4 Comments
---

# Spring Cloud 2022.0.4 (aka Kilburn) Is Available

_Releases | Olga Maciaszek-Sharma |  July 28, 2023 | 4 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0.4](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2022.0.4/). You can check out the 2022.0.4 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0.4-Release-Notes).

## [](#notable-changes-in-the-202204-release-train)Notable Changes in the 2022.0.4 Release Train

This release is based on Spring Boot 3.0.9.

A complete list of issues resolved in this release can be found in [this GitHub project](https://github.com/orgs/spring-cloud/projects/114/views/1).

### [](#spring-cloud-commons)Spring Cloud Commons

-   Support for retry-aware load-balancing for ServiceInstanceListSupplier delegates has been added [(1221)](https://github.com/spring-cloud/spring-cloud-commons/issues/1221)

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Upgraded OpenFeign/Feign `12.4` [(878)](https://github.com/spring-cloud/spring-cloud-openfeign/issues/878)

### [](#spring-cloud-stream)Spring Cloud Stream

Fix function auto-detection issues when single input/output bindings are defined. Fix type discovery issues in `DefaultPollableMessageSource.` Shared beans loading exception handling improvements ([https://github.com/spring-cloud/spring-cloud-stream/issues/2744](https://github.com/spring-cloud/spring-cloud-stream/issues/2744)) Fix partition selector strategy issues when using reactive functions ([https://github.com/spring-cloud/spring-cloud-stream/issues/2750](https://github.com/spring-cloud/spring-cloud-stream/issues/2750)) KafkaBinderHealthIndicator refactorings. Fix `StreamBridge` double partitioning issues ([https://github.com/spring-cloud/spring-cloud-stream/issues/2759](https://github.com/spring-cloud/spring-cloud-stream/issues/2759)) Add new health indicator for Reactor Kafka Binder ([https://github.com/spring-cloud/spring-cloud-stream/issues/2752](https://github.com/spring-cloud/spring-cloud-stream/issues/2752)) Address dynamic destination via sendto header issues causing partition key extractor invocation problems ([https://github.com/spring-cloud/spring-cloud-stream/issues/2770](https://github.com/spring-cloud/spring-cloud-stream/issues/2770)) Address BindersHealthContributor thread-safety issues ([https://github.com/spring-cloud/spring-cloud-stream/issues/2780](https://github.com/spring-cloud/spring-cloud-stream/issues/2780))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Upgraded Netflix/Eureka to `2.0.1` which contains fixes necessary for using secured replicas [(4161)](https://github.com/spring-cloud/spring-cloud-netflix/issues/4161)

The following modules were updated as part of 2022.0.4:

Module

Version

Issues

Spring Cloud Zookeeper

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.0.1))

Spring Cloud Kubernetes

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.0.4))

Spring Cloud Function

4.0.5

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.0.5))

Spring Cloud Commons

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.0.4))

Spring Cloud CircuitBreaker

3.0.3

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.0.3))

Spring Cloud OpenFeign

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.0.4))

Spring Cloud Gateway

4.0.7

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.0.7))

Spring Cloud Stream

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.0.4))

Spring Cloud Consul

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.0.3))

Spring Cloud Build

4.0.5

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.0.5))

Spring Cloud Config

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.0.4))

Spring Cloud Contract

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.0.4))

Spring Cloud Starter Build

2022.0.4

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2022.0.4))

Spring Cloud Netflix

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.0.3))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.4</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2022.0.4'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
---
title: Spring Cloud 2024.0.0-RC1 (aka Moorgate) Has Been Released
source: https://spring.io/blog/2024/11/08/spring-cloud-2024-0-0-rc1-aka-moorgate-has-been-released
scraped: 2026-02-23T08:08:05.967Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  November 08, 2024 | 0 Comments
---

# Spring Cloud 2024.0.0-RC1 (aka Moorgate) Has Been Released

_Releases | Olga Maciaszek-Sharma |  November 08, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud 2024.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2024.0.0-RC1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2024.0-Release-Notes).

## [](#notable-changes-in-the-202400-rc1-release-train)Notable Changes in the 2024.0.0-RC1 Release Train

This release of Spring Cloud is based on Spring Boot 3.4.0-RC1.

The GitHub project for this release can be found [here](https://github.com/orgs/spring-cloud/projects/155).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Implement ModifyResponseBody in MVC Server ([#3189](https://github.com/spring-cloud/spring-cloud-gateway/issues/3189)
-   Use new Spring Boot http client autoconfiguration framework ([#3571](https://github.com/spring-cloud/spring-cloud-gateway/issues/3571)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Add `RestClient` support and make it the default `HTTP` client used by SC Netflix Eureka ([#4257](https://github.com/spring-cloud/spring-cloud-netflix/issues/4257), [#4363](https://github.com/spring-cloud/spring-cloud-netflix/pull/4363))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Add support for load-balanced `RestTemplateBuilder` ([#1402](https://github.com/spring-cloud/spring-cloud-commons/issues/1402))

### [](#spring-cloud-config)Spring Cloud Config

-   Let The Config Server Handle Multiple Labels Instead Of The Client ([#2583](https://github.com/spring-cloud/spring-cloud-config/issues/2583)

### [](#spring-cloud-bus)Spring Cloud Bus

-   Add a shutdown event, endpoint, and listener ([#277](https://github.com/spring-cloud/spring-cloud-bus/pull/277))

The following modules were updated as part of 2024.0.0-RC1:

Module

Version

Issues

Spring Cloud Bus

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.2.0-RC1))

Spring Cloud Contract

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.2.0-M2))

Spring Cloud CircuitBreaker

3.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.2.0-M2))

Spring Cloud Zookeeper

4.2.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.2.0-M2))

Spring Cloud Task

3.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.2.0-RC1))

Spring Cloud Kubernetes

3.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.2.0-RC1))

Spring Cloud Starter Build

2024.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2024.0.0-RC1))

Spring Cloud Netflix

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.2.0-RC1))

Spring Cloud OpenFeign

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.2.0-RC1))

Spring Cloud Commons

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.2.0-RC1))

Spring Cloud Consul

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.2.0-RC1))

Spring Cloud Config

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.2.0-RC1))

Spring Cloud Vault

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.2.0-RC1))

Spring Cloud Build

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.2.0-RC1))

Spring Cloud Gateway

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.2.0-RC1))

Spring Cloud Stream

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.0-RC1))

Spring Cloud Function

4.2.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.2.0-RC1))

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
            <version>2024.0.0-RC1</version>
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
  id 'org.springframework.boot' version '3.4.0-RC1'
  id 'io.spring.dependency-management' version '1.1.6'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2024.0.0-RC1")
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
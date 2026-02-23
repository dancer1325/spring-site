---
title: Spring Cloud 2023.0.0-M2 (aka Leyton) has been released
source: https://spring.io/blog/2023/09/29/spring-cloud-2023-0-0-m2-aka-leyton-has-been-released
scraped: 2026-02-23T09:19:56.222Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  September 29, 2023 | 0 Comments
---

# Spring Cloud 2023.0.0-M2 (aka Leyton) has been released

_Releases | Olga Maciaszek-Sharma |  September 29, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud 2023.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2023.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes).

## [](#notable-changes-in-the-202300-m2-release-train)Notable Changes in the 2023.0.0-M2 Release Train

In this milestone, we have migrated the documentation of all the Spring Cloud projects to Antora.

See all issues and pull requests [here](https://github.com/orgs/spring-cloud/projects/117/views/1).

### [](#spring-cloud-commons)Spring Cloud Commons

-   Refresh Scope on restart - a feature tailored to allow adapting to environment changes on JVM Checkpoint-Restart ([PR 1266](https://github.com/spring-cloud/spring-cloud-commons/pull/1266))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Specify `clientRegistrationId` in `TokenRelay` filter. ([PR 2922](https://github.com/spring-cloud/spring-cloud-gateway/pull/2922)) The gateway can be used to manage many ClientRegistrations, and each route can determine which client registration to use. This is incredibly useful in scenarios where there are (for example):
    -   multiple authorization servers in use simultaneously.
    -   multiple client authentication methods in use simultaneously.
    -   some/all downstream services require a distinct clientId, aud claim, etc.
    -   some/all downstream services require different token formats (e.g. JWT, opaque)

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Upgraded to Feign 12.5 ([PR\_907](https://github.com/spring-cloud/spring-cloud-openfeign/pull/907))

### [](#spring-cloud-task)Spring Cloud Task

-   Users now have the ability to query for task executions using the external execution id. ([PR\_863](https://github.com/spring-cloud/spring-cloud-task/issues/863))

### [](#spring-cloud-function)Spring Cloud Function

-   Users now have the ability to deploy REST applications as [AWS Lambdas or Azure Functions](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-starter-function-web)
    
-   CRUD mappings for functions deployed as REST endpoints via [spring-cloud-function-web](https://github.com/spring-cloud/spring-cloud-function/issues/1025)
    

### [](#spring-cloud-stream)Spring Cloud Stream

-   Several important [bug fixes and enhancements](https://github.com/spring-cloud/spring-cloud-stream/milestone/89?closed=1) primarily related to Apache Kafka binders and new Apache Pulsar binder.

The following modules were updated as part of 2023.0.0-M2:

Module

Version

Issues

Spring Cloud Consul

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.1.0-M2))

Spring Cloud Gateway

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.0-M2))

Spring Cloud Zookeeper

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.1.0-M2))

Spring Cloud Bus

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.1.0-M2))

Spring Cloud Stream

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.0-M2))

Spring Cloud Function

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.0-M2))

Spring Cloud OpenFeign

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.0-M2))

Spring Cloud Vault

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.1.0-M2))

Spring Cloud Commons

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.1.0-M2))

Spring Cloud Task

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.1.0-M2))

Spring Cloud Kubernetes

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.0-M2))

Spring Cloud Starter Build

2023.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.0-M2))

Spring Cloud Config

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.0-M2))

Spring Cloud Build

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.0-M2))

Spring Cloud Netflix

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.0-M2))

Spring Cloud CircuitBreaker

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.0-M2))

Spring Cloud Contract

4.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.0-M2))

Spring Cloud Task

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v3.1.0-M2))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

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
            <version>2023.0.0-M2</version>
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
  id 'org.springframework.boot' version '3.2.0-M3'
  id 'io.spring.dependency-management' version '1.1.3'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
  sourceCompatibility = '17'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2023.0.0-M2")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
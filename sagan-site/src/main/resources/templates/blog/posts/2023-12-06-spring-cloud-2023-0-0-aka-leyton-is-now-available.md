---
title: Spring Cloud 2023.0.0 (aka Leyton) Is Now Available
source: https://spring.io/blog/2023/12/06/spring-cloud-2023-0-0-aka-leyton-is-now-available
scraped: 2026-02-23T09:04:18.933Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 06, 2023 | 0 Comments
---

# Spring Cloud 2023.0.0 (aka Leyton) Is Now Available

_Releases | Spencer Gibb |  December 06, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2023.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2023.0.0/). You can check out the 2023.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes).

---

## [](#notable-changes-in-the-20230-release-train)Notable Changes in the 2023.0 Release Train

This release is based upon Spring Boot 3.2.0.

See all issues in 2023.0.0 [here](https://github.com/orgs/spring-cloud/projects/133/).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Spring Cloud Gateway Server MVC, a Servlet/Spring MVC compatible gateway is included in 2023.0 ([issue](https://github.com/spring-cloud/spring-cloud-gateway/issues/36), [initial PR](https://github.com/spring-cloud/spring-cloud-gateway/pull/2949))
-   Gateway Actuator discovery enhancements ([PR 3147](https://github.com/spring-cloud/spring-cloud-gateway/pull/3147))

### [](#spring-cloud-function)Spring Cloud Function

-   Users now have the ability to deploy REST applications as [AWS Lambdas or Azure Functions](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-starter-function-web)
    
-   CRUD mappings for functions deployed as REST endpoints via [spring-cloud-function-web](https://github.com/spring-cloud/spring-cloud-function/issues/1025)
    

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Java HttpClient Support ([#689](https://github.com/spring-cloud/spring-cloud-openfeign/issues/689))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Refresh Scope on restart - a feature tailored to allow adapting to environment changes on JVM Checkpoint-Restart ([PR 1266](https://github.com/spring-cloud/spring-cloud-commons/pull/1266))
-   Load balancer support for new `RestClient` ([1293](https://github.com/spring-cloud/spring-cloud-commons/issues/1293)
-   Deterministic subsetting load balancing algorithm to limit the number of instances ([1288](https://github.com/spring-cloud/spring-cloud-commons/issues/1288))

### [](#spring-cloud-config)Spring Cloud Config

-   Native image support for Config Server ([PR 2361](https://github.com/spring-cloud/spring-cloud-config/pull/2361))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Upgrade fabric8 to 6.7.2 ([#1373](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1373))
-   Upgrade Kubernetes Java Client to 19.0.0 ([1502](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1502))

### [](#spring-cloud-build)Spring Cloud Build

-   All Spring Cloud docs are built unsing Antora, which includes new searching functionality.

---

The following modules were updated as part of 2023.0.0:

Module

Version

Issues

Spring Cloud Function

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.0))

Spring Cloud Vault

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.1.0))

Spring Cloud Zookeeper

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.1.0))

Spring Cloud Circuitbreaker

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.0))

Spring Cloud Task

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.1.0))

Spring Cloud Kubernetes

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.0))

Spring Cloud Starter Build

2023.0.0

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.0))

Spring Cloud Openfeign

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.0))

Spring Cloud Bus

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.1.0))

Spring Cloud Stream

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.0))

Spring Cloud Commons

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.1.0))

Spring Cloud Contract

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.0))

Spring Cloud Netflix

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.0))

Spring Cloud Consul

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.1.0))

Spring Cloud Config

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.0))

Spring Cloud Build

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.0))

Spring Cloud Gateway

4.1.0

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.0))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.0</version>
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
  id 'org.springframework.boot' version '3.2.0'
  id 'io.spring.dependency-management' version '1.1.4'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2023.0.0")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  // ...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

```
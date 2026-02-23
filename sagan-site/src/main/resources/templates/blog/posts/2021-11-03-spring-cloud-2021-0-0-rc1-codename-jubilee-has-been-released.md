---
title: Spring Cloud 2021.0.0-RC1 (codename Jubilee) Has Been Released
source: https://spring.io/blog/2021/11/03/spring-cloud-2021-0-0-rc1-codename-jubilee-has-been-released
scraped: 2026-02-23T13:05:16.621Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  November 03, 2021 | 2 Comments
---

# Spring Cloud 2021.0.0-RC1 (codename Jubilee) Has Been Released

_Releases | Marcin Grzejszczak |  November 03, 2021 | 2 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud 2021.0](https://cloud.spring.io) Release Train, codename Jubilee, is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2021.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-20210-release-train)Notable Changes in the 2021.0 Release Train

RC1 is compatible with Spring Boot 2.6.0-RC1

See [the project page](https://github.com/orgs/spring-cloud/projects/67) for all the issues and pull requests included in this release.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Adds support for per LoadBalancer client properties. [(issue)](https://github.com/spring-cloud/spring-cloud-commons/pull/1034)
-   Adds `X-Forwarded-*` headers when using load-balanced `RestTemplate`. [(issue)](https://github.com/spring-cloud/spring-cloud-commons/issues/116)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Adds support for disabling Discovery when `spring.cloud.kubernetes.enabled=false`. [(issue)](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/878)
-   Better failure handling when a ConfigMap can not be read. [(issue)](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/769)
-   Adds support for fail-fast and retry for reading config. [(issue)](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/873)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Adds support for per LoadBalancer client properties. [(issue)](https://github.com/spring-cloud/spring-cloud-openfeign/pull/622)
-   Adds support for `@Cachable` of Feign clients. [(issue)](https://github.com/spring-cloud/spring-cloud-openfeign/issues/607)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Adds support for per instrumenting Mongo's reactive driver. [(issue)](https://github.com/spring-cloud/spring-cloud-sleuth/pull/2044)
-   Adds support for Spring Cloud Stream reactive. [(issue)](https://github.com/spring-cloud/spring-cloud-sleuth/pull/2038)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Adds support for per LoadBalancer client properties. [(issue)](https://github.com/spring-cloud/spring-cloud-contract/pull/1725)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Adds support for per LoadBalancer client properties. [(issue)](https://github.com/spring-cloud/spring-cloud-gateway/pull/2426)
-   Adds support for Route Predicate Visitor Pattern. [(issue)](https://github.com/spring-cloud/spring-cloud-gateway/pull/2423)

The following modules were updated as part of 2021.0.0-RC1:

Module

Version

Issues

Spring Cloud Vault

3.1.0-RC1

Spring Cloud Bus

3.1.0-RC1

Spring Cloud Cli

3.1.0-RC1

Spring Cloud Zookeeper

3.1.0-RC1

Spring Cloud Circuitbreaker

2.1.0-RC1

Spring Cloud Commons

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/95?closed=1))

Spring Cloud Kubernetes

2.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/37?closed=1))

Spring Cloud Openfeign

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/43?closed=1))

Spring Cloud Task

2.4.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/52?closed=1))

Spring Cloud Sleuth

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/96?closed=1))

Spring Cloud Contract

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/82?closed=1))

Spring Cloud Consul

3.1.0-RC1

Spring Cloud Gateway

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/59?closed=1))

Spring Cloud Config

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/95?closed=1))

Spring Cloud Cloudfoundry

3.1.0-RC1

Spring Cloud Starter Build

2021.0.0-RC1

Spring Cloud Netflix

3.1.0-RC1

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
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
            <version>2021.0.0-RC1</version>
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
  id 'org.springframework.boot' version '2.6.0-RC1'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2021.0.0-RC1")
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
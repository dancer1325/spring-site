---
title: Spring Cloud 2021.0.3 is available. Compatible with Spring Boot 2.7.0
source: https://spring.io/blog/2022/05/27/spring-cloud-2021-0-3-is-available-compatible-with-spring-boot-2-7-0
scraped: 2026-02-23T12:40:03.092Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 27, 2022 | 0 Comments
---

# Spring Cloud 2021.0.3 is available. Compatible with Spring Boot 2.7.0

_Releases | Spencer Gibb |  May 27, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce the [Spring Cloud 2021.0.3](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.3/). You can check out the 2021.0.3 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-202103-release-train)Notable Changes in the 2021.0.3 Release Train

This release is primarily for compatibility with Spring Boot 2.7.0 along with Spring Boot 2.6.x.

To see all the issues and pull requests in this release, please see [here](https://github.com/orgs/spring-cloud/projects/77).

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Bug fixes and minor enhancements

### [](#spring-cloud-contract)Spring Cloud Contract

-   Bug fixes and JsonAssert upgrade

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Bug fixes and path variable support for `PrefixPath` filter.

The following modules were updated as part of 2021.0.3:

Module

Version

Issues

Spring Cloud Stream

3.2.4

Spring Cloud Config

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/102?closed=1))

Spring Cloud Build

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-build/milestone/40?closed=1))

Spring Cloud Sleuth

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/101?closed=1))

Spring Cloud Contract

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/89?closed=1))

Spring Cloud Starter Build

2021.0.3

Spring Cloud Gateway

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/66?closed=1))

Spring Cloud Consul

3.1.1

Spring Cloud Netflix

3.1.3

Spring Cloud Cloudfoundry

3.1.2

Spring Cloud Vault

3.1.1

Spring Cloud Kubernetes

2.1.3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/45?closed=1))

Spring Cloud Bus

3.1.2

Spring Cloud Zookeeper

3.1.2

Spring Cloud Task

2.4.3

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/60))

Spring Cloud Cli

3.1.1

Spring Cloud Commons

3.1.3

Spring Cloud Openfeign

3.1.3

Spring Cloud Function

3.2.5

Spring Cloud Circuitbreaker

2.1.3

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.3</version>
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
  id 'org.springframework.boot' version '2.6.8'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '8'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.3")
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
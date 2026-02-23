---
title: Spring Cloud 2021.0.0-M2 (codename Jubilee) is Available.
source: https://spring.io/blog/2021/10/04/spring-cloud-2021-0-0-m2-codename-jubilee-is-available
scraped: 2026-02-23T13:08:44.253Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 04, 2021 | 1 Comment
---

# Spring Cloud 2021.0.0-M2 (codename Jubilee) is Available.

_Releases | Spencer Gibb |  October 04, 2021 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud 2021.0](https://cloud.spring.io) Release Train (codename Jubilee) is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2021.0.0-M2 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-202100-m2-release-train)Notable Changes in the 2021.0.0-M2 Release Train

Milestone 2 is compatible with Spring Boot 2.6.0-M3.

See the [project page](https://github.com/orgs/spring-cloud/projects/65) for all the issues and pull requests included in this release.

### [](#spring-cloud-commons)Spring Cloud Commons

Adjusts `NamedContextFactory` API for Sleuth.

### [](#spring-cloud-config)Spring Cloud Config

Allow types in JDBC Environment repository besides String [issue 1952](https://github.com/spring-cloud/spring-cloud-config/issues/1952)

### [](#spring-cloud-contract)Spring Cloud Contract

UUID v4 and case insnsitivity [issue 1688](https://github.com/spring-cloud/spring-cloud-contract/pull/1688). Allow custom `build.gradle` when using standalone docker image [issue 1672](https://github.com/spring-cloud/spring-cloud-contract/issues/1672).

### [](#spring-cloud-gateway)Spring Cloud Gateway

Support for the HTTP 2 protocol, [issue 7](https://github.com/spring-cloud/spring-cloud-gateway/issues/7).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Consitency between different java clients.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Adds support for `@CookieValue` annotation [issue 604](https://github.com/spring-cloud/spring-cloud-openfeign/pull/604).

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Adds Spring Kafka instrumentation [issue 2013](https://github.com/spring-cloud/spring-cloud-sleuth/pull/2013).

### [](#included-modules)Included Modules

The following modules were updated as part of 2021.0.0-M2:

Module

Version

Issues

Spring Cloud Zookeeper

3.1.0-M2

Spring Cloud Commons

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/93?closed=1))

Spring Cloud Kubernetes

2.1.0-M2

Spring Cloud Task

2.4.0-M2

Spring Cloud Bus

3.1.0-M2

Spring Cloud Sleuth

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/93?closed=1))

Spring Cloud Cli

3.1.0-M2

Spring Cloud Starter Build

2021.0.0-M2

Spring Cloud Vault

3.1.0-M2

Spring Cloud Contract

3.1.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/79?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

## [](#getting-started)Getting Started

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
            <version>2021.0.0-M2</version>
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

To get started with Gradle:

```groovy
Copyplugins {
  id 'org.springframework.boot' version '2.6.0.M3'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2021.0.0-M2")
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
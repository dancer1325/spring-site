---
title: Spring Cloud 2020.0.0-M3 (aka Ilford) is Available
source: https://spring.io/blog/2020/07/28/spring-cloud-2020-0-0-m3-aka-ilford-is-available
scraped: 2026-02-23T13:53:39.652Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  July 28, 2020 | 0 Comments
---

# Spring Cloud 2020.0.0-M3 (aka Ilford) is Available

_Releases | Spencer Gibb |  July 28, 2020 | 0 Comments_

# [](#release)RELEASE

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud 2020.0](https://cloud.spring.io) Release Train (code name `Ilford`) is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2020.0 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-20200-release-train)Notable Changes in the 2020.0 Release Train

This release requires Spring Boot 2.4.0-M1.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/42).

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Improvement with Reactor integration [issue](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1682)
-   Integration with Spring Cloud Function
-   Integration with MongoDB [issue](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1625)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   It is now possible to refresh application configuration when values change in ConfigMaps or Secrets without relying on the Kubernetes API. See [#567](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/567).
-   Improvement to maintain the data types and definition order of properties bound to java.util.Map. See [#554](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/554).

### [](#spring-cloud-consul)Spring Cloud Consul

Adds support for non-String payload types in Consul Bus.

### [](#spring-cloud-config)Spring Cloud Config

The JDBC Environment Repository may now be disabled with a property.

### [](#spring-cloud-function)Spring Cloud Function

Aside from few enhancements and bug fixes this release includes initial support for RSocket integration. A separate blog post will follow shortly.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Add the ability to trip a circuit breaker based on returned status code. See [#1836](https://github.com/spring-cloud/spring-cloud-gateway/pull/1836).

### [](#spring-cloud-contract)Spring Cloud Contract

-   Upgrading WireMock to 2.27.0 [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/1440)
-   Aligning Rest Assured version with Boot [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/1431)
-   Numerous library upgrades [issues](https://github.com/spring-cloud/spring-cloud-contract/issues?q=label%3Adependencies+milestone%3A3.0.0-M3)

### [](#spring-cloud-commons)Spring Cloud Commons

The Spring Cloud Loadbalancer lifecycle has been [completed](https://github.com/spring-cloud/spring-cloud-commons/pull/733). This allows users to easily react to Load Balancer lifecycle events in a type-safe manner.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Adds support for OpenFeign Collection Format [issue](https://github.com/spring-cloud/spring-cloud-openfeign/pull/371.)

### [](#spring-cloud-stream)Spring Cloud Stream

Tighter integration with Spring Cloud Function, few new features in TestBinder allowing you to send to and receive from a named destination(s), significant performance improvements for dynamic destinations, as well as numerous enhancements and bug fixes across the framework.

### [](#spring-cloud-task)Spring Cloud Task

Spring Cloud Task has added `JdbcCursorItemReader` and `JdbcItemWriter` to the Starter for Single-step Batch Jobs feature. This feature allows a user to configure a single-step Spring Batch job through properties alone. An example on how to use this feature can be found in [here](https://spring.io/blog/2020/05/11/spring-cloud-task-2-3-0-m1-is-now-available).

---

The following modules were updated as part of 2020.0.0-M3:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Bus | 3.0.0-M3 |  
| Spring Cloud Circuitbreaker | 2.0.0-M3 |  
| Spring Cloud Cloudfoundry | 3.0.0-M3 |  
| Spring Cloud Commons | 3.0.0-M3 |  
| Spring Cloud Config | 3.0.0-M3 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/77?closed=1)) | Spring Cloud Consul | 3.0.0-M3 |  
| Spring Cloud Contract | 3.0.0-M3 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/67?closed=1)) | Spring Cloud Function | 3.1.0-M2 |   | Spring Cloud Gateway | 3.0.0-M3 |  
| Spring Cloud Kubernetes | 2.0.0-M3 |  
| Spring Cloud Netflix | 3.0.0-M3 |  
| Spring Cloud Openfeign | 3.0.0-M3 |  
| Spring Cloud Security | 3.0.0-M3 |  
| Spring Cloud Sleuth | 3.0.0-M3 |  
| Spring Cloud Stream | 3.1.0-M2 |   | Spring Cloud Task | 2.3.0-M2 |   | Spring Cloud Vault | 3.0.0-M3 |  
| Spring Cloud Zookeeper | 3.0.0-M3 |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

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
            <version>2020.0.0-M3</version>
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
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
  }
}

repositories {
  maven {
    url 'https://repo.spring.io/milestone'
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0-M3'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
---
title: Spring Cloud 2021.0.6 has been released
source: https://spring.io/blog/2023/02/24/spring-cloud-2021-0-6-has-been-released
scraped: 2026-02-23T10:08:00.627Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oleg Zhurakousky |  February 24, 2023 | 1 Comment
---

# Spring Cloud 2021.0.6 has been released

_Releases | Oleg Zhurakousky |  February 24, 2023 | 1 Comment_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2021.0.6](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.6/). You can check out the 2021.0.6 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-202106-release-train)Notable Changes in the 2021.0.6 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/102) for all the issues and pull requests included in this release.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Add utility method to configure zone-preference load-balancing with user-provided zone ([#1174](https://github.com/spring-cloud/spring-cloud-commons/pull/1174))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Allow setting timeouts for fetching instances ([#4110](https://github.com/spring-cloud/spring-cloud-netflix/issues/4110))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Fixed memory leak in CacheRequestBodyGatewayFilter([2842](https://github.com/spring-cloud/spring-cloud-gateway/pull/2842))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Use SSL When secured annotation is true ([#1141](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1141))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Allow configuring request timeout for Apache HttpClient ([#799](https://github.com/spring-cloud/spring-cloud-openfeign/issues/799))

### [](#spring-cloud-stream)Spring Cloud Stream

-   Enhancements around custom Routing Functions to ensure they do not create output binding (similar to the provided one)
-   Consolidate core bean propagation between parent/child contexts in the case of multi-binder scenarios
-   Few bug fixes

### [](#spring-cloud-function)Spring Cloud Function

-   Several improvements and bug fixes primarily around AWS Lambda support

The following modules were updated as part of 2021.0.6:

Module

Version

Spring Cloud Netflix

3.1.5

Spring Cloud Config

3.1.6

Spring Cloud Build

3.1.6

Spring Cloud Sleuth

3.1.7

Spring Cloud Gateway

3.1.6

Spring Cloud Starter Build

2021.0.6

Spring Cloud Consul

3.1.2

Spring Cloud Contract

3.1.6

Spring Cloud Vault

3.1.2

Spring Cloud Kubernetes

2.1.6

Spring Cloud Zookeeper

3.1.3

Spring Cloud Task

2.4.6

Spring Cloud Openfeign

3.1.6

Spring Cloud Circuitbreaker

2.1.6

Spring Cloud Stream

3.2.7

Spring Cloud Commons

3.1.6

Spring Cloud Function

3.2.9

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.6</version>
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
  id 'org.springframework.boot' version '2.7.9'
  id 'io.spring.dependency-management' version '1.0.15.RELEASE'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '8'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.6")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
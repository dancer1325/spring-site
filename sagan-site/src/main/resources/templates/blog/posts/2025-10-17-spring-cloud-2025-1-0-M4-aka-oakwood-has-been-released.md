---
title: Spring Cloud 2025.1.0-M4 (aka Oakwood) has been released
source: https://spring.io/blog/2025/10/17/spring-cloud-2025-1-0-M4-aka-oakwood-has-been-released
scraped: 2026-02-23T07:26:33.454Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 17, 2025 | 0 Comments
---

# Spring Cloud 2025.1.0-M4 (aka Oakwood) has been released

_Releases | Ryan Baxter |  October 17, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that Milestone 4 (M4) of the [Spring Cloud 2025.1.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.1.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1.0-Release-Notes).

## [](#notable-changes-in-the-202510-release-train)Notable Changes in the 2025.1.0 Release Train

Spring Cloud 2025.1.0-M4 depends on Spring Boot 4.0.0-M3. See all issues and pull requests that are part of the release [here](https://github.com/orgs/spring-cloud/projects/182).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Deprecated classes and methods have been removed, and numerous other improvements to public classes have been made. See the [milestone](https://github.com/spring-cloud/spring-cloud-kubernetes/issues?q=is%3Aclosed%20milestone%3A%225.0.0-M4%22) for a complete list of changes

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Initial support for JSpecify ([#3944](https://github.com/spring-cloud/spring-cloud-gateway/pull/3944))
-   Use Google libraries for JSON processing in gRPC ([#3853](https://github.com/spring-cloud/spring-cloud-gateway/pull/3853))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Remove RestTemplate support ([#4504](https://github.com/spring-cloud/spring-cloud-netflix/pull/4504))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Remove deprecations. ([#1268](https://github.com/spring-cloud/spring-cloud-openfeign/pull/1268))

The following modules were updated as part of 2025.1.0-M4:

Module

Version

Issues

Spring Cloud Stream

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v5.0.0-M4))

Spring Cloud Config

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v5.0.0-M4))

Spring Cloud Build

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v5.0.0-M4))

Spring Cloud Kubernetes

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v5.0.0-M4))

Spring Cloud Contract

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v5.0.0-M4))

Spring Cloud Task

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v5.0.0-M4))

Spring Cloud Consul

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v5.0.0-M4))

Spring Cloud Gateway

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v5.0.0-M4))

Spring Cloud Netflix

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v5.0.0-M4))

Spring Cloud Circuitbreaker

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v5.0.0-M4))

Spring Cloud Function

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v5.0.0-M4))

Spring Cloud Vault

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v5.0.0-M4))

Spring Cloud Bus

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v5.0.0-M4))

Spring Cloud Zookeeper

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v5.0.0-M4))

Spring Cloud Commons

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v5.0.0-M4))

Spring Cloud Starter Build

2025.1.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.1.0-M4))

Spring Cloud Openfeign

5.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v5.0.0-M4))

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
            <version>2025.1.0-M4</version>
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
  id 'org.springframework.boot' version '4.0.0-M3'
  id 'io.spring.dependency-management' version '1.1.7'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2025.1.0-M4")
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
//...
```
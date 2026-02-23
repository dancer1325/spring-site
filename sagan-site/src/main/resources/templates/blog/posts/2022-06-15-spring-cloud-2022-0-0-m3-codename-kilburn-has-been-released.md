---
title: Spring Cloud 2022.0.0-M3 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/06/15/spring-cloud-2022-0-0-m3-codename-kilburn-has-been-released
scraped: 2026-02-23T12:37:37.245Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  June 16, 2022 | 0 Comments
---

# Spring Cloud 2022.0.0-M3 (codename Kilburn) Has Been Released

_Releases | Ryan Baxter |  June 16, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud 2022.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0.0-Release-Notes).

## [](#notable-changes-in-the-202200-release-train)Notable Changes in the 2022.0.0 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/76) for all the issues and pull requests included in this release.

Spring Cloud 2022.0.0-M3 is compatible with Spring Boot 3.0.0-M3.

### [](#spring-cloud-stream)Spring Cloud Stream

-   Enhanced support for Kafka "tombstone" records via recently added support for BiFunction/BiConsumer
-   Added support for function-based error-handling, thus no longer requiring annotations

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Load Config Maps and Secrets using `spring.config.import` removing the need to use Bootstrap context ([1002](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1002))
-   Secrets and Config Maps support prefixes ([765](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/765))

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Add support for disabling threadpools when running Resilient4J circuitbreakers ([147](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/147))

### [](#spring-cloud-contract)Spring Cloud Contract

-   Bumps Rest Assured to 5.1.0
-   Removed reference to Spring Cloud Function Compiler

### [](#spring-cloud-function)Spring Cloud Function

-   Support for BiFunction and BiConsumer as *parsed Message functions*
-   Support for filtering out ineligible functions
-   Observability module

### [](#spring-cloud-task)Spring Cloud Task

-   Added support for observations of ApplicationRunner and CommandLineRunner

### [](#spring-cloud-commons)Spring Cloud Commons

-   Adds registration lifecycle listeners (999[https://github.com/spring-cloud/spring-cloud-commons/issues/999](https://github.com/spring-cloud/spring-cloud-commons/issues/999))
-   Request data context for blocking LoadBalancer client requests has been made available to lifecycle callbacks ([1090](https://github.com/spring-cloud/spring-cloud-commons/issues/1090))

The following modules were updated as part of 2022.0.0-M3:

Module

Version

Issues

Spring Cloud Stream

4.0.0-M3

Spring Cloud Config

4.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/101?closed=1))

Spring Cloud Build

4.0.0-M3

Spring Cloud Starter Build

2022.0.0-M3

Spring Cloud Kubernetes

3.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/44?closed=1))

Spring Cloud Circuitbreaker

3.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/15?closed=1))

Spring Cloud Contract

4.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/88?closed=1))

Spring Cloud Consul

4.0.0-M3

Spring Cloud Gateway

4.0.0-M3

Spring Cloud Function

4.0.0-M3

Spring Cloud Vault

4.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/50?closed=1))

Spring Cloud Bus

4.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/48?closed=1))

Spring Cloud Zookeeper

4.0.0-M3

Spring Cloud Task

3.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/58?closed=1))

Spring Cloud Openfeign

4.0.0-M3

Spring Cloud Commons

4.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/101?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
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
            <version>2022.0.0-M3</version>
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

repositories {
maven {
url 'https://repo.spring.io/milestone'
}
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2022.0.0-M3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
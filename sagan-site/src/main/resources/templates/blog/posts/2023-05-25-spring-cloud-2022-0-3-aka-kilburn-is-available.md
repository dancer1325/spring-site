---
title: Spring Cloud 2022.0.3 (aka Kilburn) Is Available
source: https://spring.io/blog/2023/05/25/spring-cloud-2022-0-3-aka-kilburn-is-available
scraped: 2026-02-23T09:48:31.808Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 25, 2023 | 5 Comments
---

# Spring Cloud 2022.0.3 (aka Kilburn) Is Available

_Releases | Spencer Gibb |  May 25, 2023 | 5 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0.3](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2022.0.3/). You can check out the 2022.0.3 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-202203-release-train)Notable Changes in the 2022.0.3 Release Train

This release provides compatibility with Spring Boot 3.1.x.

See all issues and pull requests for this release [here](https://github.com/orgs/spring-cloud/projects/107).

There is a known defect in Spring Cloud Config related to locating the config server via service discovery. In order to activate this feature in this release you will need to set `spring.cloud.config.discovery.enabled=true` and `spring.cloud.config.discovery.serviceId` in an environment variable or as a system property. This bug will be addressed in the next release.

### [](#spring-cloud-function)Spring Cloud Function

-   Support for Spring Integration, see [(1032)](https://github.com/spring-cloud/spring-cloud-function/pull/1032)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Adds a fix for certain situations where bootstrap property sources are added to late in the application context lifecycle [(1228)](https://github.com/spring-cloud/spring-cloud-commons/pull/1228).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Adds the ability to batch add routes via actuator [(2915)](https://github.com/spring-cloud/spring-cloud-gateway/pull/2915).
-   Adds the ability to refresh a subset of routes via actuator [(2916)](https://github.com/spring-cloud/spring-cloud-gateway/pull/2916).

### [](#spring-cloud-stream)Spring Cloud Stream

-   Adds support for regular expression-based destination patterns in Kafka reactive binder [(2709)](https://github.com/spring-cloud/spring-cloud-stream/issues/2709).

### [](#spring-cloud-function-1)Spring Cloud Function

-   Adds initial support for deploying existing Spring MVC REST applications to serverless platforms such as AWS Lambda Functions and Azure Functions.
-   New Spring Integration module which allows you to use Spring Cloud Function in Spring Integration DSL.

### [](#spring-cloud-config)Spring Cloud Config

-   Support for profile specific config data [(2260)](https://github.com/spring-cloud/spring-cloud-config/pull/2260).

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Fixes an issue of referencing Jersey 1 classes instead of Jersey 3 [(4176)](https://github.com/spring-cloud/spring-cloud-netflix/issues/4176) and [(4177)](https://github.com/spring-cloud/spring-cloud-netflix/issues/4177).

---

The following modules were updated as part of 2022.0.3:

Module

Version

Issues

Spring Cloud Kubernetes

3.0.3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/58?closed=1))

Spring Cloud Task

3.0.3

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.0.3))

Spring Cloud Function

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/47?closed=1)

Spring Cloud Commons

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/113?closed=1))

Spring Cloud Circuitbreaker

3.0.2

 

Spring Cloud Openfeign

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/64?closed=1))

Spring Cloud Gateway

4.0.6

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/83?closed=1))

Spring Cloud Stream

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/87?closed=1))

Spring Cloud Contract

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/101?closed=1))

Spring Cloud Config

4.0.3

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/115?closed=1))

Spring Cloud Build

4.0.3

 

Spring Cloud Starter Build

2022.0.3

 

Spring Cloud Netflix

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/121?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

## [](#roadmap)Roadmap

Please watch our [Github Projects](https://github.com/orgs/spring-cloud/projects/103) and [Release Milestones](https://github.com/spring-cloud/spring-cloud-release/milestones?direction=asc&sort=due_date&state=open) to track our 2023.0 Release Train (aka Leyton).

## [](#getting-started-with-202203)Getting Started With 2022.0.3

To get started with Maven with a BOM (dependency management only):

```xml
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.3</version>
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
  id 'org.springframework.boot' version '3.1.0'
  id 'io.spring.dependency-management' version '1.1.0'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2022.0.3")
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
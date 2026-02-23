---
title: Spring Cloud 2021.0.8 (aka Jubilee) Is Available
source: https://spring.io/blog/2023/06/30/spring-cloud-2021-0-8-aka-jubilee-is-available
scraped: 2026-02-23T09:37:41.146Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  June 30, 2023 | 0 Comments
---

# Spring Cloud 2021.0.8 (aka Jubilee) Is Available

_Releases | Marcin Grzejszczak |  June 30, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2021.0.8](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.8/). You can check out the 2021.0.8 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-202108-release)Notable Changes in the 2021.0.8 release

See all issues and pull requests for this release [here](https://github.com/orgs/spring-cloud/projects/110/views/1).

### [](#spring-cloud-commons)Spring Cloud Commons

-   Spring Cloud LoadBalancer - allow chain filtering of instances based on requests ([#1227](https://github.com/spring-cloud/spring-cloud-commons/issues/1227) )

### [](#spring-cloud-config)Spring Cloud Config

-   Support for profile specific config data ([#2260](https://github.com/spring-cloud/spring-cloud-config/pull/2260)).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Support looking up the config server via `DiscoveryClient` ([#1354](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1021))

---

The following modules were updated as part of 2021.0.8:

Module

Version

Issues

Spring Cloud Kubernetes

2.1.8

([tag](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v2.1.8))

Spring Cloud Task

2.4.6

([tag](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v2.4.6))

Spring Cloud Function

3.2.11

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v3.2.11))

Spring Cloud Commons

3.1.7

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/114?closed=1))

Spring Cloud Circuitbreaker

2.1.7

([tag](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v2.1.7))

Spring Cloud Openfeign

3.1.8

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/63?closed=1))

Spring Cloud Gateway

3.1.8

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/84?closed=1))

Spring Cloud Stream

3.2.9

([tag](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v3.2.9))

Spring Cloud Contract

3.1.8

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/102?closed=1))

Spring Cloud Config

3.1.8

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/116?closed=1))

Spring Cloud Build

3.1.8

 

Spring Cloud Starter Build

2021.0.8

 

Spring Cloud Netflix

3.1.7

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/123?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

## [](#roadmap)Roadmap

Please watch our [Github Projects](https://github.com/orgs/spring-cloud/projects/110) and [Release Milestones](https://github.com/spring-cloud/spring-cloud-release/milestones?direction=asc&sort=due_date&state=open) to track our 2021.0 Release Train (aka Jubilee).

## [](#getting-started-with-202108)Getting Started With 2021.0.8

To get started with Maven with a BOM (dependency management only):

```xml
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.8</version>
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
  id 'org.springframework.boot' version '2.6.15'
  id 'io.spring.dependency-management' version '1.1.0'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.8")
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
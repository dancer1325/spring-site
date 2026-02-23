---
title: Spring Cloud 2021.0.4 (codename Jubilee) Has Been Released
source: https://spring.io/blog/2022/09/07/spring-cloud-2021-0-4-codename-jubilee-has-been-released
scraped: 2026-02-23T10:41:50.801Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  September 07, 2022 | 0 Comments
---

# Spring Cloud 2021.0.4 (codename Jubilee) Has Been Released

_Releases | Ryan Baxter |  September 07, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2021.0.4](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.4/). You can check out the 2021.0.4 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0.4-Release-Notes).

## [](#notable-changes-in-the-202104-release-train)Notable Changes in the 2021.0.4 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/78) for all the issues and pull requests included in this release.

### [](#spring-cloud-config)Spring Cloud Config

-   Replace JSCH with Apache MINA to resolve a number of SSH issues ([#1901](https://github.com/spring-cloud/spring-cloud-config/issues/1901))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added native JSON to gRPC filter ([#2657](https://github.com/spring-cloud/spring-cloud-gateway/pull/2657))
-   Support 'use-insecure-trust-manager' & 'trustedX509Certificates' for GRPC Filter ([2699](https://github.com/spring-cloud/spring-cloud-gateway/pull/2699))

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Allow overriding binary content types list (\[#734\][https://github.com/spring-cloud/spring-cloud-openfeign/issues/734](https://github.com/spring-cloud/spring-cloud-openfeign/issues/734))

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Add the ability to disable the threadpool for Resilience4J Circuit Breakers ([#147](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/147))

The following modules were updated as part of 2021.0.4:

Module

Version

Issues

Spring Cloud Netflix

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/112?closed=1))

Spring Cloud Config

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/104?closed=1))

Spring Cloud Build

3.1.4

Spring Cloud Sleuth

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/102?closed=1))

Spring Cloud Gateway

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/67?closed=1))

Spring Cloud Starter Build

2021.0.4

Spring Cloud Consul

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/61?closed=1))

Spring Cloud Contract

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/90?closed=1))

Spring Cloud Kubernetes

2.1.4

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/46?closed=1))

Spring Cloud Zookeeper

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/39?closed=1))

Spring Cloud Task

2.4.4

Spring Cloud Openfeign

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/52?closed=1))

Spring Cloud Circuitbreaker

2.1.4

Spring Cloud Stream

3.2.5

Spring Cloud Commons

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/103?closed=1))

Spring Cloud Function

3.2.7

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.4</version>
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

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2021.0.4'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
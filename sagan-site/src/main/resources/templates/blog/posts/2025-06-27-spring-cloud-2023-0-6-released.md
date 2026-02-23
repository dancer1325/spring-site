---
title: Spring Cloud 2023.0.6 (aka Leyton) Has Been Released
source: https://spring.io/blog/2025/06/27/spring-cloud-2023-0-6-released
scraped: 2026-02-23T07:37:26.422Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  June 27, 2025 | 0 Comments
---

# Spring Cloud 2023.0.6 (aka Leyton) Has Been Released

_Releases | Ryan Baxter |  June 27, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2023.0.6](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2023.0.6/). You can check out the 2023.0.6 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes).

## [](#notable-changes-in-the-202306-release-train)Notable Changes in the 2023.0.6 Release Train

This release is based on Spring Boot 3.3.13.

In addition to the enhancements below, there are a number of bugs that have been addressed in this release. To see the complete list of issues addressed in this release, see this [GitHub project](https://github.com/orgs/spring-cloud/projects/166).

This is the final open source release of Spring Cloud 2023.0.x. Spring Cloud 2023.0.x will enter commercial support only on July 1st 2025.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support for reloading httpClient connectTimeout Configuration ([#3679](https://github.com/spring-cloud/spring-cloud-gateway/pull/3679))

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Add the ability to customize `openTimeout` & `resetTimeout` when using Spring Retry ([#238](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/238))

### [](#spring-cloud-contract)Spring Cloud Contract

-   The artifact `spring-cloud-stub-runner-boot` will no longer be available on Maven Central beginning with Spring Cloud Contact 4.1.6. There are restrictions in place from Maven Central that no longer allow the publication of executable jar files since these files are typically not used as dependencies. If you require the use of `spring-cloud-stub-runner-boot` you can use the [Spring Cloud Contract Docker image](https://docs.spring.io/spring-cloud-contract/reference/4.1/docker-project.html) or build the artifact from source.

The following modules were updated as part of 2023.0.6:

Module

Version

Issues

Spring Cloud Gateway

4.1.9

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.9))

Spring Cloud Starter Build

2023.0.6

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.6))

Spring Cloud Netflix

4.1.6

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.6))

Spring Cloud Config

4.1.7

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.7))

Spring Cloud Openfeign

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.5))

Spring Cloud Circuitbreaker

3.1.5

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.5))

Spring Cloud Kubernetes

3.1.6

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.6))

Spring Cloud Stream

4.1.6

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.6))

Spring Cloud Function

4.1.6

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.6))

Spring Cloud Contract

4.1.6

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.6))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.6</version>
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
Copyplugins {
  id 'java'
  id 'org.springframework.boot' version '3.3.13'
  id 'io.spring.dependency-management' version '1.1.7'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2023.0.6")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

```
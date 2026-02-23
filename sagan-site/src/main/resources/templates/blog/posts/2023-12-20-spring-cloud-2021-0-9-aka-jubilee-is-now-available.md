---
title: Spring Cloud 2021.0.9 (aka Jubilee) Is Now Available
source: https://spring.io/blog/2023/12/20/spring-cloud-2021-0-9-aka-jubilee-is-now-available
scraped: 2026-02-23T09:02:33.361Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 20, 2023 | 0 Comments
---

# Spring Cloud 2021.0.9 (aka Jubilee) Is Now Available

_Releases | Ryan Baxter |  December 20, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2021.0.9](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.9/). You can check out the 2021.0.9 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0.9-Release-Notes).

## [](#notable-changes-in-the-202109-release-train)Notable Changes in the 2021.0.9 Release Train

This release of Spring Cloud is based on Spring Boot 2.6.15 and is compatible with Spring Boot 2.7.18 and 3.0.13.

This will be last open source release of Spring Cloud 2021.0.x. All projects within this release train have reached end of life. We suggest you upgrade to Spring Cloud 2022.0.x or 2023.0.x.

The following modules were updated as part of 2021.0.9:

Module

Version

Issues

Spring Cloud Netflix

3.1.8

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v3.1.8))

Spring Cloud Stream

3.2.10

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v3.2.10))

Spring Cloud Starter Build

2021.0.9

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2021.0.9))

Spring Cloud Consul

3.1.5

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v3.1.5))

Spring Cloud Cloudfoundry

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/releases/tag/v3.1.4))

Spring Cloud Contract

3.1.9

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v3.1.9))

Spring Cloud Zookeeper

3.1.5

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v3.1.5))

Spring Cloud Sleuth

3.1.10

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/releases/tag/v3.1.10))

Spring Cloud Bus

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v3.1.3))

Spring Cloud Function

3.2.12

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v3.2.12))

Spring Cloud Openfeign

3.1.9

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v3.1.9))

Spring Cloud Config

3.1.9

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v3.1.9))

Spring Cloud Circuitbreaker

2.1.8

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v2.1.8))

Spring Cloud Build

3.1.9

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v3.1.9))

Spring Cloud Kubernetes

2.1.9

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v2.1.9))

Spring Cloud Commons

3.1.8

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v3.1.8))

Spring Cloud Vault

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v3.1.4))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.9</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2021.0.9'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
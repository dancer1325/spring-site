---
title: Spring Cloud 2024.0.3 (aka Moorgate) Has Been Released
source: https://spring.io/blog/2025/12/12/spring-cloud-2024-0-3-aka-northfields-has-been-released
scraped: 2026-02-22T22:06:42.602Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 12, 2025 | 0 Comments
---

# Spring Cloud 2024.0.3 (aka Moorgate) Has Been Released

_Releases | Ryan Baxter |  December 12, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2024.0.3](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2024.0.3/). You can check out the 2024.0.3 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2024.0.3-Release-Notes).

## [](#notable-changes-in-the-202403-release-train)Notable Changes in the 2024.0.3 Release Train

This release uses Spring Boot 3.4.12.

A complete list of issues resolved in this release can be found in the GitHub project [2024.0.3](https://github.com/orgs/spring-cloud/projects/179).

**This is the final open source release of the Spring Cloud 2024.0.x release train. Open source support [ends at the end of December 2025](https://spring.io/projects/spring-cloud#support).**

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Set max requests based on http client properties ([#1286](https://github.com/spring-cloud/spring-cloud-openfeign/pull/1286))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Loadbalancer with SERVICE mode cannot discover newly created services ([#1970](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1970))
-   Cannot disable leaderElection for /info endpoint ([#2085](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/2085))

### [](#spring-cloud-function)Spring Cloud Function

-   Preserve AWS X-Ray Context In Spring Cloud Function Custom Runtime ([#1306](https://github.com/spring-cloud/spring-cloud-function/issues/1306))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   GatewayTagsProvider not working as documented ([#4007](https://github.com/spring-cloud/spring-cloud-gateway/issues/4007))
-   FormFilter Issue: Incorrect Handling of URL-Encoded Parameters in Query String ([#3929](https://github.com/spring-cloud/spring-cloud-gateway/issues/3929))

### [](#spring-cloud-config)Spring Cloud Config

-   RefNotFoundException thrown when using `spring.cloud.config.send-all-labels=true` with invalid commit ID ([#3126](https://github.com/spring-cloud/spring-cloud-config/issues/3126))

The following modules were updated as part of 2024.0.3:

Module

Version

Issues

Spring Cloud Bus

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.2.2))

Spring Cloud Zookeeper

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.2.3))

Spring Cloud Openfeign

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.2.3))

Spring Cloud Task

3.2.3

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.2.3))

Spring Cloud Kubernetes

3.2.3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.2.3))

Spring Cloud Function

4.2.4

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.2.4))

Spring Cloud Vault

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.2.3))

Spring Cloud Commons

4.2.4

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.2.4))

Spring Cloud Circuitbreaker

3.2.3

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.2.3))

Spring Cloud Netflix

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.2.3))

Spring Cloud Stream

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.3))

Spring Cloud Gateway

4.2.7

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.2.7))

Spring Cloud Config

4.2.4

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.2.4))

Spring Cloud Build

4.2.4

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.2.4))

Spring Cloud Consul

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.2.3))

Spring Cloud Contract

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.2.3))

Spring Cloud Starter Build

2024.0.3

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2024.0.3))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2024.0.3</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2024.0.3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
---
title: Spring Cloud 2023.0.1 (aka Leyton) Has Been Released
source: https://spring.io/blog/2024/03/28/spring-cloud-2023-0-1-aka-leyton-has-been-released
scraped: 2026-02-23T08:48:44.880Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  March 28, 2024 | 0 Comments
---

# Spring Cloud 2023.0.1 (aka Leyton) Has Been Released

_Releases | Ryan Baxter |  March 28, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2023.0.1](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2023.0.1/). You can check out the 2023.0.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0.1-Release-Notes).

## [](#notable-changes-in-the-202301-release-train)Notable Changes in the 2023.0.1 Release Train

Based on Spring Boot 3.2.4.

See [the GitHub project](https://github.com/orgs/spring-cloud/projects/136) for all changes made in this release.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Add support for selective namespaces in Fabric8 LoadBalancer implementation ([#1604](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1604))

### [](#spring-cloud-function)Spring Cloud Function

-   Added native support for deploying and processing WEB Workloads as AWS Lambda with sample provided [here](https://github.com/aws/serverless-java-container/tree/main/samples/springboot3/pet-store-native)
-   Fixed filter registration in WEB support for AWS Lambda
-   Fixed SNapStart processing in WEB support for AWS Lambda

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Support customization of JDK 11+ HttpClient ([#999](https://github.com/spring-cloud/spring-cloud-openfeign/issues/999))

### [](#spring-cloud-stream)Spring Cloud Stream

-   [Added](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.1) a few enhancements, addressed various bug fixes and documentation cleanup.
-   See more details at [https://github.com/spring-cloud/spring-cloud-stream/milestone/93?closed=1](https://github.com/spring-cloud/spring-cloud-stream/milestone/93?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Gateway Server MVC support for AOT ([#3171](https://github.com/spring-cloud/spring-cloud-gateway/issues/3171))
-   Allow forcing order of filters through Java DSL configuration([#3134](https://github.com/spring-cloud/spring-cloud-gateway/pull/3134))
-   Add option to disable RouteRefreshListener ([#2958](https://github.com/spring-cloud/spring-cloud-gateway/issues/2958))
-   Add properties to disable filters if needed ([#3310](https://github.com/spring-cloud/spring-cloud-gateway/issues/3310))

The following modules were updated as part of 2023.0.1:

Module

Version

Issues

Spring Cloud Vault

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.1.1))

Spring Cloud Bus

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.1.1))

Spring Cloud Zookeeper

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.1.1))

Spring Cloud Kubernetes

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.1))

Spring Cloud Task

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.1.1))

Spring Cloud Function

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.1))

Spring Cloud Commons

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.1.2))

Spring Cloud Openfeign

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.1))

Spring Cloud Circuitbreaker

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.1))

Spring Cloud Starter Build

2023.0.1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.1))

Spring Cloud Stream

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.1))

Spring Cloud Gateway

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.2))

Spring Cloud Consul

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.1.1))

Spring Cloud Contract

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.2))

Spring Cloud Config

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.1))

Spring Cloud Build

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.1))

Spring Cloud Netflix

4.1.1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2023.0.1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
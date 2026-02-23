---
title: Spring Cloud 2023.0.3 (aka Leyton) Has Been Released
source: https://spring.io/blog/2024/07/11/spring-cloud-2023-0-3-aka-leyton-has-been-released
scraped: 2026-02-23T08:28:37.291Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  July 11, 2024 | 0 Comments
---

# Spring Cloud 2023.0.3 (aka Leyton) Has Been Released

_Releases | Olga Maciaszek-Sharma |  July 11, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2023.0.3](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2023.0.3/).

## [](#notable-changes-in-the-202303-release-train)Notable Changes in the 2023.0.3 Release Train

This release is based on Spring Boot 3.2.7 and it primarily contains bugfixes and dependency upgrades.

See [the GitHub project](https://github.com/orgs/spring-cloud/projects/145) for all changes made in this release.

The following modules were updated as part of 2023.0.3:

Module

Version

Issues

Spring Cloud Vault

4.1.3

Spring Cloud Bus

4.1.2

Spring Cloud Zookeeper

4.1.2

Spring Cloud Kubernetes

3.1.3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/68?closed=1))

Spring Cloud Task

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/76?closed=1))

Spring Cloud Function

4.1.3

([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/52?closed=1))

Spring Cloud Commons

4.1.4

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/125?closed=1))

Spring Cloud OpenFeign

4.1.3

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/73?closed=1))

Spring Cloud CircuitBreaker

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/23?closed=1))

Spring Cloud Starter Build

2023.0.3

Spring Cloud Stream

4.1.3

Spring Cloud Gateway

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/97?closed=1))

Spring Cloud Consul

4.1.2

Spring Cloud Contract

4.1.4

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/116?closed=1))

Spring Cloud Config

4.1.3

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/125?closed=1))

Spring Cloud Build

4.1.3

Spring Cloud Netflix

4.1.3

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/130?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.3</version>
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
classpath "io.spring.gradle:dependency-management-plugin:1.1.5"
}
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2023.0.3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
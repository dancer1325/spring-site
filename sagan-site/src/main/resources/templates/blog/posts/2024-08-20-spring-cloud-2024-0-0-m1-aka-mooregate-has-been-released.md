---
title: Spring Cloud 2024.0.0-M1 (aka Mooregate) Has Been Released
source: https://spring.io/blog/2024/08/20/spring-cloud-2024-0-0-m1-aka-mooregate-has-been-released
scraped: 2026-02-23T08:21:18.411Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  August 20, 2024 | 0 Comments
---

# Spring Cloud 2024.0.0-M1 (aka Mooregate) Has Been Released

_Releases | Ryan Baxter |  August 20, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2024.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository.

## [](#notable-changes-in-the-202400-release-train)Notable Changes in the 2024.0.0 Release Train

The primary goal of the first milestone of Spring Cloud 2024.0.0 is to provide compatibility with Spring Boot 3.4.0-M1. There are no notable new features in this first milestone. We would appreciate users trying our this first milestone and reporting any issues they may notice.

The following modules were updated as part of 2024.0.0-M1:

Module

Version

Issues

Spring Cloud Bus

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.2.0-M1))

Spring Cloud Zookeeper

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.2.0-M1))

Spring Cloud Circuitbreaker

3.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.2.0-M1))

Spring Cloud Task

3.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.2.0-M1))

Spring Cloud Contract

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.2.0-M1))

Spring Cloud Kubernetes

3.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.2.0-M1))

Spring Cloud Netflix

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.2.0-M1))

Spring Cloud Starter Build

2024.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2024.0.0-M1))

Spring Cloud Config

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.2.0-M1))

Spring Cloud Build

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.2.0-M1))

Spring Cloud Openfeign

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.2.0-M1))

Spring Cloud Consul

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.2.0-M1))

Spring Cloud Gateway

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.2.0-M1))

Spring Cloud Commons

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.2.0-M1))

Spring Cloud Stream

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.0-M1))

Spring Cloud Function

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.2.0-M1))

Spring Cloud Vault

4.2.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.2.0-M1))

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
            <version>2024.0.0-M1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2024.0.0-M1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
---
title: Spring Cloud 2023.0.0-RC1 (aka Leyton) Is Now Available
source: https://spring.io/blog/2023/11/02/spring-cloud-2023-0-0-rc1-aka-leyton-is-now-available
scraped: 2026-02-23T09:12:35.045Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  November 02, 2023 | 0 Comments
---

# Spring Cloud 2023.0.0-RC1 (aka Leyton) Is Now Available

_Releases | Ryan Baxter |  November 02, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud 2023.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2023.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0.0-Release-Notes).

## [](#notable-changes-in-the-202300-release-train)Notable Changes in the 2023.0.0 Release Train

This release is based upon Spring Boot 3.2.0-RC1.

You can find a complete list of issues addressed in this release by viewing [the release project](https://github.com/orgs/spring-cloud/projects/130/views/1).

### [](#spring-cloud-stream)Spring Cloud Stream

All the notable changes introduced in Spring Cloud Stream `4.1.0-RC1` can be found [here](https://github.com/spring-cloud/spring-cloud-stream/milestone/90?closed=1).

The following modules were updated as part of 2023.0.0-RC1:

Module

Version

Issues

Spring Cloud Vault

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.1.0-RC1))

Spring Cloud Zookeeper

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.1.0-RC1))

Spring Cloud Starter Build

2023.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.0-RC1))

Spring Cloud Consul

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.1.0-RC1))

Spring Cloud Gateway

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.0-RC1))

Spring Cloud Bus

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.1.0-RC1))

Spring Cloud Stream

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.0-RC1))

Spring Cloud Function

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.0-RC1))

Spring Cloud Config

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.0-RC1))

Spring Cloud Build

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.0-RC1))

Spring Cloud Openfeign

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.0-RC1))

Spring Cloud Commons

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.1.0-RC1))

Spring Cloud Netflix

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.0-RC1))

Spring Cloud Kubernetes

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.0-RC1))

Spring Cloud Task

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.1.0-RC1))

Spring Cloud Circuitbreaker

3.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.0-RC1))

Spring Cloud Contract

4.1.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.0-RC1))

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
            <version>2023.0.0-RC1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2023.0.0-RC1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
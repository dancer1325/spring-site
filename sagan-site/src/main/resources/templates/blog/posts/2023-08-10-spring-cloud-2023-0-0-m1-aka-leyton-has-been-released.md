---
title: Spring Cloud 2023.0.0-M1 (aka Leyton) has been released
source: https://spring.io/blog/2023/08/10/spring-cloud-2023-0-0-m1-aka-leyton-has-been-released
scraped: 2026-02-23T09:29:41.544Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  August 10, 2023 | 0 Comments
---

# Spring Cloud 2023.0.0-M1 (aka Leyton) has been released

_Releases | Spencer Gibb |  August 10, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2023.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2023.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes).

## [](#notable-changes-in-the-202300-m1-release-train)Notable Changes in the 2023.0.0-M1 Release Train

See all issues and pull requests [here](https://github.com/orgs/spring-cloud/projects/103/views/1).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Initial support for MVC Server. See [PR 2949](https://github.com/spring-cloud/spring-cloud-gateway/pull/2949) and [Issue 36](https://github.com/spring-cloud/spring-cloud-gateway/issues/36).

### [](#spring-cloud-stream)Spring Cloud Stream

-   Initial support for runtime Kafka Streams binder error handling via a special processor
-   Kafka binder health check improvements
-   Partition handling improvements

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Java HttpClient Support ([#689](https://github.com/spring-cloud/spring-cloud-openfeign/issues/689))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Upgrade fabric8 to 6.7.2 by @ryanjbaxter in ([#1373](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1373))

The following modules were updated as part of 2023.0.0-M1:

Module

Version

Issues

Spring Cloud Consul

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.1.0-M1))

Spring Cloud Gateway

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.0-M1))

Spring Cloud Zookeeper

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.1.0-M1))

Spring Cloud Bus

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v4.1.0-M1))

Spring Cloud Stream

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.0-M1))

Spring Cloud Function

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.0-M1))

Spring Cloud Openfeign

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.0-M1))

Spring Cloud Vault

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.1.0-M1))

Spring Cloud Commons

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.1.0-M1))

Spring Cloud Task

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.1.0-M1))

Spring Cloud Kubernetes

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.0-M1))

Spring Cloud Starter Build

2023.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.0-M1))

Spring Cloud Config

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.0-M1))

Spring Cloud Build

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.0-M1))

Spring Cloud Netflix

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.0-M1))

Spring Cloud Circuitbreaker

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.0-M1))

Spring Cloud Contract

4.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.0-M1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<repositories>
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
            <version>2023.0.0-M1</version>
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
  id 'org.springframework.boot' version '3.2.0-M1'
  id 'io.spring.dependency-management' version '1.1.3'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
  sourceCompatibility = '17'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2023.0.0-M1")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
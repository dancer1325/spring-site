---
title: Spring Cloud 2024.0.2 (aka Moorgate) Has Been Released
source: https://spring.io/blog/2025/07/14/spring-cloud-2024-0-2-aka-moorgate-has-been-released
scraped: 2026-02-23T07:36:47.304Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  July 14, 2025 | 0 Comments
---

# Spring Cloud 2024.0.2 (aka Moorgate) Has Been Released

_Releases | Spencer Gibb |  July 14, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2024.0.2](https://cloud.spring.io) (aka Moorgate) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2024.0.2/). You can check out the 2024.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2024.0-Release-Notes).

## [](#changes-in-the-202402-release-train)Changes in the 2024.0.2 Release Train

This is primarily a bugfix and dependency bump release compatible with the Spring Boot 3.4.x generation.

---

The following modules were updated as part of 2024.0.2:

Module

Version

Issues

Spring Cloud Kubernetes

3.2.2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.2.2))

Spring Cloud Function

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.2.3))

Spring Cloud Zookeeper

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v4.2.2))

Spring Cloud Commons

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.2.2))

Spring Cloud Task

3.2.2

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v3.2.2))

Spring Cloud Vault

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.2.2))

Spring Cloud Openfeign

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.2.2))

Spring Cloud Circuitbreaker

3.2.2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.2.2))

Spring Cloud Netflix

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.2.2))

Spring Cloud Starter Build

2024.0.2

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2024.0.2))

Spring Cloud Stream

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.2.2))

Spring Cloud Gateway

4.2.4

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.2.4))

Spring Cloud Config

4.2.3

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.2.3))

Spring Cloud Consul

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v4.2.2))

Spring Cloud Build

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.2.2))

Spring Cloud Contract

4.2.2

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.2.2))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

---

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2024.0.2</version>
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
	id 'org.springframework.boot' version '3.4.7'
	id 'io.spring.dependency-management' version '1.1.7'
}

// ...

repositories {
	mavenCentral()
}

ext {
	set('springCloudVersion', "2024.0.1")
}

dependencyManagement {
	imports {
		mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
	}
}

dependencies {
	implementation 'org.springframework.cloud:spring-cloud-starter-config'
    implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
	// ...
}

```
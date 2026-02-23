---
title: Spring Cloud 2023.0.5 (aka Leyton) Is Now Available
source: https://spring.io/blog/2025/01/10/spring-cloud-2023-0-5-aka-leyton-has-been-released
scraped: 2026-02-23T07:56:08.072Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  January 10, 2025 | 3 Comments
---

# Spring Cloud 2023.0.5 (aka Leyton) Is Now Available

_Releases | Spencer Gibb |  January 10, 2025 | 3 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2023.0.5](https://cloud.spring.io) (aka Leyton) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2023.0.5/). You can check out the 2023.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes).

## [](#notable-changes-in-the-202305-release-train)Notable Changes in the 2023.0.5 Release Train

This is mostly a bugfix and dependency upgrade release. Please find the issues and pull requests [here](https://github.com/orgs/spring-cloud/projects/161).

---

The following modules were updated as part of 2023.0.5:

Module

Version

Issues

Spring Cloud Starter Build

2023.0.5

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.5))

Spring Cloud Netflix

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.5))

Spring Cloud Config

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.5))

Spring Cloud Build

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.5))

Spring Cloud Kubernetes

3.1.5

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.5))

Spring Cloud Stream

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.5))

Spring Cloud Function

4.1.5

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.5))

Spring Cloud Circuitbreaker

3.1.4

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v3.1.4))

---

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.5</version>
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
  id 'org.springframework.boot' version '3.3.7'
  id 'io.spring.dependency-management' version '1.1.7'
}

//...

ext {
  set('springCloudVersion', "2023.0.4")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

//...

```
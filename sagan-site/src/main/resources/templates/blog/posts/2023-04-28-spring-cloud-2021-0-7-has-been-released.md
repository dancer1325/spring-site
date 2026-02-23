---
title: Spring Cloud 2021.0.7 (aka Jubilee) has been released
source: https://spring.io/blog/2023/04/28/spring-cloud-2021-0-7-has-been-released
scraped: 2026-02-23T09:52:36.486Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  April 28, 2023 | 0 Comments
---

# Spring Cloud 2021.0.7 (aka Jubilee) has been released

_Releases | Olga Maciaszek-Sharma |  April 28, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2021.0.7](https://cloud.spring.io) Release Train (aka Jubilee) is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.7/). You can check out the 2021.0.7 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-202107-release-train)Notable Changes in the 2021.0.7 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/106) for all the issues and pull requests included in this release.

This release is primarily a bug fix release.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Path parsing optimization ([2884](https://github.com/spring-cloud/spring-cloud-gateway/pull/2884))

---

The following modules were updated as part of 2021.0.7:

Module

Version

Spring Cloud Netflix

3.1.6

Spring Cloud Config

3.1.7

Spring Cloud Build

3.1.7

Spring Cloud Sleuth

3.1.8

Spring Cloud Gateway

3.1.7

Spring Cloud Starter Build

2021.0.7

Spring Cloud Consul

3.1.3

Spring Cloud Contract

3.1.7

Spring Cloud Vault

3.1.3

Spring Cloud Kubernetes

2.1.7

Spring Cloud Zookeeper

3.1.3

Spring Cloud Task

2.4.6

Spring Cloud OpenFeign

3.1.7

Spring Cloud CircuitBreaker

2.1.7

Spring Cloud Stream

3.2.8

Spring Cloud Commons

3.1.6

Spring Cloud Function

3.2.10

Spring Cloud Cli

3.1.1

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-dependencies</artifactId>
      <version>2021.0.7</version>
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
  <!-- ... -->
</dependencies>
```

or with Gradle:

```groovy
Copyplugins {
  id 'java'
  id 'org.springframework.boot' version '2.7.11'
  id 'io.spring.dependency-management' version '1.0.15.RELEASE'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '8'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.7")
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
```
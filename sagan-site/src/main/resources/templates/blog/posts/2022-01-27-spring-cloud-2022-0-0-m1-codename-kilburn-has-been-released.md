---
title: Spring Cloud 2022.0.0-M1 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/01/27/spring-cloud-2022-0-0-m1-codename-kilburn-has-been-released
scraped: 2026-02-23T12:53:46.422Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  January 27, 2022 | 1 Comment
---

# Spring Cloud 2022.0.0-M1 (codename Kilburn) Has Been Released

_Releases | Glenn Renfro |  January 27, 2022 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2022.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#202200-m1).

## [](#notable-changes-in-the-202200-release-train)Notable Changes in the 2022.0.0 Release Train

See [the project page](https://github.com/orgs/spring-cloud/projects/71) for all the issues and pull requests included in this release.

The 2022.0.0-M1 release is all about compatibility with Spring Framework 6.0.0-M2, Spring Boot 3.0.0-M1, Java 17, Jakarta EE, and all the other milestones of Spring projects such as Spring Security, Spring Data, etc...

Changes include: moving to a Java 17 baseline, migrating from `javax.*` packages to `jakarta.*`, changes for removed classes and methods marked for deprecation, updating dependencies to versions compatible with JakartaEE and/or Java 17, Spring Cloud Cloudfoundry and CLI have been removed from the release train, and many more.

Please see the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#breaking-changes) for a running list of breaking changes.

### [](#spring-cloud-commons)Spring Cloud Commons

-   The OAuth integration has been migrated from the deprecated Spring Security OAuth to OAuth2 support in Spring Security ([1053](https://github.com/spring-cloud/spring-cloud-commons/issues/1053))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Removed the use of `@ConditionalOnKubernetesEnabled` in favor of `@ConditionalOnCloudPlatform` from Spring Boot ([893](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/893))

### [](#spring-cloud-task)Spring Cloud Task

Spring Cloud Task 3.0.0-M1 is intended to be the version of the framework aligned with Spring Boot 3.0.0-M1.

### [](#spring-cloud-contract)Spring Cloud Contract

Is not a part of the 2022.0.0-M1 release of Spring Cloud. It will be a part of the M2 release.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Is not a part of the 2022.0.0-M1 release of Spring Cloud. It will be a part of a future release once Eureka is compatible with JakartaEE.

Module

Version

Issues

Spring Cloud Vault

4.0.0-M1

Spring Cloud Config

4.0.0-M1

Spring Cloud Zookeeper

4.0.0-M1

Spring Cloud Commons

4.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/98?closed=1))

Spring Cloud Kubernetes

3.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/41?closed=1))

Spring Cloud Task

3.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/51?closed=1))

Spring Cloud Starter Build

2022.0.0-M1

Spring Cloud Circuitbreaker

3.0.0-M1

Spring Cloud Bus

4.0.0-M1

Spring Cloud Consul

4.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/60?closed=1))

Spring Cloud Gateway

4.0.0-M1

Spring Cloud Openfeign

4.0.0-M1

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
            <version>2022.0.0-M1</version>
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
  id 'org.springframework.boot' version '2.6.1'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}
group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
  maven { url 'https://repo.spring.io/milestone'}
}

ext {
  set('springCloudVersion', "2022.0.0-M1")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
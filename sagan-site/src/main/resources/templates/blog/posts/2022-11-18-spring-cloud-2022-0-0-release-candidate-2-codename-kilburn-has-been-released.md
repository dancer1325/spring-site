---
title: Spring Cloud 2022.0.0 Release Candidate 2 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/11/18/spring-cloud-2022-0-0-release-candidate-2-codename-kilburn-has-been-released
scraped: 2026-02-23T10:33:33.456Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  November 18, 2022 | 0 Comments
---

# Spring Cloud 2022.0.0 Release Candidate 2 (codename Kilburn) Has Been Released

_Releases | Ryan Baxter |  November 18, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 2 (RC2) of the [Spring Cloud 2022.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-20220-release-train)Notable Changes in the 2022.0 Release Train

Click [here](https://github.com/orgs/spring-cloud/projects/87) to see all issues in this release.

Spring Cloud 2022.0.0-RC2 requires Spring Boot 3.0.0-RC2.

All Spring Cloud projects are now using Apache HttpClient v5.

### [](#spring-cloud-contract)Spring Cloud Contract

This release contains a lot of changes including dependency upgrades and some breaking ones. Please check them out and give us feedback!

Breaking changes:

-   [Remove Spring Cloud Contract Pact integration](https://github.com/spring-cloud/spring-cloud-contract/issues/1845)
-   [Maven 3.6 as prerequisite for Maven plugin](https://github.com/spring-cloud/spring-cloud-contract/issues/1839)
-   [Leave only code input triggers and output message type](https://github.com/spring-cloud/spring-cloud-contract/issues/321) and [#1837](https://github.com/spring-cloud/spring-cloud-contract/issues/1837)
-   [Removing support for mocked AMQP, OOB AMQP and OOB Kafka](https://github.com/spring-cloud/spring-cloud-contract/issues/1838)

You can read more about the migration process over [here](https://github.com/spring-cloud/spring-cloud-contract/wiki/Spring-Cloud-Contract-4.0-Migration-Guide).

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Removed usage of Spring Cloud Commons HttpClient interfaces ([#788](https://github.com/spring-cloud/spring-cloud-openfeign/pull/788))
-   Apache HttpClient 4 has been removed in favour of Apache HttpClient 5 ([#783](https://github.com/spring-cloud/spring-cloud-openfeign/issues/783))
-   Upgraded to Feign `12.0` ([#782](https://github.com/spring-cloud/spring-cloud-openfeign/pull/782))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Removed Interfaces relying on Apache HttpClient v4. Removed OK HttpClient interfaces as they were only used by Spring Cloud OpenFeign. Spring Cloud OpenFeign now uses the OK HttpClient directly ([#1171](https://github.com/spring-cloud/spring-cloud-commons/issues/1171))
    
-   Deprecated classes and interfaces have been removed. See breaking changes in the [Spring Cloud 2022 Release Notes](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#breaking-changes)
    

### [](#spring-cloud-gateway)Spring Cloud Gateway

Added [native image support](https://github.com/spring-cloud/spring-cloud-gateway/pull/2770)

The following modules were updated as part of 2022.0.0-RC2:

Module

Version

Issues

Spring Cloud Task

3.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/67?closed=1))

Spring Cloud Bus

4.0.0-RC2

Spring Cloud Contract

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/95?closed=1))

Spring Cloud Circuitbreaker

3.0.0-RC2

Spring Cloud Function

4.0.0-RC2

Spring Cloud Openfeign

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/57?closed=1))

Spring Cloud Zookeeper

4.0.0-RC2

Spring Cloud Commons

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/107?closed=1))

Spring Cloud Vault

4.0.0-RC2

Spring Cloud Kubernetes

3.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/52?closed=1))

Spring Cloud Stream

4.0.0-RC2

Spring Cloud Starter Build

2022.0.0-RC2

Spring Cloud Consul

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/64?closed=1))

Spring Cloud Config

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/109?closed=1))

Spring Cloud Build

4.0.0-RC2

Spring Cloud Gateway

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/72?closed=1))

Spring Cloud Netflix

4.0.0-RC2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/116?closed=1))

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
      <version>2022.0.0-RC2</version>
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
  id 'org.springframework.boot' version '3.0.0-RC2'
  id 'io.spring.dependency-management' version '1.1.0'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2022.0.0-RC1")
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}

```
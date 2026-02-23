---
title: Spring Cloud 2022.0.0-M5 is now available
source: https://spring.io/blog/2022/10/06/spring-cloud-2022-0-0-m5-is-now-available
scraped: 2026-02-23T10:38:33.696Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 06, 2022 | 3 Comments
---

# Spring Cloud 2022.0.0-M5 is now available

_Releases | Spencer Gibb |  October 06, 2022 | 3 Comments_

On behalf of the community, I am pleased to announce that the Milestone 5 (M5) of the [Spring Cloud 2022.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-202200-m5-release-train)Notable Changes in the 2022.00-M5 Release Train

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Updated to Eureka 2.0.0-rc.3. Eureka 2.0.0 is a new branch of Eureka unrelated to the [old 2.x-archive](https://github.com/Netflix/eureka/tree/2.x-archive) experiment from 7 years ago. The new [2.x](https://github.com/Netflix/eureka/tree/2.x) branch is for compatibility with JakartaEE. This allows Spring Cloud Netflix to be compatible with Spring Framework 6.0 and Spring Boot 3.0. This is the first milestone that Spring Cloud Netflix has participated in the 2022.0 release train.

### [](#spring-cloud-consul)Spring Cloud Consul

-   Added runtime hints to enable native image support ([#792](https://github.com/spring-cloud/spring-cloud-consul/pull/792))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support for Micrometer Observability ([#2715](https://github.com/spring-cloud/spring-cloud-gateway/issues/2715))
-   New filter to remove JSON attributes ([#2742](https://github.com/spring-cloud/spring-cloud-gateway/issues/2742))
-   New filter to add request headers if not present ([#2737](https://github.com/spring-cloud/spring-cloud-gateway/issues/2737))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Allow customising load-balanced requests based on the selected `ServiceInstance` ([#735](https://github.com/spring-cloud/spring-cloud-openfeign/pull/735))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added Weight-based load-balancing ([#1063](https://github.com/spring-cloud/spring-cloud-commons/issues/1063))
-   Added support for LoadBalancer child contexts in AOT and native image support ([#1135](https://github.com/spring-cloud/spring-cloud-commons/pull/1135))

### [](#spring-cloud-config)Spring Cloud Config

-   Added runtime hints to enable native support ([#2174](https://github.com/spring-cloud/spring-cloud-config/pull/2174))

The following modules were updated as part of 2022.0.0-M5:

Module

Version

Issues

Spring Cloud Stream

4.0.0-M5

Spring Cloud Config

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/105?closed=1))

Spring Cloud Build

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-build/milestone/41?closed=1))

Spring Cloud Consul

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/63?closed=1))

Spring Cloud Gateway

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/70?closed=1))

Spring Cloud Kubernetes

3.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/49?closed=1))

Spring Cloud Netflix

4.0.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/110?closed=1))

Spring Cloud Starter Build

2022.0.0-M5

Spring Cloud Circuitbreaker

3.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/17?closed=1))

Spring Cloud Contract

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/93?closed=1))

Spring Cloud Bus

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/49?closed=1))

Spring Cloud Function

4.0.0-M5

Spring Cloud Task

3.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/62?closed=1))

Spring Cloud Zookeeper

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/40?closed=1))

Spring Cloud Openfeign

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/53?closed=1))

Spring Cloud Vault

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/52?closed=1))

Spring Cloud Commons

4.0.0-M5

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/104?closed=1))

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
            <version>2022.0.0-M5</version>
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
  id 'org.springframework.boot' version '3.0.0-M5'
  id 'io.spring.dependency-management' version '1.0.14.RELEASE'
  id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2022.0.0-M5")
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}
...
}
```
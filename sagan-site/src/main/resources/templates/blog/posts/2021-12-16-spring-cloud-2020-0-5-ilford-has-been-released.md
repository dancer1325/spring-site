---
title: Spring Cloud 2020.0.5 (Ilford) Has Been Released
source: https://spring.io/blog/2021/12/16/spring-cloud-2020-0-5-ilford-has-been-released
scraped: 2026-02-23T13:00:27.731Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 16, 2021 | 1 Comment
---

# Spring Cloud 2020.0.5 (Ilford) Has Been Released

_Releases | Ryan Baxter |  December 16, 2021 | 1 Comment_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2020.0.5](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2020.0.5/). You can check out the 2020.0.5 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-202005-release-train)Notable Changes in the 2020.0.5 Release Train

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Upgraded Netflix/Eureka to `1.10.17` [issue](https://github.com/spring-cloud/spring-cloud-netflix/issues/4050)

### [](#spring-cloud-config)Spring Cloud Config

-   Support Using HTTPS proxies for Git Repositories ([1965](https://github.com/spring-cloud/spring-cloud-config/issues/1965))
-   Support ordering AWS, Redis, and CredHub Repositories ([1980](https://github.com/spring-cloud/spring-cloud-config/issues/1980))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Enhancements for metrics: [Netty connections](https://github.com/spring-cloud/spring-cloud-gateway/issues/2241), [path as tag](https://github.com/spring-cloud/spring-cloud-gateway/pull/2419), and [route definition count](https://github.com/spring-cloud/spring-cloud-gateway/pull/2421)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Specify User Agent for Kubernetes API Client ([898](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/898))
-   Allow activeProfile not to be appended ([508](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/508))
-   Upgrade to Kubernetes Java Client 11.0.3

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Added support for size = 0 in `PageJacksonModule` [PR](https://github.com/spring-cloud/spring-cloud-openfeign/pull/636)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Cache Executor wrappers ([2020](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2020))

### [](#spring-cloud-vault)Spring Cloud Vault

-   TOKEN auth from file (~/.vault\_token) ([609](https://github.com/spring-cloud/spring-cloud-vault/issues/609))
-   Usage of spring.cloud.vault.reactive.enabled property in VaultConfigDataLoader ([619](https://github.com/spring-cloud/spring-cloud-vault/issues/619))
-   Add support for multiple database secrets generation ([459](https://github.com/spring-cloud/spring-cloud-vault/issues/459))

The following modules were updated as part of 2020.0.5:

Module

Version

Issues

Spring Cloud Netflix

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/107?closed=1))

Spring Cloud Config

3.0.6

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/94?closed=1))

Spring Cloud Sleuth

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/94?closed=1))

Spring Cloud Gateway

3.0.6

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/61?closed=1))

Spring Cloud Cloudfoundry

3.0.3

Spring Cloud Contract

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/81?closed=1))

Spring Cloud Kubernetes

2.0.5

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/35?closed=1))

Spring Cloud Zookeeper

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/38?closed=1))

Spring Cloud Cli

3.0.4

Spring Cloud Task

2.3.5

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/54))

Spring Cloud Starter Build

2020.0.5

Spring Cloud Openfeign

3.0.6

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/46?closed=1))

Spring Cloud Vault

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/49?closed=1))

Spring Cloud Commons

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/94?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2020.0.5</version>
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
        classpath 'io.spring.gradle:dependency-management-plugin:1.0.11.RELEASE'
    }
}

apply plugin: 'io.spring.dependency-management'

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.5'
    }
}

dependencies {
    implementation 'org.springframework.cloud:spring-cloud-starter-config'
    implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
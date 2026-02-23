---
title: Spring Cloud Finchley.M7 Has Been Released
source: https://spring.io/blog/2018/02/27/spring-cloud-finchley-m7-has-been-released
scraped: 2026-02-23T16:07:57.720Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  February 27, 2018 | 0 Comments
---

# Spring Cloud Finchley.M7 Has Been Released

_Releases | Ryan Baxter |  February 27, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 7 (M7) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. This release is compatible with Spring Boot 2.0.0.RC2. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   All of the code releated to Feign has been moved to a separate project, [Spring Cloud OpenFeign](https://github.com/spring-cloud/spring-cloud-openfeign).
-   There is a known issue with the Hystrix Webflux endpoint when using Spring Boot 2.0.0.RC2. You can follow this [issue](https://github.com/reactor/reactor-core/issues/1091) in Reactor for more information.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

New [project](https://github.com/spring-cloud/spring-cloud-openfeign) containing all the Feign code that used to be in Spring Cloud Netflix.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Support for retrying requests](https://github.com/spring-cloud/spring-cloud-gateway/issues/94) using `RetryGatewayFilterFactory`.
-   Bug fixes for [STOMP](https://github.com/spring-cloud/spring-cloud-gateway/issues/200) and [Server Sent Events](https://github.com/spring-cloud/spring-cloud-gateway/issues/161).

The following modules were updated as part of Finchley.M7:

Module

Version

Spring Cloud Gateway

2.0.0.M7

Spring Cloud Sleuth

2.0.0.M7

Spring Cloud Zookeeper

2.0.0.M6

Spring Cloud Build

2.0.0.RC1

Spring Cloud Consul

2.0.0.M6

Spring Cloud Netflix

2.0.0.M7

Spring Cloud Aws

2.0.0.M4

Spring Cloud Contract

2.0.0.M7

Spring Cloud Cloudfoundry

2.0.0.M3

Spring Cloud Security

2.0.0.M2

Spring Cloud Dependencies

2.0.0.RC1

Spring Cloud Commons

2.0.0.M7

Spring Cloud Config

2.0.0.M7

Spring Cloud Task

2.0.0.M3

Spring Cloud Bus

2.0.0.M6

Spring Cloud Openfeign

2.0.0.M1

Spring Cloud Stream

Elmhurst.RC1

Spring Boot

2.0.0.RC2

Spring Cloud Vault

2.0.0.M6

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>http://repo.spring.io/milestone</url>
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
            <version>Finchley.M7</version>
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
        url 'http://repo.spring.io/milestone'
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M7'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
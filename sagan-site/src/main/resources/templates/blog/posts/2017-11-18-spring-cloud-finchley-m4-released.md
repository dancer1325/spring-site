---
title: Spring Cloud Finchley.M4 Released
source: https://spring.io/blog/2017/11/18/spring-cloud-finchley-m4-released
scraped: 2026-02-23T16:15:24.300Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  November 18, 2017 | 1 Comment
---

# Spring Cloud Finchley.M4 Released

_Releases | Spencer Gibb |  November 18, 2017 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 4 (M4) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

This update is primarily for interoperability with Spring Boot 2.0.0.M6.

## [](#the-following-modules-were-updated-as-part-of-finchleym4)The following modules were updated as part of Finchley.M4:

Module

Version

Spring Cloud Dependencies

2.0.0.M5

Spring Cloud Consul

2.0.0.M3

Spring Cloud Gateway

2.0.0.M4

Spring Cloud Zookeeper

2.0.0.M3

Spring Cloud Sleuth

2.0.0.M4

Spring Cloud Cloudfoundry

2.0.0.M1

Spring Cloud Config

2.0.0.M4

Spring Cloud Netflix

2.0.0.M4

Spring Cloud Contract

2.0.0.M4

Spring Cloud Security

2.0.0.M1

Spring Cloud Stream

Elmhurst.M3

Spring Cloud Bus

2.0.0.M3

Spring Cloud Task

2.0.0.M2

Spring Boot Starter

2.0.0.M6

Spring Cloud Aws

2.0.0.M2

Spring Cloud Build

2.0.0.M5

Spring Boot Dependencies

2.0.0.M6

Spring Cloud Vault

2.0.0.M4

Spring Boot

2.0.0.M6

Spring Cloud Commons

2.0.0.M4

## [](#feedback)Feedback

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
            <version>Finchley.M4</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M4'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
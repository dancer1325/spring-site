---
title: Spring Cloud Finchley M8 is available
source: https://spring.io/blog/2018/03/02/spring-cloud-finchley-m8-is-available
scraped: 2026-02-23T16:06:52.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  March 02, 2018 | 2 Comments
---

# Spring Cloud Finchley M8 is available

_Releases | Spencer Gibb |  March 02, 2018 | 2 Comments_

On behalf of the community, I am pleased to announce that the Milestone 8 (M8) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

Finchley.M8 is compatible with Spring Boot 2.0.0.RELEASE.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Some bug fixes and small configuration enhancements.

### [](#spring-cloud-bus)Spring Cloud Bus

Fixes for custom remote events.

### [](#spring-cloud-security)Spring Cloud Security

Updated to spring-security-oauth2-autoconfigure 2.0.0.RELEASE.

### [](#spring-cloud-config)Spring Cloud Config

Support for [Gitee](http://gitee.com) webhooks.

### [](#spring-cloud-stream)Spring Cloud Stream

Please see the Elmhurst.RC2 [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.RC2).

The following modules were updated as part of Finchley.M8:

Module

Version

Spring Cloud Gateway

2.0.0.M8

Spring Cloud Bus

2.0.0.M7

Spring Cloud Security

2.0.0.M3

Spring Cloud Commons

2.0.0.M8

Spring Cloud Config

2.0.0.M8

Spring Cloud Stream

Elmhurst.RC2

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
            <version>Finchley.M8</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M8'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
---
title: Spring Cloud Camden RC1 is Available
source: https://spring.io/blog/2016/09/14/spring-cloud-camden-rc1-is-available
scraped: 2026-02-23T19:04:29.743Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  September 14, 2016 | 1 Comment
---

# Spring Cloud Camden RC1 is Available

_Releases | Spencer Gibb |  September 14, 2016 | 1 Comment_

On behalf of the team, I am pleased to announce that Release Candidate 1 (RC1) of the [Spring Cloud Camden](https://cloud.spring.io) Release Train is available today. The release can be found in our [Spring Milestone](https://repo.spring.io/milestone/) repository. This is mostly a bug fix release as Camden prepares for General Availability (GA). You can check out the Camden [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Camden-Release-Notes).

## [](#notable-changes-in-the-camden-release-train)Notable Changes in the Camden Release Train

Spring Cloud Contract is a new project that provides support for Consumer Driven Contracts and service schemas in Spring applications. Spring Cloud Netflix supports customization of Ribbon component classes via properties, uses the new community maintained [OpenFeign](https://github.com/OpenFeign/feign) and made various fixes and improvements to Zuul. Spring Cloud Consul adds support for Spring Cloud Bus using Consul's event api. The CLI adds a `spring cloud` command to start various Spring Cloud servers with a single command. Supported servers include Eureka, Config Server and Hystrix Dashboard.

The following modules were updated as part of Camden.RC1:

Module

Version

Spring Cloud Build

1.2.0.RELEASE

Spring Cloud Stream

Brooklyn.RC1

Spring Cloud Bus

1.2.0.RC1

Spring Cloud Config

1.2.0.RC1

Spring Cloud Netflix

1.2.0.RC1

Spring Cloud Consul

1.1.0.RC1

Spring Cloud Contract

1.0.0.RC1

NOTE: Spring Cloud CLI 1.2.0.RC1 will be released after Spring Boot 1.4.1 is released because of a regression.

The combined release train documentation is available [here](http://cloud.spring.io/spring-cloud-static/spring-cloud.html).

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloudOSS).

To get started with Maven with a BOM (dependency management only)

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
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Camden.RC1</version>
    <type>pom</type>
    <scope>import</scope>
  </dependencies>
</dependencyManagement>
<dependencies>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
  </dependency>
  ...
</dependencies>
```

or with Gradle:

```
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:0.6.0.RELEASE"
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Camden.RC1'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
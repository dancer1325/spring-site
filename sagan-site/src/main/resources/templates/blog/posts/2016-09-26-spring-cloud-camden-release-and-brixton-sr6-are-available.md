---
title: Spring Cloud Camden.RELEASE and Brixton.SR6 are available
source: https://spring.io/blog/2016/09/26/spring-cloud-camden-release-and-brixton-sr6-are-available
scraped: 2026-02-23T19:03:21.564Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  September 26, 2016 | 0 Comments
---

# Spring Cloud Camden.RELEASE and Brixton.SR6 are available

_Releases | Spencer Gibb |  September 26, 2016 | 0 Comments_

On behalf of the team, I am happy to announce the general availability of the [Spring Cloud Camden](https://cloud.spring.io) Release Train along with Service Release 6 of Brixton. `Camden.RELEASE` can be found in our [Spring Release](https://repo.spring.io/release/) repository. You can check out the Camden [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Camden-Release-Notes). `Brixton.SR6` is largely a [bug-fix release](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Brixton-Release-Notes) and is recommended for use with the Brixton Release Train.

## [](#highlights-of-the-camden-release-train)Highlights of the Camden Release Train

Spring Cloud Contract is a new project that provides support for Consumer Driven Contracts and service schemas in Spring applications. Spring Cloud Netflix supports customization of Ribbon component classes via properties, uses the new community-maintained [OpenFeign](https://github.com/OpenFeign/feign) and includes various fixes and improvements to Zuul. Spring Cloud Consul adds support for Spring Cloud Bus using Consul's event API. The CLI adds a `spring cloud` command to start various Spring Cloud servers with a single command. Supported servers include Eureka, Config Server and Hystrix Dashboard.

The following modules were updated as part of Camden.RELEASE:

Module

Version

Spring Cloud Build

1.2.0.RELEASE

Spring Cloud Stream

Brooklyn.RELEASE

Spring Cloud Bus

1.2.0.RELEASE

Spring Cloud Config

1.2.0.RELEASE

Spring Cloud Netflix

1.2.0.RELEASE

Spring Cloud Consul

1.1.0.RELEASE

Spring Cloud Contract

1.0.0.RELEASE

NOTE: Spring Cloud CLI 1.2.0.RC1 has been released. GA for the CLI project will happen shortly.

The combined release train documentation is available [here](http://cloud.spring.io/spring-cloud-static/spring-cloud.html).

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloudOSS).

To get started with Maven with a BOM (dependency management only):

```
Copy<dependencyManagement>
  <dependencies>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Camden.RELEASE</version>
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
    classpath "org.springframework.boot:spring-boot-gradle-plugin:1.4.1.RELEASE"
  }
}

apply plugin: "spring-boot"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Camden.RELEASE'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
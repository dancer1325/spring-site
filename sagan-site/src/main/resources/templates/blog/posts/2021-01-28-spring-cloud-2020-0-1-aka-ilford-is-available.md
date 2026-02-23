---
title: Spring Cloud 2020.0.1 (aka Ilford) Is Available
source: https://spring.io/blog/2021/01/28/spring-cloud-2020-0-1-aka-ilford-is-available
scraped: 2026-02-23T13:33:13.630Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  January 28, 2021 | 1 Comment
---

# Spring Cloud 2020.0.1 (aka Ilford) Is Available

_Releases | Spencer Gibb |  January 28, 2021 | 1 Comment_

On behalf of the community, I am pleased to announce that Service Release 1 of the [Spring Cloud 2020.0](https://cloud.spring.io) Release Train (2020.0.1) is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2020.0.1/). You can check out the 2020.0 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-202000-release-train)Notable Changes in the 2020.0.0 Release Train

This release was primarliy for bug fixes and dependency upgrades.

See [this page](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#known-issues) for a list of Known Issues.

See the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/52).

### [](#spring-cloud-config)Spring Cloud Config

All of the [known issues](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#known-issues) have been fixed.

### [](#spring-cloud-consul)Spring Cloud Consul

A new [known issue](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#known-issues) have been found, where the `spring.config.import=consul:` does not support retry.

The issue with improper order of contexts in the Config module has been fixed.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

The issue with improper order of contexts in the Config module has been fixed.

---

The following modules were updated as part of 2020.0.0:

Module

Version

Issues

Spring Cloud Circuitbreaker

2.0.0

Spring Cloud Contract

3.0.1

Spring Cloud Kubernetes

2.0.1

Spring Cloud Commons

3.0.1

Spring Cloud Openfeign

3.0.1

Spring Cloud Cloudfoundry

3.0.0

Spring Cloud Bus

3.0.1

Spring Cloud Cli

3.0.1

Spring Cloud Zookeeper

3.0.1

Spring Cloud Sleuth

3.0.1

Spring Cloud Consul

3.0.1

Spring Cloud Starter Build

2020.0.1

Spring Cloud Gateway

3.0.1

Spring Cloud Netflix

3.0.1

Spring Cloud Vault

3.0.1

Spring Cloud Config

3.0.2

Spring Cloud Task

2.3.0

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2020.0.1</version>
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
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:1.0.11.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.1'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
---
title: Spring Cloud Finchley.RC2 Has Been Released
source: https://spring.io/blog/2018/05/29/spring-cloud-finchley-rc2-has-been-released
scraped: 2026-02-23T15:23:41.798Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  May 29, 2018 | 1 Comment
---

# Spring Cloud Finchley.RC2 Has Been Released

_Releases | Ryan Baxter |  May 29, 2018 | 1 Comment_

On behalf of the community, I am pleased to announce that the Release Candidate 2 (RC2) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

Finchley.RC2 is based on Spring Boot 2.0.2.

### [](#spring-cloud-task)Spring Cloud Task

-   [Release Announcement](https://spring.io/blog/2018/05/07/spring-cloud-task-2-0-0-release-is-now-available)

### [](#spring-cloud-config)Spring Cloud Config

-   Supports skipping SSL validation for Git and Vault repositories
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A2.0.0.RC2)

### [](#spring-cloud-bus)Spring Cloud Bus

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-bus/issues?q=is%3Aclosed+milestone%3A2.0.0.RC2)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Spring Cloud Netflix Turbine Stream now uses WebFlux
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A2.0.0.RC2)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Quite a few documentation updates.
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=milestone%3A2.0.0.RC2+is%3Aclosed)

### [](#spring-cloud-consul)Spring Cloud Consul

-   Dependency and documentation updates

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/issues?q=is%3Aclosed+milestone%3A2.0.0.RC2)

### [](#spring-cloud-stream)Spring Cloud Stream

-   [Release Notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.RELEASE)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Brave got updated to 5.0, minor enhancements and bug fixes applied
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.0.0.RC2)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A2.0.0.RC2)

### [](#spring-cloud-function)Spring Cloud Function

-   First release train version which includes Spring Cloud Function
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-function/issues?q=is%3Aclosed+milestone%3A1.0.0.RC2)

The following modules were updated as part of Finchley.RC2:

Module

Version

Spring Cloud Task

2.0.0.RELEASE

Spring Cloud Config

2.0.0.RC2

Spring Cloud Bus

2.0.0.RC2

Spring Cloud Netflix

2.0.0.RC2

Spring Cloud CloudFoundry

2.0.0.RC1

Spring Cloud Security

2.0.0.RC1

Spring Cloud Build

2.0.1.RELEASE

Spring Cloud Contract

2.0.0.RC2

Spring Cloud Consul

2.0.0.RC2

Spring Cloud Gateway

2.0.0.RC2

Spring Cloud Zookeeper

2.0.0.RC1

Spring Cloud Stream

Elmhurst.RELEASE

Spring Cloud Sleuth

2.0.0.RC2

Spring Cloud Aws

2.0.0.RC2

Spring Boot

2.0.2.RELEASE

Spring Cloud OpenFeign

2.0.0.RC2

Spring Cloud Vault

2.0.0.RC2

Spring Cloud Commons

2.0.0.RC2

Spring Cloud Function

1.0.0.RC2

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
            <version>Finchley.RC2</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.RC2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
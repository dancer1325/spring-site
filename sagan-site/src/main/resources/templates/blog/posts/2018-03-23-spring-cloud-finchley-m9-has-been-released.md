---
title: Spring Cloud Finchley.M9 Has Been Released
source: https://spring.io/blog/2018/03/23/spring-cloud-finchley-m9-has-been-released
scraped: 2026-02-23T15:30:18.470Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  March 23, 2018 | 1 Comment
---

# Spring Cloud Finchley.M9 Has Been Released

_Releases | Ryan Baxter |  March 23, 2018 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 9 (M9) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Support Rolling Deployments](https://github.com/spring-cloud/spring-cloud-gateway/issues/67)
    
-   [Refresh routes from service discovery heart beat](https://github.com/spring-cloud/spring-cloud-gateway/issues/236)
    

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Upgraded to Eureka `1.8.7` to address thread pool issue when Eureka health check is enabled

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Bug Fixes
-   Further Alignment With Brave
-   Fixed interop with Spring Cloud Gateway

### [](#spring-cloud-contract)Spring Cloud Contract

-   Added byte array for DSL
-   Better support for RestDocs parametrized names
-   Added exposure of multiple versions of the same artifact in the same test
-   Added verbose messages for collection assertions in the generated tests
-   Allows to keep unpacked stubs after the stubs got downloaded and test finished
-   Added new overview sections to documentation

### [](#spring-cloud-commons)Spring Cloud Commons

-   Refactored APIs related to [configuring Spring Retry](https://github.com/spring-cloud/spring-cloud-commons/pull/331)

### [](#spring-cloud-config)Spring Cloud Config

-   Adds ability to [remove untracked local branches](http://cloud.spring.io/spring-cloud-static/Finchley.M9/single/spring-cloud.html#_deleting_untracked_branches_in_git_repositories)
    
-   Support [YAML configuration for composite repos](https://github.com/spring-cloud/spring-cloud-config/issues/616)
    

### [](#spring-cloud-stream)Spring Cloud Stream

-   See Spring Cloud Stream [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.RC3)

The following modules were updated as part of Finchley.M9:

Module

Version

Spring Cloud Consul

2.0.0.M7

Spring Cloud Zookeeper

2.0.0.M7

Spring Cloud Gateway

2.0.0.M9

Spring Cloud Build

2.0.0.RC2

Spring Boot

2.0.0.RELEASE

Spring Cloud Aws

2.0.0.M4

Spring Cloud Bus

2.0.0.M7

Spring Cloud Netflix

2.0.0.M8

Spring Cloud Sleuth

2.0.0.M9

Spring Cloud Contract

2.0.0.M8

Spring Cloud Cloudfoundry

2.0.0.M3

Spring Cloud Security

2.0.0.M3

Spring Cloud Commons

2.0.0.M9

Spring Cloud Config

2.0.0.M9

Spring Cloud Task

2.0.0.M3

Spring Cloud Stream

Elmhurst.RC3

Spring Boot Starter

2.0.0.RELEASE

Spring Cloud Openfeign

2.0.0.M2

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
            <version>Finchley.M9</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M9'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
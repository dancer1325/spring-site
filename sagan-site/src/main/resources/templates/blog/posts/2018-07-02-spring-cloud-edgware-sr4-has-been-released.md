---
title: Spring Cloud Edgware.SR4 Has Been Released
source: https://spring.io/blog/2018/07/02/spring-cloud-edgware-sr4-has-been-released
scraped: 2026-02-23T15:20:18.195Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  July 02, 2018 | 0 Comments
---

# Spring Cloud Edgware.SR4 Has Been Released

_Releases | Ryan Baxter |  July 02, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 4 (SR4) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. You can find the release in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.SR4/). You can also check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-boot-autoconfigure-processor)spring-boot-autoconfigure-processor

-   All of the projects have a new optional dependency, `spring-boot-autoconfigure-processor`. See Spring Cloud Commons issue [#377](https://github.com/spring-cloud/spring-cloud-commons/issues/377).

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Documentation and bug fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A1.3.4.RELEASE)

### [](#spring-cloud-aws)Spring Cloud AWS

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-aws/milestone/23?closed=1)

### [](#spring-cloud-config)Spring Cloud Config

-   Added the ability to configure a proxy host and port for ssh git repo connections
-   Added refresh rate to GIT repositories
-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A1.4.4.RELEASE)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Made the stub-runner fat jar executable (you can do `./stub-runner.jar`)
-   Added cookie support for Contract DSL
-   Upgraded WireMock to 2.16.0
-   Added basic support for XML and Rest Docs
-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A1.2.5.RELEASE)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A1.3.4.RELEASE)

### [](#spring-cloud-task)Spring Cloud Task

-   [Blog Post](https://spring.io/blog/2018/07/02/spring-cloud-task-1-2-3-release-is-now-available)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Servo is now disabled by default
-   Added support cluster query param in TurbineStream
-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A1.4.5.RELEASE)

### [](#spring-cloud-vault)Spring Cloud Vault

-   [Dependency upgrades](https://github.com/spring-cloud/spring-cloud-vault/issues?q=is%3Aclosed+milestone%3A1.1.1)

### [](#spring-cloud-function)Spring Cloud Function

-   First Edgware release that includes Spring Cloud Function

The following modules were updated as part of Edgware.SR4:

Module

Version

Spring Cloud AWS

1.2.3.RELEASE

Spring Cloud Contract

1.2.5.RELEASE

Spring Cloud Consul

1.3.4.RELEASE

Spring Cloud Zookeeper

1.2.2.RELEASE

Spring Cloud Sleuth

1.3.4.RELEASE

Spring Cloud Config

1.4.4.RELEASE

Spring Cloud Netflix

1.4.5.RELEASE

Spring Cloud Commons

1.3.4.RELEASE

Spring Cloud Bus

1.3.4.RELEASE

Spring Cloud Security

1.2.3.RELEASE

Spring Cloud Cloudfoundry

1.1.2.RELEASE

Spring Cloud Function

1.0.0.RELEASE

Spring Cloud Vault

1.1.1.RELEASE

Spring Cloud Gateway

1.0.2.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.SR4</version>
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

Or, with Gradle:

```
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.SR4'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
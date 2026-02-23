---
title: Spring Cloud Edgware M1 Is Now Available
source: https://spring.io/blog/2017/08/29/spring-cloud-edgware-m1-is-now-available
scraped: 2026-02-23T16:23:28.380Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  August 29, 2017 | 0 Comments
---

# Spring Cloud Edgware M1 Is Now Available

_Releases | Ryan Baxter |  August 29, 2017 | 0 Comments_

On behalf of the community, I am pleased to announce that Milestone 1 (M1) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Spring Cloud Gateway is a new project that aims to provide the ability to build an API gateway on top of Spring MVC.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Spring Cloud Sleuth 1.3.0.M1 removed support for Project Reactor even though it was present in snapshot releases

### [](#spring-cloud-commons)Spring Cloud Commons

-   You can now create "composite discovery clients" consisting of multiple discovery client implementations

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   You now have the option of configuring the Eureka Client in Spring Cloud Netflix to use a Spring `RestTemplate` instead of the default Jersey HTTP Client. See our [documentation](http://cloud.spring.io/spring-cloud-static/Edgware.M1/#_eurekaclient_without_jersey) for more information.

The following modules were updated as part of Edgware.M1:

Module

Version

Spring Cloud Contract

1.2.0.M1

Spring Cloud Stream

Ditmars.M2

Spring Cloud Gateway

1.0.0.M1

Spring Cloud Vault

1.1.0.M1

Spring Cloud Config

1.4.0.M1

Spring Cloud Zookeeper

1.2.0.M1

Spring Cloud Commons

1.3.0.M1

Spring Cloud Netflix

1.4.0.M1

Spring Cloud Sleuth

1.3.0.M1

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
            <version>Edgware.M1</version>
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
        <artifactId>spring-cloud-starter-eureka</artifactId>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.M1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
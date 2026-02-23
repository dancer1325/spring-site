---
title: Spring Cloud Finchley M1 is available.
source: https://spring.io/blog/2017/07/06/spring-cloud-finchley-m1-is-available
scraped: 2026-02-23T16:27:50.640Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  July 06, 2017 | 5 Comments
---

# Spring Cloud Finchley M1 is available.

_Releases | Spencer Gibb |  July 06, 2017 | 5 Comments_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

Finchley is based on the Spring Boot 2.0.0 line. Finchley.M1 is based on Spring Boot 2.0.0.M2. This is largely a compatibility build with no new features with the exception of Spring Cloud Gateway. Finchley will follow Spring Boot's milestones and release candidates with a corresponding Finchley release soon after. General Availability is targeted for after Spring Boot 2.0 GA, likely in Dec. 2017.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Spring Cloud Gateway is a new API Gateway based on Spring 5, Boot 2 and Project Reactor. It is viewed as a replacement for Zuul 1. Some features include:

-   Fine grained route predicates such as: path, host and HTTP method
-   Filters such as: path rewriting, adding headers and rate limiting
-   A Management API
-   A Route definition repository interface (for persisting route definitions).

Look for a future blog post that will further introduce Spring Cloud Gateway

The following modules were updated as part of Finchley.M1:

Module

Version

Spring Cloud Sleuth

2.0.0.M1

Spring Cloud Cloudfoundry

2.0.0.M1

Spring Cloud Gateway

2.0.0.M1

Spring Cloud Build

2.0.0.M1

Spring Cloud Config

2.0.0.M1

Spring Cloud Consul

2.0.0.M1

Spring Cloud Dependencies

2.0.0.M1

Spring Cloud Netflix

2.0.0.M1

Spring Cloud Task

1.2.0.RELEASE

Spring Boot Starter

2.0.0.M2

Spring Cloud Security

2.0.0.M1

Spring Cloud Bus

2.0.0.M1

Spring Cloud Contract

2.0.0.M1

Spring Cloud Aws

2.0.0.M1

Spring Cloud Stream

Elmhurst.M1

Spring Cloud Commons

2.0.0.M1

Spring Cloud Zookeeper

2.0.0.M1

Spring Boot

2.0.0.M2

Spring Cloud Vault

2.0.0.M1

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

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
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.M1</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
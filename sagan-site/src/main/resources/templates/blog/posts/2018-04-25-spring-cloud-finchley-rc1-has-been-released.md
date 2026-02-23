---
title: Spring Cloud Finchley.RC1 Has Been Released
source: https://spring.io/blog/2018/04/25/spring-cloud-finchley-rc1-has-been-released
scraped: 2026-02-23T15:26:19.618Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  April 25, 2018 | 1 Comment
---

# Spring Cloud Finchley.RC1 Has Been Released

_Releases | Ryan Baxter |  April 25, 2018 | 1 Comment_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

Finchley.RC1 is based on Spring Boot 2.0.1.

### [](#spring-cloud-task)Spring Cloud Task

-   [Release Announcement](https://spring.io/blog/2018/04/16/spring-cloud-task-2-0-0-rc1-is-now-available)

### [](#spring-cloud-config)Spring Cloud Config

-   [Set refresh rate for Git repos](https://github.com/spring-cloud/spring-cloud-config/pull/749)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-bus)Spring Cloud Bus

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-bus/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-cloudfoundry/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Support for Pact v3
-   Integration with Pact Broker
-   Option to upload and fetch stubs from a Git repository
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=milestone%3A2.0.0.RC1+is%3Aclosed)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-consul/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Dynamically filter registered services](https://github.com/spring-cloud/spring-cloud-gateway/issues/185) to be routed by Gateway. Using SpEL, you can set an expression to be evaluated againts a `ServiceInstance` object. For example, `spring.cloud.gateway.discovery.locator.include-expression=metadata['edge'] == 'true'` will test that the `metadata` map contains a key `edge` with a value of `true`.
-   [Filters to read or modify requests and responses](https://github.com/spring-cloud/spring-cloud-gateway/pull/278)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-zookeeper/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-stream)Spring Cloud Stream

-   [Release Notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.RELEASE)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Dubbo integration has been documented
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.0.0.RC1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/milestone/46?closed=1)

The following modules were updated as part of Finchley.RC1:

Module

Version

Spring Cloud Task

2.0.0.RC1

Spring Cloud Config

2.0.0.RC1

Spring Cloud Bus

2.0.0.RC1

Spring Cloud Netflix

2.0.0.RC1

Spring Cloud CloudFoundry

2.0.0.RC1

Spring Cloud Security

2.0.0.RC1

Spring Cloud Build

2.0.0.RELEASE

Spring Cloud Contract

2.0.0.RC1

Spring Cloud Consul

2.0.0.RC1

Spring Cloud Gateway

2.0.0.RC1

Spring Cloud Zookeeper

2.0.0.RC1

Spring Cloud Stream

Elmhurst.RELEASE

Spring Cloud Sleuth

2.0.0.RC1

Spring Cloud Aws

2.0.0.RC1

Spring Boot

2.0.1.RELEASE

Spring Cloud OpenFeign

2.0.0.RC1

Spring Cloud Vault

2.0.0.RC1

Spring Cloud Commons

2.0.0.RC1

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
            <version>Finchley.RC1</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.RC1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
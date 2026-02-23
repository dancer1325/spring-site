---
title: Spring Cloud Finchley.SR2 Is Available
source: https://spring.io/blog/2018/10/24/spring-cloud-finchley-sr2-is-available
scraped: 2026-02-23T15:09:25.482Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 24, 2018 | 1 Comment
---

# Spring Cloud Finchley.SR2 Is Available

_Releases | Ryan Baxter |  October 24, 2018 | 1 Comment_

On behalf of the community, I am pleased to announce that SR2 (Service Release) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Finchley.SR2/). You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support WebFlux error handling in Hystrix timeouts [#553](https://github.com/spring-cloud/spring-cloud-gateway/issues/553)
-   Read multiple certificates in PEM file [#583](https://github.com/spring-cloud/spring-cloud-gateway/pull/583)
-   Support for configuring TLS timeouts [#578](https://github.com/spring-cloud/spring-cloud-gateway/pull/578)
-   `ModifyRequestBodyGatewayFilterFactory` updates headers appropriately [#492](https://github.com/spring-cloud/spring-cloud-gateway/issues/492)
-   Support relative redirects in redirect filter [#468](https://github.com/spring-cloud/spring-cloud-gateway/issues/468)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/issues?q=is%3Aclosed+milestone%3A2.0.2.RELEASE)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.0.2.RELEASE)

### [](#spring-cloud-config)Spring Cloud Config

-   Propagate Git clone errors [#1160](https://github.com/spring-cloud/spring-cloud-config/issues/1160)
-   Gitee and Gogs webhook support [#1140](https://github.com/spring-cloud/spring-cloud-config/pull/1140)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A2.0.2.RELEASE)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Support accepting all certificates in Sidecars [#3224](https://github.com/spring-cloud/spring-cloud-netflix/pull/3224)
-   `HystrixCommands.fallback` now supports taking in a `Throwable` that caused the fallback to be called [#3210](https://github.com/spring-cloud/spring-cloud-netflix/issues/3210)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=milestone%3A2.0.2.RELEASE+is%3Aclosed)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Better error handling when using a `@LoadBalanced WebClient` [#386](https://github.com/spring-cloud/spring-cloud-commons/issues/386)
-   `InstancePreRegisteredEvent` fired before a [service is registered](http://cloud.spring.io/spring-cloud-static/Finchley.SR2/single/spring-cloud.html#_serviceregistry_auto_registration_events)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A2.0.2.RELEASE)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A2.0.2.RELEASE)

### [](#spring-cloud-vault)Spring Cloud Vault

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-vault/issues?q=is%3Aclosed+milestone%3A2.0.2)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Add support for `MultipartFile` in Feign clients [#62](https://github.com/spring-cloud/spring-cloud-openfeign/issues/62)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-openfeign/issues?q=is%3Aclosed+milestone%3A2.0.2.RELEASE)

### [](#spring-cloud-security)Spring Cloud Security

-   Dependency Updates

### [](#spring-cloud-aws)Spring Cloud AWS

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-aws/issues?q=is%3Aclosed+milestone%3A2.0.1.RELEASE)

The following modules were updated as part of Finchley.SR2:

Module

Version

Spring Cloud Gateway

2.0.2.RELEASE

Spring Cloud Sleuth

2.0.2.RELEASE

Spring Cloud Config

2.0.2.RELEASE

Spring Cloud Netflix

2.0.2.RELEASE

Spring Cloud Commons

2.0.2.RELEASE

Spring Cloud Contract

2.0.2.RELEASE

Spring Cloud Vault

2.0.2.RELEASE

Spring Cloud Openfeign

2.0.2.RELEASE

Spring Cloud AWS

2.0.1.RELEASE

Spring Cloud Cloud Foundry

2.0.1.RELEASE

Spring Cloud Security

2.0.1.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.SR2</version>
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
        classpath "io.spring.gradle:dependency-management-plugin:1.0.5.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.SR2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
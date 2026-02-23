---
title: Spring Cloud Finchley M2 is available
source: https://spring.io/blog/2017/08/30/spring-cloud-finchley-m2-is-available
scraped: 2026-02-23T16:23:32.772Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  August 30, 2017 | 1 Comment
---

# Spring Cloud Finchley M2 is available

_Releases | Spencer Gibb |  August 30, 2017 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

### [](#spring-boot-starter)Spring Boot Starter

The Finchley.M2 release builds on top of the Spring Boot 2.0.0.M3, Spring Framework 5.0.0.RC3, and Project Reactor Bismuth-M3 releases.

### [](#spring-cloud-gateway)Spring Cloud Gateway

The major new feature in the Gateway is WebSocket support (route uri's with a `ws://` scheme) along with a Request Rate Limiter based on Redis, more [documentation](https://github.com/spring-cloud/spring-cloud-gateway/blob/2.0.x/docs/src/main/asciidoc/spring-cloud-gateway.adoc) and a [site](http://cloud.spring.io/spring-cloud-gateway/).

### [](#spring-cloud-commons)Spring Cloud Commons

[Support](https://github.com/spring-cloud/spring-cloud-commons/blob/2.0.x/docs/src/main/asciidoc/spring-cloud-commons.adoc#loadbalanced-webclient) for using a 'serviceId' or logical hostname in the new Spring WebFlux `WebClient`.

### [](#spring-cloud-task)Spring Cloud Task

A Spring Boot 2.0.0 compatible release of Spring Cloud Task has been included for the first time.

### [](#spring-cloud-vault)Spring Cloud Vault

Autoconfiguration for reactive client access using Spring Vault 2.0.M2 based on Spring WebFlux `WebClient`. Authentication methods supported by Spring Cloud Vault are adopted via Spring Vault's [authentication flow DSL](https://docs.spring.io/spring-vault/docs/2.0.x/reference/html/#vault.authentication.steps) for reactive authentication. The upgraded dependency also comes with improved support for API validation regarding `null` values based on Spring's `@NonNullApi` and `@Nullable` annotations.

### [](#future-milestones)Future Milestones

The next Finchley Milestone will be built on Spring Boot 2.0.0.M4. Themes for Spring Cloud will include support for the [new Actuator framework](https://spring.io/blog/2017/08/22/introducing-actuator-endpoints-in-spring-boot-2-0) and reactive support for Sleuth.

### [](#the-following-modules-were-updated-as-part-of-finchleym2)The following modules were updated as part of Finchley.M2:

Module

Version

Spring Cloud Sleuth

2.0.0.M2

Spring Cloud Cloudfoundry

2.0.0.M1

Spring Cloud Consul

2.0.0.M1

Spring Cloud Config

2.0.0.M2

Spring Cloud Gateway

2.0.0.M2

Spring Cloud Build

2.0.0.M2

Spring Cloud Dependencies

2.0.0.M2

Spring Cloud Netflix

2.0.0.M2

Spring Boot Starter

2.0.0.M2

Spring Cloud Security

2.0.0.M1

Spring Cloud Bus

2.0.0.M1

Spring Cloud Contract

2.0.0.M2

Spring Boot Dependencies

2.0.0.M2

Spring Cloud Aws

2.0.0.M1

Spring Cloud Stream

Elmhurst.M1

Spring Cloud Task

2.0.0.M1

Spring Cloud Zookeeper

2.0.0.M1

Spring Boot

2.0.0.M2

Spring Cloud Commons

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
            <version>Finchley.M2</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
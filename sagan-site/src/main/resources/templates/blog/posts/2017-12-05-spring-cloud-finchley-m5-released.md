---
title: Spring Cloud Finchley.M5 Released
source: https://spring.io/blog/2017/12/05/spring-cloud-finchley-m5-released
scraped: 2026-02-23T16:12:36.704Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 05, 2017 | 2 Comments
---

# Spring Cloud Finchley.M5 Released

_Releases | Spencer Gibb |  December 05, 2017 | 2 Comments_

On behalf of the team and community, I am pleased to announce that the Milestone 5 (M5) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

This update contains changes for compatibility with Spring Boot 2.0.0.M7.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

The spans created via the `@Async` are now always continuing a parent span instead of creating a new one.

### [](#spring-cloud-gateway)Spring Cloud Gateway

The Java fluent API has been updated to provided a better developer experience. All predicates and filters are now discoverable via your IDE's code completion, rather than via static imports. A `RouteLocatorBuilder` is now available to be injected and is the main entry point for the DSL. IDs are no longer required (a random one will be generated, if not supplied);

```java
Copy@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
  return builder.routes()
      .route(r -> r.host("**.abc.org").and().path("/image/png")
          .addResponseHeader("X-TestHeader", "foobar")
          .uri("http://httpbin.org:80")
      )
      .route("webp", r -> r.path("/image/webp")
        .addResponseHeader("X-AnotherHeader", "baz")
        .uri("http://httpbin.org:80")
      )
}
```

The Kotlin DSL has also been updated in a similar fashion.

```kotlin
Copy@Bean
fun additionalRouteLocator(builder: RouteLocatorBuilder): RouteLocator = builder.routes {
  route() {
    host("kotlin.abc.org") and path("/image/png")
    filters {
      addResponseHeader("X-TestHeader", "foobar")
    }
    uri("http://httpbin.org:80")
  }
}
```

### [](#spring-cloud-netflix)Spring Cloud Netflix

Upgrade to latest Eureka.

### [](#spring-cloud-bus)Spring Cloud Bus

A new `spring.cloud.bus.id` has been introduced to address bus instances rather than the ApplicationContext ID, which needs to be unique per instance of a service. This change should be backwards compatible.

### [](#spring-cloud-commons)Spring Cloud Commons

A new property has been introduced to disable refresh scope: `spring.cloud.refresh.enabled`.

## [](#the-following-modules-were-updated-as-part-of-finchleym5)The following modules were updated as part of Finchley.M5:

Module

Version

Spring Cloud Dependencies

2.0.0.M6

Spring Cloud Consul

2.0.0.M4

Spring Cloud Sleuth

2.0.0.M5

Spring Cloud Gateway

2.0.0.M5

Spring Cloud Zookeeper

2.0.0.M4

Spring Cloud Cloudfoundry

2.0.0.M2

Spring Cloud Netflix

2.0.0.M5

Spring Cloud Contract

2.0.0.M5

Spring Cloud Security

2.0.0.M1

Spring Cloud Task

2.0.0.M2

Spring Boot Dependencies

2.0.0.M7

Spring Cloud Stream

Elmhurst.M3

Spring Cloud Bus

2.0.0.M4

Spring Cloud Aws

2.0.0.M2

Spring Cloud Config

2.0.0.M5

Spring Boot Starter

2.0.0.M7

Spring Cloud Build

2.0.0.M6

Spring Cloud Vault

2.0.0.M4

Spring Cloud Commons

2.0.0.M5

Spring Boot

2.0.0.M7

## [](#feedback)Feedback

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
            <version>Finchley.M5</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M5'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
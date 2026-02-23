---
title: Spring Cloud Finchley.M3 Released
source: https://spring.io/blog/2017/10/31/spring-cloud-finchley-m3-released
scraped: 2026-02-23T16:16:50.512Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 31, 2017 | 2 Comments
---

# Spring Cloud Finchley.M3 Released

_Releases | Spencer Gibb |  October 31, 2017 | 2 Comments_

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

A common theme among many of the projects included in the Finchley release train is adding support for WebFlux, WebClient, Micrometer or other integrations within the Spring Reactive theme.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

WebFlux and Reactor are supported again. OAuth support is not included. The `spring-cloud-sleuth-zipkin-stream` module has been removed.

### [](#spring-cloud-gateway)Spring Cloud Gateway

A new `GatewayFilter` interface was introduced to reduce any confusion with the existing `WebFilter` from Spring Framework. Any custom implementations will now need to implement `GatewayFilterFactory` rather than `WebFilterFactory`. Also references to `WebFilterFactories` will need to be replaced with `GatewayFilterFactories` for the Java DSL.

The Java DSL has changed slightly as well. The `uri()` method is now the terminating operator rather than `and()`.

What used to be written as:

```java
Copy@Bean
public RouteLocator wsRouteLocator() {
    return Routes.locator()
            .route("testws")
                .uri("ws://localhost:"+this.wsPort)
                .predicate(alwaysTrue())
                .and()
            .build();
}
```

would now be written like:

```java
Copy@Bean
public RouteLocator wsRouteLocator() {
    return Routes.locator()
            .route("testws")
                .predicate(alwaysTrue())
                .uri("ws://localhost:"+this.wsPort)
            .build();
}
```

Support for the gateway is available on [http://start.spring.io](http://start.spring.io).

### [](#spring-cloud-netflix)Spring Cloud Netflix

Some packages were refactored to modules, but this shouldn't affect anyone using the starters.

The detailed `/routes` actuator is now accessed via `/routes/details` rather than `/routes?format=details`.

Eureka was updated to version 1.8.4

### [](#spring-cloud-contract)Spring Cloud Contract

Support was added for Rest Assured tests with Spring RestDocs.

### [](#spring-cloud-bus)Spring Cloud Bus

Bus endpoints were remapped from `/bus/*` to `/bus-*`. (This might change again with feedback from the community)

Old

New

`/bus/env`

`/bus-env`

`/bus/refresh`

`/bus-refresh`

### [](#spring-cloud-aws)Spring Cloud Aws

Spring Cloud AWS is not yet compatible with the Finchley release train.

### [](#spring-cloud-task)Spring Cloud Task

A new Task milestone will be included in the next Finchley milestone.

### [](#spring-cloud-vault)Spring Cloud Vault

Added support for Vault's database backend.

### [](#spring-cloud-commons)Spring Cloud Commons

Internals were upgrade to be compatible with Spring Boot 2. Any feedback on `RefreshScope` or `@ConfigurationProperties` rebinding would be appreciated.

### [](#deprecated-starters-removed)Deprecated starters removed

A number of starters that did not follow normal Spring Cloud naming conventions were renamed in [Edgware](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes#renamed-starters). Below is a table of the removed starters and their replacements:

Removed

Finchley Starter

spring-cloud-starter-archaius

spring-cloud-starter-netflix-archaius

spring-cloud-starter-atlas

spring-cloud-starter-netflix-atlas

spring-cloud-starter-eureka

spring-cloud-starter-netflix-eureka-client

spring-cloud-starter-eureka-server

spring-cloud-starter-netflix-eureka-server

spring-cloud-starter-feign

spring-cloud-starter-openfeign

spring-cloud-starter-hystrix

spring-cloud-starter-netflix-hystrix

spring-cloud-starter-hystrix-dashboard

spring-cloud-starter-netflix-hystrix-dashboard

spring-cloud-starter-ribbon

spring-cloud-starter-netflix-ribbon

spring-cloud-starter-spectator

spring-cloud-starter-netflix-spectator

spring-cloud-starter-turbine

spring-cloud-starter-netflix-turbine

spring-cloud-starter-turbine-stream

spring-cloud-starter-netflix-turbine-stream

spring-cloud-starter-zuul

spring-cloud-starter-netflix-zuul

### [](#deprecated-starters-removed-1)Deprecated starters removed

The following modules were updated as part of Finchley.M3:

Module

Version

Spring Cloud Dependencies

2.0.0.M4

Spring Cloud Sleuth

2.0.0.M3

Spring Cloud Gateway

2.0.0.M3

Spring Cloud Config

2.0.0.M3

Spring Cloud Cloudfoundry

2.0.0.M1

Spring Cloud Build

2.0.0.M4

Spring Cloud Consul

2.0.0.M2

Spring Cloud Netflix

2.0.0.M3

Spring Cloud Security

2.0.0.M1

Spring Cloud Contract

2.0.0.M3

Spring Cloud Bus

2.0.0.M2

Spring Boot Starter

2.0.0.M5

Spring Cloud Aws

2.0.0.M1

Spring Boot Dependencies

2.0.0.M5

Spring Cloud Stream

Elmhurst.M2

Spring Cloud Task

2.0.0.M1

Spring Cloud Vault

2.0.0.M3

Spring Cloud Zookeeper

2.0.0.M2

Spring Boot

2.0.0.M5

Spring Cloud Commons

2.0.0.M3

### [](#feedback)Feedback

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

### [](#getting-started)Getting Started

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
            <version>Finchley.M3</version>
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
        classpath "io.spring.gradle:dependency-management-plugin:1.0.3.RELEASE"
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M3'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
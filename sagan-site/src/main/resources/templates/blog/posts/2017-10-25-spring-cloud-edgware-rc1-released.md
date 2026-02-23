---
title: Spring Cloud Edgware.RC1 Released
source: https://spring.io/blog/2017/10/25/spring-cloud-edgware-rc1-released
scraped: 2026-02-23T16:17:13.171Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 25, 2017 | 0 Comments
---

# Spring Cloud Edgware.RC1 Released

_Releases | Spencer Gibb |  October 25, 2017 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#renamed-starters)Renamed starters

A number of starters did not follow normal Spring Cloud naming conventions. In Edgware, use of the deprecated starter will log a warning with the name of the new starter to use in its place. Below is a table of the deprecated starters and their replacements

Deprecated

Edgware Starter

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

spring-cloud-starter-turbine-amqp

DELETED

spring-cloud-starter-turbine-stream

spring-cloud-starter-netflix-turbine-stream

spring-cloud-starter-zuul

spring-cloud-starter-netflix-zuul

### [](#spring-cloud-bus)Spring Cloud Bus

Updates to allow Bus clients to implement remote events in independent packages.

### [](#spring-cloud-task)Spring Cloud Task

See the [release announcement](https://spring.io/blog/2017/09/25/spring-cloud-task-1-2-2-release-is-now-available).

### [](#spring-cloud-netflix)Spring Cloud Netflix

`@EnableDiscoveryClient` is now optional. Including `spring-cloud-starter-netflix` will automatically assume the application should register and be a discovery client. To disable auto-registration set `spring.cloud.service-registry.auto-registration.enabled=false`. Hystrix and Eureka Server are now tested via Spring Cloud Contract.

### [](#spring-cloud-consul)Spring Cloud Consul

Consul DiscoveryClient now supports a datacenter parameter. HTTPS checks with self-signed certificates are now supported.

### [](#spring-cloud-contract)Spring Cloud Contract

Wiremock has been updated and custom extensions are now supported. URL segments can now be referenced in body response verification.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Zipkin 2 support has been added along with numerous minor enhancements.

### [](#spring-cloud-stream)Spring Cloud Stream

See the [release annoucement](https://spring.io/blog/2017/10/06/spring-cloud-stream-1-3-goes-ga);

### [](#spring-cloud-config)Spring Cloud Config

A new JDBC `EnvironmentRepository` was created.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

The ability to set the instance ID was added.

### [](#spring-cloud-commons)Spring Cloud Commons

As mentioned above, `@EnableDiscoveryClient` is now optional.

The following modules were updated as part of Edgware.RC1:

Module

Version

Spring Cloud Bus

1.3.2.RC1

Spring Cloud Task

1.2.2.RELEASE

Spring Cloud Netflix

1.4.0.RC1

Spring Cloud Consul

1.3.0.RC1

Spring Cloud Contract

1.2.0.RC1

Spring Cloud Sleuth

1.3.0.RC1

Spring Cloud Stream

Ditmars.RELEASE

Spring Cloud Dependencies

1.3.5.RELEASE

Spring Cloud Aws

1.2.2.RC1

Spring Cloud Config

1.4.0.RC1

Spring Boot

1.5.6.RELEASE

Spring Cloud Zookeeper

1.2.0.RC1

Spring Cloud Gateway

1.0.0.RC1

Spring Cloud Cloudfoundry

1.1.0.RELEASE

Spring Cloud Commons

1.3.0.RC1

Spring Boot Dependencies

1.5.6.RELEASE

Spring Cloud Build

1.3.5.RELEASE

Spring Boot Starter

1.5.6.RELEASE

Spring Cloud Security

1.2.1.RELEASE

Spring Cloud Vault

1.1.0.RC1

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
            <version>Edgware.RC1</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.RC1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
---
title: Spring Cloud Greenwich.RC1 available now
source: https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now
scraped: 2026-02-23T14:17:50.754Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 12, 2018 | 5 Comments
---

# Spring Cloud Greenwich.RC1 available now

_Releases | Spencer Gibb |  December 12, 2018 | 5 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes).

## [](#end-of-life-eol-reminder)End of Life (EOL) Reminder

The Dalston release train will reach EOL status at the end of 2018.

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

This milestone is compatible with Spring Boot 2.1.1.RELEASE. Updates were made across the projects for Java 11 compatibility.

Go to the [Greenwich.RC1 github project](https://github.com/orgs/spring-cloud/projects/18) to see all issues assigned to this release.

### [](#spring-cloud-netflix-projects-entering-maintenance-mode)Spring Cloud Netflix Projects Entering Maintenance Mode

Recently, Netflix [announced](https://github.com/Netflix/Hystrix#hystrix-status) that Hystrix is entering maintenance mode. Ribbon has been in a [similar state](https://github.com/Netflix/ribbon#project-status-on-maintenance) since 2016. Although Hystrix and Ribbon are now in maintenance mode, they are still deployed at scale at Netflix.

The Hystrix Dashboard and Turbine have been superseded by Atlas. The last commits to these project are 2 years and 4 years ago respectively. Zuul 1 and Archaius 1 have both been superseded by later versions that are not backward compatible.

The following Spring Cloud Netflix modules and corresponding starters will be placed into maintenance mode:

1.  spring-cloud-netflix-archaius
2.  spring-cloud-netflix-hystrix-contract
3.  spring-cloud-netflix-hystrix-dashboard
4.  spring-cloud-netflix-hystrix-stream
5.  spring-cloud-netflix-hystrix
6.  spring-cloud-netflix-ribbon
7.  spring-cloud-netflix-turbine-stream
8.  spring-cloud-netflix-turbine
9.  spring-cloud-netflix-zuul

This does not include the Eureka or concurrency-limits modules.

#### [](#what-is-maintenance-mode)What is Maintenance Mode?

Placing a module in maintenance mode means that the Spring Cloud team will no longer be adding new features to the module. We will fix blocker bugs and security issues, and we will also consider and review small pull requests from the community.

We intend to continue to support these modules for a period of **at least** a year from the general availability of the [Greenwich release train](https://github.com/spring-cloud/spring-cloud-release/milestones?direction=asc&sort=due_date).

#### [](#replacements)Replacements

We recommend the following as replacements for the functionality provided by these modules.

Current

Replacement

Hystrix

[Resilience4j](https://github.com/resilience4j/resilience4j)

Hystrix Dashboard / Turbine

Micrometer + Monitoring System

Ribbon

Spring Cloud Loadbalancer

Zuul 1

Spring Cloud Gateway

Archaius 1

Spring Boot external config + Spring Cloud Config

Look for a future blog post on Spring Cloud Loadbalancer and integration with a new Netflix project Concurrency Limits.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Enhancements were made to use the `KubernetesDiscoveryClient` during bootstrap as well as many documentation updates.

### [](#spring-cloud-commons)Spring Cloud Commons

A change was made to how BootstrapConfiguration classes are loaded to accomodate behavior in Java 11.

### [](#spring-cloud-contract)Spring Cloud Contract

Bug fixes.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Support was added for `@QueryMap` annotation.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

Support was added for the new `ServiceInstance.instanceId` field.

### [](#spring-cloud-stream)Spring Cloud Stream

See Fishtown.RC2 [blog post](https://spring.io/blog/2018/11/19/spring-cloud-stream-fishtown-rc2-2-1-0-rc2-release-announcement).

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Support for instrumenting gRPC.

### [](#spring-cloud-bus)Spring Cloud Bus

Fixed a critical bug that prevented Bus from functioning properly with latest version of Spring Cloud Stream.

### [](#spring-cloud-gcp)Spring Cloud GCP

Documentation updates and bug fixes.

### [](#spring-cloud-function)Spring Cloud Function

Support for Kotlin lambdas and other enhancements and bug fixes.

### [](#spring-cloud-consul)Spring Cloud Consul

Support was added for the new `ServiceInstance.instanceId` field and bug fixes.

### [](#spring-cloud-config)Spring Cloud Config

Fixes for webhooks and Spring Cloud Bus.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Support was added for multiple paths and hosts in their respective route predicates and to customize the HTTP status code returned in certain situations, as well as bug fixes.

### [](#spring-cloud-module-versions)Spring Cloud Module Versions

The following modules were updated as part of Greenwich.RC1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Kubernetes | 1.0.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/7?closed=1)) | Spring Cloud Commons | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/57?closed=1)) | Spring Cloud Contract | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/45?closed=1)) | Spring Cloud Openfeign | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/7?closed=1)) | Spring Cloud Zookeeper | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/24?closed=1)) | Spring Cloud Stream | Fishtown.RC2 | ([blog](https://spring.io/blog/2018/11/19/spring-cloud-stream-fishtown-rc2-2-1-0-rc2-release-announcement)) | Spring Cloud Sleuth | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/55?closed=1)) | Spring Cloud Bus | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/32?closed=1)) | Spring Cloud Netflix | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/71?closed=1)) | Spring Cloud Gcp | 1.1.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-gcp/milestone/10?closed=1)) | Spring Cloud Cloudfoundry | 2.1.0.RC2 |   | Spring Cloud Function | 2.0.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/13?closed=1)) | Spring Cloud Task | 2.1.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/29?closed=1)) | Spring Cloud Consul | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/35?closed=1)) | Spring Cloud Config | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/59?closed=1)) | Spring Cloud Gateway | 2.1.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/18?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), [Gitter](https://gitter.im/spring-cloud/spring-cloud), [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
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
            <version>Greenwich.RC1</version>
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

```groovy
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.6.RELEASE"
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.RC1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
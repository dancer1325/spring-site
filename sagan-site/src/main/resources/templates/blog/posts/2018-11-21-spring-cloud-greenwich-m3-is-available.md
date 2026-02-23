---
title: Spring Cloud Greenwich.M3 is available
source: https://spring.io/blog/2018/11/21/spring-cloud-greenwich-m3-is-available
scraped: 2026-02-23T15:06:36.133Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  November 21, 2018 | 6 Comments
---

# Spring Cloud Greenwich.M3 is available

_Releases | Spencer Gibb |  November 21, 2018 | 6 Comments_

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes).

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

This milestone is compatible with Spring Boot 2.1.0.RELEASE. Changes have been made for Java 11 compatibility. See the [Github Project](https://github.com/orgs/spring-cloud/projects/11) for more information.

### [](#spring-cloud-bus)Spring Cloud Bus

Fixed a compatiblity issue with Spring Cloud Stream.

### [](#spring-cloud-commons)Spring Cloud Commons

Added `instanceId` to `ServiceInstance` interface. Also added a [`ReactiveLoadBalancer`](https://github.com/spring-cloud/spring-cloud-commons/pull/402) interface and implementation using Reactor.

### [](#spring-cloud-config)Spring Cloud Config

Various bug fixes and small enhancements.

### [](#spring-cloud-contract)Spring Cloud Contract

Support was added for `WebTestClient` and JUnit 5 extensions.

### [](#spring-cloud-consul)Spring Cloud Consul

Bug fixes.

### [](#spring-cloud-function)Spring Cloud Function

Minor enhacements and bug fixes.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Added a rewrite response header filter and bug fixes.

### [](#spring-cloud-gcp)Spring Cloud Gcp

Minor enhacements and bug fixes.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

`ServiceInstance` metadata can now be configured to come from Kubernetes Labels, Annotations and Ports. Some other smal enhacements and bug fixes.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Various version upgrades.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Added missing configuration metadata.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Various improvements to Reactor and Reactor Netty instrumentation and other minor enhancements.

### [](#spring-cloud-stream)Spring Cloud Stream

Minor enhacements and bug fixes.

### [](#spring-cloud-task)Spring Cloud Task

Now enabled thru auto-configuration.

### [](#spring-cloud-vault)Spring Cloud Vault

Adds support for Azure and GCP authentication and some dependency updates.

The following modules were updated as part of Greenwich.M3:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud | Greenwich.M3 |   | Spring Cloud Aws | 2.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/24?closed=1)) | Spring Cloud Bus | 2.1.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/31?closed=1)) | Spring Cloud Cloudfoundry | 2.1.0.M1 |   | Spring Cloud Commons | 2.1.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/54?closed=1)) | Spring Cloud Config | 2.1.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/53?closed=1)) | Spring Cloud Contract | 2.1.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/38?closed=1)) | Spring Cloud Consul | 2.1.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/36?closed=1)) | Spring Cloud Function | 2.0.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/13?closed=1)) | Spring Cloud Gateway | 2.1.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/19?closed=1)) | Spring Cloud Gcp | 1.1.0.M3 |   | Spring Cloud Kubernetes | 1.0.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/6?closed=1)) | Spring Cloud Netflix | 2.1.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/70?closed=1)) | Spring Cloud Openfeign | 2.1.0.M2 |   | Spring Cloud Security | 2.1.0.M1 |   | Spring Cloud Sleuth | 2.1.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/54?closed=1)) | Spring Cloud Stream | Fishtown.RC2 | [Blog post](https://spring.io/blog/2018/11/19/spring-cloud-stream-fishtown-rc2-2-1-0-rc2-release-announcement) | Spring Cloud Task | 2.1.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/29?closed=1)) | Spring Cloud Vault | 2.1.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/25?closed=1)) | Spring Cloud Zookeeper | 2.1.0.M1 |  

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
            <version>Greenwich.M3</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.M3'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
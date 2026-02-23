---
title: Spring Cloud 2020.0.0-M5 (aka Ilford) is Available
source: https://spring.io/blog/2020/11/18/spring-cloud-2020-0-0-m5-aka-ilford-is-available
scraped: 2026-02-23T13:41:11.082Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  November 18, 2020 | 0 Comments
---

# Spring Cloud 2020.0.0-M5 (aka Ilford) is Available

_Releases | Spencer Gibb |  November 18, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 5 (M5) of the [Spring Cloud 2020](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2020 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-2020-release-train)Notable Changes in the 2020 Release Train

This release requires Spring Boot 2.4.0.

Support for OpenTelemetry was added in Sleuth.

Support for RSocket was added in Bus.

Please see [the wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/46).

### [](#spring-cloud-bus)Spring Cloud Bus

Support for [RSocket](https://github.com/spring-cloud/spring-cloud-bus/pull/239) was added via Spring Cloud Function RSocket support. This does not require Spring Cloud Stream.

### [](#spring-cloud-commons)Spring Cloud Commons

Support was added for [retry](https://github.com/spring-cloud/spring-cloud-commons/issues/659) in reactive Spring Cloud Loadbalancer.

### [](#spring-cloud-config)Spring Cloud Config

[Submodule](https://github.com/spring-cloud/spring-cloud-config/issues/717) support was added to git Environment Repositories.

### [](#spring-cloud-contract)Spring Cloud Contract

Support for handling empty lists and maps in responses was [added](https://github.com/spring-cloud/spring-cloud-contract/pull/1556).

### [](#spring-cloud-gateway)Spring Cloud Gateway

Token Relay support was migrated from Spring Cloud Security to [Gateway](https://github.com/spring-cloud/spring-cloud-gateway/issues/1975). Token refreshing was also added.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

A new module based on the official Kubernetes Java Client was [added](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/661).

### [](#spring-cloud-netflix)Spring Cloud Netflix

`EurekaHealthCheckHandler` now considers [`ReactiveHealthIndicator`](https://github.com/spring-cloud/spring-cloud-netflix/pull/3903).

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

[Adds the ability](https://github.com/spring-cloud/spring-cloud-openfeign/issues/284) to configure client to send default headers and query parameters.

### [](#spring-cloud-security)Spring Cloud Security

Token Relay support was moved to Spring Cloud Gateway (see above).

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Support for OpenTelemetry was [added](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1497).

---

The following modules were updated as part of 2020.0.0-M5:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Bus | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/46?closed=1)) | Spring Cloud Circuitbreaker | 2.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/6?closed=1)) | Spring Cloud Cli | 3.0.0-M5 |  
| Spring Cloud Cloudfoundry | 3.0.0-M5 |  
| Spring Cloud Commons | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/80?closed=1)) | Spring Cloud Config | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/82?closed=1)) | Spring Cloud Consul | 3.0.0-M5 |  
| Spring Cloud Contract | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/70?closed=1)) | Spring Cloud Gateway | 3.0.0-M5 |  
| Spring Cloud Kubernetes | 2.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/24?closed=1)) | Spring Cloud Netflix | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/95?closed=1)) | Spring Cloud Openfeign | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/30?closed=1)) | Spring Cloud Security | 3.0.0-M5 |  
| Spring Cloud Sleuth | 3.0.0-M5 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/81?closed=1)) | Spring Cloud Starter Build | 2020.0.0-M5 |  
| Spring Cloud Vault | 3.0.0-M5 |  
| Spring Cloud Zookeeper | 3.0.0-M5 |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
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
            <version>2020.0.0-M5</version>
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
    classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
  }
}

repositories {
  maven {
    url 'https://repo.spring.io/milestone'
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0-M5'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
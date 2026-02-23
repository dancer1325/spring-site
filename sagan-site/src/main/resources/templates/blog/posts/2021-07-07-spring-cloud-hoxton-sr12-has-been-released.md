---
title: Spring Cloud Hoxton.SR12 has been released
source: https://spring.io/blog/2021/07/07/spring-cloud-hoxton-sr12-has-been-released
scraped: 2026-02-23T13:19:21.233Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  July 07, 2021 | 0 Comments
---

# Spring Cloud Hoxton.SR12 has been released

_Releases | Olga Maciaszek-Sharma |  July 07, 2021 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 12 (SR12) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR12/). You can check out the Hoxton [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

See all issues included in this release [here](https://github.com/orgs/spring-cloud/projects/62).

This was primarily a bug fix and documentation release. Hoxton.SR12 is compatible with Spring Boot 2.3.x and 2.2.x.

**NOTE**: This will be the last regularly scheduled release of the Hoxton Release Train. It now enters a special maintenance period for security fixes and critical bugs until the end of Feb 2022 (which follows the lifecycle of [Spring Boot 2.3.x](https://github.com/spring-projects/spring-boot/wiki/Supported-Versions#released-versions)). See [the wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Supported-Versions#supported-releases) for more information.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added `TaskSchedulerWrapper` ([#974](https://github.com/spring-cloud/spring-cloud-commons/pull/974))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Enabled disabling `GatewayRedisAutoConfiguration` ([#2052](https://github.com/spring-cloud/spring-cloud-gateway/issues/2052))
-   Made the scheme of the URI for the route should be case-insensitive ([#2207](https://github.com/spring-cloud/spring-cloud-gateway/issues/2207))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Improved support for `SpringFormEncoder` ([#549](https://github.com/spring-cloud/spring-cloud-openfeign/issues/549))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Special characters support added for `TraceProxyRequestHelper` ([#3873](https://github.com/spring-cloud/spring-cloud-netflix/issues/3873))
-   Fixed propagating status to registry when `eureka.client.healthcheck.enabled= true` ([#1571](https://github.com/spring-cloud/spring-cloud-netflix/issues/1571))

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

-   Reactive Resilience4J CircuitBreakers can now be configured via configuration properties ([#107](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/107))

The following modules were updated as part of Hoxton.SR12:

Module

Version

Issues

Spring Cloud Starter Build

Hoxton.SR12

Spring Cloud Netflix

2.2.9.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/103?closed=1))

Spring Cloud Openfeign

2.2.9.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/37?closed=1))

Spring Cloud Gateway

2.2.9.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/52?closed=1)

Spring Cloud Commons

2.2.9.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/91?closed=1))

Spring Cloud Contract

2.2.8.RELEASE

Spring Cloud Kubernetes

1.1.10.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/32?closed=1))

Spring Cloud CircuitBreaker

1.0.6.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/10?closed=1))

Spring Cloud Stream

Horsham.SR13

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR12</version>
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
    classpath "io.spring.gradle:dependency-management-plugin:1.0.11.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR12'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
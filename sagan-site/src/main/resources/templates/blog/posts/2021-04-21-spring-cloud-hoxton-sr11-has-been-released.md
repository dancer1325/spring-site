---
title: Spring Cloud Hoxton.SR11 has been released
source: https://spring.io/blog/2021/04/21/spring-cloud-hoxton-sr11-has-been-released
scraped: 2026-02-23T13:25:31.351Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Haytham Mohamed |  April 22, 2021 | 0 Comments
---

# Spring Cloud Hoxton.SR11 has been released

_Releases | Haytham Mohamed |  April 22, 2021 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 11 (SR11) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR11/). You can check out the Hoxton [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

See all issues included in this release [here](https://github.com/orgs/spring-cloud/projects/57).

This was primarily a bug fix and documentation release. Hoxton.SR11 is compatible with Spring Boot 2.3.x and 2.2.x.

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Add LoadBalancerRequestTransformer for WebClient-backed load-balancing](https://github.com/spring-cloud/spring-cloud-commons/issues/873)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Adds support for evicting connections](https://github.com/spring-cloud/spring-cloud-gateway/issues/2153)

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   [Upgrade Feign to 10.12](https://github.com/spring-cloud/spring-cloud-openfeign/issues/530)
-   [Add support for Apache HC5](https://github.com/spring-cloud/spring-cloud-openfeign/issues/486)
-   [Support Pageable, Sort annotated as SpringQueryMap to use with RequestBody](https://github.com/spring-cloud/spring-cloud-openfeign/pull/502)
-   [Add `FeignClientProperties.FeignClientConfiguration.followRedirects` property](https://github.com/spring-cloud/spring-cloud-openfeign/issues/493)
-   [Improve `SpringEncoder` Charset determination](https://github.com/spring-cloud/spring-cloud-openfeign/issues/357)
-   [Support multiple qualifiers in `FeignClient` annotation](https://github.com/spring-cloud/spring-cloud-openfeign/issues/471)

### [](#spring-cloud-config)Spring Cloud Config

-   [Support encoded URIs](https://github.com/spring-cloud/spring-cloud-config/issues/1621)

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

-   [Support Resilience4J Configuration Properties](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/94)
-   [Support Resilience4J Bulkhead Module](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/86)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   [Spring Cloud Kubernetes DiscoveryClient Initialized With Health Indicator](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/517)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Disable ribbon auto config if consul discovery disabled](https://github.com/spring-cloud/spring-cloud-consul/issues/583)

The following modules were updated as part of Hoxton.SR11:

Module

Version

Issues

Spring Cloud Starter Build

Hoxton.SR11

Spring Cloud Netflix

2.2.8.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/101?closed=1))

Spring Cloud Openfeign

2.2.8.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/35?closed=1))

Spring Cloud Config

2.2.8.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/90?closed=1))

Spring Cloud Gateway

2.2.8.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/50?closed=1))

Spring Cloud Gcp

1.2.8.RELEASE

Spring Cloud Commons

2.2.8.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/88?closed=1))

Spring Cloud Consul

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/55?closed=1))

Spring Cloud Contract

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/76?closed=1))

Spring Cloud Kubernetes

1.1.9.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/23?closed=1))

Spring Cloud Sleuth

2.2.8.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/89?closed=1))

Spring Cloud Stream

Horsham.SR12

Spring Cloud Function

3.0.14.RELEASE

Spring Cloud Bus

2.2.4.RELEASE

Spring Cloud Circuit Breaker

1.0.5.RELEASE

Spring Cloud Security

2.2.5.RELEASE

Spring Cloud ZooKeeper

2.2.5.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/35?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR11</version>
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
    classpath "io.spring.gradle:dependency-management-plugin:1.0.10.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR11'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
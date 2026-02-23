---
title: Spring Cloud Hoxton.SR10 has been released
source: https://spring.io/blog/2021/02/11/spring-cloud-hoxton-sr10-has-been-released
scraped: 2026-02-23T13:32:23.446Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  February 11, 2021 | 0 Comments
---

# Spring Cloud Hoxton.SR10 has been released

_Releases | Olga Maciaszek-Sharma |  February 11, 2021 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 10 (SR10) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR10/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

See all issues included in this release [here](https://github.com/orgs/spring-cloud/projects/47).

This was primarily a bug fix and documentation release. Hoxton.SR10 is compatible with Spring Boot 2.3.x and 2.2.x.

### [](#fix-for-cve-2021-22113)Fix for CVE-2021-22113

This release contains the fix for CVE-2021-22113. Please find the report [here](https://tanzu.vmware.com/security/cve-2021-22113).

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Random algorithm added for Spring Cloud LoadBalancer](https://github.com/spring-cloud/spring-cloud-commons/issues/688)
-   [Sticky implementation added for Spring Cloud LoadBalancer](https://github.com/spring-cloud/spring-cloud-commons/issues/689)
-   [Backported standalone `RetryableLoadBalancerExchangeFilterFunction`](https://github.com/spring-cloud/spring-cloud-commons/issues/856)
-   Added the possibility to [refetch the instances for health-check](https://github.com/spring-cloud/spring-cloud-commons/pull/855) in Spring Cloud LoadBalancer

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Fixed CVE-2021-22113
-   Several dependencies upgraded

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   [Encoding path variables with `/` added](https://github.com/spring-cloud/spring-cloud-openfeign/issues/3)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Several dependencies upgraded

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Improved the efficiency of messaging TracingChannelInterceptor](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1742)
-   [Displaying method names added](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1772)

### [](#spring-cloud-config)Spring Cloud Config

-   Added [Index regeneration](https://github.com/spring-cloud/spring-cloud-config/pull/1593)
-   Added [the option to clone git submodules at start](https://github.com/spring-cloud/spring-cloud-config/issues/717)
-   Improved [root exception handling](https://github.com/spring-cloud/spring-cloud-config/pull/1743)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Added LoadBalancer support for `serverListQueryTags`](https://github.com/spring-cloud/spring-cloud-consul/issues/680)
-   Several dependencies upgraded

---

The following modules were updated as part of Hoxton.SR10:

Module

Version

Issues

Spring Cloud Starter Build

Hoxton.SR10

Spring Cloud Netflix

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/96?closed=1))

Spring Cloud Openfeign

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/31?closed=1))

Spring Cloud Config

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/86?closed=1))

Spring Cloud Aws

2.2.6.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/36?closed=1))

Spring Cloud Gateway

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/44?closed=1))

Spring Cloud Gcp

1.2.7.RELEASE

Spring Cloud Commons

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/82?closed=1))

Spring Cloud Consul

2.2.6.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/52?closed=1))

Spring Cloud Contract

2.2.6.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/71?closed=1))

Spring Cloud Kubernetes

1.1.8.RELEASE

Spring Cloud Sleuth

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/83?closed=1))

Spring Cloud Vault

2.2.7.RELEASE

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/44?closed=1))

Spring Cloud CLI

2.2.4.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR10</version>
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR10'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
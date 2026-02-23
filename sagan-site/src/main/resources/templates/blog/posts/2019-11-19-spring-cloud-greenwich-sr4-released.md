---
title: Spring Cloud Greenwich.SR4 Released
source: https://spring.io/blog/2019/11/19/spring-cloud-greenwich-sr4-released
scraped: 2026-02-23T14:26:25.916Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  November 19, 2019 | 0 Comments
---

# Spring Cloud Greenwich.SR4 Released

_Releases | Ryan Baxter |  November 19, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 4 (SR4) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.SR4/). You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes).

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

Spring Cloud Greenwich.SR4 is built upon Spring Boot 2.1.10.RELEASE.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/16?closed=1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/milestone/65?closed=1)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Upgraded to OpenFeign 10.4.0
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/17?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/milestone/56?closed=1)

### [](#spring-cloud-vault)Spring Cloud Vault

-   Dependency and documentation changes
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-vault/milestone/34?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/milestone/83?closed=1)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.1.6.RELEASE)

### [](#spring-cloud-config)Spring Cloud Config

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/milestone/70?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added support for [Spring Cloud LoadBalancer](https://cloud.spring.io/spring-cloud-static/Greenwich.SR4/single/spring-cloud.html#_loadbalancerclient_filter)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/milestone/28?closed=1)

The following modules were updated as part of Greenwich.SR4:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Security | 2.1.5.RELEASE |  
| Spring Cloud Starter | Greenwich.SR4 |  
| Spring Cloud Kubernetes | 1.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/16?closed=1)) | Spring Cloud Commons | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/65?closed=1)) | Spring Cloud Openfeign | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/17?closed=1)) | Spring Cloud Dependencies Parent | 2.1.9.RELEASE |  
| Spring Cloud Stream | Fishtown.SR4 |  
| Spring Cloud Contract | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/56?closed=1)) | Spring Cloud Consul | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/43?closed=1)) | Spring Cloud Vault | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/34?closed=1)) | Spring Cloud Dependencies | Greenwich.SR4 |  
| Spring Cloud Zookeeper | 2.1.4.RELEASE |  
| Spring Cloud Task | 2.1.3.RELEASE |  
| Spring Cloud Bus | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/41?closed=1)) | Spring Cloud Release | Greenwich.SR4 |  
| Spring Cloud Cloudfoundry | 2.1.4.RELEASE |  
| Spring Cloud Build | 2.1.9.RELEASE |  
| Spring Cloud Netflix | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/83?closed=1)) | Spring Cloud | Greenwich.SR4 |  
| Spring Cloud Sleuth | 2.1.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.1.6.RELEASE)) | Spring Cloud Config | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/70?closed=1)) | Spring Cloud Gateway | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/28?closed=1)) | Spring Cloud Function | 2.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/18?closed=1)) | Spring Cloud Gcp | 1.1.4.RELEASE |  
| Spring Cloud Starter Parent | Greenwich.SR4 |  
| Spring Cloud Aws | 2.1.4.RELEASE |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.SR4</version>
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

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.SR4'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
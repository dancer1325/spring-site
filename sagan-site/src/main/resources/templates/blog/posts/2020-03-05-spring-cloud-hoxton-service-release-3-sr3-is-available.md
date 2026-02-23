---
title: Spring Cloud Hoxton Service Release 3 (SR3) is available.
source: https://spring.io/blog/2020/03/05/spring-cloud-hoxton-service-release-3-sr3-is-available
scraped: 2026-02-23T14:09:29.092Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Olga Maciaszek-Sharma |  March 05, 2020 | 0 Comments
---

# Spring Cloud Hoxton Service Release 3 (SR3) is available.

_Engineering | Olga Maciaszek-Sharma |  March 05, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 3 (SR3) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR3/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#important-security-advisory)Important Security Advisory

Spring Cloud Config contains fixes for [CVE-2020-5405](https://pivotal.io/security/cve-2020-5405).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

This milestone was primarily a bugfix release.

Please see the Hoxton.SR3 [Github Project](https://github.com/orgs/spring-cloud/projects/36) for all issues closed.

This milestone release is built with Spring Boot 2.2.5.RELEASE.

### [](#spring-cloud-config)Spring Cloud Config

**NOTE**: *The writable `env` endpoint has been disabled by default. To re-enable this please set `management.endpoint.env.post.enabled=true`. Please make sure this endpoint is not publicly available.*

Possibility to override `ConfigTokenProvider` was added. Performance issues with `KeyStoreTestEncryptorLocator` were fixed.

### [](#spring-cloud-contract)Spring Cloud Contract

Support added for Spring Cloud LoadBalancer in StubRunner.

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

Support added for creating and customizing circuit breakers in advance.

### [](#spring-cloud-commons)Spring Cloud Commons

Support was added for instance health checks in Spring Cloud LoadBalancer. LoadBalancer request context was exposed via the API.

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

OpenFeign was upgraded to 10.7.4. Support was added for `@MatrixVariable`.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Support was added for `FeignBlockingLoadBalancerClient`.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Support was added for rate limits below 1 req/s. Enhancements to `RetryFilter` were added. `ServiceInstance` metadata was added to `RouteDefinition` metadata. Header configuration list was provided for spring-cloud-gateway-mvc.

The following modules were updated as part of Hoxton.SR3:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Config | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/75?closed=1)) | Spring Cloud Cloudfoundry | 2.2.1.RELEASE |  
| Spring Cloud Vault | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/37?closed=1)) | Spring Cloud Aws | 2.2.1.RELEASE |  
| Spring Cloud Bus | 2.2.1.RELEASE |  
| Spring Cloud Cli | 2.2.1.RELEASE |  
| Spring Cloud Gcp | 1.2.2.RELEASE |  
| Spring Cloud Contract | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/62?closed=1)) | Spring Cloud Consul | 2.2.2.RELEASE |  
| Spring Cloud Starter | Hoxton.SR3 |  
| Spring Cloud Dependencies | Hoxton.SR3 |  
| Spring Cloud Starter Parent | Hoxton.SR3 |  
| Spring Cloud Sleuth | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/73?closed=1)) | Spring Cloud Commons | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/71?closed=1)) | Spring Cloud Openfeign | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/22?closed=1)) | Spring Cloud Zookeeper | 2.2.0.RELEASE |  
| Spring Cloud Kubernetes | 1.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/18?closed=1)) | Spring Cloud Security | 2.2.1.RELEASE |  
| Spring Cloud Circuitbreaker | 1.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/4?closed=1)) | Spring Cloud Stream | Horsham.SR3 | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/71?closed=1)) | Spring Cloud Gateway | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/35?closed=1)) | Spring Cloud Netflix | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/86?closed=1)) | Spring Cloud Function | 3.0.3.RELEASE |  
| Spring Cloud Task | 2.2.3.RELEASE |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR3</version>
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
classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
}
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
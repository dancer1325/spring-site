---
title: Spring Cloud Hoxton.SR9 has been released
source: https://spring.io/blog/2020/11/10/spring-cloud-hoxton-sr9-has-been-released
scraped: 2026-02-23T13:42:10.905Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  November 10, 2020 | 0 Comments
---

# Spring Cloud Hoxton.SR9 has been released

_Releases | Olga Maciaszek-Sharma |  November 10, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 9 (SR9) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR9/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

See all issues included in this release [here](https://github.com/orgs/spring-cloud/projects/45).

This was primarily a bug fix and documentation release.

See all of the included issues and pull requests at the [GitHub project](https://github.com/orgs/spring-cloud/projects/45). Hoxton.SR9 is compatible with Spring Boot 2.3.x and 2.2.x.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added support for [setting SecureHeaders filter header values per route](https://github.com/spring-cloud/spring-cloud-gateway/commit/fffcd23214dc60fe0da003cc1076bc50d9a6c0bd)
-   Added support for [exposing RouteDefinitions via an actuator endpoint](https://github.com/spring-cloud/spring-cloud-gateway/pull/1942)
-   Added [`BooleanOpSpec.not() ` predicate operator](https://github.com/spring-cloud/spring-cloud-gateway/commit/fa0ffd0a2b456e0de85fd20beed73b6579c638c7)
-   [Improved reactive LoadBalancer performance](https://github.com/spring-cloud/spring-cloud-gateway/commit/e4fc804fc2f3a4d9e2cbe3be6853a19ef034478d)
-   Added support for [disabling filters and predicates by a property](https://github.com/spring-cloud/spring-cloud-gateway/commit/d8e53f118850ac0cd93f38b26d46f1e69dc8b829)
-   Added the [possibility to customize gateway metrics prefix](https://github.com/spring-cloud/spring-cloud-gateway/commit/f09d8b2c5d390cf8f2ca905404f6bd03be50615e)
-   Support [case-insensitive MVC headers matching](https://github.com/spring-cloud/spring-cloud-gateway/pull/1930)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added [support for blocking retries in SC LoadBalancer](https://github.com/spring-cloud/spring-cloud-commons/pull/832)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Upgraded various dependencies
-   Added [support for `ReactiveHealthIndicator`](https://github.com/spring-cloud/spring-cloud-netflix/pull/3903)

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Added the possibility [to configure clients to send default headers](https://github.com/spring-cloud/spring-cloud-openfeign/pull/420)
-   Added support for [sorting request interceptors](https://github.com/spring-cloud/spring-cloud-openfeign/issues/393)
-   Added support for [Spring Retry with Spring Cloud LoadBalancer](https://github.com/spring-cloud/spring-cloud-openfeign/commit/db3513b97b3de52f48b477d2866ffde50e97b53f)
-   Upgraded various dependencies

### [](#spring-cloud-contract)Spring Cloud Contract

-   Added [option to disable `.git` suffix in git URLs](https://github.com/spring-cloud/spring-cloud-contract/pull/1539)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Added [instrumentation for `RetryableFeignBlockingLoadBalancerClient`](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1759)

### [](#spring-cloud-config)Spring Cloud Config

-   Added support for [optionally sending `application/json` instead of `v2` media type](https://github.com/spring-cloud/spring-cloud-config/issues/1715)
-   [Make throwing an exception when a repository can't be read optional](https://github.com/spring-cloud/spring-cloud-config/commit/52e2d9bf64f80ee9cc28954b020849132b1f8328)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Allowed `ConsulHealthIndicator` to bypass the services query](https://github.com/spring-cloud/spring-cloud-consul/commit/4a6d7027f04f40e2dfe0aaa2a3f5bc6373e37e30)
-   [Allowed ignoring SQL exceptions](https://github.com/spring-cloud/spring-cloud-config/pull/1653)

---

The following modules were updated as part of Hoxton.SR9:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Starter Build | Hoxton.SR9 |  
| Spring Cloud Netflix | 2.2.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/94?closed=1)) | Spring Cloud Openfeign | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/29?closed=1)) | Spring Cloud Config | 2.2.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/81?closed=1)) | Spring Cloud Aws | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/31?closed=1)) | Spring Cloud Gateway | 2.2.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/42?closed=1)) | Spring Cloud Gcp | 1.2.6.RELEASE |  
| Spring Cloud Commons | 2.2.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/79?closed=1)) | Spring Cloud Consul | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/50?closed=1)) | Spring Cloud Contract | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/69?closed=1)) | Spring Cloud Kubernetes | 1.1.7.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/25?closed=1)) | Spring Cloud Sleuth | 2.2.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/82?closed=1)) | Spring Cloud Vault | 2.2.6.RELEASE |  
| Spring Cloud Zookeeper | 2.2.4.RELEASE |  
| Spring Cloud CLI | 2.2.3.RELEASE |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR9</version>
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR9'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
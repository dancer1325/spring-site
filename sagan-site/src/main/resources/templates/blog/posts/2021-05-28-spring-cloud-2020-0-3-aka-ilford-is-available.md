---
title: Spring Cloud 2020.0.3 (aka Ilford) Is Available
source: https://spring.io/blog/2021/05/28/spring-cloud-2020-0-3-aka-ilford-is-available
scraped: 2026-02-23T13:22:17.643Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  May 28, 2021 | 0 Comments
---

# Spring Cloud 2020.0.3 (aka Ilford) Is Available

_Releases | Marcin Grzejszczak |  May 28, 2021 | 0 Comments_

On behalf of the community, I am pleased to announce that Service Release 3 of the [Spring Cloud 2020.0](https://cloud.spring.io) Release Train (2020.0.3) is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2020.0.3/). You can check out the 2020.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#202003).

## [](#notable-changes-in-the-202003-release-train)Notable Changes in the 2020.0.3 Release Train

The biggest change in this release was support for Spring Boot 2.5. Besides that, this release is primarily for bug fixes and dependency upgrades.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/61).

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added the possibility to disable load-balancing by property ([#940](https://github.com/spring-cloud/spring-cloud-commons/pull/940))

### [](#spring-cloud-config)Spring Cloud Config

-   Several bug fixes related to `spring.config.import` with Spring Cloud Config Server

### [](#spring-cloud-consul)Spring Cloud Consul

-   Fix profile specific behavior relative to remote and local configuration with spring.config.import ([#706](https://github.com/spring-cloud/spring-cloud-consul/issues/706))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Informer based `DiscoveryClient` now defaults to using the current namespace ([#678](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/678))

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

-   Reactive Resilience4J CircuitBreakers can now be configured using configuration properties ([#107](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/107))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   JDK 16 compatibility issues fixed ([#3982](https://github.com/spring-cloud/spring-cloud-netflix/issues/3982))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Fixed creating circuits with SC CircuitBreaker so that the group is added as well ([#514](https://github.com/spring-cloud/spring-cloud-openfeign/issues/514))
-   Added support for refreshing `connectTimeout` and `readTimeout` ([#468](https://github.com/spring-cloud/spring-cloud-openfeign/issues/468))
-   Exposed request attributes for circuit breaker async invocation ([#193](https://github.com/spring-cloud/spring-cloud-openfeign/issues/193))

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Update WebFlux integration to leverage Brave's NettyHttpTracing ([#1690](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1690))
-   Fixed the new `decorate_queues` Reactor instrumentation option ([#1900](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1900))

---

The following modules were updated as part of 2020.0.3:

Module

Version

Issues

Spring Cloud Bus

3.0.3

Spring Cloud Circuitbreaker

2.0.2

Spring Cloud Cli

3.0.3

Spring Cloud Cloudfoundry

3.0.2

Spring Cloud Commons

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/89?closed=1)

Spring Cloud Config

3.0.4

[issues](https://github.com/spring-cloud/spring-cloud-config/milestone/89?closed=1)

Spring Cloud Consul

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/57?closed=1)

Spring Cloud Contract

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/77?closed=1)

Spring Cloud Gateway

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/51?closed=1)

Spring Cloud Kubernetes

2.0.3

[issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/31?closed=1)

Spring Cloud Netflix

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/102?closed=1)

Spring Cloud Openfeign

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/36?closed=1)

Spring Cloud Sleuth

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/90?closed=1)

Spring Cloud Task

2.3.2

Spring Cloud Vault

3.0.3

Spring Cloud Zookeeper

3.0.3

[issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/37?closed=1)

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2020.0.3</version>
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.3'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
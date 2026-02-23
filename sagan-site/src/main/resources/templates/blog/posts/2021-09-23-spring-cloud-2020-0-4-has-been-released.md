---
title: Spring Cloud 2020.0.4 has been released
source: https://spring.io/blog/2021/09/23/spring-cloud-2020-0-4-has-been-released
scraped: 2026-02-23T13:10:09.941Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  September 23, 2021 | 2 Comments
---

# Spring Cloud 2020.0.4 has been released

_Releases | Olga Maciaszek-Sharma |  September 23, 2021 | 2 Comments_

On behalf of the community, I am pleased to announce that the 2020.0.4 release of [Spring Cloud](https://cloud.spring.io) is available today. The release can be found in [Maven Central](https://repo.maven.apache.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2020.0.4/). You can check out the 2020.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes).

See all issues included in this release [here](https://github.com/orgs/spring-cloud/projects/64).

This was primarily a bug fix and documentation release. 2020.0.4 is compatible with Spring Boot 2.4.x and 2.5.x.

## [](#notable-changes-in-the-202004-release)Notable Changes in the 2020.0.4 release

### [](#spring-cloud-commons)Spring Cloud Commons

-   Allow passing group while creating reactive circuit breaker ([#994](https://github.com/spring-cloud/spring-cloud-commons/issues/994) )

### [](#spring-cloud-config)Spring Cloud Config

-   Return Boolean and Integer Properties when using JDBC backend ( [#1952](https://github.com/spring-cloud/spring-cloud-config/issues/1952) )
-   Provide the git username/password at run time(dynamically) ( [#1896](https://github.com/spring-cloud/spring-cloud-config/issues/1896) )

### [](#spring-cloud-contract)Spring Cloud Contract

-   Add explicit dependency to generateContractTests task for processContractTestResources ( [#1665](https://github.com/spring-cloud/spring-cloud-contract/pull/1665) )
-   WireMock upgraded to 2.31.0 ( [#1715](https://github.com/spring-cloud/spring-cloud-contract/issues/1715) )

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Allow to change a circuitbreaker name ([#574](https://github.com/spring-cloud/spring-cloud-openfeign/issues/574))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Do not register Eureka config server bootstrap when Eureka is disabled ([#4000](https://github.com/spring-cloud/spring-cloud-netflix/issues/4000))
-   Dependency upgrades ([#4025](https://github.com/spring-cloud/spring-cloud-netflix/issues/4025))

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Simplify ON\_EACH reactor instrumentation ([#1969](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1969))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Choose namespace in a consistent fashion across fabric8 and k8s-native clients ([#859](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/859))

The following modules were updated as part of 2020.0.4:

Module

Version

Issues

Spring Cloud Starter Build

3.0.4

Spring Cloud Netflix

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/104?closed=1))

Spring Cloud Openfeign

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/39?closed=1))

Spring Cloud Gateway

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/56?closed=1))

Spring Cloud Commons

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/90?closed=1))

Spring Cloud Config

3.0.5

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/91?closed=1))

Spring Cloud Consul

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/58?closed=1))

Spring Cloud Contract

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/78?closed=1))

Spring Cloud Kubernetes

2.0.4

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/33?closed=1))

Spring Cloud Sleuth

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/92?closed=1))

Spring Cloud Vault

3.0.4

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/48?closed=1))

Spring Cloud Zookeeper

3.0.4

Spring Cloud CircuitBreaker

2.0.2

Spring Cloud Stream

3.1.4

Spring Cloud Function

3.1.4

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2020.0.4</version>
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.4'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
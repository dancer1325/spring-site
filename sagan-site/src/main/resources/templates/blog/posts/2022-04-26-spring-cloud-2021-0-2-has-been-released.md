---
title: Spring Cloud 2021.0.2 Has Been Released
source: https://spring.io/blog/2022/04/26/spring-cloud-2021-0-2-has-been-released
scraped: 2026-02-23T12:43:31.607Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  April 26, 2022 | 1 Comment
---

# Spring Cloud 2021.0.2 Has Been Released

_Releases | Olga Maciaszek-Sharma |  April 26, 2022 | 1 Comment_

On behalf of the community, I am pleased to announce that the Service Release 2 of the [Spring Cloud 2021.0](https://cloud.spring.io) Release Train is available today. This was primarily a bug fix release. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.2/). You can check out the 2021.0.2 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes#202102).

## [](#notable-changes-in-the-202102-release-train)Notable Changes in the 2021.0.2 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/74) for all issues included in the release.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Pass request data context in blocking LoadBalancer client ([1090](https://github.com/spring-cloud/spring-cloud-commons/issues/1090))
-   Support custom HTTP status code in LoadBalancer lifecycle ([1066](https://github.com/spring-cloud/spring-cloud-commons/issues/1066))
-   Support URI without port for default `ServiceInstance` (\[1054\][https://github.com/spring-cloud/spring-cloud-commons/pull/1054](https://github.com/spring-cloud/spring-cloud-commons/pull/1054)))
-   Improved calculating Round Robin LoadBalancer position (\[1078\][https://github.com/spring-cloud/spring-cloud-commons/pull/1078)/files](https://github.com/spring-cloud/spring-cloud-commons/pull/1078\)/files))

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Fix link in docs to Sleuth samples ([2148](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2148))
-   Relocate SleuthSpanContextSupplier ([2147](https://github.com/spring-cloud/spring-cloud-sleuth/pull/2147))
-   Document access logs for Reactor Netty ([2132](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2132))
-   Fix Content-Type for Zipkin WebClientSender ([2139](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2139), [2126](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2126))
-   Fix Netty LEAK report for RSocket ([2102](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2102))
-   Stop wrapping AbstractPlatformTransactionManager implementations ([2114](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2114))
-   Add a logging message when BeanCreationException happens at creation of SkipPatternProvider ([2136](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2136))
-   Auto-configuration for Prometheus Exemplars ([2143](https://github.com/spring-cloud/spring-cloud-sleuth/pull/2143))
-   Fix auto-configuration order for Rabbit, Kafka and Zipkin ([2134](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2134))
-   Fix the invalid blocking of threads with WebClient ([2127](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2127))
-   Fix invalid ThreadLocalSpan stacking and tracing context leaks ([2064](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2064))

### [](#spring-cloud-contract)Spring Cloud Contract

-   Bumped WireMock to 2.33.0 ([1771](https://github.com/spring-cloud/spring-cloud-contract/issues/1771))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Provide and alternate naming convention for CircuitBreaker ids (\[687\][https://github.com/spring-cloud/spring-cloud-openfeign/pull/687](https://github.com/spring-cloud/spring-cloud-openfeign/pull/687)))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Reduce high load caused by `EurekaRenewedEvent` (\[4052\][https://github.com/spring-cloud/spring-cloud-netflix/pull/4052](https://github.com/spring-cloud/spring-cloud-netflix/pull/4052)))

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

-   Allow default bulkhead strategy to be configured ([119](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/119))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Updated to Fabric8 5.10.2

The following modules were updated as part of 2021.0.2:

Module

Version

Issues

Spring Cloud Config

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/99?closed=1))

Spring Cloud Circuitbreaker

2.1.2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/14?closed=1))

Spring Cloud Kubernetes

2.1.2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/43?closed=1))

Spring Cloud Commons

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/100?closed=1))

Spring Cloud Sleuth

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/100?closed=1))

Spring Cloud Contract

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/86?closed=1))

Spring Cloud Task

2.4.2

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/59))

Spring Cloud Gateway

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/65?closed=1))

Spring Cloud OpenFeign

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/50?closed=1))

Spring Cloud Starter Build

2021.0.2

Spring Cloud Netflix

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/109?closed=1))

Spring Cloud Function

3.2.4

Spring Cloud Stream

3.2.3

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.2</version>
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
Copyplugins {
  id 'org.springframework.boot' version '2.6.7'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.2")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
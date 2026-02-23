---
title: Spring Cloud 2020.0.2 (aka Ilford) Is Available
source: https://spring.io/blog/2021/03/18/spring-cloud-2020-0-2-aka-ilford-is-available
scraped: 2026-02-23T13:29:19.943Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  March 18, 2021 | 1 Comment
---

# Spring Cloud 2020.0.2 (aka Ilford) Is Available

_Releases | Spencer Gibb |  March 18, 2021 | 1 Comment_

On behalf of the community, I am pleased to announce that Service Release 2 of the [Spring Cloud 2020.0](https://cloud.spring.io) Release Train (2020.0.2) is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2020.0.2/). You can check out the 2020.0 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-202002-release-train)Notable Changes in the 2020.0.2 Release Train

This release was primarliy for bug fixes and dependency upgrades.

See [this page](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#known-issues) for a list of Known Issues.

See the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/53).

### [](#spring-cloud-commons)Spring Cloud Commons

-   Hint-based instance selection for SC LoadBalancer added ([#672](https://github.com/spring-cloud/spring-cloud-commons/issues/672))
-   Request-based sticky-session support added in blocking LoadBalancer client ([#901](https://github.com/spring-cloud/spring-cloud-commons/issues/901))

### [](#spring-cloud-config)Spring Cloud Config

-   TLS support added when using `ConfigData` ([#1689](https://github.com/spring-cloud/spring-cloud-config/issues/1689))

### [](#spring-cloud-consul)Spring Cloud Consul

-   Retry support was added for `spring.config.import=consul:`. ([#703](https://github.com/spring-cloud/spring-cloud-consul/issues/703))
-   Attempts regegistration if the service is deregistered from local agent. ([#703](https://github.com/spring-cloud/spring-cloud-consul/issues/703))
-   Adds support for multiple default query tags. ([#684](https://github.com/spring-cloud/spring-cloud-consul/pull/684))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support added for adding service instance id cookies ([#2070](https://github.com/spring-cloud/spring-cloud-gateway/issues/2070))
-   The `HttpClient` proxy type is customizable. ([#2140](https://github.com/spring-cloud/spring-cloud-gateway/issues/2140))

### [](#spring-cloud-function)Spring Cloud Function

-   Improved RSocket Support with added ability to send and receive Spring `Message` as well as additional routing mechanism via user provided callback
-   New and improved [FunctionInvoker](https://github.com/spring-cloud/spring-cloud-function/blob/master/spring-cloud-function-adapters/spring-cloud-function-adapter-azure/src/main/java/org/springframework/cloud/function/adapter/azure/FunctionInvoker.java) for Microsoft Azure adapter with [updated sample](https://github.com/spring-cloud/spring-cloud-function/blob/master/spring-cloud-function-samples/function-sample-azure/src/main/java/example/UppercaseHandler.java) showcasing it's usage.
-   Initial support for Kotlin Coroutines﻿ (thanks to Adrien Poupard).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Add the ability to configure the primary port used for a service ([#733](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/733))
-   Update Kubernetes Java Client To 11.0.1 ([#708](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/708))

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

-   Add the ability to use Resilience4J Bulkhead module ([#86](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/86))
-   Add the ability to configure Resilience4J via configuration properties ([#61](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/61))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Micrometer support added ([#457](https://github.com/spring-cloud/spring-cloud-openfeign/issues/457), [#462](https://github.com/spring-cloud/spring-cloud-openfeign/pull/462))

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   `SleuthFeignBuilder` now allows the ability to provide a custom `delegate` ([#1865](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1865))

---

The following modules were updated as part of 2020.0.2:

Module

Version

Issues

Spring Cloud Bus

3.0.2

Spring Cloud Circuitbreaker

2.0.1

Spring Cloud Cli

3.0.2

Spring Cloud Cloudfoundry

3.0.1

Spring Cloud Commons

3.0.2

Spring Cloud Config

3.0.3

Spring Cloud Consul

3.0.2

Spring Cloud Contract

3.0.2

Spring Cloud Gateway

3.0.2

Spring Cloud Kubernetes

2.0.2

Spring Cloud Netflix

3.0.2

Spring Cloud Openfeign

3.0.2

Spring Cloud Sleuth

3.0.2

Spring Cloud Task

2.3.1

Spring Cloud Vault

3.0.2

Spring Cloud Zookeeper

3.0.2

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2020.0.2</version>
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.2'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
---
title: Spring Cloud Greenwich.RELEASE is now available
source: https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available
scraped: 2026-02-23T14:59:54.614Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  January 23, 2019 | 6 Comments
---

# Spring Cloud Greenwich.RELEASE is now available

_Releases | Ryan Baxter |  January 23, 2019 | 6 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.RELEASE/). You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes).

## [](#end-of-life-eol-reminder)End of Life (EOL) Reminder

The Edgware release train will reach EOL status on August 1st, 2019. You can read the formal announcement [here](https://spring.io/blog/2018/07/30/spring-cloud-edgware-eol-aug-1st-2019).

The Spring Cloud Finchley release train is considered a major release and is tied to the Spring Boot 2.0.x release. Therefore, the Spring Cloud Finchley release train will reach EOL status when the Spring Boot 2.0.x release branch is marked EOL. An announcement about this will be made on this blog once a date has been determined.

The Spring Cloud Greenwich release train is considered a minor release and will continue support for the Spring Boot 2.x release branch.

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

Updates were made across all projects for Java 11 compatibility.

### [](#new-projects)New Projects

There are two new projects included in the Greenwich Release train, [Spring Cloud GCP](https://spring.io/projects/spring-cloud-gcp) (which provides integration with Google Cloud Platform), and [Spring Cloud Kubernetes](https://spring.io/projects/spring-cloud-kubernetes#overview) (which provides integration with Kubernetes).

### [](#spring-cloud-netflix-projects-entering-maintenance-mode)Spring Cloud Netflix Projects Entering Maintenance Mode

Recently, Netflix [announced](https://github.com/Netflix/Hystrix#hystrix-status) that Hystrix is entering maintenance mode. Ribbon has been in a [similar state](https://github.com/Netflix/ribbon#project-status-on-maintenance) since 2016. Although Hystrix and Ribbon are now in maintenance mode, they are still deployed at scale at Netflix.

The Hystrix Dashboard and Turbine have been superseded by Atlas. The last commits to these project are two years and four years ago respectively. Zuul 1 and Archaius 1 have both been superseded by later versions that are not backward compatible.

The following Spring Cloud Netflix modules and corresponding starters will be placed into maintenance mode:

1.  spring-cloud-netflix-archaius
2.  spring-cloud-netflix-hystrix-contract
3.  spring-cloud-netflix-hystrix-dashboard
4.  spring-cloud-netflix-hystrix-stream
5.  spring-cloud-netflix-hystrix
6.  spring-cloud-netflix-ribbon
7.  spring-cloud-netflix-turbine-stream
8.  spring-cloud-netflix-turbine
9.  spring-cloud-netflix-zuul

This does not include the Eureka or concurrency-limits modules.

#### [](#what-is-maintenance-mode)What is Maintenance Mode?

Placing a module in maintenance mode means that the Spring Cloud team will no longer add new features to the module. We will fix blocker bugs and security issues, and we will also consider and review small pull requests from the community.

We intend to continue to support these modules for a period of **at least** a year from the general availability of the [Greenwich release train](https://github.com/spring-cloud/spring-cloud-release/milestones?direction=asc&sort=due_date).

#### [](#replacements)Replacements

We recommend the following as replacements for the functionality provided by these modules.

Current

Replacement

Hystrix

[Resilience4j](https://github.com/resilience4j/resilience4j)

Hystrix Dashboard / Turbine

Micrometer + Monitoring System

Ribbon

Spring Cloud Loadbalancer

Zuul 1

Spring Cloud Gateway

Archaius 1

Spring Boot external config + Spring Cloud Config

Look for a future blog post on Spring Cloud Loadbalancer and integration with a new Netflix project Concurrency Limits.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Updates to the latest Brave library.
-   Performance improvements of WebFlux and Reactor integration.
-   GRPC instrumentation added.
-   Added support for multiple span reporters.
-   Rate limit sampler support added.

### [](#spring-cloud-gcp)Spring Cloud GCP

See the Google [release announcement](https://cloud.google.com/blog/products/application-development/announcing-spring-cloud-gcp-1-1-deepening-ties-pivotals-spring-framework).

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Upgraded Ribbon and Eureka versions.
-   Support was added for the new `ServiceInstance.instanceId` field.

### [](#spring-cloud-consul)Spring Cloud Consul

-   Support was added for the new `ServiceInstance.instanceId` field.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added a rewrite response header filter.
-   Support was added for multiple paths and hosts in their respective route predicates and to customize the HTTP status code returned in certain situations.

### [](#spring-cloud-function)Spring Cloud Function

-   Kotlin support
-   New programming model for Azure Functions
-   Automatic (optional) export of Supplier on startup in web adapter
-   Functional Bean Registrations
-   . . . [and more](https://spring.io/blog/2019/01/08/announcing-general-availability-of-spring-cloud-function-2-0-0-release)

### [](#spring-cloud-stream)Spring Cloud Stream

See the Spring Cloud Stream [release announcement](https://spring.io/blog/2019/01/08/announcing-general-availability-of-spring-cloud-stream-fishtown-release-2-1-0-release).

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Support was added for the new `ServiceInstance.instanceId` field.

### [](#spring-cloud-task)Spring Cloud Task

See the Spring Cloud Task [release announcement](https://spring.io/blog/2019/01/22/spring-cloud-task-2-1-0-ga-is-now-available).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   You can now configure `ServiceInstance` metadata to come from Kubernetes Labels, Annotations, and Ports.
-   Enhancements were made to use the `KubernetesDiscoveryClient` during bootstrap.
-   Added a module to detect the presence of Istio.

### [](#spring-cloud-contract)Spring Cloud Contract

-   Added support for XML payloads [issue](https://github.com/spring-cloud/spring-cloud-contract/pull/855).
-   Allows dumping contracts into a common representation [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/793).
-   Added WebTestClient support for testing contracts with WebFlux [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/422).
-   Improved Pact integration [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/792).
-   Added back Camel support [issue](https://github.com/spring-cloud/spring-cloud-contract/pull/786%5D).
-   Added JUnit5 support [issue](https://github.com/spring-cloud/spring-cloud-contract/pull/749)
-   Bumped WireMock to the latest version [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/825).
-   Added support for binary payload [issue](https://github.com/spring-cloud/spring-cloud-contract/pull/818).
-   Added support for latest version in Git storage [issue](https://github.com/spring-cloud/spring-cloud-contract/pull/848).
-   Allow providing explicit type for regular expression generation [issue](https://github.com/spring-cloud/spring-cloud-contract/issues/768).

### [](#spring-cloud-security)Spring Cloud Security

-   Spring Cloud Gateway Filter added to support OAuth2. A sample application demonstrating its use is available [here](https://github.com/spring-cloud-samples/sample-gateway-oauth2login).

### [](#spring-cloud-config)Spring Cloud Config

-   Added `EnvironmentRepository` to support a CredHub backend.

### [](#spring-cloud-vault)Spring Cloud Vault

-   Added support for Google Cloud and Azure authentication.
-   Upgrade to Spring Vault 2.1.1.

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Support was added for `@QueryMap` annotation.
-   Upgrade to OpenFeign 10.1.0.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added `instanceId` to the `ServiceInstance` interface.
-   Added a `ReactiveLoadBalancer` interface and implementation using Reactor.

The following modules were updated as part of Greenwich.RELEASE:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Sleuth | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/58?closed=1)) | Spring Cloud Gcp | 1.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gcp/milestone/9?closed=1)) | Spring Cloud Build | 2.1.2.RELEASE |   | Spring Cloud Netflix | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/74?closed=1)) | Spring Cloud Consul | 2.1.0.RELEASE |   | Spring Cloud Gateway | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/21?closed=1)) | Spring Cloud | Greenwich.RELEASE |   | Spring Cloud Function | 2.0.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/14?closed=1)) | Spring Cloud Stream | Fishtown.RELEASE |   | Spring Cloud Zookeeper | 2.1.0.RELEASE |   | Spring Cloud Cloudfoundry | 2.1.0.RELEASE |   | Spring Cloud Aws | 2.1.0.RELEASE |   | Spring Cloud Task | 2.1.0.RELEASE |   | Spring Cloud Kubernetes | 1.0.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/9?closed=1)) | Spring Cloud Contract | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/48?closed=1)) | Spring Cloud Release | Greenwich.RELEASE |   | Spring Cloud Security | 2.1.0.RELEASE |   | Spring Cloud Starter | Greenwich.RELEASE |   | Spring Cloud Bus | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/35?closed=1)) | Spring Cloud Config | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/60?closed=1)) | Spring Cloud Vault | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/29?closed=1)) | Spring Cloud Openfeign | 2.1.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/10?closed=1)) | Spring Cloud Commons | 2.1.0.RELEASE |   | Spring Cloud Dependencies | 2.1.2.RELEASE |  

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.RELEASE</version>
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

To get started with Gradle:

```
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.RELEASE'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
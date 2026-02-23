---
title: Spring Cloud Finchley.RELEASE is available
source: https://spring.io/blog/2018/06/19/spring-cloud-finchley-release-is-available
scraped: 2026-02-23T15:18:23.363Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  June 19, 2018 | 4 Comments
---

# Spring Cloud Finchley.RELEASE is available

_Releases | Spencer Gibb |  June 19, 2018 | 4 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Finchley.RELEASE/). You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#lifecycle-announcements-for-release-train-versions)Lifecycle Announcements for Release Train Versions

The Camden release train has reached end-of-life status. The Dalston release train will reach end-of-life status in December 2018. The Edgware release train will follow the end-of-life cycle of the Spring Boot 1.5.x line.

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

Spring Cloud Function and Spring Cloud Gateway are new additions to the Spring Cloud portfolio. The portfolio was also made compatible with Spring Boot 2.0.x which was a significant effort. Spring Cloud now has a minimum version of Java 8.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Spring Cloud Gateway is an API Gateway built on top of Spring Webflux and Reactor Netty. It is a next generation gateway and can be viewed as a replacement for Spring Cloud Netflix Zuul. It provides dynamic routing based on easy to define predicates. It also provides filters that are scoped to each route, examples include: path rewriting, circuit breaker, adding or removing headers, rate limiting and security. Routes can be defined using properties or using included support for `DiscoveryClient` (Eureka, Consul & Zookeeper).

### [](#spring-cloud-function)Spring Cloud Function

Spring Cloud Function is a project with the following high-level goals:

-   Promote the implementation of business logic via functions.
-   Decouple the development lifecycle of business logic from any specific runtime target so that the same code can run as a web endpoint, a stream processor, or a task.
-   Support a uniform programming model across serverless providers, as well as the ability to run standalone (locally or in a PaaS).
-   Enable Spring Boot features (auto-configuration, dependency injection, metrics) on serverless providers.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Rewritten using Brave [#829](https://github.com/spring-cloud/spring-cloud-sleuth/pull/829), migration guide [https://github.com/spring-cloud/spring-cloud-sleuth/wiki/Spring-Cloud-Sleuth-2.0-Migration-Guide](https://github.com/spring-cloud/spring-cloud-sleuth/wiki/Spring-Cloud-Sleuth-2.0-Migration-Guide)
-   Removed the `sleuth-stream` [#555](https://github.com/spring-cloud/spring-cloud-sleuth/issues/555) and `zipkin-stream` [#727](https://github.com/spring-cloud/spring-cloud-sleuth/issues/727) dependencies. Spans via messaging can be only sent to Zipkin via native Zipkin dependencies.
-   `spring.zipkin.sender.type=kafka` needs to explicitly be set to send spans over Kafka [#985](https://github.com/spring-cloud/spring-cloud-sleuth/issues/985), [#1013](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1013/)
-   Added WebClient.Builder support [#779](https://github.com/spring-cloud/spring-cloud-sleuth/issues/779)
-   Trace tags account for parametrized URL [#802](https://github.com/spring-cloud/spring-cloud-sleuth/issues/802)
-   Added support for NettyClient instrumentation - allows instrumentation of Spring Cloud Gateway [#806](https://github.com/spring-cloud/spring-cloud-sleuth/issues/806)
-   Fixed all early bean initialization issues [#870](https://github.com/spring-cloud/spring-cloud-sleuth/issues/870)
-   Added spring-kafka support [#896](https://github.com/spring-cloud/spring-cloud-sleuth/issues/896)
-   Added spring-rabbitmq support [#883](https://github.com/spring-cloud/spring-cloud-sleuth/issues/883)
-   Added support for Apache HttpClient [#685](https://github.com/spring-cloud/spring-cloud-sleuth/issues/685)
-   Added OpenTracing support [#599](https://github.com/spring-cloud/spring-cloud-sleuth/issues/599)
-   Added support for AWS X-Ray [#459](https://github.com/spring-cloud/spring-cloud-sleuth/issues/459)
-   `TraceKeys` are hidden from the user and are deprecated [#940](https://github.com/spring-cloud/spring-cloud-sleuth/issues/940)
-   Added support for Dubbo [#934](https://github.com/spring-cloud/spring-cloud-sleuth/pull/934)

Examples: [https://github.com/spring-cloud-samples/sleuth-documentation-apps](https://github.com/spring-cloud-samples/sleuth-documentation-apps), [https://github.com/openzipkin/sleuth-webmvc-example](https://github.com/openzipkin/sleuth-webmvc-example)

### [](#spring-cloud-config)Spring Cloud Config

-   Allow the ability to skip SSL validation for both [Git](http://cloud.spring.io/spring-cloud-static/Finchley.RELEASE/single/spring-cloud.html#_skipping_ssl_certificate_validation) and [Vault](http://cloud.spring.io/spring-cloud-static/Finchley.RELEASE/single/spring-cloud.html#vault-backend) backends
-   Git backend now has a refresh rate property [#749](https://github.com/spring-cloud/spring-cloud-config/pull/749)
-   Add support for Gitee webhooks [#898](https://github.com/spring-cloud/spring-cloud-config/issues/898)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Starters deprecated in Edgware have been removed
-   `spring-cloud-netflix-hystrix-amqp` has been removed
-   `ZuulFallbackProvider` has been removed and replaced with `FallbackProvider` [#2262](https://github.com/spring-cloud/spring-cloud-netflix/pull/2262)
-   `/hystrix.stream` now uses WebFlux [#2629](https://github.com/spring-cloud/spring-cloud-netflix/issues/2629)
-   Turbine now has a `/clusters` endpoint that can be used to discover configured clusters [#2223](https://github.com/spring-cloud/spring-cloud-netflix/pull/2223)
-   Spring Cloud OpenFeign has been moved to its [own project](https://github.com/spring-cloud/spring-cloud-openfeign)
-   Zuul metrics now use Micrometer
-   Turbine Stream support was rewritten to use Spring Webflux.

### [](#spring-cloud-task)Spring Cloud Task

Please see the release [blog post](https://spring.io/blog/2018/05/07/spring-cloud-task-2-0-0-release-is-now-available).

### [](#spring-cloud-commons)Spring Cloud Commons

-   You can now use the [`@LoadBalanced`](http://cloud.spring.io/spring-cloud-static/Finchley.RELEASE/single/spring-cloud.html#_spring_webclient_as_a_load_balancer_client) annotation on `WebClient`s
-   Retry functionality has been simplified [#331](https://github.com/spring-cloud/spring-cloud-commons/pull/331)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Added support for RestAssured with RestDocs [#334](https://github.com/spring-cloud/spring-cloud-contract/issues/334)
-   Removed Camel support [#386](https://github.com/spring-cloud/spring-cloud-contract/issues/386)
-   Introduced explicit mode of stubs fetching via `stubsMode` and `contractsMode` [#287](https://github.com/spring-cloud/spring-cloud-contract/issues/287)
-   Made `@AutoConfigureStubRunner` a test slice [#473](https://github.com/spring-cloud/spring-cloud-contract/issues/473)
-   Allows starting multiple versions of the same stub artifact [#474](https://github.com/spring-cloud/spring-cloud-contract/issues/474)
-   Made collection assertion methods more verbose [#441](https://github.com/spring-cloud/spring-cloud-contract/issues/441)
-   Added `@StubRunnerPort` convenience mechanism of finding stubs [#573](https://github.com/spring-cloud/spring-cloud-contract/issues/573)
-   Allows storing downloaded artifacts after the test got executed [#512](https://github.com/spring-cloud/spring-cloud-contract/issues/512)
-   Added helper methods for HTTP statuses [#575](https://github.com/spring-cloud/spring-cloud-contract/issues/575)
-   Refreshed the documentation [#570](https://github.com/spring-cloud/spring-cloud-contract/pull/570) and added a 3 seconds & 3 minutes tour [#549](https://github.com/spring-cloud/spring-cloud-contract/issues/549)
-   Bumped WireMock to `2.18.0` [#659](https://github.com/spring-cloud/spring-cloud-contract/issues/659)
-   Support for Pact v3 [#406](https://github.com/spring-cloud/spring-cloud-contract/issues/406) and Pact Broker [#191](https://github.com/spring-cloud/spring-cloud-contract/issues/191)
-   Option to upload and fetch stubs from a Git Repository [#596](https://github.com/spring-cloud/spring-cloud-contract/pull/596)

Examples: [https://github.com/spring-cloud-samples/spring-cloud-contract-samples/](https://github.com/spring-cloud-samples/spring-cloud-contract-samples/)

### [](#spring-cloud-stream)Spring Cloud Stream

Please see the release [blog post](https://spring.io/blog/2018/04/10/announcing-general-availability-of-spring-cloud-stream-elmhurst-release-2-0-0-release).

### [](#spring-cloud-vault)Spring Cloud Vault

-   Upgrade to Spring Vault 2.0 [#203](https://github.com/spring-cloud/spring-cloud-vault/issues/203).
-   Auto-configuration for `ReactiveVaultOperations` to provide a reactive API on top of `WebClient` [#133](https://github.com/spring-cloud/spring-cloud-vault/issues/133).
-   Added Reactive Health Indicator [#221](https://github.com/spring-cloud/spring-cloud-vault/issues/221).
-   Pull, wrapped, and provided modes for AppRole's RoleId and SecretId authentication identifiers [#174](https://github.com/spring-cloud/spring-cloud-vault/issues/174).
-   Support for Vault's generic database backend [#169](https://github.com/spring-cloud/spring-cloud-vault/issues/169).
-   Retain JSON data types in the backing property source [#189](https://github.com/spring-cloud/spring-cloud-vault/issues/189).
-   Support for Vault's versioned Key/Value backend [#209](https://github.com/spring-cloud/spring-cloud-vault/issues/209).
-   Upgraded Spring Cloud Vault Connectors 2.0.0.RELEASE to Spring Cloud Vault 2.0.0.RELEASE.

Examples: [https://github.com/mp911de/spring-cloud-vault-config-samples/](https://github.com/mp911de/spring-cloud-vault-config-samples/)

### [](#spring-cloud-bus)Spring Cloud Bus

Actuator endpoints were updated to use the new actuator framework.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Support encoder, decoder and contract in Feign configuration properties [#2687](https://github.com/spring-cloud/spring-cloud-netflix/pull/2687)

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

The new reactive Cloud Foundry Java Client is used.

### [](#spring-cloud-consul)Spring Cloud Consul

Added support for HTTPS instances and ACLs. `@Scheduled` is no longer used for Consul watches.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

Updated to use Curator 4.0.1.

### [](#spring-cloud-aws)Spring Cloud Aws

Adds support for PropertySourceLocator that uses AWS Parameter Store. Micrometer support for CloudWatch metrics.

The following modules were updated as part of Finchley.RELEASE:

Module

Version

Spring Cloud Consul

2.0.0.RELEASE

Spring Cloud Gateway

2.0.0.RELEASE

Spring Cloud Function

1.0.0.RELEASE

Spring Cloud Zookeeper

2.0.0.RELEASE

Spring Cloud Sleuth

2.0.0.RELEASE

Spring Cloud Aws

2.0.0.RELEASE

Spring Cloud Config

2.0.0.RELEASE

Spring Cloud Cloudfoundry

2.0.0.RELEASE

Spring Cloud Security

2.0.0.RELEASE

Spring Cloud Netflix

2.0.0.RELEASE

Spring Cloud Task

2.0.0.RELEASE

Spring Cloud Commons

2.0.0.RELEASE

Spring Cloud Contract

2.0.0.RELEASE

Spring Cloud Stream

Elmhurst.RELEASE

Spring Cloud Vault

2.0.0.RELEASE

Spring Cloud Bus

2.0.0.RELEASE

Spring Cloud Openfeign

2.0.0.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.RELEASE</version>
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
        classpath "io.spring.gradle:dependency-management-plugin:1.0.5.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.RELEASE'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
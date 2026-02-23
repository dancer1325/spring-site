---
title: Spring Cloud Hoxton Released
source: https://spring.io/blog/2019/11/28/spring-cloud-hoxton-released
scraped: 2026-02-23T14:24:02.661Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  November 28, 2019 | 3 Comments
---

# Spring Cloud Hoxton Released

_Releases | Ryan Baxter |  November 28, 2019 | 3 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.RELEASE/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

Spring Cloud Hoxton.RELEASE is based on Spring Boot 2.2.1.RELEASE.

### [](#documentation-changes)Documentation Changes

The Hoxton.RELEASE docs have a new [landing page](https://cloud.spring.io/spring-cloud-static/Hoxton.RELEASE/reference/html/spring-cloud.html), new theme and a [single-page, multi-page and a pdf version](https://cloud.spring.io/spring-cloud-static/Hoxton.RELEASE/reference/html/documentation-overview.html#contract-documentation).The landing page will link you to the documentation for the specific project you are interested in. We hope you find that the new documentation structure easier to consume.

### [](#new-load-balancer-implementations)New Load Balancer Implementations

Spring Cloud Hoxton.RELEASE is the first release containing both blocking and non-blocking load balancer client implementations as an alternative to Netflix Ribbon which has entered maintenance mode.

To use the new `BlockingLoadBalancerClient` with a `RestTemplate` you will need to include `org.springframework.cloud:spring-cloud-loadbalancer` on your application's classpath. The same dependency can be used in a reactive application when using `@LoadBalanced WebClient.Builder` - the only difference is that Spring Cloud will auto-configure a `ReactorLoadBalancerExchangeFilterFunction` instance. See the [documentation](https://cloud.spring.io/spring-cloud-static/spring-cloud-commons/2.2.0.M2/reference/html/#_spring_resttemplate_as_a_load_balancer_client) for additional information. The new `ReactorLoadBalancerExchangeFilterFunction` can also be autowired and passed directly to `WebClient.Builder` (see the [documentation](https://cloud.spring.io/spring-cloud-commons/reference/html/#webflux-with-reactive-loadbalancer)). For all these features, [Project Reactor](https://projectreactor.io/)\-based `RoundRobinLoadBalancer` is used underneath.

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Support was added for the new `ReactiveDiscoveryClient` and the new Spring Cloud Circuit Breaker API implementation for Hystrix.
-   Added [property](https://cloud.spring.io/spring-cloud-static/spring-cloud-netflix/2.2.0.RC2/reference/html/#disabling-spring-cloud-circuit-breaker-hystrix) to disable Spring Cloud CircuitBreaker Hystrix auto-configuration

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

-   Support was added for the new `ReactiveDiscoveryClient`.

### [](#spring-cloud-bus)Spring Cloud Bus

-   Documentation updates

### [](#spring-cloud-vault)Spring Cloud Vault

-   Applications running in the Pivotal Application Service (former PCF) can leverage container identity to authenticate using Vault's PCF Authentication support.
-   Support for Vault namespaces (Vault Enterprise feature) using the `X-Vault-Namespace` header.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Support was added for the new `ReactiveDiscoveryClient`.

### [](#spring-cloud-contract)Spring Cloud Contract

-   Full documentation rewrite
-   Major test class generation refactoring
-   A lot of rewrite from Groovy to Java
-   Added support for writing contracts in Kotlin and Java
-   Added `inProgress` flag to the contract DSL and runtime stub generation
-   Added TestNG support for generated tests
-   Numerous library version increments (including Groovy, WireMock and Pact)

### [](#spring-cloud-consul)Spring Cloud Consul

-   Support was added for the new `ReactiveDiscoveryClient` and for Consul's consistency mode.

### [](#spring-cloud-config)Spring Cloud Config

-   An Environment Repository supporting AWS S3.
-   Added the ability to [decrypt properties in plain text](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.0.RC2/reference/html/#_decrpyting_plain_text)

### [](#spring-cloud-gcp)Spring Cloud Gcp

-   BigQuery module added
-   Created a separate starter for Cloud Foundry: spring-cloud-gcp-starter-cloudfoundry
-   You can check out the [changelog document](https://github.com/spring-cloud/spring-cloud-gcp/blob/master/CHANGELOG.adoc#120release-2019-11-26) for more information

### [](#spring-cloud-stream)Spring Cloud Stream

With this new Horsham.RELEASE (3.0.0) we begin our journey from annotation-driven to a significantly simpler functional approach. We have published a series of posts explaining and justifying this move:

-   *[Spring Cloud Stream - demystified and simplified](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified)*
-   *[Spring Cloud Stream - functional and reactive](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive)*
-   *[Spring Cloud Stream - and Spring Integration](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration)*
-   *[Spring Cloud Stream - Event Routing](https://spring.io/blog/2019/10/31/spring-cloud-stream-event-routing)*

### [](#spring-cloud-commons)Spring Cloud Commons

-   We have introduced new blocking and non-blocking load balancer implementations as an alternative to Netflix Ribbon which has entered maintenance mode.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   OpenFeign was updated to 10.4.0.
-   [Support for Spring Cloud LoadBalancer](https://github.com/spring-cloud/spring-cloud-openfeign/issues/177) has been added

### [](#spring-cloud-task)Spring Cloud Task

-   Micrometer support
-   Updated documentation with improved format
-   Task apps launched when using Spring Batch partitioning now have external-execution-id populated

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Added support for latest Brave (includes messaging sampling)
-   Added an option for `onLastOperator` Reactor tracing for improved performance
-   Added Redis tracing
-   Set default sampler to rate-limited sampler
-   Added support for AWS SQS tracing
-   Added support for Quartz tracing
-   Added in-process propagation mechanism
-   Defaults to Micrometer metrics for Zipkin reporting

### [](#spring-cloud-aws)Spring Cloud Aws

-   Bug fixes

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Support was added for the new `ReactiveDiscoveryClient`.

### [](#spring-cloud-security)Spring Cloud Security

-   Bug fixes

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

We welcome Spring Cloud Circuit Breaker as a new project under the Spring Cloud release train. This project provides an abstraction API for adding circuit breakers to your application. At the time of this blog post, there are four supported implementations:

-   Resilience4j
-   Spring Retry
-   Hystrix (in [spring-cloud-netflix](https://github.com/spring-cloud/spring-cloud-netflix/blob/master/spring-cloud-netflix-hystrix/src/main/java/org/springframework/cloud/netflix/hystrix/HystrixCircuitBreaker.java))
-   Sentinel (in [spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba/tree/master/spring-cloud-alibaba-sentinel))

See the [annoucement blog post](https://spring.io/blog/2019/04/16/introducing-spring-cloud-circuit-breaker) for more information.

-   Added auto-configuration to collect circuit breaker metrics when using Resilience4J ([#47](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/47))
-   Upgrade to Resilience4J 1.1.0
-   [Added property to disable Resilience4J auto-configuration](https://github.com/spring-cloud/spring-cloud-circuitbreaker/commit/aacf4d35183de568e560f0b9d6e5b54fdd680ecc)

### [](#spring-cloud-function)Spring Cloud Function

Lots of new features such as:

-   *Transparent type conversion*
-   *Function Routing*
-   *Function arity*

More details in our [release announcement](https://spring.io/blog/2019/11/25/announcing-the-release-of-spring-cloud-function-3-0-0-release).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support was added for using the new `ReactiveLoadBalancer`.
-   RSocket modules were moved to their own [project](https://github.com/spring-cloud-incubator/spring-cloud-rsocket) in the Spring Cloud Incubator organization
-   Added a [filter](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.0.RC2/reference/html/#spring-cloud-circuitbreaker-filter-factory) which uses the new Spring Cloud CircuitBreaker library to provide circuit breakers to routes

The following modules were updated as part of Hoxton.RELEASE:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Netflix | 2.2.0.RELEASE |  
| Spring Cloud Starter Parent | Hoxton.RELEASE |  
| Spring Cloud Dependencies Parent | 2.2.0.RELEASE |  
| Spring Cloud Dependencies | Hoxton.RELEASE |  
| Spring Cloud Cloudfoundry | 2.2.0.RELEASE |  
| Spring Cloud Cli | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-cli/milestone/22?closed=1)) | Spring Cloud Bus | 2.2.0.RELEASE |  
| Spring Cloud Vault | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/35?closed=1)) | Spring Cloud Kubernetes | 1.1.0.RELEASE |  
| Spring Cloud Contract | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/59?closed=1)) | Spring Cloud Consul | 2.2.0.RELEASE |  
| Spring Cloud Release | Hoxton.RELEASE |  
| Spring Cloud Build | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-build/milestone/27?closed=1)) | Spring Cloud Config | 2.2.0.RELEASE |  
| Spring Cloud | Hoxton.RELEASE |  
| Spring Cloud Gcp | 1.2.0.RELEASE |  
| Spring Cloud Stream | Horsham.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/67?closed=1)) | Spring Cloud Commons | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/68?closed=1)) | Spring Cloud Starter | Hoxton.RELEASE |  
| Spring Cloud Openfeign | 2.2.0.RELEASE |  
| Spring Cloud Task | 2.2.1.RELEASE |  
| Spring Cloud Sleuth | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/70?closed=1)) | Spring Cloud Aws | 2.2.0.RELEASE |  
| Spring Cloud Zookeeper | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/27?closed=1)) | Spring Cloud Security | 2.2.0.RELEASE |  
| Spring Cloud Circuitbreaker | 1.0.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/1?closed=1)) | Spring Cloud Function | 3.0.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/26?closed=1)) | Spring Cloud Gateway | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/32?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.RELEASE</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.RELEASE'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
---
title: Spring Cloud Greenwich.SR3 Released
source: https://spring.io/blog/2019/09/12/spring-cloud-greenwich-sr3-released
scraped: 2026-02-23T14:36:37.923Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  September 12, 2019 | 0 Comments
---

# Spring Cloud Greenwich.SR3 Released

_Releases | Ryan Baxter |  September 12, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 3 (SR3) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.SR3/). You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes). All issues closed in this release across all projects can be found in the [Spring Cloud Greenwich.SR3 project](https://github.com/orgs/spring-cloud/projects/27) on GitHub

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

### [](#new-load-balancer-implementations)New Load Balancer Implementations

Spring Cloud Greenwich.M3 is the first release containing both blocking and non-blocking load balancer client implementations as an alternative to Netflix Ribbon which has entered maintenance mode.

To use the new `BlockingLoadBalancerClient` with a `RestTemplate` you will need to include `org.springframework.cloud:spring-cloud-loadbalancer` on your application’s classpath. The same dependency can be used in a reactive application when using `@LoadBalanced WebClient.Builder` - the only difference is that Spring Cloud will auto-configure a `ReactorLoadBalancerExchangeFilterFunction` instance. See the documentation for additional information. The new `ReactorLoadBalancerExchangeFilterFunction` can also be autowired and passed directly to `WebClient.Builder` (see the documentation). For all these features, Project Reactor-based `RoundRobinLoadBalancer` is used underneath.

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A2.1.3.RELEASE)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-openfeign/issues?q=is%3Aclosed+milestone%3A2.1.3.RELEASE)

### [](#spring-cloud-security)Spring Cloud Security

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-security/issues?q=is%3Aclosed+milestone%3A2.1.4.RELEASE)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   The `DiscoveryClient` implementation can now retrieve services from all namespaces
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-kubernetes/issues?q=is%3Aclosed+milestone%3A1.0.3.RELEASE)

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Documentation updates

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Retry filter now supports backoff policies
-   Add the ability to provide custom metrics tags
-   New request size filter factory
-   Add support for Netty Wiretap
-   More detailed information about routes added to `/actuator/gateway/routes`
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/milestone/26?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Add the ability to add additional filters to `JerseyReplicationClient` used by Eureka
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A2.1.3.RELEASE)

### [](#spring-cloud-bus)Spring Cloud Bus

-   Documentation updates

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

-   Documentation updates

### [](#spring-cloud-vault)Spring Cloud Vault

-   Documentation updates

### [](#spring-cloud-config)Spring Cloud Config

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A2.1.4.RELEASE)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-consul/issues?q=is%3Aclosed+milestone%3A2.1.3.RELEASE)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.1.3.RELEASE)

### [](#spring-cloud-aws)Spring Cloud Aws

-   Documentation updates

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=milestone%3A2.1.3.RELEASE+is%3Aclosed)

The following modules were updated as part of Greenwich.SR3:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Commons | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/62?closed=1)) | Spring Cloud Openfeign | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/14?closed=1)) | Spring Cloud Security | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-security/milestone/22?closed=1)) | Spring Cloud Stream | Fishtown.SR4 |  
| Spring Cloud Kubernetes | 1.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/13?closed=1)) | Spring Cloud Build | 2.1.7.RELEASE |  
| Spring Cloud Zookeeper | 2.1.3.RELEASE |  
| Spring Cloud Gateway | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/26?closed=1)) | Spring Cloud Dependencies | Greenwich.SR3 |  
| Spring Cloud Netflix | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/81?closed=1)) | Spring Cloud Bus | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/40?closed=1)) | Spring Cloud Dependencies Parent | 2.1.7.RELEASE |  
| Spring Cloud Task | 2.1.3.RELEASE |  
| Spring Cloud Starter | Greenwich.SR3 |  
| Spring Cloud Cloudfoundry | 2.1.3.RELEASE |  
| Spring Cloud | Greenwich.SR3 |  
| Spring Cloud Vault | 2.1.3.RELEASE |  
| Spring Cloud Config | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/68?closed=1)) | Spring Cloud Release | Greenwich.SR3 |  
| Spring Cloud Function | 2.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/18?closed=1)) | Spring Cloud Consul | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/42?closed=1)) | Spring Cloud Starter Parent | Greenwich.SR3 |  
| Spring Cloud Gcp | 1.1.3.RELEASE |  
| Spring Cloud Sleuth | 2.1.3.RELEASE |  
| Spring Cloud Aws | 2.1.3.RELEASE |  
| Spring Cloud Contract | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/53?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.SR3</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.SR3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
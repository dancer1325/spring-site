---
title: Spring Cloud Hoxton.M2 Released
source: https://spring.io/blog/2019/08/19/spring-cloud-hoxton-m2-released
scraped: 2026-02-23T14:38:32.071Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  August 19, 2019 | 0 Comments
---

# Spring Cloud Hoxton.M2 Released

_Releases | Ryan Baxter |  August 19, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes). In addition you can view the [GitHub Project For Hoxton.M2](https://github.com/orgs/spring-cloud/projects/25).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

Spring Cloud Hoxton.M2 builds upon Spring Boot 2.2.0.M5.

### [](#documentation-changes)Documentation Changes

The Hoxton.M2 docs have a new [landing page](https://cloud.spring.io/spring-cloud-static/Hoxton.M2/reference/html/spring-cloud.html) as well as a new theme. The landing page will link you to the documentation for the specific project you are interested in.

Our documentation has a new theme. We hope you find that the new theme make the documentation easier to consume.

### [](#new-load-balancer-implementations)New Load Balancer Implementations

Spring Cloud Hoxton.M2 is the first release containing both blocking and non-blocking load balancer client implementations as an alternative to Netflix Ribbon which has entered maintenance mode.

To use the new `BlockingLoadBalancerClient` with a `RestTemplate` you will need to include `org.springframework.cloud:spring-cloud-loadbalancer` on your application's classpath. The same dependency can be used in a reactive application when using `@LoadBalanced WebClient.Builder` - the only difference is that Spring Cloud will auto-configure a `ReactorLoadBalancerExchangeFilterFunction` instance. See the [documentation](https://cloud.spring.io/spring-cloud-static/spring-cloud-commons/2.2.0.M2/reference/html/#_spring_resttemplate_as_a_load_balancer_client) for additional information. The new `ReactorLoadBalancerExchangeFilterFunction` can also be autowired and passed directly to `WebClient.Builder` (see the [documentation](https://cloud.spring.io/spring-cloud-commons/reference/html/#webflux-with-reactive-loadbalancer)). For all these features, [Project Reactor](https://projectreactor.io/)\-based `RoundRobinLoadBalancer` is used underneath.

### [](#spring-cloud-config)Spring Cloud Config

-   [Issues](https://github.com/spring-cloud/spring-cloud-config/milestone/67?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/27?closed=1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   We have introduced new blocking and non-blocking load balancer implementations as an alternative to Netflix Ribbon which has entered maintenance mode.
-   [Issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/63?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Java DSL](https://github.com/spring-cloud/spring-cloud-contract/pull/1166)
-   [Kotlin DSL](https://github.com/spring-cloud/spring-cloud-contract/pull/1151)
-   [Added incremental build option for Gradle](https://github.com/spring-cloud/spring-cloud-contract/pull/1165)
-   [In-progress mode for contract development and API prototypeing](https://github.com/spring-cloud/spring-cloud-contract/issues/1156)
-   [Complete documentation rewrite](https://github.com/spring-cloud/spring-cloud-contract/issues/1142)
-   [Added a switch to fail if no contracts were defined](https://github.com/spring-cloud/spring-cloud-contract/issues/1127)
-   [Added option to generate stubs on the consumer side](https://github.com/spring-cloud/spring-cloud-contract/issues/881). When the producer hasn't written the implementation, the consumer can still benefit from the stubs generated at runtime
-   [Added an option to fetch contracts and stubs directly from a folder without unpacking them](https://github.com/spring-cloud/spring-cloud-contract/issues/1150)
-   [Added TestNG support](https://github.com/spring-cloud/spring-cloud-contract/pull/1135)
-   Bumped libraries
-   Migrated a lot of code to Java
-   [Issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/54?closed=1)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   [Updates to support the latest HATEOS changes](https://github.com/spring-cloud/spring-cloud-openfeign/commit/35b9de7f6ef1669012cee5337a3943e7c16cc55a)

### [](#spring-cloud-stream)Spring Cloud Stream

-   [Release Announcement](https://spring.io/blog/2019/08/19/announcing-spring-cloud-stream-horsham-m3-3-0-0-m3)

### [](#spring-cloud-bus)Spring Cloud Bus

-   [Issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/39?closed=1)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Sets Rate Limiting Sampler as the default](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1399)
-   [Cleares any MDC entries that match a whitelist entry for baggage or propagation key even if the ExtraPropagation API wasn't called](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1416)
-   [Can send spans to Zipkin over ActiveMQ](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1408)

### [](#spring-cloud-function)Spring Cloud Function

-   [Release Announcement](https://spring.io/blog/2019/08/15/announcing-spring-cloud-function-3-0-0-m2)

The following modules were updated as part of Hoxton.M2:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Config | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/67?closed=1)) | Spring Cloud Cloudfoundry | 2.2.0.M2 |   | Spring Cloud Cli | 2.2.0.M1 |   | Spring Cloud Dependencies | Hoxton.M2 |   | Spring Cloud Zookeeper | 2.2.0.M2 |   | Spring Cloud Aws | 2.2.0.M2 |   | Spring Cloud Gateway | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/27?closed=1)) | Spring Cloud Netflix | 2.2.0.M2 |   | Spring Cloud Starter | Hoxton.M2 |   | Spring Cloud Kubernetes | 1.1.0.M2 |   | Spring Cloud Task | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/40?closed=1)) | Spring Cloud Commons | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/63?closed=1)) | Spring Cloud Build | 2.2.0.M4 |   | Spring Cloud Contract | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/54?closed=1)) | Spring Cloud Security | 2.2.0.M2 |   | Spring Cloud Openfeign | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/15?closed=1)) | Spring Cloud Stream | Horsham.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/63?closed=1)) | Spring Cloud Bus | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/39?closed=1)) | Spring Cloud Sleuth | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/64?closed=1)) | Spring Cloud Consul | 2.2.0.M2 |   | Spring Cloud | Hoxton.M2 |   | Spring Cloud Gcp | 1.2.0.M2 |   | Spring Cloud Function | 3.0.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/21?closed=1)) | Spring Cloud Release | Hoxton.M2 |   | Spring Cloud Vault | 2.2.0.M2 |  

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.M2</version>
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

repositories {
    maven {
        url 'https://repo.spring.io/milestone'
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.M2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
---
title: Spring Cloud Hoxton.M3 is now available
source: https://spring.io/blog/2019/10/05/spring-cloud-hoxton-m3-is-now-available
scraped: 2026-02-23T14:33:03.225Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 05, 2019 | 0 Comments
---

# Spring Cloud Hoxton.M3 is now available

_Releases | Spencer Gibb |  October 05, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that Milestone 3 (M3) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in the [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

This milestone release is compatible with Spring Boot 2.2.0.RC1.

### [](#spring-cloud-circuit-breaker)Spring Cloud Circuit Breaker

We welcome Spring Cloud Circuit Breaker as a new project under the Spring Cloud release train. This project provides an abstraction API for adding circuit breakers to your application. At the time of this blog post, there are four supported implementations:

-   Resilience4j
-   Spring Retry
-   Hystrix (in [spring-cloud-netflix](https://github.com/spring-cloud/spring-cloud-netflix/blob/master/spring-cloud-netflix-hystrix/src/main/java/org/springframework/cloud/netflix/hystrix/HystrixCircuitBreaker.java))
-   Sentinel (in [spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba/tree/master/spring-cloud-alibaba-sentinel))

See the [annoucement blog post](https://spring.io/blog/2019/04/16/introducing-spring-cloud-circuit-breaker) for more information.

### [](#spring-cloud-config)Spring Cloud Config

An Environment Repository supporting AWS S3.

### [](#spring-cloud-commons)Spring Cloud Commons

Many improvements were made to support Spring's Reactive stack. A `ReactiveDiscoveryClient` was created. Updates were also made to Spring Cloud Loadbalancer to use this new `ReactiveDiscoveryClient`. A new `spring-cloud-starter-loadbalancer` was added.

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

Support was added for the new `ReactiveDiscoveryClient`.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

Support was added for the new `ReactiveDiscoveryClient`.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Support was added for using the new `ReactiveLoadBalancer`. RSocket support was updated to implement features of the RSocket Routing and Forwarding specification extension.

RSocket support in Spring Cloud Gateway will be a technology preview when Hoxton is released until the RSocket Routing and Forwarding specification extension is finalized and the RSocket Java implementation is updated accordingly.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Support was added for the new `ReactiveDiscoveryClient` and the new Spring Cloud Circuit Breaker API implementation for Hystrix.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Support was added for the new `ReactiveDiscoveryClient`.

### [](#spring-cloud-contract)Spring Cloud Contract

Support was added for Spring Kafka.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

OpenFeign was updated to 10.4.0.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Support was added for AWS SQS, Spring Kafka, and Quartz.

### [](#spring-cloud-consul)Spring Cloud Consul

Support was added for the new `ReactiveDiscoveryClient` and for Consul's consistency mode.

### [](#spring-cloud-vault)Spring Cloud Vault

Support was added for PCF Authentication and the `X-Vault-Namespace`.

---

The following modules were updated as part of Hoxton.M3:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Config | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/69?closed=1)) | Spring Cloud Cloudfoundry | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/14?closed=1)) | Spring Cloud Cli | 2.2.0.M2 |  
| Spring Cloud Zookeeper | 2.2.0.M3 |  
| Spring Cloud Aws | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/26?closed=1)) | Spring Cloud Gateway | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/29?closed=1)) | Spring Cloud Netflix | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/84?closed=1)) | Spring Cloud Kubernetes | 1.1.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/15?closed=1)) | Spring Cloud Task | 2.2.0.M2 | ([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/40?closed=1)) | Spring Cloud Commons | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/64?closed=1)) | Spring Cloud Contract | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/55?closed=1)) | Spring Cloud Openfeign | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/16?closed=1)) | Spring Cloud Security | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-security/milestone/21?closed=1)) | Spring Cloud Bus | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/42?closed=1)) | Spring Cloud Stream | Horsham.M4 | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/64?closed=1)) | Spring Cloud Sleuth | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/65?closed=1)) | Spring Cloud Circuitbreaker | 1.0.0.M1 |  
| Spring Cloud Consul | 2.2.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/44?closed=1)) | Spring Cloud Vault | 2.2.0.M3 |  
| Spring Cloud Gcp | 1.2.0.M3 |  
| Spring Cloud Function | 3.0.0.M3 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/23?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

The following listing shows how to get started with Maven with a BOM (dependency management only):

```
Copy    <repositories>
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
            <version>Hoxton.M3</version>
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

The following listing shows how to get started with Gradle:

```
Copybuildscript {
dependencies {
classpath "io.spring.gradle:dependency-management-plugin:1.0.8.RELEASE"
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.M3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
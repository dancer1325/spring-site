---
title: Spring Cloud Hoxton.RC2 Released
source: https://spring.io/blog/2019/11/12/spring-cloud-hoxton-rc2-released
scraped: 2026-02-23T14:26:16.392Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  November 12, 2019 | 0 Comments
---

# Spring Cloud Hoxton.RC2 Released

_Releases | Ryan Baxter |  November 12, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 2 (RC2) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

Spring Cloud Hoxton.RC2 is built upon Spring Bot 2.2.1.RELEASE.

### [](#spring-cloud-vault)Spring Cloud Vault

-   [Issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/35?closed=1)

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   [Added property to disable Resilience4J auto-configuration](https://github.com/spring-cloud/spring-cloud-circuitbreaker/commit/aacf4d35183de568e560f0b9d6e5b54fdd680ecc)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added a [filter](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.0.RC2/reference/html/#spring-cloud-circuitbreaker-filter-factory) which uses the new Spring Cloud CircuitBreaker library to provide circuit breakers to routes

### [](#spring-cloud-config)Spring Cloud Config

-   Added the ability to [decrypt properties in plain text](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.0.RC2/reference/html/#_decrpyting_plain_text)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Bumped Brave to 5.8.0 (with the new sampling options)
-   [Improved Reactor performance by adding the new onLastOperator wrapping](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1478)
-   [Numerous bug fixes](https://github.com/orgs/spring-cloud/projects/30?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-sleuth)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Numerous bug fixes](https://github.com/orgs/spring-cloud/projects/30?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-contract)

### [](#spring-cloud-stream)Spring Cloud Stream

-   Add support to allow a single instance to consume from multiple partitions where non-native partitioning (e.g. RabbitMQ) requires an instance per partition
-   Backpressure Support in Reactive Consumers. Changed channel-to-publisher adapter logic to use `EmitterProcessor` which effectively transforms the `Publisher` to a back-pressure honoring one
-   Kafka binder - Provide a custom header mapper that is identical to the `DefaultKafkaHeaderMapper` in Spring Kafka. This is to address some interoperability issues between Spring Cloud Stream 3.0.x and 2.x apps
-   Kafka Streams binder - health indicator and metrics improvements
-   Rabbit binder - Support provisioning of Quorum queues - Add queue arguments to support provisioning quorum queues
-   Rabbit binder - Multiple partition support. Added support for partitioned multiplex
-   Enhancements in documentation

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   [Support for Spring Cloud LoadBalancer](https://github.com/spring-cloud/spring-cloud-openfeign/issues/177) has been added
-   [Issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/19?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Added [property](https://cloud.spring.io/spring-cloud-static/spring-cloud-netflix/2.2.0.RC2/reference/html/#disabling-spring-cloud-circuit-breaker-hystrix) to disable Spring Cloud CircuitBreaker Hystrix auto-configuration

The following modules were updated as part of Hoxton.RC2:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Aws | 2.2.0.RC2 |  
| Spring Cloud Vault | 2.2.0.RC2 |  
| Spring Cloud Circuitbreaker | 1.0.0.RC2 |  
| Spring Cloud Cli | 2.2.0.RC2 |  
| Spring Cloud Gateway | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/31?closed=1)) | Spring Cloud Zookeeper | 2.2.0.RC2 |  
| Spring Cloud Starter | Hoxton.RC2 |  
| Spring Cloud Build | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-build/milestone/26?closed=1)) | Spring Cloud Config | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/72?closed=1)) | Spring Cloud Dependencies Parent | 2.2.0.RC2 |  
| Spring Cloud Starter Parent | Hoxton.RC2 |  
| Spring Cloud Sleuth | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/69?closed=1)) | Spring Cloud Contract | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/58?closed=1)) | Spring Cloud Gcp | 1.2.0.RC2 |  
| Spring Cloud Bus | 2.2.0.RC2 |  
| Spring Cloud Consul | 2.2.0.RC2 |  
| Spring Cloud Stream | Horsham.RC2 |  
| Spring Cloud Kubernetes | 1.1.0.RC2 |  
| Spring Cloud Openfeign | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/19?closed=1)) | Spring Cloud Commons | 2.2.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/67?closed=1)) | Spring Cloud Dependencies | Hoxton.RC2 |  
| Spring Cloud Task | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/38?closed=1)) | Spring Cloud Function | 3.0.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/25?closed=1)) | Spring Cloud | Hoxton.RC2 |  
| Spring Cloud Netflix | 2.2.0.RC2 |  
| Spring Cloud Security | 2.2.0.RC2 |  
| Spring Cloud Release | Hoxton.RC2 |  
| Spring Cloud Cloudfoundry | 2.2.0.RC2 |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
    <repositories>
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
            <version>Hoxton.RC2</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.RC2'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
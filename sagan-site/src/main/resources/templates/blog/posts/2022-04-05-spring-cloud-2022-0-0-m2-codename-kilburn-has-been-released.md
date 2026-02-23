---
title: Spring Cloud 2022.0.0-M2 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/04/05/spring-cloud-2022-0-0-m2-codename-kilburn-has-been-released
scraped: 2026-02-23T12:45:06.241Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  April 05, 2022 | 0 Comments
---

# Spring Cloud 2022.0.0-M2 (codename Kilburn) Has Been Released

_Releases | Marcin Grzejszczak |  April 05, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 2 (M2) of the [Spring Cloud 2022.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-202200-m2-release-train)Notable Changes in the 2022.0.0-M2 Release Train

See [the project page](https://github.com/orgs/spring-cloud/projects/73) for all the issues and pull requests included in this release.

Spring Cloud 2022.0.0-M2 is compatible with Spring Boot 3.0.0-M2.

### [](#spring-cloud-stream)Spring Cloud Stream

-   Both Kafka and RabbitMQ binders for Spring Cloud Stream have been migrated as part of the core Spring Cloud Stream repository. With this change, Spring Cloud Stream now follows a mono-repo approach where all the framework-related codebase for Spring Cloud Stream is now part of a single repository. See more details [here](https://github.com/spring-cloud/spring-cloud-stream/tree/main/binders/kafka-binder) for the Kafka binder and [here](https://github.com/spring-cloud/spring-cloud-stream/tree/main/binders/rabbit-binder) for the RabbitMQ binder. We recommend filing new feature requests and bug reports for Kafka and RabbitMQ binders in the core repository.
-   Introduced initial support for a new [reactive Kafka binder](https://github.com/spring-cloud/spring-cloud-stream/tree/main/binders/kafka-binder/spring-cloud-stream-binder-kafka-reactive) based on [Reactor Kafka](https://projectreactor.io/docs/kafka/release/reference/). This support contains consumer and producer bindings using Reactor Kafka behind the scenes. See [this issue](https://github.com/spring-cloud/spring-cloud-stream/issues/2293) for more details.
-   Also, given we've been relying on the new test binder for 3+ years now we have also removed the old test modules

### [](#spring-cloud-config)Spring Cloud Config

-   Try multiple URLs when error response code received ([#1845](https://github.com/spring-cloud/spring-cloud-config/issues/1845))
-   Allow specification of down health status ([#2056](https://github.com/spring-cloud/spring-cloud-config/pull/2056))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Refactor configmaps and secrets implementation ([#917](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/917))

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bumped Pact to 4.2](https://github.com/spring-cloud/spring-cloud-contract/issues/1661)
-   [Bumped Groovy to 4](https://github.com/spring-cloud/spring-cloud-contract/issues/1762)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Add route predicate for "X-Forwarded-For" header ([#2384](https://github.com/spring-cloud/spring-cloud-gateway/issues/783))

### [](#spring-cloud-function)Spring Cloud Function

-   Support for adding multiple routers
-   Support for case-insensitive header key evaluation
-   [cve-2022-22963](https://spring.io/blog/2022/03/29/cve-report-published-for-spring-cloud-function)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Added possibility to retry on specific exceptions for the LoadBalancer](https://github.com/spring-cloud/spring-cloud-commons/issues/1043)

The following modules were updated as part of 2022.0.0-M2:

Module

Version

Issues

Spring Cloud Stream

4.0.0-M2

Spring Cloud Config

4.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/100?closed=1))

Spring Cloud Build

4.0.0-M2

Spring Cloud Kubernetes

3.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/42?closed=1))

Spring Cloud Circuitbreaker

3.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/13?closed=1))

Spring Cloud Contract

4.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/85?closed=1))

Spring Cloud Consul

4.0.0-M2

Spring Cloud Gateway

4.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/64?closed=1))

Spring Cloud Starter Build

2022.0.0-M2

Spring Cloud Function

4.0.0-M2

Spring Cloud Vault

4.0.0-M2

Spring Cloud Bus

4.0.0-M2

Spring Cloud Zookeeper

4.0.0-M2

Spring Cloud Task

3.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/56?closed=1))

Spring Cloud Commons

4.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/99?closed=1))

Spring Cloud Openfeign

4.0.0-M2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/51?closed=1))

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
            <version>2022.0.0-M2</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2022.0.0-M2'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
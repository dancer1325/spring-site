---
title: Spring Cloud 2021.0.0 (codename Jubilee) Has Been Released
source: https://spring.io/blog/2021/12/02/spring-cloud-2021-0-0-codename-jubilee-has-been-released
scraped: 2026-02-23T13:02:02.491Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 02, 2021 | 1 Comment
---

# Spring Cloud 2021.0.0 (codename Jubilee) Has Been Released

_Releases | Spencer Gibb |  December 02, 2021 | 1 Comment_

On behalf of the community, I am pleased to announce the General Availability of the [Spring Cloud 2021.0](https://cloud.spring.io) Release Train, codename Jubilee, is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.0/). You can check out the 2021.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes).

## [](#notable-changes-in-the-20210-release-train)Notable Changes in the 2021.0 Release Train

2021.0.0 is compatible with Spring Boot 2.6.1

See [the project page](https://github.com/orgs/spring-cloud/projects/59) for all the issues and pull requests included in this release.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Support for per LoadBalancer configuration properties (added as well to Gateway, Contract and OpenFeign).

### [](#spring-cloud-config)Spring Cloud Config

-   Integration with AWS Secrets Manager, AWS Parameter Store and GCP Secret Manager.

### [](#spring-cloud-function)Spring Cloud Function

-   Support for gRPC, FunctionCatalog via actuator endpoint, AWS improvements, CloudEvents etc. You can read more in [this blog post](https://spring.io/blog/2021/12/02/spring-cloud-function-3-2-is-out)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Redis Route Repository
-   HTTP 2 Support
-   gRPC Support

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Config Server and Discovery Controllers

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Support for `@Cachable`

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Instrumentation for Tomcat, Spring Vault, R2DBC, JDBC, Spring Cloud Deployer, Spring Cloud Skipper, Reactor Kafka, Spring TX, Spring Batch, RSocket, Spring Cloud Task, Spring Cloud Config, Kotlin Coroutines, and more.

### [](#spring-cloud-stream)Spring Cloud Stream

-   About 100 issues have been resolved for this release between [core](https://github.com/spring-cloud/spring-cloud-stream/milestone/82?closed=1), [Kafka](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka/issues?q=is%3Aissue+milestone%3A3.2.0+is%3Aclosed) and [Rabbit](https://github.com/spring-cloud/spring-cloud-stream-binder-rabbit/milestone/51?closed=1) binders.

The following modules were updated as part of 2021.0.0:

Module

Version

Issues

Spring Cloud Vault

3.1.0

Spring Cloud Bus

3.1.0

Spring Cloud Cli

3.1.0

Spring Cloud Zookeeper

3.1.0

Spring Cloud Circuitbreaker

2.1.0

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/11?closed=1))

Spring Cloud Commons

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/96?closed=1))

Spring Cloud Kubernetes

2.1.0

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/38?closed=1))

Spring Cloud OpenFeign

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/47?closed=1))

Spring Cloud Task

2.4.0

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/53?closed=1))

Spring Cloud Sleuth

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/97?closed=1))

Spring Cloud Contract

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/83?closed=1))

Spring Cloud Consul

3.1.0

Spring Cloud Function

3.2.1

([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/37?closed=1))

Spring Cloud Stream

3.2.1

see above for the list of issues

Spring Cloud Gateway

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/60?closed=1))

Spring Cloud Config

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/96?closed=1))

Spring Cloud Cloudfoundry

3.1.0

Spring Cloud Starter Build

2021.0.0

Spring Cloud Netflix

3.1.0

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/108?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy
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
  id 'org.springframework.boot' version '2.6.1'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.0")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
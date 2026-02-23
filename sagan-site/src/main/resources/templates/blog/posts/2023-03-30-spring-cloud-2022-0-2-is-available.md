---
title: Spring Cloud 2022.0.2 Is Available
source: https://spring.io/blog/2023/03/30/spring-cloud-2022-0-2-is-available
scraped: 2026-02-23T09:58:15.889Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  March 30, 2023 | 0 Comments
---

# Spring Cloud 2022.0.2 Is Available

_Releases | Spencer Gibb |  March 30, 2023 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0.2](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2022.0.2/). You can check out the 2022.0.2 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#202202).

## [](#notable-changes-in-the-202202-release-train)Notable Changes in the 2022.0.2 Release Train

See all issues and pull requests included in this release [here](https://github.com/orgs/spring-cloud/projects/104/views/1?layout=board).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Added support for external name services using the Fabric8 `DiscoveryClient` ([#1243](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1243))
-   Add Pod metadata and annotations to `ServiceInstance` ([#1254](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1254))

### [](#spring-cloud-contract)Spring Cloud Contract

-   Allow sendMessage to handle body from file (.[1867](https://github.com/spring-cloud/spring-cloud-contract/pull/1867))
-   Relaxed SSL validation with RestTemplate interceptors ([#1869](https://github.com/spring-cloud/spring-cloud-contract/pull/1869))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Allow emitting healthcheck instances in batches ([#1122](https://github.com/spring-cloud/spring-cloud-commons/issues/1122))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Register native reflection hints for user-provided parameters and return types ([#849](https://github.com/spring-cloud/spring-cloud-openfeign/pull/849))
-   Support setting FeignClient URL in runtime for native images ([#807](https://github.com/spring-cloud/spring-cloud-openfeign/issues/807))
-   Allow setting protocols for underlying OKHttp client ([#825](https://github.com/spring-cloud/spring-cloud-openfeign/pull/825))
-   Add the possibility to use factory beans for Fallback ([#822](https://github.com/spring-cloud/spring-cloud-openfeign/issues/822))

### [](#spring-cloud-function)Spring Cloud Function

[Bug Fixes and enhancements](https://github.com/spring-cloud/spring-cloud-function/milestone/46?closed=1)

### [](#spring-cloud-stream)Spring Cloud Stream

Add support for DLQ in batch mode [Bug Fixes and enhancements](https://github.com/spring-cloud/spring-cloud-stream/milestone/86?closed=1)

### [](#spring-cloud-consul)Spring Cloud Consul

-   Fixed an issue where `CONSUL_TOKEN` wasn't read when using `spring.config.import=consul:` ([738](https://github.com/spring-cloud/spring-cloud-consul/issues/738))
-   ACL Token is now passed to `agentCheckPass` ([770](https://github.com/spring-cloud/spring-cloud-consul/issues/770))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   The global cache can now be disabled when using Local Response Cache ([2895](https://github.com/spring-cloud/spring-cloud-gateway/issues/2895))

---

The following modules were updated as part of 2022.0.2:

Module

Version

Issues

Spring Cloud Vault

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/55?closed=1))

Spring Cloud Circuitbreaker

3.0.1

 

Spring Cloud Kubernetes

3.0.2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/57?closed=1))

Spring Cloud Task

3.0.2

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/71?closed=1))

Spring Cloud Function

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/46?closed=1))

Spring Cloud Commons

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/112?closed=1))

Spring Cloud Openfeign

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/61?closed=1))

Spring Cloud Stream

4.0.2

 

Spring Cloud Consul

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/67?closed=1))

Spring Cloud Contract

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/100?closed=1))

Spring Cloud Gateway

4.0.4

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/79?closed=1))

Spring Cloud Config

4.0.2

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/113?closed=1))

Spring Cloud Netflix

4.0.1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/119?closed=1))

Spring Cloud Build

4.0.2

 

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.2</version>
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
Copyplugins {
  id 'java'
  id 'org.springframework.boot' version '3.0.5'
  id 'io.spring.dependency-management' version '1.1.0'
}

ext {
  set('springCloudVersion', "2022.0.2")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  // ...
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

```
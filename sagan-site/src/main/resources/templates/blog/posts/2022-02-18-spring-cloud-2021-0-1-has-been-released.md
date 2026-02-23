---
title: Spring Cloud 2021.0.1 Has Been Released
source: https://spring.io/blog/2022/02/18/spring-cloud-2021-0-1-has-been-released
scraped: 2026-02-23T12:49:27.108Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  February 18, 2022 | 0 Comments
---

# Spring Cloud 2021.0.1 Has Been Released

_Releases | Ryan Baxter |  February 18, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 1 of the [Spring Cloud 2021.0](https://cloud.spring.io) Release Train is available today. This was primarily a bug fix release. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.1/). You can check out the 2021.0.1 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes#202101).

## [](#notable-changes-in-the-202101-release-train)Notable Changes in the 2021.0.1 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/69) for all issues included in the release.

### [](#spring-cloud-config)Spring Cloud Config

-   Fix pattern matching bug with JSON, YAML, and properties files ([2020](https://github.com/spring-cloud/spring-cloud-config/issues/2020))

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Numerous bug fixes](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/98?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-contract/milestone/84?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   A new route predicate that checks for allowed values for the `X-Forwarded-For` header, similar to the `RemoteAddr` predicate. ([783](https://github.com/spring-cloud/spring-cloud-gateway/issues/783))
-   Allows setting of the `order` of the Gateway `HandlerMapping`. By default, the Gateway `HandlerMapping` has precedence, but it can be changed if require. ([2469](https://github.com/spring-cloud/spring-cloud-gateway/issues/2469))

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Feign upgraded to 11.8 ([664](https://github.com/spring-cloud/spring-cloud-openfeign/issues/664))
-   Added possibility to configure `readTimeout` for OkHttpClient ([665](https://github.com/spring-cloud/spring-cloud-openfeign/issues/655)
-   Improved `FeignAutoconfiguration` so that `OAuth2FeignRequestInterceptor` can contain `AccessTokenProvider` with load balanced interceptor ([631](https://github.com/spring-cloud/spring-cloud-openfeign/issues/631))

The following modules were updated as part of 2021.0.1:

Module

Version

Issues

Spring Cloud Config

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/97?closed=1))

Spring Cloud Zookeeper

3.1.1

Spring Cloud Circuitbreaker

2.1.1

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/12?closed=1))

Spring Cloud Kubernetes

2.1.1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/39?closed=1))

Spring Cloud Commons

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/97?closed=1))

Spring Cloud Sleuth

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/98?closed=1))

Spring Cloud Contract

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/84?closed=1))

Spring Cloud Task

2.4.1

([Issues](https://github.com/spring-cloud/spring-cloud-task/milestone/57?closed=1))

Spring Cloud Gateway

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/63?closed=1))

Spring Cloud Openfeign

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/48?closed=1))

Spring Cloud Starter Build

2021.0.1

Spring Cloud Netflix

3.1.1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/106?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.1</version>
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
  id 'org.springframework.boot' version '2.6.3'
  id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  id 'java'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2021.0.1")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}
```
---
title: Spring Cloud 2020.0.0 (aka Ilford) Is Available
source: https://spring.io/blog/2020/12/22/spring-cloud-2020-0-0-aka-ilford-is-available
scraped: 2026-02-23T13:36:34.112Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 22, 2020 | 10 Comments
---

# Spring Cloud 2020.0.0 (aka Ilford) Is Available

_Releases | Ryan Baxter |  December 22, 2020 | 10 Comments_

On behalf of the community, I am pleased to announce that the GA release of the [Spring Cloud 2020.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2020.0.0/). You can check out the 2020.0 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-20200-release-train)Notable Changes in the 2020.0 Release Train

This release requires Spring Boot 2.4.1. In general, this release was to fix bugs prior to release.

See [this page](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#known-issues) for a list of Known Issues.

See the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/51).

### [](#spring-cloud-commons)Spring Cloud Commons

NOTE: Bootstrap has been disabled by default. The new way of importing configuration is via the new `spring.config.import` functionality provided by Spring Boot 2.4. Please see the appropriate documentation for [Config Client](https://docs.spring.io/spring-cloud-config/docs/3.0.0/reference/html/#config-data-import), [Consul](https://docs.spring.io/spring-cloud-consul/docs/3.0.0/reference/html/#config-data-import), [Vault](https://docs.spring.io/spring-cloud-vault/docs/3.0.0/reference/html/#client-side-usage), and [Zookeeper](https://docs.spring.io/spring-cloud-zookeeper/docs/3.0.0/reference/html/#config-data-import) for details on how to use them with the new config import.

If you require the legacy bootstrap functionality add the `org.springframework.cloud:spring-cloud-starter-bootstrap` dependency to your project.

-   Spring Cloud LoadBalancer now supports server statistics ([PR](https://github.com/spring-cloud/spring-cloud-commons/issues/674))
-   General Security functionality was moved here from the now defunct Spring Cloud Security project [PR](https://github.com/spring-cloud/spring-cloud-commons/pull/870/files)
-   Support for decryption with `spring.config.import` was added ([issue](https://github.com/spring-cloud/spring-cloud-commons/issues/815))

### [](#spring-cloud-contract)Spring Cloud Contract

Documented how to clone the project on windows.

### [](#spring-cloud-function)Spring Cloud Function

-   Support for Cloud Events. See [Cloud Events and Spring - part 1](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1) and [Cloud Events and Spring - part 2](https://spring.io/blog/2020/12/23/cloud-events-and-spring-part-2). You can also check out several samples available [here](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-samples) and described in details in the blog posts mentioned before.
-   Support for [RSocket](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-rsocket). Separate blog post will be published shortly however [Cloud Events and Spring - part 2](https://spring.io/blog/2020/12/23/cloud-events-and-spring-part-2) provides an example that uses RSocket.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Added reactive discovery client implementation based on the Kubernetes Java Client ([PR](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/701))
-   Added Spring Cloud Loadbalancer implementation based on the Kubernetes Java Client ([PR](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/700))

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Added support for wrapping feign clients in Spring Cloud CircuitBreakers ([PR](https://github.com/spring-cloud/spring-cloud-openfeign/pull/446))
-   Spring Cloud OpenFeign security code moved from Spring Cloud Security to Spring Cloud OpenFeign ([PR](https://github.com/spring-cloud/spring-cloud-openfeign/pull/445))
-   Support for LoadBalancer statistics has been added ([PR](https://github.com/spring-cloud/spring-cloud-openfeign/pull/447))

### [](#spring-cloud-security)Spring Cloud Security

-   This project was removed and code was moved to the individual Spring Cloud projects.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Support for LoadBalancer statistics has been added ([PR](https://github.com/spring-cloud/spring-cloud-gateway/pull/2086))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   A number of deprecated modules have been removed. See the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for details
-   TLS properties now supported with the `RestTemplate` based Eureka Client ([PR](https://github.com/spring-cloud/spring-cloud-netflix/issues/3935))

### [](#spring-cloud-task)Spring Cloud Task

-   Added documentation for single step batch jobs. ([PR](https://github.com/spring-cloud/spring-cloud-task/issues/755))

The following modules were updated as part of 2020.0.0:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Circuitbreaker | 2.0.0 |  
| Spring Cloud Contract | 3.0.0 |  
| Spring Cloud Kubernetes | 2.0.0 |  
| Spring Cloud Commons | 3.0.0 |  
| Spring Cloud Openfeign | 3.0.0 |  
| Spring Cloud Cloudfoundry | 3.0.0 |  
| Spring Cloud Bus | 3.0.0 |  
| Spring Cloud Cli | 3.0.0 |  
| Spring Cloud Zookeeper | 3.0.0 |  
| Spring Cloud Sleuth | 3.0.0 |  
| Spring Cloud Consul | 3.0.0 |  
| Spring Cloud Starter Build | 2020.0.0 |   | Spring Cloud Gateway | 3.0.0 |  
| Spring Cloud Netflix | 3.0.0 |  
| Spring Cloud Vault | 3.0.0 |  
| Spring Cloud Config | 3.0.0 |  
| Spring Cloud Task | 2.3.0 | ([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/2.3.0))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2020.0.0</version>
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
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:1.0.10.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
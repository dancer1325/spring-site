---
title: Spring Cloud 2022.0.0  (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/12/16/spring-cloud-2022-0-0-codename-kilburn-has-been-released
scraped: 2026-02-23T10:21:58.559Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 16, 2022 | 2 Comments
---

# Spring Cloud 2022.0.0  (codename Kilburn) Has Been Released

_Releases | Ryan Baxter |  December 16, 2022 | 2 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2022.0.0/). You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-202200-release-train)Notable Changes in the 2022.0.0 Release Train

Spring Cloud 2022.0.0 is a major release that builds upon Spring Framework 6.x and Spring Boot 3.x. This includes compatibility with Jakarta EE and requires a Java 17 baseline. See [here](https://github.com/orgs/spring-cloud/projects/96) for the issues included in this release. Below are highlights from all of the 2022.0.0 milestone, release candidate and GA releases.

### [](#spring-cloud-openfeign-feature-complete-announcement)Spring Cloud OpenFeign feature complete announcement

Since Spring now provides its own interface HTTP clients solution, starting with 2022.0.0, we're going to treat Spring Cloud OpenFeign as feature complete. This means that the Spring Cloud team will no longer be adding new features to the module. We will still fix bugs and security issues, and we will also consider and review small pull requests from the community.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Removed the use of `@ConditionalOnKubernetesEnabled` in favor of `@ConditionalOnCloudPlatform` from Spring Boot ([893](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/893))
-   Refactor configmaps and secrets implementation ([#917](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/917))
-   Load Config Maps and Secrets using `spring.config.import` removing the need to use Bootstrap context ([1002](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1002))
-   Secrets and Config Maps support prefixes ([765](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/765))
-   Filter service discovery by namespace ([#1000](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1000))
-   KubernetesCatalogWatch should support namespaces ([#1158](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1158))
-   Upgrade To Kubernetes Java Client 17 ([#1168](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1168))
-   Update to fabric8 6.2.0 ([#1165](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1165))
-   Use endpoint slices for fabric8 catalog watcher ([#1149](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1146))

### [](#spring-cloud-function)Spring Cloud Function

-   Added support for AOT & native

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Bump Resilience4J To 2.0.2
-   Add support for disabling threadpools when running Resilient4J circuitbreakers ([147](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/147))

### [](#spring-cloud-task)Spring Cloud Task

-   Find out what is new and changed in Spring Cloud Tasks ([release notes](https://github.com/spring-cloud/spring-cloud-task/releases))
-   Read More on how to migrate from Spring Cloud Task 2.x to 3.0 in the ([migration guide](https://github.com/spring-cloud/spring-cloud-task/wiki/Spring-Cloud-Task-3.0-Migration-Guide))

### [](#spring-cloud-stream)Spring Cloud Stream

-   Added support for AOT & native

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Allow customising load-balanced requests based on the selected `ServiceInstance` ([#735](https://github.com/spring-cloud/spring-cloud-openfeign/pull/735))
-   Added support for target URL refreshing ([#710](https://github.com/spring-cloud/spring-cloud-openfeign/issues/710))
-   Added support for LoadBalancer X-Forwarded Headers ([#748](https://github.com/spring-cloud/spring-cloud-openfeign/pull/748))
-   Set Jackson Autoconfiguration to be enabled by default ([#476](https://github.com/spring-cloud/spring-cloud-openfeign/pull/476))
-   Removed deprecations and adjusted to the API changes in Feign ([#768](https://github.com/spring-cloud/spring-cloud-openfeign/pull/768))
-   Removed usage of Spring Cloud Commons HttpClient interfaces ([#788](https://github.com/spring-cloud/spring-cloud-openfeign/pull/788))
-   Apache HttpClient 4 has been removed in favour of Apache HttpClient 5 ([#783](https://github.com/spring-cloud/spring-cloud-openfeign/issues/783))
-   Upgraded to Feign `12.0` ([#782](https://github.com/spring-cloud/spring-cloud-openfeign/pull/782))
-   Support for AOT and native images has been added ([#794](https://github.com/spring-cloud/spring-cloud-openfeign/pull/794))
-   Support for Micrometer Observation API has been added (\[#793\][https://github.com/spring-cloud/spring-cloud-openfeign/pull/793](https://github.com/spring-cloud/spring-cloud-openfeign/pull/793)))
-   Feign has been upgraded to Feign `12.1` ([#792](https://github.com/spring-cloud/spring-cloud-openfeign/pull/792))
-   Added possibility to configure `ResponseInterceptor` ([#802](https://github.com/spring-cloud/spring-cloud-openfeign/issues/802))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Adds registration lifecycle listeners ([#999](https://github.com/spring-cloud/spring-cloud-commons/issues/999))
    
-   Request data context for blocking LoadBalancer client requests has been made available to lifecycle callbacks ([#1090](https://github.com/spring-cloud/spring-cloud-commons/issues/1090))
    
-   The OAuth integration has been migrated from the deprecated Spring Security OAuth to OAuth2 support in Spring Security ([#1053](https://github.com/spring-cloud/spring-cloud-commons/issues/1053))
    
-   [Added possibility to retry on specific exceptions for the LoadBalancer](https://github.com/spring-cloud/spring-cloud-commons/issues/1043)
    
-   Adds registration lifecycle listeners (#999[https://github.com/spring-cloud/spring-cloud-commons/issues/999](https://github.com/spring-cloud/spring-cloud-commons/issues/999))
    
-   Request data context for blocking LoadBalancer client requests has been made available to lifecycle callbacks ([#1090](https://github.com/spring-cloud/spring-cloud-commons/issues/1090))
    
-   Added the possibility to eagerly create LoadBalancer child contexts ([#729](https://github.com/spring-cloud/spring-cloud-commons/issues/729))
    
-   Added Weight-based load-balancing ([#1063](https://github.com/spring-cloud/spring-cloud-commons/issues/1063))
    
-   Added support for LoadBalancer child contexts in AOT and native image support ([#1135](https://github.com/spring-cloud/spring-cloud-commons/pull/1135))
    
-   Support added for property-based configuration for weighted load-balancing ([#1163](https://github.com/spring-cloud/spring-cloud-commons/pull/1163))
    
-   Removed Interfaces relying on Apache HttpClient v4. Removed OK HttpClient interfaces as they were only used by Spring Cloud OpenFeign. Spring Cloud OpenFeign now uses the OK HttpClient directly ([#1171](https://github.com/spring-cloud/spring-cloud-commons/issues/1171))
    
-   Deprecated classes and interfaces have been removed. See breaking changes in the [Spring Cloud 2022 Release Notes](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#breaking-changes)
    
-   Switched to lazily initializing child contexts in AOT mode ([#1176](https://github.com/spring-cloud/spring-cloud-commons/pull/1176))
    

### [](#spring-cloud-contract)Spring Cloud Contract

-   Removes Gradle's support for `src/test/resources/contracts` checking ([#1848](https://github.com/spring-cloud/spring-cloud-contract/issues/1848))
-   [Remove Spring Cloud Contract Pact integration](https://github.com/spring-cloud/spring-cloud-contract/issues/1845)
-   [Maven 3.6 as prerequisite for Maven plugin](https://github.com/spring-cloud/spring-cloud-contract/issues/1839)
-   [Leave only code input triggers and output message type](https://github.com/spring-cloud/spring-cloud-contract/issues/321) and [#1837](https://github.com/spring-cloud/spring-cloud-contract/issues/1837)
-   [Removing support for mocked AMQP, OOB AMQP and OOB Kafka](https://github.com/spring-cloud/spring-cloud-contract/issues/1838)
-   Bumps Rest Assured to 5.1.0
-   Removed reference to Spring Cloud Function Compiler
-   [Bumped Pact to 4.2](https://github.com/spring-cloud/spring-cloud-contract/issues/1661)
-   [Bumped Groovy to 4](https://github.com/spring-cloud/spring-cloud-contract/issues/1762)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Updated to Eureka 2.0.0. Eureka 2.0.0 is a new branch of Eureka unrelated to the [old 2.x-archive](https://github.com/Netflix/eureka/tree/2.x-archive) experiment from 7 years ago. The new [2.x](https://github.com/Netflix/eureka/tree/2.x) branch is for compatibility with JakartaEE. This allows Spring Cloud Netflix to be compatible with Spring Framework 6.0 and Spring Boot 3.0.
-   Migrated Apache HttpClient to Apache HC5 HttpClient ([#4126](https://github.com/spring-cloud/spring-cloud-netflix/pull/4126))

### [](#spring-cloud-consul)Spring Cloud Consul

-   Added support for AOT & native

### [](#spring-cloud-config)Spring Cloud Config

-   Try multiple URLs when error response code received ([#1845](https://github.com/spring-cloud/spring-cloud-config/issues/1845))
-   Allow specification of down health status ([#2056](https://github.com/spring-cloud/spring-cloud-config/pull/2056))
-   Moved to AWS SDK V2 ([#2111](https://github.com/spring-cloud/spring-cloud-config/pull/2111))
-   Moved from JSCH to Apache MINA ([#1901](https://github.com/spring-cloud/spring-cloud-config/issues/1901))
-   Added support for [Spring Native support for Config Client](https://docs.spring.io/spring-cloud-config/docs/4.0.0-RC1/reference/html/#_aot_and_native_image_support_2)
-   Spring Vault upgraded to 3.0.0 ([2193](https://github.com/spring-cloud/spring-cloud-config/issues/2193))
-   Bump JGit to 6.4 ([#2198](https://github.com/spring-cloud/spring-cloud-config/pull/2198))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added support for AOT & native
-   Added a `LocalResponseCache` filter ([2759](https://github.com/spring-cloud/spring-cloud-gateway/pull/2759))
-   Added micrometer `Observability` support ([2715](https://github.com/spring-cloud/spring-cloud-gateway/pull/2715))

---

The following modules were updated as part of 2022.0.0:

Module

Version

Issues

Spring Cloud Vault

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/53?closed=1))

Spring Cloud Kubernetes

3.0.0

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/55?closed=1))

Spring Cloud Function

4.0.0

Spring Cloud Zookeeper

4.0.0

Spring Cloud Circuitbreaker

3.0.0

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/19?closed=1))

Spring Cloud Task

3.0.0

Spring Cloud Bus

4.0.0

Spring Cloud Stream

4.0.0

Spring Cloud Openfeign

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/59?closed=1))

Spring Cloud Commons

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/109?closed=1))

Spring Cloud Contract

4.0.0

Spring Cloud Starter Build

2022.0.0

Spring Cloud Netflix

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/117?closed=1))

Spring Cloud Consul

4.0.0

Spring Cloud Config

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/112?closed=1))

Spring Cloud Build

4.0.0

Spring Cloud Gateway

4.0.0

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/74?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2022.0.0</version>
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
  id 'org.springframework.boot' version '3.0.0'
  id 'io.spring.dependency-management' version '1.1.0'
}

repositories {
  mavenCentral()
}

ext {
  set('springCloudVersion', "2022.0.0")
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
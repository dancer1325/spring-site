---
title: Spring Cloud 2022.0.0-RC1 Is Available
source: https://spring.io/blog/2022/10/31/spring-cloud-2022-0-0-rc1-is-available
scraped: 2026-02-23T10:35:55.153Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  October 31, 2022 | 0 Comments
---

# Spring Cloud 2022.0.0-RC1 Is Available

_Releases | Spencer Gibb |  October 31, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud 2022.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-202200-release-train)Notable Changes in the 2022.0.0 Release Train

See all issues closed [here](https://github.com/orgs/spring-cloud/projects/86/).

### [](#spring-cloud-function)Spring Cloud Function

-   Updates for Observability and Native Hints

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Added support for target URL refreshing ([#710](https://github.com/spring-cloud/spring-cloud-openfeign/issues/710))
-   Added support for LoadBalancer X-Forwarded Headers ([#748](https://github.com/spring-cloud/spring-cloud-openfeign/pull/748))
-   Set Jackson Autoconfiguration to be enabled by default ([#476](https://github.com/spring-cloud/spring-cloud-openfeign/pull/476))
-   Removed deprecations and adjusted to the API changes in Feign ([#768](https://github.com/spring-cloud/spring-cloud-openfeign/pull/768))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Support added for property-based configuration for weighted load-balancing ([#1163](https://github.com/spring-cloud/spring-cloud-commons/pull/1163))

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Migrated Apache HttpClient to Apache HC5 HttpClient ([#4126](https://github.com/spring-cloud/spring-cloud-netflix/pull/4126))

### [](#spring-cloud-stream)Spring Cloud Stream

-   Updates for Observability

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added option to [configure CORS per route](https://github.com/spring-cloud/spring-cloud-gateway/pull/2750)
-   Added support for [URI variables for Circuit Breaker filter](https://github.com/spring-cloud/spring-cloud-gateway/pull/2755)
-   Added support for [a local response cache filter](https://github.com/spring-cloud/spring-cloud-gateway/pull/2759)

### [](#spring-cloud-config)Spring Cloud Config

-   Added support for [Spring Native support for Config Client](https://docs.spring.io/spring-cloud-config/docs/4.0.0-RC1/reference/html/#_aot_and_native_image_support_2)

The following modules were updated as part of 2022.0.0-RC1:

Module

Version

Issues

Spring Cloud Bus

4.0.0-RC1

Spring Cloud Contract

4.0.0-RC1

Spring Cloud Function

4.0.0-RC1

Spring Cloud Vault

4.0.0-RC1

Spring Cloud Circuitbreaker

3.0.0-RC1

Spring Cloud Openfeign

4.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/56?closed=1))

Spring Cloud Zookeeper

4.0.0-RC1

Spring Cloud Commons

4.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/106?closed=1))

Spring Cloud Kubernetes

3.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/51?closed=1))

Spring Cloud Task

3.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/66?closed=1))

Spring Cloud Netflix

4.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/115?closed=1))

Spring Cloud Stream

4.0.0-RC1

Spring Cloud Consul

4.0.0-RC1

Spring Cloud Starter Build

2022.0.0-RC1

Spring Cloud Gateway

4.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/71?closed=1))

Spring Cloud Config

4.0.0-RC1

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/108?closed=1))

Spring Cloud Build

4.0.0-RC1

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
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
            <version>2022.0.0-RC1</version>
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
  id 'org.springframework.boot' version '3.0.0-RC1'
  id 'io.spring.dependency-management' version '1.1.0'
  id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2022.0.0-RC1")
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}
```
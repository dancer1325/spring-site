---
title: Spring Cloud 2023.0.2 (OSS) and 2022.0.7 (Enterprise) Have Been Released
source: https://spring.io/blog/2024/05/31/spring-cloud-2023-0-2-oss-and-2022-0-7-enterprise-have-been-released
scraped: 2026-02-23T08:35:38.872Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  May 31, 2024 | 0 Comments
---

# Spring Cloud 2023.0.2 (OSS) and 2022.0.7 (Enterprise) Have Been Released

_Releases | Glenn Renfro |  May 31, 2024 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2023.0.2](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2023.0.2/). You can check out the 2023.0.2 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes).

We are also pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2022.0.7](https://enterprise.spring.io) Release Train is available today. More information can be found at [https://spring.io/support](https://spring.io/support) .

## [](#notable-changes-in-the-202302-release-train)Notable Changes in the 2023.0.2 Release Train

This release adds compatibility to Spring Boot 3.3.x as well as Spring Boot 3.2.x.

See [the GitHub project](https://github.com/orgs/spring-cloud/projects/137) for all changes made in this release.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Upgraded Kubernetes Java Client To 19.0.1
-   Add selective namespaces to fabric8 loadbalancer [(#1604)](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1604)
-   Return all PropertySources from the config server [(#1600)](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/1600)

### [](#spring-cloud-function)Spring Cloud Function

-   Ability to mask sensitive values in [AWS workloads](https://github.com/spring-cloud/spring-cloud-function/issues/1140)
-   Enhancements in [AWS serverless web initialisation](https://github.com/spring-cloud/spring-cloud-function/issues/1138)
-   Support for null return types in function composition

### [](#spring-cloud-stream)Spring Cloud Stream

-   Number of [fixes and enhancements](https://github.com/spring-cloud/spring-cloud-stream/milestone/96?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Make the client response available as a request attribute in Server WebMVC [(#3405)](https://github.com/spring-cloud/spring-cloud-gateway/issues/3405)

### [](#spring-cloud-config)Spring Cloud Config

-   Allow users to provide a customizer to customize the HttpClient behavior [(#2410)](https://github.com/spring-cloud/spring-cloud-config/issues/2410)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Add support for configuring RestTemplate via RestTemplateBuilder [(#4262)](https://github.com/spring-cloud/spring-cloud-netflix/pull/4262)
-   Upgrade to Eureka Server 2.0.2

The following modules were updated as part of 2023.0.2:

Module

Version

Issues

Spring Cloud Vault

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v4.1.2))

Spring Cloud Kubernetes

3.1.2

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v3.1.2))

Spring Cloud Function

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v4.1.2))

Spring Cloud Commons

4.1.3

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v4.1.3))

Spring Cloud Openfeign

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v4.1.2))

Spring Cloud Starter Build

2023.0.2

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2023.0.2))

Spring Cloud Stream

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v4.1.2))

Spring Cloud Gateway

4.1.4

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v4.1.4))

Spring Cloud Contract

4.1.3

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v4.1.3))

Spring Cloud Config

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v4.1.2))

Spring Cloud Build

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v4.1.2))

Spring Cloud Netflix

4.1.2

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v4.1.2))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.2</version>
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
classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
}
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2023.0.2'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
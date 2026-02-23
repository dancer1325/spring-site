---
title: Spring Cloud 2021.0.5 (codename Jubilee) Has Been Released
source: https://spring.io/blog/2022/11/08/spring-cloud-2021-0-5-codename-jubilee-has-been-released
scraped: 2026-02-23T10:34:01.151Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oleg Zhurakousky |  November 08, 2022 | 0 Comments
---

# Spring Cloud 2021.0.5 (codename Jubilee) Has Been Released

_Releases | Oleg Zhurakousky |  November 08, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud 2021.0.5](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/2021.0.5/). You can check out the 2021.0.5 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0.5-Release-Notes).

## [](#notable-changes-in-the-202105-release-train)Notable Changes in the 2021.0.5 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/82) for all the issues and pull requests included in this release.

### [](#spring-cloud-function)Spring Cloud Function

-   Add support for Azure Timer Trigger in spring-cloud-function-azure
    
-   Enhancement to AWS Function Invoker in spring-cloud-function-aws to programmatically inject function definition
    
-   Add support for Azure Timer Trigger in spring-cloud-function-azure
    

### [](#spring-cloud-config)Spring Cloud Config

-   Align Jdbc Repository's behavior with Git Repository ([#2171](https://github.com/spring-cloud/spring-cloud-config/pull/2171))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Allow setting attributes in LoadBalancer `RequestData` ([#1142](https://github.com/spring-cloud/spring-cloud-commons/pull/1142))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Spring Security OAuth2 support has been added ([#644](https://github.com/spring-cloud/spring-cloud-openfeign/issues/644))

The following modules were updated as part of 2021.0.4:

Module

Version

Spring Cloud Netflix

3.1.4

Spring Cloud Config

3.1.5

Spring Cloud Build

3.1.5

Spring Cloud Sleuth

3.1.5

Spring Cloud Gateway

3.1.4

Spring Cloud Starter Build

2021.0.5

Spring Cloud Consul

3.1.2

Spring Cloud Contract

3.1.5

Spring Cloud Kubernetes

2.1.5

Spring Cloud Zookeeper

3.1.3

Spring Cloud Task

2.4.5

Spring Cloud Openfeign

3.1.5

Spring Cloud Circuitbreaker

2.1.5

Spring Cloud Stream

3.2.6

Spring Cloud Commons

3.1.5

Spring Cloud Function

3.2.8

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.5</version>
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

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2021.0.5'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
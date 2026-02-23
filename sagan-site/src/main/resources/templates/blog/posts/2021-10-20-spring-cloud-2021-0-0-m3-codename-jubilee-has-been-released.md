---
title: Spring Cloud 2021.0.0-M3 (codename Jubilee) Has Been Released
source: https://spring.io/blog/2021/10/20/spring-cloud-2021-0-0-m3-codename-jubilee-has-been-released
scraped: 2026-02-23T13:06:22.067Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 20, 2021 | 2 Comments
---

# Spring Cloud 2021.0.0-M3 (codename Jubilee) Has Been Released

_Releases | Ryan Baxter |  October 20, 2021 | 2 Comments_

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud 2021](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2021 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2021-Release-Notes).

## [](#notable-changes-in-the-2021-release-train)Notable Changes in the 2021 Release Train

Milestone 3 is compatible with Spring Boot 2.6.0-M3.

See the [project page](https://github.com/orgs/spring-cloud/projects/58) for all the issues and pull requests included in this release.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added initial support for gRPC [#2388](https://github.com/spring-cloud/spring-cloud-gateway/pull/2388)

### [](#spring-cloud-function)Spring Cloud Function

-   Aside form various enhancements and bug fixes this milestone of Spring Cloud Function introduces initial support for gRPC.

Initial documentation is available [here](https://github.com/spring-cloud/spring-cloud-function/tree/main/spring-cloud-function-adapters/spring-cloud-function-grpc). Samples, more documentation and separate blog post are coming as well.

### [](#spring-cloud-vault)Spring Cloud Vault

-   TOKEN auth from file (~/.vault\_token) \[#609\]([https://github.com/spring-cloud/spring-cloud-vault/issues/609](https://github.com/spring-cloud/spring-cloud-vault/issues/609)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Added [Exemplars support](https://github.com/spring-cloud/spring-cloud-sleuth/issues/2039)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Added an `EnvironmentRepsitory` for Config Maps and Secrets to support supplying configuration data from Kubernetes resources using Spring Cloud Config Server. An image is now available for the Spring Cloud Config Server containing this new `EnvrionmentRepository` implementation is now available on DockerHub. Documentation for using this new feature is provided [here](https://docs.spring.io/spring-cloud-kubernetes/docs/2.1.0-M3/reference/html/#spring-cloud-kubernetes-configserver). [#881](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/881)
    
-   Added a new [Kubernetes `DiscoveryClient` implementation](https://docs.spring.io/spring-cloud-kubernetes/docs/2.1.0-M3/reference/html/#spring-cloud-kubernetes-configserver) which takes advantage of a new [Kubernetes Discovery Sever](https://docs.spring.io/spring-cloud-kubernetes/docs/2.1.0-M3/reference/html/#spring-cloud-kubernetes-discoveryserver). [#886](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/886)
    

The following modules were updated as part of 2021.0.0-M3:

Module

Version

Issues

Spring Cloud Zookeeper

3.1.0-M3

Spring Cloud Cli

3.1.0-M3

Spring Cloud Consul

3.1.0-M3

Spring Cloud Bus

3.1.0-M3

Spring Cloud Gateway

3.1.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/57?closed=1))

Spring Cloud Starter Build

2021.0.0-M3

Spring Cloud Vault

3.1.0-M3

Spring Cloud Cloudfoundry

3.1.0-M3

Spring Cloud Commons

3.1.0-M3

Spring Cloud Openfeign

3.1.0-M3

Spring Cloud Task

2.4.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/50?closed=1))

Spring Cloud Config

3.1.0-M3

Spring Cloud Sleuth

3.1.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/95?closed=1))

Spring Cloud Netflix

3.1.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/105?closed=1))

Spring Cloud Kubernetes

2.1.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/36?closed=1))

Spring Cloud Circuitbreaker

2.1.0-M3

Spring Cloud Contract

3.1.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/80?closed=1))

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
            <version>2021.0.0-M3</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2021.0.0-M3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
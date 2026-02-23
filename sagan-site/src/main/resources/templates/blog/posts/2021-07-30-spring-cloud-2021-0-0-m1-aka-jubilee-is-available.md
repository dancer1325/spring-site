---
title: Spring Cloud 2021.0.0-M1 (aka Jubilee) Is Available
source: https://spring.io/blog/2021/07/30/spring-cloud-2021-0-0-m1-aka-jubilee-is-available
scraped: 2026-02-23T13:17:21.932Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  July 31, 2021 | 1 Comment
---

# Spring Cloud 2021.0.0-M1 (aka Jubilee) Is Available

_Releases | Ryan Baxter |  July 31, 2021 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2021](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2021 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2021-Release-Notes).

This release is compatible with Spring Boot 2.6.0-M1.

The GitHub Project for this release can be found [here](https://github.com/orgs/spring-cloud/projects/63).

## [](#notable-changes-in-the-2021-release-train)Notable Changes in the 2021 Release Train

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   StripPrefixFilter now defaults to `1` instead of `0` [#2033](https://github.com/spring-cloud/spring-cloud-gateway/issues/2033)
-   Add new `CacheRequestBodyFilter` [#1943](https://github.com/spring-cloud/spring-cloud-gateway/pull/1943)
-   Share Routes across Gateway instances with Redis [#1390](https://github.com/spring-cloud/spring-cloud-gateway/pull/1390)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Added JDBC support [#1930](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1930)
-   Instruments Tomcat Valve [#1329](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1329)
-   Support for Spring Vault [#1952](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1952)
-   Automatic tag table generation documentation [#1950](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1950)
-   Spring Cloud Deployer support [#1947](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1947)
-   Spring Cloud Skipper support [#1927](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1927)
-   R2DBC support [#1524](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1524)
-   Support for Reactor Kafka [#1708](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1708)
-   Spring TX instrumentation [#1941](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1941)
-   Spring Batch support [#1904](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1904)
-   RSocket instrumentation [#1677](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1677)
-   Support for Spring Cloud Task [#1903](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1903)
-   Spring Cloud Config instrumentation [#1915](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1915)
-   Added support for Spring Cloud Circuit Breaker Reactive [#1910](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1910)
-   Added support for Kotlin Coroutines [#1737](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1737)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Bump Feign to 11.6 [#584](https://github.com/spring-cloud/spring-cloud-openfeign/issues/584)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Update kubernetes-client to 5.5.0 [#836](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/836)

### [](#spring-cloud-task)Spring Cloud Task

-   Upgraded Spring Cloud Stream to the 3.2 line.
-   Prepared for Spring Boot 2.6 by removing the `TaskJobLauncherCommandLineRunner` in favor of the `TaskJobLauncherApplicationRunner`.

### [](#spring-cloud-config)Spring Cloud Config

-   Integration with AWS Secrets Manager [#1638](https://github.com/spring-cloud/spring-cloud-config/pull/1638)
-   GCP secret manager integration [#1628](https://github.com/spring-cloud/spring-cloud-config/pull/1628)
-   Support for the AWS Systems Manager Parameter Store [#1598](https://github.com/spring-cloud/spring-cloud-config/pull/1598)

### [](#spring-cloud-contract)Spring Cloud Contract

-   JDK16 support

The following modules were updated as part of 2021.0.0-M1:

Module

Version

Issues

Spring Cloud Consul

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/59?closed=1))

Spring Cloud Gateway

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/53?closed=1))

Spring Cloud Zookeeper

3.1.0-M1

Spring Cloud Sleuth

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/91?closed=1))

Spring Cloud Cli

3.1.0-M1

Spring Cloud Starter Build

2021.0.0-M1

Spring Cloud Bus

3.1.0-M1

Spring Cloud Vault

3.1.0-M1

Spring Cloud Commons

3.1.0-M1

Spring Cloud Openfeign

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/38?closed=1))

Spring Cloud Kubernetes

2.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/34?closed=1))

Spring Cloud Task

2.4.0-M1

Spring Cloud Config

3.1.0-M1

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/92?closed=1))

Spring Cloud Netflix

3.1.0-M1

Spring Cloud Contract

3.1.0-M1

Spring Cloud Cloudfoundry

3.1.0-M1

Spring Cloud Circuitbreaker

2.1.0-M1

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
            <version>2021.0.0-M1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2021.0.0-M1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
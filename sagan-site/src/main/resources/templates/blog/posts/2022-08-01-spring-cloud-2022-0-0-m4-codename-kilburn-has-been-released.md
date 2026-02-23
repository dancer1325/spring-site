---
title: Spring Cloud 2022.0.0-M4 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/08/01/spring-cloud-2022-0-0-m4-codename-kilburn-has-been-released
scraped: 2026-02-23T10:45:16.122Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  August 01, 2022 | 4 Comments
---

# Spring Cloud 2022.0.0-M4 (codename Kilburn) Has Been Released

_Releases | Ryan Baxter |  August 01, 2022 | 4 Comments_

On behalf of the community, I am pleased to announce that the Milestone 4 (M4) of the [Spring Cloud 2022.0.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#202200-m4).

## [](#notable-changes-in-the-202200-release-train)Notable Changes in the 2022.0.0 Release Train

See the [project page](https://github.com/orgs/spring-cloud/projects/80) for all the issues and pull requests included in this release.

Spring Cloud 2022.0.0-M4 is compatible with Spring Boot 3.0.0-M4.

### [](#spring-cloud-stream)Spring Cloud Stream

-   Initial version of fully reactive Kafka binder
-   Improved support for Kafka tombstone records via BiFunction
-   Spring Native improvements

### [](#spring-cloud-config)Spring Cloud Config

-   Moved to AWS SDK V2 ([#2111](https://github.com/spring-cloud/spring-cloud-config/pull/2111))
-   Moved from JSCH to Apache MINA ([#1901](https://github.com/spring-cloud/spring-cloud-config/issues/1901))

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Adds JSON to gRPC filter ([#2657](https://github.com/spring-cloud/spring-cloud-gateway/pull/2657))

### [](#spring-cloud-function)Spring Cloud Function

-   Support for BiFunction to represent Spring Message
-   Spring Observability module

### [](#spring-cloud-task)Spring Cloud Task

-   Support Observations for ApplicationRunner and CommandlineRunner within an application.
-   Spring Cloud Task now utilizes Micrometer Observations for capturing task metrics.
-   Users can specify different datasources for the jdbc-item reader and or jdbc-item writer in single step batch jobs. ([#848](https://github.com/spring-cloud/spring-cloud-task/pull/848))

### [](#spring-cloud-vault)Spring Cloud Vault

-   Upgrades to Spring Vault 3.0.0-M2 ([#647](https://github.com/spring-cloud/spring-cloud-vault/issues/647)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added the possibility to eagerly create LoadBalancer child contexts ([#729](https://github.com/spring-cloud/spring-cloud-commons/issues/729))

The following modules were updated as part of 2022.0.0-M4:

Module

Version

Issues

Spring Cloud Stream

4.0.0-M4

Spring Cloud Config

4.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/103?closed=1))

Spring Cloud Build

4.0.0-M4

Spring Cloud Consul

4.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/62?closed=1))

Spring Cloud Kubernetes

3.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/47?closed=1))

Spring Cloud Gateway

4.0.0-M4

Spring Cloud Starter Build

2022.0.0-M4

Spring Cloud Circuitbreaker

3.0.0-M4

Spring Cloud Contract

4.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/92?closed=1))

Spring Cloud Bus

4.0.0-M4

Spring Cloud Function

4.0.0-M4

Spring Cloud Task

3.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/61?closed=1))

Spring Cloud Zookeeper

4.0.0-M4

Spring Cloud Openfeign

4.0.0-M4

Spring Cloud Vault

4.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/51?closed=1))

Spring Cloud Commons

4.0.0-M4

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/102?closed=1))

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
            <version>2022.0.0-M4</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2022.0.0-M4'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
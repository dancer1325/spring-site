---
title: Spring Cloud 2025.1.0-M3 (aka Oakwood) has been released
source: https://spring.io/blog/2025/10/03/spring-cloud-2025-1-0-M3-aka-oakwood-has-been-released
scraped: 2026-02-23T07:28:04.508Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 03, 2025 | 0 Comments
---

# Spring Cloud 2025.1.0-M3 (aka Oakwood) has been released

_Releases | Ryan Baxter |  October 03, 2025 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 3 (M3) of the [Spring Cloud 2025.1.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2025.1.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2025.1.0-Release-Notes).

## [](#notable-changes-in-the-202510-release-train)Notable Changes in the 2025.1.0 Release Train

Spring Cloud 2025.0.0-M3 depends on Spring Boot 4.0.0-M3. See all issues and pull requests that are part of the release [here](https://github.com/orgs/spring-cloud/projects/181).

### [](#spring-cloud-function)Spring Cloud Function

-   Discontinue spring-cloud-function-rscoket
-   Discontinue spring-cloud-function-deployer

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Upgraded Kubernetes Java Client to 24.0.0
-   Upgraded Fabric8 Kubernetes Client to 7.4.0

### [](#spring-cloud-contract)Spring Cloud Contract

-   stubrunner. -> spring.cloud.contract.stubrunner. property migration ([#2309](https://github.com/spring-cloud/spring-cloud-contract/pull/2309))

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Upgrade Resilience4j to 2.3.0

### [](#spring-cloud-commons)Spring Cloud Commons

-   Add LoadBalancer API versioning support [#1582](https://github.com/spring-cloud/spring-cloud-commons/pull/1582)

The following modules were updated as part of 2025.1.0-M3:

Module

Version

Issues

Spring Cloud Stream

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-stream/releases/tag/v5.0.0-M3))

Spring Cloud Config

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-config/releases/tag/v5.0.0-M3))

Spring Cloud Build

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-build/releases/tag/v5.0.0-M3))

Spring Cloud Kubernetes

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/releases/tag/v5.0.0-M3))

Spring Cloud Task

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/v5.0.0-M3))

Spring Cloud Contract

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v5.0.0-M3))

Spring Cloud Consul

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-consul/releases/tag/v5.0.0-M3))

Spring Cloud Gateway

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-gateway/releases/tag/v5.0.0-M3))

Spring Cloud Netflix

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-netflix/releases/tag/v5.0.0-M3))

Spring Cloud Circuitbreaker

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/releases/tag/v5.0.0-M3))

Spring Cloud Vault

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-vault/releases/tag/v5.0.0-M3))

Spring Cloud Function

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-function/releases/tag/v5.0.0-M3))

Spring Cloud Bus

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-bus/releases/tag/v5.0.0-M3))

Spring Cloud Zookeeper

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/releases/tag/v5.0.0-M3))

Spring Cloud Commons

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v5.0.0-M3))

Spring Cloud Starter Build

2025.1.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-starter-build/releases/tag/v2025.1.0-M3))

Spring Cloud Openfeign

5.0.0-M3

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/releases/tag/v5.0.0-M3))

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
            <version>2025.1.0-M3</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2025.1.0-M3'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
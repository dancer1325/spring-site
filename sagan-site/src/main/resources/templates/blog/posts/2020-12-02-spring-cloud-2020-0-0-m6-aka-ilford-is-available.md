---
title: Spring Cloud 2020.0.0-M6 (aka Ilford) Is Available
source: https://spring.io/blog/2020/12/02/spring-cloud-2020-0-0-m6-aka-ilford-is-available
scraped: 2026-02-23T13:39:45.587Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 02, 2020 | 0 Comments
---

# Spring Cloud 2020.0.0-M6 (aka Ilford) Is Available

_Releases | Ryan Baxter |  December 02, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 6 (M6) of the [Spring Cloud 2020](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2020 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020-Release-Notes).

This release is compatible with Spring Boot 2.4.0.

## [](#notable-changes-in-the-2020-release-train)Notable Changes in the 2020 Release Train

This release requires Spring Boot 2.4.0.

Please see the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/49).

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bumped OpenTelemetry to 0.11.0](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1791)
-   [Bumped Brave to 5.13.2](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1788)
-   [Aligned project structure to be consistent with Spring Boot](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1784)
-   Removed deprecated API

Click [here](https://github.com/orgs/spring-cloud/projects/49?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-sleuth) for the list of tasks done for this release

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [LoadBalancer hints support](https://github.com/spring-cloud/spring-cloud-gateway/issues/2060) was added
-   [Passing request context to LoadBalancer](https://github.com/spring-cloud/spring-cloud-gateway/issues/2059) was implemented

Click [here](https://github.com/orgs/spring-cloud/projects/49?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-gateway) for the list of tasks done for this release.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Click [here](https://github.com/orgs/spring-cloud/projects/49?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-netflix) for the list of tasks done for this release.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   A new implementation of Spring Cloud Kuberentes Config was added based on the Kubernetes Java Client ([PR](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/664))
    
-   A new implementation of Spring Cloud Kubernetes Discovery Client was added based on the Kubernetes Java Client ([PR](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/669))
    

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Allows @AutoConfigureWireMock to respect user-specified properties](https://github.com/spring-cloud/spring-cloud-contract/pull/1566)
-   Removed deprecated API

Click [here](https://github.com/orgs/spring-cloud/projects/49?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-contract) for the list of tasks done for this release.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Click [here](https://github.com/orgs/spring-cloud/projects/49?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-openfeign) for the list of tasks done for this release.

### [](#spring-cloud-commons)Spring Cloud Commons

-   Corrected implementation of `/pause` endpoint ([PR](https://github.com/spring-cloud/spring-cloud-commons/commit/7287a3c767b6a24594b7b08d0a9b3f8f27583ab1))
-   ServerHttpRequestContext was added for SC LoadBalancer ([PR](https://github.com/spring-cloud/spring-cloud-commons/pull/857))

Click [here](https://github.com/orgs/spring-cloud/projects/49?card_filter_query=repo%3Aspring-cloud%2Fspring-cloud-commons) for the list of tasks done for this release.

### [](#spring-cloud-task)Spring Cloud Task

-   Added Support for KafkaItemReader ([PR](https://github.com/spring-cloud/spring-cloud-task/commit/a84150860449b11362f0a8656ff6f4b5a8c46380)) and KafkaItemWriter ([PR](https://github.com/spring-cloud/spring-cloud-task/commit/626af448289945e4037b62f823f1041f467ca981)) for single step jobs.

The following modules were updated as part of 2020.0.0-M6:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Sleuth | 3.0.0-M6 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/84?closed=1)) | Spring Cloud Consul | 3.0.0-M6 |  
| Spring Cloud Gateway | 3.0.0-M6 |  
| Spring Cloud Zookeeper | 3.0.0-M6 |  
| Spring Cloud Config | 3.0.0-M6 |  
| Spring Cloud Cloudfoundry | 3.0.0-M6 |  
| Spring Cloud Netflix | 3.0.0-M6 |  
| Spring Cloud Kubernetes | 2.0.0-M6 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/26?closed=1)) | Spring Cloud Circuitbreaker | 2.0.0-M6 |  
| Spring Cloud Contract | 3.0.0-M6 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/72?closed=1)) | Spring Cloud Starter Build | 2020.0.0-M6 |  
| Spring Cloud Security | 3.0.0-M6 |  
| Spring Cloud Bus | 3.0.0-M6 |  
| Spring Cloud Cli | 3.0.0-M6 |  
| Spring Cloud Vault | 3.0.0-M6 |  
| Spring Cloud Openfeign | 3.0.0-M6 |  
| Spring Cloud Commons | 3.0.0-M6 |  
| Spring Cloud Task | 3.0.0-M4 |

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
            <version>2020.0.0-M6</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0-M6'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
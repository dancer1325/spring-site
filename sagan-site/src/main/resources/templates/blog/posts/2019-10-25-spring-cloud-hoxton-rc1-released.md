---
title: Spring Cloud Hoxton.RC1 Released
source: https://spring.io/blog/2019/10/25/spring-cloud-hoxton-rc1-released
scraped: 2026-02-23T14:29:58.824Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ryan Baxter |  October 25, 2019 | 2 Comments
---

# Spring Cloud Hoxton.RC1 Released

_Engineering | Ryan Baxter |  October 25, 2019 | 2 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 1 (RC1) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

-   Spring Cloud Hoxton.RC1 is built upon Spring Boot 2.2.0.RELEASE, please use this release when using Spring Cloud Hoxton.RC1.

### [](#spring-cloud-vault)Spring Cloud Vault

-   Support for PCF authentication.
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-vault/milestone/33?closed=1)

### [](#spring-cloud-circuitbreaker)Spring Cloud Circuitbreaker

-   Added auto-configuration to collect circuit breaker metrics when using Resilience4J ([#47](https://github.com/spring-cloud/spring-cloud-circuitbreaker/issues/47))
-   Upgrade to Resilience4J 1.1.0

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   RSocket modules were moved to their own [project](https://github.com/spring-cloud-incubator/spring-cloud-rsocket) in the Spring Cloud Incubator organization

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   \[Use Micrometer metrics instead of in memory one enhancement ([https://github.com/spring-cloud/spring-cloud-sleuth/issues/1477](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1477))
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.2.0.RC1)

### [](#spring-cloud-config)Spring Cloud Config

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/milestone/71?closed=1)

### [](#spring-cloud-gcp)Spring Cloud Gcp

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gcp/issues?q=is%3Aclosed+milestone%3A1.1.0.RC1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   Bumped WireMock to 2.25.1
-   [Add json-schema YAML contract definition to the documentation](https://github.com/spring-cloud/spring-cloud-contract/issues/1250)
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A2.2.0.RC1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/milestone/66?closed=1)

### [](#spring-cloud-task)Spring Cloud Task

-   Now has support for Micrometer task metrics for two Meters (Timer and LongTaskTimer) that produce the following time-series:
    -   spring.cloud.task - shows task duration (updated only after the task has completed).
    -   spring.cloud.task.active - provides run time information about the non-completed tasks.
-   Now honors `spring.batch.job.enabled=false` even when fail-on-job-failure is set to true.
-   Tasks launched using partitioning will now have external-execution-id populated.
-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-task/milestone/38?closed=1)

The following modules were updated as part of Hoxton.RC1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Vault | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/33?closed=1)) | Spring Cloud Circuitbreaker | 1.0.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/2?closed=1)) | Spring Cloud Gateway | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/30?closed=1)) | Spring Cloud Cli | 2.2.0.RC1 |  
| Spring Cloud Zookeeper | 2.2.0.RC1 |  
| Spring Cloud Aws | 2.2.0.RC1 |  
| Spring Cloud Sleuth | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/68?closed=1)) | Spring Cloud Starter | Hoxton.RC1 |  
| Spring Cloud Build | 2.2.0.RC1 |  
| Spring Cloud Config | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/71?closed=1)) | Spring Cloud Starter Parent | Hoxton.RC1 |  
| Spring Cloud Gcp | 1.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-gcp/issues?q=is%3Aclosed+milestone%3A1.1.0.RC1)) | Spring Cloud Contract | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/57?closed=1)) | Spring Cloud Dependencies Parent | 2.2.0.RC1 |  
| Spring Cloud Bus | 2.2.0.RC1 |  
| Spring Cloud Consul | 2.2.0.RC1 |  
| Spring Cloud Stream | Horsham.RC1 |  
| Spring Cloud Kubernetes | 1.1.0.RC1 |  
| Spring Cloud Commons | 2.2.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/66?closed=1)) | Spring Cloud Openfeign | 2.2.0.RC1 |  
| Spring Cloud Task | 2.2.0.RC1 |  
| Spring Cloud Dependencies | Hoxton.RC1 |  
| Spring Cloud Release | Hoxton.RC1 |  
| Spring Cloud Netflix | 2.2.0.RC1 |  
| Spring Cloud | Hoxton.RC1 |  
| Spring Cloud Cloudfoundry | 2.2.0.RC1 |  
| Spring Cloud Function | 3.0.0.RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/24?closed=1)) | Spring Cloud Security | 2.2.0.RC1 |

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
            <version>Hoxton.RC1</version>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.RC1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
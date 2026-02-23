---
title: Spring Cloud Greenwich.SR1 is now available
source: https://spring.io/blog/2019/03/07/spring-cloud-greenwich-sr1-is-now-available
scraped: 2026-02-23T14:55:51.268Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  March 07, 2019 | 1 Comment
---

# Spring Cloud Greenwich.SR1 is now available

_Releases | Ryan Baxter |  March 07, 2019 | 1 Comment_

On behalf of the community, I am pleased to announce that the Service Release 1 (SR1) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.SR1/). You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes).

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   [Issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/75?closed=1)

### [](#spring-cloud-stream)Spring Cloud Stream

-   Bug fixes

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

-   [Issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/12?closed=1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/58?closed=1)

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Added Spring Data pagable support
-   [Issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/11?closed=1)

### [](#spring-cloud-task)Spring Cloud Task

-   Bug fixes

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/59?closed=1)

### [](#spring-cloud-aws)Spring Cloud Aws

-   Logging and formatting changes

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Formatting changes

### [](#spring-cloud-bus)Spring Cloud Bus

-   Formatting changes

### [](#spring-cloud-vault)Spring Cloud Vault

-   [Issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/30?closed=1)

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Added leader election info contributor
-   Documentation enhancements
-   [Issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/10?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/49?closed=1)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/38?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/22?closed=1)

### [](#spring-cloud-function)Spring Cloud Function

-   [Issues](https://github.com/spring-cloud/spring-cloud-function/milestone/17?closed=1)

### [](#spring-cloud-config)Spring Cloud Config

-   [Issues](https://github.com/spring-cloud/spring-cloud-config/milestone/61?closed=1)

### [](#spring-cloud-security)Spring Cloud Security

-   [Spring Cloud Security 2.1.1.RELEASE](https://github.com/spring-cloud/spring-cloud-security/issues?q=is%3Aclosed+milestone%3A2.1.1.RELEASE) was released in-between Greenwich.RELEASE and Greenwich.SR1 due to the inclusion of a milestone dependency
-   Spring Cloud Security 2.1.2.RELEASE just included some formatting changes

The following modules were updated as part of Greenwich.SR1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Netflix | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/75?closed=1)) | Spring Cloud Stream | Fishtown.SR2 |   | Spring Cloud Gcp | 1.1.1.RELEASE |   | Spring Cloud Cloudfoundry | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/12?closed=1)) | Spring Cloud Build | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-build/milestone/24?closed=1)) | Spring Cloud Commons | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/58?closed=1)) | Spring Cloud | Greenwich.SR1 |   | Spring Cloud OpenFeign | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/11?closed=1)) | Spring Cloud Task | 2.1.1.RELEASE |   | Spring Cloud Sleuth | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/59?closed=1)) | Spring Cloud Aws | 2.1.1.RELEASE |   | Spring Cloud Release | Greenwich.SR1 |   | Spring Cloud Zookeeper | 2.1.1.RELEASE |   | Spring Cloud Bus | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/36?closed=1)) | Spring Cloud Vault | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/30?closed=1)) | Spring Cloud Kubernetes | 1.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/10?closed=1)) | Spring Cloud Dependencies | Greenwich.SR1 |   | Spring Cloud Contract | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/49?closed=1)) | Spring Cloud Consul | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/38?closed=1)) | Spring Cloud Gateway | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/22?closed=1)) | Spring Cloud Function | 2.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/17?closed=1)) | Spring Cloud Starter | Greenwich.SR1 |   | Spring Cloud Config | 2.1.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/61?closed=1)) | Spring Cloud Security | 2.1.2.RELEASE |  

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.SR1</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.SR1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
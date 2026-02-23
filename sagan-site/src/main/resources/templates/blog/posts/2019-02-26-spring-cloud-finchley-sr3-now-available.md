---
title: Spring Cloud Finchley.SR3 Now Available
source: https://spring.io/blog/2019/02/26/spring-cloud-finchley-sr3-now-available
scraped: 2026-02-23T14:56:57.606Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  February 26, 2019 | 2 Comments
---

# Spring Cloud Finchley.SR3 Now Available

_Releases | Ryan Baxter |  February 26, 2019 | 2 Comments_

On behalf of the community, I am pleased to announce that the Service Release 3 (SR3) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Finchley.SR3/). You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

### [](#spring-cloud-config)Spring Cloud Config

-   Spring Cloud Config server now honors the `if-modified-since` header in requests before

retrieving data and returns `last-modified` header in response

-   [Issues](https://github.com/spring-cloud/spring-cloud-config/milestone/57?closed=1)

### [](#spring-cloud-stream)Spring Cloud Stream

\*[Elmhurst.SR2 Release](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.SR2)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/60?closed=1)

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   [Issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/25?closed=1)

### [](#spring-cloud-aws)Spring Cloud Aws

-   [Issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/25?closed=1)

### [](#spring-cloud-task)Spring Cloud Task

-   Dependency Upgrades
-   [Issues](https://github.com/spring-cloud/spring-cloud-task/issues?q=is%3Aissue+label%3A2.0.1.RELEASE+is%3Aclosed)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/55?closed=1)

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   [Issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/8?closed=1)

### [](#spring-cloud-vault)Spring Cloud Vault

-   Dependency Upgrades
-   Documentation Refinements
-   [Issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/26?closed=1)

### [](#spring-cloud-bus)Spring Cloud Bus

-   [Issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/33?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/44?closed=1)

### [](#spring-cloud-consul)Spring Cloud Consul

-   `spring.cloud.discovery.enabled=false` now behaves the same as `spring.cloud.consul.discovery.enabled=false`
-   [Issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/36?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Better error handling when Ribbon is not on the classpath
-   Performance improvements in routing of HTTP and Websocket requests
-   Performance improvements when using modify request body filter
-   [Issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/19?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   `HystrixConcurrencyStrategy` can now be set using `HystrixPlugins#getConcurrencyStrategy`
-   `spring.cloud.discovery.enabled=false` now behaves the same as `eureka.client.enabled=false`
-   [Issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/72?closed=1)

The following modules were updated as part of Finchley.SR3:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Config | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/57?closed=1)) | Spring Cloud Function | 1.0.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/7?closed=1)) | Spring Cloud Stream | Elmhurst.SR2 |   | Spring Cloud Sleuth | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/60?closed=1)) | Spring Cloud Cloudfoundry | 2.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/10?closed=1)) | Spring Cloud Zookeeper | 2.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/25?closed=1)) | Spring Cloud Aws | 2.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/25?closed=1)) | Spring Cloud Task | 2.0.1.RELEASE |   | Spring Cloud Commons | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/55?closed=1)) | Spring Cloud Openfeign | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/8?closed=1)) | Spring Cloud Vault | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/26?closed=1)) | Spring Cloud Security | 2.0.1.RELEASE |   | Spring Cloud Bus | 2.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/33?closed=1)) | Spring Cloud Contract | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/44?closed=1)) | Spring Cloud Consul | 2.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/36?closed=1)) | Spring Cloud Gateway | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/19?closed=1)) | Spring Cloud Dependencies | Finchley.SR3 |   | Spring Cloud Netflix | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/72?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.SR3</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.SR3'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
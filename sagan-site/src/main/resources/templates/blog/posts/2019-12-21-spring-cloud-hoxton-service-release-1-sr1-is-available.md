---
title: Spring Cloud Hoxton Service Release 1 (SR1) is available.
source: https://spring.io/blog/2019/12/21/spring-cloud-hoxton-service-release-1-sr1-is-available
scraped: 2026-02-23T14:18:03.920Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  December 21, 2019 | 2 Comments
---

# Spring Cloud Hoxton Service Release 1 (SR1) is available.

_Releases | Spencer Gibb |  December 21, 2019 | 2 Comments_

On behalf of the community, I am pleased to announce that the Service Release 1 (SR1) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR1/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

This milestone was primarily a bugfix release.

Please see the Hoxton.SR1 [Github Project](https://github.com/orgs/spring-cloud/projects/34) for all issues closed.

This milestone release is built with Spring Boot 2.2.2.RELEASE.

### [](#spring-cloud-config)Spring Cloud Config

Besides bug fixes, Vault authentication was changed to use the Spring Vault project providing more options. Plain text resources are now available through the AWS S3 environment repository.

### [](#spring-cloud-contract)Spring Cloud Contract

Mappings may now be reset after each test.

### [](#spring-cloud-commons)Spring Cloud Commons

Support was added for zone awareness in Spring Cloud Loadbalancer.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Support was added for Spring Cloud Circuitbreaker

### [](#spring-cloud-gateway)Spring Cloud Gateway

Besides bug fixes, support was added for new configuration properties.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Eureka support for zone awareness in Spring Cloud Loadbalancer was added.

The following modules were updated as part of Hoxton.SR1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Config | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/74?closed=1)) | Spring Cloud Cloudfoundry | 2.2.0.RELEASE |  
| Spring Cloud Vault | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/36?closed=1)) | Spring Cloud Aws | 2.2.1.RELEASE |  
| Spring Cloud Bus | 2.2.0.RELEASE |  
| Spring Cloud Cli | 2.2.1.RELEASE |  
| Spring Cloud Gcp | 1.2.1.RELEASE |  
| Spring Cloud Contract | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/61?closed=1)) | Spring Cloud Consul | 2.2.1.RELEASE |  
| Spring Cloud Starter | Hoxton.SR1 |  
| Spring Cloud Dependencies | Hoxton.SR1 |  
| Spring Cloud Starter Parent | Hoxton.SR1 |  
| Spring Cloud Sleuth | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/72?closed=1)) | Spring Cloud Commons | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/70?closed=1)) | Spring Cloud Openfeign | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/21?closed=1)) | Spring Cloud Zookeeper | 2.2.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/27?closed=1)) | Spring Cloud Kubernetes | 1.1.1.RELEASE |  
| Spring Cloud Security | 2.2.0.RELEASE |  
| Spring Cloud Circuitbreaker | 1.0.0.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/1?closed=1)) | Spring Cloud Stream | Horsham.SR1 | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/68?closed=1)) | Spring Cloud Gateway | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/34?closed=1)) | Spring Cloud Netflix | 2.2.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/85?closed=1)) | Spring Cloud Function | 3.0.1.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/27?closed=1)) | Spring Cloud Task | 2.2.2.RELEASE |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR1</version>
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
classpath "io.spring.gradle:dependency-management-plugin:1.0.8.RELEASE"
}
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
imports {
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```
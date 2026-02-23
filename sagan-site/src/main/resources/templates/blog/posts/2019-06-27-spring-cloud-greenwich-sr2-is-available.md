---
title: Spring Cloud Greenwich.SR2 is available.
source: https://spring.io/blog/2019/06/27/spring-cloud-greenwich-sr2-is-available
scraped: 2026-02-23T14:43:02.166Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  June 27, 2019 | 0 Comments
---

# Spring Cloud Greenwich.SR2 is available.

_Releases | Spencer Gibb |  June 27, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that Service Release 2 (SR2) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.SR2/). You can check out the Greenwich [release notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes) for more information.

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

All projects were updated in coordination with the Spring [nohttp](https://spring.io/blog/2019/06/10/announcing-nohttp) effort.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Many updates and fixes were included via [Reactor](https://github.com/reactor/reactor-core/milestone/59?closed=1) and [Reactor Netty](https://github.com/spring-cloud/spring-cloud-gateway/milestone/24?closed=1). Gateway also efficiently caches the request body when Retry is enabled or if the Read Body Predicate is used.

### [](#spring-cloud-config)Spring Cloud Config

Allows Vault to be used when running Config Server in embedded mode.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Adds support for Spring HATEOAS Resources.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Adds support for including ConfigMaps based on active profiles.

### [](#spring-cloud-contract)Spring Cloud Contract

The Gradle plugin is now published to the Gradle plugin portal.

---

The following modules were updated as part of Greenwich.SR2:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Task | 2.1.2.RELEASE |   | Spring Cloud Config | 2.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/66?closed=1)) | Spring Cloud Stream | Fishtown.SR3 | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/60?closed=1)) | Spring Cloud Sleuth | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/62?closed=1)) | Spring Cloud Commons | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/61?closed=1)) | Spring Cloud Openfeign | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/12?closed=1)) | Spring Cloud Kubernetes | 1.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/11?closed=1)) | Spring Cloud Aws | 2.1.2.RELEASE |   | Spring Cloud Vault | 2.1.2.RELEASE |   | Spring Cloud Function | 2.0.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/18?closed=1)) | Spring Cloud Bus | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/37?closed=1)) | Spring Cloud Build | 2.1.6.RELEASE |   | Spring Cloud Zookeeper | 2.1.2.RELEASE |   | Spring Cloud Gcp | 1.1.2.RELEASE |   | Spring Cloud Contract | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/51?closed=1)) | Spring Cloud Consul | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/41?closed=1)) | Spring Cloud Security | 2.1.3.RELEASE |   | Spring Cloud Gateway | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/24?closed=1)) | Spring Cloud Cloudfoundry | 2.1.2.RELEASE |   | Spring Cloud Netflix | 2.1.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/76?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), [Gitter](https://gitter.im/spring-cloud/spring-cloud), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or [Twitter](https://twitter.com/SpringCloud).

To get started using Maven with a BOM (dependency management only):

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.SR2</version>
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

or using Gradle:

```
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.8.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.SR2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
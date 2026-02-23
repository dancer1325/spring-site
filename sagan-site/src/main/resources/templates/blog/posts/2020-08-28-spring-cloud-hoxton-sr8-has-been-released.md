---
title: Spring Cloud Hoxton.SR8 has been released
source: https://spring.io/blog/2020/08/28/spring-cloud-hoxton-sr8-has-been-released
scraped: 2026-02-23T13:50:02.676Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  August 28, 2020 | 0 Comments
---

# Spring Cloud Hoxton.SR8 has been released

_Releases | Spencer Gibb |  August 28, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 8 (SR8) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR8/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

This was primarily a bug fix and documentation release.

See all of the included issues and pull requests at the [GitHub project](https://github.com/orgs/spring-cloud/projects/44). Hoxton.SR8 is compatible with Spring Boot 2.3.x and 2.2.x.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Added support for TLS configuration to Eureka Client.

### [](#spring-cloud-config)Spring Cloud Config

Added support for TLS configuration to Config Client.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Adds support for Spring Cloud Loadbalancer. Automatically adds namespace to Service Instance metadata.

---

The following modules were updated as part of Hoxton.SR8:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Starter Build | Hoxton.SR8 |  
| Spring Cloud Netflix | 2.2.5.RELEASE |  
| Spring Cloud Openfeign | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/27?closed=1)) | Spring Cloud Config | 2.2.5.RELEASE |  
| Spring Cloud Aws | 2.2.4.RELEASE |  
| Spring Cloud Kubernetes | 1.1.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/22?closed=1)) | Spring Cloud Gateway | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/41?closed=1)) | Spring Cloud Gcp | 1.2.5.RELEASE |  
| Spring Cloud Commons | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/78?closed=1)) | Spring Cloud Sleuth | 2.2.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/80?closed=1)) | Spring Cloud Vault | 2.2.5.RELEASE |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR8</version>
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

```groovy
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:1.0.10.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR8'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
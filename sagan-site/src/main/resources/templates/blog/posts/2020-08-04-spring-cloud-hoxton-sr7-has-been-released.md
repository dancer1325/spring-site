---
title: Spring Cloud Hoxton.SR7 has been released
source: https://spring.io/blog/2020/08/04/spring-cloud-hoxton-sr7-has-been-released
scraped: 2026-02-23T13:53:16.473Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  August 04, 2020 | 0 Comments
---

# Spring Cloud Hoxton.SR7 has been released

_Releases | Spencer Gibb |  August 04, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that Service Release 7 (SR7) of the [Spring Cloud Hoxton](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR7/). You can check out the Hoxton [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes).

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

See all of the included issues and pull requests at the [GitHub project](https://github.com/orgs/spring-cloud/projects/41).

### [](#spring-cloud-netflix)Spring Cloud Netflix

[*CVE-2020-5412: Hystrix Dashboard Proxy In spring-cloud-netflix-hystrix-dashboard*](https://tanzu.vmware.com/security/cve-2020-5412)

### [](#spring-cloud-cloud-foundry)Spring Cloud Cloud Foundry

Upgraded CF Java client to 3.25.0.RELEASE.

### [](#spring-cloud-consul)Spring Cloud Consul

Added support for `byte[]` messages in Consul binder.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Added support for tripping Spring Cloud Circuitbreaker based on HTTP status code.

### [](#spring-cloud-config)Spring Cloud Config

Added support for disabling JDBC support via a property.

### [](#spring-cloud-contract)Spring Cloud Contract

Added a `StubRunner` based implementation of `ReactiveDiscoveryClient`.

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

Added support for `CollectionFormat` and improvements in working with `@FeignClient`.

### [](#spring-cloud-aws)Spring Cloud AWS

This is the first GA release under new community maintainers.

### [](#spring-cloud-gcp)Spring Cloud GCP

This release features many excellent community contributions:

-   New Spring Cloud GCP starter, `spring-cloud-gcp-starter-metrics`, configures Micrometer Stackdriver to automatically pick up project ID and credentials (thanks to [@eddumelendez](https://github.com/eddumelendez)).
-   Additional operations for managing secret versions on `SecretManagerTemplate` (thanks to [@kioie](https://github.com/kioie))
-   Additional GCS Spring Integration file filters `GcsAcceptModifiedAfterFileListFilter` and `GcsDiscardRecentModifiedFileListFilter` (thanks to [@hosainnet](https://github.com/hosainnet))

---

The following modules were updated as part of Hoxton.SR7:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Starter Build | Hoxton.SR7 |  
| Spring Cloud Cloudfoundry | 2.2.3.RELEASE |  
| Spring Cloud Kubernetes | 1.1.5.RELEASE |  
| Spring Cloud Consul | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/49?closed=1)) | Spring Cloud Gateway | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/39?closed=1)) | Spring Cloud Config | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/78?closed=1)) | Spring Cloud Contract | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/66?closed=1)) | Spring Cloud Netflix | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/91?closed=1)) | Spring Cloud Gcp | 1.2.4.RELEASE |  
| Spring Cloud Security | 2.2.4.RELEASE |  
| Spring Cloud Sleuth | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/77?closed=1)) | Spring Cloud Openfeign | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/26?closed=1)) | Spring Cloud Cli | 2.2.2.RELEASE |  
| Spring Cloud Commons | 2.2.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/76?closed=1)) | Spring Cloud Aws | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/29?closed=1)) | Spring Cloud Vault | 2.2.4.RELEASE |  
| Spring Cloud Zookeeper | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/30?closed=1)) | Spring Cloud Circuitbreaker | 1.0.4.RELEASE |  
| Spring Cloud Bus | 2.2.3.RELEASE |

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR7</version>
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
    classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR7'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
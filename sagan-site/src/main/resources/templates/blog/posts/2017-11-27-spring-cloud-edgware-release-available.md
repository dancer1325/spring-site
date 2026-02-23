---
title: Spring Cloud Edgware.RELEASE Available
source: https://spring.io/blog/2017/11/27/spring-cloud-edgware-release-available
scraped: 2026-02-23T16:14:50.742Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  November 27, 2017 | 2 Comments
---

# Spring Cloud Edgware.RELEASE Available

_Releases | Spencer Gibb |  November 27, 2017 | 2 Comments_

On behalf of the team and community, I am pleased to announce that the General Availability (RELEASE) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.RELEASE/). You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-cloud-bus)Spring Cloud Bus

Updates to allow Bus clients to implement remote events in independent packages.

### [](#spring-cloud-task)Spring Cloud Task

See the [blog post](https://spring.io/blog/2017/04/25/spring-cloud-task-1-2-0-release-is-now-available) announcing Task 1.2.0.

### [](#spring-cloud-commons)Spring Cloud Commons

Adds support for back off policy when retrying requests.

### [](#spring-cloud-stream)Spring Cloud Stream

See the [Ditmars release announcement](https://spring.io/blog/2017/10/06/spring-cloud-stream-1-3-goes-ga) for more information.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Added `RestTemplateBuilder` support
-   Zipkin 2 is now the default
-   `spring-cloud-starter-zipkin` now uses Zipkin 2 and `spring-cloud-starter-zipkin-legacy` uses Zipkin 1.
-   Now, you could find Zipkin via Service Discovery by setting the service id as Zipkin URL e.g. `spring.zipkin.baseUrl: http://zipkinserver/`
-   `@Async` method can use `@SpanName` to change the default span name

### [](#spring-cloud-security)Spring Cloud Security

Adds support for retry using `UserInfoRestTemplate`.

### [](#spring-cloud-contract)Spring Cloud Contract

-   WireMock bumped to 2.11.0 and turned on and verbose mode has been enabled
-   Introduced adding of custom WireMock extensions
-   Allowed referencing url segment in body response verification
-   Added support for referencing file contents in the contract
-   Added an option to dump mappings to files
-   Rest Assured upgraded to 3.0
-   A regression that affects the plugin was introduced and but was fixed in `1.2.1`. For the plugin please use `1.2.1.RELEASE`

### [](#spring-cloud-vault)Spring Cloud Vault

-   Support of Kubernetes and AWS IAM (requires AWS Java SDK) authentication methods.
-   Vault discovery using `DiscoveryClient` in the bootstrap context.
-   Configuration of `PropertySourceLocator` to customize context paths. Used by [Spring Cloud Vault Connector](https://github.com/pivotal-cf/spring-cloud-vault-connector) for running applications with [HashiCorp's Vault service broker](https://github.com/hashicorp/cf-vault-service-broker) on Cloud Foundry.
-   Refresh of generic secrets after TTL expiry.
-   Upgrade to Spring Vault 1.1

### [](#spring-cloud-netflix)Spring Cloud Netflix

Adds support for back off policy when retrying requests.

An optional Eureka client built using `RestTemplate` rather than Jersey.

`@EnableDiscoveryClient` is now optional. Including `spring-cloud-starter-netflix` will automatically assume the application should register and be a discovery client. To disable auto-registration set `spring.cloud.service-registry.auto-registration.enabled=false`. Hystrix and Eureka Server are now tested via Spring Cloud Contract.

### [](#spring-cloud-consul)Spring Cloud Consul

Adds compatibility with the recent Hashicorp Consul 1.0 release.

Consul DiscoveryClient now supports a datacenter parameter. HTTPS checks with self-signed certificates are now supported.

### [](#spring-cloud-config)Spring Cloud Config

A new JDBC `EnvironmentRepository` was created.

### [](#modules)Modules

The following modules were updated as part of Edgware.RELEASE:

Module

Version

Spring Cloud Config

1.4.0.RELEASE

Spring Cloud Task

1.2.2.RELEASE

Spring Cloud Commons

1.3.0.RELEASE

Spring Cloud Stream

Ditmars.RELEASE

Spring Cloud Zookeeper

1.2.0.RELEASE

Spring Cloud Sleuth

1.3.0.RELEASE

Spring Cloud Gateway

1.0.0.RELEASE

Spring Cloud Cloudfoundry

1.1.0.RELEASE

Spring Cloud Contract

1.2.0.RELEASE

Spring Cloud Security

1.2.1.RELEASE

Spring Cloud Aws

1.2.2.RELEASE

Spring Cloud Vault

1.1.0.RELEASE

Spring Cloud Netflix

1.4.0.RELEASE

Spring Cloud Bus

1.3.2.RELEASE

Spring Cloud Consul

1.3.0.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
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
        <artifactId>spring-cloud-starter-eureka</artifactId>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.RELEASE'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
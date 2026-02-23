---
title: Spring Cloud Dalston RC1 Released
source: https://spring.io/blog/2017/03/21/spring-cloud-dalston-rc1-released
scraped: 2026-02-23T16:36:19.997Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  March 21, 2017 | 0 Comments
---

# Spring Cloud Dalston RC1 Released

_Releases | Ryan Baxter |  March 21, 2017 | 0 Comments_

On behalf of the community, I am pleased to announce that Release Candidate 1 (RC1) of the [Spring Cloud Dalston](https://cloud.spring.io) Release Train is available today. The release can be found in our [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Dalston [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes).

## [](#notable-changes-in-the-dalston-release-train)Notable Changes in the Dalston Release Train

### [](#vault)Vault

Spring Cloud Vault Config is a new project that provides client-side support for externalized secret management in a distributed system via [Hashicorp Vault](https://www.vaultproject.io/).

### [](#config-server)Config Server

Config Server now has support for multiple backends via a Composite pattern. This allows for combinations of backend types that was not possible before, such as: Vault and git or multiple git backends. Authentication to git repositories hosted by AWS Codecommit is now supported. In the previous (Camden) release, Hashicorp Vault was already added as a backend to Config Server to go along with the VCS based backends.

### [](#spring-cloud-commons)Spring Cloud Commons

Since the beginning of the core Spring Cloud modules (Commons, Config, Netflix, Bus), implementations of `DiscoveryClient` have automatically registered the running client with the discovery server. This was a side effect of the initial Netflix Eureka implementation. Now service registration and discovery of registered services are separate concerns. There is now a `ServiceRegistry` interface that Spring Cloud Netflix, Consul and Zookeeper all implement. By default, the client is still auto-registered, but this can be disabled via the `autoRegister` attribute of `@EnableDiscoveryClient` or dynamically via a property. This also allows multiple services per JVM to be registered programatically. Look for a future blog post for further details.

Support for `@LoadBalanced` `AsyncRestTemplate` was contributed by the community.

### [](#sleuth)Sleuth

Support for a general-purpose context propagation system has been added to Sleuth. It is called "baggage" and allows for arbitrary attributes to be passed through boundaries, such as HTTP or messaging, using Sleuth's already built instrumentation.

Another feature is the annotation based Span creation and adding of logs and tags. This not only generates less boilerplate code but is also useful when working with frameworks that generate implementations at runtime (such as Spring Data).

### [](#contract)Contract

Contract was enhanced to support more flexibility for contract inputs and outputs. Pact support was added for reading contracts as opposed to the Groovy DSL. Contract was made more pluggable allowing custom DSL formats, Test & Stub generation, and Stub Runner implementations.

### [](#consul)Consul

Besides support for the new `ServiceRegistry` API, Spring Cloud Consul supports the Consul feature to deregister zombie services (ie services that fail health checks for a configurable amount of time will be removed from Consul).

### [](#other)Other

Dalston is based on Spring Boot 1.5.x and that is the minimum required version. Other changes include upgrades to various libraries, bug fixes, documentation, and polishing. Many thanks to all the community contributions of pull requests and issues.

The following modules were updated as part of Dalston.RC1:

Module

Version

Spring Cloud AWS

1.2.0.RC1

Spring Cloud Build

1.3.1.RELEASE

Spring Cloud Bus

1.3.0.M1

Spring Cloud Cloudfoundry

1.1.0.M1

Spring Cloud Commons

1.2.0.RC1

Spring Cloud Config

1.3.0.RC1

Spring Cloud Consul

1.2.0.RC1

Spring Cloud Contract

1.1.0.RC1

Spring Cloud Netflix

1.3.0.RC1

Spring Cloud Security

1.2.0.RC1

Spring Cloud Sleuth

1.2.0.RC1

Spring Cloud Stream

Chelsea.RC1

Spring Cloud Task

1.1.1.RELEASE

Spring Cloud Vault Config

1.0.0.RC1

Spring Cloud Zookeeper

1.1.0.RC1

Spring Cloud Thin Launcher

1.1.0.RC1

Spring Cloud CLI

1.3.0.RC1

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only)

```
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>http://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
<dependencyManagement>
  <dependencies>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Dalston.RC1</version>
    <type>pom</type>
    <scope>import</scope>
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
    classpath "io.spring.gradle:dependency-management-plugin:1.0.0.RELEASE"
  }
}
repositories {
    maven {
        url 'http://repo.spring.io/milestone'
    }
}
apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Dalston.RC1'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```
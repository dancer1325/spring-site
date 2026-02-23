---
title: Spring Cloud 2020.0.0-M4 (aka Ilford) Is Available
source: https://spring.io/blog/2020/10/07/spring-cloud-2020-0-0-m4-aka-ilford-is-available
scraped: 2026-02-23T13:45:46.854Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 07, 2020 | 0 Comments
---

# Spring Cloud 2020.0.0-M4 (aka Ilford) Is Available

_Releases | Ryan Baxter |  October 07, 2020 | 0 Comments_

On behalf of the community, I am pleased to announce that the Milestone 4 (M4) of the [Spring Cloud 2020](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2020 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-2020-release-train)Notable Changes in the 2020 Release Train

This release requires Spring Boot 2.4.0-M3.

Please see \[the wiki\] for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/43).

### [](#spring-cloud-commons)Spring Cloud Commons

-   The bootstrap phase is no longer enabled by default. If your project requires it, it can be re-enabled by properties or by a new starter. To re-enable by properties set `spring.cloud.bootstrap.enabled=true` or `spring.config.use-legacy-processing=true`. These need to be set as an environment variable, java system property or a command line argument. The other option is to include the new `spring-cloud-starter-bootstrap`. Bootstrap is mostly used to import configuration from remote sources. To do this without boostrap see the new features in Config, Consul, Vault and Zookeeper.
    
-   Added [a mechanism to avoid retrying on the same instance](https://github.com/spring-cloud/spring-cloud-commons/pull/833)
    

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Updated various libraries](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=label%3Adependencies+milestone%3A%223.0.0-M4%22)
    
-   Further updates of [Reactor based manual instrumentation](https://github.com/spring-cloud/spring-cloud-sleuth/pull/1699/files)
    

### [](#spring-cloud-consul)Spring Cloud Consul

-   Integration for [Spring Boot's Config Data API](https://github.com/spring-cloud/spring-cloud-consul/pull/672) allows import of default consul paths (`spring.config.import=consul:`) or individual paths (`spring.config.import=consul:myhost:8500/my-app,myprofile;other-context-path`).
-   Testcontainers is now used for integration tests.

### [](#spring-cloud-config)Spring Cloud Config

-   Integration for [Spring Boot's Config Data API](https://github.com/spring-cloud/spring-cloud-config/pull/1656) allows import from config server (`spring.config.import=configserver:`).
-   Allows composite Config Server to [log failures and continue processing](https://github.com/spring-cloud/spring-cloud-config/issues/661).
-   Support for [Config Client TLS certificates](https://github.com/spring-cloud/spring-cloud-config/pull/1679).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Common interfaces from spring-cloud-kubernetes-core have been moved to a new module ([#649](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/649))
    
-   Refactor `ConfigurationChangeListener` ([#643](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/643))
    
-   Add support for Spring Cloud LoadBalancer ([#562](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/562))
    

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Moved from `spring-cloud-gateway-core` module to `spring-cloud-gateway-server`.
-   Properties to disable filters and predicates.
-   Add actuator endpoint to list RouteDefinition(s).

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Updated various libraries](https://github.com/spring-cloud/spring-cloud-contract/milestone/68?closed=1)
-   Added [`Custom Mode` of test generation](https://github.com/spring-cloud/spring-cloud-contract/pull/1511)
-   Added [GraphQL support](https://github.com/spring-cloud/spring-cloud-contract/pull/1506)
-   Added [Messaging Polyglot support](https://github.com/spring-cloud/spring-cloud-contract/pull/1472)
-   Lowered the size of Stub Runner Boot and added [messaging options to it](https://github.com/spring-cloud/spring-cloud-contract/issues/1468)
-   Added [meta-data to contract definition](https://github.com/spring-cloud/spring-cloud-contract/pull/1466)
-   Added simple [GRPC support](https://github.com/spring-cloud/spring-cloud-contract/issues/1384)
-   Described how to run your polyglot tests against [running messaging middleware](https://docs.spring.io/spring-cloud-contract/docs/3.0.0-M4/reference/html/docker-project.html#docker-middleware-standalone)

### [](#spring-cloud-bus)Spring Cloud Bus

-   Migrated to use Spring Cloud Function as the Spring Cloud Stream programming interface [rather than legacy annotations](https://github.com/spring-cloud/spring-cloud-bus/issues/227).\\
-   Actuator endpoints moved from `bus-env` to `busenv` and `bus-refresh` to `busrefresh`.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Integration for [Spring Boot's Config Data API](https://github.com/spring-cloud/spring-cloud-zookeeper/pull/265) allows import of default zookeeper paths (`spring.config.import=zookeeper:`) or individual paths (`spring.config.import=zookeeper:myhost:2181/my-app,myprofile;other-context-path`).

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Added [LoadBalancer hint support](https://github.com/spring-cloud/spring-cloud-openfeign/pull/412)
-   [Exposed `Targetter` and `FeignClientFactoryBean`](https://github.com/spring-cloud/spring-cloud-openfeign/pull/282/files)
-   Added [customizer for `FeignClientBuilder`](https://github.com/spring-cloud/spring-cloud-openfeign/pull/289)

### [](#spring-cloud-vault)Spring Cloud Vault

-   Integration for [Spring Boot's Config Data API](https://github.com/spring-cloud/spring-cloud-vault/issues/483) allows import of default vault secret backends (`spring.config.import=vault://`) or individual secret backend paths (`spring.config.import=vault://secret/my-app,vault://secret/other-context-path`)
-   Support for [`ReactiveDiscoveryClient`](https://github.com/spring-cloud/spring-cloud-vault/issues/486) and `ReactiveVaultEndpointProvider`
-   `WebClientFactory` and `RestTemplateFactory` [available as beans](https://github.com/spring-cloud/spring-cloud-vault/issues/401)
-   [Configurable keystory type](https://github.com/spring-cloud/spring-cloud-vault/issues/387) including PEM support
-   Transform Secrets Engine support (Vault Enterprise feature)

The following modules were updated as part of 2020.0.0-M4:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Sleuth | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/79?closed=1)) | Spring Cloud Consul | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/51?closed=1)) | Spring Cloud Config | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/80?closed=1)) | Spring Cloud Kubernetes | 2.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/21?closed=1)) | Spring Cloud Gateway | 3.0.0-M4 |  
| Spring Cloud Circuitbreaker | 2.0.0-M4 |  
| Spring Cloud Contract | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/68?closed=1)) | Spring Cloud Starter Build | 2020.0.0-M4 |  
| Spring Cloud Netflix | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/92?closed=1)) | Spring Cloud Cloudfoundry | 3.0.0-M4 |  
| Spring Cloud Security | 3.0.0-M4 |  
| Spring Cloud Cli | 3.0.0-M4 |  
| Spring Cloud Bus | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/45?closed=1)) | Spring Cloud Zookeeper | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/31?closed=1)) | Spring Cloud Commons | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/77?closed=1)) | Spring Cloud Openfeign | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/25?closed=1)) | Spring Cloud Vault | 3.0.0-M4 | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/42?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
Copy<repositories>
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
            <version>2020.0.0-M4</version>
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

repositories {
  maven {
    url 'https://repo.spring.io/milestone'
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0-M4'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```
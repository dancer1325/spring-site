---
title: Spring Cloud Finchley M6 is available
source: https://spring.io/blog/2018/02/13/spring-cloud-finchley-m6-is-available
scraped: 2026-02-23T16:08:59.595Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  February 13, 2018 | 1 Comment
---

# Spring Cloud Finchley M6 is available

_Releases | Spencer Gibb |  February 13, 2018 | 1 Comment_

On behalf of the community, I am pleased to announce that the Milestone 6 (M6) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in the [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

Finchley.M6 is compatible with Spring Boot RC1. Many updates have been made for compatibility with RC1.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

The internals of Spring Cloud Sleuth were rewritten to use Brave. Please see the [Migration Guide](https://github.com/spring-cloud/spring-cloud-sleuth/wiki/Spring-Cloud-Sleuth-2.0-Migration-Guide) for more information.

### [](#spring-cloud-gateway)Spring Cloud Gateway

The performance of the gateway has improved dramatically. Fallback support has been added to the Hystrix filter. There is also an update to the Java Route DSL. To add filters, use the new `filters()` method, as follows:

```java
Copy@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder, ThrottleGatewayFilterFactory throttle) {
  return builder.routes()
      .route(r -> r.host("**.abc.org").and().path("/image/png")
        .filters(f ->
            f.addResponseHeader("X-TestHeader", "foobar"))
        .uri("http://httpbin.org:80")
      )
      .build();
}
```

### [](#spring-cloud-netflix)Spring Cloud Netflix

The `/hystrix.stream` endpoint is now available for Webflux applications.

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

Spring Cloud Cloudfoundry has been updated to use the latest Cloud Foundry Java client.

### [](#spring-cloud-contract)Spring Cloud Contract

You can now define contracts in YAML. We also started publishing Docker images to allow easy polyglot support. Look for a blog post on this soon.

### [](#spring-cloud-aws)Spring Cloud Aws

[Micrometer](http://micrometer.io) support for CloudWatch metrics.

### [](#spring-cloud-vault)Spring Cloud Vault

Reactive session support has been added.

## [](#modules)Modules

The following modules were updated as part of Finchley.M6:

Module

Version

Spring Cloud Zookeeper

2.0.0.M5

Spring Cloud Sleuth

2.0.0.M6

Spring Cloud Consul

2.0.0.M5

Spring Cloud Gateway

2.0.0.M6

Spring Cloud Netflix

2.0.0.M6

Spring Cloud Cloudfoundry

2.0.0.M3

Spring Cloud Contract

2.0.0.M6

Spring Cloud Security

2.0.0.M1

Spring Cloud Stream

Elmhurst.M4

Spring Cloud Bus

2.0.0.M5

Spring Cloud Config

2.0.0.M6

Spring Cloud Aws

2.0.0.M3

Spring Cloud Commons

2.0.0.M6

Spring Cloud Vault

2.0.0.M5

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only), include the following:

```xml
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
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.M6</version>
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

If you prefer Gradle, add the following:

```groovy
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.M6'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```
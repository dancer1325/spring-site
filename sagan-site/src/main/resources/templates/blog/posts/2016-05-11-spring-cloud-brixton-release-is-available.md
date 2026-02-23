---
title: Spring Cloud Brixton.RELEASE is available
source: https://spring.io/blog/2016/05/11/spring-cloud-brixton-release-is-available
scraped: 2026-02-23T19:15:49.547Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 11, 2016 | 9 Comments
---

# Spring Cloud Brixton.RELEASE is available

_Releases | Spencer Gibb |  May 11, 2016 | 9 Comments_

On behalf of the team, I am pleased to announce that the [Spring Cloud Brixton](http://cloud.spring.io) Release Train has reached General Availability. The release is available today and can be found in our [Spring Release repository](http://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22spring-cloud-dependencies%22).

We would like to thank many community contributors and testers for their help. There have been many pull requests, issues and conversations that have made Spring Cloud Brixton better.

#### [](#highlights)Highlights

Some of the highlights of the Brixton [Release Train](https://spring.io/blog/2015/06/26/spring-cloud-service-release-angel-sr3#release-train) are:

-   Spring Boot 1.3.x and Spring Framework 4.2.x support
-   Hashicorp Consul support for service registration/discovery & configuration via Spring Cloud Consul
-   Apache Zookeeper support for service registration/discovery, configuration via Spring Cloud Zookeeper and leader election in Spring Cloud Cluster
-   Distributed tracing through the Spring Cloud Sleuth abstraction with two out of the box implementations: one supporting logging (ideal for log collectors and multiplexers like Logstash and Loggregator) and one supporting Twitter's Zipkin
-   Netflix [Atlas Telemetry System](http://techblog.netflix.com/2014/12/introducing-atlas-netflixs-primary.html), the next generation [Spectator Metrics library](https://github.com/Netflix/spectator/wiki) and recent versions of Eureka, Ribbon, Hystrix and Feign are available in Spring Cloud Netflix
-   Spring Cloud Bus is now powered by the recently released [Spring Cloud Stream](https://spring.io/blog/2016/05/10/spring-cloud-stream-1-0-0-release-is-available)
-   Cluster Leadership election and locks via Spring Cloud Cluster
-   Export of Spring Boot metrics to Amazon Cloudwatch, and native support for Amazon RDS

#### [](#the-following-modules-are-part-of-brixtonrelease)The following modules are part of Brixton.RELEASE:

-   [Spring Cloud AWS](http://cloud.spring.io/spring-cloud-aws/) 1.1.0.RELEASE
-   [Spring Cloud Bus](http://cloud.spring.io/spring-cloud-bus/) 1.1.0.RELEASE
-   [Spring Cloud Cloud Foundry](http://cloud.spring.io/spring-cloud-cloudfoundry/) 1.0.0.RELEASE
-   [Spring Cloud Cluster](https://github.com/spring-cloud/spring-cloud-cluster) 1.0.0.RELEASE
-   [Spring Cloud Commons](https://github.com/spring-cloud/spring-cloud-commons) 1.1.0.RELEASE
-   [Spring Cloud Config](http://cloud.spring.io/spring-cloud-config/) 1.1.0.RELEASE
-   [Spring Cloud Consul](http://cloud.spring.io/spring-cloud-consul/) 1.0.0.RELEASE
-   [Spring Cloud Netflix](http://cloud.spring.io/spring-cloud-netflix/) 1.1.0.RELEASE
-   [Spring Cloud Security](http://cloud.spring.io/spring-cloud-security/) 1.1.0.RELEASE
-   [Spring Cloud Sleuth](http://cloud.spring.io/spring-cloud-sleuth/) 1.0.0.RELEASE
-   [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) 1.0.0.RELEASE
-   [Spring Cloud Zookeeper](http://cloud.spring.io/spring-cloud-zookeeper/) 1.0.0.RELEASE

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloudOSS).

#### [](#roadmap)Roadmap

The next Spring Cloud Release Train will be called Camden and will follow as soon as possible after [Spring Boot 1.4](https://github.com/spring-projects/spring-boot/milestones/1.4.0).

#### [](#notes)Notes:

A `@LoadBalanced` `RestTemplate` is no longer created by default. See the [updated documentation for details](http://cloud.spring.io/spring-cloud-static/spring-cloud.html#_spring_resttemplate_as_a_load_balancer_client). You need to create it in your application’s configuration. For example:

```java
Copy@Configuration
public class MyConfiguration {

    @LoadBalanced
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

Please note the correct BOM to use is `spring-cloud-dependencies` not `spring-cloud-starter-parent` (see Getting Started below).

#### [](#migrating-spring-cloud-hystrix-turbine-and-bus-with-amqp)Migrating Spring Cloud Hystrix, Turbine and Bus with AMQP

The Bus, Hystrix and Turbine support that used to be implemented on top of Spring AMQP have all been migrated to use Spring Cloud Stream. The old artifacts still exist, but are deprecated and will be removed at some point. Instead of the `spring-cloud-*-amqp` artifacts you should use whatever raw feature you need, plus a stream binder of your choice, e.g. `spring-cloud-netflix-hystrix-stream` and `spring-cloud-starter-stream-rabbit` instead of `spring-cloud-netflix-hystrix-amqp`.

Angel

Brixton (with AMQP)

Brixton (with Kafka)

spring-cloud-starter-bus-amqp

spring-cloud-starter-bus-amqp

spring-cloud-starter-bus-kafka

spring-cloud-netflix-hystrix-amqp

spring-cloud-netflix-hystrix-stream spring-cloud-starter-stream-rabbit

spring-cloud-netflix-hystrix-stream spring-cloud-starter-stream-kafka

spring-cloud-starter-turbine-amqp

spring-cloud-starter-turbine-stream spring-cloud-starter-stream-rabbit

spring-cloud-starter-turbine-stream spring-cloud-starter-stream-kafka

> NOTE: There is still a `spring-cloud-netflix-hystrix-amqp` in the Brixton release, but it was (mistakenly) omitted from the BOM, so you will need to provide a version explicitly if you are upgrading and don't want to change the artifacts.

#### [](#getting-started)Getting Started

The easiest way to get started with Brixton.RELEASE is to head to [http://start.spring.io](http://start.spring.io). If you want to write your build file by hand with Maven with a BOM (dependency management only):

```xml
Copy
<dependencyManagement>
  <dependencies>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Brixton.RELEASE</version>
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
    classpath("org.springframework.boot:spring-boot-gradle-plugin:1.3.5.RELEASE")
  }
}
repositories {
  maven {
    mavenCentral()
  }
}
apply plugin: 'spring-boot'

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Brixton.RELEASE'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    //...
}
```

If you are attending the [Spring I/O conference](http://www.springio.net) next week there will be [various presentations](http://lanyrd.com/2016/springio16/) on Spring Cloud from myself, Josh Long, Dave Syer and others.

This is also a reminder that [Spring One Platform](http://springoneplatform.io) will be taking place in Las Vegas between August 1-4 this year, and you should consider [getting your ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.
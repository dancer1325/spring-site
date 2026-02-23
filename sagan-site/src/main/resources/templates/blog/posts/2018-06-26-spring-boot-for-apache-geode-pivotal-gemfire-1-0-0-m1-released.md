---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M1 Released!
source: https://spring.io/blog/2018/06/26/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-m1-released
scraped: 2026-02-23T15:20:33.374Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  June 26, 2018 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M1 Released!

_Engineering | John Blum |  June 26, 2018 | 0 Comments_

Greetings Spring & Apache Geode/Pivotal GemFire communities-

I am happy to announce the first milestone release of Spring Boot for Apache Geode & Pivotal GemFire, version 1.0.0.M1.

This is a great new project building on the work started in Spring Data for Apache Geode/Pivotal GemFire nearly 2 years ago, when we introduced [annotation-based configuration](https://docs.spring.io/spring-data/geode/docs/current/reference/html/#bootstrap-annotation-config).

With Spring Boot’s "*convention over configuration*" approach using *auto-configuration*, this project takes configuration and development of Spring Boot, Apache Geode & Pivotal GemFire applications to the next level, whether building and running applications in a stand-alone or a managed environment like [Pivotal CloudFoundry (PCF)](https://pivotal.io/platform), when using [Pivotal Cloud Cache (PCC)](https://pivotal.io/platform/services-marketplace/data-management/pivotal-cloud-cache).

## [](#whats-included)[](#what-s-included)What’s Included

This project includes *auto-configuration* support for the following features:

1.  [*Look-Aside Caching*](https://content.pivotal.io/blog/an-introduction-to-look-aside-vs-inline-caching-patterns) using [Spring’s Cache Abstraction](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache)
    
2.  [System of Record (SOR)](https://en.wikipedia.org/wiki/System_of_record) using [Spring Data Repositories](https://docs.spring.io/spring-data/commons/docs/current/reference/html/#repositories) and [Spring Transaction Management](https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#transaction)
    
3.  Distributed Compute using [Function Implementation & Executions](https://docs.spring.io/spring-data/geode/docs/current/reference/html/#function-annotations)
    
4.  Event Stream Processing (ESP) using [Continuous Query](http://geode.apache.org/docs/guide/16/developing/continuous_querying/chapter_overview.html)
    
5.  Domain Object Versioning/Serialization using [PDX](http://geode.apache.org/docs/guide/16/developing/data_serialization/gemfire_pdx_serialization.html)
    
6.  Security
    
    1.  [Authentication/Authorization](https://docs.spring.io/spring-data/geode/docs/current/reference/html/#bootstrap-annotation-config-security)
        
    2.  TLS using [SSL](https://docs.spring.io/spring-data/geode/docs/current/reference/html/#bootstrap-annotation-config-ssl).
        

## [](#whats-next)[](#what-s-next)What’s Next

Milestone 2 will add *auto-configuration support* for Spring Session, [using Apache Geode or Pivotal GemFire](https://github.com/spring-projects/spring-session-data-geode) to manage your (HTTP) Session state.

In Milestone 3, we will begin to explore custom Spring Boot [Health Indicators](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready-health) along with support for Spring Boot [Actuator](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready), which is powered by [Micrometer](https://micrometer.io/).

For additional insight into the direction and progress of this project, have a look at the [Issues](https://github.com/spring-projects/spring-boot-data-geode/issues).

## [](#documentation)[](#documentation)Documentation

The Spring Boot for Apache Geode/Pivotal GemFire [Reference Guide](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/htmlsingle/) can be found by clicking the link.

## [](#examples)[](#examples)Examples

There are already a couple of examples available showcasing the use of Spring Boot for Apache Geode & Pivotal GemFire now.

The first example is the [Pizza Store](https://github.com/pivotal-cf/PCC-Sample-App-PizzaStore), Spring Boot application meant to show off the capabilities of [Pivotal Cloud Cache (PCC)](https://pivotal.io/platform/services-marketplace/data-management/pivotal-cloud-cache) when pushing/deploying Spring Boot, Pivotal GemFire `ClientCache` applications to [Pivotal CloudFoundry (PCF).](https://pivotal.io/platform)

The next example ([boot-example](https://github.com/jxblum/contacts-application/tree/master/boot-example)) is from the Contacts Application Reference Implementation demonstrating Spring Data for Apache Geode/Pivotal GemFire.

## [](#try-it-now)[](#try-it-now)Try It Now

Artifacts are available from the Spring `libs-milestone` Maven Repository:

Maven

```
Copy<repositories>
    <repository>
        <id>spring-milestone</id>
        <url>https://repo.spring.io/libs-milestone</url>
    </repository>
</repositories>
```

Gradle

```
Copyrepositories {
    maven { url: 'https://repo.spring.io/libs-milestone' }
}
```

Include either the `spring-geode-starter` dependency for developing Spring Boot, Apache Geode applications or the `spring-gemfire-starter` dependency when developing Spring Boot, Pivotal GemFire applications. These dependencies are interchangeable.

Maven

```
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.geode</groupId>
        <artifactId>spring-geode-starter</artifactId>
        <version>1.0.0.M1</version>
    </dependency>
</dependencies
```

Gradle

```
Copydependencies {
  compile 'org.springframework.geode:spring-geode-starter:1.0.0.M1'
}
```

## [](#feedback)[](#feedback)Feedback

Feedback and contributions are always highly appreciated and welcomed.

[GitHub Page](https://github.com/spring-projects/spring-boot-data-geode) | [Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [Pull Requests](https://github.com/spring-projects/spring-boot-data-geode/pulls)

**Thank you.**
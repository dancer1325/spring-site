---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.3.0.M2 Available
source: https://spring.io/blog/2020/02/24/spring-boot-for-apache-geode-pivotal-gemfire-1-3-0-m2-available
scraped: 2026-02-23T14:10:51.351Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  February 24, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.3.0.M2 Available

_Releases | John Blum |  February 24, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode & Pivotal GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.3.0.M2`.

The `1.3.0.M2` release aligns with:

-   Spring Framework `5.2.3.RELEASE`
    
-   Spring Boot `2.3.0.M2`
    
-   Spring Data for Apache Geode & Pivotal GemFire (SDG) `2.3.0.M3`
    
-   Spring Data `Neumann-M3`
    
-   Spring Session for Apache Geode & Pivotal GemFire (SSDG) `2.3.0.M2`
    
-   Spring Session `Dragonfruit-M2`
    
-   Spring Test for Apache Geode & Pivotal GemFire (STDG) `0.0.13.RELEASE`
    

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.3.0.M2/spring-geode/src/main/resources/changelog.txt#L7-L29) for more details.

This release is available in the [Spring Milestone Repository](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.3.0.M2/) as well as [available](https://start.spring.io/#!platformVersion=2.3.0.M2&dependencies=geode) on *Spring Initializer* at [start.spring.io](https://start.spring.io).

## [](#whats-new)[](#whats-new)What’s New

SBDG `1.3.0.M2` adds new starters to enable logging in either Apache Geode (`org.springframework.geode:spring-geode-starter-logging:1.3.0.M2`) or Pivotal GemFire (`org.springframework.geode:spring-gemfire-starter-logging:1.3.0.M2`).

Out-of-the-box, SBDG imports the `org.springframework.boot:spring-boot-starter-logging` dependency and uses Logback as the default logging system provider. It also automatically bridges the Log4j API, used by Apache Geode/Pivotal GemFire to log statements in GemFire/Geode components, to SLF4J. Finally, a default, configurable `logback.xml` file is provided by SBDG to output Apache Geode or Pivotal GemFire log statements at `INFO`.

You can read the [reference documentation](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-logging) for more details.

## [](#whats-next)[](#whats-next)What’s Next

We have plans to provide an option to preheat the GemFire/Geode oven. In a nutshell, we mean to preload data into a configured GemFire/Geode Region on startup in much the same way as a `data.sql` file can be provided and picked up by *Spring Boot* to automatically preload an existing RDBMS table or tables. See [Issue #67](https://github.com/spring-projects/spring-boot-data-geode/issues/67) for more details and follow our progress.

Also, in addition to adding to the [Samples](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-samples), we plan to make each sample individually buildable and runnable without having to build the entire SBDG project. See [Issue #75](https://github.com/spring-projects/spring-boot-data-geode/issues/75) for more details and follow our progress.

## [](#feedback)[](#feedback)Feedback

As always, any feedback is greatly appreciated and welcomed.

[Issue](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
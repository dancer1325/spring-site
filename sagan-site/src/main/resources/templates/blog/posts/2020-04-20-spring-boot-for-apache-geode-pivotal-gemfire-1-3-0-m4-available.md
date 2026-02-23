---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.3.0.M4 Available
source: https://spring.io/blog/2020/04/20/spring-boot-for-apache-geode-pivotal-gemfire-1-3-0-m4-available
scraped: 2026-02-23T14:04:17.399Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  April 20, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.3.0.M4 Available

_Releases | John Blum |  April 20, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode and Pivotal GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.3.0.M4`.

SBDG `1.3.0.M4` builds on Spring Boot 2.3.0.M4 and is based on Spring Framework 5.2.5.RELEASE, Spring Data Neumann-RC1, Spring Session for Apache Geode & Pivotal GemFire (SSDG) 2.3.0.RC2 and Spring Test for Apache Geode & Pivotal GemFire (STDG) 0.0.14.RELEASE.

Additionally, SBDG `1.3.0.M4` is now based on Apache Geode 1.12.0 and Pivotal GemFire 9.10.0.

You can find the 1.3.0.M4 release bits in the Spring [Milestone Repository](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.3.0.M4/) as well as on [start.spring.io](https://start.spring.io) by using the Spring Initializer to create a [Spring for Apache Geode](https://start.spring.io/#!platformVersion=2.3.0.M4&dependencies=geode) project.

Please see the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.3.0.M4/spring-geode/src/main/resources/changelog.txt#L7-L27) for more details.

## [](#whats-new)[](#whats-new)What’s New

SBDG `1.3.0.M4` includes the following improvements:

-   Support for [Geode Properties](https://geode.apache.org/docs/guide/112/reference/topics/gemfire_properties.html) (`gemfire.properties` & `gfsecurity.properties`) in Spring Boot `application.properties`. Read the [documentation](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-configuration-gemfire-properties) for more details.
    
-   Added a new **Sample** for *Multi-Site Caching*, which includes a [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/guides/caching-multi-site.html) and [Source Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.3.0.M4/spring-geode-samples/caching/multi-site).
    

With the addition of the *Multi-Site Caching* Sample Guide and Source Code, this completes our story on caching, and specifically caching patterns (such as: *Look-Aside*, *Near*, *Inline* and *Multi-Site*) along with use caches (e.g. HTTP *Session Caching*).

## [](#whats-next)[](#whats-next)What’s Next

We are still targeting to include the ability to load data into an Apache Geode cache on startup in the same way that Spring Boot applies `schemal.sql` and `data.sql` files to an RDBMS on startup for the SBDG 1.3 release.

You can find more details and follow along in [Issue #67](https://github.com/spring-projects/spring-boot-data-geode/issues/67).

## [](#feedback)[](#feedback)Feedback

As always, any feedback is greatly appreciated and welcomed.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.3.0.M3 Released
source: https://spring.io/blog/2020/03/23/spring-boot-for-apache-geode-pivotal-gemfire-1-3-0-m3-released
scraped: 2026-02-23T14:07:36.464Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  March 23, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.3.0.M3 Released

_Releases | John Blum |  March 23, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode & Pivotal GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.3.0.M3`. This release builds on Spring Boot `2.3.0.M3` and is available in the Spring [Milestone](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.3.0.M3/) Repository.

You can also create a **new** [*Spring for Apache Geode* project](https://start.spring.io/#!platformVersion=2.3.0.M3&dependencies=geode) with the `1.3.0.M3` bits using *Spring Initializer* at [start.spring.io](https://start.spring.io).

## [](#whats-new)[](#whats-new)What’s New

SBDG `1.3.0.M3` builds on Spring Boot `2.3.0.M3`, which pulls in Spring Framework `5.2.4.RELEASE`, Spring Data `Neumann-M4`, Spring Session `Dragonfruit-M2` with Spring Session for Apache Geode & Pivotal GemFire (SSDG) `2.3.0.RC1` specifically, and Spring Test for Apache Geode & Pivotal GemFire (STDG) `0.0.13.RELEASE`.

In addition, the following changes were made:

-   New reference documentation [Look-and-Feel](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/). Special thanks to [Rob Winch](https://spring.io/team/rwinch) for helping out with this one!
    
-   Adds ability to run SBDG Samples (for now, just the *Getting Started* Example) independently [using Maven](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/guides/getting-started.html#spring-geode-samples-getting-started-run-app-locally) as well as Gradle.
    
-   Fixes [bug](https://github.com/spring-projects/spring-boot-data-geode/issues/77) in auto-configuration when TLS is enabled in a cloud managed environment (e.g. PCP.
    

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.3.0.M3/spring-geode/src/main/resources/changelog.txt#L7-L26) for full details.

## [](#whats-next)[](#whats-next)What’s Next

Before SBDG `1.3` development comes to a close (i.e. GA), we are planning to add support for the following:

-   OAuth authentication of a Spring Boot, Apache Geode client app in a managed cloud environment (e.g. PCF or K8S); See [Issue #74](https://github.com/spring-projects/spring-boot-data-geode/issues/74) fo further details and progress.
    
-   Data loading into pre-existing cache `Regions` similar to Spring Boot’s support for `schema.sql` and `data.sql` resource files; See [Issue #67](https://github.com/spring-projects/spring-boot-data-geode/issues/67) for further details and progress.
    

## [](#feedback)[](#feedback)Feedback

As always, any feedback is welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-boot)
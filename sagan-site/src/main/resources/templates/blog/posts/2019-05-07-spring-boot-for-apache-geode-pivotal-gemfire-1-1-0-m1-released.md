---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.M1 Released!
source: https://spring.io/blog/2019/05/07/spring-boot-for-apache-geode-pivotal-gemfire-1-1-0-m1-released
scraped: 2026-02-23T14:49:16.992Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  May 07, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.M1 Released!

_Releases | John Blum |  May 07, 2019 | 0 Comments_

I am pleased to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire/PCC* (SBDG) `1.1.0.M1`.

Bits (`org.springframework.geode:spring-geode-starter:1.1.0.M1`) are available in the Spring [libs-milestone](http://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.1.0.M1/) repository.

## [](#whats-new)[](#whats-new)What’s New

The SBDG 1.1 Milestone 1 (M1) release includes:

-   Rebases SBDG on Spring Framework 5.1, Spring Boot 2.1, Spring Data Lovelace and Spring Session 2.1.
    
-   Rebases SBDG on Apache Geode 1.6.0 and Pivotal GemFire 9.5.3.
    

For a complete list of changes, see the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.1.0.M1/spring-geode/src/main/resources/changelog.txt#L7-L21).

## [](#whats-next)[](#whats-next)What’s Next

SBDG 1.1 M2 will include dedicated support for *In-line Caching*, the second caching pattern in our 3 separate caching patters \[*Look-Aside*, *Inline*, *Near*\].

As a friendly reminder, Spring’s [Cache Abstraction](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache) already provides excellent support for the *Look-Aside Caching* pattern, and SBDG (by extension of SDG) provides [first-class support](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.RELEASE/reference/html5/#geode-caching-provider) for using either Apache Geode or Pivotal GemFire/PCC as a caching provider in Spring’s *Cache Abstraction*.

This was also covered nicely in the **new** [Sample](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.RELEASE/reference/html5/#geode-samples) on *Look-Aside Caching*, containing both a [Guide](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.RELEASE/reference/html5/guides/caching-look-aside.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.0.0.RELEASE/spring-geode-samples/caching/look-aside).

## [](#feedback)[](#feedback)Feedback

We want to hear from you. Feedback is the cornerstone of any successful project.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
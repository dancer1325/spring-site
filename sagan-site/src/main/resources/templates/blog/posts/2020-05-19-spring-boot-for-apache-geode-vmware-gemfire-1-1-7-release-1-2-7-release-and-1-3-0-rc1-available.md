---
title: Spring Boot for Apache Geode & VMware GemFire 1.1.7.RELEASE, 1.2.7.RELEASE and 1.3.0.RC1 available!
source: https://spring.io/blog/2020/05/19/spring-boot-for-apache-geode-vmware-gemfire-1-1-7-release-1-2-7-release-and-1-3-0-rc1-available
scraped: 2026-02-23T14:00:19.066Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  May 19, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & VMware GemFire 1.1.7.RELEASE, 1.2.7.RELEASE and 1.3.0.RC1 available!

_Releases | John Blum |  May 19, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode and VMware GemFire communities, it is my pleasure to announce the release of Spring Boot for Apache Geode & VMware GemFire (SBDG) `1.1.7.RELEASE`, `1.2.7.RELEASE` and `1.3.0.RC1`.

All bits are [available](https://search.maven.org/search?q=spring-geode-starter) in *Maven Central* with the exception of `1.3.0.RC1`, which is [available](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.3.0.RC1/) in *Spring’s Milestone Repository*.

SBDG `1.1.7.RELEASE` builds on Spring Boot `2.1.14.RELEASE`. SBDG `1.2.7.RELEASE` builds on Spring Boot `2.2.7.RELEASE` and SBDG `1.3.0.RC1` builds on Spring Boot `2.3.0.RC1`.

The easiest way to get started building *Spring Boot applications with Apache Geode* is by using *Spring Initializer* at [start.spring.io](https://start.spring.io) either with [Spring Boot 2.2.7](https://start.spring.io/#!platformVersion=2.2.7.RELEASE&dependencies=geode) or with [Spring Boot 2.3.0](https://start.spring.io/#!platformVersion=2.3.0.RELEASE&dependencies=geode).

## [](#whatss-new)[](#whats-new)Whats’s New

The big addition to `1.3.0.RC1` is [support](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-data-working) for preloading your application cache Regions with data, formatted as JSON.

It is well known that Spring Boot offers [database initialization](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-database-initialization) for SQL based data stores on startup.

Now, SBDG users have the same convenience with a NoSQL data store like Apache Geode. This [support](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-data-working) is very similar to Spring Boot’s *database initialization* approach using [SQL](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-initialize-a-database-using-spring-jdbc).

## [](#whats-next)[](#whats-next)What’s Next

All efforts are focused on getting SBDG `1.3.0.RELEASE` out the door! `1.3.0.RELEASE` will be based on Spring Boot `2.3.0.RELEASE`, which is already [available](https://spring.io/blog/2020/05/15/spring-boot-2-3-0-available-now)! The release is tentatively [scheduled](https://spring-calendar.cfapps.io/) for Thursday, May 28th.

## [](#feedback)[](#feedback)Feedback

As always, any feedback is welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
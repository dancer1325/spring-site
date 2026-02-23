---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.2.6.RELEASE Available
source: https://spring.io/blog/2020/03/27/spring-boot-for-apache-geode-pivotal-gemfire-1-2-6-release-available
scraped: 2026-02-23T14:06:14.937Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  March 27, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.2.6.RELEASE Available

_Releases | John Blum |  March 27, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode & Pivotal GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.2.6.RELEASE`.

SBDG `1.2.6.RELEASE` is based on the [newly minted](https://spring.io/blog/2020/03/26/spring-boot-2-2-6-available-now) Spring Boot `2.2.6.RELEASE` and is [available in](https://repo1.maven.org/maven2/org/springframework/geode/spring-geode-starter/1.2.6.RELEASE/) Maven Central.

You may also [begin a new Spring for Apache Geode](https://start.spring.io/#!platformVersion=2.2.6.RELEASE&dependencies=geode) (or Pivotal GemFire) project at [start.spring.io](https://start.spring.io) using the Spring Initializer.

One, very important change in this release, includes a fix for an SSL auto-configuration [issue](https://github.com/spring-projects/spring-boot-data-geode/issues/77) when TLS is enabled and a Spring Boot app using Pivotal Cloud Cache (PCC) is pushed up to a managed cloud environment, such as Pivotal Platform (a.k.a. Pivotal CloudFoundry).

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.6.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L22) for full details and changes included in this release.

## [](#feedback)[](#feedback)Feedback

As always, any feedback is welcomed and appreciated.

Thank you.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
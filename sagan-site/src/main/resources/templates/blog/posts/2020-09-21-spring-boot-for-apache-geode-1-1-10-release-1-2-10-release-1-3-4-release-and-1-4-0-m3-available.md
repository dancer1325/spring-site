---
title: Spring Boot for Apache Geode 1.1.10.RELEASE, 1.2.10.RELEASE, 1.3.4.RELEASE and 1.4.0-M3 available!
source: https://spring.io/blog/2020/09/21/spring-boot-for-apache-geode-1-1-10-release-1-2-10-release-1-3-4-release-and-1-4-0-m3-available
scraped: 2026-02-23T13:47:23.576Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  September 21, 2020 | 1 Comment
---

# Spring Boot for Apache Geode 1.1.10.RELEASE, 1.2.10.RELEASE, 1.3.4.RELEASE and 1.4.0-M3 available!

_Releases | John Blum |  September 21, 2020 | 1 Comment_

On behalf of the Spring and Apache Geode communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode* (SBDG) `1.1.10.RELEASE`, `1.2.10.RELEASE`, `1.3.4.RELEASE` and `1.4.0-M3`.

SBDG `1.1.10.RELEASE` is based on Spring Boot `2.1.17.RELEASE`, SBDG `1.2.10.RELEASE` is based on Spring Boot `2.2.10.RELEASE`, SBDG `1.3.4.RELEASE` is based on Spring Boot `2.3.4.RELEASE` and SBDG `1.4.0-M3` is based on Spring Boot `2.4.0-M3`. In addition, SBDG pulls in the latest [Spring Data](https://spring.io/projects/spring-data-geode), [Spring Session](https://spring.io/projects/spring-session-data-geode) and [Spring Test](https://github.com/spring-projects/spring-test-data-geode) for Apache Geode releases and bits.

Each of these releases includes dependency alignment, documentation revisions and minor improvements. See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/master/spring-geode/src/main/resources/changelog.txt#L7-L82) for complete details.

Note

SBDG `1.4.0-M3` has been recently rebased on Apache Geode `1.13.0`. Given [VMware Tanzu GemFire](https://tanzu.vmware.com/gemfire) (formerly known as Pivotal GemFire) is now longer released by VMware, Inc. as a standalone, independently managed solution, SBDG `1.4` will no longer ship any `spring-gemfire-starter.*` modules. GemFire 9.10 was the last supported, standalone, independently managed version of GemFire, which was based on Apache Geode 1.12.

It is very quick and easy to get started with *Spring Boot for Apache Geode* by including the base starter (i.e. `spring-geode-starter`) or one of the specific starters (e.g. `spring-geode-starter-session` when handling Session state management use cases) in your project Maven POM or Gradle build file. Alternatively, you can go to [start.spring.io](https://start.spring.io) and include the "*Spring for Apache Geode*" dependency, or simply follow this [link](https://start.spring.io/#!platformVersion=2.3.4.RELEASE&dependencies=geode).

## [](#feedback)[](#feedback)Feedback

Feedback on these releases is appreciated and welcomed.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
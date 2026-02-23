---
title: Spring Boot for Apache Geode & VMware GemFire 1.1.8.RELEASE and 1.2.8.RELEASE available!
source: https://spring.io/blog/2020/06/16/spring-boot-for-apache-geode-vmware-gemfire-1-1-8-release-and-1-2-8-release-available
scraped: 2026-02-23T13:56:50.302Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  June 16, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & VMware GemFire 1.1.8.RELEASE and 1.2.8.RELEASE available!

_Releases | John Blum |  June 16, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode and VMware GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & VMware GemFire* (SBDG) `1.1.8.RELEASE` and `1.2.8.RELEASE`.

SBDG `1.1.8.RELEASE` is based on Spring Boot `2.1.15.RELEASE` and SBDG `1.2.8.RELEASE` is based on Spring Boot `2.2.8.RELEASE`. Bits for both releases are [available](https://repo1.maven.org/maven2/org/springframework/geode/spring-geode-starter/) in Maven Central.

As a friendly reminder, please refer to the [Version Compatibility Matrix](https://github.com/spring-projects/spring-boot-data-geode/wiki/Spring-Boot-for-Apache-Geode-and-Pivotal-GemFire-Version-Compatibility-Matrix#version-compatibility-matrix) to see how SBDG aligns with Spring, Apache Geode and VMware GemFire versions.

SBDG `1.1.x` is fixed on Spring Data Lovelace, which is in support until October 2020. However, given SBDG `1.1.x` is based on Spring Data Lovelace, which is based on Apache Geode 1.6.0 and VMware GemFire 9.5.4, both of which have reached their EOL, the SBDG `1.1.x` release line will effectively only pick up dependency updates until October when SD Lovelace reaches EOL. No new development is happening SBDG `1.1.x`. You are therefore encouraged to upgrade to SBDG `1.2.8.RELEASE` or `1.3.0.RELEASE` as soon as possible.

You can start a new Spring Boot `2.2.8.RELEASE` project using Apache Geode at [start.spring.io](https://start.spring.io/#!platformVersion=2.2.8.RELEASE&dependencies=geode).

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.8.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L29) for more details.

## [](#feedback)[](#feedback)Feedback

Feedback is welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
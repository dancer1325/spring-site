---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.5.RELEASE, 1.2.4.RELEASE and 1.3.0.M1 are available
source: https://spring.io/blog/2020/02/01/spring-boot-for-apache-geode-pivotal-gemfire-1-1-5-release-1-2-4-release-and-1-3-0-m1-are-available
scraped: 2026-02-23T14:12:51.900Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  February 01, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.5.RELEASE, 1.2.4.RELEASE and 1.3.0.M1 are available

_Releases | John Blum |  February 01, 2020 | 0 Comments_

On behalf of the *Spring*, *Apache Geode* and *Pivotal GemFire* communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode and Pivotal GemFire* (SBDG) `1.1.5.RELEASE`, `1.2.4.RELEASE` and `1.3.0.M1`.

In addition to support for [Apache Geode](https://geode.apache.org/) and [Pivotal GemFire](https://pivotal.io/pivotal-gemfire), SBDG has dedicated support for, and works seamlessly with, [Pivotal Cloud Cache](https://pivotal.io/pivotal-cloud-cache) as well. See [here](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#cloudfoundry) for more details. The importance of this [project goal](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#geode-gemfire-switch) cannot be overstated.

SBDG `1.1.5.RELEASE` builds on the latest Spring Boot 2.1.12.RELEASE and is based on Spring Framework 5.1.13.RELEASE, Spring Data Lovelace-SR15 (SDG), Spring Session for Apache Geode & Pivotal GemFire (SSDG) 2.1.8.RELEASE, Spring Test for Apache Geode & Pivotal GemFire (STDG) 0.0.8.RELEASE along with Apache Geode 1.6.0 and Pivotal GemFire 9.5.4.

SBDG `1.2.4.RELEASE` builds on the latest Spring Boot 2.2.4.RELEASE and is based on Spring Framework 5.2.3.RELEASE, Spring Data Moore-SR4 (SDG), Spring Session for Apache Geode & Pivotal GemFire (SSDG) 2.2.2.RELEASE, Spring Test for Apache Geode & Pivotal GemFire (STDG) 0.0.12.RELEASE along with Apache Geode 1.9.2 and Pivotal GemFire 9.8.4.

SBDG `1.3.0.M1` builds on the latest Spring Boot 2.3.0.M1 and is based on Spring Framework 5.2.3.RELEASE, Spring Data Neumann-M2 (SDG), Spring Session for Apache Geode & Pivotal GemFire (SSDG) 2.3.0.M1, Spring Test for Apache Geode & Pivotal GemFire (STDG) 0.0.12.RELEASE along with Apache Geode 1.11.0 and Pivotal GemFire 9.9.1.

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.3.0.M1/spring-geode/src/main/resources/changelog.txt#L7-L58) for more details.

Both SBDG `1.1.5.RELEASE` and `1.2.4.RELEASE` can be acquired from [Maven Central](https://search.maven.org/artifact/org.springframework.geode/spring-geode-starter). SBDG `1.3.0.M1` can be acquired from the Spring [libs-milestone](https://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.3.0.M1/) Repository.

Technically, the easiest way to get started building Spring (Boot) for Apache Geode, Pivotal GemFire or Pivotal Cloud Cache applications is by going to [start.spring.io](https://start.spring.io/). Once there, you can select Spring for "***Apache Geode***" as a dependency in your application Maven POM or Gradle build file, like [this](https://start.spring.io/#!platformVersion=2.2.4.RELEASE&dependencies=geode).

## [](#feedback)[](#feedback)Feedback

As always any feedback is welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
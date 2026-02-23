---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.1.RELEASE & 1.1.0.M2 Available
source: https://spring.io/blog/2019/06/18/spring-boot-for-apache-geode-pivotal-gemfire-1-0-1-release-1-1-0-m2-available
scraped: 2026-02-23T14:44:08.379Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  June 18, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.1.RELEASE & 1.1.0.M2 Available

_Releases | John Blum |  June 18, 2019 | 0 Comments_

On behalf of the Spring and Apache Geode communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.0.1.RELEASE` and `1.1.0.M2`.

## [](#new-in-sbdg-101release)[](#sbdg-101-new)New in SBDG `1.0.1.RELEASE`

SBDG `1.0.1.RELEASE` builds on:

-   Spring Framework 5.0.14.RELEASE
    
-   Spring Boot 2.0.9.RELEASE
    
-   Spring Data Kay-SR14
    
-   Spring Session for Apache Geode & Pivotal GemFire 2.0.9.RELEASE
    

Additionally, SBDG now supports the ability configure and bootstrap a *Locator* process, which disables the *auto-configuration* supplying a `ClientCache` instance, by default.

See the complete [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.0.1.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L15) for further details.

## [](#new-in-sbdg-110m2)[](#sbdg-110-new)New in SBDG `1.1.0.M2`

SBDG `1.1.0.M2` builds on:

-   Spring Framework 5.1.8.RELEASE
    
-   Spring Boot 2.1.4.RELEASE
    
-   Spring Data Lovelace-SR9
    
-   Spring Session for Apache Geode & Pivotal GemFire 2.1.4.RELEASE
    

Additionally, SBDG now includes the following enhancements and new features:

-   Ability to configure and bootstrap a Locator process, disabling the default `ClientCache` *auto-configuration*.
    
-   Dedicated support for ***Inline Caching*** Use Cases; learn more from the reference documentation provided [here](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.1.0.M2/reference/html5/#geode-caching-provider-inline-caching), and specifically the [section](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.1.0.M2/reference/html5/#geode-caching-provider-inline-caching-using-spring-data-repositories) that ties *Inline Caching* together with the *Spring Data Repository* abstraction, a very powerful combination.
    
-   Adds new modules or Spring Session (e.g. `spring-geode-starter-session`) & Spring Test (e.g. `spring-geode-starter-test`).
    

See the complete [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.1.0.M2/spring-geode/src/main/resources/changelog.txt#L7-L28) for further details.

## [](#whats-next)[](#whats-next)What’s Next

Most of the attention and focus is shifting to SBDG 1.1 and pushing for a final GA in early to mid-July timeframe.

We will be adding support for Pivotal CloudFoundry (PCF), Spring Boot application deployments connecting with either standalone Apache Geode or Pivotal GemFire installations.

Currently, SBDG makes the assumption that when you are deploying your Apache Geode or Pivotal GemFire enabled Spring Boot apps to PCF, that those apps will be using the [Pivotal Cloud Cache (PCC)](https://pivotal.io/pivotal-cloud-cache) service. Of course, this may not always be possible, so we plan to support you in whatever capacity you choose.

We do highly recommend that when you are deploying Spring Boot apps to PCF, that you also bind those same apps to a highly secure and managed Pivotal Cloud Cache environment. PCC makes operational concerns a non-issue.

## [](#feedback)[](#feedback)Feedback

As always, we appreciate any feedback you have for us.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
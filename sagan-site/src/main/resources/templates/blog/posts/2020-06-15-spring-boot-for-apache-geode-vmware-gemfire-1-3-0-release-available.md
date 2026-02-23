---
title: Spring Boot for Apache Geode & VMware GemFire 1.3.0.RELEASE Available!
source: https://spring.io/blog/2020/06/15/spring-boot-for-apache-geode-vmware-gemfire-1-3-0-release-available
scraped: 2026-02-23T13:57:26.003Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  June 15, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & VMware GemFire 1.3.0.RELEASE Available!

_Releases | John Blum |  June 15, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode and VMware GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode and VMware GemFire* (SBDG) `1.3.0.RELEASE`.

This release builds on Spring Boot `2.3.0.RELEASE` along with the latest Spring Framework (5.2.6), Spring Data (Neumann-GA/2.3.0) and Spring Session (Dragonfruit-GA/2.3.0) bits. In addition, SBDG `1.3.0.RELEASE` pulls in *Spring Test for Apache Geode & VMware GemFire* (STDG) `0.0.16.RELEASE` giving users more fine-grained control for resource and mock object cleanup.

You can [start](https://start.spring.io/#!platformVersion=2.3.0.RELEASE&dependencies=geode) a new Spring Boot project using Apache Geode from [start.spring.io](https://start.spring.io) using *Spring Initializer*.

## [](#whats-new)[](#whats-new)What’s New

The 1.3 GA focused on giving developers the means to load data into the cache during development.

This puts Spring Boot for Apache Geode on par with Spring Boot’s support for SQL database initialization. However, SBDG does not stop there! Additionally, SBDG provides the capability to export data on application shutdown.

Both import and export capabilities are highly useful during development to test, debug and validate the functionality of your Spring Boot applications. It is also useful for moving data between environments, such as QA back to DEV, for further testing when issues arise.

-   Learn more about [Cache Data Import/Export](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-data-working).
    
-   SBDG also includes several useful extensions to Apache Geode’s API, which have now been formally [documented](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-api-extensions).
    
-   Additionally, SBDG now includes [documentation](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-docker) for running and using Apache Geode in a Docker Container. This compliments Spring Boot’s support for containerization as of the 2.3 release line.
    

While these are the main highlights from the 1.3 release, you are welcome to review the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.3.0.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L37) for full release details.

## [](#whats-next)[](#whats-next)What’s Next

Look for a `1.3.1.RELEASE` shortly, tentatively scheduled for Weds, 6/24, as we make further refinements to the Cache Data Import/Export feature, such as the ability to specify resource locations on import and export. This is useful in a managed, cloud environment (e.g. PCF) where a filesystem is not always readily available. While JSON files can be included in your app JAR for imports, exporting data is a different story.

While it is not specific to SBDG, the STDG project will include additional refinements to GemFire/Geode resource cleanup between test cases and test classes, enabled with a new annotation, `@EnableGemFireGarbageCollector`. This feature will trigger a new STDG release that will be picked up in 1.3.1. More details to follow.

## [](#conclusion)[](#conclusion)Conclusion

Feedback on this release is welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-data-gemfire)
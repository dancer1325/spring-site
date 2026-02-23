---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.4.RELEASE & 1.2.2.RELEASE Available
source: https://spring.io/blog/2019/12/12/spring-boot-for-apache-geode-pivotal-gemfire-1-1-4-release-1-2-2-release-available
scraped: 2026-02-23T14:19:25.291Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  December 12, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.4.RELEASE & 1.2.2.RELEASE Available

_Releases | John Blum |  December 12, 2019 | 0 Comments_

On behalf of the Spring, Apache Geode & Pivotal GemFire communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.1.4.RELEASE` as well as `1.2.2.RELEASE`.

Both releases are available in [Maven Central](https://search.maven.org/artifact/org.springframework.geode/spring-geode-starter).

## [](#whats-new)[](#whats-new)What’s New

While SBDG `1.1.4.RELEASE` primarily aligns with the latest Spring bits in its release line:

-   Spring Framework `5.1.12.RELEASE`
    
-   Spring Boot `2.1.11.RELEASE`
    
-   Spring Data `Lovelace-SR14/2.1.14.RELEASE`
    
-   Spring Session for Apache Geode & Pivotal GemFire (SSDG) `Bean-SR8/2.1.7.RELEASE` (**NEW**)
    

And SBDG `1.2.2.RELEASE` builds on:

-   Spring Framework `5.2.2.RELEASE`
    
-   Spring Boot `2.2.2.RELEASE`
    
-   Spring Data `Moore-SR3/2.2.3.RELEASE`
    
-   Spring Session for Apache Geode & Pivotal GemFire (SSDG) `Corn-RELEASE/2.2.1.RELEASE` (**NEW**)
    
-   Spring Test for Apache Geode & Pivotal GemFire (STDG) `0.0.11.RELEASE` (**NEW**)
    

SBDG `1.2.2.RELEASE` additionally includes the following improvements:

-   Enhancements to `@EnableClusterAware` Region bean detection.
    
-   Changes the Pool used in the Spring Session Starter from (the legacy SDG) "gemfirePool" to the Apache Geode "DEFAULT" Pool for convenience, especially when getting started.
    

See [here](https://github.com/spring-projects/spring-boot-data-geode/milestone/26?closed=1) for more details.

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.2.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L38) for complete details.

## [](#whats-next)[](#whats-next)What’s Next

We will continue to address Issues in our [backlog](https://github.com/spring-projects/spring-boot-data-geode/issues).

1 improvement in a future release (~1.3 M1/M2) will include support to populate an Apache Geode or Pivotal GemFire Region using a `data.json` file in the same way a Spring Boot user can use `data.sql` to populate DBMS Tables.

See [Issue #67](https://github.com/spring-projects/spring-boot-data-geode/issues/67) for full details and to track progress.

## [](#conclusion)[](#conclusion)Conclusion

As always, any feedback is welcomed and appreciated.

Thank you.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
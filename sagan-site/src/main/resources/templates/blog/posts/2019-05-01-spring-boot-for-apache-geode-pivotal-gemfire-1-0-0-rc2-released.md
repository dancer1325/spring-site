---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.RC2 Released!
source: https://spring.io/blog/2019/05/01/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-rc2-released
scraped: 2026-02-23T14:49:30.489Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  May 01, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.RC2 Released!

_Releases | John Blum |  May 01, 2019 | 0 Comments_

I am pleased to announce the release of Spring Boot for Apache Geode & Pivotal GemFire (SBDG) 1.0.0.RC2.

I would like to send a special shoutout to the Spring Boot team for providing invaluable feedback on this project. Indeed, without Spring Boot and the fine efforts of the Boot team, SBDG would not be possible. So, thank you Boot team!

After incorporating the feedback, I decided to postpone the final GA and introduce 1 more release candidate. Final 1.0 GA is (tentatively) scheduled for Monday, May 6th.

The bits (`org.springframework.geode:spring-geode-starter:1.0.0.RC2`) are available in the Spring [libs-milestone](http://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.0.0.RC2) repository.

## [](#whats-new)[](#what-s-new)What’s New

This release includes the following changes:

-   Adds a **new** [sample](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/html5/guides/boot-actuator.html) showing Spring Boot’s Actuator support for Apache Geode & Pivotal GemFire
    
-   Includes the JCache API as a runtime dependency in both the `spring-geode-starter` and `spring-gemfire-starter` for convenience when using Spring’s Cache Abstraction with JSR-107, JCache API Annotations.
    
-   Removes the exclusion on `org.springframework.boot:spring-boot-starter-logging` and only excludes `org.apache.logging.log4j:log4j-to-slf4j` to avoid the conflict in logging dependencies between Spring Boot and Apache Geode
    
-   Improved test coverage
    
-   Upgrade to Gradle 5.4.1
    

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.0.0.RC2/spring-geode/src/main/resources/changelog.txt#L7-L19) for a complete list of details.

In addition to the changes above, the project now includes a [Wiki page](https://github.com/spring-projects/spring-boot-data-geode/wiki/Spring-Boot-for-Apache-Geode-and-Pivotal-GemFire-Version-Compatibility-Matrix) with the current version of SBDG along with all of its required dependencies and their versions.

## [](#whats-next)[](#what-s-next)What’s Next

Final GA! There are only a few documentation edits and touchups that need be made.

After the 1.0 GA, you can expect a SBDG `1.1.0.M1` release to follow. 1.1 will be based on Spring Framework 5.1, Spring Boot 2.1, Spring Data Lovelace and Spring Session 2.1.

## [](#feedback)[](#feedback)Feedback

As always, any feedback is much appreciated.

Thank you!

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
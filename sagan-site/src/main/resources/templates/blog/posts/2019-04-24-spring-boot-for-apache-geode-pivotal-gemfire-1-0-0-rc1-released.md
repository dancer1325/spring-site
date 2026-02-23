---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.RC1 Released!
source: https://spring.io/blog/2019/04/24/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-rc1-released
scraped: 2026-02-23T14:50:15.063Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  April 24, 2019 | 1 Comment
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.RC1 Released!

_Engineering | John Blum |  April 24, 2019 | 1 Comment_

I am pleased to announce the release of Spring Boot for Apache Geode and Pivotal GemFire (SBDG) 1.0.0.RC1.

This is another significant milestone and SBDG 1.0 is less than a week away from final GA.

The new bits, `org.springframework.geode:spring-geode-starter:1.0.0.RC1`, are available in the Spring `libs-milestone` repository, [here](http://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.0.0.RC1/).

# [](#whats-new)[](#whats-new)What’s New

This release adds several new features with some significant improvements and important bug fixes:

-   Added auto-configuration support to automatically configure a `GemfireTemplate` for each GemFire/Geode Region defined in the GemFire/Geode cache. [Read more](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/html5/#geode-data-access-region-templates)
    
-   Added chapter on "*Auto-configuration vs. Annotation-based configuration*" to the reference guide. [Read more](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/html5/#geode-autoconfiguration-annotations)
    
-   To compliment the chapter, added a new sample to explain and show Spring Boot’s auto-configuration support for GemFire/Geode in action. [Read more](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/html5/#geode-samples)
    
-   Fixed a bug in the HTTP client used to push cluster configuration from a client to a standalone GemFire/Geode cluster, or PCC environment, with Security (Auth) enabled. [Read more](https://github.com/spring-projects/spring-boot-data-geode/issues/16)
    
-   Switched Reference Docs to the HTML5 format. [See here](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/html5/).
    

This and many other improvements were made. See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.0.0.RC1/spring-geode/src/main/resources/changelog.txt#L7-L26) for complete details.

# [](#whats-next)[](#whats-next)What’s Next

With the exception of adding 1 more sample, focused on *Spring Boot’s Actuator* support for Apache Geode and Pivotal GemFire, most of the efforts will now shift to finalizing the GA release bits.

Only additional testing and documentation edits will be performed at this stage in development.

# [](#feedback)[](#feedback)Feedback

The GA release for SBDG 1.0 is tentatively scheduled for next Monday, 2019-04-29. Any feedback between now and then is always appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)
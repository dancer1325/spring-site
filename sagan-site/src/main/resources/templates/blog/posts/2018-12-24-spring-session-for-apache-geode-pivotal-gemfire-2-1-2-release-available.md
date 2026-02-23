---
title: Spring Session for Apache Geode/Pivotal GemFire 2.1.2.RELEASE Available!
source: https://spring.io/blog/2018/12/24/spring-session-for-apache-geode-pivotal-gemfire-2-1-2-release-available
scraped: 2026-02-23T15:03:36.684Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  December 24, 2018 | 0 Comments
---

# Spring Session for Apache Geode/Pivotal GemFire 2.1.2.RELEASE Available!

_Engineering | John Blum |  December 24, 2018 | 0 Comments_

It is my pleasure to announce [Spring Session](https://spring.io/projects/spring-session) for [Apache Geode](http://geode.apache.org/) and [Pivotal GemFire](https://pivotal.io/pivotal-gemfire) (SSDG), `2.1.2.RELEASE` ([official project site](https://github.com/spring-projects/spring-session-data-geode)).

In addition to several new features and improvements that follow, SSDG `2.1.2.RELEASE` builds on:

-   Spring Framework 5.1.3.RELEASE.
    
-   Spring Data for Apache Geode & Pivotal GemFire Lovelace-SR3.
    
-   Spring Session 2.1.2.RELEASE.
    

These bits will be picked up in Spring Boot 2.1.2.RELEASE and are [available in Maven Central](https://search.maven.org/search?q=spring-session-data-geode) now.

You can easily switch from Apache Geode to Pivotal GemFire simply by changing your application dependency from

`org.springframework.session:spring-session-data-geode:2.1.2.RELEASE`

to

`org.springframework.session:spring-session-data-gemfire:2.1.2.RELEASE`

or vice versa.

##### [](#new-features-include)[](#new-features-include)New Features Include:

-   Support of [customizable dirty Session and application domain object checking](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.2.RELEASE/reference/html5/#httpsession-gemfire-serialization-framework-session-deltas) using the **new** `IsDirtyPredicate` interface.

##### [](#improvements-include)[](#improvements-include)Improvements Include:

-   Allow `SessionRepository.save(:Session)` for only non-dirty `Sessions` ([additional details](https://github.com/spring-projects/spring-session-data-geode/issues/12)), minimizing network bandwidth.
    
-   [Server-side configuration support for GemFire/Geode DataSerialization](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.2.RELEASE/reference/html5/#httpsession-gemfire-serialization-framework-data-serialization-support) (Includes [example](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.2.RELEASE/reference/html5/guides/boot-gemfire-with-gfsh-servers.html)).
    
-   Use only overridden/implemented `SpringSessionGemFireConfigurer` callback methods to affect configuration ([additional details](https://github.com/spring-projects/spring-session-data-geode/issues/10)).
    
-   Simplified Delta Recording (\[additional details\]), reducing memory footprint.
    
-   [Optimized Interest Registration](https://github.com/spring-projects/spring-session-data-geode/issues/6) for Session events, thereby reduction network bandwidth.
    
-   Support to [expose Spring Session GemFire/Geode configuration as Properties in the Spring Environment](https://github.com/spring-projects/spring-session-data-geode/issues/14), allowing settings to be injected and inspected at runtime.
    

For a complete list of details about this release, see [here](https://github.com/spring-projects/spring-session-data-geode/milestone/9?closed=1) and [here](https://github.com/spring-projects/spring-session-data-geode/milestone/12?closed=1).

### [](#feedback)[](#feedback)Feedback

Tell us what you think or what we can do better. Feedback is always appreciated and welcomed.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)

Thank You!
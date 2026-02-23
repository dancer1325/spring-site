---
title: Spring Session for Apache Geode & Pivotal GemFire 2.0.9.RELEASE & 2.1.3.RELEASE Available
source: https://spring.io/blog/2019/04/12/spring-session-for-apache-geode-pivotal-gemfire-2-0-9-release-2-1-3-release-available
scraped: 2026-02-23T14:51:34.855Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  April 12, 2019 | 0 Comments
---

# Spring Session for Apache Geode & Pivotal GemFire 2.0.9.RELEASE & 2.1.3.RELEASE Available

_Engineering | John Blum |  April 12, 2019 | 0 Comments_

I am pleased to announce the release of Spring Session for Apache Geode & Pivotal GemFire (SSDG), 2.0.9.RELEASE and 2.1.3.RELEASE.

Both of these releases focus on dependency updates to align with the rest of the Spring portfolio in their respective release lines.

SSDG 2.0.9.RELEASE builds on:

-   Spring Framework 5.0.13.RELEASE
    
-   Spring Data Kay-SR14
    
-   Spring Session 2.0.10.RELEASE (Apple-SR9)
    
-   And is targeted for use in Spring Boot 2.0.9.RELEASE.
    

SSDG 2.1.3.RELEASE builds on:

-   Spring Framework 5.1.6.RELESE
    
-   Spring Data Lovelace-SR6
    
-   Spring Session 2.1.5.RELEASE (Bean-SR4)
    
-   And is targeted for use in Spring Boot 2.1.4.RELEASE
    

All SSDG bits are available in Maven Central ([here](https://search.maven.org/search?q=g:org.springframework.session%20AND%20a:spring-session-data-geode&core=gav)).

## [](#whats-next)[](#what-s-next)What’s Next

All attention is now focused on the SSDG 2.2 release line, building on Spring Framework 5.2, Spring Data Moore, Spring Session 2.2 and targeted for use in Spring Boot 2.2.

Some of the proposed and upcoming features include:

-   Attached Sessions (option).
    
-   Stronger Consistency (option) using `Map.replace(key, oldValue, newValue)` for lightweight transactions supplanting the need for heavier, cache/local transactions.
    
-   Improvements in PDX Serialization support.
    
-   And much more…​
    

## [](#feedback)[](#feedback)Feedback

As always, any feedback is much appreciated.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)
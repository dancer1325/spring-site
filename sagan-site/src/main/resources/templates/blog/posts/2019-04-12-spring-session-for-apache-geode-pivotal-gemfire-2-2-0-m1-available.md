---
title: Spring Session for Apache Geode & Pivotal GemFire 2.2.0.M1 Available
source: https://spring.io/blog/2019/04/12/spring-session-for-apache-geode-pivotal-gemfire-2-2-0-m1-available
scraped: 2026-02-23T14:51:30.488Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  April 12, 2019 | 0 Comments
---

# Spring Session for Apache Geode & Pivotal GemFire 2.2.0.M1 Available

_Engineering | John Blum |  April 12, 2019 | 0 Comments_

I am pleased to announce the release of Spring Session for Apache Geode & Pivotal GemFire (SSDG), 2.2.0.M1.

This release focuses on dependency updates to align with the rest of the Spring portfolio in their respective release lines, building on:

-   Spring Framework 5.2.0.M1
    
-   Spring Data Moore-M3
    
-   Spring Session 2.2.0.M1
    
-   And is targeted for use in Spring Boot 2.2.0.M1
    

SSDG 2.2.0.M1 bits are available in the Spring libs-milestone repository ([here](http://repo.spring.io/libs-milestone/org/springframework/session/spring-session-data-geode/2.2.0.M1)).

## [](#whats-next)[](#what-s-next)What’s Next

Some of the proposed and upcoming features in the SSDG 2.2 release line include:

-   Attached Sessions (option).
    
-   Stronger Consistency (option) using `Map.replace(key, oldValue, newValue)` for lightweight transactions supplanting the need for heavier, cache/local transactions.
    
-   Improvements in PDX Serialization support.
    
-   And much more…​
    

## [](#feedback)[](#feedback)Feedback

As always, any feedback is much appreciated.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)
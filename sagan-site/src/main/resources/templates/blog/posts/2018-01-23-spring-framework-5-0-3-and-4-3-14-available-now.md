---
title: Spring Framework 5.0.3 and 4.3.14 available now
source: https://spring.io/blog/2018/01/23/spring-framework-5-0-3-and-4-3-14-available-now
scraped: 2026-02-23T16:10:44.495Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  January 23, 2018 | 3 Comments
---

# Spring Framework 5.0.3 and 4.3.14 available now

_Releases | Juergen Hoeller |  January 23, 2018 | 3 Comments_

Dear Spring community,

I’m pleased to announce that Spring Framework [5.0.3](https://jira.spring.io/browse/SPR/fixforversion/16496) and [4.3.14](https://jira.spring.io/browse/SPR/fixforversion/16596) are [available now](https://projects.spring.io/spring-framework/), as another pair of refinement releases which are recommended as immediate upgrades for all users. Our 5.0.3 release is the foundation for the upcoming Spring Boot 2.0 RC1 release next week, and 4.3.14 will be picked up by Boot 1.5.10 around the same time.

Spring Framework 5.0.3 comes with fresh support for Kotlin 1.2.20, Reactor Core 3.1.3 and JUnit 5.0.3 and has been successfully tested on the latest JDK 10 early-access builds already. It also includes fixes for a few recent regressions and selected refinements in the WebFlux APIs, just in time for moving 5.0.x into maintenance mode and preparing for the [5.1 line](https://jira.spring.io/browse/SPR/fixforversion/16630).

Both 5.0.3 and 4.3.14 ship with an embedded variant of the recent CGLIB 3.2.6 release. 4.3.14 also got upgraded to ASM 6.0, with full support for Java 9 constructs at the bytecode level. *Please note that we strongly recommend Spring Framework 5.x for new projects on JDK 9+; our 4.3.x support just provides a smooth upgrade path for existing applications.*

Cheers, Juergen
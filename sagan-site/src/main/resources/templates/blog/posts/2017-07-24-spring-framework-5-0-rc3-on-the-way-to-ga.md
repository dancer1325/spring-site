---
title: Spring Framework 5.0 RC3 - on the way to GA
source: https://spring.io/blog/2017/07/24/spring-framework-5-0-rc3-on-the-way-to-ga
scraped: 2026-02-23T16:25:33.502Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  July 24, 2017 | 18 Comments
---

# Spring Framework 5.0 RC3 - on the way to GA

_Releases | Juergen Hoeller |  July 24, 2017 | 18 Comments_

Dear Spring community,

I'm pleased to announce that the [third Spring Framework 5.0 release candidate](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10000&version=16199) is [available](http://projects.spring.io/spring-framework/)!

This release comes with **refined nullability declarations** (including the field and bean property level), **even stronger Kotlin support** (with a declarative bean definition DSL and support for default constructor arguments on Kotlin data classes), as well as **several API refinements in Spring WebFlux**. Furthermore, Spring Framework 5.0 RC3 ships against **Reactor 3.1 M3** and **JUnit 5.0 M6** and is fully tested against the recent JDK 9 release candidate.

With respect to our remaining roadmap, despite being feature-complete already, we opted for an **extended release candidate phase**. This allows for further hardening of our revised APIs and in particular for a proper upgrade to Reactor 3.1 GA, JUnit 5.0 GA and Jackson 2.9 GA (all expected by early September). As a consequence, we are aiming for our **Spring Framework 5.0 GA release in September** now, close to JDK 9's general availability target.

Cheers, Juergen
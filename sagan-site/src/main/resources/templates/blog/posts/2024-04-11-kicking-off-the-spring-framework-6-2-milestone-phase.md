---
title: Kicking off the Spring Framework 6.2 milestone phase
source: https://spring.io/blog/2024/04/11/kicking-off-the-spring-framework-6-2-milestone-phase
scraped: 2026-02-23T08:42:12.465Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  April 11, 2024 | 0 Comments
---

# Kicking off the Spring Framework 6.2 milestone phase

_Releases | Juergen Hoeller |  April 11, 2024 | 0 Comments_

Dear Spring community,

On behalf of the core framework team, it is my pleasure to kick off the Spring Framework 6.2 milestone phase: 6.2.0-M1 is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now.

This milestone contains several enhancements in the core container, including a revision of the autowiring algorithm (e.g. for consistent generic type matching and for faster resolution of name-based matches) and a revision of singleton locking (e.g. for background bootstrapping), as well as a range of new features in Spring's testing support. Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62) for details about the new features available at this point.

Please give this new framework version an early try and let us know how it goes! 6.2.0-M1 is designed as a drop-in replacement for 6.1.x in common scenarios. Note that Spring Boot 3.3 will still ship with Spring Framework 6.1.x in May; the Spring Framework 6.2 branch is being prepared for inclusion in Spring Boot 3.4 with general availability in November. Up until then, we'll publish a series of blog posts highlighting specific 6.2 features.

Cheers, Juergen
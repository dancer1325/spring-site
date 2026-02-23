---
title: Spring Framework 4.1.7 & 3.2.14 released
source: https://spring.io/blog/2015/06/30/spring-framework-4-1-7-3-2-14-released
scraped: 2026-02-23T19:47:57.828Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  June 30, 2015 | 0 Comments
---

# Spring Framework 4.1.7 & 3.2.14 released

_Releases | Juergen Hoeller |  June 30, 2015 | 0 Comments_

Dear Spring community,

I'm pleased to announce that the Spring Framework [4.1.7](https://jira.spring.io/browse/SPR/fixforversion/14936) and [3.2.14](https://jira.spring.io/browse/SPR/fixforversion/14932) maintenance releases are [available now](http://projects.spring.io/spring-framework/). Aside from fixing [various minor issues](https://jira.spring.io/issues/?jql=project%20%3D%20SPR%20AND%20fixVersion%20%3D%204.1.7) across the framework, these releases also address an [XML parsing vulnerability](http://pivotal.io/security/cve-2015-3192) through disabling DTD processing by default when parsing untrusted XML input in Spring MVC endpoints.

Note that Spring Framework 3.2.x has its End-of-Life scheduled for [December 31, 2016](https://spring.io/blog/2015/06/15/spring-framework-3-2-x-eol-on-dec-31-2016). Based on demand and vulnerability reports, further maintenance releases will be made available up until then. At the same time, we strongly recommend a [migration](https://github.com/spring-projects/spring-framework/wiki/Migrating-from-earlier-versions-of-the-spring-framework) to Spring Framework 4.1.7 or the upcoming [4.2](https://jira.spring.io/browse/SPR/fixforversion/14954) at this point; please plan accordingly!

Cheers, Juergen

*P.S.: Stay tuned for Spring Framework 4.2 RC2, following right away!*
---
title: Spring Framework 4.1.2 & 4.0.8 & 3.2.12 released
source: https://spring.io/blog/2014/11/11/spring-framework-4-1-2-4-0-8-3-2-12-released
scraped: 2026-02-23T22:08:08.008Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  November 11, 2014 | 6 Comments
---

# Spring Framework 4.1.2 & 4.0.8 & 3.2.12 released

_Releases | Juergen Hoeller |  November 11, 2014 | 6 Comments_

Dear Spring community,

It's my pleasure to announce the immediate availability of Spring Framework 4.1.2, accompanied by 4.0.8 and 3.2.12 maintenance releases.

Spring Framework 4.1.2 is our second maintenance release in the 4.1.x line but also comes as a key feature release, including many user-suggested and user-contributed improvements: in total, more than one hundred issues have been addressed. 4.1.2 also serves as the core framework release to go into Spring Boot 1.2 which is just around the corner...

[\-> List of resolved JIRA issues for Spring Framework 4.1.2](https://jira.spring.io/issues/?jql=project%20%3D%20SPR%20AND%20fixVersion%20%3D%204.1.2%20ORDER%20BY%20issuetype%20ASC)

Note that aside from fixing several minor bugs within the framework, all three releases contain an important security fix for MVC resource handling. An immediate upgrade to the respective maintenance release of your current branch is strongly encouraged if you are using Spring's ResourceHttpRequestHandler, e.g. through an <mvc:resources> setup.

The next release in our current development line will be 4.1.3, scheduled for late December. 4.1.x will turn into a maintenance branch soon, with active development on 4.2 about to start.

Cheers,

Juergen
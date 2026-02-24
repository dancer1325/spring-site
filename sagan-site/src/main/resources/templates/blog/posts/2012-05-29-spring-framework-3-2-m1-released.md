---
title: Spring Framework 3.2 M1 Released
source: https://spring.io/blog/2012/05/29/spring-framework-3-2-m1-released
scraped: 2026-02-24T08:21:16.012Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Chris Beams |  May 29, 2012 | 0 Comments
---

# Spring Framework 3.2 M1 Released

_Releases | Chris Beams |  May 29, 2012 | 0 Comments_

The first milestone release toward Spring 3.2 is now available from the SpringSource repository at [http://repo.springsource.org](http://repo.springsource.org). See [here](https://github.com/SpringSource/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts) for a quick tutorial on resolving these artifacts via Maven.

This release includes:

-   initial support for [asynchronous @Controller methods](http://blog.springsource.org/2012/05/10/spring-mvc-3-2-preview-making-a-controller-method-asynchronous/)
-   early [support for JCache-based cache providers](http://static.springsource.org/spring-framework/docs/3.2.0.M1/api/org/springframework/cache/jcache/package-summary.html)
-   significant [performance improvements](https://github.com/springsource/spring-framework/commit/4c7a1c0a5403b35dd812dae1f2a753538928bb32) in autowiring of non-singleton beans
-   [initial delay](https://jira.springsource.org/browse/SPR-7022) support for [@Scheduled](http://static.springsource.org/spring-framework/docs/3.2.0.M1/api/org/springframework/scheduling/annotation/Scheduled.html#initialDelay\(\)) and [<task:scheduled>](http://static.springsource.org/spring-framework/docs/3.2.0.M1/reference/html/scheduling.html#scheduling-task-namespace-scheduled-tasks)
-   ability to [choose between multiple executuors with @Async](http://static.springsource.org/spring-framework/docs/3.2.0.M1/reference/htmlsingle/#scheduling-annotation-support-qualification)
-   enhanced [bean profile selection using the not (!) operator](https://github.com/SpringSource/spring-framework/commit/bcd44f3798ed06c0704d2a3564b8a9735e747e87)
-   [48 bugs](http://bit.ly/KXCkGX) fixed, [8 new features](http://bit.ly/KXCyhh) and [36 improvements](http://bit.ly/KXCA8M) implemented

This is also the first release since our [move to GitHub](https://github.com/springsource/spring-framework) and using our [new Gradle build](https://github.com/springsource/spring-framework#building-from-source). A special thanks to the authors of the many [pull requests](https://github.com/SpringSource/spring-framework/pulls) submitted and merged during 3.2 M1! [Keep them coming](https://github.com/SpringSource/spring-framework/wiki/Contributor-guidelines)!

[Download](http://www.springsource.com/download/community?project=Spring%20Framework&version=3.2.0.M1) | [Documentation](http://static.springsource.org/spring-framework/docs/3.2.0.M1/reference) | [Javadoc API](http://static.springsource.org/spring-framework/docs/3.2.0.M1/api/) | [Change Log](http://static.springsource.org/spring-framework/docs/3.2.0.M1/changelog.txt) | [JIRA](http://jira.springframework.org/browse/SPR) | [Forum](http://forum.springsource.org/forumdisplay.php?f=21) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring)
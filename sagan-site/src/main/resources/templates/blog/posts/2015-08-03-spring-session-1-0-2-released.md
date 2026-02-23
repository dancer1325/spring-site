---
title: Spring Session 1.0.2 Released
source: https://spring.io/blog/2015/08/03/spring-session-1-0-2-released
scraped: 2026-02-23T19:45:48.697Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  August 03, 2015 | 0 Comments
---

# Spring Session 1.0.2 Released

_Releases | Rob Winch |  August 03, 2015 | 0 Comments_

I'm pleased to announce the release of [Spring Session](http://projects.spring.io/spring-session/) 1.0.2.RELEASE. You can find the release in [Maven Central](http://repo1.maven.org/maven2/org/springframework/session/).

This release fixes [20+ tickets](https://github.com/spring-projects/spring-session/issues?q=milestone%3A1.0.2). The general goal was to close out bugs before we start working on Spring Session 1.1. You can find the highlights below:

## [](#highlights)Highlights

The highlights of Spring Session 1.0.2 are available below:

-   ERROR dispatch can cause two sessions to be created ([#229](https://github.com/spring-projects/spring-session/issues/229))
-   CookieHttpSessionStrategy can write the same Session id twice ([#251](https://github.com/spring-projects/spring-session/issues/251))
-   Updates to previous HttpSession references are not reflected after changeSessionId() invoked ([#227](https://github.com/spring-projects/spring-session/issues/227))
-   Official support for Spring Framework 4.2 ([#120](https://github.com/spring-projects/spring-session/issues/120))
-   Our samples remove Embedded Redis ([#248](https://github.com/spring-projects/spring-session/issues/248))
-   Documentation improvements and fixes

[Site](http://projects.spring.io/spring-session/) | [Documentation](http://docs.spring.io/spring-session/docs/current/reference/html5/) | [Javadoc](http://docs.spring.io/spring-session/docs/current/api/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-session) | [Source](https://github.com/spring-projects/spring-session) | [Changelog](https://github.com/spring-projects/spring-session/issues?q=milestone%3A1.0.2)
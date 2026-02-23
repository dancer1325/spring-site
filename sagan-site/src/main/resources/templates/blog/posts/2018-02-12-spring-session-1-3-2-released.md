---
title: Spring Session 1.3.2 Released
source: https://spring.io/blog/2018/02/12/spring-session-1-3-2-released
scraped: 2026-02-23T16:09:26.082Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  February 12, 2018 | 0 Comments
---

# Spring Session 1.3.2 Released

_Releases | Rob Winch |  February 12, 2018 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community I’m pleased to announce the release of [Spring Session 1.3.2.RELEASE](https://docs.spring.io/spring-session/docs/1.3.2.RELEASE/reference/html5/). This maintenance release contains numerous bug fixes and improvements.

Some of the highlights include:

-   [#951](https://github.com/spring-projects/spring-session/issues/951) - `SessionRepositoryFilter#changeSessionId` does not copy the previous `maxInactiveInterval` into the new session
    
-   [#983](https://github.com/spring-projects/spring-session/issues/983) - Optimize `HazelcastSessionRepository` write operations
    
-   [#984](https://github.com/spring-projects/spring-session/issues/984) - Improve session event handling
    

You can find the complete details of the release in the [changelog](https://github.com/spring-projects/spring-session/milestone/33?closed=1).

# [](#feedback-please)[](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session), [GitHub Issues](https://github.com/spring-projects/spring-session/issues), or via the comments section. You can also ping Rob [@rob\_winch](https://twitter.com/rob_winch), Joe [@joe\_grandja](https://twitter.com/joe_grandja), or me [@vedran\_pavic](https://twitter.com/vedran_pavic) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-session/blob/1.3.2.RELEASE/CONTRIBUTING.adoc).

[Project Site](https://projects.spring.io/spring-session/) | [Reference](https://docs.spring.io/spring-session/docs/1.3.2.RELEASE/reference/html5/) | [Help](https://stackoverflow.com/questions/tagged/spring-session)
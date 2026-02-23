---
title: Spring Session 1.0.0.RELEASE
source: https://spring.io/blog/2015/01/08/spring-session-1-0-0-release
scraped: 2026-02-23T22:00:34.124Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  January 08, 2015 | 3 Comments
---

# Spring Session 1.0.0.RELEASE

_Releases | Rob Winch |  January 08, 2015 | 3 Comments_

I'm pleased to announce the release of [Spring Session](http://projects.spring.io/spring-session/) 1.0.0.RELEASE. You can find the release in [Maven Central](http://repo1.maven.org/maven2/org/springframework/session/).

## [](#features)Features

Spring Session provides the following features:

-   API and implementations (i.e. Redis) for managing a user's session
-   [HttpSession](http://docs.spring.io/spring-session/docs/current/reference/html5/#httpsession) - allows replacing the HttpSession in an application container (i.e. Tomcat) neutral way. Additional features include:
    -   **Clustered Sessions** - Spring Session makes it trivial to support [clustered sessions](http://docs.spring.io/spring-session/docs/current/reference/html5/#httpsession-redis) without being tied to an application container specific solution.
    -   **Multiple Browser Sessions** - Spring Session supports [managing multiple users' sessions](http://docs.spring.io/spring-session/docs/current/reference/html5/#httpsession-multi) in a single browser instance (i.e. multiple authenticated accounts similar to Google).
    -   **RESTful APIs** - Spring Session allows providing session ids in headers to work with [RESTful APIs](http://docs.spring.io/spring-session/docs/current/reference/html5/#httpsession-rest)
-   [WebSocket](http://docs.spring.io/spring-session/docs/current/reference/html5/#websocket) - provides the ability to keep the HttpSession alive when receiving WebSocket messages
-   Lot's of [sample applications](http://docs.spring.io/spring-session/docs/current/reference/html5/#samples) with Guides to get you started fast!

A special thanks to all the community feedback and support. I'd like to especially thank [Christopher Smith](https://github.com/chrylis) for all of his great feedback. If you find an issue or what a new feature, please [report it](https://github.com/spring-projects/spring-session/issues) or better yet create a [pull request](https://github.com/spring-projects/spring-session/pulls).

## [](#spreading-the-word)Spreading the Word

If you are excited about Spring Session, help show the love!

-   [Tweet](https://twitter.com/rob_winch/status/553262382714454017) about it
-   Star us on [GitHub](https://github.com/spring-projects/spring-session)
-   Vote us up on [DZone](http://www.dzone.com/links/another_nail_in_the_app_server_coffin_spring_sess.html) & [Reddit](http://www.reddit.com/r/java/comments/2rrwm8/another_nail_in_the_app_server_coffin_spring/)

[Site](http://projects.spring.io/spring-session/) | [Documentation](http://docs.spring.io/spring-session/docs/current/reference/html5/) | [Javadoc](http://docs.spring.io/spring-session/docs/current/api/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-session) | [Source](https://github.com/spring-projects/spring-session) | [Changelog](https://github.com/spring-projects/spring-session/issues?q=milestone%3A%221.0.0+GA%22)
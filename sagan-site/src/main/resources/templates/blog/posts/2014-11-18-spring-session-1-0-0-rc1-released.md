---
title: Spring Session 1.0.0.RC1 Released
source: http://spring.io/blog/2014/11/18/spring-session-1-0-0-rc1-released
scraped: 2026-02-23T22:06:51.834Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  November 18, 2014 | 8 Comments
---

# Spring Session 1.0.0.RC1 Released

_Releases | Rob Winch |  November 18, 2014 | 8 Comments_

I'm pleased to announce the release of [Spring Session](https://github.com/spring-projects/spring-session/) 1.0.0.RC1.

For full details on the changes made in the release, please refer to the [changelog](https://github.com/spring-projects/spring-session/issues?q=milestone%3A%221.0.0+RC1%22+is%3Aclosed). The highlights of this release include:

-   WebSocket support. See the [websocket sample](https://github.com/spring-projects/spring-session/tree/1.0.0.RC1/samples/websocket) for details.
-   Support for multiple simultaneous sessions in a single browser. Refer to the [users sample](https://github.com/spring-projects/spring-session/tree/1.0.0.RC1/samples/users) for an example.
-   Simplified configuration with [@EnableRedisHttpSession](https://github.com/spring-projects/spring-session/blob/1.0.0.RC1/samples/web/src/main/java/sample/Config.java#L29) and [AbstractHttpSessionApplicationInitializer](https://github.com/spring-projects/spring-session/blob/1.0.0.RC1/samples/web/src/main/java/sample/Initializer.java#L24)
-   Support for background task to cleanup expired Redis sessions. See [spring-session/gh-59](https://github.com/spring-projects/spring-session/issues/59)
-   Added spring-session-data-redis pom to make declaring dependencies more concise.
-   [Hazelcast Sample](https://github.com/spring-projects/spring-session/tree/1.0.0.RC1/samples/hazelcast)

Please try out the updates and provide feedback. Our current plan is to go GA in early December.
---
title: Spring Session 1.1.0.M1 Released
source: https://spring.io/blog/2015/11/17/spring-session-1-1-0-m1-released
scraped: 2026-02-23T19:35:43.048Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  November 17, 2015 | 0 Comments
---

# Spring Session 1.1.0.M1 Released

_Releases | Rob Winch |  November 17, 2015 | 0 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Session 1.1.0.M1. [The release](https://repo.spring.io/milestone/org/springframework/session/spring-session-data-redis/1.1.0.M1/) can be found in the [Spring Milestone Repository](https://github.com/spring-projects/spring-framework/wiki/Spring-repository-FAQ#what-repositories-are-available) ([https://repo.spring.io/milestone/](https://repo.spring.io/milestone/)).

This release contains lots of fixes and new features. You can find a complete list in the [changelog](https://github.com/spring-projects/spring-session/issues?utf8=%E2%9C%93&q=milestone%3A%221.1.0+M1%22). The highlights have been included below:

-   Support for [search for session by username](http://docs.spring.io/spring-session/docs/1.1.0.M1/reference/html5/guides/findbyusername.html)
-   Support [Customize Cookie Creation](http://docs.spring.io/spring-session/docs/1.1.0.M1/reference/html5/guides/custom-cookie.html). Thanks to everyone who provided PRs and feedback for this feature!
-   Add [HttpSessionListener](http://docs.spring.io/spring-session/docs/1.1.0.M1/reference/html5/#httpsession-httpsessionlistener) support
-   Allow [override default RedisSerializer](https://github.com/spring-projects/spring-session/issues/283)
-   Added comprehensive [Hazelcast and configuration support](http://docs.spring.io/spring-session/docs/1.1.0.M1/reference/html5/guides/hazelcast-spring.html). Thanks [@\_mark\_a](https://twitter.com/_mark_a) and [@tommyludwig](https://twitter.com/tommyludwig)!
-   [Performance improvements](https://github.com/spring-projects/spring-session/issues/271)
-   Allow scoping the session in Redis using [redisNamespace](http://docs.spring.io/spring-session/docs/1.1.0.M1/reference/html5/#api-redisoperationssessionrepository-config). Thanks [fstegmann](https://github.com/fstegmann)!
-   Add [ExpiringSession.setLastAccessedTime(long)](https://github.com/spring-projects/spring-session/issues/272)

[Site](http://projects.spring.io/spring-session/) | [Documentation](http://docs.spring.io/spring-session/docs/1.1.0.M1/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-session)
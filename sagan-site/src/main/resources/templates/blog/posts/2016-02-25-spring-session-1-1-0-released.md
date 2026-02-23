---
title: Spring Session 1.1.0 Released
source: https://spring.io/blog/2016/02/25/spring-session-1-1-0-released
scraped: 2026-02-23T19:26:10.031Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  February 25, 2016 | 0 Comments
---

# Spring Session 1.1.0 Released

_Releases | Rob Winch |  February 25, 2016 | 0 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Session 1.1.0.RELEASE. [The release](https://repo1.maven.org/maven2/org/springframework/session) can be found in Maven Central.

## [](#change-log)Change Log

With over 80 issues resolved, there is plenty found in this release. You can find a complete list of changes in the change logs ([1.1.0.M1](https://github.com/spring-projects/spring-session/issues?q=milestone%3A%221.1.0+M1%22), [1.1.0.RC1](https://github.com/spring-projects/spring-session/issues?q=milestone%3A%221.1.0+RC1%22), [1.1.0.RELEASE](https://github.com/spring-projects/spring-session/issues?q=milestone%3A1.1.0)). A summary of the changes can be found below:

-   Support for [Hazelcast](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/guides/hazelcast-spring.html). Thanks [@\_mark\_a](https://twitter.com/_mark_a) and [@tommyludwig](https://twitter.com/tommyludwig)!
-   Support for [GemFire](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/#httpsession-gemfire) Thanks to [John Blum](https://twitter.com/john_blum)!
-   Support for [search for session by username](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/guides/findbyusername.html)
-   Support [Customize Cookie Creation](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/guides/custom-cookie.html). Thanks to everyone who provided PRs and feedback for this feature!
-   Add [HttpSessionListener](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/#httpsession-httpsessionlistener) support
-   Allow [override default RedisSerializer](https://github.com/spring-projects/spring-session/issues/283)
-   [Performance improvements](https://github.com/spring-projects/spring-session/issues/271)
-   Allow scoping the session in Redis using [redisNamespace](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/#api-redisoperationssessionrepository-config). Thanks [fstegmann](https://github.com/fstegmann)!
-   Allow writing to Redis immediately (instead of lazily) using [redisFlushMode](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/#api-redisoperationssessionrepository-config)
-   Add [ExpiringSession.setLastAccessedTime(long)](https://github.com/spring-projects/spring-session/issues/272)

## [](#chat-on-gitter)Chat on Gitter

If you would like to discuss the release or anything else Spring Session, please [join us on Gitter](https://gitter.im/spring-projects/spring-session) !

## [](#120)1.2.0

Thanks to a very active community, we already have plans for a 1.2 with support for JDBC and Mongo based repositories. The current plan is to have an RC1 available in March. Assuming there are no issues found we will follow up with a GA release a few weeks afterwards.

[Site](http://projects.spring.io/spring-session/) | [Documentation](http://docs.spring.io/spring-session/docs/1.1.0.RELEASE/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-session)
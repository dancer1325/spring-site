---
title: Spring Session 1.2.0 RC2 Released
source: https://spring.io/blog/2016/04/07/spring-session-1-2-0-rc2-released
scraped: 2026-02-23T19:20:20.167Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  April 07, 2016 | 0 Comments
---

# Spring Session 1.2.0 RC2 Released

_Releases | Rob Winch |  April 07, 2016 | 0 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Session 1.2.0.RC2. The release can be found in the [Spring Milestone Repository](https://github.com/spring-projects/spring-framework/wiki/Spring-repository-FAQ#what-repositories-are-available) ([https://repo.spring.io/milestone/](https://repo.spring.io/milestone/)).

This release contains [some fixes](https://github.com/spring-projects/spring-session/issues?q=milestone%3A1.2.0.RC2+is%3Aclosed) for the previous release.

Some highlights of the issues in this release include:

-   A number of fixes for the JDBC support have been included
-   A new [Grails 3 Sample](http://docs.spring.io/spring-session/docs/1.2.0.RC2/reference/html5/guides/grails3.html)

See [What's New in 1.2](http://docs.spring.io/spring-session/docs/1.2.0.RC2/reference/html5/#what-s-new-in-1-2) for more details.

# [](#our-community-support)Our Community Support

As always, I'd like to thank our awesome community for their contributions. A very big thanks to those who submitted Pull Requests:

-   [#436](https://github.com/spring-projects/spring-session/pull/436) - Use Flapdoodle Embedded MongoDB for integration tests Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#437](https://github.com/spring-projects/spring-session/pull/437) - Externalize H2 database dependency version Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#440](https://github.com/spring-projects/spring-session/pull/440) - Fix SessionRepositoryFilter comment typo Thanks [Jin Zhang](https://github.com/lowzj)
-   [#442](https://github.com/spring-projects/spring-session/pull/442) - Add Grails 3 Sample Thanks [Eric Helgeson](https://github.com/erichelgeson)
-   [#444](https://github.com/spring-projects/spring-session/pull/444) - Add Dispatcher types to web.xml Thanks [moonlight](https://github.com/sc-moonlight)
-   [#450](https://github.com/spring-projects/spring-session/pull/450) - Fix loading of JdbcSession's lastAccessedTime attribute Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#451](https://github.com/spring-projects/spring-session/pull/451) - Polish JdbcHttpSessionConfigurationTests Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#454](https://github.com/spring-projects/spring-session/pull/454) - Add JDBC Spring Boot sample Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#462](https://github.com/spring-projects/spring-session/pull/462) - Update WebSocket sample to use H2 console auto-configuration Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#463](https://github.com/spring-projects/spring-session/pull/463) - Make H2 console URL consistent across sample projects Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#464](https://github.com/spring-projects/spring-session/pull/464) - Enable transaction management for JdbcOperationsSessionRepository operations Thanks [Vedran Pavić](https://github.com/vpavic)

We look forward to your feedback and if all goes well plan to release 1.2.0.RELEASE in the next few weeks.

[Site](http://projects.spring.io/spring-session/) | [Documentation](http://docs.spring.io/spring-session/docs/1.2.0.RC2/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-session)
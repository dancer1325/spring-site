---
title: Spring Session 1.2.0 RC3 Released
source: https://spring.io/blog/2016/04/28/spring-session-1-2-0-rc3-released
scraped: 2026-02-23T19:17:14.934Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  April 28, 2016 | 0 Comments
---

# Spring Session 1.2.0 RC3 Released

_Engineering | Rob Winch |  April 28, 2016 | 0 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Session 1.2.0.RC3. The release can be found in the [Spring Milestone Repository](https://github.com/spring-projects/spring-framework/wiki/Spring-repository-FAQ#what-repositories-are-available) ([https://repo.spring.io/milestone/](https://repo.spring.io/milestone/)).

This release contains [some fixes](https://github.com/spring-projects/spring-session/issues?q=milestone%3A1.2.0.RC3+is%3Aclosed) for the previous release.

Some highlights of the issues in this release include:

-   JDBC Support persists session attributes on a separate table. This was in response to the community feedback (thanks!)
-   [Redis Session optimization](https://github.com/spring-projects/spring-session/issues/467)
-   Preparations for improved Spring Boot auto configuration
-   Updated to Spring Data Hopper

See [What's New in 1.2](http://docs.spring.io/spring-session/docs/1.2.0.RC3/reference/html5/#what-s-new-in-1-2) for more details.

# [](#our-community-support)Our Community Support

As always, I'd like to thank our awesome community for their contributions. A very big thanks to those who submitted Pull Requests:

-   [#471](https://github.com/spring-projects/spring-session/pull/471) - Update to Spring Data Hopper Release Thanks [John Blum](https://github.com/jxblum)
-   [#475](https://github.com/spring-projects/spring-session/pull/475) - Add GitHub Issue and PR templates Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#476](https://github.com/spring-projects/spring-session/pull/476) - Add compile dependency to commons-logging Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#490](https://github.com/spring-projects/spring-session/pull/490) - Add tableName setter for JdbcHttpSessionConfiguration Thanks [Eddú Meléndez Gonzales](https://github.com/eddumelendez)
-   [#492](https://github.com/spring-projects/spring-session/pull/492) - Expose attributes in MongoHttpSessionConfiguration Thanks [Eddú Meléndez Gonzales](https://github.com/eddumelendez)
-   [#494](https://github.com/spring-projects/spring-session/pull/494) - Remove duplicate words Thanks [Johnny Lim](https://github.com/izeye)
-   [#495](https://github.com/spring-projects/spring-session/pull/495) - Implement individual attribute persistence in JdbcOperationsSessionRepository Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#501](https://github.com/spring-projects/spring-session/pull/501) - Set collectionName attribute in MongoOperationsSessionRepository Thanks [Eddú Meléndez Gonzales](https://github.com/eddumelendez)

We look forward to your feedback and if all goes well plan to release 1.2.0.RELEASE in the next few weeks.

[Site](http://projects.spring.io/spring-session/) | [Documentation](http://docs.spring.io/spring-session/docs/1.2.0.RC2/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-session)
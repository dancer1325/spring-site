---
title: Spring Boot 2.0.0 M7 available now
source: https://spring.io/blog/2017/11/30/spring-boot-2-0-0-m7-available-now
scraped: 2026-02-23T16:13:23.476Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  November 30, 2017 | 13 Comments
---

# Spring Boot 2.0.0 M7 available now

_Releases | Phil Webb |  November 30, 2017 | 13 Comments_

On behalf of the team, it is my pleasure to announce that Spring Boot 2.0.0.M7 has been released and is now available from [our milestone repository](http://repo.spring.io/milestone/). This release closes [165 issues and pull requests](https://github.com/spring-projects/spring-boot/milestone/56?closed=1) and continues our progress towards 2.0 GA. Thanks to everyone that has contributed!

This release refines a number of items from previous milestones, and provides a number of notable new features:

-   Condition evaluation report deltas on Devtools triggered restart
-   A new scheduled tasks actuator endpoint
-   Support for Duration types in configuration properties (e.g. `5ms`, `1s`, `10m`)
-   Reactive Couchbase support

If you are upgrading from the previous milestone please be aware that actuator endpoints are now under `/actuator` rather than `/application`. You will also need to set `management.endpoints.web.expose=*` if you want to access all enabled endpoints over HTTP.

For a complete list of changes, and upgrade instructions, see the [Spring Boot 2.0.0.M7 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0.0-M7-Release-Notes) on the WIKI.

To get started with Spring Boot 2.0.0 M7 and discover those new feature, you can easily bootstrap a new project on [start.spring.io](https://start.spring.io).

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.0.0.M7/reference/htmlsingle) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
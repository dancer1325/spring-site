---
title: Spring Boot 2.0.0 RC1 available now
source: https://spring.io/blog/2018/01/31/spring-boot-2-0-0-rc1-available-now
scraped: 2026-02-23T16:10:27.319Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  January 31, 2018 | 10 Comments
---

# Spring Boot 2.0.0 RC1 available now

_Releases | Phil Webb |  January 31, 2018 | 10 Comments_

On behalf of the team, it is my great pleasure to announce that Spring Boot 2.0.0.RC1 has been released and is now available from [our milestone repository](http://repo.spring.io/milestone/).

This release closes a massive [313 issues and pull requests](https://github.com/spring-projects/spring-boot/milestone/80?closed=1), and is our first release candidate. At this point we're not anticipating that any major API changes or new features will be added before our final 2.0 GA release.

We've refined a number of items from previous milestone, and provide a number of notable new features including:

-   A module to help with legacy property migration
-   HTTP/2 support for Jetty (to go along with the Tomcat and Undertow that was added in M7)
-   Greatly enhanced GSON support (thanks to an external contribution)
-   Improved actuator JSON structures
-   Helpful security matchers for both Servlet and Reactive deployements

This release also picks up [57 issues](https://github.com/spring-projects/spring-boot/milestone/96?closed=1) that were closed for the [recent 1.5.10 release](https://spring.io/blog/2018/01/31/spring-boot-1-5-10-available-now), including an important fix for security vulnerability [CVE-2018-1196](https://pivotal.io/security/cve-2018-1196).

For a complete list of changes, and upgrade instructions, see the [Spring Boot 2.0.0.RC1 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0.0-RC1-Release-Notes) on the WIKI.

To get started with Spring Boot 2.0.0 RC1 and discover those new features, you can easily bootstrap a new project on [start.spring.io](https://start.spring.io).

Thanks to everyone that has contributed to Spring Boot 2.0 so far!

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.0.0.RC1/reference/htmlsingle) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
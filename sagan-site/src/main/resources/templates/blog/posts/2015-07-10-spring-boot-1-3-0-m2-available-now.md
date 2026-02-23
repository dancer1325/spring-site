---
title: Spring Boot 1.3.0.M2 Available Now
source: https://spring.io/blog/2015/07/10/spring-boot-1-3-0-m2-available-now
scraped: 2026-02-23T19:47:13.145Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  July 10, 2015 | 2 Comments
---

# Spring Boot 1.3.0.M2 Available Now

_Releases | Phil Webb |  July 10, 2015 | 2 Comments_

Spring Boot v1.3.0.M2 is available now from the [Spring milestone repository](http://repo.springsource.org/milestone/). This release closes a whopping [73 issues](https://github.com/spring-projects/spring-boot/issues?q=milestone%3A1.3.0.M2+is%3Aissue+is%3Aclosed) and merges [59 pull-requests](https://github.com/spring-projects/spring-boot/pulls?q=milestone%3A1.3.0.M2+is%3Aclosed+is%3Apr)! Thanks to everyone that has contributed.

Highlights of the new release include:

-   Auto-configuration support for [jOOQ](http://jooq.org).
-   Hypermedia support for actuator endpoints.
-   Support for ANSI color `banner.txt` files.
-   An improved way to access `ApplicationArguments`.
-   New `/flyway`, `/liquibase` and `/logfile` actuator endpoints.
-   Auto-configuration support for [Spring Session](http://projects.spring.io/spring-session/) with Redis.
-   Property based configuration of Spring's ["resource chains"](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#mvc-config-static-resources).
-   New logback `<springProfile>` and `<springProperty>` tags.
-   Support for [Apache Artemis](http://activemq.apache.org/artemis/) (following the donation of HornetQ to Apache).
-   A new AntLib module to help create executable jars from Apache Ant.

For a complete list of changes, and upgrade instructions, see the [Spring Boot 1.3 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3-Release-Notes) on the WIKI and the updated [reference documentation](http://docs.spring.io/spring-boot/docs/1.3.0.M2/reference/htmlsingle/).

As always, early feedback and [bug reports](https://github.com/spring-projects/spring-boot/issues) are extremely valuable to us and very welcome.
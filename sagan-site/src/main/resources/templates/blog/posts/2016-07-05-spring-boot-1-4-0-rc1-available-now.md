---
title: Spring Boot 1.4.0.RC1 available now
source: https://spring.io/blog/2016/07/05/spring-boot-1-4-0-rc1-available-now
scraped: 2026-02-23T19:11:42.360Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  July 05, 2016 | 2 Comments
---

# Spring Boot 1.4.0.RC1 available now

_Releases | Stéphane Nicoll |  July 05, 2016 | 2 Comments_

It is my pleasure to announce that the release candidate of Spring Boot 1.4 is available now from the [Spring milestone repository](http://repo.spring.io/milestone/). This milestone concludes 6 months of work in the 1.4 line, closing over [140 issues and pull requests](https://github.com/spring-projects/spring-boot/issues?q=milestone%3A1.4.0.RC1+is%3Aclosed)! Thanks to everyone that has contributed.

Highlights of the new release include:

-   Unified `@EntityScan` for JPA, MongoDB, Neo4j, Couchbase and Cassandra
-   Auto-configured `RestTemplateBuilder`
-   Support for pure rest client tests via `@RestClientTest`
-   Support for Jest (Elasticsearch rest client)
-   Upgrades to Spring Integration 4.3, Spring AMQP 1.6, Spring REST Docs 1.1, MongoDB Java Driver 3 and more

For a complete list of changes, and upgrade instructions, see the [Spring Boot 1.4 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes) on the WIKI and the updated [reference documentation](http://docs.spring.io/spring-boot/docs/1.4.0.RC1/reference/htmlsingle/).

At this point, it is *very* important for us that you give `1.4.0.RC1` a try on your projects. Check [the QuickStart instruction](http://projects.spring.io/spring-boot/) to upgrade your project to `1.4.0.RC1` or generate an empty project on [https://start.spring.io](https://start.spring.io) for a concrete example.

In particular, we've decided to revert to Hibernate 5.0 and have already identified a few binary incompatible changes in 5.2. It would be extremely helpful for us to [get some feedback](https://github.com/spring-projects/spring-boot/issues), in particular if you are using `HibernateTemplate` in your project.

Our next stop is `1.4.0.RELEASE` scheduled alongside Spring Framework `4.3.2.RELEASE` at the end of the month. Stay tuned!
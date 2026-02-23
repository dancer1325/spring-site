---
title: Spring Boot 2.0.0 M1 Available Now
source: https://spring.io/blog/2017/05/16/spring-boot-2-0-0-m1-available-now
scraped: 2026-02-23T16:31:37.030Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  May 16, 2017 | 22 Comments
---

# Spring Boot 2.0.0 M1 Available Now

_Releases | Stéphane Nicoll |  May 16, 2017 | 22 Comments_

On behalf of the team and everyone that contributed, I am pleased to announce that the first milestone of Spring Boot 2 has been released and is available from [our milestone repository](http://repo.spring.io/milestone/). This release closes over [300 issues and pull requests](https://github.com/spring-projects/spring-boot/milestone/53?closed=1)!

This first milestone builds on and requires [Spring Framework 5.0.RC1](https://spring.io/blog/2017/05/08/spring-framework-5-0-goes-rc1). There are a number of nice refinements in Spring Framework 5 including extensive support for building reactive applications.

Highlights of this first milestone include:

-   A [complete rewrite of the Gradle plugin](https://spring.io/blog/2017/04/05/spring-boot-s-new-gradle-plugin) (including a [dedicated guide](http://docs.spring.io/spring-boot/docs/2.0.0.M1/gradle-plugin/reference/html/))
-   Support of reactive web applications development using WebFlux or WebFlux.fn: dedicated `spring-boot-starter-webflux` starter using Netty by default, support for `@WebFluxTest` for testing your reactive controller and reactive data support for MongoDB, Redis and Cassandra
-   Major dependencies upgrade across the portfolio: [Spring Data Kay M3](https://spring.io/blog/2017/05/09/spring-data-release-train-kay-m3-released), [Spring Security 5.0 M1](https://spring.io/blog/2017/05/11/spring-security-5-0-0-m1), Spring Integration 5.0 M4, [Spring AMQP 2.0 M4](https://spring.io/blog/2017/05/08/spring-amqp-2-0-0-milestone-4-is-available), [Spring Session 2.0 M1](https://spring.io/blog/2017/05/11/spring-session-2-0-0-m1-released) and [Spring Batch 4.0 M2](https://spring.io/blog/2017/05/15/spring-batch-4-0-0-m2-is-now-available)
-   Relaxed binding [has been improved](https://github.com/spring-projects/spring-boot/wiki/Relaxed-Binding-2.0)

For a complete list of changes, and upgrade instructions, see the [Spring Boot 2.0 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes) on the WIKI and the [updated reference documentation](http://docs.spring.io/spring-boot/docs/2.0.0.M1/reference/htmlsingle/).

If you want to get started and discover those new feature, you can easily bootstrap a new project on [https://start.spring.io](https://start.spring.io)

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.0.0.M1/reference/htmlsingle) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
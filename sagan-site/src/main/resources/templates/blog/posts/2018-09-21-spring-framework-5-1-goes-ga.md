---
title: Spring Framework 5.1 goes GA
source: https://spring.io/blog/2018/09/21/spring-framework-5-1-goes-ga
scraped: 2026-02-23T15:12:28.103Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 21, 2018 | 9 Comments
---

# Spring Framework 5.1 goes GA

_Releases | Juergen Hoeller |  September 21, 2018 | 9 Comments_

Dear Spring community,

It is my pleasure to announce that Spring Framework 5.1 is generally available from [repo.spring.io](https://repo.spring.io) as well as Maven Central now! Check out our recently updated docs...

-   [What's New](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-5.x) in Spring Framework 5.1
-   [Upgrading](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x) to Spring Framework 5.1
-   Our revised [reference documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/)

Spring Framework 5.1 requires JDK 8 or higher and specifically supports [JDK 11](http://openjdk.java.net/projects/jdk/11/) as the next long-term support release. It comes with initial refinements for [GraalVM](https://www.graalvm.org/) compatibility and deeply integrates with the recently released [Reactor Californium](https://projectreactor.io/docs) and [Hibernate ORM 5.3](http://hibernate.org/orm/releases/5.3/).

The core container introduces functional bean definition refinements for Java as well as Kotlin, including a functional bean retrieval style. Spring's internal use of reflection is optimized for improved startup time and less heap memory consumption now.

The web application stack provides a human-friendly debug log experience from the endpoints down to the core container. It features a DSL-style builder for functional web endpoints and extends the WebFlux HTTP/2 support offering to the Netty runtime.

As of next week's Spring Boot 2.1 M4 release, you'll be able to consume Spring Framework 5.1 GA through [start.spring.io](https://start.spring.io)! The upcoming Spring Boot 2.1 RC1 in mid October is expected to ship against Spring Framework 5.1.1 then, so keep the feedback coming...

Cheers, Juergen
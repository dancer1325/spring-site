---
title: Spring Framework 5.2 goes GA
source: https://spring.io/blog/2019/09/30/spring-framework-5-2-goes-ga
scraped: 2026-02-23T14:35:35.217Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 30, 2019 | 4 Comments
---

# Spring Framework 5.2 goes GA

_Releases | Juergen Hoeller |  September 30, 2019 | 4 Comments_

Dear Spring community,

On behalf of the Spring Framework team and many recent contributors, it is my pleasure to announce that Spring Framework 5.2 is generally available from [repo.spring.io](https://repo.spring.io) as well as Maven Central! Check out our updated docs...

-   [What's New](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-52) in Spring Framework 5.2
-   [Upgrading](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x#upgrading-to-version-52) to Spring Framework 5.2
-   Our revised [reference documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/) with side by side examples for Java as well Kotlin.

Spring Framework 5.2 requires JDK 8 or higher and specifically supports [JDK 11](http://openjdk.java.net/projects/jdk/11/) as the current long-term support branch as well as [JDK 13](http://openjdk.java.net/projects/jdk/13/) as the latest OpenJDK release. It comes with many performance improvements (affecting startup time as well as peak performance) and further steps taken towards [GraalVM native image support](https://github.com/spring-projects/spring-framework/wiki/GraalVM-native-image-support) (still experimental).

This release deeply integrates with Kotlin 1.3 and provides first-class support for [Kotlin coroutines](https://docs.spring.io/spring/docs/5.2.0.RELEASE/spring-framework-reference/languages.html#coroutines) on top of Spring WebFlux. Furthermore, it comes with reactive messaging integration for the [RSocket](http://rsocket.io/) protocol as well as reactive transaction management for [R2DBC](https://r2dbc.io/), MongoDB and Neo4j (with datastore integration provided by Spring Data's modules).

As of the upcoming Spring Boot 2.2 RC1 release, you'll be able to consume Spring Framework 5.2 GA through [start.spring.io](https://start.spring.io)! We hope you'll enjoy it :-)

Cheers, Juergen
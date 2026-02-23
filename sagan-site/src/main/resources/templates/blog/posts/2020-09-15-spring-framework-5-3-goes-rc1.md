---
title: Spring Framework 5.3 goes RC1
source: https://spring.io/blog/2020/09/15/spring-framework-5-3-goes-rc1
scraped: 2026-02-23T13:48:10.049Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 15, 2020 | 0 Comments
---

# Spring Framework 5.3 goes RC1

_Releases | Juergen Hoeller |  September 15, 2020 | 0 Comments_

Dear Spring community,

On behalf of the development team, it is my pleasure to announce that a feature-complete Spring Framework 5.3 release candidate is available from our [milestone repository](https://repo.spring.io/milestone/org/springframework/spring-framework-bom/5.3.0-RC1/) now! Check out the list of [new features](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-5.x#whats-new-in-version-53) and [upgrade notes](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x#upgrading-to-version-53) on our GitHub wiki, including several deprecation notes.

As the last feature branch of the 5.x generation, we are preparing the 5.3.x line for general availability in late October - with an extended maintenance phase up until 2024. While we strongly encourage appropriate migration steps, all of our deprecated packages are going to remain in place for the entire 5.3.x phase. In terms of Java platform support, the current range is JDK 8-15 but we expect this to grow into JDK 8-17 for our Spring Framework 5.3.x releases next year.

Spring supports Java 14/15 records and similar record-style classes now, as a refined variant of constructor-based binding. Spring's core container includes refinements for [native application deployment](https://github.com/spring-projects-experimental/spring-graalvm-native) and performance optimizations in terms of data structures and concurrent access.

This release brings a new `spring-r2dbc` module with core [R2DBC](https://r2dbc.io/) support, including a reactive `R2dbcTransactionManager` as well as a reactive `DatabaseClient`. Its sister module `spring-jdbc` features a new `JdbcTransactionManager` (with extended data access exception translation), as well as a `DataClassRowMapper` with constructor-based result binding support (covering Java records) and new `queryForStream` methods (for lazy result iteration) on our good old `JdbcTemplate`.

In the web framework, we provide a JSON option with [Kotlin multiplatform serialization](https://github.com/Kotlin/kotlinx.serialization) now. `WebTestClient` allows for performing requests against MockMvc, as a single test client API for mock versus live tests. WebFlux comes with a fully reactive message reader for multipart requests.

Please give Spring Framework 5.3 RC1 a try, e.g. as part of the upcoming Spring Boot 2.4 M3 release which will be available on [start.spring.io](https://start.spring.io/) soon, and let us know about any regressions etc.

Cheers, Juergen
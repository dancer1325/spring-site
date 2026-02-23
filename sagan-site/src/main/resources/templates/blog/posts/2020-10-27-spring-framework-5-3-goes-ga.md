---
title: Spring Framework 5.3 goes GA
source: https://spring.io/blog/2020/10/27/spring-framework-5-3-goes-ga
scraped: 2026-02-23T13:42:37.709Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  October 27, 2020 | 15 Comments
---

# Spring Framework 5.3 goes GA

_Releases | Juergen Hoeller |  October 27, 2020 | 15 Comments_

Dear Spring community,

On behalf of the Spring Framework team and our contributors, it is my pleasure to announce that Spring Framework 5.3 is generally available from [repo.spring.io](https://repo.spring.io) as well as Maven Central!

-   [What's New](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-53) in Spring Framework 5.3
-   [Upgrading](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x#upgrading-to-version-53) to Spring Framework 5.3

Spring Framework 5.3 requires JDK 8 or higher and specifically embraces [JDK 15](http://openjdk.java.net/projects/jdk/15/) as the latest OpenJDK release, e.g. with binding support for record classes. As the last feature branch of the 5.x generation, the 5.3.x line is set up for an extended support phase, including JDK 17 LTS next year.

The immediate Spring Boot 2.4 and next year's Spring Boot 2.5 release will be based on this framework generation, as well as the incubating support for [Spring native executables on GraalVM](https://github.com/spring-projects-experimental/spring-graalvm-native).

This release includes core [R2DBC](https://r2dbc.io/) support in the spring-r2dbc module, serving as the foundation for Spring Data R2DBC, and introduces query result streaming for JdbcTemplate. It also comes with [Kotlin multiplatform serialization](https://github.com/Kotlin/kotlinx.serialization) support for web and messaging endpoints with JSON payloads, and with [RSocket 1.1](https://github.com/rsocket/rsocket-java#rsocket) support taking advantage of the new RSocketClient and exposing load-balancing.

Spring MVC users can get better performance with PathPattern parsing (see Rossen's [blog post](https://spring.io/blog/2020/06/30/url-matching-with-pathpattern-in-spring-mvc)). For test scenarios, we provide a unified API for MockMvc as well as full HTTP tests, and MockMvc comes with a revised Kotlin DSL. On the WebFlux side, a fully reactive message reader for multipart requests is included now, as well as a WebClient connector for [Apache Http Components 5](https://hc.apache.org/httpcomponents-client-5.0.x/).

Spring Framework 5.3 is a recommended upgrade for all 5.x and 4.x users. It establishes a stable and future-proof production branch with extended maintenance until 2024, serving as the successor of the equally long-lived 4.3.x line which will reach its end of maintenance soon (December 2020).

Cheers, Juergen
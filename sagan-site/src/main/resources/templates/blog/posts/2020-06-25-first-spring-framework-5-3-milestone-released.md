---
title: First Spring Framework 5.3 milestone released
source: https://spring.io/blog/2020/06/25/first-spring-framework-5-3-milestone-released
scraped: 2026-02-23T13:55:58.993Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  June 25, 2020 | 0 Comments
---

# First Spring Framework 5.3 milestone released

_Releases | Juergen Hoeller |  June 25, 2020 | 0 Comments_

Dear Spring community,

On behalf of the team and everyone who contributed, it is my pleasure to announce that [Spring Framework 5.3 M1](https://github.com/spring-projects/spring-framework/milestone/222) is available from [our milestone repository](https://repo.spring.io/milestone/) now! Find an initial list of [new features and refinements](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-5.x#whats-new-in-version-53) and corresponding [upgrade notes including several deprecations](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x#upgrading-to-version-53) on our wiki.

Please note that 5.3 is designed as the final 5.x feature release, wrapping up the major themes in the Spring Framework 5 generation, in particular reactive programming and Kotlin support, while also taking GraalVM compatibility to the next level. Last but not least, we are not only preparing for JDK 15 and 16 but also for next year's JDK 17 LTS already, expecting an extended 5.3.x maintenance life.

As a new module in 5.3, `spring-r2dbc` introduces core [R2DBC](https://r2dbc.io/) support within the Spring Framework umbrella, analogous to the existing `spring-jdbc` module. While several R2DBC support features are still candidates for some minor refactoring, 5.3 M1 includes a pretty comprehensive arrangement there already, including a reactive `DatabaseClient` API (analogous to `WebClient`).

At the same time, we are revisiting our JDBC support: e.g. introducing `queryForStream` operations on `JdbcTemplate` and providing a `JdbcTransactionManager` with commit exception translation.

This milestone also [improves GraalVM native support](https://github.com/spring-projects/spring-framework/issues/22968#issuecomment-638136709), e.g. making default `DispatcherServlet` configuration fully discoverable and allowing for the removal of unsupported features from native images (e.g. through properties such as `spring.spel.ignore` and `spring.xml.ignore`). The [`spring-graalvm-native`](https://github.com/spring-projects-experimental/spring-graalvm-native) project is tracking Spring Framework 5.3 milestones from now on.

Revisiting Spring's web support, Spring MVC comes with `PathPattern` parsing for efficient URL matching now, and WebFlux comes with a completely new and fully reactive multipart parser implementation, plus many further refinements in 5.3 M1 already.

A [second milestone](https://github.com/spring-projects/spring-framework/milestone/237) is planned for early August, introducing data binding for Java record classes as well as Kotlin 1.4 and [`kotlinx.serialization`](https://github.com/Kotlin/kotlinx.serialization) support for JSON on Spring MVC. A first release candidate is planned for mid September, with general availability expected in late October.

Cheers, Juergen
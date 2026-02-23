---
title: Spring Data R2DBC goes GA
source: https://spring.io/blog/2019/12/06/spring-data-r2dbc-goes-ga
scraped: 2026-02-23T14:19:54.075Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  December 06, 2019 | 3 Comments
---

# Spring Data R2DBC goes GA

_Releases | Mark Paluch |  December 06, 2019 | 3 Comments_

On behalf of the team and everyone that contributed, I am delighted to announce that Spring Data R2DBC 1.0 is generally available from [repo.spring.io](https://repo.spring.io/) as well as Maven Central!

Spring Data R2DBC 1.0 is a non-blocking database client library for the [just released R2DBC specification](https://r2dbc.io/2019/12/02/r2dbc-0-8-0-goes-ga) that lets you build reactive applications that use SQL databases. The most notable features of Spring Data R2DBC are:

-   Functional-reactive declaration of data access
-   Fluent API
-   Support for Transactions
-   Named parameter support (Dialect-aware)
-   Repositories
-   Kotlin Coroutines extensions

Spring Data R2DBC 1.0 requires JDK 8 or higher and [any R2DBC driver](https://r2dbc.io/drivers/). Head over to [start.spring.io](https://start.spring.io) and add R2DBC to configure your dependencies or, if you're already using the Spring Boot R2DBC starter, upgrade your `spring-boot-bom-r2dbc` to `0.1.0.M3`.

Check out our byte-sized Getting Started Guide that explains [how to access data with R2DBC](https://spring.io/guides/gs/accessing-data-r2dbc/).

To round things off, here are links to the changelog, GitHub repository, and docs:

-   Project Repository: [github.com/spring-projects/spring-data-r2dbc](https://github.com/spring-projects/spring-data-r2dbc)
-   Issue Tracker: [github.com/spring-projects/spring-data-r2dbc/issues](https://github.com/spring-projects/spring-data-r2dbc/issues)
-   [Artifacts](https://repo1.maven.org/maven2/org/springframework/data/spring-data-r2dbc/1.0.0.RELEASE/) - [Javadoc](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.RELEASE/api) - [Documentation](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.RELEASE/reference/html/) - [Changelog](https://docs.spring.io/spring-data/r2dbc/docs/1.0.0.RELEASE/changelog.txt)
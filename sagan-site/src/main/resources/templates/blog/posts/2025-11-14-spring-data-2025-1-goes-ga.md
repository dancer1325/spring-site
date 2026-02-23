---
title: Spring Data 2025.1.0 goes GA
source: https://spring.io/blog/2025/11/14/spring-data-2025-1-goes-ga
scraped: 2026-02-22T22:08:50.430Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  November 14, 2025 | 0 Comments
---

# Spring Data 2025.1.0 goes GA

_Releases | Mark Paluch |  November 14, 2025 | 0 Comments_

Dear Spring Data community,

On behalf of the data team, it is my pleasure to announce that Spring Data 2025.1 is generally available from Maven Central now! The 4.0 generation comes with several key themes:

-   **Upgrade to Spring Framework 7**
-   **Upgrade to Jakarta EE 11 (JPA 3.2, Servlet 6.1)**
-   **[Ahead-of-Time Repositories](https://docs.spring.io/spring-data/jpa/reference/jpa/aot.html#aot.repositories)**
-   **[Comprehensive null safety through JSpecify](https://jspecify.dev/)**
-   **Add support for Jackson 3**
-   **[Vector Search Methods](https://docs.spring.io/spring-data/jpa/reference/repositories/vector-search.html)**

Ahead-of-Time Repositories bring the benefits of [AOT compilation](https://docs.spring.io/spring-framework/reference/core/aot.html) to Spring Data repositories, enabling faster startup times and reduced memory consumption for applications using Spring Data JPA, MongoDB, JDBC, and Cassandra. AOT Repositories provide additional documentation metadata as JSON file for each AOT repository. Ahead-of-Time Repositories are generated during the AOT build phase and utilized when your application is started in AOT mode (on the JVM or as GraalVM Native image).

All Spring Data projects now use [JSpecify](https://jspecify.dev/) annotations to express parameter and return-value nullability. JSpecify allows for better static analysis and improved code quality when using Spring Data in conjunction with tools that support JSpecify stopping the sprawl of dormant and every-project-has-one nullability annotations.

[Jackson 3](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md) is the next major version of the popular JSON processing library. Spring Data provides first-class Jackson 3 experience while retaining broad Jackson 2 compatibility. Jackson 3 uses different artifact coordinates and packages, however, Jackson 2 and Jackson 3 share a common annotations library to ease transition. Most Spring Data modules have deprecated their Jackson 2 support and ship with Jackson 3-variants. The only exception is Spring Data REST that is essentially a large wrapper around Jackson. Therefore, Spring Data REST cannot provide dual-version Jackson support requiring Jackson 3.

Vector Search Methods enable Vector Search through Spring Data Repositories in JPA (through `hibernate-vector`), Apache Cassandra, MongoDB, and Neo4j. Using Vector Search from Spring Data bridges the gap between pure content-oriented vector indexes towards an entity-centric design that allows for usage of existing data models in the context of AI.

Check out our [Release Notes wiki page](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2025.1-Release-Notes) for details about specific features in Spring Data 4.0.

Cheers, Mark
---
title: Spring Modulith 1.3 GA released
source: http://spring.io/blog/2024/11/22/spring-modulith-1-3-ga-released
scraped: 2026-02-23T08:04:41.864Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 22, 2024 | 0 Comments
---

# Spring Modulith 1.3 GA released

_Releases | Oliver Drotbohm |  November 22, 2024 | 0 Comments_

On behalf of the community, I am delighted to announce the avability of Spring Modulith [1.3 GA](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.0). After 6 months of development, the release ships with the following highlights:

-   Upgrades to Spring Boot 3.4 and Spring Framework 6.2.
-   Support for nested application modules and external application module contributions.
-   Optimized integration test execution via a JUnit Jupiter extension.
-   New deleting and archiving event publication completion modes.
-   By-ID event publication completion significantly improving performance.
-   Support for MariaDB, Oracle DB and Microsoft SQL Server in the JDBC-based Event Publication Registry.
-   Event externalization into Spring's `MessageChannel` abstraction to, for example trigger Spring Integration flows.
-   Automatic Javadoc extraction for inclusion in the generated Application Module Canvases.
-   An aggregating document for all documentation generated.

For a more detailed overview about the release checkout the [What's new in Spring Modulith 1.3?](https://spring.io/blog/2024/11/22/whats-new-in-spring-modulith-1-3) blog post we have just published.

On top of the GA release we also shipped [1.2.6](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.6) and [1.1.11](https://github.com/spring-projects/spring-modulith/releases/tag/1.1.11), containing primarily dependency upgrades and bug fixes.
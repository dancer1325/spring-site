---
title: Spring Modulith 2.0 GA, 1.4.5, and 1.3.11 released
source: https://spring.io/blog/2025/11/21/spring-modulith-2-0-ga-1-4-5-and-1-3-11-released
scraped: 2026-02-22T22:09:09.787Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 21, 2025 | 0 Comments
---

# Spring Modulith 2.0 GA, 1.4.5, and 1.3.11 released

_Releases | Oliver Drotbohm |  November 21, 2025 | 0 Comments_

On behalf of the communit I am happy to announce the availablity of Spring Modulith 2.0. The release is an important milestone incorporating all learnings we've made in Spring Modulith's first generation. We ship the following major features:

-   Overhaul event publication lifecycle [#796](https://github.com/spring-projects/spring-modulith/issues/796) (Neo4j [#1337](https://github.com/spring-projects/spring-modulith/issues/1337), MongoDB [#1336](https://github.com/spring-projects/spring-modulith/issues/1336), JDBC [#1321](https://github.com/spring-projects/spring-modulith/issues/1321), JPA [#1375](https://github.com/spring-projects/spring-modulith/issues/1375), [#1389](https://github.com/spring-projects/spring-modulith/issues/1389))
-   Support for application-module-specific Flyway migrations [#1067](https://github.com/spring-projects/spring-modulith/issues/1067), [#1440](https://github.com/spring-projects/spring-modulith/issues/1440)
-   Allow serialized execution of event externalization [#1370](https://github.com/spring-projects/spring-modulith/issues/1370)
-   Support for Jackson 3 in event serialization [#1364](https://github.com/spring-projects/spring-modulith/issues/1364), [#1369](https://github.com/spring-projects/spring-modulith/issues/1369)
-   Support to verify application module structure on startup [#1287](https://github.com/spring-projects/spring-modulith/issues/1287)
-   Migrate nullness verification to jSpecify [#1192](https://github.com/spring-projects/spring-modulith/issues/1192)
-   Propagate named interface assignments of types to return and parameter types of methods declared [#1264](https://github.com/spring-projects/spring-modulith/issues/1264)
-   Extract module description from a module's `package-info.java` Javadoc [#1430](https://github.com/spring-projects/spring-modulith/issues/1430)
-   Remove deprecated `@ApplicationEventListener` annotation [#1397](https://github.com/spring-projects/spring-modulith/issues/1397)

We have also upgraded our baselines to Spring Boot 4 and Framework 7. Watch this space for a more detailed blog post about the individual features coming soon. Find more details about the releases in the full [changelog](https://github.com/spring-projects/spring-modulith/releases/tag/2.0.0). We've also shipped bugfix releases for the [1.4](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.5) and [1.3](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.11) generations.
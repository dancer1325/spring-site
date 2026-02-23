---
title: Spring Modulith 0.5 released
source: https://spring.io/blog/2023/03/08/spring-modulith-0-5-released
scraped: 2026-02-23T10:04:11.736Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 08, 2023 | 0 Comments
---

# Spring Modulith 0.5 released

_Releases | Oliver Drotbohm |  March 08, 2023 | 0 Comments_

I am excited to announce the availability of Spring Modulith 0.5. The most relevant features the release ships are:

-   [#152](https://github.com/spring-projects-experimental/spring-modulith/issues/152) – A dedicated starter to ease inclusion of actuator and observability features
-   [#163](https://github.com/spring-projects-experimental/spring-modulith/issues/163) – The renamed property to trigger JDBC database initialization. (`spring.modulith.events.schema-initialization.enabled` -> `spring.modulith.events.jdbc-schema-initialization.enabled`)
-   [#149](https://github.com/spring-projects-experimental/spring-modulith/issues/149) – Default to await termination of task executors unless configured not to
-   [#150](https://github.com/spring-projects-experimental/spring-modulith/issues/150) – `Scenario` should run stimulus in new transaction
-   [#162](https://github.com/spring-projects-experimental/spring-modulith/issues/162), [#154](https://github.com/spring-projects-experimental/spring-modulith/issues/154) – The usual dependency upgrades (Spring Boot 3.0.4, jMolecules 2022.2.4)

For more information, please consult the complete [changelog](https://github.com/spring-projects-experimental/spring-modulith/releases/tag/0.5.0) or the [reference documentation](https://docs.spring.io/spring-modulith/docs/0.5.0/reference/html/). Please provide feedback in the [bug tracker](https://github.com/spring-projects-experimental/spring-modulith/issues) or [discussion forums](https://github.com/spring-projects-experimental/spring-modulith/discussions).
---
title: Spring Modulith 0.2 released
source: https://spring.io/blog/2022/12/23/spring-modulith-0-2-released
scraped: 2026-02-23T10:19:44.825Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  December 23, 2022 | 2 Comments
---

# Spring Modulith 0.2 released

_Releases | Oliver Drotbohm |  December 23, 2022 | 2 Comments_

I am pleased to announce the availability of Spring Modulith 0.2. The release adds the following features:

-   We introduced `@ApplicationModuleListener` to ease the declaration of asynchronous, transactional event listeners that run in a transaction themselves. A model that we recommend as default to integration application modules. ([#80](https://github.com/spring-projects-experimental/spring-modulith/issues/80), [reference documentation](https://docs.spring.io/spring-modulith/docs/0.2.0/reference/html/#events.amil))
-   The application module dependency structure is now also exposed as Spring Boot actuator. This allows operating infrastructure to visualize insights it provides to operations teams to be aligned with the application module structure (HTTP traces by module etc.) ([#87](https://github.com/spring-projects-experimental/spring-modulith/issues/87), [reference documentation](https://docs.spring.io/spring-modulith/docs/0.2.0/reference/html/#observability)
-   The Postgres event publication registry schema now follows Postgres best practices. ([#81](https://github.com/spring-projects-experimental/spring-modulith/issues/81))

The release also contains the obligatory upgrade to Spring Boot 3.0.1. Find more information on the [release page](https://github.com/spring-projects-experimental/spring-modulith/releases/tag/0.2.0).
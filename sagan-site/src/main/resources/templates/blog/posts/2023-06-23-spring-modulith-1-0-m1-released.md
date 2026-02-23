---
title: Spring Modulith 1.0 M1 released
source: https://spring.io/blog/2023/06/23/spring-modulith-1-0-m1-released
scraped: 2026-02-23T09:38:43.669Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  June 23, 2023 | 0 Comments
---

# Spring Modulith 1.0 M1 released

_Releases | Oliver Drotbohm |  June 23, 2023 | 0 Comments_

I am happy to announce the release of Spring Modulith 1.0 M1. This is an important milestone for the project and the first step on the road to promote it from an experimental to an official Spring project. This means that we ship a couple of breaking changes

-   The group identifier is now `org.springframework.modulith` (previously `org.springframework.experimental`).
-   The Spring Boot baseline of the project is 3.1 (previously 3.0).
-   The name of the actuator endpoint exposing the application module structure is now `application-modules` (previously `applicationmodules`).
-   The previously deprecated configuration properties in the JDBC-based event registry have been removed.

Also, note that milestone releases need to be obtained from our Artifactory repository under [https://repo.spring.io/milestone](https://repo.spring.io/milestone). The release also includes a couple of bug fixes and new features over 0.6, which can be found in the official [change log](https://github.com/spring-projects/spring-modulith/releases/tag/1.0.0-M1). A comprehensive overview about the project can be found in the [reference documentation](https://docs.spring.io/spring-modulith/docs/1.0.0-M1/reference/html/).
---
title: Spring Modulith 0.6 released
source: https://spring.io/blog/2023/05/02/spring-modulith-0-6-released
scraped: 2026-02-23T09:52:17.464Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  May 02, 2023 | 0 Comments
---

# Spring Modulith 0.6 released

_Releases | Oliver Drotbohm |  May 02, 2023 | 0 Comments_

I am excited to announce the 0.6 release of Spring Modulith. We have packaged a number of great new features, most notably:

-   [GH-175](https://github.com/spring-projects-experimental/spring-modulith/issues/175) – Auto-configuration for MongoDB transactions if you use the event publication registry
-   [GH-184](https://github.com/spring-projects-experimental/spring-modulith/issues/184) – The event publication registry now enables asynchronous processing and shutdown behavior.
-   [GH-190](https://github.com/spring-projects-experimental/spring-modulith/issues/190) – `@EnableScenario` for using the `Scenario` testing API with `@SpringBootTest` integration tests.
-   [GH-192](https://github.com/spring-projects-experimental/spring-modulith/issues/192) – Support for jMolecules architecture stereotypes in the Application Module Canvas.

Find the complete [changelog](https://github.com/spring-projects-experimental/spring-modulith/releases/tag/0.6.0) here, as well as the [reference documentation](https://docs.spring.io/spring-modulith/docs/0.6.0/reference/html/) and [Javadoc](https://docs.spring.io/spring-modulith/docs/0.6.0/api/).

In other news, we have decided to promote the Spring Modulith project into a top-level, non-experimental Spring project. We are going to move to the `org.springframework.modulith` group identifier and release a 1.0 M1 (likely identical to the current 0.6) release right after Spring Boot 3.1 GA.
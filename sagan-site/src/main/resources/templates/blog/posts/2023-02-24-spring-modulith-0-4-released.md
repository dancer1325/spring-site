---
title: Spring Modulith 0.4 released
source: https://spring.io/blog/2023/02/24/spring-modulith-0-4-released
scraped: 2026-02-23T10:08:38.431Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 24, 2023 | 0 Comments
---

# Spring Modulith 0.4 released

_Releases | Oliver Drotbohm |  February 24, 2023 | 0 Comments_

Dear Spring community, I am excited to announce the release of Spring Modulith 0.4. The release ships with the following new features:

-   A new [`Scenario` API](https://docs.spring.io/spring-modulith/docs/0.4.0/reference/html/#testing.scenarios) to allow the concise definition of integration tests for application modules, specifically tailored around the idea of them integrating via asynchronously handled, transaction bound events.
-   A new [starter](https://docs.spring.io/spring-modulith/docs/0.5.0-SNAPSHOT/reference/html/#appendix.artifacts) that allows to pull in the runtime support in a concise way, primarily to ease the usage of `ApplicationModuleInitializers` ([GH-132](https://github.com/spring-projects-experimental/spring-modulith/issues/132)).
-   The event publication registry now returns uncompleted events in ascending order of their publication dates ([GH-133](https://github.com/spring-projects-experimental/spring-modulith/issues/133)) and provides better logging ([GH-125](https://github.com/spring-projects-experimental/spring-modulith/issues/125)).
-   A few tiny optimizations in our documentation generation support, especially if the UML style is for component diagrams ([GH-130](https://github.com/spring-projects-experimental/spring-modulith/issues/130), [GH-140](https://github.com/spring-projects-experimental/spring-modulith/issues/140), [GH-141](https://github.com/spring-projects-experimental/spring-modulith/issues/141)).
-   Infrastructure upgrades to the latest versions of Spring Boot, ArchUnit and Structurizr.

Find a complete change log in the [GitHub release page](https://github.com/spring-projects-experimental/spring-modulith/releases/tag/0.4.0). We are looking forward to your feedback in the [GitHub discussions](https://github.com/spring-projects-experimental/spring-modulith/discussions).
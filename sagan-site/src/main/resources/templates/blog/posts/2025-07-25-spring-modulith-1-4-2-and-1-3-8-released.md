---
title: Spring Modulith 1.4.2 and 1.3.8 released
source: https://spring.io/blog/2025/07/25/spring-modulith-1-4-2-and-1-3-8-released
scraped: 2026-02-23T07:34:38.865Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  July 25, 2025 | 0 Comments
---

# Spring Modulith 1.4.2 and 1.3.8 released

_Releases | Oliver Drotbohm |  July 25, 2025 | 0 Comments_

I am pleased to announce the availability of Spring Modulith 1.4.2 and 1.3.8. The releases contain the usual dependency upgrades to the latest Spring Boot and Framework versions.

1.4.2 ships with [more detailed application module metadata](https://github.com/spring-projects/spring-modulith/issues/1277) generated into `application-modules.json` (either with our AOT support enabled during the build or via the documentation generated through the `Documenter` API). This has enabled our friends at [Sonargraph](https://www.hello2morrow.com/products/sonargraph), a tool to logically define application architectures and perform advanced exploration and verification, to build integration for Spring Modulith applications. As described in their announcing [blog post](https://blog.hello2morrow.com/2025/07/spring-modulith-sonargraph-better-together/), they now support creating an architecture definition by picking up the structure defined in you application when importing a Spring Modulith project.

Find more details about the releases in the full changelogs for [1.3.8](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.8) and [1.4.2](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.2).
---
title: Spring AMQP 3.1.1 Available
source: https://spring.io/blog/2023/12/19/spring-amqp-3-1-1-available
scraped: 2026-02-23T09:02:46.522Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  December 19, 2023 | 0 Comments
---

# Spring AMQP 3.1.1 Available

_Releases | Artem Bilan |  December 19, 2023 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce that Spring AMQP `3.1.1` is generally available now from Maven Central.

This release will be included in the upcoming Spring Boot `3.2.1` release.

This patch release contains a few minor features, enhancements and bug fixes. Please see the [release notes](https://github.com/spring-projects/spring-amqp/releases/tag/v3.1.1) for more details.

Most notable changes are:

-   The documentation has been migrated to Spring Antora [site](https://docs.spring.io/spring-amqp/reference/index.html);
-   All the `synchronized` blocks in the code have been replaced with `Lock` (and `Conditional`) instances to satisfy virtual threads requirements;
-   The `JacksonUtils.enhancedObjectMapper()` has been introduced to register well-known Jackson modules into an `ObjectMapper` used in the framework;
-   The CI/CD has been migrated to GitHub Actions.

This is also the first release we are doing without Gary Russell who left us for his next adventure - retirement. Gary's penchant for software design is exemplary and his wisdom and insights are reflected throughout this project. We want to thank him for all his meticulous efforts for Spring AMQP and we wish him well.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-amqp/) | [GitHub Issues](https://github.com/spring-projects/spring-amqp/issues) | [Contributing](https://github.com/spring-projects/spring-amqp/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)
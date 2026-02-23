---
title: Spring Boot 3.1.0 available now
source: https://spring.io/blog/2023/05/18/spring-boot-3-1-0-available-now
scraped: 2026-02-23T09:49:36.256Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Scott Frederick |  May 18, 2023 | 20 Comments
---

# Spring Boot 3.1.0 available now

_Releases | Scott Frederick |  May 18, 2023 | 20 Comments_

On behalf of the Spring Boot team and everyone that has contributed, I am pleased to announce that Spring Boot 3.1.0 has been released and is available from Maven Central.

This release adds a significant number of new features and improvements. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes#upgrading-from-spring-boot-30) and [new and noteworthy](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes).

## [](#whats-new-in-31)What's new in 3.1

The highlights of the 3.1 release include:

-   Support for managing external services at development time using Testcontainers and Docker Compose
-   Simplified configuration of Testcontainers in integration tests
-   Centralized and expanded configuration of SSL trust material for connections
-   Auto-configuration for Spring Authorization Server

### [](#dependency-upgrades)Dependency upgrades

Spring Boot 3.1 moves to new versions of several Spring projects:

-   [Spring Data 2023.0](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2023.0-%28Ullman%29-Release-Notes)
-   [Spring GraphQL 1.2](https://github.com/spring-projects/spring-graphql/releases/tag/v1.2.0)
-   [Spring Integration 6.1](https://github.com/spring-projects/spring-integration/releases/tag/v6.1.0)
-   [Spring Security 6.1](https://github.com/spring-projects/spring-security/releases/tag/6.1.0)
-   [Spring Session 3.1](https://github.com/spring-projects/spring-session/releases/tag/3.1.0)

We’ve also upgraded to the latest stable releases of other third-party libraries wherever possible. Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes#dependency-upgrades) for details.

### [](#other-changes)Other changes

There are many other changes and improvements that are documented in the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

## [](#thank-you)Thank you

We want to take this opportunity to again thank all our users and contributors.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community [on Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/3.1.0/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
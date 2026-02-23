---
title: Spring Boot 3.3.0 available now
source: https://spring.io/blog/2024/05/23/spring-boot-3-3-0-available-now
scraped: 2026-02-23T08:37:31.181Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Moritz Halbritter |  May 23, 2024 | 1 Comment
---

# Spring Boot 3.3.0 available now

_Releases | Moritz Halbritter |  May 23, 2024 | 1 Comment_

On behalf of the Spring Boot team and everyone that has contributed, I am pleased to announce that Spring Boot 3.3.0 has been released and is available from Maven Central.

This release adds a significant number of new features and improvements. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.3-Release-Notes#upgrading-from-spring-boot-32) and [new and noteworthy](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.3-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.3-Release-Notes).

## [](#whats-new-in-33)What's new in 3.3

The highlights of the 3.3 release include:

-   CDS Support for improved startup times and reduced memory consumption
-   Observability improvements, for example support for Micrometer's `@SpanTag`, a process `InfoContributor` and Prometheus 1.x support
-   Spring Security improvements, for example an auto-configuration for `JwtAuthenticationConverter`
-   Service connection support for Apache ActiveMQ Artemis and LDAP
-   Docker Compose support for [Bitnami Container Images](https://github.com/bitnami/containers)
-   Virtual thread support for websockets
-   Support for Base64 resources in property (and YAML) files
-   Support for SBOMs with the new SBOM actuator endpoint
-   A [completely revamped documentation](https://docs.spring.io/spring-boot/3.3/) based on Antora
-   SSL SNI support for embedded web servers

### [](#dependency-upgrades)Dependency upgrades

Spring Boot 3.3 moves to new versions of several Spring projects and we’ve also upgraded to the latest stable releases of other third-party libraries wherever possible. Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.3-Release-Notes#dependency-upgrades) for details.

### [](#other-changes)Other changes

There are many other changes and improvements that are documented in the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.3-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the future.

## [](#thank-you)Thank you

We want to take this opportunity to again thank all our users and contributors.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community [on Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](https://docs.spring.io/spring-boot/3.3/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
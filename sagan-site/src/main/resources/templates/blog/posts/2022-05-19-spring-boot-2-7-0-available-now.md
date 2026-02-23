---
title: Spring Boot 2.7.0 available now
source: https://spring.io/blog/2022/05/19/spring-boot-2-7-0-available-now
scraped: 2026-02-23T12:41:06.809Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  May 19, 2022 | 63 Comments
---

# Spring Boot 2.7.0 available now

_Releases | Andy Wilkinson |  May 19, 2022 | 63 Comments_

On behalf of the Spring Boot team and everyone that has contributed, I am pleased to announce that Spring Boot 2.7.0 has been released and is available from Maven Central.

This release adds a significant number of new features and improvements. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes#upgrading-from-spring-boot-26) and [new and noteworthy](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes).

## [](#whats-new-in-27)What's new in 2.7

The highlights of the 2.7 release include:

-   Auto-configuration and metrics for Spring for GraphQL; see related 1.0 [release announcement](https://spring.io/blog/2022/05/19/spring-for-graphql-1-0-release)
-   New `@DataCouchbaseTest` and `@DataElasticsearchTest` support
-   Podman can now be used when building images using Cloud Native Buildpacks
-   Support for Cache2k
-   Simplified registration of Jackson Mixins
-   Web server SSL configuration using PEM-encoded certs

### [](#dependency-upgrades)Dependency upgrades

Spring Boot 2.7 moves to new versions of several Spring projects:

-   [Spring Data 2021.2](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-2021.2-%28Raj%29-Release-Notes)
-   [Spring HATEOAS 1.5](https://github.com/spring-projects/spring-hateoas/releases/tag/1.5.0)
-   [Spring LDAP 2.4](https://github.com/spring-projects/spring-ldap/releases/tag/2.4.0)
-   [Spring Security 5.7](https://docs.spring.io/spring-security/reference/5.7/whats-new.html)
-   [Spring Session 2021.2](https://github.com/spring-projects/spring-session-bom/wiki/Spring-Session-2021.2-Release-Notes-%28preview%29)

We’ve also upgraded to the latest stable releases of other third-party libraries wherever possible. Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes#dependency-upgrades) for details.

### [](#other-changes)Other changes

There's a whole host of other changes and improvements that are documented in the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

Additionally, Spring Boot 2.5 has now reached the end of its OSS support period. More information on Spring Boot's support dates can be found [here.](https://spring.io/projects/spring-boot#support)

## [](#thank-you)Thank you

We want to take this opportunity to again thank all our users and contributors.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community [on Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.7.0/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
---
title: Spring Boot 2.6 is now available
source: https://spring.io/blog/2021/11/19/spring-boot-2-6-is-now-available
scraped: 2026-02-23T13:03:35.066Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Madhura Bhave |  November 19, 2021 | 7 Comments
---

# Spring Boot 2.6 is now available

_Releases | Madhura Bhave |  November 19, 2021 | 7 Comments_

On behalf of the Spring Boot team and everyone that has contributed, I am pleased to announce that Spring Boot 2.6.0 has been released and is available from Maven Central.

This release adds a significant number of new features and improvements. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes#upgrading-from-spring-boot-25) and [new and noteworthy](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes).

## [](#whats-new-in-26)What's new in 2.6

-   Support for `SameSite` attributes on session cookies for servlet applications
-   Support for configuring health groups on the main or management port
-   Enhanced `/info` endpoint with Java Runtime information
-   Support for testing Spring MVC using `WebTestClient`
-   Auto-configuration for `spring-rabbit-stream`
-   Support for pluggable rules for sanitizing properties in `/env` and `configprops`

### [](#dependency-upgrades)Dependency upgrades

Spring Boot 2.6 moves to new versions of several Spring projects:

-   [Spring Data 2021.1](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-2021.1-%28Q%29-Release-Notes)
-   [Spring HATEOAS 1.4](https://github.com/spring-projects/spring-hateoas/releases/tag/1.4.0)
-   [Spring AMQP 2.4](https://docs.spring.io/spring-amqp/docs/2.4.x/reference/html/#changes-in-2-4-since-2-3)
-   [Spring Kafka 2.8](https://docs.spring.io/spring-kafka/docs/2.8.x/reference/html/#spring-kafka-intro-new)
-   [Spring Security 5.6](https://docs.spring.io/spring-security/reference/5.6.0/whats-new.html)
-   [Spring Session 2021.1](https://github.com/spring-projects/spring-session-bom/wiki/Spring-Session-2021.1-Release-Notes)

We’ve also upgraded to the latest stable releases of other third-party libraries wherever possible. Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes#dependency-upgrades) for details.

### [](#other-changes)Other changes

There's a whole host of other changes and improvements that are documented in the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

Additionally, Spring Boot 2.4.0 has now reached end of OSS support. More information on Spring Boot's support dates can be found [here.](https://spring.io/projects/spring-boot#support)

## [](#thank-you)Thank you

We want to take this opportunity to again thank all our users and contributors.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community [on Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.6.0/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
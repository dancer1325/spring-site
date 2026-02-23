---
title: Spring Boot 2.2.1 available now
source: https://spring.io/blog/2019/11/07/spring-boot-2-2-1-available-now
scraped: 2026-02-23T14:26:54.348Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Madhura Bhave |  November 07, 2019 | 3 Comments
---

# Spring Boot 2.2.1 available now

_Releases | Madhura Bhave |  November 07, 2019 | 3 Comments_

On behalf of the team and everyone who has contributed, I'm happy to announce that Spring Boot 2.2.1 has been released and is now available from [repo.spring.io](https://repo.spring.io/release) and Maven Central.

This release includes [110 fixes, improvements, and dependency upgrades](https://github.com/spring-projects/spring-boot/releases/tag/v2.2.1.RELEASE). Thanks to all those who have contributed with issue reports and pull requests.

For those of you upgrading from Spring Boot 2.2.0 to Spring Boot 2.2.1, if you relied on the `@ConfigurationProperties` scanning support, please note that this feature is now disabled by default. Scanning of `@ConfigurationProperties` needs to be explicitly opted into by adding the `@ConfigurationPropertiesScan` annotation. More details related to this change can be found [here](https://github.com/spring-projects/spring-boot/issues/18674).

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask on [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community on [Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.2.1.RELEASE/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
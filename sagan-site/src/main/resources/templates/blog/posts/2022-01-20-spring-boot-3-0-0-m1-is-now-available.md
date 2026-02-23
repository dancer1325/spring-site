---
title: Spring Boot 3.0.0-M1 is now available
source: https://spring.io/blog/2022/01/20/spring-boot-3-0-0-m1-is-now-available
scraped: 2026-02-23T12:55:11.510Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  January 20, 2022 | 22 Comments
---

# Spring Boot 3.0.0-M1 is now available

_Releases | Phil Webb |  January 20, 2022 | 22 Comments_

On behalf of the team and everyone who has contributed, I'm happy to announce that Spring Boot `3.0.0-M1` has been released and is now available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

This milestone starts our exciting journey to the next generation of the Spring Framework and raises our baseline from Java 8 to Java 17. We are planning to release a new milestone of Spring Boot 3.0 every two months. M2 should arrive on March 24 and we are planning on a GA release in late November.

If you are trying an existing application with Spring Boot 3.0 you'll need to be aware that we've migrated all Java EE APIs to their equivalent Jakarta EE variant. For most users, this means you'll need to replace any `javax` imports with `jakarta`. For example, `javax.servlet.Filter` would be replaced with `jakarta.servlet.Filter`.

We're still waiting for a few third-party libraries to release Jakarta EE compatible versions, so not all Spring Boot 2.x features are available with this first milestone. We plan to reintroduce features as and when libraries provide appropriate releases.

Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0.0-M1-Release-Notes) for more details and upgrade instructions.

If you're interested in trying this new release, you can easily generate a project from [start.spring.io](https://start.spring.io). Thanks to all those who have contributed with issue reports and pull requests.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-boot` tag](https://stackoverflow.com/tags/spring-boot) or chat with the community on [Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](https://docs.spring.io/spring-boot/docs/3.0.0-M1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)
---
title: Spring Initializr 0.8.0 available now
source: https://spring.io/blog/2019/10/14/spring-initializr-0-8-0-available-now
scraped: 2026-02-23T14:31:44.505Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  October 14, 2019 | 2 Comments
---

# Spring Initializr 0.8.0 available now

_Releases | Stéphane Nicoll |  October 14, 2019 | 2 Comments_

On behalf of the team and everyone who has contributed, I’m happy to announce that Spring Initializr 0.8.0 has been released and is now available from repo.spring.io. For the first time, the release is also available from Maven Central!

This release includes [90 fixes, improvements and dependency upgrades](https://github.com/spring-io/initializr/releases/tag/v0.8.0.RELEASE). Thanks to all those who have contributed with issue reports and pull requests.

Spring Initializr 0.8 brings [a complete rewrite of the project generation API](https://spring.io/blog/2019/02/20/what-s-new-with-spring-initializr) with dedicated abstractions for common assets of JVM-based projects:

-   Build systems with dedicated support for Apache Maven and Gradle (both Groovy and Kotlin DSLs).
-   Languages with basic model and writer support for Java, Kotlin, and Groovy.
-   High-level hook-point to tune the project structure with several convenient implementations.

This release moves all our opinions that are running on [start.spring.io](https://start.spring.io) to a dedicated optional module that you can build upon or ignore to use only your conventions. This should make the creation of a custom instance easier than ever!

[GitHub](https://github.com/spring-io/initializr) | [Issues](https://github.com/spring-io/initializr/issues) | [Documentation](https://docs.spring.io/initializr/docs/0.8.0.RELEASE/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-initializr) | [Gitter](https://gitter.im/spring-io/initializr)
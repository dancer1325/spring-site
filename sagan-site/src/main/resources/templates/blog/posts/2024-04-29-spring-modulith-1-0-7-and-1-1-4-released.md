---
title: Spring Modulith 1.0.7 and 1.1.4 released
source: https://spring.io/blog/2024/04/29/spring-modulith-1-0-7-and-1-1-4-released
scraped: 2026-02-23T08:44:29.061Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  April 29, 2024 | ...
---

# Spring Modulith 1.0.7 and 1.1.4 released

_Releases | Oliver Drotbohm |  April 29, 2024 | ..._

I am happy to announce the release of Spring Modulith 1.0.7 and 1.1.4. it primarily ships an upgrade to [ArchUnit 1.1.1](https://github.com/TNG/ArchUnit/releases/tag/v1.1.1) which in turn includes a fix to now support the new fat JAR format of Spring Boot. It had been improved in 3.2 but unfortunately broke ArchUnit's class scanning. Spring Modulith applications that were using the runtime, actuator and observability modules had been affected and should now properly work.

Find more information about the releases in the full change logs for [1.0.7](https://github.com/spring-projects/spring-modulith/releases/tag/1.0.7) and [1.1.4](https://github.com/spring-projects/spring-modulith/releases/tag/1.1.4).
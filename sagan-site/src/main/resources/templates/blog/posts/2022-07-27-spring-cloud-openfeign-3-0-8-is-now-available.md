---
title: Spring Cloud OpenFeign 3.0.8 is now available
source: https://spring.io/blog/2022/07/27/spring-cloud-openfeign-3-0-8-is-now-available
scraped: 2026-02-23T10:45:37.914Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  July 28, 2022 | 0 Comments
---

# Spring Cloud OpenFeign 3.0.8 is now available

_Releases | Olga Maciaszek-Sharma |  July 28, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce the [Spring Cloud OpenFeign 3.0.8](https://spring.io/projects/spring-cloud-openfeign) is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-openfeign/3.0.8/). This version is compatible with 2020.0.6 Spring Cloud release, but it's not included in the bom, so it has to be set up manually in project build files.

## [](#notable-changes-in-the-308-release)Notable Changes in the 3.0.8 Release

This is primarily a bugfix and documentation release, that backports fixes over from `3.1.x` releases. The most notable backport is the [Fix related to cascading Spring Data's Page deserialisation](https://github.com/spring-cloud/spring-cloud-openfeign/pull/653).
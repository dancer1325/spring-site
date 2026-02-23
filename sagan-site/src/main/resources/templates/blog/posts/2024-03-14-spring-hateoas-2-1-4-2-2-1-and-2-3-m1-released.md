---
title: Spring HATEOAS 2.1.4, 2.2.1 and 2.3 M1 released
source: https://spring.io/blog/2024/03/14/spring-hateoas-2-1-4-2-2-1-and-2-3-m1-released
scraped: 2026-02-23T08:52:05.800Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 14, 2024 | 0 Comments
---

# Spring HATEOAS 2.1.4, 2.2.1 and 2.3 M1 released

_Releases | Oliver Drotbohm |  March 14, 2024 | 0 Comments_

I am happy to announce the availability of Spring HATEOAS 2.1.4, 2.2.1 and 2.3 M1. The releases primarily contain bug fixes and dependency upgrades.

For the 2.1.4 and 2.2.1 service releases we have deviated from our usual dependency upgrade policy which only allows bug fix upgrades of dependencies in bug fix releases. These branches had referenced a version of the JSONPath library that has [a CVE](https://github.com/advisories/GHSA-pfh2-hfmq-phg5) attached to it which was only fixed in a new minor release. We exceptionally decided to upgrade to that fixed version.

For a full list of changes, refer to the individual change logs of [2.1.4](https://github.com/spring-projects/spring-hateoas/releases/tag/2.2.1), [2.2.1](https://github.com/spring-projects/spring-hateoas/releases/tag/2.2.1) and [2.3 M1](https://github.com/spring-projects/spring-hateoas/releases/tag/2.3.0-M1).
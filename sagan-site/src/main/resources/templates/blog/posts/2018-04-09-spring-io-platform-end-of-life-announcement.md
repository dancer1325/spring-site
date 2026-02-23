---
title: Spring IO Platform end-of-life announcement
source: https://spring.io/blog/2018/04/09/spring-io-platform-end-of-life-announcement
scraped: 2026-02-23T14:53:16.688Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Andy Wilkinson |  April 09, 2018 | 6 Comments
---

# Spring IO Platform end-of-life announcement

_News | Andy Wilkinson |  April 09, 2018 | 6 Comments_

Maintenance of the [Spring IO Platform](https://platform.spring.io/platform) will end twelve months from today, 9 April 2019, and the project will be moved to the attic. Maintenance releases of both the Brussels and Cairo lines will continue to be published up until that time.

When the Platform was first [introduced almost four years ago](https://spring.io/blog/2014/06/26/introducing-the-spring-io-platform) it provided dependency management for a number of projects that were not managed by Spring Boot. In recent releases that number has decreased and would have continued to do so in the future as the Spring portfolio continues to evolve.

The decreasing difference between Spring Boot's dependency management and the Platform's dependency management means that offering the Platform as a separate choice no longer makes sense. All users of the Platform are encouraged to start using Spring Boot's dependency management directly, either by using `spring-boot-starter-parent` as their Maven project's parent, or by importing the `spring-boot-dependencies` bom.

Thank you to everyone who has contributed to the Platform over the past four years.
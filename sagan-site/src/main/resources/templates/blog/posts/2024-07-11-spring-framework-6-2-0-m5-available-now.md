---
title: Spring Framework 6.2.0-M5 Available Now
source: https://spring.io/blog/2024/07/11/spring-framework-6-2-0-m5-available-now
scraped: 2026-02-23T08:27:15.608Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  July 11, 2024 | 1 Comment
---

# Spring Framework 6.2.0-M5 Available Now

_Releases | Stéphane Nicoll |  July 11, 2024 | 1 Comment_

We are happy to announce the availability of the fifth milestone of Spring Framework 6.2. We shipped quite a few features since our [last M4 release](https://spring.io/blog/2024/06/13/spring-framework-6-2-0-m4-available-now).

Spring Framework 6.2.0-M5 is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now, check out the [detailed changelog for this version](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-M5).

## [](#native-support)Native Support

We have [significantly improved](https://docs.spring.io/spring-framework/reference/6.2/core/aot.html#aot.hints.reflective) the developer experience of registering reflection hints. `@RegisterReflection` has been introduced to easily register hints against arbitrary data types, and `@ReflectionScan` lets you opt-in for scanning of any reflection hints on arbitrary classes, not only Spring beans.

## [](#web-and-messaging)Web and Messaging

In collaboration with the Jetty team, our Jetty integration is now [built directly](https://github.com/spring-projects/spring-framework/pull/32097) on the core Jetty API, bypassing any Servlet implementation.

We've also added early support for [rendering of multiples views](https://github.com/spring-projects/spring-framework/issues/33162/) (fragments) instead of a single model and view (e.g. full page). If you're using htmx or hotwire, please give it a try!

We've also [introduced `SmartHttpMessageConverter`](https://github.com/spring-projects/spring-framework/issues/33118) as a way to address some of the shortcomings of `GenericHttpMessageConverter`

## [](#testing)Testing

Our AssertJ integration for MockMvc continues to shape up. In this milestone, we've added [multipart](https://github.com/spring-projects/spring-framework/issues/33027) and [async](https://github.com/spring-projects/spring-framework/issues/33040) support, better [assertions for exceptions](https://github.com/spring-projects/spring-framework/issues/33060), [debugging](https://github.com/spring-projects/spring-framework/issues/33059), and [documentation](https://docs.spring.io/spring-framework/reference/6.2/testing/mockmvc/assertj.html)!

The factory method used by `@TestBean` can now specify methods in other classes using a [fully qualified form](https://docs.spring.io/spring-framework/reference/6.2/testing/annotations/integration-spring/annotation-testbean.html).

## [](#62-features-recap)6.2 features recap

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62) for details about the new features available at this point.
---
title: Spring Framework 6.2.0-M7 Available Now
source: https://spring.io/blog/2024/08/14/spring-framework-6-2-0-m7-available-now
scraped: 2026-02-23T08:18:22.531Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Simon Baslé |  August 14, 2024 | 0 Comments
---

# Spring Framework 6.2.0-M7 Available Now

_Releases | Simon Baslé |  August 14, 2024 | 0 Comments_

We are happy to announce the availability of the seventh milestone of Spring Framework 6.2. We shipped quite a few features since the [last M6 release](https://spring.io/blog/2024/07/18/spring-framework-6-2-0-m6-available-now).

Spring Framework 6.2.0-M7 is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now, check out the [detailed changelog for this version](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-M7).

## [](#core-and-native-support)Core and Native Support

This release contains various improvements in the core of the framework, including to the [cache abstraction's error handling](https://github.com/spring-projects/spring-framework/issues/21590). It adds a [flexible multi-unit format](https://github.com/spring-projects/spring-framework/issues/33262) to the previously introduced `Duration` parsing/printing support.

On the topic of Native Support, it is now possible to ignore bean registration during AOT processing thanks to a [newly introduced attribute](https://github.com/spring-projects/spring-framework/issues/33243). Beans registered with the [Kotlin DSL](https://github.com/spring-projects/spring-framework/issues/29555) are now supported for AOT/native, and this release also fix a couple of AOT-related bugs.

## [](#web-and-messaging)Web and Messaging

Now that Freemarker supports Jakarta, request parameters and taglibs support [has been restored](https://github.com/spring-projects/spring-framework/issues/30186).

HTTP Interface Client can now [define static headers](https://github.com/spring-projects/spring-framework/issues/33309) in the annotations, and can encode `Collection`\-based `@RequestParam` arguments to a [single `String` in the request](https://github.com/spring-projects/spring-framework/pull/33220).

In continuation of the early support for rendering of multiple fragments in M5, we now also [support these over SSE](https://github.com/spring-projects/spring-framework/issues/33194) (streaming of fragments). If you're using htmx or turbo, please give it a try!

## [](#testing)Testing

Test classes using the `@MockitoBean` or `@MockitoSpyBean` annotations for bean overriding in tests now setup Mockito for strict stubbing, which can be overridden via the [`@MockitoBeanSettings` annotation](https://github.com/spring-projects/spring-framework/issues/33318).

## [](#62-features-recap)6.2 features recap

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62) for details about the new features available at this point.
---
title: Spring Framework 6.2.0-RC1 available now
source: https://spring.io/blog/2024/09/12/spring-framework-6-2-0-rc1-available-now
scraped: 2026-02-23T08:18:18.114Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  September 12, 2024 | 0 Comments
---

# Spring Framework 6.2.0-RC1 available now

_Releases | Brian Clozel |  September 12, 2024 | 0 Comments_

We are happy to announce the availability of the first release candidate of Spring Framework 6.2. We shipped a few features since the [last M7 release](https://spring.io/blog/2024/08/14/spring-framework-6-2-0-m7-available-now).

Spring Framework 6.2.0-RC1 is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now, check out the [detailed changelog for this version](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-RC1).

## [](#housekeeping)Housekeeping

On top of new features, we also use minor versions as an opportunity to do some housekeeping in our codebase. For example, we [harmonized Reactor client class names within the http.client package](https://github.com/spring-projects/spring-framework/issues/33382) or [promoted Etag as a first class concept](https://github.com/spring-projects/spring-framework/issues/33385). While those changes should be functionally equivalent, they might cause deprecations in your codebase.

We have also shipped a few core optimizations to avoid unneeded allocations and make Spring more efficient.

## [](#web-and-messaging)Web and messaging

[`ResponseBodyEmitter` now allows the registration of multiple state listeners](https://github.com/spring-projects/spring-framework/issues/33356), which is useful if your application is maintaining an ad hoc "keep alive" mechanism for your streaming sessions.

We have updated the supported `mime.types` in Spring web applications; when serving `Resource` with well-known file extensions, we should now better detect the relevant MIME type to be used.

As requested by the community, we also created [a WebFlux equivalent of a filter to handle URLs with trailing slashes](https://github.com/spring-projects/spring-framework/issues/32830). We shipped the Servlet Filter variant in a previous milestone and already improved it thanks to your feedback.

Finally, we now [provide more ways to send data streams through `ServerResponse` for WebMvc functional endpoints](https://github.com/spring-projects/spring-framework/issues/32710). Server Sent Events were supported already, this enables support for other streaming protocols.

## [](#62-features-recap)6.2 features recap

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes) for details about the new features available at this point.
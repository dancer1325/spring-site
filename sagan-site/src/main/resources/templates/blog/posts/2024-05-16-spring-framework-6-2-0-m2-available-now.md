---
title: Spring Framework 6.2.0-M2 available now
source: https://spring.io/blog/2024/05/16/spring-framework-6-2-0-m2-available-now
scraped: 2026-02-23T08:38:26.675Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  May 16, 2024 | 0 Comments
---

# Spring Framework 6.2.0-M2 available now

_Releases | Brian Clozel |  May 16, 2024 | 0 Comments_

We are happy to announce the availability of the second milestone of Spring Framework 6.2.

In case you missed it, we previously [kicked off this milestone phase with 6.2.0-M1](https://spring.io/blog/2024/04/11/kicking-off-the-spring-framework-6-2-milestone-phase) and talked about [the "little improvements" we worked on](https://spring.io/blog/2024/04/11/spring-framework-6-2-0-m1-all-the-little-things) and [how bean overriding in tests has evolved](https://spring.io/blog/2024/04/16/spring-framework-6-2-0-m1-overriding-beans-in-tests).

Spring Framework 6.2.0-M2 is available from [repo.spring.io/milestone](https://repo.spring.io/milestone) now, with [over 30 improvements and new features](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-M2).

## [](#urlhandlerfilter-for-trailing-slash-match)UrlHandlerFilter for trailing slash match

With the tailing slash match option being deprecated, the Spring community requested a way to gracefully handle this transition period in large applications. We have just introduced [the new `UrlHandlerFilter`](https://github.com/spring-projects/spring-framework/issues/31366) for that.

You can configure it to redirect requests to their no-trailing-slash URL equivalent:

```
CopyUrlHandlerFilter filter = UrlHandlerFilter.trimTrailingSlash("/path/*").andRedirect(HttpStatus.PERMANENT_REDIRECT).build();
```

Or transparently handle those for HTTP clients, without any redirect:

```
CopyUrlHandlerFilter filter = UrlHandlerFilter.trimTrailingSlash("/path/*").andHandleRequest().build();
```

`UrlHandlerFilter` can be [registered as any Servlet filter in your Spring Boot application](https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.embedded-container.servlets-filters-listeners).

Our next milestone will ship the WebFlux equivalent of `UrlHandlerFilter`, we are looking forward to hearing from the community about this highly requested feature.

## [](#new-web-features)New Web features

You can now [test WebMvc.fn endpoints with `MockMvcWebTestClient`](https://github.com/spring-projects/spring-framework/issues/30477), just as you could already for your annotated controllers.

This milestone also introduces [a new URL parser implementation](https://github.com/spring-projects/spring-framework/issues/32513), based on an algorithm provided in the Living URL standard. This significantly hardens our URL parsing infrastructure, [in response of recent security reports](https://spring.io/security/cve-2024-22262).

Have you tested already our new MockMvc AssertJ integration with `AssertableMockMvc`? We recently [renamed it to `MvcTester` and reviewed the structure of assertions](https://github.com/spring-projects/spring-framework/issues/32712).

## [](#62-features-recap)6.2 features recap

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62) for details about the new features available at this point.
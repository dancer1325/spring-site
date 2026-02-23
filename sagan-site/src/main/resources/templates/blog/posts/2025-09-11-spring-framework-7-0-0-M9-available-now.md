---
title: Spring Framework 7.0.0-M9 available now
source: https://spring.io/blog/2025/09/11/spring-framework-7-0-0-M9-available-now
scraped: 2026-02-23T07:31:10.280Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  September 11, 2025 | 0 Comments
---

# Spring Framework 7.0.0-M9 available now

_Releases | Brian Clozel |  September 11, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce our last milestone for Spring Framework 7.0. This is our last stop before the release candidate, scheduled next month. We have compiled all the upgrade information, new features and deprecations on the [Spring Framework 7.0 release notes](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes) preview page.

## [](#resiliency-refinements)Resiliency refinements

The new [Resiliency feature](https://docs.spring.io/spring-framework/reference/7.0/core/resilience.html) got a lot of fixes and refinements in this milestone, mostly around `RetryException` and exception handling. There is a new ["programmatic support"](https://docs.spring.io/spring-framework/reference/7.0/core/resilience.html#resilience-programmatic-retry) section in the reference documentation, in case the annotation-based model doesn't fit your use case.

## [](#web-enhancements)Web enhancements

We [updated our `HttpStatus` class](https://github.com/spring-projects/spring-framework/issues/32870) to better align with the latest RFC9110. This mostly materializes with new HTTP statuses and a few deprecations with immediate replacements.

The JDK's `HttpClient` request factory variant for `RestClient` and `RestTemplate` now supports "gzip" and "deflate" compressed server responses.

The HTTP server observations for Servlet applications [has a new Observation Convention](https://docs.spring.io/spring-framework/reference/7.0/integration/observability.html#observability.http-server.servlet.otel) that aligns with the OpenTelemetry Semantic Conventions. This is an opt-in feature, so we are eager to get your first impressions and feedback if you decide to use this variant. Feel free to share with us screenshots of your observability dashboards, we love to see this in action!

## [](#context-propagation-for-kotlin-coroutines)Context Propagation for Kotlin Coroutines

Speaking of Observability - Kotlin developers shared that while context propagation for traces worked well for blocking and reactive applications, this information is not available during the execution of a Kotlin Coroutine. This new release introduces [a `PropagationContextElement`](https://docs.spring.io/spring-framework/reference/7.0/languages/kotlin/coroutines.html#coroutines.propagation) operator to help Kotlin users. For now, you will need to add this operator to your Kotlin functions, but we are exploring ways to make this an automatic feature where possible.

## [](#undertow-support-dropped)Undertow support dropped

The Undertow project does not currently support Servlet 6.1 - this is a baseline requirement for this Spring Framework generation. As a result, we dropped Undertow-specific classes around WebSocket and low-level HTTP support for WebFlux applications.

Spring MVC applications can be deployed on any Servlet 6.1 compliant server, so Undertow users will leverage our standard Servlet support when Undertow will be compatible with this specification.

## [](#and-much-more)And much more!

This new release also ships refinements for the API Versioning and Nullness features. We received important feedback on `@HttpServiceClient`; as a result, we have decided to retire this annotation from the Interface Client support for now, so we can collect more feedback from the community before committing to a particular design.

There are plenty of other changes. As usual, you can check [the detailed changelog](https://github.com/spring-projects/spring-framework/releases/tag/v7.0.0-M9) for more details.

7.0.0-M9 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
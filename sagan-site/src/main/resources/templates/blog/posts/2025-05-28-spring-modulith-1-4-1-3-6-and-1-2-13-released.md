---
title: Spring Modulith 1.4 GA, 1.3.6, and 1.2.13 released
source: https://spring.io/blog/2025/05/28/spring-modulith-1-4-1-3-6-and-1-2-13-released
scraped: 2026-02-23T07:40:40.475Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  May 28, 2025 | 0 Comments
---

# Spring Modulith 1.4 GA, 1.3.6, and 1.2.13 released

_Releases | Oliver Drotbohm |  May 28, 2025 | 0 Comments_

On behalf of the community, I am delighted that after a half year's work we can announce Spring Modulith 1.4. The release is packed with new features, such as:

## [](#core)Core

-   Refinements in the core `ApplicationModule(s)` abstractions and documentation generation ([GH-1150](https://github.com/spring-projects/spring-modulith/issues/1150), [GH-1152](https://github.com/spring-projects/spring-modulith/issues/1152))
-   We introduced an SPI to detect `NamedInterfaces` programatically ([GH-1009](https://github.com/spring-projects/spring-modulith/issues/1009)).
-   We fixed a performance regression in `JavaPackage` the erroneously repeatedly recomputed all sub packages. (also fixed in 1.3.4 and 1.2.10, [GH-1098](https://github.com/spring-projects/spring-modulith/issues/1098))

## [](#testing)Testing

-   Integration tests using `@ApplicationModuleTest` can now consume bean instances of classes declared in test sources. ([GH-202](https://github.com/spring-projects/spring-modulith/issues/202))
-   The global `PublishedEvents` instance registered in an `ApplicationContext` will now be an `AssertablePublishedEvents` if AssertJ is on the classpath. ([GH-1110](https://github.com/spring-projects/spring-modulith/issues/1110))

## [](#events)Events

-   Performance improvements both in the core event publication registry and the observability instrumentation. ([GH-1146](https://github.com/spring-projects/spring-modulith/issues/1146), [GH-1149](https://github.com/spring-projects/spring-modulith/issues/1149))
-   The event publication infrastructure has been revamped to now also support structurally identical events ([GH-1056](https://github.com/spring-projects/spring-modulith/issues/1056)).

## [](#runtime-and-observability-support)Runtime and Observability Support

-   The runtime support has been revamped to avoid the dependency on an external library to topologically sort application modules, so that they can be traversed in dependency order ([GH-1060](https://github.com/spring-projects/spring-modulith/issues/1060)). This allows assuming a stable module order in the application metadata file that – previously only created in AOT mode – is now also written when generating documentation ([GH-1063](https://github.com/spring-projects/spring-modulith/issues/1063)). That in turn allows us to avoid the full bootstrap of an `ApplicationModules` instance at runtime, for example, to execute `ApplicationModuleListener` beans ([GH-1062](https://github.com/spring-projects/spring-modulith/issues/1062), [GH-1065](https://github.com/spring-projects/spring-modulith/issues/1065)).
-   Move to Micrometer Observations API – [Marcin Grzejszczak](https://github.com/marcingrzejszczak) was kind enough to port our existing instrumentation based on the tracing APIs to the more modern observations API that allows more fine-grained integration and capturing of metrics. ([GH-928](https://github.com/spring-projects/spring-modulith/issues/928))
-   The observability module now automatically creates counters for application events published by modules. A new `ModulithEventMetrics` API has been introduced and can be used through `ModulithEventMetricsCustomizer` beans registered in the `ApplicationContext` ([GH-1068](https://github.com/spring-projects/spring-modulith/issues/1068)).

## [](#configuration)Configuration

-   Consider global proxy settings for proxies created. ([GH-933](https://github.com/spring-projects/spring-modulith/issues/933))

## [](#documentation-generation)Documentation generation

-   The Scenario API only considers non-empty collections as successful state transitions by default ([GH-1131](https://github.com/spring-projects/spring-modulith/issues/1131))

The release, of course, also contains upgrades to the latest Spring Boot 3.5 and Framework 6.2 releases, as well as ArchUnit 1.4. The bugfix releases also update to their latest upstream dependencies. For details, please check the full [1.4 changelog](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.0).

Up next are preparations for the 2.0 major release due in November. In the mean time, check out the Spring Modulith support the fine folks at IntelliJ have [coming up](https://chaos.social/@odrotbohm/114580037955157545) for IDEA.
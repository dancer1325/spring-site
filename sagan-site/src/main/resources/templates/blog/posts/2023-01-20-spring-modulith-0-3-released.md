---
title: Spring Modulith 0.3 released
source: https://spring.io/blog/2023/01/20/spring-modulith-0-3-released
scraped: 2026-02-23T10:15:37.395Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  January 20, 2023 | 0 Comments
---

# Spring Modulith 0.3 released

_Engineering | Oliver Drotbohm |  January 20, 2023 | 0 Comments_

Hot on the heels of Spring Boot 3.0.2, I am excited to announce the 0.3 release of Spring Modulith. The release is packed with improvements. We have tweaked a couple of things that might require your attention and a couple of adapting changes to your code. The most notable changes are:

-   [GH-114](https://github.com/spring-projects-experimental/spring-modulith/issues/114) – We renamed the `….modulith.model` package to `….modulith.core`. This primarily affects `ApplicationModules`. Please adapt your imports accordingly.
    
-   [GH-120](https://github.com/spring-projects-experimental/spring-modulith/issues/120) – The documentation support now generates diagram files using the `*.puml` file extension, as suggested by [PlantUML](https://plantuml.com/sources). Please adapt your imports accordingly.
    
-   [GH-103](https://github.com/spring-projects-experimental/spring-modulith/issues/103) – [`ApplicationModuleInitializer`](https://docs.spring.io/spring-modulith/docs/0.3.0/api/org/springframework/modulith/ApplicationModuleInitializer.html) implementations will be triggered upon application startup, in the order following the application module dependency structure (more core ones are invoked first). Also, `ApplicationModules` exposes a [`….getComparator()`](https://docs.spring.io/spring-modulith/docs/0.3.0/api/org/springframework/modulith/core/ApplicationModules.html#getComparator\(\)) to order Spring beans that way. Note, that this requires the [JGraphT](https://jgrapht.org/) library to be on the classpath (automatically pulled in via the `spring-modulith-runtime` artifact). See the [reference documentation](https://docs.spring.io/spring-modulith/docs/0.3.0/reference/html/#runtime.application-module-initializer) for details.
    
-   [GH-116](https://github.com/spring-projects-experimental/spring-modulith/issues/116) – `PublishedEvents` now sees events published from asynchronous event listeners, too.
    
-   [GH-100](https://github.com/spring-projects-experimental/spring-modulith/issues/100) – If you’re using AssertJ in your tests, you can now use [`AssertablePublishedEvents`](https://docs.spring.io/spring-modulith/docs/0.3.0/api/org/springframework/modulith/test/AssertablePublishedEvents.html) for a more streamlined integration (for example, `assertThat(events).contains(MyEvent.class).matching(…)`).
    
-   [GH-117](https://github.com/spring-projects-experimental/spring-modulith/issues/117) – As we incentivize event-based, asynchronous application module integration, the test starter now also pulls in [Awaitility](http://www.awaitility.org/).
    
-   [GH-111](https://github.com/spring-projects-experimental/spring-modulith/issues/111) – We now publish aggregated [Javdoc](https://docs.spring.io/spring-modulith/docs/0.3.0/api/).
    

Find a complete change log in the [GitHub release page](https://github.com/spring-projects-experimental/spring-modulith/releases/tag/0.3.0). We are looking forward to your feedback in the [GitHub discussions](https://github.com/spring-projects-experimental/spring-modulith/discussions).
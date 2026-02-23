---
title: Spring Modulith 1.2.8, 1.3.2, and 1.4 M1 released
source: https://spring.io/blog/2025/01/24/spring-modulith-1-2-3-1-3-2-and-1-4-m1-released
scraped: 2026-02-23T07:54:34.740Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  January 24, 2025 | 0 Comments
---

# Spring Modulith 1.2.8, 1.3.2, and 1.4 M1 released

_Releases | Oliver Drotbohm |  January 24, 2025 | 0 Comments_

I am happy to announce the availability of Spring Modulith 1.4 M1, 1.3.2, and 1.2.8. While the latter contain a few bug fixes and the usual dependency upgrades to the latest Spring Boot releases, the milestone release ships a couple of important new features.

-   [GH-928](https://github.com/spring-projects/spring-modulith/issues/928) – Move to Micrometer Observations API – [Marcin Grzejszczak](https://github.com/marcingrzejszczak) was kind enough to port our existing instrumentation based on the tracing APIs to the more modern observations API that allows more fine-grained integration and capturing of metrics. Stay tuned for a more detailed blog post coming soon!
    
-   [GH-933](https://github.com/spring-projects/spring-modulith/issues/933) – Consider global proxy settings for proxies created.
    
-   [GH-1009](https://github.com/spring-projects/spring-modulith/issues/1009) - SPI to detect `NamedInterfaces` programatically.
    
-   [GH-1037](https://github.com/spring-projects/spring-modulith/issues/1037) - Upgrade to Spring Boot 3.5 M1.
    
-   [GH-961](https://github.com/spring-projects/spring-modulith/issues/961) – Upgrade to Structurizr 3.1.
    

The bugfix releases can be found on Maven Central, the milestone one is available from [http://repo.spring.io/milestone](http://repo.spring.io/milestone). Find more information about the releases in the official change logs for [1.2.8](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.8), [1.3.2](https://github.com/spring-projects/spring-modulith/releases/tag/1.3.2), and [1.4 M1](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.0-M1).
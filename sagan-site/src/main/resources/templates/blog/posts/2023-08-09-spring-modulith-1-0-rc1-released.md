---
title: Spring Modulith 1.0 RC1 released
source: https://spring.io/blog/2023/08/09/spring-modulith-1-0-rc1-released
scraped: 2026-02-23T09:30:02.934Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 09, 2023 | 0 Comments
---

# Spring Modulith 1.0 RC1 released

_Releases | Oliver Drotbohm |  August 09, 2023 | 0 Comments_

I am happy to announce the release of Spring Modulith 1.0 RC1. The first release candidate is likely to be the last before our GA release and contains quite a few new features and improvements.

-   Event re-publication on startup is now configurable and defaults to false to avoid problems in cluster deployments. [GH-240](https://github.com/spring-projects/spring-modulith/issues/240)
-   More efficient database access in the Event Publication Registry. [GH-251](https://github.com/spring-projects/spring-modulith/issues/251)
-   The `Clock` instance used by the Event Publication Registry can now be customized. [GH-206](https://github.com/spring-projects/spring-modulith/issues/206)
-   Improvements in `ApplicationModuleExporter` to support the structural verification [in the editor of STS4](https://github.com/spring-projects/sts4/releases/tag/4.19.1.RELEASE) [GH-227](https://github.com/spring-projects/spring-modulith/issues/227), [GH-229](https://github.com/spring-projects/spring-modulith/issues/229)
-   A lot of minor improvements and documentation updates.

Find more detailed information in the official release change log. We are looking forward to your feedback in preparation of our 1.0 GA release around SpringOne. In case you have not registered yet, make you do. We have both [a talk](https://springone.io/sessions/spring-modulith-spring-for-the-architecturally-curious-developer) and [a deep-dive workshop](https://springone.io/sessions/spring-modulith-a-deep-dive) scheduled.
---
title: Spring Integration 6.3 Available, also 6.2.5 & 6.1.9
source: https://spring.io/blog/2024/05/22/spring-integration-6-3-availalbe-also-6-2-5-and-6-1-9
scraped: 2026-02-23T08:39:11.747Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 22, 2024 | 0 Comments
---

# Spring Integration 6.3 Available, also 6.2.5 & 6.1.9

_Releases | Artem Bilan |  May 22, 2024 | 0 Comments_

On behalf of the team and everyone who contributed, I am pleased to announce Spring Integration `6.3.0`.

In addition to regular bug fixes, dependency upgrade, there were some deprecation refactoring. The [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.2-to-6.3-Migration-Guide) includes some of them.

Here are some notable improvements and new features:

-   The `ObservationPropagationChannelInterceptor` has been deprecated in favor of enabling observation on the specific channel.
-   The `spring-integration-security` module is completely removed in favor of API from `spring-security-messaging` module.
-   The `MockIntegrationContext.substituteTriggerFor()` API has been introduced.
-   The `MessageHistory` header is now mutable, append-only container. This provides some performance optimization when we don't create a new `Message` on every history track.

See [What's New in 6.3](https://docs.spring.io/spring-integration/reference/whats-new.html#whats-new-part) for more details.

In addition the `6.2.5` & `6.1.9` bug fixed versions were released.

The `6.1.x` branch has reached its End of Life for Open Source support. The next `6.1.10` version will be released only under Commercial license in August.

We also are looking to start `6.4` generation for upcoming November release train based on work-in-progress Spring Framework `6.2`.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/main/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)
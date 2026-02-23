---
title: Spring Modulith 1.2 M3 released
source: https://spring.io/blog/2024/03/22/spring-modulith-1-2-m3-released
scraped: 2026-02-23T08:49:18.013Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 22, 2024 | 1 Comment
---

# Spring Modulith 1.2 M3 released

_Releases | Oliver Drotbohm |  March 22, 2024 | 1 Comment_

I am happy to announce the availability of Spring Modulith 1.2 M3. It contains a couple of dependency upgrades, bug fixes but the following new features primarily:

-   [Support for open application modules](https://docs.spring.io/spring-modulith/reference/1.2/fundamentals.html#modules.advanced.open) – Application modules can now be declared as open, which gives other modules full access to the open module's internals. Primarily intended for scenarios in which Spring Modulith is introduced in existing, sub-optimally structured projects.
-   [Support for package info types](https://docs.spring.io/spring-modulith/reference/1.2/fundamentals.html#modules.named-interfaces) – Kotlin does not directly support annotating packages as it doesn't know an equivalent of `package-info.java`. Package-level configuration annotations such as `@ApplicationModule` or `@NamedInterface` can now be used on types annotated with `@PackageInfo`.
-   `@ApplicationModuleListener` now exposes `@EventListener`'s `condition` attribute.

For more details check out the full [change log](https://github.com/spring-projects/spring-modulith/releases/tag/1.2.0-M3) and the [reference documentation](https://docs.spring.io/spring-modulith/reference/1.2/index.html).
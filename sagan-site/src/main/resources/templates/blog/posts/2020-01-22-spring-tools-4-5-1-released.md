---
title: Spring Tools 4.5.1 released
source: https://spring.io/blog/2020/01/22/spring-tools-4-5-1-released
scraped: 2026-02-23T14:13:57.398Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  January 22, 2020 | 1 Comment
---

# Spring Tools 4.5.1 released

_Releases | Martin Lippert |  January 22, 2020 | 1 Comment_

Dear Spring Community,

I am happy to announce the 4.5.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Spring Boot)* improvement: live hover mechanism now reports connection failures
-   *(Eclipse)* improvement: Add support for async completions in 4.15 ([#402](https://github.com/spring-projects/sts4/issues/402)) - PR from @gayanper
-   *(Eclipse)* improvement: Early access builds for Eclipse 4.15 available
-   *(Eclipse)* fixed: auto-completion inserted extra newline for params in `@Value` annotations
-   *(Eclipse)* fixed: Boot Dashboard cannot start app when Eclipse project name contains spaces ([#403](https://github.com/spring-projects/sts4/issues/403))
-   *(Eclipse)* fixed: NPE in PropertiesJavaDefinitionHandler.adjustedHighlightRangeForKey ([#401](https://github.com/spring-projects/sts4/issues/401))
-   *(Eclipse)* fixed: builds on Eclipse 4.14 include latest m2e snapshot components to fix an issue when running JUnit 5 tests

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-01-22-451-release](https://github.com/spring-projects/sts4/wiki/Changelog#2020-01-22-451-release)

Spring Tools 4.5.2 is scheduled to be released in late February 2020.

Enjoy!
---
title: Spring Tools 4.3.2 released
source: https://spring.io/blog/2019/08/14/spring-tools-4-3-2-released
scraped: 2026-02-23T14:39:04.271Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  August 14, 2019 | 0 Comments
---

# Spring Tools 4.3.2 released

_Releases | Martin Lippert |  August 14, 2019 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.3.2 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Spring Boot)* fixed: CTRL-click navigation does not handle properties on super class correctly ([#326](https://github.com/spring-projects/sts4/issues/326))
-   *(Spring Boot)* fixed: Configuration property analysis does not handle properties written in snake\_case correctly ([#327](https://github.com/spring-projects/sts4/issues/327))
-   *(Eclipse)* fixed: language server processes not being terminated correctly under specific circumstances, resulting in many language server processes keep running while Eclipse is open
-   *(Eclipse)* fixed: Eclipse Language Server cannot be resolved because of a uses constraint violation ([#325](https://github.com/spring-projects/sts4/issues/325))
-   *(Eclipse)* fixed: UI freezes caused by xmlnamespace support? ([#318](https://github.com/spring-projects/sts4/issues/318))
-   *(Eclipse)* fixed: missing javax.inject import causes CF integration in boot dashboard to fail
-   a number of additional bug fixes...

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2019-08-14-432-release](https://github.com/spring-projects/sts4/wiki/Changelog#2019-08-14-432-release)

Spring Tools 4.4.0 is scheduled to be released in late September 2019.

Enjoy!
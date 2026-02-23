---
title: Spring Tools 4.14.1 released
source: https://spring.io/blog/2022/04/26/spring-tools-4-14-1-released
scraped: 2026-02-23T12:43:35.951Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  April 26, 2022 | 0 Comments
---

# Spring Tools 4.14.1 released

_Releases | Martin Lippert |  April 26, 2022 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.14.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#fixes-and-improvements)fixes and improvements

-   *(Spring Boot)* fixed: use `startupSnapshot` instead of `startup` timer call to avoid wiping out the underlying data
-   *(Spring Boot)* fixed: When vscode opens a Java project for about 2 hours, the suggestion function will fail ([#750](https://github.com/spring-projects/sts4/issues/750))
-   *(VSCode)* enhancement: live hovers are now automatically show up when you launch a Spring Boot application in VSCode. Additional JVM args for the Spring Boot app to enable JMX are added to the launch automatically. More details can be found in the user guide section about [Live Application Information](https://github.com/spring-projects/sts4/wiki/Live-Application-Information).
-   *(VSCode)* enhancement: add extension APIs to get live data ([#751](https://github.com/spring-projects/sts4/pull/751)) - contributed by @Eskibear

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog/#2022-04-27-4141-release-incl-language-servers-version-1330](https://github.com/spring-projects/sts4/wiki/Changelog/#2022-04-27-4141-release-incl-language-servers-version-1330)

Spring Tools 4.15.0 is scheduled to be released in mid June 2022.

Enjoy!
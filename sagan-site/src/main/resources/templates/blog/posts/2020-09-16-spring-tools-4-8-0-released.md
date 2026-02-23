---
title: Spring Tools 4.8.0 released
source: https://spring.io/blog/2020/09/16/spring-tools-4-8-0-released
scraped: 2026-02-23T13:48:14.382Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  September 16, 2020 | 0 Comments
---

# Spring Tools 4.8.0 released

_Releases | Martin Lippert |  September 16, 2020 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.8.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#this-release-includes-major-changes-to-the-spring-tools-4-for-eclipse-distribution)This release includes major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2020-09 release
-   requires a JDK11 to run on
-   ships with an embedded JDK14 runtime, no need to install or configure a specific JDK to run the IDE on anymore
-   includes Eclipse Docker tooling by default now (in addition to the nice docker integration for the Spring Boot Dashboard)
-   includes Wild Web Developer tooling now ([#354](https://github.com/spring-projects/sts4/issues/354)), including advanced support for JavaScript, TypeScript, HTML, and more

#### [](#additional-changes-and-fixes)Additional changes and fixes

-   *(Spring Boot)* fix: Eclips shows error on `@ConditionalOnExpression("${downlink.active:false}")` ([#529](https://github.com/spring-projects/sts4/issues/529))
-   *(Eclipse)* improvement: added action to jump from boot dashboard docker integration to docker explorer
-   *(Eclipse)* improvement: added actions to pause an resume docker containers
-   *(Eclipse)* change: local cloud services are now hidden by default and can be enabled via the boot dashboard view drop-down
-   *(Eclipse)* fixed: run spring boot app in debug mode in docker container now works with Spring Boot Devtools being enabled
-   *(Eclipse)* fixed: add starters wizard now updates the projects definition automatically after pressing finish to get new resources into the right configuration automatically
-   *(Eclipse)* fixed: improved a few icons for dark theme ([#472](https://github.com/spring-projects/sts4/issues/472))
-   *(Eclipse)* fixed: check for JDK vs. JRE improved for JDK >= 9 case ([#530](https://github.com/spring-projects/sts4/issues/530), [#531](https://github.com/spring-projects/sts4/issues/531))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-09-17-480-release-incl-language-servers-version-1220](https://github.com/spring-projects/sts4/wiki/Changelog#2020-09-17-480-release-incl-language-servers-version-1220)

Spring Tools 4.8.1 is scheduled to be released in late October 2020.

Enjoy!
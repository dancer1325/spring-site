---
title: Spring Tools 4.8.1 released
source: https://spring.io/blog/2020/10/27/spring-tools-4-8-1-released
scraped: 2026-02-23T13:44:15.613Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  October 27, 2020 | 1 Comment
---

# Spring Tools 4.8.1 released

_Releases | Martin Lippert |  October 27, 2020 | 1 Comment_

Dear Spring Community,

I am happy to announce the 4.8.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#quick-reminder)quick reminder

-   the Eclipse-based distribution of the Spring Tools 4 requires a JDK11 (or newer) to run on
-   the Eclipse-based distribution ships with an embedded JDK15 runtime, no need to install or configure a specific JDK to run the IDE on anymore

#### [](#additional-changes-and-fixes)additional changes and fixes

-   *(Spring Boot)* new: Added support for Spring Boot multi-document properties files ([#533](https://github.com/spring-projects/sts4/issues/533))
-   *(Spring Boot)* fixed: Support escaping of map keys with '\[\]' in Spring Boot property yaml files
-   *(Spring Boot)* fixed: Tolerate '.\[' for map navigation in .properties file
-   *(Eclipse)* improvement: support container image creation and container deployment of Spring Boot apps without maven wrapper
-   *(Eclipse)* improvement: better process label for live hovers from boot apps running in docker
-   *(Eclipse)* improvement: allow docker-deployed boot apps to find each other (via simple network setup inside of docker)
-   *(Eclipse)* improvement: automatically disable code hotswap when running a Spring Boot app with devtools in debug mode (to avoid conflicts between devtools and hot swap both try to update code in the running process)
-   *(Eclipse)* update: updated embedded JRE to JDK15, including the src.zip now
-   *(Eclipse)* update: re-organized Spring-related preference pages
-   *(Eclipse)* update: removed `-Xverify:none` and `-noverify` from the default fast startup settings for boot app launch configs
-   *(Eclipse)* update: default PWS endpoint URL removed from the dialog to create Cloud Foundry targets in the boot dashboard (since PWS is going away)
-   *(Eclipse)* fixed: errors appear in log when pausing docker containers
-   *(Eclipse)* fixed: do not show breakpoint warning when starting up a Spring Boot app
-   *(Eclipse)* fixed: added missing high-res and dark-mode-compatible icons for docker support in Spring Boot dashboard
-   *(Eclipse)* fixed: sometimes live hovers do not show up automatically after launching a boot app in docker
-   *(Eclipse)* fixed: improved stability when deploying multiple apps simultaneously to docker via the boot dashboard
-   *(Eclipse)* fixed: problem showing live request mappings for eureka-based apps
-   *(Eclipse)* fixed: dropdown in Spring Symbols view shows up with transparent background on Linux
-   *(Concourse)* fixed: support pipeline directory as well see ([#525](https://github.com/spring-projects/sts4/issues/525))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-10-23-481-release-incl-language-servers-version-1230](https://github.com/spring-projects/sts4/wiki/Changelog#2020-10-23-481-release-incl-language-servers-version-1230)

Spring Tools 4.8.2 is scheduled to be released in late November 2020.

Enjoy!
---
title: Spring Tools 4.9.0 released
source: https://spring.io/blog/2020/12/16/spring-tools-4-9-0-released
scraped: 2026-02-23T13:37:01.300Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  December 16, 2020 | 4 Comments
---

# Spring Tools 4.9.0 released

_Releases | Martin Lippert |  December 16, 2020 | 4 Comments_

Dear Spring Community,

I am happy to announce the 4.9.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2020-12 release (including support for Java 15)

#### [](#reminder)reminder

-   the Eclipse-based distribution of the Spring Tools 4 requires a JDK11 (or newer) to run on
-   ships with an embedded JDK15 runtime, no need to install or configure a specific JDK to run the IDE on anymore

#### [](#additional-changes)additional changes

-   *(Spring Boot)* new: show bean startup performance metrics in live hovers and code lenses (details in the user guide)
-   *(Spring Boot)* new: show basic request mapping performance metrics in live hovers and code lensses (details in the user guide)
-   *(Spring Boot)* new: provide content-assist for constructor-arg name in Spring XML config files ([#562](https://github.com/spring-projects/sts4/issues/562))
-   *(Spring Boot)* fixed: language-server-internal exception happening when saving a file that has a space or other special characters in its name or path
-   *(Eclipse)* improvement: added support for custom scripts to create docker images when deploying a boot app to docker in the boot dashboard (details in the user guide)
-   *(Eclipse)* fixed: enable live hover action for more docker-related nodes in the boot dashboard
-   *(Concourse)* fixed: navigation in pipeline files with VSCode Concourse CI extension doesn't work everytime ([#483](https://github.com/spring-projects/sts4/issues/483))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-12-16-490-release-incl-language-servers-version-1240](https://github.com/spring-projects/sts4/wiki/Changelog#2020-12-16-490-release-incl-language-servers-version-1240)

Spring Tools 4.9.1 is scheduled to be released in early Feb 2021.

Enjoy!
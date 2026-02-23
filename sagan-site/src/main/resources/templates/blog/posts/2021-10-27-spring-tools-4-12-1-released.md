---
title: Spring Tools 4.12.1 released
source: https://spring.io/blog/2021/10/27/spring-tools-4-12-1-released
scraped: 2026-02-23T13:06:13.210Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  October 27, 2021 | 0 Comments
---

# Spring Tools 4.12.1 released

_Releases | Martin Lippert |  October 27, 2021 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.12.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#important-updates-to-the-spring-tools-4-for-eclipse-distribution)important updates to the Spring Tools 4 for Eclipse distribution

-   embedded runtime upgraded to JDK17 (across all distributions, including Apple Silicon)
-   Java 17 support available ([via separate add-on](https://marketplace.eclipse.org/content/java-17-support-eclipse-2021-09-421))
-   [early-access builds for upcoming Eclipse 2021-12 release available](https://github.com/spring-projects/sts4/wiki/Previous-Versions)
-   [early-access builds for Apple Silicon platform (ARM M1) available](https://github.com/spring-projects/sts4/wiki/Previous-Versions)

#### [](#additional-changes)additional changes

-   *(Eclipse)* fixed: Alway Download sources and javadoc when I open sts (distribution includes latest m2e 1.18.2 release now) ([#692](https://github.com/spring-projects/sts4/issues/692))
-   *(Eclipse)* fixed: docker integration doesn't work on Apple Silicon ([#684](https://github.com/spring-projects/sts4/issues/684))
-   *(Eclipse)* fixed: Annoying error message on every eclipse startup if CF destination is not reachable ([#688](https://github.com/spring-projects/sts4/issues/688))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2021-10-27-4121-release-no-language-server-updates](https://github.com/spring-projects/sts4/wiki/Changelog#2021-10-27-4121-release-no-language-server-updates)

Spring Tools 4.13.0 is scheduled to be released in late December 2021.

Enjoy!
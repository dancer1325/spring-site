---
title: Spring Tools 4.11.0 released
source: https://spring.io/blog/2021/06/21/spring-tools-4-11-0-released
scraped: 2026-02-23T13:21:03.262Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  June 21, 2021 | 7 Comments
---

# Spring Tools 4.11.0 released

_Releases | Martin Lippert |  June 21, 2021 | 7 Comments_

Dear Spring Community,

I am happy to announce the 4.11.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2021-06 release (including support for Java 16) ([new and noteworthy](https://www.eclipse.org/eclipseide/2021-06/))
-   early-access builds for Apple Silicon platform (ARM M1) available

#### [](#reminder)reminder

-   the Eclipse-based distribution of the Spring Tools 4 requires a JDK11 (or newer) to run on
-   the Eclipse-based distribution ships with an embedded JDK16 runtime, no need to install or configure a specific JDK to run the IDE on anymore

#### [](#additional-highlights)additional highlights

-   *(VS Code, Spring Boot)* new: new walkthrough contribution to get started with Spring Boot in VS Code
-   *(VS Code, Spring Boot)* fixed: not work when change LightWeight mode to Standard ([#628](https://github.com/spring-projects/sts4/issues/628))
-   *(VS Code, Spring Boot)* fixed: language server processes doesn't get shutdown properly in VSCode ([#636](https://github.com/spring-projects/sts4/issues/636))
-   *(VS Code, Spring Boot)* fixed: VSCode extension JDK version ([#612](https://github.com/spring-projects/sts4/issues/612))
-   *(Eclipse)* improvement: Boot Dash: flexible and configurable filters ([#614](https://github.com/spring-projects/sts4/issues/614))
-   *(Eclipse)* improvement: hide projects without a main class from boot dashboard automatically ([#605](https://github.com/spring-projects/sts4/issues/605))
-   *(Concourse)* improvement: VSCode extension doesn't understand glob patterns in group config ([#639](https://github.com/spring-projects/sts4/issues/639))
-   *(Concourse)* improvement: Step and properties not recognized ([#633](https://github.com/spring-projects/sts4/issues/633))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2021-06-18-4110-release-incl-language-servers-version-1260](https://github.com/spring-projects/sts4/wiki/Changelog#2021-06-18-4110-release-incl-language-servers-version-1260)

Spring Tools 4.11.1 is scheduled to be released in early August 2021.

Enjoy!
---
title: Spring Tools 4.16.1 released
source: https://spring.io/blog/2022/10/26/spring-tools-4-16-1-released
scraped: 2026-02-23T10:36:08.788Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  October 26, 2022 | 0 Comments
---

# Spring Tools 4.16.1 released

_Releases | Martin Lippert |  October 26, 2022 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.16.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   early access builds available for Spring Tools 4 on Eclipse 2022-12 milestones

#### [](#important-note-for-upgrading-from-a-release-prior-to-4160-on-eclipse)important note for upgrading from a release prior to 4.16.0 on Eclipse

-   If you are upgrading an existing Spring Tools 4 for Eclipse distribution 4.15.3 or older to 4.16.1, please take a look at the necessary manual [steps described for the upgrade to 4.16.0](https://github.com/spring-projects/sts4/wiki/Changelog#important-note-for-upgrading-from-a-previous-installation-on-eclipse).

#### [](#fixes-and-improvements)fixes and improvements

-   *(Spring Boot)* fixed: Spring XML Config support does not show symbols with scope "File" ([#860](https://github.com/spring-projects/sts4/issues/860))
-   *(Spring Boot)* fixed: \[open-rewrite\] exception when executing quick fix for project ([#853](https://github.com/spring-projects/sts4/issues/853))
-   *(Spring Boot)* fixed: \[refactoring\] quick fix to convert autowired field to constructor param shows up even if the constructor param already exists ([#815](https://github.com/spring-projects/sts4/issues/815))
-   *(VSCode)* fixed: Vscode Spring Boot Tools 1.39.0 prevents Java project from Running/Debugging ([#847](https://github.com/spring-projects/sts4/issues/847))
-   *(Eclipse)* fixed: Web Tools Platform (WTP) validation is activated by default ([#859](https://github.com/spring-projects/sts4/issues/859))
-   *(Eclipse)* fixed: ask user to save dirty editors before deploying on docker ([#803](https://github.com/spring-projects/sts4/issues/803))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2022-10-26-4161-release-incl-language-servers-version-1400](https://github.com/spring-projects/sts4/wiki/Changelog#2022-10-26-4161-release-incl-language-servers-version-1400)

Spring Tools 4.17.0 is scheduled to be released in early December 2022.

Enjoy!
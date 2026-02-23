---
title: Spring Tools 4.14.0 released
source: https://spring.io/blog/2022/03/16/spring-tools-4-14-0-released
scraped: 2026-02-23T12:48:10.356Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  March 16, 2022 | 1 Comment
---

# Spring Tools 4.14.0 released

_Releases | Martin Lippert |  March 16, 2022 | 1 Comment_

Dear Spring Community,

I am happy to announce the 4.14.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2022-03 release ([new and noteworthy](https://www.eclipse.org/eclipseide/2022-03/))

#### [](#fixes-and-improvements)fixes and improvements

-   *(VSCode)* fixed: VSCode Spring boot tools 1.30.0 error trying to find JVM ([#726](https://github.com/spring-projects/sts4/issues/726))
-   *(VSCode)* fixed: vscode "Problems" diagnostic entries lack "source" field ([#725](https://github.com/spring-projects/sts4/issues/725))
-   *(VSCode)* fixed: orphan vscode extension processes left running ([#704](https://github.com/spring-projects/sts4/issues/704))
-   *(VSCode)* fixed: deadlock in language server process avoids process to be shutdown ([#741](https://github.com/spring-projects/sts4/issues/741))
-   *(VSCode)* fixed: Outline View is broken again on Windows ([#742](https://github.com/spring-projects/sts4/issues/742))
-   *(VSCode)* fixed: boot-java.live-information.automatic-tracking.on is not working on vscode ([#733](https://github.com/spring-projects/sts4/issues/733))
-   *(VSCode)* fixed: Java 17 is mis-identified as Java 8 ([#713](https://github.com/spring-projects/sts4/issues/713))
-   *(Eclipse)* fixed: Deadlock with Spring LSP in Eclipse 4.23 with STS 4.23 nightlies ([#729](https://github.com/spring-projects/sts4/issues/729))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2022-03-16-4140-release-incl-language-servers-version-1320](https://github.com/spring-projects/sts4/wiki/Changelog#2022-03-16-4140-release-incl-language-servers-version-1320)

Spring Tools 4.14.1 is scheduled to be released in late April 2022.

Enjoy!
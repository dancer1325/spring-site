---
title: Spring Tools 4.20.0 released
source: https://spring.io/blog/2023/09/13/spring-tools-4-20-0-released
scraped: 2026-02-23T09:23:49.824Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  September 13, 2023 | 2 Comments
---

# Spring Tools 4.20.0 released

_Releases | Martin Lippert |  September 13, 2023 | 2 Comments_

Dear Spring Community,

I am happy to announce the 4.20.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#updates-to-the-spring-tools-4-for-eclipse-distribution)updates to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2023-09 release ([new and noteworthy](https://eclipseide.org/release/noteworthy/))

#### [](#important-highlights)important highlights

-   *(Spring Boot):* 5x-10x faster Java Reconciling support to show Spring specific validations re-built from the ground up tuned for high performance to work seamlessly in large code bases
-   *(Eclipse):* No more rogue "Boot Language Server" jobs, forever calculating completion proposals and other stuck Java/Spring tooling features

#### [](#more-fixes-and-improvements)more fixes and improvements

-   *(Spring Boot)* fixed: Performance of Reconciling Spring Java ([#1068](https://github.com/spring-projects/sts4/issues/1068))
-   *(Spring Boot)* fixed: Spring Language Server hangs forever ([#1075](https://github.com/spring-projects/sts4/issues/1075))
-   *(Spring Boot)* fixed: Spring Boot Validations Builder hung seemingly forever ([#1103](https://github.com/spring-projects/sts4/issues/1103))
-   *(Spring Boot)* fixed: Incorrect MISSING\_CONFIGURATION\_ANNOTATION warning in vscode ([#1100](https://github.com/spring-projects/sts4/issues/1100))

Detailed changes can be found in the release notes: [https://github.com/spring-projects/sts4/releases/tag/4.20.0.RELEASE](https://github.com/spring-projects/sts4/releases/tag/4.20.0.RELEASE)

#### [](#downloads)downloads

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Spring Tools 4.20.1 is scheduled to be released in late October 2023.

Enjoy!
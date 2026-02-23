---
title: Spring Tools 4.7.1 released
source: https://spring.io/blog/2020/07/30/spring-tools-4-7-1-released
scraped: 2026-02-23T13:53:28.845Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  July 30, 2020 | 0 Comments
---

# Spring Tools 4.7.1 released

_Releases | Martin Lippert |  July 30, 2020 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.7.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Spring Boot)* enhancement: Syntax check for Annotations with Spring Expression Language ([#475](https://github.com/spring-projects/sts4/issues/475))
-   *(Spring Boot)* fixed: hard to reproduce BadLocationException inside of language server fixed now, occurred e.g. in ([#451](https://github.com/spring-projects/sts4/issues/451))
-   *(Eclipse)* new: early access update sites and distribution builds for Eclipse 2020-09 available now (and requires JDK11 to run)
-   *(Eclipse)* improvement: old Spring Boot launch configs are now "fixed" automatically to exclude test classes again
-   *(Eclipse)* improvement: new Spring Symbols view now works a lot better when selecting the file scope (also takes selections from package explorer into account)
-   *(Eclipse)* fixed: STS4 Does Not Start After Installing Papyrus Plugin ([#499](https://github.com/spring-projects/sts4/issues/499))
-   *(Eclipse)* fixed: language server now being shutdown correctly when used by new Spring Symbols view
-   *(Eclipse)* fixed: it is possible now to install the Spring Tools 4 into an existing Eclipse via the Spring Tools 4 p2 repo only - the main Eclipse update site doesn't have to be enabled anymore ([#497](https://github.com/spring-projects/sts4/issues/497))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-07-30-471-release-incl-language-servers-version-1200](https://github.com/spring-projects/sts4/wiki/Changelog#2020-07-30-471-release-incl-language-servers-version-1200)

Spring Tools 4.7.2 is scheduled to be released in late August 2020.

Enjoy!
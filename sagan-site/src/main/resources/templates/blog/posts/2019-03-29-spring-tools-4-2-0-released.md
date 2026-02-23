---
title: Spring Tools 4.2.0 released
source: https://spring.io/blog/2019/03/29/spring-tools-4-2-0-released
scraped: 2026-02-23T14:53:54.565Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  March 29, 2019 | 2 Comments
---

# Spring Tools 4.2.0 released

_Releases | Martin Lippert |  March 29, 2019 | 2 Comments_

Dear Spring Community,

I am happy to announce the 4.2.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Atom.

Highlights from this release include:

-   *(Spring Boot)* new: Allow configuration of VM arguments for LSP process "PropertiesLauncher" ([#211](https://github.com/spring-projects/sts4/issues/211))
-   *(Spring Boot)* performance: major performance improvements to symbol indexing infrastructure by caching created symbols across language server starts
-   *(Spring Boot)* performance: replaced internal type indexing with communication to JDT (language server) to save time and memory spend for keeping our own type index
-   *(Eclipse)* new: distribution updated to Eclipse 2019-03
-   *(Eclipse)* new: enables Spring JMX support now by default in Spring Boot launch configs
-   various additional bug fixes and improvements

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Atom, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2019-03-28-420-release](https://github.com/spring-projects/sts4/wiki/Changelog#2019-03-28-420-release)

Spring Tools 4.2.1 is scheduled to be released in late April 2019.

Enjoy!
---
title: Spring Tools 4.1.2 released
source: https://spring.io/blog/2019/02/22/spring-tools-4-1-2-released
scraped: 2026-02-23T14:57:10.791Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  February 22, 2019 | 1 Comment
---

# Spring Tools 4.1.2 released

_Releases | Martin Lippert |  February 22, 2019 | 1 Comment_

Dear Spring Community,

I am happy to announce the 4.1.2 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Atom.

Highlights from this release include:

-   *(Spring Boot)* new: live hover information for bean wirings now supports war-packaged boot apps running in a local server installation
-   *(Spring Boot)* new: live hover information for `@Value` annotations ([#177](https://github.com/spring-projects/sts4/issues/177))
-   *(Spring Boot)* new: bean symbols from XML config files now include exact location information
-   *(Spring Boot)* fixed: navigate to resource in live hovers for apps running on CF works again
-   *(Spring Boot)* fixed: search for symbols in project now happens on the server side to avoid no project-related symbols showing up on the client side before you start typing in a query
-   *(Spring Boot)* performance: improvement to further reduce the CPU load when checking processes for live hovers ([#140](https://github.com/spring-projects/sts4/issues/140))
-   *(Spring Boot)* performance: the language server doesn't trigger a full source and javadoc download for Maven projects anymore
-   *(Concourse)* new: support for hierarchical symbols in file added, produces nice outline view information now
-   *(Concourse)* new: support for YAML anchors, references, extend added ([#58](https://github.com/spring-projects/sts4/issues/58))
-   *(Eclipse)* new: quick text search can be switched to non-modal mode ([#189](https://github.com/spring-projects/sts4/issues/189))
-   *(Eclipse)* new: quick text search allows results to be filtered for certain file types ([#185](https://github.com/spring-projects/sts4/issues/185))
-   *(Eclipse)* fixed: startup performance regression found in early builds on Eclipse 4.11
-   various additional bug fixes and improvements

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Atom, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2019-02-21-412-release](https://github.com/spring-projects/sts4/wiki/Changelog#2019-02-21-412-release)

Spring Tools 4.2.0 is scheduled to be released in late March 2019 (including an update to Eclipse 2019-03).

Enjoy!
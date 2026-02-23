---
title: Spring Tools 4.3.1 released
source: https://spring.io/blog/2019/07/12/spring-tools-4-3-1-released
scraped: 2026-02-23T14:41:45.948Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  July 12, 2019 | 1 Comment
---

# Spring Tools 4.3.1 released

_Releases | Martin Lippert |  July 12, 2019 | 1 Comment_

Dear Spring Community,

I am happy to announce the 4.3.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(all language servers)* performance: further improvements to the language server startup time
-   *(Spring Boot)* fixed: wrong error markers in properties files ([#314](https://github.com/spring-projects/sts4/issues/314))
-   *(VS Code)* fixed: vscode goto definition error with lsp ([#309](https://github.com/spring-projects/sts4/issues/309))
-   *(Eclipse)* fixed: STS4 can now be installed again into an existing Eclipse install when running on JDK8
-   *(Eclipse)* fixed: deadlock when starting up the Spring Boot language server for workspaces with many projects
-   *(Eclipse)* fixed: cannot launch apps in boot dashboard anymore when using early builds of Eclipse 2019-09 (4.13)
-   *(Eclipse)* improved, but not completely fixed yet: freeze when opening pom.xml file - if you still experience slowness here, please apply the workaround as documented in the issues comment ([comment on #314](https://github.com/spring-projects/sts4/issues/318#issuecomment-510851757))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2019-07-12-431-release](https://github.com/spring-projects/sts4/wiki/Changelog#2019-07-12-431-release)

Spring Tools 4.3.2 is scheduled to be released in late August 2019.

Enjoy!
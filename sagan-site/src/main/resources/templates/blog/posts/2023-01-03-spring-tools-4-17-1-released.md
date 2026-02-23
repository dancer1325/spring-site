---
title: Spring Tools 4.17.1 released
source: https://spring.io/blog/2023/01/03/spring-tools-4-17-1-released
scraped: 2026-02-23T10:19:31.072Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  January 03, 2023 | 2 Comments
---

# Spring Tools 4.17.1 released

_Releases | Martin Lippert |  January 03, 2023 | 2 Comments_

Dear Spring Community,

I am happy to announce the 4.17.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#fixes-and-improvements)fixes and improvements

-   *(Spring Boot)* fixed: Eclipse STS 4.17 takes 96 % processor time on Intel i9 ([#934](https://github.com/spring-projects/sts4/issues/934))
-   *(Spring Boot)* fixed: BootLanguageServerBootApp class is taking all available cpu continuously ([#932](https://github.com/spring-projects/sts4/issues/932))
-   *(Spring Boot)* fixed: OpenRewrite unchecked, but always Language Server Background Job(Loading Rewrite Recipes) ([#925](https://github.com/spring-projects/sts4/issues/925))
-   *(Spring Boot)* fixed: \[validation\] spring.factories EnableAutoConfiguration key for boot 3.0 ignores 'on' setting ([#917](https://github.com/spring-projects/sts4/issues/917))
-   *(VSCode)* fixed: \[vscode\] Boot LS is broken if Java LS launch mode is 'Hybrid' ([#919](https://github.com/spring-projects/sts4/issues/919))

#### [](#known-issues)known issues

-   *(Spring Boot)*: The newly introduced additional reconciling for Java source files which is used to show up additional validations and quick fixes can cause increased memory and CPU consumption. In case you stumble upon issues in this area, feel free to disable the reconciling via `Preferences -> Extensions -> Spring Boot Tools -> Open Rewrite` (in VSCode) or `Preferences -> Language Servers -> Spring Language Servers -> Spring Boot Language Server -> Open Rewrite` (in Eclipse).

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2023-01-03-4171-release-incl-language-servers-version-1430](https://github.com/spring-projects/sts4/wiki/Changelog#2023-01-03-4171-release-incl-language-servers-version-1430)

Spring Tools 4.17.2 is scheduled to be released in early February 2023.

Enjoy!
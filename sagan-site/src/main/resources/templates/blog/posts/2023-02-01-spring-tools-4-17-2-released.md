---
title: Spring Tools 4.17.2 released
source: https://spring.io/blog/2023/02/01/spring-tools-4-17-2-released
scraped: 2026-02-23T10:14:10.747Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  February 01, 2023 | 0 Comments
---

# Spring Tools 4.17.2 released

_Releases | Martin Lippert |  February 01, 2023 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.17.2 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#updates-to-the-spring-tools-4-for-eclipse-distribution)updates to the Spring Tools 4 for Eclipse distribution

-   early-access builds for upcoming Eclipse 2023-03 release available via update site

#### [](#fixes-and-improvements)fixes and improvements

-   *(Spring Boot)* fixed: \[symbols\] do not auto-limit the result of the workspace symbol request ([#915](https://github.com/spring-projects/sts4/issues/915))
-   *(Spring Boot)* fixed: Unit test MavenProjectParser ([#918](https://github.com/spring-projects/sts4/issues/918))
-   *(Spring Boot)* fixed: Give user more information about what is "java sources reconciling" ([#920](https://github.com/spring-projects/sts4/issues/920))
-   *(Spring Boot)* fixed: \[Java-17\] Enable jdt.ls.commons.test tests to execute in the maven build ([#928](https://github.com/spring-projects/sts4/issues/928))
-   *(Spring Boot)* fixed: update generated parser for Java properties with latest ANTLR runtime version ([#946](https://github.com/spring-projects/sts4/issues/946))
-   *(Spring Boot)* fixed: Bad Escape exception showing up in log ([#950](https://github.com/spring-projects/sts4/issues/950))
-   *(Spring Boot)* fixed: various exceptions while reconciling ([#951](https://github.com/spring-projects/sts4/issues/951))
-   *(Spring Boot)* fixed: NPE from OpenRewrite Java Parser - Cannot read field "info" because "env" is null ([#952](https://github.com/spring-projects/sts4/issues/952))
-   *(Spring Boot)* fixed: Unknown property error shown in application.yml when using java records ([#955](https://github.com/spring-projects/sts4/issues/955))
-   *(Spring Boot)* fixed: \[upgrading\] running upgrade recipe for Spring Boot 3 causes exception ([#958](https://github.com/spring-projects/sts4/issues/958))
-   *(VSCode)* fixed: Is it feasible to drop the activation event onLanguage:xml? ([#926](https://github.com/spring-projects/sts4/issues/926))
-   *(VSCode)* fixed: Error: command 'sts.vscode-spring-boot.enableClasspathListening' not found ([#939](https://github.com/spring-projects/sts4/issues/939))
-   *(Eclipse)* fixed: "Not properly disposed SWT resource" was caused Spring Starter Project ([#797](https://github.com/spring-projects/sts4/issues/797))
-   *(Eclipse)* fixed: BadLocationException shows up in error log view ([#937](https://github.com/spring-projects/sts4/issues/937))
-   *(Eclipse)* fixed: set focus on name field in starters wizard ([#943](https://github.com/spring-projects/sts4/issues/943))
-   *(Eclipse)* fixed: Could not resolve module: org.springframework.tooling.ls.eclipse.gotosymbol ([#962](https://github.com/spring-projects/sts4/issues/962))
-   *(Concourse)* fixed: Add instance\_vars to Concourse schema ([#942](https://github.com/spring-projects/sts4/issues/942))
-   *(Concourse)* fixed: Add var\_sources to Concourse schema ([#944](https://github.com/spring-projects/sts4/issues/944))

#### [](#known-issues)known issues

-   *(Spring Boot)*: The newly introduced additional reconciling for Java source files which is used to show up additional validations and quick fixes can cause increased memory and CPU consumption. In case you stumble upon issues in this area, feel free to disable the reconciling via `Preferences -> Extensions -> Spring Boot Tools -> Open Rewrite` (in VSCode) or `Preferences -> Language Servers -> Spring Language Servers -> Spring Boot Language Server -> Open Rewrite` (in Eclipse).
-   *(Eclipse)*: Due to a bug in the Maven Integration for Eclipse, you might some across the problem that resource files are no longer copied into the target directories ([#929](https://github.com/spring-projects/sts4/issues/929)). Unfortunately there is no release of the Maven Integration for Eclipse available yet that contains a fix for the issue. You can workaround this my manually triggering a `Maven -> package` build from within Eclipse or by installing the latest snapshot of the Maven Integration for Eclipse (as described in the issue).

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2023-02-01-4172-release-incl-language-servers-version-1440](https://github.com/spring-projects/sts4/wiki/Changelog#2023-02-01-4172-release-incl-language-servers-version-1440)

Spring Tools 4.18.0 is scheduled to be released in late March 2023.

Enjoy!
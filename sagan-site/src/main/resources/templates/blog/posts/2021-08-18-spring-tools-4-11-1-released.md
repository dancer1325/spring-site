---
title: Spring Tools 4.11.1 released
source: https://spring.io/blog/2021/08/18/spring-tools-4-11-1-released
scraped: 2026-02-23T13:16:16.041Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  August 18, 2021 | 0 Comments
---

# Spring Tools 4.11.1 released

_Releases | Martin Lippert |  August 18, 2021 | 0 Comments_

ear Spring Community,

I am happy to announce the 4.11.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#fixes-in-this-release)Fixes in this release

-   *(VS Code, Spring Boot)* fixed: \[codespaces\] spring boot extension starting up multiple times in Codespaces setting ([#669](https://github.com/spring-projects/sts4/issues/669))
-   *(VS Code, Spring Boot)* fixed: \[codespaces\] spring boot extension doesn't find the right JDK when connecting to a codespace ([#670](https://github.com/spring-projects/sts4/issues/670))
-   *(VS Code, Spring Boot)* fixed: JAVA\_Home should be right but still shows "Note Java 8 can still be used in your own projects" ([#664](https://github.com/spring-projects/sts4/issues/664))
-   *(Eclipse)* improvement: progress view shows many AsyncLiveExpression refresh messages and doesn't respond anymore ([#653](https://github.com/spring-projects/sts4/issues/653))
-   *(Eclipse)* improvement: latest CI builds do not show port of running app anymore ([#659](https://github.com/spring-projects/sts4/issues/659))
-   *(Concourse)* improvement: Property 'commit\_message' not recognized for semver resources ([#655](https://github.com/spring-projects/sts4/issues/655))
-   *(Concourse)* improvement: GitResource schema, add missing properties ([#671](https://github.com/spring-projects/sts4/issues/671))
-   *(Concourse)* improvement: Unknown property 'fetch\_tags' for type 'GitSource'(YamlSchemaProblem) ([#668](https://github.com/spring-projects/sts4/issues/668))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Spring Tools 4.12.0 is scheduled to be released in late September 2021.

Enjoy!
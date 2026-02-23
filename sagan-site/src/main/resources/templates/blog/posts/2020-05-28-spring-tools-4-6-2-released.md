---
title: Spring Tools 4.6.2 released
source: https://spring.io/blog/2020/05/28/spring-tools-4-6-2-released
scraped: 2026-02-23T13:59:10.263Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  May 28, 2020 | 10 Comments
---

# Spring Tools 4.6.2 released

_Releases | Martin Lippert |  May 28, 2020 | 10 Comments_

Dear Spring Community,

I am happy to announce the 4.6.2 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Spring Boot)* improvement: additional check to auto-connect live hovers only when actuators are on the project classpath ([#450](https://github.com/spring-projects/sts4/issues/450))
-   *(Spring Boot)* improvement: added content assist for keys that exist in YAML and properties files ([#427](https://github.com/spring-projects/sts4/issues/427))
-   *(Spring Boot)* improvement: Yaml editor gives error when using @..@ placeholders ([#190](https://github.com/spring-projects/sts4/issues/190))
-   *(Spring Boot)* bugfix: super type hierarchy lookup might fail
-   *(Spring Boot)* bugfix: quickly restarting app caused error popup from live hover mechanism to show up
-   *(Eclipse)* improvement: early access version of new Spring symbols view
-   *(Eclipse)* performance: fixed several issues that could have caused slowing down source code editing in the Java editor ([#435](https://github.com/spring-projects/sts4/issues/435)) ([#405](https://github.com/spring-projects/sts4/issues/405))
-   *(Eclipse)* improvement: manually registered servlet mapping is missing from live request mapping tab in boot dashboard ([#452](https://github.com/spring-projects/sts4/issues/452))
-   *(Eclipse)* bugfix: fixed compatibility issue with newer m2e versions that ship with Eclipse 2020-06
-   *(Eclipse)* bugfix: fixed lots of NPE when scrolling down in live hovers
-   *(VSCode/Theia)* bugfix: Fix null reference when no JVM was found - contributed by [@tfriem](https://github.com/tfriem)
-   *(Concourse)* improvement: add support for set-pipeline step ([#464](https://github.com/spring-projects/sts4/issues/464)) - contributed by [@deepakmohanakrishnan1984](https://github.com/deepakmohanakrishnan1984)

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-05-28-462-release](https://github.com/spring-projects/sts4/wiki/Changelog#2020-05-28-462-release)

Spring Tools 4.7.0 is scheduled to be released in late June 2020.

Enjoy!
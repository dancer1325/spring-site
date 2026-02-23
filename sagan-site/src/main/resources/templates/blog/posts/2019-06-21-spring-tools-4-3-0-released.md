---
title: Spring Tools 4.3.0 released
source: https://spring.io/blog/2019/06/21/spring-tools-4-3-0-released
scraped: 2026-02-23T14:43:21.714Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  June 21, 2019 | 0 Comments
---

# Spring Tools 4.3.0 released

_Releases | Martin Lippert |  June 21, 2019 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.3.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Eclipse Theia vs Atom)* Eclipse Theia now officially supported, Atom support deprecated
-   *(Spring Boot)* improvement: project classpath notifications now happen in batch on startup to further optimize performance and job load on the Eclipse side
-   *(Spring Boot)* improvement: symbols are now being re-created if dependent types change
-   *(Spring Boot)* fixed: Slow code completion takes more than a 1 sec. ([#293](https://github.com/spring-projects/sts4/issues/293))
-   *(Spring Boot)* fixed: content-assist for Spring XML config files now working again in VS Code and Theia
-   *(Spring Boot)* fixed: Anonymous inner type beans don't have boot hints
-   *(CF Manifest)* fixed: CF manifest editor supports manifest files with number of instances set to zero
-   *(Concourse)* fixed: Added support for `vars` property in task step
-   *(Eclipse)* fixed: quickly restarting apps in boot dashboard multiple times could cause failures

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2019-06-21-430-release](https://github.com/spring-projects/sts4/wiki/Changelog#2019-06-21-430-release)

Spring Tools 4.3.1 is scheduled to be released in late July 2019.

Enjoy!

*P.S.: Due to a system outage, the update to the tools web page will take a little longer, please go to [https://github.com/spring-projects/sts4/wiki/Installation](https://github.com/spring-projects/sts4/wiki/Installation) in the meantime for details about the new Theia packages.*
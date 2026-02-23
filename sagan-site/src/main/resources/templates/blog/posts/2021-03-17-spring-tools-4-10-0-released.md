---
title: Spring Tools 4.10.0 released
source: https://spring.io/blog/2021/03/17/spring-tools-4-10-0-released
scraped: 2026-02-23T13:29:46.287Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  March 17, 2021 | 3 Comments
---

# Spring Tools 4.10.0 released

_Releases | Martin Lippert |  March 17, 2021 | 3 Comments_

Dear Spring Community,

I am happy to announce the 4.10.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2021-03 release

#### [](#reminder)reminder

-   the Eclipse-based distribution of the Spring Tools 4 requires a JDK11 (or newer) to run on
-   ships with an embedded JDK15 runtime, no need to install or configure a specific JDK to run the IDE on anymore

#### [](#additional-changes)additional changes

-   *(Spring Boot)* enhancement: `.sts4` dir location now configurable ([#601](https://github.com/spring-projects/sts4/issues/601))
-   *(Spring Boot)* fixed: sometimes live hovers do not disappear ([#609](https://github.com/spring-projects/sts4/issues/609))
-   *(Eclipse)* fixed: debugger didn't connect automatically to apps deployed to docker from the boot dashboard
-   *(Eclipse)* fixed: STS 4.8.0 template proposals invalid ([#579](https://github.com/spring-projects/sts4/issues/579))
-   *(Eclipse)* fixed: Fresh sts-4.9.0 starts with errors - no way to add Task repository ([#606](https://github.com/spring-projects/sts4/issues/606))
-   *(Eclipse)* fixed: Error on installing Mylyn JIRA Connector in STS 4.9.0 ([#599](https://github.com/spring-projects/sts4/issues/599))
-   *(Eclipse)* fixed: Duplicate com.sun.xml.bind installed screw other plugins ([#588](https://github.com/spring-projects/sts4/issues/588))
-   *(Eclipse)* update: remove WTP-based HTML tooling from Spring Tools 4 distribution ([#572](https://github.com/spring-projects/sts4/issues/572))
-   *(CF Manifest)* fixed: Error writing config: `rename ~\.cf\temp-config025076595 ~\.cf\config.json: Access is denied.` ([#577](https://github.com/spring-projects/sts4/issues/577))
-   *(OpenVSX)* fixed: the Spring extensions are back on the OpenVSX marketplace ([#583](https://github.com/spring-projects/sts4/issues/583))
-   *(Concourse)* improvement: Add display property to pipeline schema ([#607](https://github.com/spring-projects/sts4/pull/607)) - contributed by [@jghiloni](https://github.com/jghiloni)

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2021-03-17-4100-release-incl-language-servers-version-1250](https://github.com/spring-projects/sts4/wiki/Changelog#2021-03-17-4100-release-incl-language-servers-version-1250)

Spring Tools 4.10.1 is scheduled to be released in late April 2021.

Enjoy!
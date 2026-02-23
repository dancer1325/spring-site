---
title: Spring Tools 4.6.1 released
source: https://spring.io/blog/2020/04/22/spring-tools-4-6-1-released
scraped: 2026-02-23T14:04:08.565Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  April 22, 2020 | 0 Comments
---

# Spring Tools 4.6.1 released

_Releases | Martin Lippert |  April 22, 2020 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.6.1 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Spring Boot)* improvement: Spring yaml validation doesn't understand the "<<:" syntax ([#440](https://github.com/spring-projects/sts4/issues/440))
-   *(Spring Boot)* improvement: YAML Property completion: Superclass properties not detected in case of List or Map ([#449](https://github.com/spring-projects/sts4/issues/449))
-   *(Spring Boot)* improvement: improved performance for content-assist for Spring XML config files
-   *(Spring Boot)* bugfix: Quick Fix for unknown properties broken ([#442](https://github.com/spring-projects/sts4/issues/442))
-   *(Eclipse)* improvement: early access builds on Eclipse 2020-06 milestone builds available
-   *(Eclipse)* improvement: reduced timeout for ls-based content-assist for the Java Editor, so broken or slow language server behavior should not damage JDT content-assist experience anymore
-   *(Eclipse)* improvement: vastly reduced communication traffic around classpath changes between Eclipse and the Spring Boot language server
-   *(Eclipse)* improvement: async retrieval of properties of remote apps in boot dashboard to avoid UI freezes or delays
-   *(Eclipse)* bugfix: org.eclipse.mylyn.wikitext.markdown required to update to 4.6.0 ([#429](https://github.com/spring-projects/sts4/issues/429))
-   *(Eclipse)* bugfix: remote targets in boot dashboard always re-appeared after deleting them
-   *(Eclipse)* bugfix: errors being logged at language server startup, related LSP4E rename handler
-   *(VSCode)*: Visual Studio Code extensions now available from the [https://open-vsx.org](https://open-vsx.org) marketplace

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-04-23-461-release](https://github.com/spring-projects/sts4/wiki/Changelog#2020-04-23-461-release)

Spring Tools 4.6.2 is scheduled to be released in late May 2020.

Enjoy and stay healthy!
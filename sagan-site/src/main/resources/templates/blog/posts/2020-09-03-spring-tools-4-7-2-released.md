---
title: Spring Tools 4.7.2 released
source: https://spring.io/blog/2020/09/03/spring-tools-4-7-2-released
scraped: 2026-02-23T13:49:44.101Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  September 03, 2020 | 2 Comments
---

# Spring Tools 4.7.2 released

_Releases | Martin Lippert |  September 03, 2020 | 2 Comments_

Dear Spring Community,

I am happy to announce the 4.7.2 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

Highlights from this release include:

-   *(Eclipse)* new: this releases introduces a completely new wizard in Eclipse to add Spring Boot starter modules to existing projects. Take a look at the user guide section about it to learn all about this new and way more flexible way to add modules to your Spring Boot projects.
-   *(Eclipse)* new: this releases introduces an experimental early version of support for the Spring Boot OCI image building support in combination with Docker. You can now use the Spring Boot Dashboard in Spring Tools 4 for Eclipse to create images and run them on docker, debug the app on Docker and use Spring Boot Devtools on Docker - and all this is just one click away. Check out the preliminary section about it in the user guide.
-   *(Eclipse)* enhancement: Spring Tools 4 for Eclipse distributions now have the standard Eclipse tooling for Docker pre-installed
-   *(Eclipse)* fixed: wizard to grab Spring guide projects now shows errors that happen while downloading the projects in dialog title section
-   *(Eclipse)* fixed: live hover caused exceptions in certain situations, fix contributed to lsp4e project
-   *(Eclipse)* enhancement: deploy Java 11 based Spring apps to Cloud Foundry now easier via the boot dashboard

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2020-08-27-472-release-incl-language-servers-version-1210](https://github.com/spring-projects/sts4/wiki/Changelog#2020-08-27-472-release-incl-language-servers-version-1210)

Spring Tools 4.8.0 is scheduled to be released in late September 2020.

Enjoy!
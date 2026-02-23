---
title: Spring Tools 4.13.0 released
source: https://spring.io/blog/2021/12/08/spring-tools-4-13-0-released
scraped: 2026-02-23T13:01:33.660Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  December 08, 2021 | 1 Comment
---

# Spring Tools 4.13.0 released

_Releases | Martin Lippert |  December 08, 2021 | 1 Comment_

Dear Spring Community,

I am happy to announce the 4.13.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2021-12 release (including support for Java 17) ([new and noteworthy](https://www.eclipse.org/eclipseide/2021-12/))
-   builds for Apple Silicon platform (ARM M1) are available now from the regular download page

#### [](#additional-changes)additional changes

-   *(Spring Boot)* fixed: STS 4.12.0 (for eclipse) \*.yml can't automatic prompt ([#690](https://github.com/spring-projects/sts4/issues/690))
-   *(Spring Boot)* fixed: A StackOverFlow error for serializable Kotlin data class for autocompletion in the Eclipse IDE ([#693](https://github.com/spring-projects/sts4/issues/693))
-   *(Eclipse)* fixed: Typescript comparison: An internal error occurred during: "LSP4E Linked Editing Highlight" ([#700](https://github.com/spring-projects/sts4/issues/700))
-   *(Eclipse)* fixed: js syntax highlight disabled by STS4 ([#702](https://github.com/spring-projects/sts4/issues/702))
-   *(Eclipse)* fixed: Cannot copy/paste from ANSI console without escape sequences ([#667](https://github.com/spring-projects/sts4/issues/667)) - fixed in ANSI Color Console project thanks to @mihnita

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

If you are updating an existing Spring Tools 4 installation, please make sure you to prepare your installation properly this time: [https://twitter.com/springtools4/status/1468587842838355980](https://twitter.com/springtools4/status/1468587842838355980)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2021-12-08-4130-release-incl-language-servers-version-1290](https://github.com/spring-projects/sts4/wiki/Changelog#2021-12-08-4130-release-incl-language-servers-version-1290)

Spring Tools 4.13.1 is scheduled to be released in early Feb 2022.

Enjoy!
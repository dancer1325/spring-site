---
title: Spring Tools 4.15.0 released
source: https://spring.io/blog/2022/06/15/spring-tools-4-15-0-released
scraped: 2026-02-23T12:37:50.262Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  June 15, 2022 | 0 Comments
---

# Spring Tools 4.15.0 released

_Releases | Martin Lippert |  June 15, 2022 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.15.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2022-06 release ([new and noteworthy](https://www.eclipse.org/eclipseide/2022-06/))

#### [](#fixes-and-improvements)fixes and improvements

-   *(Spring Boot)* fixed: vscode-sts: an edge case of workspace symbol for @PutMapping ([#781](https://github.com/spring-projects/sts4/issues/781))
-   *(VSCode)* fixed: Failed to refresh live data from process 12704 - com.xxxx.xx.xxx.BillingServiceApp after retries: 10 ([#748](https://github.com/spring-projects/sts4/issues/748))
-   *(Eclipse)* fixed: The Spring Boot Language Server is not immediately shutdown after closing the last open editor to avoid the need to restart the server when you open the next file (related to [#568](https://github.com/spring-projects/sts4/issues/568))
-   *(Eclipse)* fixed: When opening symbols, open the compilation unit from the relevant project ([#769](https://github.com/spring-projects/sts4/issues/769))
-   *(Eclipse)* fixed: The issue with the internal web browser not being able to open HTTP URLs on macOS got fixed. If you prefer to use the internal browser instead of an external one, you can make that switch in the preferences.
-   *(Concourse)* fixed: Update Concourse registry-image schema ([#777](https://github.com/spring-projects/sts4/issues/777))
-   *(Concourse)* fixed: Add registry\_mirror & across as a known properties ([#752](https://github.com/spring-projects/sts4/issues/752))

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2022-06-15-4150-release-incl-language-servers-version-1340](https://github.com/spring-projects/sts4/wiki/Changelog#2022-06-15-4150-release-incl-language-servers-version-1340)

Spring Tools 4.15.1 is scheduled to be released in early August 2022.

Enjoy!
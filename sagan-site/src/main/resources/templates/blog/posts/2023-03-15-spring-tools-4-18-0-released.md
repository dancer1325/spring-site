---
title: Spring Tools 4.18.0 released
source: https://spring.io/blog/2023/03/15/spring-tools-4-18-0-released
scraped: 2026-02-23T10:03:11.551Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  March 15, 2023 | 0 Comments
---

# Spring Tools 4.18.0 released

_Releases | Martin Lippert |  March 15, 2023 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.18.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#updates-to-the-spring-tools-4-for-eclipse-distribution)updates to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2023-03 release ([new and noteworthy](https://eclipseide.org/release/noteworthy/))

#### [](#important-highlights)important highlights

-   *(Spring Boot):* new and vastly improved content-assist for Spring Data repository query methods (thanks to contributions from @danthe1st)
-   *(Spring Boot):* the additional reconciling of Spring Boot projects to show Spring specific validations, outdated versions and more, now reports progress, runs faster, and uses less memory - please consider using this and tell us about your experiences and if you hit issues while having this feature enabled
-   *(VSCode):* fixed an extremely annoying issue that caused regular Java content-assist in VSCode to stop working after a short while
-   *(Eclipse):* a bug in m2e got fixed and is included in this release, which caused resource files (e.g. `application.properties`) to not be copied into the target folder anymore. This works again and automatically copies your changed `application.properties` file to the target folder, so that those changes are taken into account when running the project automatically again

Detailed changes can be found in the release notes: [https://github.com/spring-projects/sts4/releases/tag/4.18.0.RELEASE](https://github.com/spring-projects/sts4/releases/tag/4.18.0.RELEASE)

#### [](#downloads)downloads

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Spring Tools 4.18.1 is scheduled to be released in late April 2023.

Enjoy!
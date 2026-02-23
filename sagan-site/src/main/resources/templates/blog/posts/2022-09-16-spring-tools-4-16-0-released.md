---
title: Spring Tools 4.16.0 released
source: https://spring.io/blog/2022/09/16/spring-tools-4-16-0-released
scraped: 2026-02-23T10:41:12.852Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  September 16, 2022 | 0 Comments
---

# Spring Tools 4.16.0 released

_Releases | Martin Lippert |  September 16, 2022 | 0 Comments_

Dear Spring Community,

I am happy to announce the 4.16.0 release of the Spring Tools 4 for Eclipse, Visual Studio Code, and Theia.

#### [](#major-changes-to-the-spring-tools-4-for-eclipse-distribution)major changes to the Spring Tools 4 for Eclipse distribution

-   updated to Eclipse 2022-09 release ([new and noteworthy](https://www.eclipse.org/eclipseide/2022-09/))
-   new distribution build for Linux on ARM included now (experimental) - [downloads are here](https://github.com/spring-projects/sts4/wiki/Previous-Versions)
-   m2e 2.0.5 release included in distribution builds for Eclipse

#### [](#important-note-for-upgrading-from-a-previous-installation-on-eclipse)important note for upgrading from a previous installation on Eclipse

-   Due to the major update to m2e 2.0 that comes with the Eclipse 2022-09 release, several additional third-party m2e connector extensions that the Spring Tools 4 for Eclipse distribution had installed in the past are no longer compatible. This prevents the automatic update of installations of Spring Tools prior to 4.16.0 to the new release. There are two options how to mitigate this:
    -   start with a fresh install of Spring Tools 4.16.0 for Eclipse
    -   go to the `Preferences -> Installation Details` and uninstall the following features via the `Uninstall` button, then restart the IDE, do a `Check for Updates`, and do the upgrade.
        -   `Maven Integration for Eclipse JDT Annotation Processor Toolkit`
        -   `m2e connector for mavenarchiver pom properties`
        -   `m2e connector for build-helper-maven-plugin`
-   Eclipse 2022-09 comes with ANSI coloring for the console view built-in, so we don't need to third-party extension `Ansi Console` anymore. If you upgrade an existing installation, please uninstall this extension prior or after upgrading Spring Tools 4 for Eclipse.

#### [](#fixes-and-improvements)fixes and improvements

-   *(Spring Boot)* fixed: Workspace symbol null on custom annotations ([#818](https://github.com/spring-projects/sts4/issues/818))
-   *(Spring Boot)* fixed: organize imports causes communication issues with the language server ([#806](https://github.com/spring-projects/sts4/issues/806))
-   *(Spring Boot)* enhancement: Quick fix action to refactor field injection to constructor injection ([#522](https://github.com/spring-projects/sts4/issues/522))
-   *(Spring Boot)* fixed: Workspace symbol null on custom annotations ([#818](https://github.com/spring-projects/sts4/issues/818))
-   *(Eclipse)* enhancement: adapt boot launch support to new platform-enabled ansi console coloring support ([#823](https://github.com/spring-projects/sts4/issues/823))
-   *(Eclipse)* fixed: cleanup/remove more entries from Error Log ([#802](https://github.com/spring-projects/sts4/issues/802))
-   *(Eclipse)* fixed: switch live hovers in Eclipse to direct-connect after launch ([#832](https://github.com/spring-projects/sts4/issues/832))
-   *(Eclipse)* fixed: add switch in boot launch config to enable/disable automatic live hover connect ([#843](https://github.com/spring-projects/sts4/issues/843))
-   *(Eclipse)* fixed: live hover auto-connect on launch should check for actuators ([#842](https://github.com/spring-projects/sts4/issues/842))
-   *(Eclipse)* enhancement: spring tool suite linux arm distribution ([#841](https://github.com/spring-projects/sts4/issues/841))
-   *(VSCode)* fixed: Extension never activates, throwing error "Header must provide a Content-Length property" ([#811](https://github.com/spring-projects/sts4/issues/811))
-   *(Concourse)* fixed: Concourse extension doesn't know about "check\_every: never" for a resource ([#816](https://github.com/spring-projects/sts4/issues/816))
-   *(Concourse)* fixed: Concourse extension doesn't know about "depth" for a semver resource ([#830](https://github.com/spring-projects/sts4/issues/830))
-   *(Concourse)* fixed: Concourse extension doesn't recognize URL for "registry\_mirror" with a docker-image resource ([#831](https://github.com/spring-projects/sts4/issues/831))
-   *(Concourse)* fixed: vscode-concourse: support both .yml and .yaml files ([#838](https://github.com/spring-projects/sts4/issues/838)) - contributed by [bmalehorn](https://github.com/bmalehorn)
-   *(Concourse)* fixed: vscode-concourse: add language icon for pipelines & tasks ([#839](https://github.com/spring-projects/sts4/issues/839)) - contributed by [bmalehorn](https://github.com/bmalehorn)

To download the distribution for Eclipse and find links to the marketplace entries for Visual Studio Code and Theia, please go visit:

-   Spring Tools 4: [https://spring.io/tools/](https://spring.io/tools/)

Detailed changes can be found here: [https://github.com/spring-projects/sts4/wiki/Changelog#2022-09-16-4160-release-incl-language-servers-version-1390](https://github.com/spring-projects/sts4/wiki/Changelog#2022-09-16-4160-release-incl-language-servers-version-1390)

Spring Tools 4.16.1 is scheduled to be released in late October 2022.

Enjoy!
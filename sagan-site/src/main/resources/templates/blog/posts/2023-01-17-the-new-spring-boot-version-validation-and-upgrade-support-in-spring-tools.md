---
title: The new Spring Boot version validation and upgrade support in Spring Tools
source: https://spring.io/blog/2023/01/17/the-new-spring-boot-version-validation-and-upgrade-support-in-spring-tools
scraped: 2026-02-23T10:17:00.190Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  January 17, 2023 | 3 Comments
---

# The new Spring Boot version validation and upgrade support in Spring Tools

_Engineering | Martin Lippert |  January 17, 2023 | 3 Comments_

New releases of Spring Boot are being released on a quite frequent schedule and updating your projects to newer versions of Spring Boot is something that many teams and organizations around the globe do as part of their daily work.

Sometimes those upgrades are simple and easy, for example for new patch releases that mostly include changes to fix bugs and address CVEs. In contrast to that, upgrading to a new minor or even a new major version requires more work, including code changes to adapt to new or changed APIs, updating configurations to not use deprecated keys anymore, and more.

Each new minor or major version of Spring therefore ships with a comprehensive guide and documentation about those changes and you can read and follow to upgrade your project. A good example of this is the [new migration guide for upgrading your projects to Spring Boot 3](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide).

## [](#validating-versions-in-your-ide)Validating versions in your IDE

The latest release of the Spring Tools 4.17.1 (and the corresponding Spring Boot Tools for VSCode in version 1.43.0) include a number of experimental features to help you with staying up-to-date with the latest Spring Boot versions, whether it is the latest patch version or the latest and greatest minor and major versions of Spring Boot.

The first notable new experimental feature here is the ability to automatically validate the versions of Spring Boot that you use in your projects in your workspace. The new version validation feature marks your build files as soon as there is a newer patch, minor, or major version available - compared to the version of Spring Boot that you use in your projects. Those markers appear immediately in your problems view directly in your coding environment as soon as a new release becomes available on Maven Central.

![](https://github.com/spring-projects/sts4/wiki/images/Screenshot-Version-Validation-Markers.png)

The version validations will deal with new patch, minor, and major versions independently from each other and you can control the severity of each of those validations. If you would like to ignore new major versions for the moment, just set the preference for new major versions to IGNORE. If you want to flag new patch versions as warnings or even errors, set the preference accordingly. That way, you will not be overwhelmed with version validation markers if you don’t need them and see the ones that you are interested in with the severity level of your choice.

![](https://github.com/spring-projects/sts4/wiki/images/Screenshot-Version-Validation-Preferences.png)

## [](#upgrading-to-newer-versions)Upgrading to newer versions

Validating the versions that you use in your projects is just the first step. As a next step, you might want to actually upgrade your projects to those newer versions. This is where the new experimental upgrade support comes into play.

Quick fixes in your coding environment will show up on those version validations markers, allowing you to directly upgrade to those newer versions - independently of whether this is a newer patch, minor, or major version.

![](https://github.com/spring-projects/sts4/wiki/images/Screenshot-Patch-Upgrade-Quick-Fix.png)

For newer patch versions, those quick fixes will only update the version of the Spring Boot parent in your build file - and nothing else.

For newer minor or major versions, the tooling will not just update the version of your Spring Boot parent. The quick fix will execute a full upgrade recipe that does many of the necessary changes for you automatically - including, for example, code changes, updates for newer property keys, shifting everything to the newer jakarta packages, and more.

This does not guarantee to absolutely do everything that is necessary to upgrade your projects. But it takes care of many of the necessary changes and automates them for you, so that you don’t have to do them manually on your own. So it is meant to help you when upgrading your project, not guaranteeing that it will do absolutely everything.

The quick-fix actions - once invoked - will run in the background and apply all the necessary changes directly to the files of the project. There is - not yet - a dialog showing up that will ask for confirmation whether to really apply those changes to the project. Therefore, we recommend that you keep a version of your project in your local git repository and once the quick-fix action is done, use the various git tools to inspect the changes that were made before committing them.

## [](#more-fine-grained-control)More fine grained control

In addition to the quick fixes for version validations, the tooling gives you the option to execute those upgrades directly via a menu or command palette item. The benefit of this on-demand way of executing those upgrade recipes is that it provides and explains all the detailed steps and changes it will execute in a nice way. And it even allows you to include or exclude certain steps specifically - in case you would like to not let the tooling automatically upgrade certain bits.

![](https://github.com/spring-projects/sts4/wiki/images/Screenshot-Recipe-Details.png)

## [](#limitations)Limitations

Gradle build files are not yet supported when applying the upgrade recipes for projects. While the version validation works for Gradle-based projects as well as many parts of the automated upgrade recipes, modifying the `build.gradle` file itself is not yet supported, but on the roadmap for future releases.

## [](#upgrading-outside-of-your-coding-environment)Upgrading outside of your coding environment

Sometimes you don’t want to run all those project upgrades inside of your coding environment, you might have a huge number of projects that you would like to upgrade in a row, or you would like to be guided through the upgrade process with more documentation and explanations in a step-by-step fashion. This is where the experimental [Spring Boot Migrator project](https://github.com/spring-projects-experimental/spring-boot-migrator) comes into play.

In contrast to the ability to execute recipes as refactorings directly within the coding environment to automate the tedious tasks of a version upgrade, Spring Boot Migrator provides a more holistic approach towards upgrading a project by creating a detailed HTML report. This report contains and describes all the steps you need to follow to upgrade a project from Spring Boot 2.7 to Spring Boot 3.0 - independent of whether those steps can be automated or not. For those that can be automated, the report allows the user to directly execute the corresponding recipe to apply the changes automatically. For those that can’t be automated, the report provides guidance to users of how to remediate a required change.

This frees developers from finding and reading through all release notes of different Spring and Spring Boot projects that might be applicable to their own application.

Beyond that, the Spring Boot Migrator project provides a set of additional features (like a shell application to scan projects, support to convert JEE applications to Spring Boot, convert Mule definitions to Spring Integration, and more).

## [](#behind-the-scenes-openrewrite)Behind the scenes: OpenRewrite

Behind the scenes of those upgrades for Spring Boot, the tools use the [OpenRewrite project](https://github.com/openrewrite) as the foundation, especially the `rewrite-spring` module that contains the implementation for all the automated source code changes that those upgrade recipes execute. So if you would like to learn more about the details from behind the scenes, feel free to take a look.

## [](#outlook)Outlook

The upgrade recipes are far from doing absolutely everything and we will enhance them for future versions. If you have any suggestions, feedback, or enhancement requests, please reach out and share them with us via: [https://github.com/spring-projects/sts4/issues/](https://github.com/spring-projects/sts4/issues/)

## [](#resources)Resources

-   [Spring Tools 4 (for VSCode and Eclipse)](https://spring.io/tools)
-   [Spring Boot Migrator](https://github.com/spring-projects-experimental/spring-boot-migrator)
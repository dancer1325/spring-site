---
title: Getting Started | Working a Getting Started guide with STS
source: https://spring.io/guides/gs/sts
scraped: 2026-02-19T08:00:36.865Z
description: Learn how to import a Getting Started guide with Spring Tool Suite (STS).
---

# Working a Getting Started guide with STS

This guide walks you through using Spring Tool Suite (STS) to build one of the Getting Started guides.

## What you’ll build

You’ll pick a Spring guide and import it into Spring Tool Suite. Then you can read the guide, work on the code, and run the project.

## What you’ll need

-   About 15 minutes
    
-   [Spring Tool Suite (STS)](http://spring.io/tools/sts/all)
    
-   [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html) or later
    

## Installing STS

If you don’t have STS installed yet, visit the link up above. From there, you can download a copy for your platform. To install it simply unpack the downloaded archive.

When you’re done, go ahead and launch STS.

## Importing a Getting Started guide

With STS up and running, open the **Import Spring Getting Started Content** wizard from the **File** menu.

![Import Getting Started Content](https://raw.githubusercontent.com/spring-guides/gs-sts/main/images/1_open_wizard.png)

A pop-up wizard will offer you the chance to search and pick any of the published guides from the Spring website. You can either skim the list, or enter search words to instantly filter the options.\]

The criteria is applied to both the title and the description when offering instant search results. Wildcards are supported.

You can pick either [Maven](/guides/gs/maven) or [Gradle](/guides/gs/gradle) as the build system to use.

You can also decide whether to grab the **initial** code set, **complete** code set, or both. For most projects, the **initial** code set is an empty project, making it possible for you to copy-and-paste your way through a guide. The **complete** code set is all the code from the guide already entered. If you grab both, you can compare your work against the guide’s and see the differences.

Finally, you can have STS open a browser tab to the guide on the website. This will let you work through a guide without having to leave STS.

For the purpose of this guide, enter **rest** into the instant search box. Then pick [Consuming Rest](/guides/gs/consuming-rest). Pick **Maven** for building, and **initial** and **complete** code sets. Also opt to open the web page as shown below:

![Pick a guide](https://raw.githubusercontent.com/spring-guides/gs-sts/main/images/3_wizard.png)

STS will create two new projects in your workspace, import the [Consuming Rest](/guides/gs/consuming-rest) code base (both initial and complete), and open a browser tab inside STS as shown below:

![View the code and the guide](https://raw.githubusercontent.com/spring-guides/gs-sts/main/images/4_after-import.png)

From here, you can walk through the guide and navigate to the code files.

## Summary

Congratulations! You have setup Spring Tool Suite, imported the Consuming Rest getting started guide, and opened a browser tab to walk through it.

## See Also

The following guides may also be helpful:

-   [Working a Getting Started guide with IntelliJ IDEA](https://spring.io/guides/gs/intellij-idea/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-sts)
---
title: Making the most of available resources for Spring Boot
source: https://spring.io/blog/2021/02/04/making-the-most-of-available-resources-for-spring-boot
scraped: 2026-02-23T13:32:44.240Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Madhura Bhave |  February 05, 2021 | 0 Comments
---

# Making the most of available resources for Spring Boot

_Engineering | Madhura Bhave |  February 05, 2021 | 0 Comments_

Whether you’re a long time user of Spring Boot or just getting started with it, there are numerous resources out there that you can leverage. Knowing what’s available for your specific need is not always obvious and this blog post is aimed toward helping you to navigate through these resources.

## [](#learning)[](#learning)Learning

### [](#reference-documentation)[](#reference-documentation)Reference Documentation

As a software developer, you probably already know that reading any project’s documentation can help you save a lot of time and effort. The [Spring Boot reference documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) is a comprehensive document containing everything you need to know about Spring Boot. It is available in multiple formats, multi-page HTML, single-page HTML, and PDF. You can choose the one that suits your needs. The documentation is versioned, with `current` pointing to the latest GA release. Be sure to read the documentation of the version that you are currently on. For example, if you’re on Spring Boot 2.3.8, the reference documentation would be available at [https://docs.spring.io/spring-boot/docs/2.3.8.RELEASE/reference/htmlsingle/](https://docs.spring.io/spring-boot/docs/2.3.8.RELEASE/reference/htmlsingle/).

Spring Boot builds on a number of other projects, each with their own reference documentation. You can find a complete list of these projects and their documentation [here](https://spring.io/projects).

### [](#spring-guides)[](#spring-guides)Spring Guides

The reference documentation is information-oriented and while it contains a wealth of information, it can be a bit overwhelming for newcomers. If you’re looking to get started with Spring Boot or try out specific real-world scenarios, [Spring Guides](https://spring.io/guides/) provide a curated list of hands-on instructions that you can follow.

## [](#upgrading)[](#upgrading)Upgrading

Without the right guidance, upgrading software can be a long and tedious process. On the Spring Boot team, we try to maintain back-compatibility as much as possible but occasionally break things when that is the best option. To minimize upgrade pain, each minor and major release is accompanied with detailed release notes containing upgrade instructions at the top.

### [](#release-notes)[](#release-notes)Release Notes

The release notes are available on the [Spring Boot Wiki](https://github.com/spring-projects/spring-boot/wiki). In order to make the migration as smooth as possible, we recommend not skipping versions. If you are more than one release behind, please make sure that you also review the release notes of the versions that you jumped.

### [](#changelog)[](#changelog)Changelog

If you’re just looking to get a quick glimpse at the list of changes that went into a particular release, every released version is associated with a [changelog](https://github.com/spring-projects/spring-boot/releases).

### [](#planning-an-upgrade)[](#planning-an-upgrade)Planning an upgrade

Depending on the version you are upgrading to, you might need to plan in advance to allocate enough time for the upgrade. Here are some resources that can help with planning:

-   [Spring Boot Support Policy](https://github.com/spring-projects/spring-boot/wiki/Supported-Versions)
    
-   [Upcoming release dates](https://github.com/spring-projects/spring-boot/milestones)
    
-   [Spring release calendar](https://calendar.spring.io/)
    

Additionally, every minor and major release is accompanied with milestone releases. Even if you don’t try out the milestones, you can look at the changelog for the milestone release to get an idea of the amount of changes that you will need to make to your project when upgrading. The release notes are also updated with every milestone release.

## [](#getting-help-from-the-community)[](#getting-help-from-the-community)Getting help from the community

The Spring community is large with lots of helpful people willing to answer questions. If you have trouble with Spring Boot, you can ask questions on the [Spring Boot Gitter](https://gitter.im/spring-projects/spring-boot) channel or on [StackOverflow](https://stackoverflow.com) with the `spring-boot` tag. Before asking your question, it’s a good idea to verify that someone else hasn’t already got an answer to the same question. A simple google search should help with that.

## [](#reporting-issues)[](#reporting-issues)Reporting issues

We like to use the Spring Boot issue tracker for tracking bugs and enhancements. If you think you’ve found a bug in Spring Boot or would like to request an enhancement, you can create a new issue on the [issue tracker](https://github.com/spring-projects/spring-boot/issues). In case you’ve found a bug, attaching a minimal sample to the issue that reproduces the issue is very helpful for the maintainers. A minimal sample can be created by going to [start.spring.io](https://start.spring.io).

We hope that, for most scenarios, you will find what you need in these resources. If you stumble upon a problem in them, or find that something is missing, we would love for you to help us [improve them](https://github.com/spring-projects/spring-boot/issues).
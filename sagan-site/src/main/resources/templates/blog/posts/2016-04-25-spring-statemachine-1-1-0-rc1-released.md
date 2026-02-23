---
title: Spring Statemachine 1.1.0.RC1 Released
source: https://spring.io/blog/2016/04/25/spring-statemachine-1-1-0-rc1-released
scraped: 2026-02-23T19:18:32.027Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  April 25, 2016 | 1 Comment
---

# Spring Statemachine 1.1.0.RC1 Released

_Releases | Janne Valkealahti |  April 25, 2016 | 1 Comment_

We’re pleased to announce a first release candidate of [Spring Statemachine](https://projects.spring.io/spring-statemachine/) 1.1.0.RC1. The release can be found in the [Spring Milestone repository](https://github.com/spring-projects/spring-framework/wiki/Spring-repository-FAQ) [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

What we got into this first release candidate:

-   Fixed 20 tickets.
-   Usual bug fixes.
-   New junction, exit/entry pseudostates.
-   New uml modeling support based on Eclipse Papyrus

Full changes as usual is available from [changelog](https://github.com/spring-projects/spring-statemachine/blob/master/docs/src/info/changelog.txt).

## [](#uml-modeling)UML Modeling

One of the most requested features has been to be able to use modeling frameworks to design a statechart instead of using plain good old JavaConfig. Work for this started a while back and first step for this was to use [Eclipse Papyrus](https://eclipse.org/papyrus/) and its generated uml model.

Below image is from our [Deploy Sample](http://docs.spring.io/spring-statemachine/docs/1.1.0.RC1/reference/htmlsingle/#statemachine-examples-deploy) where full machine was designed in Eclipse and uml imported into machine configuration.

![](https://docs.spring.io/spring-statemachine/docs/1.1.0.RC1/reference/htmlsingle/images/model-deployer.png)

We're planning to do 1.1.0.RELEASE later next month.

Thank you for all who have contributed in any way either via Stack Overflow, GitHub Issues or other channels. Driving force for changes really has been a community and requests from it.
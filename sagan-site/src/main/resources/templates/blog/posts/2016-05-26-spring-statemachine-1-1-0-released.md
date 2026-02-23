---
title: Spring Statemachine 1.1.0 Released
source: https://spring.io/blog/2016/05/26/spring-statemachine-1-1-0-released
scraped: 2026-02-23T19:15:11.715Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  May 26, 2016 | 3 Comments
---

# Spring Statemachine 1.1.0 Released

_Releases | Janne Valkealahti |  May 26, 2016 | 3 Comments_

We’re pleased to announce a release of [Spring Statemachine 1.1.0](http://projects.spring.io/spring-statemachine). I'd like to start by saying thank you for all who contributed in any way to make this happen. Artifacts are available either from [Maven Central](http://repo1.maven.org/maven2/org/springframework/statemachine/) or from [Spring Repository](http://repo.spring.io/libs-release/org/springframework/statemachine/).

What we got into this release(compared to 1.0.x):

-   Comprehensive support for Spring Security.
-   Context integration with \`@WithStateMachine' has been greatly enhanced.
-   StateContext is now a first class citizen with how user can interact with a State Machine.
-   Features around persistence has been enhanced with a build-in support for redis.
-   New feature helping with persist operations.
-   Configuration model classes are now a public API.
-   New features in timer based events.
-   New Junction pseudostate.
-   New Exit Point and Entry Point pseudostates.
-   Configuration model verifier.
-   New samples.
-   UI modeling support using Eclipse Papyrus.

Full changes as usual is available from [changelog](https://github.com/spring-projects/spring-statemachine/blob/master/docs/src/info/changelog.txt).

While native way of configuring a state machine is always done via configurer and builder interfaces, this design task may become difficult to understand if you're unable to see a "big picture". Below state chart is from new sample which demonstrated more complex scenarios what a state machine can do. Based on Papyrus uml designer, it is relatively easy to understand what a machine does when you're able to see it as an proper state chart. Its usage is optional but allows user to import uml model into a machine configuration.

![](http://docs.spring.io/spring-statemachine/docs/1.1.0.RELEASE/reference/htmlsingle/images/sm-ordershipping-1.png)

Thank you for all who have contributed in any way either via Stack Overflow, GitHub Issues or other channels. Driving force for changes really has been a community and requests from it.
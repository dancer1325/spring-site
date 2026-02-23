---
title: Spring Statemachine 1.2.0 Released
source: https://spring.io/blog/2016/12/15/spring-statemachine-1-2-0-released
scraped: 2026-02-23T18:54:50.112Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  December 15, 2016 | 0 Comments
---

# Spring Statemachine 1.2.0 Released

_Releases | Janne Valkealahti |  December 15, 2016 | 0 Comments_

We’re pleased to announce a release of [Spring Statemachine 1.2.0.RELEASE](http://projects.spring.io/spring-statemachine). Artifacts are available either from [Maven Central](http://repo1.maven.org/maven2/org/springframework/statemachine/) or from [Spring Repository](http://repo.spring.io/libs-release/org/springframework/statemachine/).

## [](#lets-see-what-we-did-for-this-initial-12x-release)Let's see what we did for this initial 1.2.x release

-   Usual bug fixes and small enhancements.
-   Support for UML submachines.
-   New `Spring Data Repository` abstraction keeping machine configurations in an external repository with built-in support for Redis, MongoDB and JPA.
-   New samples.
-   New support for state do actions.
-   New monitoring and tracing API's.
-   Initial support for `Spring Boot` auto-config.
-   New transition and state error action concepts.

There's no changes from a final release candicate but full history is available from [changelog](https://github.com/spring-projects/spring-statemachine/blob/master/docs/src/info/changelog.txt).

## [](#where-do-we-go-from-here)Where do we go from here?

-   `1.0.x` is end of life with `1.0.3` as a last release.
-   [1.1.x](https://github.com/spring-projects/spring-statemachine/tree/1.1.x) and [1.2.x](https://github.com/spring-projects/spring-statemachine/tree/1.2.x) are maintained in their own branches respectively `1.2.x` being the main stable branch.
-   Most likely there will be `1.3.x` at some point.
-   Master is now on `2.0.0.BUILD-SNAPSHOT`.

## [](#stories-for-20x-will-be)Stories for 2.0.x will be

-   JDK8 minimum level
-   Baselining on `Spring 5`
-   Introducing reactive API's with `Reactor 3`

Why do we think reactive type of programming might be a good thing with state machines? Well it all boils down to a machine execution model which is run-to-completion when either timer or event is causing something to happen in a future. If state machine is using synchronous event handling then user is blocked to wait for event to get processed. State machine has always supported asynchronous event handling, which is great but creates a burden for user to listen what and when maching is executing. With reactive style API's we think that real life interaction with state machines will become much easier. Don't worry, old API's will not go away.

Thank you for all who have contributed in any way either via Stack Overflow, GitHub Issues or other channels. Driving force for changes really has been a community and requests from it.
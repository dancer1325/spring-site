---
title: Spring Statemachine 1.1.0.M1 Released
source: https://spring.io/blog/2016/02/02/spring-statemachine-1-1-0-m1-released
scraped: 2026-02-23T19:29:01.948Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  February 02, 2016 | 7 Comments
---

# Spring Statemachine 1.1.0.M1 Released

_Releases | Janne Valkealahti |  February 02, 2016 | 7 Comments_

We’re pleased to announce a first milestone release of [Spring Statemachine](https://projects.spring.io/spring-statemachine/) 1.1.0.M1.

We released 1.0.0.M1 April 2015 and 1.0.0.RELEASE October 2015. We've also done 2 maintenance releases for 1.0.x series and now it's time to look in a future with a 1.1.x serie. 1.0.x enters into a maintenance mode while main development will focus on 1.1.x. This doesn't mean that we'll stop with 1.0.x, maintenance fixes for it will be done until we're succesfully transitioned beyond 1.1.x release. It is important in Spring projects to not drop maintenance until users are ready to move on into next minor/major release. We expect 1.0.x and 1.1.x live side by side until we fire out 1.2.x or 2.x serie in foreseeable future.

What we actually got into this first milestone:

-   Support for protecting events, transitions and actions with [Spring Security](http://projects.spring.io/spring-security/).
-   StateContext is now a first class citizen and has a bigger role both internally and how user interacts with it.
-   Annotation model(@WithStateMachine) has been enhanced to match features from listeners and context events.
-   Persist feature for Redis using Kryo serialization.
-   Additional bug fixes and minor enhacements which were backported into 1.0.x.
-   Two new samples using [security](http://docs.spring.io/spring-statemachine/docs/1.1.0.M1/reference/htmlsingle/#statemachine-examples-security) and [redis persistence](http://docs.spring.io/spring-statemachine/docs/1.1.0.M1/reference/htmlsingle/#statemachine-examples-eventservice).

Full changes as usual is available from [changelog](https://github.com/spring-projects/spring-statemachine/blob/master/docs/src/info/changelog.txt).

We added preliminary support for *Session* scoped beans for a state machine which has been a base for getting support for [Spring Session](http://projects.spring.io/spring-session/). Further work is still work in progress waiting for next release from Spring Session 1.1.x order to support custom session serialization.

We're planning to do second milestone before a release candidate order to get into Spring IO release later this year around May(ish). We may do a final release when we're ready but IO schedule is a final possible target date.

Thank you for all who have contributed in any way either via Stack Overflow, GitHub Issues or other channels. Driving force for changes really has been a community and requests from it.
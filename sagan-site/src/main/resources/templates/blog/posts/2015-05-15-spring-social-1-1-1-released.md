---
title: Spring Social 1.1.1 Released
source: https://spring.io/blog/2015/05/15/spring-social-1-1-1-released
scraped: 2026-02-23T19:53:00.505Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  May 15, 2015 | 0 Comments
---

# Spring Social 1.1.1 Released

_Releases | Craig Walls |  May 15, 2015 | 0 Comments_

Dear Spring Community,

I'm pleased to announce the availability of Spring Social 1.1.1.RELEASE. This is a maintenance release, addressing a handful of bugs and introducing a few minor improvements. View the [release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10481&version=14658) for full details.

Compatibility note: In order to fix a [serialization issue](https://jira.spring.io/browse/SOCIAL-467) when using ProviderSignInUtils, a minor breaking change was necessary. ProviderSignInAttempt no longer carries its own ConnectionFactoryLocator and UsersConnectionRepository. Those must now be passed in as parameters when instantiating ProviderSignInUtils.

[Project Site](http://projects.spring.io/spring-social/core.html) | [Reference](http://docs.spring.io/spring-social/docs/1.1.1.RELEASE/reference/htmlsingle/) | [JavaDoc](http://docs.spring.io/spring-social/docs/1.1.1.RELEASE/apidocs/)
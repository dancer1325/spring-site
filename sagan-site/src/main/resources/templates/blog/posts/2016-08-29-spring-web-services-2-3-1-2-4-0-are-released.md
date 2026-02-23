---
title: Spring Web Services 2.3.1/2.4.0 are released
source: https://spring.io/blog/2016/08/29/spring-web-services-2-3-1-2-4-0-are-released
scraped: 2026-02-23T19:06:38.258Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  August 29, 2016 | 1 Comment
---

# Spring Web Services 2.3.1/2.4.0 are released

_Engineering | Greg L. Turnquist |  August 29, 2016 | 1 Comment_

Greetings Spring community,

[Spring Web Services](http://projects.spring.io/spring-ws/) has just released versions 2.3.1.RELEASE and 2.4.0.RELEASE.

2.3.1.RELEASE is a minor patch release.

[2.3.1 Release Notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10060&version=15557) | [2.3.1 Documentation](http://docs.spring.io/spring-ws/docs/2.3.1.RELEASE/reference/htmlsingle/).

2.4.0.RELEASE rebases Spring Web Services to run on Spring Framework 4.2.x & Spring Security 4.0.x, the stable baselines behind Spring 4.3/Spring Security 4.1. At the same time, it remains compatible with Java 7. This version includes changes to the code base making it forward compatible with Spring 4.3 and 5.0, so you are free to move up to whichever version of Spring/Spring Security you wish to use.

[2.4.0 Release Notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10060&version=15716) | [2.4.0 Documentation](http://docs.spring.io/spring-ws/docs/2.4.0.RELEASE/reference/htmlsingle/).

Thanks to some tunings in our build, there are now CI jobs building every commit against Spring 4.2, 4.3, and 5.0. You can sleep at night know the code has been tested against your favorite version of Spring. Easy migration paths are a must for the Spring community.

[Project Page](http://projects.spring.io/spring-ws/) | [GitHub](https://github.com/spring-projects/spring-ws) | [Issues](https://jira.spring.io/browse/SWS)

The artifacts are staged on maven central, [http://repo.spring.io/release](http://repo.spring.io/release), and bintray.

Cheers!
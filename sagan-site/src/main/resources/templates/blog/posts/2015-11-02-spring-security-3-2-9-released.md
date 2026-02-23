---
title: Spring Security 3.2.9 Released
source: https://spring.io/blog/2015/11/02/spring-security-3-2-9-released
scraped: 2026-02-23T19:36:14.347Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  November 02, 2015 | 3 Comments
---

# Spring Security 3.2.9 Released

_Releases | Rob Winch |  November 02, 2015 | 3 Comments_

I’m pleased to announce the release of Spring Security 3.2.9.RELEASE. This release provides bug fixes and minor enhancements. For complete details on the release, refer to the [Change Log](https://jira.spring.io/browse/SEC/fixforversion/15254/?selectedTab=com.atlassian.jira.plugins.jira-development-integration-plugin%3Arelease-report-tabpanel).

Highlights of the release include:

-   [SEC-2190](https://jira.spring.io/browse/SEC-2190) - Fixing integration with the JSP tag libraries when Spring Security is registered in a child ApplicationContext
-   [SEC-2521](https://jira.spring.io/browse/SEC-2521) - Removal of synchronized in StandardPasswordEncoder which drastically improves performance
-   [SEC-3108](https://jira.spring.io/browse/SEC-3108) - Fix potential race condition in DigestAuthenticationFilter
-   [SEC-3109](https://jira.spring.io/browse/SEC-3109) - DelegatingSecurityContextExecutor works with Concurrent/ThreadPoolTaskScheduler

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/3.2.9.RELEASE/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/3.2.9.RELEASE/guides/)
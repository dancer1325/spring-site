---
title: Spring Security 5.8 and 6.0 are now GA
source: https://spring.io/blog/2022/11/21/spring-security-5-8-and-6-0-are-now-ga
scraped: 2026-02-23T10:32:46.831Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Steve Riesenberg |  November 21, 2022 | 3 Comments
---

# Spring Security 5.8 and 6.0 are now GA

_Releases | Steve Riesenberg |  November 21, 2022 | 3 Comments_

On behalf of the team and everyone who has contributed, we are very excited to announce the general availability of Spring Security 6.0! In addition, we are pleased to announce the general availability of Spring Security 5.8, which is provided to simplify [upgrading to 6.0](https://docs.spring.io/spring-security/reference/5.8/migration/index.html).

Spring Security 6 requires JDK 17 and uses the `jakarta` namespace. Among its many features, upgrading to Spring Security 6 will bring you:

-   Improved session management
    
-   Improved AOT processing
    
-   Security metrics and traces
    
-   Several defense-in-depth enhancements
    
-   A simplified authorization framework
    

Check out [What’s New in Spring Security 5.8](https://docs.spring.io/spring-security/reference/5.8/whats-new.html) and [What’s New in Spring Security 6.0](https://docs.spring.io/spring-security/reference/6.0/whats-new.html) for a comprehensive list of new features.

You can also see the release notes for [5.8.0-M1](https://github.com/spring-projects/spring-security/releases/tag/5.8.0-M1), [5.8.0-M2](https://github.com/spring-projects/spring-security/releases/tag/5.8.0-M2), [5.8.0-M3](https://github.com/spring-projects/spring-security/releases/tag/5.8.0-M3), [5.8.0-RC1](https://github.com/spring-projects/spring-security/releases/tag/5.8.0-RC1), [5.8.0](https://github.com/spring-projects/spring-security/releases/tag/5.8.0), [6.0.0-M1](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M1), [6.0.0-M2](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M2), [6.0.0-M3](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M3), [6.0.0-M4](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M4), [6.0.0-M5](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M5), [6.0.0-M6](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M6), [6.0.0-M7](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-M7), [6.0.0-RC1](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-RC1), [6.0.0-RC2](https://github.com/spring-projects/spring-security/releases/tag/6.0.0-RC2), and [6.0.0](https://github.com/spring-projects/spring-security/releases/tag/6.0.0) for an in-depth view.

## [](#breaking-changes)[](#breaking-changes)Breaking Changes

Being a major release, 6.0 also comes with several breaking changes, like [the removal of `WebSecurityConfigurerAdapter`](https://github.com/spring-projects/spring-security/issues/10902). We understand that taking breaking changes requires extra work for you, and at the same time, we feel that these changes will lower Spring Security’s learning curve and result in simpler and more secure applications.

To prepare your application for these breaking changes, Spring Security released 5.8 and an accompanying migration guide. It is recommended that you first upgrade to 5.8, following the steps outlined in the [5.8 migration guide](https://docs.spring.io/spring-security/reference/5.8/migration/index.html) and then the subsequent steps in the [6.0 migration guide](https://docs.spring.io/spring-security/reference/6.0/migration/index.html).

## [](#staying-on-5x-58-is-for-you-too)[](#staying-on-5-x-5-8-is-for-you-too)Staying on 5.x? 5.8 is for you, too.

If you will be staying on the 5.x line for a time, it is still recommended that you update to 5.8.

The [5.8 release](https://github.com/spring-projects/spring-security/releases/tag/5.8.0) by itself brings numerous enhancements, such as session handling improvements, expanded support for the `AuthorizationManager` API, and additional defense in-depth with support for CSRF BREACH. Check out [What’s New in Spring Security 5.8](https://docs.spring.io/spring-security/reference/5.8/whats-new.html) for a list of new features available in the release.

## [](#support)[](#support)Support

As always, we look forward to hearing your [feedback on GitHub](https://github.com/spring-projects/spring-security/issues) and your [questions on StackOverflow](https://stackoverflow.com)!

[Project Page](https://spring.io/projects/spring-security/) | [GitHub](https://github.com/spring-projects/spring-security) | [Issues](https://github.com/spring-projects/spring-security/issues) | [Documentation](https://docs.spring.io/spring-security/reference/index.html)
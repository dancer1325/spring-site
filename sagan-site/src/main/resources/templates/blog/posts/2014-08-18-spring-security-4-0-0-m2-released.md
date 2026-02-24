---
title: Spring Security 4.0.0.M2 Released
source: https://spring.io/blog/2014/08/18/spring-security-4-0-0-m2-released
scraped: 2026-02-23T22:17:25.033Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  August 18, 2014 | 1 Comment
---

# Spring Security 4.0.0.M2 Released

_Releases | Rob Winch |  August 18, 2014 | 1 Comment_

I'm pleased to announce the release of Spring Security 4.0.0.M2 available in the [Spring Milestone repository](http://docs.spring.io/spring-security/site/docs/4.0.0.M2/reference/htmlsingle/#get-spring-security).

\[callout title=SpringOne 2GX 2014 is around the corner\]Book your place at [SpringOne](https://2014.event.springone2gx.com/register) in Dallas, TX for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. [From 0 to Spring Security 4.0](https://2014.event.springone2gx.com/schedule/sessions/from_0_to_spring_security_4_0.html) session will contain detailed information on how to get started with Spring Security and provide a deep dive into the new features found in Spring Security 4. Of course there plenty of other [exciting Spring related talks](https://2014.event.springone2gx.com/schedule/2014-09-09)!\[/callout\]

## [](#changelog)Changelog

You can find details about this release in the [release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10040&version=14530). Highlights of the release include:

-   Support for WebSocket Security using Spring's messaging abstraction
-   Spring Data integration
-   [Spring Session](https://github.com/spring-projects/spring-session) was produced out of the work necessary for this release. In an application server independent way you can easily use a custom backend (i.e. Redis) as the `HttpSession` implementation. See the project page for additional features of this exciting new project.
-   Enhancements and fixes to the testing support
    -   Easier integration with `MockMvc` through `SecurityMockMvcConfigurers`
    -   You no longer need to specify `WithSecurityContextTestExecutionListener` on your tests
    -   `@WithSecurityContext` works even with custom `SecurityContextRepository` implementations
    -   Support for digest and certificate based authentication testing
-   Support nested static groups in LDAP Authentication
-   Lots of integration tests added to the sample applications
-   Updated minimum version of Spring 4.1 RC2. This was necessary for enough of the features, that it made sense to do across the board

Stay tuned to the [spring.io blog](http://spring.io/blog) for a blog series introducing these exciting new features.

[Reference](http://docs.spring.io/spring-security/site/docs/4.0.0.M2/reference/htmlsingle/) | [Javadoc](http://docs.spring.io/spring-security/site/docs/4.0.0.M2/apidocs/) | [Guides](http://docs.spring.io/spring-security/site/docs/4.0.0.M2/guides/)
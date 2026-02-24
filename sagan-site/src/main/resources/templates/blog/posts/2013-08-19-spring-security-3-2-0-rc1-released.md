---
title: Spring Security 3.2.0.RC1 Released (08/2013)
source: https://spring.io/blog/2013/08/19/spring-security-3-2-0-rc1-released
scraped: 2026-02-24T07:59:54.306Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  August 19, 2013 | 0 Comments
---

# Spring Security 3.2.0.RC1 Released (08/2013)

_Engineering | Rob Winch |  August 19, 2013 | 0 Comments_

Spring Security 3.2.0.RC1 is now available from the SpringSource repository at [http://repo.springsource.org](http://repo.springsource.org). See [here](https://github.com/SpringSource/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts) for a quick tutorial on resolving these artifacts via Maven.

This release includes tons of updates and fixes. The highlights include:

-   Polishing of Spring Security Java Configuration
-   Uses content negotiation to determine how to prompt user for authentication when multiple authentication mechanisms (i.e. HTTP Basic and Form login) enabled
-   [AbstractSecurityWebApplicationInitializer](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/web/context/AbstractSecurityWebApplicationInitializer.html#AbstractSecurityWebApplicationInitializer\(java.lang.Class...\)) allows registering Java Configuration directly
-   A number of bugs fixed
-   [CSRF protection](http://en.wikipedia.org/wiki/Cross-site_request_forgery) and automatic integration with Spring Web MVC jsp tags
-   Automatic cache control support
-   Defence against [Clickjacking attacks](http://en.wikipedia.org/wiki/Clickjacking)
-   [HTTP Strict Transport Security](http://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) support to reduce Man in the Middle attacks
-   Samples include pom.xml so they can be imported as Maven projects
-   [MediaTypeRequestMatcher](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/web/util/MediaTypeRequestMatcher.html) for matching on requests with content negotiation
-   Over [ten java configuration samples](https://github.com/SpringSource/spring-security/tree/3.2.0.RC1/samples) have been integrated into the samples directory
-   Three [new guides](http://static.springsource.org/spring-security/site/docs/3.2.x/guides/) that walk users through samples and provide detailed instructions on how to do specific tasks. More of these guides will follow in coming releases

Refer to [Spring Security 3.2.0.RC1 preview](http://blog.springsource.org/2013/08/21/spring-security-3-2-0-rc1-highlights-csrf-protection/) for more details about this release.

SpringOne2GX

To learn about all the new features within Spring Security 3.2 attend my [Getting Started with Spring Security 3.2](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29451) presentation at SpringOne2GX September 9-12, 2013. If you haven't already [gotten your tickets](http://www.springone2gx.com/conference/santa_clara/2013/09/register), do so now before its too late!

[Changelog](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10040&version=13903) | [Download](http://www.springsource.com/download/community?project=Spring%20Security&version=3.2.0.RC1) | [Reference Manual](http://static.springsource.org/spring-security/site/docs/3.2.x/reference/springsecurity-single.html) | [Guides](http://static.springsource.org/spring-security/site/docs/3.2.x/guides/) | [FAQ](http://static.springsource.org/spring-security/site/faq.html)
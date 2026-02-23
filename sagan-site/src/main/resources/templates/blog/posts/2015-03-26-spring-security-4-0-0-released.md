---
title: Spring Security 4.0.0 Released
source: https://spring.io/blog/2015/03/26/spring-security-4-0-0-released
scraped: 2026-02-23T21:09:58.999Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  March 26, 2015 | 12 Comments
---

# Spring Security 4.0.0 Released

_Releases | Rob Winch |  March 26, 2015 | 12 Comments_

I'm pleased to announce the release of Spring Security 4.0.0.RELEASE which closes over [175+ tickets](http://goo.gl/ui9GCl). You can find the highlights below:

### [](#websocket-support)WebSocket Support

Spring Security 4 added [WebSocket Support](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#websocket). It is now possible to use Spring Security with [Spring's WebSocket](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html) support.

### [](#spring-data-integration)Spring Data Integration

Spring Security 4 added [Spring Data Integration](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#data). It is now possible to refer to Spring Security's user within Spring Data queries using SpEL.

### [](#test-support)Test Support

Spring Security 4 has added [Test Support](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#test). It is now much easier to write tests with Spring Security applications.

### [](#more-secure-by-default)More Secure by Default

As exploits against applications evolve, so must Spring Security. As a major release version, the Spring Security team took the opportunity to make some non-passive changes which focus on:

-   Ensuring Spring Security is more [secure by default](https://www.owasp.org/index.php/Establish_secure_defaults)
-   Minimizing [Information Leakage](https://www.owasp.org/index.php/Information_Leakage)
-   Removing deprecated APIs

For complete details on **migrating from Spring Security 3 to Spring Security 4** refer [Migrating from 3.x to 4.x](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#m3to4) section of the reference.

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/4.0.0.RELEASE/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/4.0.0.RELEASE/guides/html5/) | [Issues](http://goo.gl/ui9GCl)
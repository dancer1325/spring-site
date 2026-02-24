---
title: Spring Web Services 1.5.1 Released
source: https://spring.io/blog/2008/05/04/spring-web-services-1-5-1-released
scraped: 2026-02-24T09:17:52.054Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Arjen Poutsma |  May 04, 2008 | 0 Comments
---

# Spring Web Services 1.5.1 Released

_Releases | Arjen Poutsma |  May 04, 2008 | 0 Comments_

Dear Spring community,

I'm pleased to announce that Spring Web Services 1.5.1 has been released!

[Downloads](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=178569&release_id=596930) | [Site](http://static.springframework.org/spring-ws/site/) | [Changelog](http://static.springframework.org/spring-ws/docs/1.5.1/changelog.txt) | [Announcement](http://forum.springframework.org/showthread.php?t=53701)  

This is the first bug fix and enhancement release in the Spring-WS 1.5 series. It fixes all bugs reported since 1.5.0 and introduces various enhancements throughout the framework:

-   Introduced a Spring JMS MessageConverter that uses OXM marshallers
-   Introduced a Spring MVC View that uses OXM marshallers
-   Fixed WS-Security signatures when using WSS4J in combination with SAAJ messages
-   Support for timeouts on HTTP transports
-   Support for Castor 1.2, see note below
-   Airline sample now uses Spring Security

and more. Please see the changelog for details.  
  
Please note that - due to a backwards compatibility issue - the CastorMarshaller now requires Castor 1.2 or higher.  

Cheers,

Arjen Poutsma  
Spring Web Services Lead
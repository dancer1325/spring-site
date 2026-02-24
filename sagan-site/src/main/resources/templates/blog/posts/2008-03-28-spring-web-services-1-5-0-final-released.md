---
title: Spring Web Services 1.5.0 Final Released
source: https://spring.io/blog/2008/03/28/spring-web-services-1-5-0-final-released
scraped: 2026-02-24T09:19:45.066Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Arjen Poutsma |  March 28, 2008 | 0 Comments
---

# Spring Web Services 1.5.0 Final Released

_Releases | Arjen Poutsma |  March 28, 2008 | 0 Comments_

Dear Spring community,  
I'm pleased to announce that Spring Web Services 1.5.0 has been released!

[Downloads](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=178569&release_id=587838) | [Site](http://static.springframework.org/spring-ws/site/) | [Changelog](http://static.springframework.org/spring-ws/docs/1.5.0/changelog.txt) | [Announcement](http://forum.springframework.org/showthread.php?t=51796)  

This final release candidate the following new features over 1.0.3:

-   Two new transports: JMS and email, both for client and server,  
    
-   WSS4J-based WS-Security implementation, which allows for WS-Security on non-SUN JDKs (i.e. WebSphere) and JDK 1.4,
-   WS-Addressing support for both client and server, supporting the August 2004 and final versions of the specification,  
    
-   Native support for Java 6, including JAXP 1.4, and the bundled SAAJ 1.3 and JAXB 2.0,  
    
-   Two new Spring namespaces, which drastically decrease the amount of XML required to configure marshallers and typical Spring-WS constructs,  
    
-   Spring-WS jars are now OSGi bundles,  
    
-   A new, client-side interception mechanism, including WS-Security support,  
    
-   @Endpoints are now @Components, so they are automatically picked up when using Spring 2.5 component scanning
-   A new and improved XSD-to-WSDL generator that inlines included and imported XSDs
-   Support for Spring Security
-   Support for the Java 6 HTTP Server
-   Two new samples, showing Plain Old XML usage and WS-Addressing with the Java 6 HTTP server

and many small improvements and bug fixes. Check the [changelog](http://static.springframework.org/spring-ws/docs/1.5.0/changelog.txt) for more details.

We recommend upgrading to Spring Web Services 1.5 from all previous versions, in order to benefit from these new features!

The 1.5 series is 95% backwards compatible, though support for Java 1.3 has been dropped, in favor of Java 1.6.

Cheers,

Arjen Poutsma  
Spring Web Services Lead
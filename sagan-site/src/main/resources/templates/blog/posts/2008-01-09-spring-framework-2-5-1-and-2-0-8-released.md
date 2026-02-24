---
title: Spring Framework 2.5.1 and 2.0.8 released
source: https://spring.io/blog/2008/01/09/spring-framework-2-5-1-and-2-0-8-released
scraped: 2026-02-24T09:21:54.178Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  January 09, 2008 | 0 Comments
---

# Spring Framework 2.5.1 and 2.0.8 released

_Releases | Juergen Hoeller |  January 09, 2008 | 0 Comments_

Spring 2.5.1 is the first bug fix and enhancement release in the Spring 2.5 series. It closes a couple of gaps found in Spring 2.5 final and introduces various new features in the context of Java 6 and Java EE 5 support:

-   Java-5-specific Model interface for use with MVC handler methods
    
-   @ModelAttribute's default attribute names are consistently derived from the \*declared\* parameter/return type
    
-   Support for last-modified handling in @RequestMapping handler methods (through the WebRequest interface)
    
-   SpringBeanAutowiringSupport class for self-autowiring classes within a web app (e.g. JAX-WS endpoints)
    
-   EJB3-compliant SpringBeanAutowiringInterceptor for processing Spring's @Autowired in EJB3 SBs/MDBs
    
-   Remoting support for the HTTP server that is included in Sun’s JDK 1.6 (covering HTTP invoker, Hessian and Burlap)
    
-   "jms:listener-container" tag supports a concurrency range (e.g. "3-5"), for specifying a minimum number of consumers
    
-   Tiles2 support works on JDK 1.4 as well
    
-   Any many further enhancements in the details…
    

Spring 2.0.8 is a bug fix release in the Spring 2.0 series, addressing all issues reported since 2.0.7 and backporting various minor refinements from Spring 2.5.1. This is the last planned 2.0.x release. We recommend upgrading to Spring 2.5.1 where lots of new features are waiting for you to try them...
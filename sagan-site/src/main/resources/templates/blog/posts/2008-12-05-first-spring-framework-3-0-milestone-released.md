---
title: First Spring Framework 3.0 milestone released
source: https://spring.io/blog/2008/12/05/first-spring-framework-3-0-milestone-released
scraped: 2026-02-24T09:12:22.437Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  December 05, 2008 | 0 Comments
---

# First Spring Framework 3.0 milestone released

_Engineering | Juergen Hoeller |  December 05, 2008 | 0 Comments_

I'm pleased to announce that Spring Framework 3.0 M1 is finally available for [download](http://www.springsource.com/download/community?project=Spring%20Framework)!

This release features several major changes, including a start of the major 3.0 themes such as **EL and REST support**:

-   revised project layout and build system with **module-based sources**
-   updated entire codebase for **Java 5 code style** (generics, varargs)
-   updated to **JUnit 4.5** and JRuby 1.1
-   introduced **Spring EL parser** (*org.springframework.expression* package)
-   introduced support for **#{...} expressions in bean definitions**
-   introduced **expression-enabled @Value annotation** for embedded expressions
-   introduced **@PathVariable annotation for URI template handling** in MVC handlers
-   introduced **default value support for @RequestParam** in MVC handlers
-   introduced **@RequestHeader annotation for HTTP header access** in MVC handlers
-   introduced **AbstractAtomFeedView and AbstractRssFeedView** base classes
-   introduced **<spring:url> and <spring:param>** JSP tags

as well as various minor enhancements.

Note that Spring Framework 3.0 requires Java 5 or above and J2EE 1.4 or above. We are building on Java 6 and Java EE 5 as the primary platform levels - but rest assured, we will retain compatibility with Java 5 enabled J2EE 1.4 servers such as WebLogic 9 and WebSphere 6.1.

We also removed/deprecated several classes that became outdated. More information about deprecations and the corresponding migration paths will be available in the 3.0 M2/M3 timeframe.

As a change from previous releases which were hosted in CVS at SourceForge, Spring Framework 3.0 is being developed in our new Subversion repository which can be found at: [](https://src.springframework.org/svn/spring-framework/)[https://src.springframework.org/svn/spring-framework/](https://src.springframework.org/svn/spring-framework/)

Feel free to track the ongoing work as we move closer to Spring Framework 3.0 final... and let us know whether you like what you're seeing :-)
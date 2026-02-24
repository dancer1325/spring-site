---
title: Spring Framework 2.1 M4 Released
source: https://spring.io/blog/2007/09/10/spring-framework-2-1-m4-released
scraped: 2026-02-24T09:25:14.609Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 10, 2007 | 0 Comments
---

# Spring Framework 2.1 M4 Released

_Releases | Juergen Hoeller |  September 10, 2007 | 0 Comments_

Dear Spring Community,

I'm pleased to announce that Spring Framework 2.1 M4 has been released! This milestone release introduces:

-   'qualifier' annotation support for choosing a specific @Autowired match;
-   our next-generation Spring TestContext Framework with support for JUnit4;
-   SimpleJdbcCall operation object for stored procedure calls;
-   support for autowiring of scripted objects (Groovy, JRuby, BeanShell);
-   support for Tiles2 views in Spring Web MVC.

![Spring 2.1 M1 Released](http://static.springframework.org/images/spring21.png "Spring 2.1 M1 Released")

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=538093) | [Documentation](http://static.springframework.org/spring/docs/2.1.x/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.1.x/changelog.txt)

  

Which leads me to some further exciting news...

We've been reviewing the overall set of features that we introduced in the recent 2.1 milestones:

-   full Java 6 and Java EE 5 support
-   full-featured annotation-driven dependency injection
-   support for component scanning in the classpath
-   "beanName" pointcut element in AspectJ pointcut expressions
-   built-in support for AspectJ load-time weaving
-   further XML configuration namespaces (context, jms)
-   extended SimpleJdbcTemplate functionality
-   officially certified WebSphere support
-   Spring ApplicationContext can be deployed as RAR file
-   JCA 1.5 message endpoint management (for JMS and CCI)
-   completely revised framework for integration tests

We concluded that this goes significantly beyond what we originally planned for Spring 2.1. The version number 2.1, as used for the milestones, does not reflect the significance and the comprehensiveness of the features in this release.

So I'm pleased to announce that the next release will be called Spring Framework 2.5 RC1, with the 2.1 milestones seamlessly leading into Spring Framework 2.5 as the upcoming major release! Check out the [Interface21 team blog](http://blog.interface21.com/main/2007/09/10/spring-framework-21-turns-into-spring-framework-25/) for the official announcement and for upcoming posts on specific Spring 2.5 features as we move closer to the final release.

Spring 2.1 M4 is here. Long live Spring 2.5! :-)

Enjoy,  
  
Juergen Hoeller  
Lead, Spring Framework Development  
Interface21 - [http://www.interface21.com](http://www.interface21.com)
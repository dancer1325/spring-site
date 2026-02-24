---
title: Spring Framework 2.5 Released
source: https://spring.io/blog/2007/11/19/spring-framework-2-5-released
scraped: 2026-02-24T09:23:33.862Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  November 19, 2007 | 0 Comments
---

# Spring Framework 2.5 Released

_Releases | Juergen Hoeller |  November 19, 2007 | 0 Comments_

Dear Spring Community,  
   
We are pleased to announce that the Spring Framework 2.5 final release is now available.

![Spring 2.5 RC1 Released](http://static.springframework.org/images/spring25.png "Spring 2.5 RC1 Released")

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=555312) | [Support](http://www.springsource.com) | [Documentation](http://static.springframework.org/spring/docs/2.5.x/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.5.x/changelog.txt) 

Spring 2.5 enhances Spring 2.0 with many exciting new features, including:  

-   Full Java 6 and Java EE 5 support (JDBC 4.0, JTA 1.1, JavaMail 1.4, JAX-WS 2.0)
-   Full-featured annotation-driven dependency injection, including support for 'qualifiers'
-   Support for auto-detecting application components in the classpath and auto-configuring them as Spring managed objects  
    
-   A new bean name pointcut element in AspectJ pointcut expressions
-   Built-in support for AspectJ load-time weaving based on the LoadTimeWeaver abstraction
-   New XML configuration namespaces "context" and "jms", for maximum convenience
-   A completely revised integration test framework, with first-class support for JUnit 4 and TestNG
-   A new annotation-based controller model for Spring MVC supporting Servlet and Portlet environments
-   Extended SimpleJdbcTemplate functionality, including support for named SQL parameters
-   Officially certified WebSphere support  
    
-   The packaging of Spring Framework jars as OSGi-compliant bundles out of the box
-   The ability to deploy a Spring ApplicationContext as a JCA RAR file, for headless application modules
-   JCA 1.5 message endpoint management, for Spring-managed JMS and CCI message listeners  
    

Check out the series [What's New in Spring 2.5?](http://www.infoq.com/articles/spring-2.5-part-1) for a walkthrough of the new Spring 2.5 features, including information on how to deploy the Spring sample applications that demonstrate them.  

We recommend upgrading to Spring 2.5 from all previous Spring 2.0.x versions in order to benefit from the new features as well as the significant performance enhancements that Spring 2.5 has to offer. Spring 2.5 is designed as a drop-in replacement for Spring 2.0, except for the slightly restructured jar file contents (please see the readme file in the distribution for more information on this).

Please note that Spring 2.5 is still compatible with JDK 1.4.2+ and J2EE 1.3+. Java 1.4 users, for example on WebLogic 8.1 or WebSphere 5.1/6.0, are very welcome to upgrade to Spring 2.5 as well.  We recommend putting the backport-util-concurrent jar on the classpath when running on Java 1.4, which allows Spring and your applications to benefit from significant concurrency enhancements.

Enjoy Spring 2.5,

Juergen Hoeller  
Lead, Spring Framework Development
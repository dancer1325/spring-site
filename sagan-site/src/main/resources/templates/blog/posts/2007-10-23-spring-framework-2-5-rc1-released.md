---
title: Spring Framework 2.5 RC1 released
source: https://spring.io/blog/2007/10/23/spring-framework-2-5-rc1-released
scraped: 2026-02-24T09:24:15.700Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Adrian Colyer |  October 23, 2007 | 0 Comments
---

# Spring Framework 2.5 RC1 released

_Releases | Adrian Colyer |  October 23, 2007 | 0 Comments_

Dear Spring community,  
  
I'm pleased to announce that the first Spring Framework 2.5 release candidate is available! Spring 2.5 is the culmination of the effort that started as Spring 2.1 milestones, enhancing Spring 2.0 with many new features, such as:  

-   full Java 6 and Java EE 5 support (JDBC 4.0, JTA 1.1, JavaMail 1.4, JAX-WS 2.0, etc)  
-   full-featured annotation-driven dependency injection (including support for 'qualifiers') 
-   support for component scanning in the classpath (autodetecting annotated classes) 
-   bean name pointcut element in AspectJ pointcut expressions 
-   built-in support for for AspectJ load-time weaving (based on the LoadTimeWeaver abstraction) 
-   further XML configuration namespaces ("context", "jms") for maximum convenience 
-   completely revised framework for integration tests (with support for JUnit 4 and TestNG)
-   new annotation-based controller style for Servlet MVC and Portlet MVC
-   extended SimpleJdbcTemplate functionality (support for named parameters etc) 
-   officially certified WebSphere support (support for the WebSphere 6 UOWManager facility) 
-   Spring framework jars are shipped as OSGi-compliant bundles out of the box
-   Spring ApplicationContext can be deployed as JCA RAR file (for headless application modules) 
-   JCA 1.5 message endpoint management (for Spring-managed JMS and CCI message listeners)  
    

![Spring 2.5 RC1 Released](http://static.springframework.org/images/spring25.png "Spring 2.5 RC1 Released")

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=548594) | [Documentation](http://static.springframework.org/spring/docs/2.5.x/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.5.x/changelog.txt) 

Particularly worth mentioning are the annotation-based MVC controller style, the JAX-WS support and the TestNG support, all of which are introduced in this release. Furthermore, this release comes in three different distributions, introducing a minimal standard zip and an intermediate with-docs zip.  
  
We recommend upgrading to Spring 2.5 from all previous 2.0.x versions, in order to benefit from the new features as well as from the significant performance enhancements that Spring 2.5 has to offer. Spring 2.5 is designed as a drop-in replacement for Spring 2.0, except for the slightly restructured jar file contents (see the readme file in the distribution).  
  
Note that Spring 2.5 is still compatible with JDK 1.4.2+ and J2EE 1.3+. Java 1.4 users, for example on WebLogic 8.1 or WebSphere 5.1/6.0, are very welcome to upgrade to Spring 2.5 as well! We recommend putting the backport-util-concurrent jar on the classpath when running on Java 1.4, which allows Spring (and hence your applications) to benefit from significant concurrency enhancements.

Juergen Hoeller  
Interface21  
[http://www.interface21.com](http://www.interface21.com)
---
title: Spring 2.0 RC1 Released
source: https://spring.io/blog/2006/06/21/spring-2-0-rc1-released
scraped: 2026-02-24T09:36:43.927Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  June 21, 2006 | 0 Comments
---

# Spring 2.0 RC1 Released

_Releases | Juergen Hoeller |  June 21, 2006 | 0 Comments_

Dear Spring community,  
  
We are pleased to announce that Spring 2.0 RC1 has been released.  [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644) | [Documentation](http://static.springframework.org/spring/docs/2.0.x/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.0.x/changelog.txt)  

This is the first release candidate for Spring 2.0 after five milestone releases over the last six months. This stable release is waiting for broad user feedback on the way towards 2.0 final, targeted for early July.  
  
The major new themes of Spring 2.0 are:

1.  **Simplified Configuration** - you will find you write much less code overall to configuration your applications.  The code you do write is high-level and domain-specific, benefiting from smart defaults as well as rich validation and tool support.
  
3.  **Powerful AOP Unification** \- you may apply aspects that weave custom behavior before, after, and around your objects concisely with AspectJ while still benefiting from the simplicity of the Spring AOP runtime.
  
5.  **JSR 220 Java Persistence Archtecture (JPA)** \- to provide you choice in persistence provider implementation.  Spring is the first to support JPA in both JEE and JSE environments with full portability between the two.
  
7.  **Asynchronous JMS Messaging -** Message-Driven POJOs bring you lightweight asynchronous components for JSE environments with the choice of JMS provider.
  
9.  **JSR-168 Portlets** \- Spring Portlet MVC delivers a framework for developing JSR 168 portlets which includes integration with [Spring Web Flow](/webflow) for orchestrating user interactions.  
    

It is important to emphasize that **Spring 2.0 provides backwards compatability with the Spring 1.x series**.  Compatability is critically important to our user base and we are committed to providing it.  

Further major new features for each of these areas include...  

**Configuration Simplification**  

-   Bean definitions based on XML schema, with out-of-the-box XML namespaces for simplifying common configuration tasks
-   Support for extended bean scopes in application contexts, with web request and session scopes as main targets
-   Bean definition enhancements: lazy loading of bean classes, collection merging, and intelligent error messages  
    

**AOP**  

-   Simplified AOP configuration based on XML schema namespaces
-   Support for AspectJ pointcut expression language and @AspectJ-style aspects
-   Support for dependency injection on any object, including fine grained domain objects (based on AspectJ)

**Persistence and JPA**  

-   Enhanced JDBC support: named SQL parameters, generics-based SimpleJdbcTemplate
-   Explicit support for Hibernate 3.1 and 3.2 (while remaining compatible with Hibernate 3.0)
-   Support for the Java Persistence API (JPA), including the full container contract with class instrumentation

**Scheduling and Messaging**  

-   TaskExecutor abstraction for submitting asynchronous work
-   Support for various thread pools, such as a Java 5 ThreadPoolExecutor and a CommonJ WorkManager
-   Support for asynchronous JMS ("Message-Driven POJOs") based on message listener containers

**Web Application Development**  

-   Conventions-based web MVC: controller mappings, model attribute names
-   JSP form tag library for use with Spring Web MVC and Spring Web Flow
-   Full support for Portlet environments, including Portlet-style MVC based on a DispatcherPortlet  
    

... and many, many other refinements in the details.

To see many of these features in action, review the JPetstore reference application included in the release distribution within the **samples/jpetstore** directory.  See the [What's New in 2.0?](http://static.springframework.org/spring/docs/2.0.x/reference/new-in-2.html) section of the reference documentation for additional detail.  

We will be working with the Maven2 community to have 2.0 RC1 uploaded to the Maven repository in the coming days.

Thank you Spring community for all of the feedback leading up to this release.  We look forward to your feedback towards the big 2.0 GA launch date!

Enjoy, 

Juergen Hoeller  
Lead, Spring 2.0 Product Development
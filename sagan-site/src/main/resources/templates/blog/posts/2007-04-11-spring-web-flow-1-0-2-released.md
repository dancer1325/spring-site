---
title: Spring Web Flow 1.0.2 Released
source: https://spring.io/blog/2007/04/11/spring-web-flow-1-0-2-released
scraped: 2026-02-24T09:30:46.216Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  April 11, 2007 | 0 Comments
---

# Spring Web Flow 1.0.2 Released

_Releases | Keith Donald |  April 11, 2007 | 0 Comments_

Dear Spring Community,

We are pleased to announce that Spring Web Flow 1.0.2 has been released.  This is a bugfix and enhancement release, addressing all bugs reported against the Spring Web Flow 1.0 series and significantly enhancing Spring Web Flow's support for users of Java Server Faces (JSF).  We recommend upgrading to this release from previous versions.  

[![](http://static.springframework.org/spring-webflow/images/spring-webflow.png)](/webflow)

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=500152) | [Practical Introduction](http://www.ervacon.com/products/swf/intro/index.html) | [Samples](http://spring.ervacon.com) | [Reference Manual](http://static.springframework.org/spring-webflow/docs/1.0.2/reference/index.html) | [Changelog](http://static.springframework.org/spring-webflow/docs/1.0.2/changelog.txt)  

> Spring Web Flow is a next generation Java web application controller framework.  The framework provides a powerful system for implementing navigation logic and managing application state consistently across a variety of environments.

## New and Noteworthy in this Release

Spring Web Flow 1.0.2 is a solid, stable release that serves as a drop-in replacement for existing users and also contains several noteworthy enhancements.  Three of these enhancements are particularly worth noting in more detail:

**Significantly enhanced JSF integration**

Now when used as a JSF extension, Spring Web Flow provides:  

-   A NavigationHandler that brings the full power of the Web Flow navigation system to JSF developers.  This system allows for implementing dynamic navigation rules and solves the infamous back-button problem out-of-the-box.  
    
-   A state management system providing UI Components full access to beans managed in any of Web Flow's conversational data scopes, including "conversation", "flow", and "flash" scope.  These scopes complement JSF's default scopes and are particularly useful for interactive web applications that apply Ajax techniques using libraries such as Ajax4JSF.  
    
-   Native support for all major JSF view technologies.  With Spring Web Flow 1.0.2, views that participate in flows are standard JSF views whether they are built using JSP or Facelets.  Any JSF UI Component can now bind to beans managed in any of the conversational scopes seamlessley.

Please run and review the [sellitem-jsf sample](http://static.springframework.org/spring-webflow/docs/1.0.x/reference/practical.html#sellitem-JSF-sample) for a quick assessment of these enhancements in action.  They significantly improve the ease of using Spring Web Flow in a JSF environment, and are the start of a larger effort that will continue into the 1.1 release and beyond.  

**Expanded practical documentation**

Complete walk-throughs of each of Spring Web Flow's sample applications are now provided in the reference manual.  These walk-throughs take you through the implementation of each sample, and explain best practices and design considerations along the way.   After downloading the release, see the ['Practical' chapter](http://static.springframework.org/spring-webflow/docs/1.0.x/reference/practical.html) for how to get the sample applications running inside your IDE.  

**Spring IDE 2.0 integration**

The upcoming 2.0 version of the Spring IDE Eclipse Plugin features a Graphical Web Flow Editor and XML Flow Definition Editor.  Beginning with Spring Web Flow 1.0.2, each of the sample applications has been Spring IDE 2.0 enabled, allowing you to easily assess these tools as they progress.  To evaluate Spring IDE 2.0 simply import the sample projects into Eclipse and install the latest version of the Spring IDE 2.0 plugin from the [nightly update site](http://springide.org/updatesite_nightly).  

## Spring Web Flow 1.1 Road Map 

Work has begun on Spring Web Flow 1.1 in anticipation of a first release candidate becoming available at JavaOne.  Building on 1.0.2, this release will offer major new functionality including support for conversational persistence contexts, Acegi Security integration, unified EL integration, integrated Spring 2.0 custom scopes, enhanced support for Java-based flows, and support for flow composition and inheritance.  

Special thanks to Jeremy Grelle, Rossen Stoyanchev, and Christian Dupuis for their major contributions to this release.  It is an exciting time to be a part of the Web Flow community!  

Keith Donald - [Interface21](http://www.interface21.com)  
Erwin Vervaet - [Ervacon](http://www.ervacon.com)  
Leads, Spring Web Flow Development
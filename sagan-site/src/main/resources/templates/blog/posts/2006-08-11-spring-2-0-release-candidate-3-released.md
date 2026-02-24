---
title: Spring 2.0 Release Candidate 3 Released
source: https://spring.io/blog/2006/08/11/spring-2-0-release-candidate-3-released
scraped: 2026-02-24T09:35:40.046Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  August 11, 2006 | 0 Comments
---

# Spring 2.0 Release Candidate 3 Released

_Releases | Juergen Hoeller |  August 11, 2006 | 0 Comments_

Dear Spring community,

We are pleased to announce that Spring 2.0 RC3 has been released.  [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644) | [Documentation](http://static.springframework.org/spring/docs/2.0.x/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.0.x/changelog.txt)

This third release candidate includes many refinements based on valuable user feedback that we received for the previous release candidates.  With this release, Spring 2.0 final is now just around the corner.  
  
The most significant refinements include:  

-   **Spring 1.2 compatibility has been restored for default-lazy-init="true"**, with respect to detection of special beans (such as PropertyPlaceholderConfigurers) by type. Alongside, lazy class loading has been reworked to allow for placeholders in class names etc. Strict lazy class loading can still be enforced for special ApplicationContexts.

-   **Persistence exception translation based on the @Repository annotation is now available for Hibernate3, JDO and TopLink** as well, not just for JPA.  Exception translation is now based on the underlying ORM tool's native exceptions as far as possible, with Spring-specific SQLException translation only applying when explicitly specified.

-   **In our JMS support DefaultMessageListenerContainer features refined resource handling** (which works on JBoss 4.0 as well), and is able to recover from a broken Connection or Destination. The caching of JMS resources is now fully configurable, with sensible defaults for both the XA and the non-XA scenario. Furthermore, JmsTemplate reuses cached JMS resources within a JTA transaction.

-   **Servlet and Portlet Web MVC support a common WebRequestInterceptor abstraction now**, which allows Open Session/EntityManager/etc in View interceptors to be reused across Servlet and Portlet environments. As a consequence, all such Portlet-specific interceptors have been dropped in favor of the new generic ones (OpenSessionInViewInterceptor etc).  
    

Of course, there are many further refiements in the details. Please see the changelog file (as well as the changelog in JIRA) for details.  
  
Let us know about any remaining issues you might encounter with RC3.  The Spring 2.0 final release is now just around the corner.

Juergen Hoeller,  
Lead Spring Framework Development
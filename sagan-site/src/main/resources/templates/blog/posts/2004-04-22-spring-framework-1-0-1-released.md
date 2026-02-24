---
title: Spring Framework 1.0.1 Released
source: https://spring.io/blog/2004/04/22/spring-framework-1-0-1-released
scraped: 2026-02-24T09:41:09.457Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 22, 2004 | 0 Comments
---

# Spring Framework 1.0.1 Released

_Releases | Thomas Risberg |  April 22, 2004 | 0 Comments_

We are pleased to announce the release of Spring Framework 1.0.1.  
  
This is a bugfix and minor enhancement release;

the most important fixes and new features are:

-   added Struts ActionSupport and DispatchActionSupport base classes, for easy access to a Spring context
-   added Struts ContextLoaderPlugIn and DelegatingActionProxy, superseding Don Brown's Spring Struts Plugin
-   reworked ComponentControllerSupport class for Tiles to be compatible with both Struts 1.1 and Struts 1.2
-   fixed Hibernate/JTA synchronization cleanup in case of Hibernate flushing failure on commit
-   added support for transaction-scoped Hibernate Sessions with plain JTA or EJB CMT, without JtaTransactionManager
-   fixed JdbcTemplate's "queryForList" to correctly handle a single row with a single column as result
-   XmlApplicationContexts support file patterns as config locations (e.g. "/WEB-INF/\*-context.xml")
-   SQLErrorCodesFactory caches database product name to avoid unnecessary metadata lookups
-   factored out message code resolution into MessageCodesResolver strategy
-   refined internals of the AOP framework, for clearer subpackage interdependencies
-   refined support for array/List/Map properties in BeanWrapperImpl
-   refined AbstractMessageSource internals, for clearer handling of fallbacks

As always, see the [changelog](/docs/changelog.txt) for details.

We particularly encourage users of Spring's Hibernate/JTA integration to update promptly, to avoid any issues in case of flushing failures. Furthermore, users of Don Brown's Spring Struts Plugin are encouraged to switch to the new integration classes.

The release can be downloaded [here](http://sourceforge.net/project/showfiles.php?group_id=73357)
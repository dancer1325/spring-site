---
title: Spring Framework 1.0.2 Released
source: https://spring.io/blog/2004/06/02/spring-framework-1-0-2-released
scraped: 2026-02-24T09:41:05.102Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  June 02, 2004 | 0 Comments
---

# Spring Framework 1.0.2 Released

_Releases | Thomas Risberg |  June 02, 2004 | 0 Comments_

We are pleased to announce the release of Spring Framework 1.0.2.  
  
This release introduces a variety of enhancements throughout the framework, plus some minor bugs fixes.

Among the enhancements in this release are:  

-   New "mock" source tree and "spring-mock" jar file, containing JNDI and Servlet API mocks for usage in applications   
    
-   CachedIntrospectionResults flushes the JavaBeans Introspector cache for proper garbage collection on shutdown
-   Added ObjectFactory interface and ObjectFactoryCreatingFactoryBean, for non-intrusive creation of prototype beans
-   AbstractXmlApplicationContext uses PathMatchingResourcePatternResolver for Ant-style config location patterns
-   Added support for "xxx\*" field patterns to BindException's "getFieldErrors" and "getFieldError" methods
-   QuartzJobBean applies SchedulerContext entries as bean properties, just like it also does for JobDataMap entries
-   Added UserCredentialsDataSourceAdapter, for transparently appying username and password to target DataSource calls
-   Added RowMapperResultReader, to be used instead of a custom RowCallbackHandler when mapping rows to objects
-   Added AbstractLobStreamingResultSetExtractor and AbstractLobCreatingPreparedStatementCallback
-   Reworked "imagedb" sample app, with a redesigned implementation of the DefaultImageDatabase class
-   iBATIS SQL Maps 2.0 integration classes support per-SqlMapClient DataSource and lazy loading of paginated lists
-   DispatcherServlet detects ViewResolvers by type to allow for ViewResolver chaining (respecting order values)
-   added "doSubmitAction" template method to SimpleFormController, for submit actions without caring about ModelAndView
-   AbstractWizardFormController optionally supports "\_page" request parameter, for proper handling of back button usage
-   Added support for "person.na\*"/"person.address.\*"-style field patterns to BindTag's "path" attribute
-   Added Struts DelegatingRequestProcessor and DelegatingTilesRequestProcessor as alternatives to DelegatingActionProxy

See the [changelog](/docs/changelog.txt) for details. We have also refined our roadmap; see our JIRA for a rough plan of what's ahead.  

The release can be downloaded [here](http://sourceforge.net/project/showfiles.php?group_id=73357)
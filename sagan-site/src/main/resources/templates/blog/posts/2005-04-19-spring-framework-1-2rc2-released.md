---
title: Spring Framework 1.2RC2 Released
source: https://spring.io/blog/2005/04/19/spring-framework-1-2rc2-released
scraped: 2026-02-24T09:40:03.599Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  April 19, 2005 | 0 Comments
---

# Spring Framework 1.2RC2 Released

_Releases | Colin Sampaleanu |  April 19, 2005 | 0 Comments_

We're pleased to announce that Spring 1.2 RC2 has just been released.  

  
This release introduces one major new feature:  
  

-   support for JCA's Common Client Interface (CCI), including support for CCI local transactions

  
Furthermore, there are various minor enhancements, for example:  
  

-   deprecated ListableBeanFactory's getBeanDefinitionNames(type)", in favor of "getBeanNamesForType"  
    
-   added "value"/"value-ref" shortcut attributes to XML "entry" tag for maps  
    
-   added "alias" root element for XML bean definition files, for aliases for beans in other files  
      
    
-   JdbcAccessor lazily initializes the SQLExceptionTranslator by default now  
    
-   added further configuration options to LocalSessionFactoryBean for Hibernate3  
    
-   added "defaultDestinationName" property to JmsTemplate, for a dynamic default destination  
      
    
-   refined Resource support for compatibility with JDK 1.3's classic VM and with JRockit's jar paths  
    
-   refactored static PathMatcher class into PathMatcher interface and AntPathMatcher implementation  
    
-   added ConfigurableMimeFileTypeMap, with extensive MIME type mappings out-of-the-box  
      
    
-   added "context.i18n" package, with LocaleContext abstraction and global LocaleContextHolder  
    
-   DispatcherServlet exposes the current LocaleResolver through the global LocaleContextHolder  
    
-   added RemoteInvocationTraceInterceptor, logging remote calls and exceptions on the server  
      
    
-   updated JasperReports support for JR 0.6.6, using JRDefaultCompiler as default report compiler  
    
-   reworked AbstractJasperReportsView to work on JasperPrint instance rather than JasperReport instance  
    
-   added support for reports with embedded SQL statements to AbstractJasperReportsView

  
For a detailed list of enhancements and bug fixes, see the [changelog](http://www.springframework.org/docs/changelog.txt).  
  
This release candidate is considered stable and recommended for development use. We expect Spring 1.2 final to be released in about two weeks.
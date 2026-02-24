---
title: Spring Framework 1.2RC1 Released
source: https://spring.io/blog/2005/03/28/spring-framework-1-2rc1-released
scraped: 2026-02-24T09:40:16.841Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | admin |  March 28, 2005 | 0 Comments
---

# Spring Framework 1.2RC1 Released

_Releases | admin |  March 28, 2005 | 0 Comments_

It's Spring time ![Smile](http://forum.springframework.org/images/smiles/icon_smile.gif)   
  
We are pleased to announce that Spring 1.2 RC1 has just been released. This release introduces a number of major new features:

-   finer-grained distribution jar files, alongside the full spring.jar  
    
-   AOP Alliance interfaces are now contained in spring-aop.jar and spring.jar  
    

  
-   XML bean definition improvements ("ref" and "value" shortcut attributes  
    etc)  
    
-   improved AOP TargetSourceCreator mechanism (supporting  
    LazyInitTargetSource too)  
      
    
-   transaction annotation support for JDK 1.5+ (annotation called  
    "Transactional")  
    
-   improved WebLogicJtaTransactionManager (transaction names, isolation  
    levels)  
      
    
-   SqlRowSet support for JDBC (in conjunction with JdbcTemplate's  
    "queryForRowSet")  
    
-   Hibernate3 support (in orm.hibernate3; Hibernate 2.1 support is still  
    available)  
      
    
-   JMX support for export of Spring beans as managed resources and for MBean  
    access  
    
-   Commons Attributes and JDK 1.5+ annotations for JMX MBean export  
      
    This release also contains many minor enhancements, for example:  
      
    
-   factored out BindingErrorProcessor strategy for ServletRequestDataBinder  
    
-   improved ParameterMethodNameResolver for Web MVC MultiActionController
  
For a detailed list of enhancements and bug fixes, see the [changelog](http://www.springframework.org/docs/changelog.txt).  
  
This release candidate is already considered stable and recommended for development use. We expect Spring 1.2 final to be released in late April.  
  
Watch out for the Spring Web Flow preview release to follow later this week (for use with Spring 1.2)! Web Flow will also become part of the nightly build at that time.
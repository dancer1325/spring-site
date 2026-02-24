---
title: Spring Framework 1.1.2 Released
source: https://spring.io/blog/2004/11/14/spring-framework-1-1-2-released
scraped: 2026-02-24T09:40:38.794Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  November 14, 2004 | 0 Comments
---

# Spring Framework 1.1.2 Released

_Releases | Thomas Risberg |  November 14, 2004 | 0 Comments_

We are pleased to announce that Spring Framework 1.1.2 has just been released. This is a bugfix and minor enhancement release.  
   

Among the new features in this release are  

```
Copy        <ul>
          <li>added
```

support for multi-dimensional collections to BeanWrapperImpl (e.g. "map\[myKey\]\[0\]" or "map\[myKey\]\[0\].name")

-   added "getType(name)" method to BeanFactory interface, checking the type of object that "getBean" would return
-   added "getBeansOfType(type)" convenience method to ListableBeanFactory interface, without explicit filters
-   added PropertyPathFactoryBean, allowing to evaluate the property path of a target bean and expose the result
-   allow "bean\*" rather than "bean+" in XML bean definitions, i.e. no bean definitions in a file (just imports)

-   AbstractApplicationContext automatically registers a context-aware ResourceArrayPropertyEditor for Resource arrays
-   added GenericApplicationContext class, allowing for arbitrary definition formats (via a single internal BeanFactory)
-   improved ResourceBundleMessageSource and ReloadableResourceBundleMessageSource implementations
-   added "setText(plainText, htmlText)" method to MimeMessageHelper, for alternative texts in the same mail

-   added "objectResult(collection,type)" and "intResult"/"longResult(collection)" convenience methods to DataAccessUtils
-   added support for pre-bound Sessions (e.g. OpenSessionInViewFilter/Interceptor) with JTA and TransactionManagerLookup
-   added "load(entity, id)" method to HibernateOperations and HibernateTemplate
-   added "initialize" and "closeIterator" methods to HibernateOperations/Template, following "Hibernate.initialize/close"
-   added "queryCacheRegion" property to HibernateTemplate, specifying the cache region used for queries

-   added ServletContextResourcePatternResolver, to find matching resources within a web app even in an unexpanded WAR
-   added "defaultStatusCode" property to SimpleMappingExceptionResolver, specifying the HTTP status code for error views
-   UrlBasedViewResolver supports a "redirect:" prefix now, for convenient redirects through special view names
-   added "springMessage"/"springMessageText" macros for Velocity and "message"/"messageText" macros for FreeMarker

As always, have a look at the [changelog](http://www.springframework.org/docs/changelog.txt) for details.  
Downloads are available through the SourceForge project [page](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=73406)

```
Copy        <p>&nbsp;</p><p>Note that this
```

Spring distribution comes with an updated HSQLDB version, namely 1.7.2.7. Unfortunately, the HSQLDB 1.7.2 branch is incompatible with 1.7.1 in some areas. While all Spring sample apps have been adapted accordingly, please be aware that if you do decide to update your own applications with the new hsqldb.jar, you must also update your server instance (i.e. both need to run version 1.7.2), and any existing db data files may need to be upgraded. Furthermore, be aware that JBoss <= 3.2.5 shipped with HSQLDB 1.7.1 in the server classpath, while 3.2.6+ include HSQLDB 1.7.2.
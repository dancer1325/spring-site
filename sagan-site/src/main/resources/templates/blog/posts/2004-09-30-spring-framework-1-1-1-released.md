---
title: Spring Framework 1.1.1 Released
source: https://spring.io/blog/2004/09/30/spring-framework-1-1-1-released
scraped: 2026-02-24T09:40:43.190Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  September 30, 2004 | 0 Comments
---

# Spring Framework 1.1.1 Released

_Releases | Thomas Risberg |  September 30, 2004 | 0 Comments_

We are pleased to announce that Spring Framework 1.1.1 has just been released. This is a bugfix and minor enhancement release.  
   

Among the new features in this release are:  

```
Copy        <ul>
          <li>&quot;import&quot;
```

element for XML bean definitions

-   support for non-public classes and non-public init and destroy methods
-   bean factory regards bean references for correct destruction order (not requiring "depends-on")
-   bean factory detects JDK 1.4 and Commons Collections for linked/identity map creation
-   factored out the "publishEvent" method into the ApplicationEventPublisher interface
-   included new "test" package in mock JAR, offering superclasses for tests requiring Spring contexts
-   added "applyQueryTimeout" method to the JdoDialect interface
-   added "addAttribute" and "getAttribute" methods to RemoteInvocation
-   explicit support for EHCache via EhCacheManagerFactoryBean and EhCacheFactoryBean
-   SimpleMessageConverter102 handles BytesMessage without JMS 1.1's "getBodyLength" method
-   added JmsGatewaySupport convenience base class
-   added ServletForwardingController and ServletWrappingController
-   BindStatus and BindTag can be created without Errors instance in the request too
-   changed MessageTag's "arguments" attribute to Object
-   added "javaScriptEscape" attribute to MessageTag
-   added EscapeBodyTag aka "spring:escapeBody"
As always, have a look at the [changelog](http://www.springframework.org/docs/changelog.txt) for details.  
Downloads are available through the SourceForge project [page](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=73406)
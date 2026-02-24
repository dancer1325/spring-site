---
title: Spring Framework 1.1.3 Released
source: https://spring.io/blog/2004/12/12/spring-framework-1-1-3-released
scraped: 2026-02-24T09:40:34.401Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  December 12, 2004 | 0 Comments
---

# Spring Framework 1.1.3 Released

_Releases | Thomas Risberg |  December 12, 2004 | 0 Comments_

We are pleased to announce that Spring Framework 1.1.3 has just been released. This is a bugfix and minor enhancement release in the 1.1 series; most importantly, JDK 1.3 compatibility is fully restored.

Among the new features in this release are:  

```
Copy        <ul>
          <li>added
```

"setResourceLoader" method to GenericApplicationContext, for overriding the default resource loading strategy

-   added FileSystemResourceLoader, resolving paths as file system resources rather than as class path resources
-   BeanWrapperImpl automatically registers a default ResourceArrayPropertyEditor
-   added CustomCollectionEditor, by default registered to convert between Set, SortedSet and List (when necessary)
-   added "fileEncoding" and "propertiesPersister" properties to PropertyResourceConfigurer
-   reworked DefaultListableBeanFactory's "getBeansOfType" to return FactoryBean instances when passed a FactoryBean type
-   DefaultXmlBeanDefinitionParser resolves "set" tag as LinkedHashSet on JDK 1.4, falling back to HashSet on JDK 1.3
-   factored out AbstractRefreshableApplicationContext as base class of AbstractXmlApplicationContext
-   added "setIgnoreUnknownFields" method to DataBinder, enforcing request parameters to match fields when turned "false"

-   added "execute(ConnectionCallback)" method to JdbcTemplate, allowing any kind of operation on a given Connection
-   added DB2SequenceMaxValueIncrementer, implementing the DataFieldMaxValueIncrementer interface for a DB2 sequence
-   fixed Hibernate/JTA synchronization to also work with EJB remote transaction propagation (with >1 thread involved)
-   added "transactionConfigClass" and "transactionConfigProperties" customization properties to SqlMapClientFactoryBean

-   added optional "proxyInterface" property to JndiObjectFactoryBean, for exposing a proxy rather than the plain object
-   added "lookupOnStartup" and "cache" properties to JndiObjectFactoryBean, allowing for lazy lookup on first access etc
-   added "codebaseUrl" property to HttpInvokerClientInterceptor, specifying a URL for dynamic class download
-   added support for dynamic class downloading to AbstractHttpInvokerRequestExecutor and its subclasses

-   DispatcherServlet by default cleans up request attributes after include request (configurable via "cleanupOnInclude")
-   UrlBasedViewResolver supports a "forward:" prefix too, for forwards to other controllers through special view names
-   added "attributes" (Properties) and "attributesMap" (Map) properties to UrlBasedViewResolver, for static attributes
-   InternalResourceView performs an include if the response has already been committed (-> forward not possible anymore)
-   JstlView and TilesJstlView respect a JSTL "localizationContext" config in web.xml, checking those messages first
-   added overloaded "createVelocityContext" and "exposeHelpers" methods to VelocityView, with passed-in servlet response
-   added "toolAttributes" property to VelocityView, taking attribute name / tool class name pairs for tools to expose
-   added JasperReportsXxxView to allow for convenient rendering of CSV/HTML/PDF/XLS web views with Jasper Reports
-   added MappingDispatchActionSupport class, as convenience subclass of Struts 1.2's MappingDispatchAction

As always, have a look at the [changelog](http://www.springframework.org/docs/changelog.txt) for details.  
Downloads are available through the SourceForge project [page](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=73406)
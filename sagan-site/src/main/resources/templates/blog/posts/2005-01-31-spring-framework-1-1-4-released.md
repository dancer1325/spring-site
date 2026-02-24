---
title: Spring Framework 1.1.4 Released
source: https://spring.io/blog/2005/01/31/spring-framework-1-1-4-released
scraped: 2026-02-24T09:40:25.655Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  January 31, 2005 | 0 Comments
---

# Spring Framework 1.1.4 Released

_Releases | Colin Sampaleanu |  January 31, 2005 | 0 Comments_

We are pleased to announce that **Spring Framework 1.1.4** has just been released. This is a bugfix and minor enhancement release in the 1.1 series.  
  

```
Copy        </span>Among the new
```

features are:

-   added LazyInitTargetSource, lazily accessing a singleton from a BeanFactory (lazily initializing on first call)
-   added ServiceLocatorFactoryBean, allowing to map custom service locator interface methods to BeanFactory.getBean calls
-   reworked ResourcePatternResolver to extend ResourceLoader, for ResourcePatternResolver checks in ResourceLoaderAware
-   made BindException serializable, provided that the contained target object is serializable

-   added LazyConnectionDataSourceProxy, for lazily fetching JDBC Connections with native JDBC or Hibernate transactions
-   added "Sybase-jConnect" to default sql-error-codes.xml file, for database product name "Adaptive Server Enterprise"
-   added overloaded "queryForList"/"queryForObject"/"queryForLong"/"queryForInt" methods with arg types to JdbcTemplate
-   added "alwaysUseNewSession" flag to HibernateTemplate, enforcing a new Session even in case of a pre-bound Session
-   HibernateTemplate proxies exposed Sessions by default, applying query cache settings and transaction timeouts
-   added "isConnectFailure(RemoteException)" hook to AbstractRemoteSlsbInvokerInterceptor, for customized failure checks

-   added "isConnectFailure(RemoteException)" hook to (Jndi)RmiClientInterceptor, for customized connect failure checks
-   added JaxRpcServicePostProcessor interface, intended for reusable custom type mappings etc for a JAX-RPC service
-   added "servicePostProcessors" property to LocalJaxRpcServiceFactory and subclasses (incl. JaxRpcPortProxyFactoryBean)

-   added "messageIdEnabled" and "messageTimestampEnabled" properties to JmsTemplate, to disable id/timestamp on producer
-   added "pubSubNoLocal" property to JmsTemplate, leading to the NoLocal flag being specified on MessageConsumer creation
-   added "receiveSelected" and "receivedSelectedAndConvert" methods to JmsTemplate, accepting JMS message selectors
-   added "schedulerListeners", "(global)JobListeners", "(global)TriggerListeners" bean properties to SchedulerFactoryBean
-   added "jobListenerNames"/"triggerListenerNames" property to JobDetailBean, CronTriggerBean, SimpleTriggerBean (resp.)

-   added ServletContextAttributeFactoryBean, exposing an existing ServletContext attribute for bean references
-   added ServletContextAttributeExporter, taking Spring-defined objects and exposing them as ServletContext attributes
-   added ServletContextPropertyPlaceholderConfigurer, a subclass that falls back to web.xml context-param entries
-   added "publishEvents" init-param to FrameworkServlet, allowing to turn off the publishing of RequestHandledEvents
-   Spring JSP tags work outside DispatcherServlet too, falling back to root WebApplicationContext and JSTL/request locale

Please see the [changelog](http://www.springframework.org/docs/changelog.txt) for details.  
Downloads are available through the SourceForge project [page](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=73406)
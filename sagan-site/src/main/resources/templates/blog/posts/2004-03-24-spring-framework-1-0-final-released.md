---
title: Spring Framework 1.0 Final Released
source: https://spring.io/blog/2004/03/24/spring-framework-1-0-final-released
scraped: 2026-02-23T14:07:16.888Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  March 24, 2004 | 10 Comments
---

# Spring Framework 1.0 Final Released

_Releases | Thomas Risberg |  March 24, 2004 | 10 Comments_

We are pleased to announce that Spring Framework 1.0 final has just been released.  

### 1\. SCOPE

Spring 1.0 is a complete Java/J2EE application framework, covering the following functionality:

-   the most sophisticated lightweight container available today, with various flavors of setter and constructor injection
-   AOP interception framework based on the AOP Alliance interfaces, integrated with the core container
-   JNDI support classes, allowing for easy wiring of Spring-managed beans with JNDI-located objects
-   application context concept, providing resource loading and message access abstractions
-   generic transaction management with pluggable strategies, supporting declarative and programmatic demarcation
-   support for source-level metadata, with Commons Attributes as default implementation (e.g. for transaction attributes)
-   generic DAO support, providing a generic data access exception hierarchy for use with any data access strategy
-   JDBC abstraction that simplifies resource and error handling, also covering BLOB/CLOB support
-   Hibernate support, providing SessionFactory management and transaction-scoped ThreadLocal Sessions
-   support classes for JDO 1.0 and iBATIS SQL Maps 1.3/2.0, integrated with Spring's transaction management
-   mail sender abstraction, with special support for JavaMail including convenient handling of file attachments
-   scheduling support for Quartz and Timer, making it easy to invoke methods of Spring-managed beans
-   remoting support for RMI, JAX-RPC and Caucho's Hessian/Burlap, for easy exposure of Spring-managed beans
-   convenience classes for accessing and implementing EJBs, both local and remote
-   web application context, for loading a Spring application context in a web environment
-   flexible web MVC framework, built on strategy interfaces and integrated with various view technologies

A unique benefit of Spring is the ability to apply declarative transactions to any POJO, with JTA or a local transaction strategy: This allows to have lightweight transactional business objects in any sort of environment, for example in a web app running on plain Tomcat. Spring's transaction management is also capable of managing associated resources like Hibernate Sessions, avoiding the burden of custom ThreadLocal Sessions.

Building on the resource management infrastructure, Spring's HibernateTemplate significantly simplifies the implementation of Hibernate-based DAOs, reducing typical data access operations to single statements. A similar level of convenience is available for JDBC in the form of Spring's JdbcTemplate, and for iBATIS SQL Maps 1.3/2.0 in the form of SqlMapTemplate respectively SqlMapClientTemplate.

An important characteristic of Spring is that many of its features can be used individually, without the need to adopt an architecture that's completely based on Spring. Furthermore, a Spring-managed middle tier and all the functionality it provides can be reused in any sort of environment, be it a J2EE web application with a Spring web MVC, Struts, WebWork or Tapestry web tier, or a standalone application with a Swing user interface.

### 2\. SAMPLES AND USAGES

The Spring distribution comes with numerous sample applications. The "-with-dependencies" download includes all third-party libraries that are necessary for building an running them.

-   our JPetStore, adapting the iBATIS JPetStore with a Spring-managed middle tier and alternative Spring/Struts web tiers
-   Petclinic, a simple database-driven web application that offers alternative Hibernate/JDBC data access strategies
-   Countries, a web app that illustrates locale and theme handling, and the generation of PDF and Excel web views
-   Image Database, a one-screen web app that illustrates BLOB/CLOB handling and Velocity/FreeMarker web views
-   Tiles Example, demonstrating the use of Tiles with Spring's web MVC framework

Spring is already used in a significant number of production applications, including mission-critical applications. Current adopters include a number of large banks and health care organizations in Europe and the US. Noteworthy usages of Spring in publically visible applications are:

-   Matt Raible's [AppFuse](http://raibledesigns.com/wiki/Wiki.jsp?page=AppFuse) application skeleton, adopting Spring as middle tier framework with a Struts web tier
-   Atlassian's new product [Confluence](http://www.atlassian.com/software/confluence), built on a Spring middle tier and a WebWork2 web tier

### 3\. UPGRADING

Users upgrading from a Spring 1.0 milestone or release candidate, please see the [changelog](/docs/changelog.txt); there have been quite a few refinements in the details. Among the changes since 1.0 RC2 are:

-   AOP support upgraded to AOP Alliance 1.0
-   more sophisticated handling of indexed and mapped properties in BeanWrapperImpl
-   new ResourceLoader interface, extended by the ApplicationContext interface
-   ReloadableResourceBundleMessage supports configurable character encodings
-   MimeMessageHelper supports configurable character encodings
-   JdbcTemplate has new generic "execute" methods and refined "query" methods
-   iBATIS SQL Maps 2.0 support upgraded to SQL Maps 2.0 RC1
-   added support for FreeMarker 2.3

Please note the following upgrade issues with respect to the AOP support:

-   you have to update your aopalliance.jar
-   AdvisorAutoProxyCreator was renamed to DefaultAdvisorAutoProxyCreator
-   TransactionAttributeSourceTransactionAroundAdvisor was renamed to TransactionAttributeSourceAdvisor
-   custom Advisor implementations: getAdvice() now returns org.aopalliance.aop.Advice rather than Object
-   if you implemented org.springframework.aop.MethodAfterReturningAdvice, replace with AfterReturningAdvice (no change in method signature)

The release can be downloaded [here](http://sourceforge.net/project/showfiles.php?group_id=73357)
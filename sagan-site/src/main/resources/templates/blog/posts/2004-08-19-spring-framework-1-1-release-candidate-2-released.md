---
title: Spring Framework 1.1 Release Candidate 2 Released
source: https://spring.io/blog/2004/08/19/spring-framework-1-1-release-candidate-2-released
scraped: 2026-02-24T09:40:51.969Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  August 19, 2004 | 0 Comments
---

# Spring Framework 1.1 Release Candidate 2 Released

_Releases | Thomas Risberg |  August 19, 2004 | 0 Comments_

We are pleased to announce that Spring Framework 1.1 Release Candidate 2 is available. This will be the last release candidate for 1.1; release 1.1 final can be expected very soon.

  
  
Among the new features in this release are:

-   the new HTTP invoker remoting strategy, which uses Java serialization over HTTP (combining the strengths of RMI and Hessian)
-   RemoteInvocationFactory and RemoteInvocationExecutor strategies for HTTP/RMI invoker, for additional invocation context
-   basic JSF support in the form of a JSF VariableResolver implementation that is aware of Spring-managed middle tier beans
-   form simplification macros for Velocity and FreeMarker, providing HTML input macros etc for easy form building
-   DispatcherServlet looks for handler adapters, handler mappings, exception res., view res. in ancestor contexts as well
-   HibernateTransactionManager and HibernateInterceptor support per-transaction entity interceptor instances
-   WebLogicJtaTransactionManager which can resume a WebLogic JTA transaction even if it was marked rollback-only
-   MimeMessageHelper provides "addInline" methods for adding inline elements with content IDs (referenced via "cid:xxx")
-   Errors interface provides "pushNestedPath"/"popNestedPath" methods, for convenient handling of temporary nested paths
-   Spring's Resource objects support a "createRelative" operation, for resource paths relative to the given one

Important changes and bugfixes include:

-   a constructor argument value without index will now just be considered once, rather than matched multiple times
-   introduced BeanDefinitionReader interface and reworked XmlBeanDefinitionParser SPI (warning: not backwards-compatible)
-   fixed TransactionAspectSupport's after-returning behavior to always call commit even if transaction is not new
-   SchedulerFactoryBean reschedules triggers in case of "overwriteExistingJobs", to update triggers of persistent jobs
-   fixed JmsTemplate102's "doSend" implementation to properly work with a JMS 1.0.2 API jar in the classpath

  
See the [changelog](/docs/changelog.txt) for details.  
  
The release can be downloaded [here](http://sourceforge.net/project/showfiles.php?group_id=73357)
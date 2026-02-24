---
title: Spring Framework 1.1 Final Released
source: https://spring.io/blog/2004/09/05/spring-framework-1-1-final-released
scraped: 2026-02-24T09:40:47.563Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  September 05, 2004 | 0 Comments
---

# Spring Framework 1.1 Final Released

_Releases | Thomas Risberg |  September 05, 2004 | 0 Comments_

We are pleased to announce that Spring Framework 1.1 (final) has just been released. Since 1.1 RC2, some API clarifications have happened and a number of bugs have been fixed.

There is also a variety of minor new features:  

-   reworked BeanWrapperImpl's property-specific custom editor handling to allow registration for uninitialized subpaths
-   added "applyBeanPropertyValues" method to AutowireCapableBeanFactory, for populating an existing bean instance
  
-   added "(abstract)" marker for properties bean definitions respectively "abstract" attribute for XML bean definitions  
    
  
-   added support for SqlReturnType interface which allows to return custom types from stored procedures
-   added auto-conversion of java.util.Date and java.util.Calendar to java.sql.Date/Time/Timestamp for JDBC parameters
-   added support for WebSphere 4 to WebSphereNativeJdbcExtractor, autodetecting WebSphere 5 and 4 now
  
-   added WebLogicServerTransactionManagerFactoryBean, to be used with WebLogicJtaTransactionManager on WebLogic 7.0
-   added support for direct JTA synchronization to AbstractLobType, as alternative to Spring transaction synchronization
-   added "flush" method to HibernateOperations/HibernateTemplate and JdoOperations/JdoTemplate, for eager flushing
-   added "getReportQueryIteratorByQuery" method to OJB PersistenceBrokerOperations and PersistenceBrokerTemplate
  
-   deprecated AbstractJndiLocator base class in favor of new JndiObjectLocator base class with explicit "lookup" method
-   added JndiObjectTargetSource which performs a fresh JNDI lookup for each call, allowing for hot redeployment in JNDI
-   added "cache" flag to JndiDestinationResolver, to allow for turning off the caching of Destination objects from JNDI
-   added support for ObjectMessage to SimpleMessageConverter, converting between Serializable objects and ObjectMessages
  
-   added RemoteConnectFailureException and RemoteLookupFailureException as RemoteAccessException subclasses
-   added JndiRmiServiceExporter, JndiRmiClientInterceptor, JndiRmiProxyFactoryBean (for RMI-IIOP resp. CORBA)
-   added "lookupStubOnStartup", "cacheStub" and "refreshStubOnConnectFailure" flags to RmiClientInterceptor
-   added "lookupHomeOnStartup" and "refreshHomeOnConnectFailure" flags to AbstractRemoteSlsbInvokerInterceptor
  
-   added "createMimeMessage(InputStream)" method to JavaMailSender, building a MimeMessage from raw MIME content
-   MimeMessageHelper creates "multipart/related" now, to make mails with inline images compatible with Outlook Express
-   added "validateAddresses" property to MimeMessageHelper (off by default), delegating to JavaMail 1.3's "validate"
  
-   added "http10Compatible" flag to RedirectView, to be turned off for sending HTTP 1.1 status code 303 rather than 302
-   added "buildPdfMetadata" callback to AbstractPdfView, for adding meta fields like author to the iText PDF Document
-   added LookupDispatchActionSupport class to Struts support, analogous to ActionSupport but for LookupDispatchActions

As usual, see the [changelog](http://www.springframework.org/docs/changelog.txt) for details. Note that the 1.1 code base contains minor changes in various SPIs which are not backwards-compatible. The API as typically used in applications is as close to 100% compatible as possible, though.  
  
Downloads are available through the SourceForge project [page](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=73406)
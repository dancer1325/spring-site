---
title: Spring Framework 3.0 goes GA
source: https://spring.io/blog/2009/12/16/spring-framework-3-0-goes-ga
scraped: 2026-02-24T09:01:36.003Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  December 16, 2009 | 0 Comments
---

# Spring Framework 3.0 goes GA

_Engineering | Juergen Hoeller |  December 16, 2009 | 0 Comments_

After a long ride, it is my pleasure to announce that Spring 3.0 GA (.RELEASE) is finally available ([download page](http://www.springsource.com/download))! All of SpringSource is celebrating - join the party :-)

For some very recent news, Spring 3.0 GA is compatible with Java EE 6 final in terms of runtime environments now (e.g. on GlassFish v3 as released last week) and supports JPA 2.0 final already (e.g. using EclipseLink 2.0). We also support the newly introduced [@ManagedBean](http://java.sun.com/javaee/6/docs/api/javax/annotation/ManagedBean.html) (JSR-250 v1.1) annotation for component scanning now, which nicely complements our [@Inject](http://java.sun.com/javaee/6/docs/api/javax/inject/Inject.html) (JSR-330) support for annotation-driven dependency injection.

For your convenience, here is a summary of key features in Spring 3.0 overall:

-   **Spring expression language (SpEL):** a core expression parser for use in bean definitions, allowing for references to nested bean structures (e.g. properties of other beans) as well as to environmental data structures (e.g. system property values) through a common #{…} syntax in property values.
    
-   **Extended support for annotation-based components:** now with the notion of configuration classes and annotated factory methods (as known from Spring JavaConfig). Spring also allows for injecting configuration values through @Value expressions now, referring to configuration settings via dynamic #{…} expressions or static ${…} placeholders.
    
-   **Powerful stereotype model:** allows for creating 'shortcut' annotations through the use of meta-annotations, e.g. for default scopes and default transactional characteristics on custom stereotypes. Imagine a custom @MyService annotation indicating @Service, @Scope("request") and @Transactional(readOnly=true) through a single annotation.
    
-   **Standardized dependency injection annotations:** Spring 3.0 comes with full support for the JSR-330 specification for Dependency Injection in Java – annotation-driven injection via @Inject and its associated qualifier and provider model, as an alternative to Spring's own @Autowired and co.
    
-   **Declarative model validation based on constraint annotations:** Spring-style setup of a JSR-303 Bean Validation provider (such as Hibernate Validator 4.0). Comes with an annotation-driven validation option in Spring MVC, exposing a unified view on constraint violations through Spring’s binding result facility.
    
-   **Enhanced binding and annotation-driven formatting**: Converter and Formatter SPIs as an alternative to standard PropertyEditors. Formatting may be driven by annotations in a style similar to JSR-303 constraints, e.g. using @DateTimeFormat. Also, check out the new mvc namespace for convenient setup of formatting and validation in Spring MVC.
    
-   **Comprehensive REST support:** native REST capabilities in Spring MVC, such as REST-style request mappings, URI variable extraction through @PathVariable parameters, and view resolution driven by content negotiation. Client-side REST support is available in the form of a RestTemplate class.
    
-   **Rich native Portlet 2.0 support:** Spring MVC fully supports Portlet 2.0 environments and Portlet 2.0’s new event and resource request model. Includes specialized mapping facilities for typical portlet request characteristics: @ActionMapping, @RenderMapping, @ResourceMapping, @EventMapping.
    
-   **Object/XML Mapping (OXM):** as known from Spring Web Services, now in Spring Framework core. Marshalling and Unmarshaller abstractions with out-of-the-box support for JAXB 2, Castor, etc. Comes with integration options for XML payloads in Spring MVC and Spring JMS.
    
-   **Next-generation scheduling capabilities:** new TaskScheduler and Trigger mechanisms with first-class cron support. Spring 3.0 comes with a convenient task namespace and also supports @Async and @Scheduled annotations now. This can be executed on top of native thread pools or server-managed thread pools.
    

Beyond those big themes, there are hundreds of refinements in the details which you will particularly appreciate when upgrading from Spring 2.5. Check the changelog and the javadocs...

In terms of system requirements, Spring 3.0 covers a broad range of environments. For two key characteristics, Spring 3.0 supports **Java SE 5 and above** and **Servlet 2.4 and above**, e.g. Tomcat 5.x and 6.x, also retaining **compatibility with common enterprise servers such as WebSphere 6.1 and WebLogic 9.2** (which are formally still based on J2EE 1.4). At the same time, we support GlassFish v3 already - adapting to Java EE 6 API level in Spring as well.

As a consequence, Spring 3 brings **brand-new component model features**, and also standards like JSR-330 injection and JSR-303 validation, to established production environments - **without having to upgrade your server installation!** All you have to do is to upgrade the application libraries of your Spring-powered application to Spring 3.0...

Enjoy - and watch out for follow-up posts about specific Spring 3 features, as well as for samples running on Spring 3.0!
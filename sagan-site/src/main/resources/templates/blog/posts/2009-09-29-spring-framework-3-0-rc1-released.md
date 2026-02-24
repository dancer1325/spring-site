---
title: Spring Framework 3.0 RC1 released
source: https://spring.io/blog/2009/09/29/spring-framework-3-0-rc1-released
scraped: 2026-02-24T09:03:42.157Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  September 29, 2009 | 0 Comments
---

# Spring Framework 3.0 RC1 released

_Engineering | Juergen Hoeller |  September 29, 2009 | 0 Comments_

I'm pleased to announce that we recently released the first Spring 3.0 release candidate ([download page](http://www.springsource.com/download)). This release completes the key Spring 3.0 feature set. You certainly remember the original Spring 3.0 themes REST and EL; in the meantime, we have been expanding the list significantly:

-   **Fully Java 5 based**: This is the first Spring generation which requires Java 5 or above, with Java 5 syntax used in the entire Spring API as well as in the entire implementation codebase. For example, the BeanFactory API returns generically typed bean instances wherever possible, and ApplicationListeners may declare a specific event type using generics now. For a comparison: In Spring 2.5, the actual Spring core was still JDK 1.4 compatible, while a lot of higher-level functionality was built on Java 5.
    
-   **Spring expression language (SpEL):** a core expression parser for use in bean definitions, allowing for references to nested bean structures (e.g. properties of other beans) as well as to environmental data structures (e.g. system property values) through a common #{...} syntax in property values. This also serves as a foundation for various expression-based features across the Spring project portfolio.
    
-   **Extended support for annotation-based components:** now with the notion of configuration classes and annotated factory methods - the key Java configuration capabilities of the Spring JavaConfig project are finally available in Spring proper! Spring also allows for injecting configuration values through @Value expressions now, referring to configuration settings via dynamic #{...} expressions or static ${...} placeholders.
    
-   **Powerful stereotype model:** allows for creating 'shortcut' annotations through the use of meta-annotations, e.g. for default scopes and default transactional characteristics on custom stereotypes. Imagine a custom @MyService annotation indicating @Service, @Scope("request") and @Transactional(readOnly=true) through a single annotation. This is the Don’t Repeat Yourself principle applied to the use of component annotations!
    
-   **Standardized dependency injection annotations:** Spring 3.0 comes with early support for the [JSR-330 specification for Dependency Injection in Java](http://www.jcp.org/en/jsr/summary?id=330) - annotation-driven injection via *javax.inject.Inject* and its associated qualifier and provider model, as an alternative to Spring's own @Autowired and co. Note that JSR-330 has not been finalized yet; we will be completing Spring's *javax.inject* support as the specification itself matures.
    
-   **Declarative model validation based on constraint annotations:** Spring-style setup of a [JSR-303 Bean Validation](http://www.jcp.org/en/jsr/summary?id=303) provider (such as Hibernate Validator 4.0). Comes with an annotation-driven validation option in Spring MVC, exposing a unified view on constraint violations through Spring’s binding result facility. Note that JSR-303 is near-final but not quite final yet; we will be tracking its ongoing evolution up until GA.
    
-   **Enhanced binding and formatting facilities:** stateless Converter and Formatter SPIs as an alternative to standard PropertyEditors, with full Spring container and Spring MVC integration. Separates between converting (core type coercion) and formatting (rendering to and parsing from localized String values). Formatting may be driven by annotations in a style similar to the use of JSR-303 constraint annotations.
    
-   **Comprehensive REST support:** native REST capabilities in Spring MVC, such as REST-style request mappings, URI variable extraction through @PathVariable parameters, and view resolution driven by content negotiation. Think about this as Spring MVC 2.5 with first-class REST capabilities built in now - while still focusing on the MVC approach. Client-side REST support is available in the form of a RestTemplate class.
    
-   **Object/XML Mapping (OXM):** as known from Spring Web Services, now in Spring Framework core. Marshalling and Unmarshaller abstractions with out-of-the-box support for JAXB 2, Castor, etc. Comes with integration options for XML payload support in Spring MVC and Spring JMS.
    
-   **Portlet 2.0 support:** Spring MVC fully supports Portlet 2.0 environments and Portlet 2.0’s new event and resource request model. Includes specialized mapping facilities for typical portlet request characteristics: @ActionMapping, @RenderMapping, @ResourceMapping, @EventMapping.
    
-   **Next-generation scheduling capabilities:** new TaskScheduler and Trigger mechanisms with first-class cron support, aligned with Spring's TaskExecutor mechanism. Spring 3.0 comes with a convenient task namespace and also supports @Async and @Scheduled annotations now. This can be executed on top of native thread pools or server-managed thread pools, with support for all major Java EE application servers.
    
-   **Last but not least, early support for Java EE 6:** Spring 3.0 already supports the use of JSF 2.0 and JPA 2.0 in a Spring environment, in addition to JSR-303 and JSR-330 support. Further Java EE 6 related specifications such as Servlet 3.0 will be fully supported as they become available in concrete products; this is scheduled for the Spring 3.1/3.2 timeframe.
    

Of particular significance in the RC1 release are the above mentioned "3-0" specifications **JSR-330** and **JSR-303**; we are going to elaborate on Spring's support for those specs in follow-up posts. For the time being, check out the revised section on [annotation-based configuration](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/ch03s09.html#beans-autowired-annotation) and the new chapter on [declarative validation](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/ch05s07.html). You might also be interested in Spring's new formatting features: [annotation-driven field formatting](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/ch05s06.html#ui-format-Formatted-Annotation).

P.S.: On top of the key feature set in RC1, we are considering several minor enhancements for inclusion in the upcoming 3.0 RC2: for example, a web namespace for formatting and validation setup with Spring MVC. 3.0 RC2 is scheduled for mid October; its primary focus is on compatibility improvements as well as on runtime optimizations. Stay tuned!
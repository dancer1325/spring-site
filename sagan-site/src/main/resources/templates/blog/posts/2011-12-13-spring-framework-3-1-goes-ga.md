---
title: Spring Framework 3.1 goes GA
source: https://spring.io/blog/2011/12/13/spring-framework-3-1-goes-ga
scraped: 2026-02-24T08:30:37.078Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  December 13, 2011 | 0 Comments
---

# Spring Framework 3.1 goes GA

_Engineering | Juergen Hoeller |  December 13, 2011 | 0 Comments_

It is my pleasure to announce that Spring Framework 3.1 becomes [generally available](http://www.springsource.org/node/3334) today! This release delivers several key features that make Spring ready for the challenges of 2012 and beyond:

-   The **environment abstraction** and the associated **bean definition profiles**, along with centrally configurable property sources for placeholder resolution.
    
-   **Java-based application configuration** based on **@Enable\* annotations** on configuration classes, allowing for convenient container configuration: e.g. using @EnableTransactionManagement to activate declarative transaction processing.
    
-   The **cache abstraction** with our **declarative caching** solution (@Cacheable etc) on top, focusing on convenient interaction between application code and cache providers.
    
-   The **Servlet 3.0 based WebApplicationInitializer** mechanism for bootstrapping a Spring web application **without web.xml!** This is a key piece in Spring's web configuration story, providing a rich alternative to XML-based bootstrapping.
    
-   Revised MVC processing with **flash attribute support**, a new **@RequestPart** annotation, and further **REST support refinements**. This new HandlerMapping/HandlerAdapter variant is also highly extensible for custom MVC needs.
    

Beyond the above major themes, we invested into our O/R Mapping support, allowing for **JPA package scanning without persistence.xml**, and supporting **Hibernate 4.0** (CR7 at this time - we will fully support Hibernate 4.0 GA once released).

Last but not least, this is the first Spring release with **first-class Java 7 support**. While older Spring versions run perfectly fine on Java 7, Spring 3.1 goes the extra mile and fully supports JDBC 4.1 as well as convenient ForkJoinPool setup and injection.

As usual, this release also includes many recent bug fixes. Spring 3.1 is fully compatible with Spring 3.0 and continues to have Java 5+ and Servlet 2.4+ as minimum system requirements. We recommend a Spring 3.1 upgrade to all Spring 3.0.x users.

Enjoy!
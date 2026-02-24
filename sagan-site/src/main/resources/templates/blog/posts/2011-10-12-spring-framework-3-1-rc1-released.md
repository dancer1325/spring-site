---
title: Spring Framework 3.1 RC1 released
source: https://spring.io/blog/2011/10/12/spring-framework-3-1-rc1-released
scraped: 2026-02-24T08:34:02.750Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  October 12, 2011 | 0 Comments
---

# Spring Framework 3.1 RC1 released

_Engineering | Juergen Hoeller |  October 12, 2011 | 0 Comments_

It is my pleasure to announce that the first Spring Framework 3.1 release candidate has - finally - been [released this week](http://www.springsource.org/node/3279)! We have been working on this release for several months, completing our milestone work and recently adding support for Java SE 7 and for Hibernate 4.0 to the feature list.

Spring Framework 3.1 RC1 completes the 3.1 feature set:

-   The **environment abstraction** and the **environment profile mechanism** for bean definitions.
    
-   Comprehensive **Java-based application configuration** based on **@Enable\* annotations** on @Configuration classes.
    
-   An overhaul of the TestContext framework with **first-class support for @Configuration classes** and for environment profiles.
    
-   Our new **"c:" namespace** for conveniently specifying **constructor arguments by name** in a concise inline style.
    
-   The **cache abstraction** with our **declarative caching** solution (@Cacheable etc) on top.
    
-   The **Servlet 3.0 based WebApplicationInitializer** mechanism for bootstrapping a Spring web application **without web.xml!**
    
-   Revised MVC processing with **flash attribute support**, a new **@RequestPart** annotation, and **REST support refinements**.
    
-   **Refined JPA support**: package scanning **without persistence.xml**; consistent configuration based on persistence unit names.
    
-   Support for **Hibernate 4.0** (CR4 at this time) as well as for **Quartz 2.0**, while preserving compatibility with older versions.
    
-   Last but not least: a **Java 7** theme, with **JDBC 4.1** getting autodetected and with basic support for **ForkJoinPool setup**.
    

Note that we eventually dropped conversation support from the 3.1 feature set since there was stronger demand for other themes of the above. We will reconsider conversation support for Spring 3.2, based on further feedback and on concrete solutions demanded for the next-generation web application architectures that are being built today.

We are preparing for the 3.1 GA release in late November now, with an RC2 planned in between. Let us know how RC1 works for you in the meantime!
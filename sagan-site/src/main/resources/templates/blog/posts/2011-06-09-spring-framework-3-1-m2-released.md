---
title: Spring Framework 3.1 M2 released
source: https://spring.io/blog/2011/06/09/spring-framework-3-1-m2-released
scraped: 2026-02-24T08:40:16.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  June 09, 2011 | 0 Comments
---

# Spring Framework 3.1 M2 released

_Engineering | Juergen Hoeller |  June 09, 2011 | 0 Comments_

Spring Framework 3.1 M2 has been [released this week](http://www.springsource.org/node/3149), marking the end of the 3.1 milestone phase. We are moving on to the release candidate phase now, preparing for a feature-complete RC1 in July and a GA release in September.

3.1 M2 completes the work on several major themes started in 3.1 M1 back in February:

-   We've stabilized our **environment abstraction** and the **environment profile mechanism**. If you haven't given it a try already, now is a great time to check it out!
    
-   Our **Java-based application configuration** approach has changed from the @Feature approach in M1 to **@Enable\* annotations** on regular @Configuration classes in M2.
    
-   The **cache abstraction** has been revised for delivering a minimal cache interaction SPI. Our **declarative caching** solution (@Cacheable etc) keeps sitting on top of it.
    

Furthermore, we added significant new features to the overall configuration arrangement:

-   Rich support for **Servlet 3.0 based initializers**: Our new WebApplicationInitializer approach allows for **bootstrapping a Spring web application without web.xml!**
    
-   A new "packagesToScan" feature for JPA, building a **default persistence unit** from a scan of specified base packages - **without persistence.xml** or other metadata files.
    
-   Our new **RequestMappingHandlerAdapter** in Spring @MVC: a **customizable backend for MVC processing** based on a flexible HandlerMethod abstraction.
    

Of course, there are plenty of other features to discover as well, for example:

-   Our new **"c:" namespace** for conveniently specifying **constructor arguments by name** in a concise inline style.
    
-   An overhaul of the TestContext framework with **first-class testing support for @Configuration classes** and environment profiles.
    
-   **REST support refinements** with respect to URI templates, path variable handling and content type specification in Spring MVC.
    

We will be publishing several blog posts on specific feature areas in the course of the next couple of days, starting with comprehensive coverage of our configuration enhancements in M2. Stay tuned! And let us know how it works for you...
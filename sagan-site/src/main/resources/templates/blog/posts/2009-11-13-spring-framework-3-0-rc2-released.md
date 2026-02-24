---
title: Spring Framework 3.0 RC2 released
source: https://spring.io/blog/2009/11/13/spring-framework-3-0-rc2-released
scraped: 2026-02-24T09:02:32.166Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  November 13, 2009 | 0 Comments
---

# Spring Framework 3.0 RC2 released

_Engineering | Juergen Hoeller |  November 13, 2009 | 0 Comments_

It is my pleasure to announce that we released the second Spring 3.0 release candidate today ([download page](http://www.springsource.com/download)). This release introduces key improvements over RC1 in several areas, in particular:

-   **Spring 3.0 RC2 is fully JSR-330 compliant** and passes the final version of the TCK. JSR-330, a.k.a. "Dependency Injection for Java", basically standardizes an @Inject annotation with a qualifier model. The "javax.inject" annotations can now be used as alternative to Spring's own @Autowired and @Qualifier annotations. Spring's <context:annotation-config> element automatically activates JSR-330 processing as well (if the "javax.inject" API is present).
    
-   **A dedicated AnnotationConfigApplicationContext:** making programmatic bootstrapping as convenient as possible, without any XML involved. Explicit registration of annotated classes is supported as well as component scanning in the classpath. This works fine not only with Spring's @Component model but also with @Configuration classes (a.k.a. "JavaConfig") and JSR-330 compliant classes.
    
-   **A new mvc configuration namespace:** <mvc:annotation-driven/> activates rich processing of @Controller classes, including support for annotation-driven formatting and annotation-driven validation (if a JSR-303 "Bean Validation" provider such as Hibernate Validator 4.0 is present). The newly revised version of our formatting package also comes with support for the popular Joda Time library.
    
-   **Revised lifecycle management at runtime:** Auto-starting message listener containers and schedulers will now kick off once context configuration has been fully completed. On context close, a specific shutdown order can be defined for 'phased' stopping of lifecycle components. A configurable LifecycleProcessor delegate provides corresponding customization hooks.
    

Finally, RC2 comes with many refinements in the details: e.g. revised URI encoding for proper treatment of special characters in any part of the request URL; refined scope handling in parent-child relationships for inheriting a bean's scope; support for load-time weaving on JBoss 5.x; etc.

**Spring 3.0 GA is just around the corner now...**

P.S.: Special thanks to all the people in the 'extended' Spring developer team - both within and outside of SpringSource - who made this release possible! You rock :-)
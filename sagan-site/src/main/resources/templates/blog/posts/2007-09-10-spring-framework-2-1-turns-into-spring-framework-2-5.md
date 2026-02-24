---
title: Spring Framework 2.1 turns into Spring Framework 2.5!
source: https://spring.io/blog/2007/09/10/spring-framework-2-1-turns-into-spring-framework-2-5
scraped: 2026-02-24T09:25:10.191Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  September 10, 2007 | 0 Comments
---

# Spring Framework 2.1 turns into Spring Framework 2.5!

_Engineering | Juergen Hoeller |  September 10, 2007 | 0 Comments_

My first blog post - and what a big announcement to make :-)

After a series of Spring 2.1 milestone releases, we've been reviewing the overall set of features that we introduced:

-   full **Java 6 and Java EE 5 support** (JDBC 4.0, JTA 1.1, JavaMail 1.4, JAX-WS 2.0, etc)
-   full-featured **annotation-driven dependency injection** (including support for 'qualifier' annotations)
-   support for **component scanning in the classpath** (autodetecting annotated classes)
-   **bean name pointcut element** in AspectJ pointcut expressions
-   built-in support for for **AspectJ load-time weaving** (based on Spring's LoadTimeWeaver abstraction)
-   **further XML configuration namespaces** ("context", "jms") for maximum convenience
-   **extended SimpleJdbcTemplate** functionality (support for named parameters etc)
-   officially **certified WebSphere support** (support for the WebSphere 6 UOWManager facility etc)
-   Spring framework jars are shipped as **OSGi-compliant bundles** out of the box
-   Spring ApplicationContext can be **deployed as JCA RAR file** (for headless application modules)
-   **JCA 1.5 message endpoint management** (for Spring-managed JMS and CCI message listeners)
-   completely **revised framework for integration tests** (with support for JUnit 4 and TestNG)

as well as many refinements in the details. Almost all of those features are available in the recently released 2.1 M4 already.

We concluded that this goes significantly beyond what we originally planned for Spring 2.1. The version number 2.1, as used for the milestones, does not reflect the significance and the comprehensiveness of the features in this major release.

So I'm pleased to announce that the 2.1 milestones will seamlessly turn into **Spring Framework 2.5 as the upcoming major release!** Spring 2.5 is scheduled for final release in October, with a first release candidate expected for early October. Watch out for upcoming blog posts on specific Spring 2.5 features as we move closer to the final release!

Note that, as originally planned, Spring 2.5 will still be **compatible with JDK 1.4.2+ and J2EE 1.3+**. While many of the new major features inherently require Java 5 or higher, Spring 2.5 also includes significant enhancements that are available to Java 1.4 users as well: e.g. the bean name pointcut element, the jms configuration namespace, the certified WebSphere support and the JCA RAR deployment option.
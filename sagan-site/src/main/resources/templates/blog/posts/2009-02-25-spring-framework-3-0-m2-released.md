---
title: Spring Framework 3.0 M2 released
source: https://spring.io/blog/2009/02/25/spring-framework-3-0-m2-released
scraped: 2026-02-24T09:11:05.881Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  February 25, 2009 | 0 Comments
---

# Spring Framework 3.0 M2 released

_Engineering | Juergen Hoeller |  February 25, 2009 | 0 Comments_

We are pleased to announce that the second Spring 3.0 milestone is finally available ([download page](http://www.springsource.com/download)). This release comes with a wealth of revisions and new features:

**Further Java 5 style API updates:** consistent use of generic Collections and Maps, consistent use of generified FactoryBeans, and also consistent resolution of bridge methods in the Spring AOP API. Generified ApplicationListeners automatically receive specific event types only. All callback interfaces such as TransactionCallback and HibernateCallback declare a generic result value now. Overall, the Spring core codebase is now freshly revised and optimized for Java 5.

**Extended concurrency support:** Spring's TaskExecutor abstraction has been updated for close integration with Java 5's *java.util.concurrent* facilities. We provide first-class support for Callables and Futures now, as well as ExecutorService adapters, ThreadFactory integration, etc. This has been aligned with JSR-236 (Concurrency Utilities for Java EE 6) as far as possible. Furthermore, we provide support for asynchronous method invocations through the use of the new @Async annotation (or EJB 3.1's @Asynchronous annotation). And in Spring 3.0 M3, we'll be adding a scheduling namespace for convenient configuration of it all... including support for cron-style timers.

**OXM module in core:** We moved the Object/XML Mapping module, as known from the Spring Web Services project, to the Spring core project. OXM has been updated and revised for Java 5 as well, supporting marshalling and unmarshalling through JAXB2, JiBX, Castor, XMLBeans, and XStream. There is also OXM support for Spring JMS (MarshallingMessageConverter) and Spring MVC (MarshallingView).

**RestTemplate:** We have brand-new client-side REST support: the long-awaited RestTemplate, with HTTP processing infrastructure that is as flexible and extensible as you would expect from a Spring solution. There are also several improvements with respect to REST support in Spring MVC... Stay tuned for Arjen's upcoming blog post on the latest REST support features!

**MVC on Portlet 2.0:** Spring Portlet MVC is based on the Portlet 2.0 API (JSR-286) now. We provide specific @ActionMapping, @RenderMapping, @ResourceMapping and @EventMapping annotations for Portlet MVC handler methods, including support for specific characteristics of those request types: e.g. action names, window states, resource ids, and event names (as defined by Portlet 2.0).

**Early JPA 2.0 support:** Finally, we are actively tracking the JPA 2.0 specification as well as emerging JPA providers with JPA 2.0 preview support. Spring 3.0 M2 already delivers early support for the JPA 2.0 API, e.g. query timeouts within Spring-managed transactions and QueryBuilder access in Spring-managed EntityManager proxies. We'll wrap this up for Spring 3.0 RC1, as soon as the JPA 2.0 API is stable.

*Now is a good time to give Spring 3.0 an early try!* Let us know how it works for you... M2 doesn't include reference documentation yet but comes with extensive javadoc and an extensive test suite. We'll also be showing specific examples in follow-up blog posts.

We are now working towards our final milestone already: M3 will introduce annotation-based factory methods, declarative validation (based on JSR-303 "Bean Validation"), as well as new XML configuration namespaces (orm, scheduling). Spring MVC will receive an overhaul in terms of conversation management. We are also preparing for JSF 2.0 as far as necessary, keeping up the smooth integration experience with Spring.
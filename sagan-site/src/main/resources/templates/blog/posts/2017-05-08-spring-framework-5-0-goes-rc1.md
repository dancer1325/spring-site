---
title: Spring Framework 5.0 goes RC1
source: https://spring.io/blog/2017/05/08/spring-framework-5-0-goes-rc1
scraped: 2026-02-23T16:31:46.274Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  May 08, 2017 | 14 Comments
---

# Spring Framework 5.0 goes RC1

_Releases | Juergen Hoeller |  May 08, 2017 | 14 Comments_

Dear Spring community,

It is my pleasure to announce that a feature-complete Spring Framework 5.0 release candidate is [available](http://projects.spring.io/spring-framework/) now! We are expecting a further release candidate at the end of May and a final release in late June at this point.

As a major revision of the core framework, 5.0 RC1 comes with a Java 8+ baseline and many infrastructure refinements: e.g. our own Commons Logging bridge autodetecting Log4j 2, SLF4J, JUL by default; streamlined use of Servlet 3.1+; and early support for JUnit 5.0 M4.

Once again, here are the major Spring Framework 5 feature themes:

-   **Reactive programming:** introducing our [Spring WebFlux](https://spring.io/blog/2017/02/23/spring-framework-5-0-m5-update) framework built on Reactor 3.1, with support for RxJava 1.3 & 2.1 and running on Tomcat, Jetty, Netty or Undertow.
-   **Functional style with Java 8 & Kotlin:** several API refinements and Kotlin extensions across the framework, in particular for [bean registration and functional web endpoints](https://spring.io/blog/2017/01/04/introducing-kotlin-support-in-spring-framework-5-0).
-   **Integration with Java EE 8 APIs:** support for Servlet 4.0, Bean Validation 2.0, JPA 2.2, as well as the JSON Binding API (as an alternative to Jackson/Gson in Spring MVC).
-   **Ready for JDK 9:** fully aligned with JDK 9 at runtime, on the classpath as well as the module path (on the latter: as filename-based "automatic modules" for the time being).
-   And of course, many further refinements across the framework: check out our updated [What's New](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-the-Spring-Framework#whats-new-in-spring-framework-5x) page for a comprehensive overview of changes since 4.3.

Cheers, Juergen

P.S.: For some background on Spring 5's reactive programming story with Project Reactor and its Reactive Streams foundation, I highly recommend Rossen's recent [InfoQ podcast](https://www.infoq.com/podcasts/rossen-stoyanchev).

Also, stay tuned for the first **Spring Boot 2.0 milestone**, due early next week, building on Spring Framework 5.0 RC1 and a couple of portfolio releases to happen in the meantime...
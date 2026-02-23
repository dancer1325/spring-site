---
title: Spring on GlassFish 4.1.1 and WildFly 10 / Undertow 1.3
source: https://spring.io/blog/2015/10/14/spring-on-glassfish-4-1-1-and-wildfly-10-undertow-1-3
scraped: 2026-02-23T19:39:43.322Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Juergen Hoeller |  October 14, 2015 | 1 Comment
---

# Spring on GlassFish 4.1.1 and WildFly 10 / Undertow 1.3

_News | Juergen Hoeller |  October 14, 2015 | 1 Comment_

Even if I pointed out that there are no general news in terms of Java EE 7 platform adoption in [last week's blog post](https://spring.io/blog/2015/10/06/a-brief-update-on-java-ee-7-adoption) (since there is still no WebSphere Classic, WebLogic, JBoss EAP or even TomEE with full EE 7 support), the two existing open-source EE 7 platform servers - namely, GlassFish and WildFly - made some fine progress in the meantime:

-   There's a **GlassFish 4.1.1** release now, with many sub-project updates - including Tyrus for its WebSocket support.
-   And the WildFly team rushes from major release to major release, arriving at **WildFly 10 GA** very soon now. The underlying **Undertow** web server reached **1.3 GA** just a few days ago.

As you may be aware, we are very actively tracking the evolution of those servers from Spring's side. The upcoming **Spring Framework 4.2.2** updates its WebSocket support for compatibility with Tyrus 1.9 to 1.12 and therefore GlassFish 4.1.1, as well as for compatibility with the just released Undertow 1.3 GA and therefore WildFly 10.

So if you're using Spring's WebSocket support on either of those servers, simply upgrade to Spring Framework 4.2.2 (once released later this week) and the framework will auto-adapt to the most recent API changes in Tyrus and Undertow there, for seamless migrations of Spring applications from earlier versions of GlassFish and WildFly.

P.S.: Aligned with the core framework, the upcoming **Spring Boot 1.3 release candidate** will ship with Undertow 1.3 GA for its embedded Undertow support.
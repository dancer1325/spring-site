---
title: This Week in Spring - August 12th, 2014
source: https://spring.io/blog/2014/08/13/this-week-in-spring-august-12th-2014
scraped: 2026-02-23T22:17:38.470Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 13, 2014 | 0 Comments
---

# This Week in Spring - August 12th, 2014

_Engineering | Josh Long |  August 13, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring*. We've got a *lot* of cool stuff happening and, as you might imagine, the entire team is abuzz in preparation for SpringOne2GX 2014, coming in just a few short weeks! If you haven't registered, [now's the time to do so](http://springone2gx.com)!

1.  Spring Security lead and all-around sleepless ninja Rob Winch has just announced that Spring MVC Test HtmlUnit 1.0.0.M2 has been released. This is an *awesome* release if you're trying to [unit test real pages with Spring MVC](http://spring.io/blog/2014/08/06/spring-mvc-test-htmlunit-1-0-0-m2-released)

-   [Spring Boot 1.1.5 has just been released](http://spring.io/blog/2014/08/07/spring-boot-1-1-5-released). The new release mainly addresses a few issues and is a recommended upgrade for all users.
-   I really enjoyed this blog, [¿Qué es Spring Framework?](http://www.genbetadev.com/frameworks/que-es-spring-framework), which tries to explain what the fundamental value of Spring is. Largely, the (Spanish language) article explains that Spring handles the lifecycle for objects in a consistent way. It's easy to plug in various frameworks, software, around the edges when the fundamental life-cycle is handled. I would point out that this post uses Spring 3.0 and XML configuration, which is a bit outdated, though certainly still works.
-   The RebelLabs folks are back at it with an interesting look at web framework usage. Check out this [latest report which has Spring MVC leading](http://zeroturnaround.com/rebellabs/top-4-java-web-frameworks-revealed-real-life-usage-data-of-spring-mvc-vaadin-gwt-and-jsf/) the charge (by a lot).
-   This is a nice post looking at how to use Spring MVC (as part of Spring framework 4.x) to [handle file uploads](http://www.concretepage.com/spring-4/spring-4-mvc-single-multiple-file-upload-example-with-tomcat)
-   The \*Mr. Haki \* blog has a nice post [on analyzing dependencies using Gradle](http://mrhaki.blogspot.com/2014/08/gradle-goodness-getting-more-dependency.html), with an example based on Spring Boot. [Spring Boot, of course, is easy to get started with](http://start.spring.io), can be used with Maven *or* Gradle, and has numerous benefits, not the least of which being that it makes it dead simple to use Spring libraries in your project without worrying about version mismatches.
-   Stuck on JAX-RS and JSF? Still want to use Spring Security? This post - [from the JSF Usefullness post](http://ezjsf.blogspot.com/2014/08/javaee-rest-jax-rs-with-spring-security.html) - has the code snippets that (sort of) demonstrate a path forward. Granted, you'll have an easier time of doing this using straight Spring. No need to add all that extra Java EE weight..
-   This is a sort of oldie-but-a-goodie: a post on how to [implement a JQuery-powered autosave example in Spring MVC](http://www.technicalkeeda.com/spring/jquery-ajax-autosave-example-in-spring-mvc)
-   This is a (particularly tortured) example of [how to write a Spring application that uses Primefaces and runs on the Wildfly application server](http://www.mastertheboss.com/spring/spring-jdbc-application-on-wildfly). I don't see why you'd need all this indirection when Spring has good JSF support out of the box. Additionally, there's no reason to recreate the `JdbcTemplate` or inject an `ApplicationContext` into a bean. Maybe it'll help somebody as a first-cut, though.

So, did I mention **SpringOne2GX 2014**? It's right around the corner! I'll be there, [and so will everyone from the Spring team](http://spring.io/team), so don't miss out. This is going to be an amazing year. I happen to know what some of the keynotes are going to be about. Do *not* miss out. [Register today](http://springone2gx.com)!
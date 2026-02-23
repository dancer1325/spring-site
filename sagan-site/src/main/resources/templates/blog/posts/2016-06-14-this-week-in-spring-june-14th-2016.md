---
title: This Week in Spring - June 14th, 2016
source: https://spring.io/blog/2016/06/14/this-week-in-spring-june-14th-2016
scraped: 2026-02-23T19:13:34.805Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 14, 2016 | 0 Comments
---

# This Week in Spring - June 14th, 2016

_Engineering | Josh Long |  June 14, 2016 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm in London and Amsterdam (for the epic [GOTO Amsterdam conference](http://gotocon.com/amsterdam-2016/speaker/Josh+Long) as well [as the JDriven meetup](http://www.jdriven.nl/events) and the [Dutch Spring User Group](http://www.meetup.com/Dutch-Spring-Meetup/events/231334315/)). We've got a lot to cover, as usual, so let's get to it!

-   [Spring framework 4.3, packed with all sorts of niceties, is now available](https://spring.io/blog/2016/06/10/spring-framework-4-3-goes-ga). This release provides all sorts of cool updates to various libraries (Hibernate ORM, Jackson, Netty, Undertow, Tomcat) and supports two features I'm quite excited about: auto-injection in constructors of Spring managed components whose parameters are unambiguously resolved by other types in the application context and the ability to inject types into a `@Configuration`\-class's constructor.
-   Marius Bogoevici just announced [a critical update to Spring Cloud Stream, 1.0.2.RELEASE, is now available for immediate use](https://spring.io/blog/2016/06/08/spring-cloud-stream-1-0-2-release-is-available)
-   the good Dr. David Syer posted the second in a [series of posts looking at the reactive programming landscape](https://spring.io/blog/2016/06/13/notes-on-reactive-programming-part-ii-writing-some-code). This post looks specifically at Project Reactor. Check it out!
-   Spring Integration ninja Artem Bilan just announced that [Spring Integration 4.3.GA is now available](https://spring.io/blog/2016/06/14/spring-integration-4-3-ga-is-available)! This release is packed with all sorts of cool stuff so grab the bits and go ASAP!
-   I really dig this blog on [how Cloud Foundry will save the world from too much yak-shaving](http://blog.gardeviance.org/2016/06/how-cloud-foundry-will-save-world-from.html)
-   want to quickly build a UI with which to edit data in MySQL? [The Vaadin blog has a nice blog introducing a way to to build one using Vaadin and Spring Boot](https://vaadin.com/blog/-/blogs/building-a-web-ui-for-mysql-databases-in-plain-java-)
-   this looks interesting: an `npm` module for [working with Spring Data REST APIs from JavaScript](https://www.npmjs.com/package/spring-data-rest-js)
-   As usual, our buddy Baeldung nails it again with [this post on using JOOQ with Spring Boot](http://www.baeldung.com/spring-boot-support-for-jooq)
-   this is an interesting post from Bartosz Jedrzejewski

on [isolating and reusing functionality with Microservices](http://blog.scottlogic.com/2016/06/13/code-reuse-in-microservices-architecture.html) demonstrated in terms of Spring Cloud.

-   The Apereo CAS application, which is meant to be an enterprise single-signon solution, just released [CAS version 5.0.0.M2](https://groups.google.com/a/apereo.org/forum/#!topic/cas-user/srramLDpBpM). This release is built on Spring Boot and Spring Cloud, and so a lot of the work in the evolution is providing intelligent auto-configurations. Check it out!
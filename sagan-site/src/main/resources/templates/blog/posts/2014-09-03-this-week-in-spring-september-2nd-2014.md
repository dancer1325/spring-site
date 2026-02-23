---
title: This Week in Spring - September 2nd, 2014
source: https://spring.io/blog/2014/09/03/this-week-in-spring-september-2nd-2014
scraped: 2026-02-23T22:16:22.173Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 03, 2014 | 0 Comments
---

# This Week in Spring - September 2nd, 2014

_Engineering | Josh Long |  September 03, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring*!

This is the last installment of *TWiS* before [SpringOne2GX 2014](http://springone2gx.com/) kicks off next week! I, personally, am *very* excited! I can't wait to see you all there. This is going to be so much fun. So, let's get on to it!

-   Spring Data lead Oliver Gierke has just [announced the release of Spring Data Dijkstra SR4](https://spring.io/blog/2014/08/27/spring-data-dijkstra-sr4-released), filled with bug-fixes and all sorts of upgrade-now-worthy stuff. Check it out!
-   [Spring and Groovy & Grails Tool Suite lead Martin Lippert just announced 3.6.1](https://spring.io/blog/2014/08/28/spring-tool-suite-and-groovy-grails-tool-suite-3-6-1-released). The new release updates tcServer to 3.0.0, includes build performance improvements, annotation processors for AspectJ and AJDT, and more. Download now, and have the latest and greatest IDE to follow along [all the guides](http://spring.io/guides) and follow the [examples at SpringOne2GX 2014](http://springone2gx.com)!
-   I hope you'll [join me September 16th for a webinar looking at building microservices with Spring](https://spring.io/blog/2014/07/29/webinar-microservices-with-spring-boot-sept-16th)
-   On September 23rd, join Joram Barrez and I for a webinar looking at [how to build process-centric Spring applications with the open-source BPMN2 engine, Activiti](https://spring.io/blog/2014/07/29/webinar-process-driven-spring-applications-with-activiti-sept-23rd)
-   Did you see the [beautiful, more intuitive, new Spring Initializr](http://start.spring.io/)?? Preetttyyyyyy...
-   The sleepless [Dr. Syer has just released Spring Security OAuth 2.0.3](https://spring.io/blog/2014/09/01/spring-security-oauth-2-0-3-available-now), which includes a mainly bug fix for JWT tokens. Also, resource servers (if configured with `@Configuration`) will check the validty of the client and scopes before allowing access to protected resources, which means more instantaneous client privilege revocation. Nice!
-   Spring ninja Greg Turnquist has written a nice post [about the ever improving Spring IO guides](https://spring.io/blog/2014/09/02/spring-guides-make-it-easier-to-jump-to-core-content). Start there, then continue on to some of the guides themselves!
-   I gave a presentation, *Have You Seen Spring Lately?*, at DevNexus earlier this year. [It's online](http://www.infoq.com/presentations/spring-rest-nosql-big-data-mobile), and worth a watch if you haven't already! (If I may say so..)
-   Lieven Doclo has put together a *very* cool post on his [Spring Boot auto-configuration for the Axon framework](http://java.dzone.com/articles/another-spring-boot). Axon is an implementation of the CQRS (Command and Query Responsibility Segregation) pattern. (Axon is built on Spring, Spring Integration, and more, as readers of this column will know from previous roundups!)
-   MacAdie Web Blog has a rough, but very useful, recap of [notes taken at an Austin Groovy and Grails User Group meeting on Spring Boot](http://www.macadie.net/2014/08/26/spring-boot-presentation-at-austingug/).
-   I liked Ralph Wehner's post [introducing how to use Spring Boot and Vaadin together](http://rwehner.wordpress.com/2014/08/26/combining-vaadin-and-classic-spring-mvc-into-one-simple-spring-boot-application/): it explains everything [and even links to a sample example](http://github.com/rwe17/spring-boot-vaadin-demo) - awesome!
-   Our pals at the Jayway blog are back at it again! This week, [they've introduced how to build a custom Spring Boot `HealthIndicator`s](http://www.jayway.com/2014/07/22/spring-boot-custom-healthindicator/)
-   The `IT Hood` chimes in with a helpful hint: if you're getting mysterious errors like [HTTP status code `406 Not Acceptable` results when calling a Spring MVC-powered REST endpoint, you might check that you have the right dependencies on the CLASSPATH](http://ithood.blogspot.com/2014/08/java-spring-mvc-networkerror-406-not.html). Simple, but easy to forget! (unless, of course, you're using the [Spring IO Platform BOM](https://spring.io/blog/2014/06/26/introducing-the-spring-io-platform) or [Spring Boot's starter dependencies](http://start.spring.io/)!).
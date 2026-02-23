---
title: This Week in Spring - November 7th, 2017
source: https://spring.io/blog/2017/11/07/this-week-in-spring-november-7th-2017
scraped: 2026-02-23T16:16:06.307Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 07, 2017 | 1 Comment
---

# This Week in Spring - November 7th, 2017

_Engineering | Josh Long |  November 07, 2017 | 1 Comment_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I'm in Antwerp, Belgium for the amazing Devoxx (Belgium) event. I'm co-presenting with my friends Matt Raible and Mark Heckler on progressive web applications and reactive Spring. I'll be joined by a lot of Pivotal and Spring teammates here so make sure to check the schedule.

Later this week I'll be doing a joint [webinar - *Grails for the Spring Boot Developer* - with Grails co-founder Jeff Scott Brown](https://objectcomputing.com/products/grails/webinar-grails-3-spring-developers/).

Then, it's off to Casablanca, Morocco, for the Devoxx MA event.

If you're at either event, [don't hesitate to say hi](http://twitter.com/starbuxman)!

-   Spring Cloud Pipelines lead Marcin Grzejszczak [just announced Spring Cloud Pipelines 1.0.0.M7](https://spring.io/blog/2017/10/31/spring-cloud-pipelines-1-0-0-m7-released). This new release debuts Kubernetes support for Jenkins and Concourse. It also drastically improves the code coverage with over 150 Bash tests, among other things.
-   Spring Cloud co-lead Spencer Gibb just announced [Spring Cloud Finchley M3 is now available](https://spring.io/blog/2017/10/31/spring-cloud-finchley-m3-released). Spring Cloud Finchley integrates reactive APIs in Spring Framework 5, and introduces a new project called Spring Cloud Gateway.
-   Spring Security lead Rob Winch [just announced Spring Security 5.0.0.RC1](https://spring.io/blog/2017/11/01/spring-security-5-0-0-rc1-released). This release is *massive* so you should definitely check the new release, see if the code works for you, right now. It includes, among many other things, integration for Spring Web Flux and Spring Framework 5, OAuth 2.0 integration (directly in Spring Security itself!), password storage updates, UnboundID LDAP in-memory support, and so much more.
-   Spring Security and Spring Session lead Rob Winch [just announced Spring Session 2.0.0.RC1](https://spring.io/blog/2017/11/01/spring-session-2-0-0-rc1-released). The new release puts final touches on the impending 2.0.0.RELEASE by simplifying the integration with the Servlet APIs, and by adding support for a Redis session cleanup cron process.
-   Spring Integration ninja [Artem Bilan just announced Spring Integration 5.0 RC1](https://spring.io/blog/2017/11/01/spring-integration-5-0-release-candidate-1-available). The new release sees - among many other things - 20 issues fixed, HTTP WebFlux-based adapters, and a change in the behavior of the Java DSL to support registering new bean definitions for each component created in the DSL.
-   Spring Batch lead Michael Minella just [announced Spring Batch 4.0.0.RC1](https://spring.io/blog/2017/11/02/spring-batch-4-0-0-rc1-is-now-available) which includes updated baseline APIs, new builder APIs, updated Java configuration and documentation. All in all, a worthy upgrade. Those using Spring Boot should get the bits, kick the tires and try it out now.
-   Spring Boot ninja Stéphane Nicoll [just announced Spring Boot 2.0.0.M6](https://spring.io/blog/2017/11/06/spring-boot-2-0-0-m6-available-now) which has initial support for HTTP/2, improved support for WebFlux-based applications (adding TLS configuration and error pages), and the first Kotlin integration.
-   In the latest installment of Spring Tips, I [looked at the Spring Shell project](https://spring.io/blog/2017/11/01/spring-tips-spring-shell).
-   The Thymeleaf [team have just announced Thymeleaf 3.0.9](http://forum.thymeleaf.org/Thymeleaf-3-0-9-JUST-PUBLISHED-td4030728.html) with improved hit ratios in the `StandardCache`, improved restricted expression evaluation mode to support better security, and a few bug fixes for Spring Framework 5 integration.
-   Pivotal's very own Toshiaki Maki‏ put together a *great* Japanese-language post on using [the Pivotal Cloud Foundry metrics forwarder service](https://t.co/v9xDg9hs3e?amp=1) to forward metrics from a Spring Boot application to the Pivotal Cloud Foundry Metrics service.
-   I can't recommend enough [this talk](https://www.youtube.com/watch?feature=youtu.be&v=C51hPntRYGY&app=desktop) (from [Spring Days Atlanta](http://twitter.com/SpringDays)) called "Spring Didn't Invent It!" by [Laura Moore](http://twitter.com/lk_moore). I only wish she was able to go on for another few hours! So glad this talk exists.
-   I join other architects Chris Richardson, Daniel Bryant,

Glenn Engstrand, and Alex Silva for [this InfoQ virtual panel on service orchestration vs. choreography](https://www.infoq.com/articles/vp-microservices-orchestration-choreography). It was a lot of fun and I hope you enjoy the discussion.

-   InfoQ's Amit K Gupta did a nice writeup of the [new features in Spring Tool Suite 3.9.1](https://www.infoq.com/news/2017/10/sts-released).
-   This isn't strictly to do with Spring, but I always enjoy the discussion and introduction of new features in the Java language. This post, by Brian Goetz, is both a wonderful read and an insightful look at [how "data classes" would work in a future release of Java](http://cr.openjdk.java.net/~briangoetz/amber/datum.html). Hat tip to my friend and fellow Java fan Billy Korando for sharing this.
-   I loved this [sample project by Spring Framework and Kotlin](https://github.com/sdeleuze/spring-kotlin-functional/tree/boot) ninja Sebastien Deleuze demonstrating some of the APIs in Spring Boot and their Kotlin usage.
-   the Baeldung blog has a great look at [the Micrometer metrics-publishing library](http://www.baeldung.com/micrometer). Micrometer is a Pivotal project that serves as the metrics-backbone for Spring Boot 2.0's Actuator support.
-   There's a new version of the [fantastic NetBeans Spring Boot plugin, version 1.6.1](http://plugins.netbeans.org/plugin/67888/nb-springboot), that supports new hints and quick fixes. It will warn you of use of `@ConfigurationProperties` without the presence of `spring-boot-configuration-processor`, removal of deprecated or unknown properties, and updates to Spring Boot 1.5.8, among many other things.
-   You can now [use Spring Shell and Spring Cloud Contract](https://twitter.com/snicoll/status/925453128996130816) on the Spring Initializr.
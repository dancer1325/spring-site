---
title: This Week in Spring - May 1st, 2018
source: https://spring.io/blog/2018/05/01/this-week-in-spring-may-1st-2018
scraped: 2026-02-23T15:26:15.195Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 01, 2018 | 0 Comments
---

# This Week in Spring - May 1st, 2018

_Engineering | Josh Long |  May 01, 2018 | 0 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! In the last week I went from Germany (for JAXON) to Linz, Austria (for DevOne) and Vienna, Austria (for a meetup) and now I'm in Melbourne, Australia (after a 10 hour stopover in Bangkok, Thailand), for the VOXXED Melbourne event. As usual, if you're around [I'd love to hear from you](http://twitter.com/starbuxman)!

Without further ado, we've got a lot to cover so let's get to it!

-   [Pivotal just turned 5!](https://content.pivotal.io/blog/5-lessons-on-pivotal-s-fifth-birthday) Happy birthday to us!
-   Spring Cloud contributor Ryan Baxter has just announced Spring Cloud Finchley RC1. The new release is *packed* with all sorts of new stuff and represents one of hopefully the [final releases before Spring Cloud Finchley before it's GA](https://spring.io/blog/2018/04/25/spring-cloud-finchley-rc1-has-been-released)
-   Hi Spring fans! In last week's installment of Spring Tips I looked at how to extricate process state - valuable for coordinating long running or mutli-actor processes - from business logic [with Spring Statemachine](https://spring.io/blog/2018/04/25/spring-tips-spring-statemachine)
-   the [RabbitMQ 3.7.5-beta2 is now available](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.7.5-beta.2).
-   I really like this Chinese-language post on whether Spring Boot and Spring Cloud [can be used by small and medium-sized companies](https://www.cnblogs.com/ityouknow/p/7508306.html)
-   The RabbitMQ blog has a nice post on using the [Micrometer integration in the RabbitMQ Java client to integrate with Datadog](http://www.rabbitmq.com/blog/2018/04/10/rabbitmq-java-client-metrics-with-micrometer-and-datadog/)
-   Jeroen Reijn gave a nice [presentation on test-driven Spring REST Docs-based documentation](https://www.youtube.com/watch?v=3NT_Wql8wMg&feature=youtu.be)
-   The Ordina blog has a nice post on using [Spring Cloud Contract to support consumer-driven contracts](https://ordina-jworks.github.io/spring/2018/04/28/Spring-Cloud-Contract-meet-Pact.html).
-   I love this post by Gaurav Gupta [on synchronous request/reply with Apache Kafka and Spring](https://dzone.com/articles/synchronous-kafka-using-spring-request-reply-1?oid=twitter)
-   The Baeldung has another interesting post (related to Servlets) that [looks at the `@ServletComponentScan` in Spring Boot](http://www.baeldung.com/spring-servletcomponentscan): it detects all Servlet API `WebFilter`, `WebListener`, and `WebServlet` annotations on servlet components.
-   This is an oldie-but-a-goodie from the Baeldung blog: [a Quick Intro to the `SpringBootServletInitializer`](http://www.baeldung.com/spring-boot-servlet-initializer), which is the mechanism that let's Spring Boot applications run in a Servlet container setup, as opposed to a fat-`.jar`.
-   Do *not* miss this new [guide on Spring Cloud Gateway](https://t.co/aVR0yIiKTr?ssr=true)
-   Bartosz Jedrzejewski put together a nice post on using Reactor (in a Spring WebFlux application) [to obtain parallelism and backpressure](https://www.e4developer.com/2018/04/28/springs-webflux-reactor-parallelism-and-backpressure/)
-   And yet another Baeldung post, this time with a [review of the state of Java](http://www.baeldung.com/java-in-2018). The numbers in this year's survey are very interesting! The numbers are very promising: Java 8 is now, by far, the majority deployed version of Java. Java 9 and 10 are gaining ground, though! Also interesting: Spring Framework 4 and Spring Framework 5 are are, by far, the majority deployed enterprise Java framework. The precise numbers aren't clear, but it looks to be almost 75% of the pie-chart. Java EE and "Other" technologies account for what I'd guess is 20% of the remaining deployments, followed by Spring Framework 3, which looks to be about 5% or so (Maybe less?) Of the deployments that are based on Spring, a majority are based on Spring Boot, with less than 20% or so based on Spring without Spring Boot. IntelliJ, Apache Tomcat, and Maven are the clear leaders, too. Also interesting: Groovy, Kotlin and Scala (in that order) are the leaders in non-Java languages.
-   The Heroku documentation has a great list of steps that are required to make a Spring Boot application cloud-ready. This blog was published on the Heroku blog but a lot [of it applies to building cloud-native applications for any platform](https://t.co/9rFWKNmQC4?ssr=true)
-   This post demonstrates [how to test in a Spring application](https://www.innoq.com/en/blog/springless-testing/) *without* Spring. It sets up a scenario that *should* be very uncommon, field injection, and demonstrates how adversely this affects the goals of testing. Remember what I always say: "every time you do field injection, a unit test dies!" The post then looks at how to test components, and to even remove Spring from the testing process.
-   Nicolas Frankel looks at changes in [Spring Boot 2's Actuator](https://blog.frankel.ch/spring-boot-2-actuator-change-analysis/)
-   I love this [cheat sheet on using Java 10](https://twitter.com/sjmaple/status/989550060894638084?s=12)
-   The Spring Cloud team is hiring! [Join us!](https://twitter.com/springcloud/status/989644142258081797)
-   Michael Simons and Michael Plöd [put together a nice German-language slidedeck on Spring Boot 2](https://speakerdeck.com/michaelsimons/jax-2018-spring-boot-2-hot-topics)
-   The *All and Sundry* blog has a [nice post on configuring a simple route with Spring Cloud Gateway](http://www.java-allandsundry.com/2018/04/spring-cloud-gateway-configuring-simple.html?m=1)
-   Part two of my series on building reactive [Spring-based applications is now available in Java Magazine](http://www.javamagazine.mozaicreader.com/MarApr2018/Twitter#&pageSet=85&page=0)
-   The *Java Revisited* blog has a nice post on [the motivations for pursuing certification in Spring Cloud](http://javarevisited.blogspot.de/2017/07/does-spring-certification-help-in-job-and-career.html)
-   The call-for-papers for the inaugural [RabbitMQ Summit on November 12th, 2018 at CodeNode in London, UK is now open!](https://twitter.com/springcentral/status/988919061571485696)
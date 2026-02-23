---
title: This Week in Spring - October 21st, 2014
source: https://spring.io/blog/2014/10/22/this-week-in-spring-october-21st-2014
scraped: 2026-02-23T22:11:15.987Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 22, 2014 | 0 Comments
---

# This Week in Spring - October 21st, 2014

_Engineering | Josh Long |  October 22, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm talking to developers at the Neo4j **GraphConnect** conference with my pal (and Neo4j evangelist) [Kenny Bastani](http://twitter.com/kennybastani), and then on Thursday I'll be doing a webinar with my one of my pals on the Vaadin team, Peter Lehto, on how to build *Bootiful* Vaadin applications - don't miss it!

Next week, I'll be doing a string of appearances at [Toronto](http://www.meetup.com/Cloud-Foundry-Toronto/events/212074602/), [New York City](http://www.meetup.com/nyc-cloud-foundry/events/200768002/), and [Boston](http://www.meetup.com/Boston-Area-Cloud-Foundry-Meetup/events/203305332/) meetups helping people better build microservices with [Spring Boot](http://spring.io/projects/spring-boot), [Spring Cloud](http://spring.io/projects/spring-cloud) and [Cloud Foundry](http://cloudfoundry.org). Register now, come for the code, conversations, pizza and beer! Microservices are a big thing these days, and I'm sure there'll be a lot to talk about so don't miss these events!

As usual, we've got a lot to cover so let's get to it!

-   Reactor project lead Jon Brisbin giddily announced the [first milestone for Reactor 2.0](https://spring.io/blog/2014/10/21/reactor-2-0-0-m1-released-with-reactive-streams-integration) which has as its headline feature the Reactive Streams API. The Reactive Streams API is a collaborative effort between Netflix, Typesafe, Pivotal, RedHat, and others that makes easier the task of handling *backpressure* in a reactive pipeline.
-   Spring Data ninja Christoph Strobl has put together a nice look at [what’s new in the latest and greatest Spring Data Evans release train](https://spring.io/blog/2014/10/15/whats-new-in-spring-data-evans).
-   I hope you’ll join me this Thursday as Vaadin’s Peter Lehto and I introduce [how to build *Bootiful* Vaadin rich UI applicatons](https://spring.io/blog/2014/10/01/webinar-building-bootful-uis-with-spring-boot-and-vaadin).
-   Then, mark your calendars for the good [Dr. Syer](http://twitter.com/david_syer)'s webinar introducing [*Security for Microservices with Spring and OAuth2*](https://spring.io/blog/2014/10/01/webinar-architecting-for-continuous-delivery-microservices-with-pivotal-cf-and-spring-cloud?utm_content=bufferebf5a&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
-   Spring’s the most productive Java technology, but who wouldn’t like to squeeze more productivity out of the Java language itself by eliminating restarts and instead simply *reloading* changed byte code? JRebel can help! Adam Koblentz has put together two very cool posts looking at how JRebel [can reload Spring XML configuration](http://zeroturnaround.com/blog/using-spring-mvc-with-jrebel-refactoring-xml-config-files) and how it [can reload Spring MVC `@Controller` and `@RestController`\-based `@RequestMapping` metadata](http://zeroturnaround.com/blog/using-spring-mvc-with-jrebel-changing-requestmappings-without-restarting/).
-   Speaking of Neo4j, they've just published some handy new guides (which they tell me were at least in part inspired by the [Spring guides](http://spring.io/guides) - *blush*!) that detail how to [get started with Spring Data Neo4j and Spring Boot](http://neo4j.com/developer/java/#_using_spring_data_neo4j)
-   Comsysto Gmbh has put together [a *very* nice look at Spring Boot](http://java.dzone.com/articles/spring-boot-my-favorite) and a Spring Boot applications lifecycle. He describes as, "his favorite timesaving, convention-enabling, autoconfig-creating, bean-making classpath-shaking microcontainer!"
-   Readers of this roundup will know that [we love JHipster, the Yeoman-based Spring Boot and Angular.js-code generator](https://twitter.com/java_hipster/status/524439966495944705). JHipster just celebrated its first birthday! Joyeux anniversairre, JHipster!
-   Nieraj Singh put together a detailed look at [how to manage Cloud Foundry services in Eclipse with our Cloud Foundry plugin](http://blog.pivotal.io/cloud-foundry-pivotal/products/service-management-through-cloud-foundry-eclipse).
-   Phillip Verheyden (from Broadleaf Commerce, the makers of a Spring-based e-commerce engine) [wrote up his thoughts on SpringOne2GX 2014](http://www.broadleafcommerce.com/blog/spring-one-2gx-2014-postmortem). Thanks, Phillip!
-   You **are** following Groovy-language project lead [Guillaume LaForge’s weekly roundup](http://glaforge.appspot.com/article/groovy-weekly-41) of all that’s awesome in the Groovy ecosystem, *aren’t you*?
-   Check out [this post on *The Spring Way* blog if you’re trying to marshall arrays of complex types](http://thespringway.info/spring-web/map-to-list-of-objects-from-json-array-with-resttemplate/) back and forth with Spring’s `RestTemplate`.
-   I always love reading Adrian Colyer’s blogs. Recently, he’s been reviewing one interesting academic paper per week. This last week he looked at a paper that offers that there’s [not so strong a link between code-coverage and what that implies for (assurances about) code quality](http://blog.acolyer.org/2014/10/21/coverage-is-not-strongly-correlated-with-test-suite-effectiveness/).
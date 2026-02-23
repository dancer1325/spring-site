---
title: This Week in Spring - December 2, 2014
source: https://spring.io/blog/2014/12/02/this-week-in-spring-december-2-2014
scraped: 2026-02-23T22:05:01.101Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 02, 2014 | 0 Comments
---

# This Week in Spring - December 2, 2014

_Engineering | Josh Long |  December 02, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm at the [Rich Web Experience](http://www.therichwebexperience.com/conference/fort_lauderdale/2014/12/home) in Ft. Lauderdale, FL, joining my pal [Matt Stine](http://twitter.com/mstine) for a workshop on building microservices with [Spring Boot](http://spring.io/projects/spring-boot), [Spring Cloud](http://spring.io/projects/spring-cloud/) and [Cloud Foundry](http://cloudfoundry.org).

So, without further ado, let's get to it:

-   Dr. Dave Syer [just announced the M3 release of Spring Cloud](https://spring.io/blog/2014/11/25/spring-cloud-1-0-0-m3-available-now), complete with *loads* of cool stuff, including a smarter Ribbon-enabled load-balancing `RestTemplate`, a RabbitMQ-based aggregator for Hystrix Metrics based on Turbine 2, Spring Cloud for AWS support, and *much* more
-   Spring ninja Sebastien Deleuze just announced [some of the amazing new features in Spring's Jackson support](https://spring.io/blog/2014/12/02/latest-jackson-integration-improvements-in-spring). My favorite? JSON + XML marshalling *with* dynamic *views*. Views are a logical subset of attributes from a JSON structure that may be rendered dynamically.
-   Check out [Spring Roo 1.3.1](https://spring.io/blog/2014/11/26/spring-roo-1-3-1-rc1-available-with-important-bug-fixes) and includes bug-fixes for reverse engineering and third party addon installations. Thanks, community and [Disid](http://www.disid.com/) in particular for the updates!
-   [Spring and Groovy & Grails Tool Suite lead Martin Lippert just announced versions 3.6.3](https://spring.io/blog/2014/12/02/spring-tool-suite-and-groovy-grails-tool-suite-3-6-3-released). The new release includes updated Spring Integration visualizations, a installed-by-default Cloud Foundry plugin and more. Check it out!
-   Want to learn about the Spring Integration Java configuration DSL in terms of a working, line-by-line example? Check out [this post by Java configuration DSL lead Artem Bilan](https://spring.io/blog/2014/11/25/spring-integration-java-dsl-line-by-line-tutorial) and if you want to see how it works on JDK 7 or earlier, [check out this post](https://spring.io/blog/2014/12/01/spring-integration-java-dsl-pre-java-8-line-by-line-tutorial).
-   Spring Data lead Oliver Gierke just announced the [first milestone of the next Spring Data release train, Spring Data Fowler](https://spring.io/blog/2014/12/01/first-milestone-of-spring-data-release-train-fowler-available).
-   The replay from the [good Dr. David Syer's SpringOne2GX 2014 talk on security for microservices](https://spring.io/blog/2014/12/02/springone2gx-2014-replay-security-for-microservices-with-spring-and-oauth2) is now available online.
-   Additionally, check out [Dr. Syer and Spencer Gibb's talk introducing Spring Cloud](https://spring.io/blog/2014/12/02/springone2gx-2014-replay-spring-boot-and-netflix-oss) to the world at SpringOne2GX 2014!
-   Check out the SpringOne2GX 2014 replay of Reactor project ninjas Jon Brisbin and Stephane Maldini's talk: [Building Reactive applications with Reactor and the Reactive Streams standard](https://spring.io/blog/2014/12/02/springone2gx-2014-replay-building-reactive-applications-with-reactor-and-the-reactive-streams-standa4d)
-   Join Spring Integration project-lead Gary Russell for a not-to-be-missed webinar [on January 27th that introduces the just-released Spring Integration Java configuration DSL](https://spring.io/blog/2014/12/02/webinar-introducing-the-java-dsl-for-spring-integration)!
-   You know what they say: go grid or go home! Or something like that…​ *anyway*, definitely check out my pal Luke Shannon's upcoming webinar [on building scalable data applications with Spring Data Gemfire](https://spring.io/blog/2014/12/02/webinar-building-scalable-data-applications-with-spring-and-gemfire)
-   Adao Feliz put together a nice [post on using Spring Boot and Docker](http://blog.adaofeliz.com/2014/11/21/first-look-spring-boot-and-docker/). It's pretty straightforward, so check it out!
-   The *All and Sundry* blog has a nice post [on how to consume linked resources using Spring's `RestTemplate`](http://www.java-allandsundry.com/2014/11/spring-resttemplate-with-linked-resource.html).
-   Check out the early bits for the [next-gen Cloud Foundry built from the ground up on the Go language and supports Docker as a first-class citizen](https://docs.google.com/document/d/1WWoQ_d5nR4-P6VfLbAAbzOZIvRj-Xdff2hsjM_ZWRUQ/mobilebasic?pli=1). If you know how to use Vagrant, it's dead simple to get a full *working* Cloud Foundry cloud running on your laptop if you follow these instructions. Do try it out and let us know!
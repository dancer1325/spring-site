---
title: This Week in Spring - August 22nd, 2017
source: https://spring.io/blog/2017/08/22/this-week-in-spring-august-22nd-2017
scraped: 2026-02-23T16:24:04.666Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 22, 2017 | 1 Comment
---

# This Week in Spring - August 22nd, 2017

_Engineering | Josh Long |  August 22, 2017 | 1 Comment_

Hi Spring fans! Welcome to another installation of This Week in Spring. Can you believe we're already nearing the end of August?? Time sure flies!

Last week and over the weekend I was in Hangzhou, China visiting with Alibaba, talking to a few of the teams using Spring Boot and Spring Cloud at China-scale.

This week I'm in Shanghai, China, where I've been talking to customers and spending a few days with the teams at Microsoft China who are working on the Spring Boot and Pivotal Cloud Foundry integrations for Microsoft Azure. They're doing some amazing work and it's been an honor to hang out with them. Check out all the cool Spring Boot starters that they've [built for the various Azure services](https://github.com/microsoft/azure-spring-boot-starters).

![](https://pbs.twimg.com/media/DH0-8NHWAAACvlG.jpg:large) (*me with the Microsoft Shanghai teams*)

Now it's off to Beijing, China, for the Spring Summit event! I sure hope to see you there! If you're around, [don't hesitate to ping me on WeChat](http://joshlong.com/media/wechat.jpg).

-   Spring messaging guru Artemm Bilan just announced [Spring for Apache Kafka 1.3M2](https://spring.io/blog/2017/08/21/spring-for-apache-kafka-1-3-milestone-2-available). This release is a subset of the Spring Framework 5-compatible 2.0 line. It integrates Apache Kafka 0.11.0.0. It introduces the `KafkaTransationManager` and `KafkaListenerContainer`, among other things.
-   Spring Batch and Spring Cloud Task lead Michael Minella just announced [Spring Cloud Task 2.0.0.M1](https://spring.io/blog/2017/08/17/spring-cloud-task-2-0-0-m1-is-now-available) which is the first to be compatible with Spring Boot 2.0. This upgrades all other dependencies including Spring Batch, Spring Cloud Stream, etc.
-   Spring Cloud contributor Ryan Baxter just [announced Spring Cloud Dalston SR3](https://spring.io/blog/2017/08/21/spring-cloud-dalston-sr3-is-now-available) is available. This new release includes updates the Zookeeper, Sleuth, Netflix and Contract modules.
-   the [new Spring Boot Actuator endpoints in Spring Boot 2.0 are hot sauce](https://spring.io/blog/2017/08/22/introducing-actuator-endpoints-in-spring-boot-2-0)! They're infrastructure agnostic; they work with Spring MVC, Spring WebFlux (a reactive API) and with Jersey (and it's easy enough to integrate other JAX-RS implementations).
-   This is a very good [list of community-driven Spring Boot starters](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-starters/README.adoc) that haven't made their way on to the Spring Initializr.
-   I liked this [post by Dan Vega on getting started with Spring Boot and Angular 4](http://therealdanvega.com/blog/2017/05/03/spring-angular-applications). Short and sweet! Check it out.
-   Simon Wirtz [looks at how to build a reactive](https://blog.simon-wirtz.de/spring-webflux-with-kotlin-reactive-web/) `@RestController` and functional reactive endpoints using the Kotlin-language WebFlux DSL.
-   Check out the [slides to tracing (he contributes to Spring Cloud Sleuth, among other things!) and observability](https://www.dotconferences.com/2017/04/adrian-cole-observability-3-ways-logging-metrics-tracing) master Adrian Cole's talk at the 2017 dotScale conference.
-   We see a lot of Pivotal Cloud Foundry customers debating which infrastructure they should use to run PCF. While PCF doesn't care, technically, you might [be interested in this post](https://metamarkets.com/2017/big-cloud-data-aws-and-gcp/) comparing the two.
-   Check out Dr. David Syer's talk [*The Road to Serverless: Functions as Applications*](https://www.youtube.com/watch?v=lJEYG2PjGNU) from Spring I/O 2017
-   The Didispace blog has a [nice (Chinese-language) post on using Spring Boot with Swagger 2.0](http://blog.didispace.com/spring-boot-starter-swagger-1.2.0/)
-   Hat tip to Oliver Gierke that shared [this tool, SonarLint](http://www.sonarlint.org/), which lets you detect code quality issues interactively in your IDE
-   This isn't strictly speaking related to Spring, but it's an interesting post nonetheless: [how Stripe handle API versioning](https://stripe.com/blog/api-versioning).
-   I liked this interview with my buddy and Pivotal CTO Josh McKenty on [why platforms are neutralizing Conway's Law](https://www.forbes.com/sites/danwoods/2017/08/15/how-platforms-are-neutralizing-conways-law/#38352dbb32a0)
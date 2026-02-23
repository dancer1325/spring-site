---
title: This Week in Spring - May 22nd, 2018
source: https://spring.io/blog/2018/05/23/this-week-in-spring-may-22nd-2018
scraped: 2026-02-23T15:24:04.132Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 23, 2018 | 2 Comments
---

# This Week in Spring - May 22nd, 2018

_Engineering | Josh Long |  May 23, 2018 | 2 Comments_

Hi Spring fans! Whew! What a wild week it's been! I landed in Kiev, Ukraine, last Thursday to present at the *epic* [JEEConf in beautiful Kiev](https://jeeconf.com/). Then, this weekend it was off to Dublin, Ireland and Belfast, North Ireland, where I had the privilege of speaking to some of the amazing Pivotal customers (like [Liberty](https://twitter.com/Liberty_IT/status/998847225735327744)). I concluded today here in Belfast and tomorrow it's off to bella Barcelona, Spain for the [Spring I/O conference](https://2018.springio.net/).

As usual, it's been a *crazy* awesome week in the Spring community so without further ado let's get to it!

-   We now have [OIDC Provider Configuration support in Spring Security Master](https://github.com/spring-projects/spring-security/blob/9d55a64465c65d633f849d09aca44a9134e6e335/config/src/main/java/org/springframework/security/config/oauth2/client/oidc/OidcConfigurationProvider.java#L42). Awesome!
-   Be sure not to miss this webinar on what's new in Spring Cloud Stream, June 7th, from [Spring Cloud Stream lead Oleg Zhurakousky](https://content.pivotal.io/webinars/jun-7-spring-cloud-stream-whats-new-in-2-x-and-whats-next-webinar?platform=hootsuite)
-   Over on [the Pivotal blog](https://content.pivotal.io/blog/should-that-be-a-microservice-keep-these-six-factors-in-mind) asks: "Should that be a microservice?" and gives six factors to keep in mind when making the call and cut.
-   Do you really need any more reason to go to SpringOne Platform? Do *not* miss [this compelling invitation](https://spring.io/blog/2018/05/22/enjoy-quality-time-with-the-spring-and-reactor-communities-at-springone-platform) from Reactor project lead Stephane Maldini!
-   Visualize and Monitor your [Pivotal Cloud Foundry Deployments with Weave Cloud for PCF](https://pivotal.io/platform/services-marketplace/monitoring-metrics-and-logging/weave-cloud)
-   Spring Data JDBC now has [support for `@Table` and `@Column`](https://github.com/spring-projects/spring-data-jdbc/commit/cd7403907a56d33853fae4c46bc135c90552aca2) annotations thanks to @kazuki43zoo
-   Spring Data lead Oliver Gierke announced that we're extending Spring Data's JavaSlang integration with support for `Try` as query method return value, and encourages us to give the bits a, well, [..try](https://jira.spring.io/browse/DATACMNS-983)
-   Spring Data legend Christoph Strobl has just announced [Spring Data Lovelace M3](https://spring.io/blog/2018/05/17/spring-data-lovelace-m3-released) which includes, among other things, revised documentation, annotation based auditing for the JDBC module, synchronous and reactive transaction support in preparation for the MongoDB 4.0 release, reactive map/reduce abstractions for MongoDB, enhancements to the Lucene index support in Spring Data Gemfire and for Apache Geode, reactive pub/sub for Spring Data Redis, Kotlin extensions for Spring Data Cassandra, driver upgrades for Gemfire 9.5, Apache Geode 1.6, Lettuce 5.1 (M1), MongoDB 3.8 (beta2), MongoDB Reactive Streams 1.9 (beta1) and Cassandra 3.5, and so much more!
-   Spring Cloud Data Flow lead Dr. Mark Pollack has just [announced Spring Cloud Data Flow 1.5](https://spring.io/blog/2018/05/16/spring-cloud-data-flow-1-5-0-released), which includes UI Improvements,

Spring Boot 2.0, Spring Cloud Stream 2.0, and Spring Cloud Task 2.0 Support, updated application starters, metrics Improvements, nested splits for composed tasks, Kubernetes improvements, and updated File Ingest samples, and so much more!

-   Hi Spring fans! In last week's installments of Spring Tips, I looked at [Project Riff](http://projectRiff.io) and Spring Cloud Function, [a one-two punch for serverless function-as-a-service applications](https://spring.io/blog/2018/05/16/spring-tips-project-riff-and-spring-cloud-function). Project Riff is a FaaS platform from Pivotal and Spring Cloud Function makes writing portable, Spring Boot-aware functions for a number of different platforms as easy as possible.
-   What happens inside a Spring Data reactive driver, and how is data accessed in a reactive setting? Learn more from Spring Data ninja Mark Paluch's talk ["Under the Hood of Reactive Data Access"](https://www.infoq.com/presentations/spring-data-reactive-driver), now on InfoQ.
-   [RabbitMQ 3.7.5 is out!](https://groups.google.com/forum/#!msg/rabbitmq-users/XkkHZCdDQMg/wHSv6IUxCAAJ)
-   Daniel Mikusa has a nice post walking us through [how to install Wordpress on Cloud Foundry](https://www.cloudfoundry.org/blog/install-scale-wordpress-cloud-foundry-2018/). This isn't to do with Spring, per se, but it does demonstrate how to [get a fairly complicated application onto the platform](https://www.cloudfoundry.org/blog/install-scale-wordpress-cloud-foundry-2018/)
-   The "Devskiller" blog has an awesome [post on testing REST and messaging-based microservices with Spring Cloud Contract](https://devskiller.com/techblog/2018/05/17/Testing-REST-and-Messaging-With-Spring-Cloud-Contract-At-Devskiller/)
-   Microsoft have just unveiled [the Application Insights starters for Spring Boot](https://github.com/Microsoft/ApplicationInsights-Java/blob/master/azure-application-insights-spring-boot-starter/README.md)
-   Spring Integration and Spring for Apache Kafka [lead Gary Russell offers an official "pro-tip"!](https://twitter.com/gprussell/status/997566108306681856)
-   The 2.0.0.GA release of Spring Boot Admin has just dropped! The new release has a *ton* of nice features so do check out the release while you can! NB: the support for discovery of other services through the `DiscoveryClient`, which hinges on the not-just-yet GA Spring Cloud Finchley release, has been kept out of this release and will release when the final version is available. Anyway, get the [bits while they're hot!](https://github.com/codecentric/spring-boot-admin/releases/tag/2.0.0)
-   This looks interesting! It's a [Spring RESTDocs snippet implementation that produces importable Postman collections](https://github.com/GreaterMKEMeetup/spring-restdocs-postman).
-   InfoQ have Pivotal and Spring legends' [Sannidhi Jalukar and Madhura Bhave's talk on doing TDD](https://www.infoq.com/presentations/tdd-spring-boot) for a Spring Boot application using Boot annotations and utilities and dealing with DB queries, caching, reactive programming. Awesome talk and well-worth a watch!
-   Flowable is an open-source BPMN engine that integrates nicely with Spring Boot. Flowable project engineer Tijs Rademakers just announced that "[Flowable 6.3.1 has been released](https://flowable.org/downloads.html) with enhanced historic information and pluggability options for the CMMN Engine, a new app engine to support the life cycle of apps within Flowable, improved Spring Boot 2.0.2 support and more"
-   This is an interesting post on using [Apache Camel with Spring Cloud Stream](https://blog.switchbit.io/camel-spring-cloud-stream/)
-   I really enjoyed this post that begins to [look at an application to support forget-me functionality](https://springuni.com/gdpr-forget-me-app-with-spring-integration-part-1/) in a Spring Integration-based application, in the context of the new GDPR regulations in the European Union.
-   Bogdan D has [a nice post on using Toggles](https://medium.com/@bogdandraghicescu/spring-boot-feature-toggles-fe66cfa7504d), a feature-toggle library, with Spring Boot.
-   This looks promising! It seems support for the [Micrometer](http://micrometer.io) metrics facade [has just landed in Project Reactor](https://twitter.com/projectreactor/status/998383862852993024?s=12)!
-   Spring Boot ninja Stéphane Nicoll reveals an interesting new Actuator feature [in Spring Boot 2.1 supporting caches](https://twitter.com/snicoll/status/997080635360587776?s=12)
-   Pretty cool to see Spring Test lead and JUnit lead Sam Brannen's poetry included in [Java Architect Mark Reinold's talk on the state of Java in 2018](https://www.youtube.com/watch?time_continue=1064&v=HqxZFoY_snQ)
-   This is a sample Spring Boot application [that uses different data sources for reads and writes](https://github.com/tiwarivikash/db-read-write)
-   Codecentric's [Chaos Monkey for Spring Boot is a really interesting project](https://github.com/codecentric/chaos-monkey-spring-boot)
-   Okta Developer Advocate Matt Raible just debuted updates to Spring Boot 2.0 for his videos [looking at building microservices and securing microservices with Spring](https://twitter.com/mraible/status/997153618821345281?s=12)
-   "Mr. Devoxx," Stephan Janssen, founder of Devoxx, has a great talk introducing his team's journey [to revamp a Devoxx property using Spring Boot and JHipster](https://twitter.com/stephan007/status/997370353381969920?s=12). Check it out!
-   Are you [registered for the SpringOne Tour London event](https://springonetour.io/2018/london)? Do *not* miss this!
-   Spring Tool Suite lead Martin Lippert has just [announced the latest update of the Spring Tools Suite 4 public beta (milestone 11)](https://twitter.com/springcentral/status/996805262538194944) including, among other things, performance and memory improvements, support for Java 10, and that Webflux handler method code lenses now work in Eclipse.
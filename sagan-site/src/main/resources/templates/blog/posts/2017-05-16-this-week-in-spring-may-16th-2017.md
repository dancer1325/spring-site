---
title: This Week in Spring - May 16th, 2017
source: https://spring.io/blog/2017/05/16/this-week-in-spring-may-16th-2017
scraped: 2026-02-23T16:32:14.548Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 16, 2017 | 0 Comments
---

# This Week in Spring - May 16th, 2017

_Engineering | Josh Long |  May 16, 2017 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I am in [Munich for the Spring Meetup](https://www.meetup.com/Spring-Meetup-Munich/events/238276763/); Berlin for [OSDC](https://www.netways.de/?id=2567&L=1); Krakow for [Geecon](https://2017.geecon.org/schedule-day2/); Barcelona for [Spring I/O](http://2017.springio.net/), and Eindhoven for [NextBuild](http://nextbuild.nl/speakers/josh-long/). If you're around, [say hi](http://twitter.com/starbuxman).

As usual, we've got a lot to cover so let's get to it!

-   Dr. Mark Pollack [just announced Spring Cloud Data Flow 1.2GA!](https://spring.io/blog/2017/05/15/spring-cloud-data-flow-1-2-ga-released), including the server editions for local, Kubernetes, YARN and Cloud Foundry. This new release is *packed* with good stuff. I particularly like the support for composed tasks, which lets me orchestrate a flow of tasks as a cohesive unit-of-work. This is ideal for complex ETL pipelines. It even includes support for sequential, parallel, and conditional sequence transitions. And, of course, all of this can be mixed-and-matched. Previously, to get this kind of power, you had to manually wire up remote partitioning in a Spring Batch job. Or setup some very complicated Spring Integration flow. And neither would've given me everything this does. It also includes support for better runtime visibility into what is happening, OAuth support, role-based access, and much more. This is a *very* cool release! Get the bits and try it out now!
-   [Spring Boot 2.0M1 has just been released!](https://spring.io/blog/2017/05/16/spring-boot-2-0-0-m1-available-now)
-   [Spring Batch 4 keeps chugging along](https://spring.io/blog/2017/05/15/spring-batch-4-0-0-m2-is-now-available)! The new milestone includes updates to the Java configuration API (new builders!) and dependdency updates.
-   Spring REST Docs lead Andy Wilkinson has just [published a maintenance release](https://spring.io/blog/2017/05/12/spring-rest-docs-1-2-1-release)
-   Spring Security lead Rob Winch just [announced the first Milestone of the new 5.0 line](https://spring.io/blog/2017/05/11/spring-security-5-0-0-m1). The new release includes OAuth 2.0 and OpenID connect 1.0 support as well as reactive integration!
-   never one to rest, Rob *also* announced [Spring Session 2.0 M1](https://spring.io/blog/2017/05/11/spring-session-2-0-0-m1-released) which integrates with Spring Framework 5.
-   there are exciting changes a brewin' in the new Pivotal Spring education. [Paul Chapman has the details here](https://spring.io/blog/2017/05/10/pivotal-announces-spring-curriculum-certification-changes)
-   Spring Data ninja Mark Paluch [just announced Spring Data Kay M3](https://spring.io/blog/2017/05/09/spring-data-release-train-kay-m3-released). This release includes a raft of updates to the various data stores and improved support for reactive tailable cursors in MongoDB, among other things.
-   check out this example on how to introduce [Zipkin into a traditional XML Spring app](https://github.com/openzipkin/brave-webmvc-example)
-   Cereebro, a fine [microservice dashboard that works with Spring Cloud, has just reached 1.0](http://michaeltecourt.github.io/2017/05/14/introducing-cereebro.html)
-   [BOSH, which lets you deploy and manage services, has just gotten considerably simpler](https://twitter.com/jambay/status/863228230781685760)!
-   check out [this handy Reactive Thymeleaf example](https://github.com/danielfernandez/reactive-matchday)
-   I liked this presentation [which introduces consumer driven contract testing](https://www.slideshare.net/tobiasflohre/consumer-driven-contract-testing-ein-berblick)
-   Alex Soto is back with a second installment on how to [test Spring Boot applications using Arquillian](http://www.lordofthejars.com/2017/05/testing-spring-data-spring-boot.html)
-   This [Tensorflow integration for Spring Cloud Data Flow looks *awesome*](https://github.com/spring-cloud-stream-app-starters/tensorflow)
-   Not strictly Spring specific, but I liked this resource on [how and where to apply Kotlin on the server side](https://kotlinlang.org/docs/reference/server-overview.html)
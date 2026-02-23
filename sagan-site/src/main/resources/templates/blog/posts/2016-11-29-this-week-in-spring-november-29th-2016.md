---
title: This Week in Spring - November 29th, 2016
source: https://spring.io/blog/2016/11/29/this-week-in-spring-november-29th-2016
scraped: 2026-02-23T18:56:54.179Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 29, 2016 | 1 Comment
---

# This Week in Spring - November 29th, 2016

_Engineering | Josh Long |  November 29, 2016 | 1 Comment_

Welcome to another installment of *This Week in Spring!* I can't believe how quickly this year has gone! This week I'm in [Melbourne, Australia for the YOW! conference](http://melbourne.yowconference.com.au/) and then week it's off to Brisbane and then Sydney for the next editions of the same show. Australia is the furthest I've ever been from my 'native' timezone - so even though I always post *This Week in Spring* every Tuesday, I appreciate that it's still Monday for anybody west of Europe right now! Tonight, I'll join my pal, Intellij's Trisha Gee, and we'll be speaking at the [Melbourne JVM User Group](https://www.meetup.com/en-AU/Melbourne-Java-JVM-Users-Group/). I'm super excited to be here, for my first time, helping bring the Spring down under. If you're around [then say hi (@starbuxman)!](http://twitter.com/starbuxman)

Huge release week for the Spring Cloud Dataflow team!

-   Spring Cloud Data Flow lead Dr. Mark Pollack just announced [Spring Cloud Data Flow 1.1.GA](https://spring.io/blog/2016/11/23/spring-cloud-data-flow-1-1-ga-released)
-   Spring Cloud Task lead Michael Minella just announced [Spring Cloud Task 1.1.0](https://spring.io/blog/2016/11/22/spring-cloud-task-1-1-0-release-is-now-available) with updated error handling, improvements to partitioned Spring Batch `Job`s, external exection ID persistence, additional databases support and so much more.
-   Spring Cloud Data Flow ninja Thomas Risberg just announced [Spring Cloud Data Flow for Kubernetes 1.1.RC1](https://spring.io/blog/2016/11/22/spring-cloud-data-flow-for-kubernetes-1-1-rc1-released) which improves support for running batch and stream processing while deploying to Kubernetes as a service fabric.
-   Spring Cloud Data Flow ninja Janne Valkealahti just announced [Spring Cloud Data Flow for Apache YARN 1.1.0 RC1](https://spring.io/blog/2016/11/23/spring-cloud-data-flow-for-apache-yarn-1-1-0-rc1-released)

A Reactive Week

-   Spring Data ninja Mark Paluch just published a super cool look at some of the upcoming support for [reactive programming in Spring Data](https://spring.io/blog/2016/11/22/spring-cloud-data-flow-for-kubernetes-1-1-rc1-released) going well beyond some of the limited support for asynchronous types already in Spring Data. I personally can't wait to see MongoDB fly with `@EnableReactiveMongoRepositories`!
    
-   Spring Data lead Oliver Gierke just annonced the first milestone of Spring Data Kay, which is more than just a new release: it updates the baseline revision to Java 8, includes support for reactive programming in [Spring Data MongoDB, Cassandra, and Redis, and so much more](https://spring.io/blog/2016/11/23/first-milestone-of-next-generation-spring-data-released)
    
-   Spring Sesssion lead Rob Winch just [announced Spring Session 1.3.0.RC1](https://spring.io/blog/2016/11/23/spring-session-1-3-0-rc1-released), which includes first-class Spring Security RememberMe integration, updates to use Lettuce (the Redis driver), OrientDB support, performance improvements and much more
    
-   last week, in the ongoing Spring Tips column, we looked at Cloud Foundry, the open-source Cloud Native Platform, [as a quick way to ship software](https://spring.io/blog/2016/11/23/spring-tips-cloud-foundry)
    
-   I really liked this visual presentation introducing [CQRS and event-sourcing by the folks at OpenCredo](http://www.slideshare.net/opencredo/a-visual-introduction-to-event-sourcing-and-cqrs-by-lorenzo-nicora)
    
-   My friend Simon Brown's excellent [books on Software Architecture are (for a limited time only!) available for free](https://leanpub.com/b/software-architecture)! Get 'em while you can!
    
-   our friend, Matti Tahvonen, a Vaadin developer advocate, put together a nice example [using Hibernate Spatial, Vaadin and Spring Boot](https://github.com/mstahv/spring-boot-spatial-example)
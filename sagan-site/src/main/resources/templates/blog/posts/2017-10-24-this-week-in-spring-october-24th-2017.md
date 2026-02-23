---
title: This Week in Spring - October 24th, 2017
source: https://spring.io/blog/2017/10/24/this-week-in-spring-october-24th-2017
scraped: 2026-02-23T16:17:59.104Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 24, 2017 | 4 Comments
---

# This Week in Spring - October 24th, 2017

_Engineering | Josh Long |  October 24, 2017 | 4 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! Can you believe we're already staring down the end of October 2017? This year has *flown* by! What a rush! This week I'm home in sunny San Francisco talking to customers and giving talks.

I'll be speaking "at" the [vJUG 24 online conference](_URL_). The conference lasts 24 hours! There's a talk every hour, from as many timezones as possible! I hope you'll join me (and thousands of others) as we look at Reactive Spring at 04:00 GMT on Wednesday.

And, of course, I hope you'll register and join my friend and Grails co-founder Jeff Scott Brown and me for a look [at Grails for Spring Developers](https://objectcomputing.com/products/grails/webinar-grails-3-spring-developers/) on November 9th, 2017.

-   In last week's installment of *Spring Tips*, [I look at how to use JAX-RS, with the Jersey reference implementation, in a Spring Boot 2.0 application](https://spring.io/blog/2017/10/18/spring-tips-bootiful-jax-rs) context.
-   Spring Integration ninja Artem Bilan [has just announced Spring Integration for AWS 1.1 RC1](https://spring.io/blog/2017/10/19/spring-integration-for-aws-1-1-release-candidate-1-available). The new release includes a `KinesisMessageDrivenChannelAdapter`, a `DynamoDbMetaDataStore`, a Spring Cloud Stream Kinesis Binder, and much more. Check it out!
-   Spring Boot 1.x does *not* support Java 9. Spring Boot 2.0, due in December, does. That said, if you want to use Spring Boot 1.x with Java 9, you might [appreciate this Wiki page with some gotchas on using Java 9](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-with-Java-9).
-   Our very own Richard Seroter has put together a [great list of five ways to shop software like a software company](https://content.pivotal.io/blog/velocity-as-a-service-5-ways-to-ship-like-a-software-company), and increase velocity.
-   I love this issue in Spring Framework wherein Thymeleaf lead Daniel Fernandez sheds a lot of on [how to use Thymeleaf in a Spring WebFlux-based application](https://jira.spring.io/browse/SPR-14981).
-   You can now provision [multi-instance RabbitMQ clusters on demand](https://content.pivotal.io/home-page/demand-your-on-demand-rabbitmq-clusters-now) with `cf create-serivice` on Pivotal Cloud Foundry: hurray!
-   Andreas Falk has a nice look at how to [manage secrets on Cloud Foundry with, among other things, Spring Cloud Vault](https://www.youtube.com/watch?v=QlyslxoTCUA).
-   Randhir Randhir Singh has put together [a nice look at how to build a Spring Cloud Data Flow to build real-time data integration and data processing pipelines](https://dzone.com/articles/building-data-pipelines-with-spring-cloud-data-flo) by stitching together Spring Boot applications.
-   I love this *All and Sundry* blog by Biju Kunjummen [comparing the performance of Spring Boot 1.0 vs. Spring Boot 2.0](http://www.java-allandsundry.com/2017/10/raw-performance-numbers-spring-boot-2.html?m=1), which of course is based on Spring WebFlux and the Reactor Project. Spoiler alert: the async, non-blocking IO in Spring Boot 2.0 supports *many* more demand at SLA levels.
-   OK, first: this is *super* early days, and nothing more than a prototype! But, our very own [Vinicius Carvalho has put together a *prototype* integration for Spring and RSocket](https://github.com/viniciusccarvalho/spring-cloud-sockets). RSocket is a high performance protocol on top of the Reactive Streams types (and, in particular, it uses Reactor). It enjoys contributions from senior engineers at Facebook, Netflix, and the AEron project, among many others. All this to say, this is *really* exciting! But early, yet! (Did I mention that?) It's super early and *so* I'm sure Vinicius would appreciate any feedback.
-   I love this amazing example from Spring Framework, reactive Spring and Kotlin ninja Sébastien Deleuze demonstrating [how to use Kotlin for both the front end and back end of an application](https://github.com/sdeleuze/spring-kotlin-fullstack). The front-end leverages Kotlin2JS and the backend leverages Kotlin on the JVM (with Spring Boot, natch)
-   I haven't read this yet, but it does interesting: Ravi Kant Soni has written [a book on building Angular applications with Spring Boot](https://www.amazon.com/Full-Stack-AngularJS-Java-Developers/dp/148423197X/ref=redir_mobile_desktop/131-1572141-3987769?_encoding=UTF8&dpID=51XPtAmfcFL&dpPl=1&keywords=ravi%20kant%20soni&pi=AC_SX236_SY340_FMwebp_QL65&qid=1508328122&ref=plSrch&ref_=mp_s_a_1_1&sr=8-1). Check it out.
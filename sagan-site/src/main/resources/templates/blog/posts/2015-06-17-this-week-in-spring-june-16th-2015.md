---
title: This Week in Spring - June 16th, 2015
source: https://spring.io/blog/2015/06/17/this-week-in-spring-june-16th-2015
scraped: 2026-02-23T19:49:13.720Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 17, 2015 | 1 Comment
---

# This Week in Spring - June 16th, 2015

_Engineering | Josh Long |  June 17, 2015 | 1 Comment_

Welcome to another installment of *This Week in Spring*! This week I'm in sunny London for Devoxx UK where I'll be talking to developers about building cloud-native applications with Spring Boot, Spring Cloud, and Cloud Foundry. As usual, if you're in the area, [hit me up](http://twitter.com/starbuxman). The big news this week is the Spring XD 1.2 GA blowing the doors off performance numbers! No benchmarketing here, everything is published and reproducible: Performance turning to get ~12 MILLION msg/sec with an in-memory transport and 2.6MILLION msg/sec when using Kafka (100 byte messages). Lots more detail in the [performance blog](http://spring.io/blog/2015/06/17/spring-xd-benchmarks-part-1). And we haven't even talked about the Amabari installer or the containerload of [new features](http://spring.io/blog/2015/06/17/spring-xd-1-2-ga-spring-xd-1-1-3-and-flo-for-spring-xd-beta-released).

-   Check out Spring ninja Stephane Nicoll's [blog introducing the smart new auto-configuration in Spring Boot 1.3M1 for Spring Cache](https://spring.io/blog/2015/06/15/cache-auto-configuration-in-spring-boot-1-3) (and by extension, any JSR107 implementation)
-   Spring community member Tadaya Tsuyukubo introduces [his Spring Social Evernote binding in this fantastic guest post](https://spring.io/blog/2015/06/15/introducing-spring-social-evernote)
-   Spring lead Juergen Hoeller has [explained the Spring framework 3.2 end-of-line plan](https://spring.io/blog/2015/06/15/spring-framework-3-2-x-eol-on-dec-31-2016)
-   Spring Data Gemfire lead [John Blum introduces the requisite support for Apache Geode](https://spring.io/blog/2015/06/12/spring-data-gemfire-supports-apache-geode). Apache Geode is in the Apache incubation project, and is based on the open-source Gemfire technology.
-   Spring Boot co-lead Phillip Webb just [announced Spring Boot 1.3M1](https://spring.io/blog/2015/06/12/spring-boot-1-3-0-m1-available-now) which is *packed* with lots of great features

including the *fabulous* `devtools` module that supports tools that are particularly useful at *development* time: view template reloading, remote-debugging, a live-reloader of sorts, and much more. It also offer one of my all-time favorite Spring Boot features: executable `.jar`s! With this new feature, you can run `mvn clean install` and then run `./foo.jar` on a UNIX-like environment and *it just works*!

-   Spring Data ninja Thomas Risberg [just announced Spring for Apache Hadoop 2.2 GA](https://spring.io/blog/2015/06/11/spring-for-apache-hadoop-2-2-ga-released)
-   Spring framework lead Juergen Hoeller [invites feedback about Spring framework 5 requirements](https://spring.io/blog/2015/06/10/feedback-welcome-spring-5-system-requirements)
-   Our pals over at [NTT Data put together a nice post on Terasoluna](http://terasolunaorg.github.io/), a framework that they build that sits on top of Spring and Spring Boot, and that they certify when building (a considerable many) applications that needs to last.
-   Josha Stella put together a [nice look at why we should prefer immutable infrastructure](http://radar.oreilly.com/2015/06/an-introduction-to-immutable-infrastructure.html). Battery Ventures (formerly Netflix)'s Adrian Cochroft famously talked about this, saying "treat servers like pets, not cattle." This is a good read, even if it has absolutely nothing to do with Spring.
-   The people at Boxfuse look at how to build a Spring Boot application [and then use *fuse* it into an Amazon EC2-runnable image](https://boxfuse.com/blog/spring-boot-ec2.html) in a few simple steps. Boxfuse looks interesting, but keep in mind that Boxfuse is for-pay. As an alternative, [you could simply run Docker images almost anywhere these days](https://spring.io/guides/gs/spring-cloud-and-lattice/).
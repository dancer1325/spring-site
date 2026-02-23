---
title: This Week in Spring - February 7th, 2017
source: https://spring.io/blog/2017/02/07/this-week-in-spring-february-7th-2017
scraped: 2026-02-23T18:38:41.383Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 07, 2017 | 1 Comment
---

# This Week in Spring - February 7th, 2017

_Engineering | Josh Long |  February 07, 2017 | 1 Comment_

Welcome to another installment of *This Week in Spring*! We've got a lot to cover this week so let's get to it.

-   Fred Melo is one of Pivotal's brightest and when he talks about data, people listen. Here's your chance to [watch his SpringOne Platform talk on data microservices](https://spring.io/blog/2017/02/06/springone-platform-2016-replay-architecting-for-cloud-native-data-data-microservices-done-right-using-spring-cloud)
-   The RabbitMQ Team has been busy! The RMQ Java Client has some very nice new (non-breaking) new features in [Metrics, logging and Java NIO](http://www.rabbitmq.com/blog/2016/11/24/rabbitmq-java-client-4-0-is-released), among other things.
-   Expanding on the metrics support in RMQ Java Client 4.0, the Rabbit team [blogs](http://www.rabbitmq.com/blog/2016/11/30/metrics-support-in-rabbitmq-java-client-4-0) about using JMX, Spring Boot Actuator and Coda Hale's awesome DropWizard Metrics library.
-   I liked this SpringOne Platform talk, from Confluent's Joe Kutner, [*I Can't Believe it's not a Queue: using Apache Kafka with Spring*](https://spring.io/blog/2017/02/06/springone-platform-2016-replay-i-can-t-believe-it-s-not-a-queue-using-kafka-with-spring). It's a focused look on Apache Kafka, one of the most capable and cloud-native message queues these days - Apache Kafka - with Spring.
-   Check out Spring Integration and messaging [guru Gary Russell's SpringOne Platform look at Spring for Apache Kafka](https://spring.io/blog/2017/02/06/springone-platform-2016-replay-spring-for-apache-kafka)
-   check out Spring and Spring for Apache Hadoop contributor [Thomas Risberg's look at building big-data pipelines with Spring](https://spring.io/blog/2017/02/06/springone-platform-2016-replay-spring-and-big-data)
-   our friend Toshiaki Maki has [built a *really* cool Graphviz visualization of the beans in an application](https://github.com/making/beansviz-spring-boot-actuator) that's accessible under the `/beansviz` endpoint.
-   Spring Cloud contributor Vinicius Carvalho's SpringOne Platform talk on [evolutionary and resilient microservices is one to watch](https://spring.io/blog/2017/02/06/springone-platform-2016-replay-building-resilient-and-evolutionary-data-microservices)
-   Spring Integration Java DSL lead Artem Bilan just [announced Spring for Apache Kafka 1.1.3](https://spring.io/blog/2017/02/06/spring-for-apache-kafka-1-1-3-available-now)
-   Spring Cloud ninja Marcin Grzejszczak [just announced Spring Cloud Camden SR5](https://spring.io/blog/2017/02/06/spring-cloud-camden-sr5-is-available)
-   the team behind Spring Tool Suite is cooking up some amazing stuff for Spring Tool Suite 4, and a huge part of that is an extraction of the plugins in STS as language servers that can be used with a variety of other IDEs, including Atom and Microsoft VS Code. As part of the that, [the team has just released the Cloud Foundry `manifest.yml` editor](https://spring.io/blog/2017/02/03/cloud-foundry-manifest-editor-beta-released-for-visual-studio-code)
-   Spring IO Platform lead [Andy Wilkinson just announced Spring IO Platform Brussels RC1](https://spring.io/blog/2017/02/02/spring-io-platform-brussels-rc1)
-   not one to rest on his laurels, Andy *also* just announced [Spring IO Platform Athens SR3](https://spring.io/blog/2017/02/01/spring-io-platform-athens-sr3)
-   Are you going to be at the fabulous DevNexus event in Atlanta, GA, later this month? [The Spring team will be there too!](https://spring.io/blog/2017/02/01/spring-team-at-devnexus-2017)
-   seems I missed a good one in January! Check out Muhammad Noor's post on building \[reactive based microservices with Spring Cloud and

Reactor\]([https://dzone.com/articles/functional-amp-reactive-spring-along-with-netflix](https://dzone.com/articles/functional-amp-reactive-spring-along-with-netflix))

-   Rashidi Zin put together a nice example of [using Spring Data to support entity auditing](https://github.com/rashidi/spring-boot-data-audit). Very cool Rashidi!
-   Bruno Krebs put together a very cool post on building [a REST API wiht test-driven development (and Spring Boot, naturally)](https://hackernoon.com/spring-boot-rest-tdd-from-scratch-15f13ed799e0#.hfy5lyjwl)
-   Mario-Leander Reimer's cloud-native workshop at the OOP17 conference looks pretty darned interesting! I wish I'd been there. For those of us that weren't, though, [there is at least his Git repository](https://github.com/qaware/hitchhikers-guide-cloudnative).
-   Speaking of DevNexus, this oldie-but-a-goodie, [*Keeping it Clean: Lessons from Open Source and How to Polish*](https://www.youtube.com/watch?v=X7O11GrHgjE), from Spring Boot co-lead Phil Webb is definitely a good watch if you haven't seen it
-   While not, strictly speaking, related to Spring, continuous delivery is the grand unifiying theory behind microservices, agile, TDD, and so many other practices we take for granted today and few people [introduce the rationale behind it better than Chris Farley](https://www.youtube.com/watch?v=nauFRW6gYjc)
-   This post has little to do with Spring itself but it is a *very* interesting look at the [implications on performance in the JVM that don't override `#hashCode` in certain contexts](https://srvaroa.github.io/jvm/java/openjdk/biased-locking/2017/01/30/hashCode.html)
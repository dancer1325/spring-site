---
title: This Week in Spring - January 16th, 2018
source: https://spring.io/blog/2018/01/17/this-week-in-spring-january-16th-2018
scraped: 2026-02-23T16:11:17.962Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 17, 2018 | 3 Comments
---

# This Week in Spring - January 16th, 2018

_Engineering | Josh Long |  January 17, 2018 | 3 Comments_

Aloha! This week I'm in [sunny Honolulu for the first annual LavaOne conference](https://twitter.com/LavaOneConf). If you're not here, you should be! The show is amazing, enjoys 50% female to male audience attendance, the speakers are world-class (well, except yours truly, but don't tell them that..) and the location is pretty hard to beat!

![](https://pbs.twimg.com/media/DTqYoe2VQAEdlbP.jpg:large)

That said, nothing gives me more pleasure than saddling up to a table with a laptop, some green tea, sunglasses and sunscreen lotion and checking in on the community. This week's been a heckuva week indeed! Lot's of great stuff so let's get to it!

-   Ryan Baxter just announced Spring Cloud Edgware SR1 which [contains updates for several modules](https://spring.io/blog/2018/01/16/spring-cloud-edgware-sr1-released)
-   Project Reactor team ninja [Simon Baslé offers a look at Reactor 3.2.M1](https://spring.io/blog/2018/01/16/sneak-peek-at-reactor-core-3-2-with-milestone-1)
-   [Vedran Pavić just announced Spring Session 2.0.0](https://spring.io/blog/2018/01/16/spring-session-2-0-0-released). Check it out - there are a ton of improvements.
-   Spring ninja Greg Turnquist has put together a nice post introducing the support [in Spring HATEOAS for the Affordances API](https://spring.io/blog/2018/01/12/building-richer-hypermedia-with-spring-hateoas)
-   There's now support for [query-by-example in Spring Data Redis](https://github.com/spring-projects/spring-data-redis/pull/301)
-   A friendly reminder that, going forward, [the preferred way to integrate with the OpenZipkin project is to publish messages over RabbitMQ or Apache Kafka using the `spring-cloud-starter-zipkin` client](http://cloud.spring.io/spring-cloud-static/Edgware.RELEASE/single/spring-cloud.html#_sleuth_with_zipkin_via_rabbitmq_or_kafka). This is different than using either Spring Cloud Sleuth Stream (which is deprecated) or using Spring Cloud Zipkin with HTTP, as we have demonstrated before. This stuff changes frequently!
-   I loved Java community legend [Antonio Goncalves' blog post detailing his impressions of testing in Spring](https://antoniogoncalves.org/2018/01/16/java-ee-vs-spring-testing/amp/?__twitter_impression=true) (and contrasting that with testing in Arquillian, for Java EE applications)
-   Spring Framework test [lead Sam Brannen has updated his sample app demonstrating Spring and JUnit 5](https://github.com/sbrannen/spring-test-junit5). Do check it out!
-   I loved this *The New Stack* interview with Spring creator and Atomist CEO Rod Johnson. In it he talks [about Spring, enterprise Java, SpringOne Platform and TypeScript](https://thenewstack.io/spring-rod-johnson-enterprise-java/), among many other things. Check it out!
-   This doesn't have to do with Spring, per se, but it's very interesting: [a DZone refcard on Apache Kakfa](https://dzone.com/refcardz/apache-kafka?oid=twitter)). Apache Kafka works well with Spring (via Spring Cloud Stream Kafka Binder, Spring Cloud Stream Kafka Streams Stream binder, Spring for Apache Kafka, and the Spring Integration extensions for Apache Kafka).
-   InfoQ has a nice roundup [of Pivotal Cloud Foundry 2.0 which has been reimagined to be a container, application and serverless-hosting platform](https://www.infoq.com/news/2018/01/PCF2BringsContainersServerless)
-   This looks kind of interesting. Maybe something you could enable during development and testing.. [It's a Spring AOP based interceptor that logs all interactions with, for example, Spring MVC](https://github.com/harshilsharma63/controller-logger).
-   Tomasz Nurkiewicz has a nice post that looks [at using Spring, Project Reactor, and ElasticSearch](http://www.nurkiewicz.com/2018/01/spring-reactor-and-elasticsearch-from.html)
-   Spring community legend Aboullaite Mohammed has [a really nice post on monitoring Spring Boot applications with Promtheus and Grafana](https://aboullaite.me/spring-boot-monitoring-prometheus-grafana/). Yay observability!
-   This blog looks at the new Meltdown and Spectre security vulnerabilities and highlights that, in order to be most effectively protected against something like this, you need completely automated infrastructure of the [sort that platforms like Cloud Foundry, which sits on top of BOSH, can provide](https://diginomica.com/2018/01/12/hardware-security-flaws-underscore-need-infrastructure-automation-meltdown-spectre-last-wake-call/)
-   The code for Spring Data lead Oliver Gierke's talk *Refactoring to a System of Systems* is [available online](https://github.com/olivergierke/sos). You should definitely watch the talk, too!
-   Just a friendly reminder that the \[performance of Spring Cloud Gateway

in the upcoming Spring Cloud Finchley release is boss-sauce and you should definitely try it out\]([https://twitter.com/juanantoniobm/status/951571465236811776?ref\_src=twcamp%5Eshare%7Ctwsrc%5Eios%7Ctwgr%5Ecom.blork.Pinner.AddBookmarkExtension](https://twitter.com/juanantoniobm/status/951571465236811776?ref_src=twcamp%5Eshare%7Ctwsrc%5Eios%7Ctwgr%5Ecom.blork.Pinner.AddBookmarkExtension))

-   Our very own Ben Hale is experimenting with a reactive SQL-based database access API. It's super early days yet, and no idea where it could go, but it's interesting and [you might take a look](https://github.com/nebhale/r2dbc).
-   See this post on a Linux (Xenial HWE) vulnerability [that affects your Cloud Foundry platform installations](https://cloudfoundry.org/usn-3522-2/)
-   I liked Johan Vos' post [on the state of Java](https://medium.com/@johanvos_42743/in-an-increasingly-complex-world-java-takes-the-right-move-ea11c757e76e). This has nothing to do, specifically, with Spring, but you'll enjoy it if you enjoy Spring (and the JVM).
-   *The New Stack* have also published [an interesting post on how Netflix built their continuous delivery platform, Spinnaker](https://thenewstack.io/netflix-built-spinnaker-high-velocity-continuous-delivery-platform/). One thing that I love about it that I didn't see mentioned here? It's built using Spring Boot!
-   Pivotal CTO Onsi Fakhouri was featured on [the Software Engineering Daily podcast](https://itunes.apple.com/us/podcast/software-engineering-daily/id1019576853?mt=2&i=1000399137566). This is well worth a listen!
-   Ranga Karanam put together a nice post detailing seven things people [should know when using Spring Boot](https://dzone.com/articles/7-things-to-know-getting-started-with-spring-boot)
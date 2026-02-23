---
title: This Week in Spring (SpringOne Platform 2018 edition) - September 25th, 2018
source: https://spring.io/blog/2018/09/26/this-week-in-spring-springone-platform-2018-edition-september-25th-2018
scraped: 2026-02-23T15:12:38.063Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 26, 2018 | 1 Comment
---

# This Week in Spring (SpringOne Platform 2018 edition) - September 25th, 2018

_Engineering | Josh Long |  September 26, 2018 | 1 Comment_

It's been such a crazy SpringOne Platform 2018 and we literally just started! I don't even know where to begin! The show represents the convergence of the best and the brightest in the ecosystem. It's absolutely amazing all the people who want and love to be here.

From our friends in the ecosystem, we see people from all organizations. IBM, Amazon Web Services, Microsoft *and* Google are *all* here hoping to make their platform the most compelling place to run Pivotal Cloud Foundry and Spring-based workloads. It's great to see my friends from all these organizations! Friends like my friends Erin Schnabel, Emma Tucker, Billy Korando and Pratik Patel from IBM...

![IBM devrel at Atomist party](https://pbs.twimg.com/media/Dn-VvuqUwAANaZt.jpg)

...and my friend Ray Tsang from Google and Bruno Borges from Microsoft..

It's nice when you can reunit with old colleagues who are now ecosystem partners and friends - it was amazing to see former VMWare and Pivotal alum Mark Chmarny (left) representing Google's KNative efforts today!

It was also great to see former SpringSource colleagues and friends Rod Johnson (creator of Spring) and Christian Dupuis representing Atomist, the new continuous delivery sensation that's sweeping the nation!

![Atomist Party](https://pbs.twimg.com/media/Dn-wYipX0AAl2-S.jpg)

I had fun MC'ing this morning's keynote with Pivotal legend Dormain Drewitz!

It was crazy fun sharing the stage with some of the best in the business, including the Spring team's own legends, Spring co-founder Juergen Hoeller and the good Dr. David Syer.

Speaking of the good Dr. Syer, I love this pearl of wisdom (from among thousands) from his keynote this morning:

I am so grateful that my buddy Matt Raible and I managed to finish a crazy 75+ printed pages of blog content just in time for the big show! Cheers buddy! We did it!

At SpringOne Platform, anything is possible! The Spring team is geographically dispersed, so it's great to be able to catch selfies with a plurality of any given team all in the same venue! Here, I get selfies with three members of the Spring Security team

It wouldn't be a world-class event if, in addition to seeing old friends, we couldn't make new ones.

Neha Narkhede, co-founder and CTO Confluentinc, and co-creator of Apache Kafka, absolutely *killed it* this morning in her keynote address at the conference. What a legend! What an amazing speaker and an amazing technologist!

It means *everything* to us to see our customers thriving. It was amazing to see DICKS Sporting Goods take the stage today to share their digital journey:

I had the privilege of introducing DICKS Sporting Goods so I thought I'd dress the part. I even went to a store in south San Francisco this weekend and got my attire just for their big debut!

A huge part of the value of SpringOne Platform, for those of us at Pivotal as well as the larger ecosystem, is just in getting the chance to see the legends in our ecosystem that changed the world. I'm a big James Watters fan. He's a big reason why, as a company, we all get out and work as hard as we can for our customers. He's shown us, always leading by example, time and time again, that if we focus on the customer and their desired outcomes, good things result. Rock on James! #GOAT

For every photo or moment I've shared here are a thousand other ones I haven't shared. It's been an INSANE 24h since the show started in full swing and we've got miles to go before we sleep!

So, without further ado, let's get to this week's amazing, release-packed roundup!

-   [Spring Cloud Function 2.0 and Azure Functions](https://spring.io/blog/2018/09/25/spring-cloud-function-2-0-and-azure-functions)
-   Good news everybody! [Spring Tool Suite 4 is here](https://spring.io/blog/2018/09/25/spring-tools-4-ga-released)! I want to personally congratulation Spring Tool Suite lead Martin Lippert on this *incredible* journey! STS 4 is a complete reworking of the engine behind the plugins supporting our Eclipse distribution. That engine represents a radical reprioritization of goals: the tools give you validation now based on runtime behavior instead of false positive yielded by trying to second-guess Spring at design time. The result is that using Java is fast and productive during development - no red squigglies with which to contend! - and any validation and navigation information is informed by the actual runtime behavior of the application. It's just more accurate. Additionally, the engine itself has been extracted out into language servers which run independent of Eclipse and are supported in Microsoft Visual Studio Code and Atom. I'm super impressed with this release! This has been a long and well-worth it journey.
-   Spring Boot team legend Madhura Bhave has just [announced Spring Boot 2.1.M4](https://spring.io/blog/2018/09/25/spring-boot-2-1-m4-available-now)! The new Spring Boot 2.1.0.M4 release ships with a ton of things including preliminary support for Spring Data JDBC, including a `@DataJdbcTest` annotation. Check it out!
-   [Hands on with Spring Vault 2.1](https://spring.io/blog/2018/09/24/hands-on-with-spring-vault-2-1)
-   [Spring Integration, AMQP and Kafka Release Candidates Available](https://spring.io/blog/2018/09/24/spring-integration-amqp-and-kafka-release-candidates-available)
-   [Spring Session BOM Bean-RC1 Released](https://spring.io/blog/2018/09/24/spring-session-bom-bean-rc1-released)
-   [Spring Data JDBC, References, and Aggregates](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates)
-   [Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M3 Released!](https://spring.io/blog/2018/09/22/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-m3-released)
-   [Spring Data Lovelace GA released](https://spring.io/blog/2018/09/21/spring-data-lovelace-ga-released)
-   [Spring Framework 5.1 goes GA](https://spring.io/blog/2018/09/21/spring-framework-5-1-goes-ga)
-   [Meet the New AWS Service Broker for PCF, Now an Open Beta. Here's Why It's the Easiest Way to Add 18 AWS Services to Your Cloud Native Apps.](https://content.pivotal.io/blog/meet-the-new-aws-service-broker-for-pcf-now-an-open-beta-heres-why-its-the-easiest-way-to-add-18-aws-services-to-your-cloud-native-apps?mkt_tok=eyJpIjoiWkRKak1ETTJPVEE0T0ROaiIsInQiOiJkYnpQaGdRc2IwRDExZTFMNnZKTGU2TXBpais4Z2hpaDA2UlBMSmxhQnpNMTZoMDJFTVgzT1BDKzJMYUphRkREdElnM2NqdkRmazRXYTIyTjQzTGV0RmdqMmY1OWJtMjVpenJIMVRzUFN4dkt2N2lZcWcxVUJEQllnblBMNVRUdSJ9)
-   [Spring Tool Suite 3.9.6 released](https://spring.io/blog/2018/09/20/spring-tool-suite-3-9-6-released)
-   [Spring Web Services 3.0.4 / 2.4.3 released!](https://spring.io/blog/2018/09/19/spring-web-services-3-0-4-2-4-3-released)
-   [Announcing Spring Cloud Function - 2.0.0.M2](https://spring.io/blog/2018/09/19/announcing-spring-cloud-function-2-0-0-m2)
-   Spring creator Rod Johnson's got a nice post on how [Atomist helps liberate modern Spring developers from the scourge of too much `.YAML`](https://the-composition.com/modern-delivery-for-modern-java-give-yaml-the-boot-9fdcc4d83123)
-   IBM have some very interesting new posts on building [Spring applications that are destined for IBM Cloud](https://console.bluemix.net/docs/java-spring/index.html#getting-started-tutorial) and [using Spring with IBM Cloud and IBM software](https://developer.ibm.com/components/spring/)
-   I love the new Spring Tool Suite release so much I put together a quick primer that shows how to develop Java-based Spring Boot-based applications that get deployed to production in the cloud on Cloud Foundry, all from [within the fantastically streamlined and productive Spring Tool Suite 4](https://www.youtube.com/watch?v=0ryrlJfSgfc)
-   I love that buildpacks have been finally extracted out into a separate thing that's now standard across platforms. [Read on to learn more!](https://buildpacks.io/)
-   Vlad Mihalcea has a nice post on \[the Spring read-only transaction optimization

in Hibernate\]([https://vladmihalcea.com/spring-read-only-transaction-hibernate-optimization/](https://vladmihalcea.com/spring-read-only-transaction-hibernate-optimization/))

-   Just in time for SpringOne Platform, [check out riff v0.1.3](https://projectriff.io/blog/announcing-riff-0-1-3/). Riff is the function-as-a-service sensation that's sweeping the nation!
-   My buddy Matt Raible and I have been burning the midnight oil [to get this *massive* blog series](https://developer.okta.com/blog/2018/09/25/spring-webflux-websockets-react) - three parts spanning 70+ printed pages in all! - out in time for the epic SpringOne Platform event. It is *so* worth a read.
-   Java 11 is here! The best part about is how mundane it all is. If you're using the excellent [SDKMAN](http://twitter.com/sdkman_), then all you need to do is say: `sdk install java 11.ea.28-open` and then head on over to the [Spring Initializr](http://start.spring.io/) and build a new project using Java 11. It'll just work. InfoQ have a nice [post with some details here](https://www.infoq.com/news/2018/09/java11-released)
-   I love this post by Mario's own [Mario Gray](http://twitter.com/MarioGray) on testing reactive [cloud Spring-based applications](https://www.sudoinit5.com/post/spring-boot-testing-producer/)
-   The SpringUni blog have [a nice post on using Spring Cloud GCP with Google Cloud](https://springuni.com/bootiful-gcp-spring-cloud-stream-with-google-cloud-pub-sub/) that expands upon a post in my recent 8-part miniseries. It's worth a read!
-   [Reactor Californium-RELEASE has shipped this week ??](https://twitter.com/springcentral/status/1043189646677536768)
-   [RabbitMQ 3.7.8 is out!](https://groups.google.com/forum/#!topic/rabbitmq-users/LMnYh5RXD0w)
-   As if this week weren't epic enough, there's a new [release of the Redis Lettuce driver](https://groups.google.com/forum/#!topic/lettuce-redis-client-users/v5Q2qQntzzU)
-   In light of the new Java 11 release, it feels appropriate to look [at the long and fascinating history of Java thus far.](https://www.youtube.com/watch?v=eX7VnkcXMdM)
-   This is a nice article that looks at [using MongoDB's tailable queries to support](http://claudioed.tech/2018/03/07/continuous-query-with-spring-data-reactive-mongodb/) continuous queries, a feature you might be familiar with if you've ever used a distributed data grid like Coherence or Apache Geode
-   You know that you can stream the mainstage action at SpringOne Platform 2018, don't ya? Cuz.. [you can](http://springoneplatform.io/)
-   You surely know by now that you can fork the Spring Initializr - here's an example of what at least one group has [done with their fork](https://gitter.im/spring-io/initializr?at=5ba23b08f4bd1056ac866fb2)
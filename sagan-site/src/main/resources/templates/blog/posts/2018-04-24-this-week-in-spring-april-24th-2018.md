---
title: This Week in Spring - April 24th, 2018
source: https://spring.io/blog/2018/04/24/this-week-in-spring-april-24th-2018
scraped: 2026-02-23T15:26:41.077Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 24, 2018 | 3 Comments
---

# This Week in Spring - April 24th, 2018

_Engineering | Josh Long |  April 24, 2018 | 3 Comments_

Hi Spring fans! Welcome to another incredible installment of all that's fit to tweet, blog, record and print about Spring! It's been an *insane* week! Since our last installment I was in Paris, FR, for the epic Devoxx FR conference where I [spoke at a meetup hosted by ZenikaIT](https://twitter.com/starbuxman/status/986940126633832448), gave a workshop on Reactive Cloud Native Java and co-presented a talk on Reactive Spring with the one-and-only [Juergen Hoeller](http://twitter.com/SpringJuergen). I jumped off stage and ran to the airport to board a flight leaving 150 minutes later headed back to the US!

Now, you *may* have heard that Pivotal, the company that leads and/or at least actively invests in a good many open-source projects - including Spring, Cloud Foundry, Apache Tomcat, Reactor, JUnit, Kubernetes, Redis, Micrometer and so many others besides - listed on the New York Stock Exchange on the 20th of April, 2018: we're a public company now!

So: I know I speak for the Spring team and Pivotal at large when I say that Pivotal's success is your success and that this wouldn't, *couldn't*, have been possible without you, dear community; **THANK YOU**!

It is a dream come true to work on open-source software that helps people build amazing things with such an amazing, curious, compassionate and passionate community. It's a big part of the reason I am happier every day than I was the day before; there's *always* something amazing happening!

Now, I wish all of you could've been there! Don't feel left out though; you can watch the ringing of the [bell on the floor of the NYSE here](https://livestream.com/NYSE/pivotalopeningbell/videos/173605546).

There were some amazing tweets on the matter, too.

The bell-ringing at the NYSE was concurrent with the opening of the CFSummit happening in nearby Boston, MA, which live-streamed the IPO.

The "Squawk on the Street" show filming on the floor of the New York Stock Exchange and I just *happened* to be wearing my favorite "Spring" t-shirt so I walked over to see what's what and say hi! :D

We published an [official thing about the IPO, as well](https://content.pivotal.io/announcements/pivotal-software-lists-on-nyse-as-pvtl). You might like that, too.

The IPO was last Friday, but by the weekend I was on a plane headed *back* to Europe. This week I'm in Mainz, Germany for the JAX conference where I'll be presenting, again, on "Reactive Spring" with Spring Framework lead and co-founder Juergen Hoeller, and on testing with Spring. Then, it's off to the [DevOne conference](https://devone.at) in Linz, Austria where Juergen and I will *again* present! (How lucky am I??) I'll also be doing a [longer workshop-like talk on the 27th of April in Vienna, Austria](https://www.meetup.com/de-DE/Enterprise-Java-User-Group-Austria/events/249259945/). Then, finally, it's off to Melbourne, Australia, for [Voxxed Melbourne](https://voxxeddays.com/melbourne/) where, next week, I'll be co-presenting [with Spring framework founder and Atomist CEO Rod Johnson](https://voxxeddays.com/melbourne/speakers/). Do *not* miss this!

All that *wonderful* business aside, we have a *lot* to cover, so let's get to it!

-   If you use a separate repository to store Spring Cloud Contract definitions, by adding a small test, you can sketch the graph of dependencies between your projects! [See this issue for more](https://github.com/spring-cloud/spring-cloud-contract/issues/615)
-   This post looks at how to autoscale Cloud Foundry applications [by investigating RabbitMQ queue depth](https://content.pivotal.io/rabbitmq/new-autoscaler-rules). This is awesome; it's one less thing that needs to be in [the book *Cloud Native Java*](http://www.cloudnativejava.io/) where we demonstrated how to do this exact thing using a Spring Cloud Data Flow [RabbitMQ metrics source](https://github.com/cloud-native-java/operations/tree/master/remediation/rabbitmq-metrics-source) and a [Cloud Foundry autoscaler sink](https://github.com/cloud-native-java/operations/tree/master/remediation/cloudfoundry-autoscaler-sink)
-   Use [CF Local](https://pivotal.io/cf-local) to get a local Cloud Foundry-like development experience
-   Spring IO lead and Spring Boot legend Andy Wilkinson [has announced the Gradle dependency management plugin, 1.0.5.RELEASE](https://spring.io/blog/2018/04/23/dependency-management-plugin-1-0-5-release), that is now available from Maven Central, Bintray, and the Gradle Plugin Portal. This maintenance release fixes a handful of issues. It was included in the recent Spring Boot 1.5.12 and 2.0.1 releases and is also a recommended upgrade for all other users of the plugin.
-   The good Dr. Mark Pollack [has just announced Spring Cloud Data Flow 1.5.M1](https://spring.io/blog/2018/04/20/spring-cloud-data-flow-1-5-m1-released). The new release is *hot-sauce*! It includes Spring Boot & Spring Cloud Stream 2.0 Support; nested splits for Composed Tasks, metrics Collector 2.0 M1; the stream application starters Darwin M1 release train has been included; and it has support for deploying to multiple Kubernetes clusters.
-   There's an [upcoming webinar on Spring Session](https://content.pivotal.io/webinars/apr-25-session-state-caching-with-spring-webinar), tomorrow, April 25! Do *not* miss this!
-   Spring Cloud Stream Kafka Streams maestro Soby Chacko looks at the new support in this [must-read blog post](https://spring.io/blog/2018/04/19/kafka-streams-and-spring-cloud-stream).
-   Spring Data legend Christoph Strobl looks at the [new MongoDB support for client-sessions and transactions](https://spring.io/blog/2018/04/18/new-in-spring-data-lovelace-m2-get-ready-for-mongodb-3-6-and-4-0) and its impact in Spring Data MongoDB.
-   Hi Spring fans! In this latest installment of *Spring Tips* we look at the many ways to [use Redis, the distributed data-structure server, with Spring and Spring Data](https://spring.io/blog/2018/04/18/spring-tips-redis).
-   [Spring Tool Suite 3.9.4](http://docs.spring.io/sts/nan/v394/NewAndNoteworthy.html) updates to Oxygen.3.a, Java 10 and Pivotal tcServer 4.0.0.
-   Spring Integration expert extraordinaire Artem Bilan [announced Spring Integration for AWS 2.0.0.M2 and Spring Cloud Stream Kinesis Binder 1.0.0.M2](https://spring.io/blog/2018/04/17/spring-integration-for-aws-2-0-0-m2-and-spring-cloud-stream-kinesis-binder-1-0-0-m2)
-   InfoQ's Daniel Bryant has a nice post on the [new Spring Cloud Stream release](https://www.infoq.com/news/2018/04/spring-cloud-stream-2.0)
-   Piotr Minkowski has a nice post that looks at how to [deploy Spring Cloud Microservices on Hashicorp's Nomad container scheduler](https://piotrminkowski.wordpress.com/2018/04/17/deploying-spring-cloud-microservices-on-hashicorps-nomad/)
-   Spring community legend Aboullaite Mohammed [explores the "magic" behind Spring Boot's auto-configuration](https://aboullaite.me/the-magic-behind-the-magic-spring-boot-autoconfiguration/amp/?__twitter_impression=true)
-   I joined the [*Pure Performance*](https://www.spreaker.com/user/pureperformance/060-reactive-spring-microservices-server?autoplay=1) podcast, episode 60, by Dynatrace. In this discussion we talk about all things cloud-native and Java and monitoring. Enjoy!
-   Jonas Hecht has a nice [post on using Spring Boot and Vue.js together](https://twitter.com/jonashackt/status/988641061244416000?s=12)
-   \[The RabbitMQ Summit Call For Proposals\]\]([https://rabbitmqsummit.com/](https://rabbitmqsummit.com/)) is now open, closing June 1
-   This is an oldie-but-a-goodie: how to address eventual consistency for microservices [using Spring AMQP and RabbitMQ](https://programmaticponderings.com/2017/05/15/eventual-consistency-decoupling-microservices-with-spring-amqp-and-rabbitmq/)
-   Hat tip to Spring and Kotlin artiste Sebastien Deleuze for surfacing these two projects by [Jordan Demeulenaere](https://github.com/jdemeulenaere): [Komponent](https://github.com/jdemeulenaere/komponent) for creating WebComponents, and [Klient](https://github.com/jdemeulenaere/klient) for generating multiplatform Kotlin HTTP clients from Spring MVC controllers
-   [JUnit 5.2 is almost here](https://junit.org/junit5/docs/5.2.0-RC1/release-notes/). Junit 5.2 RC1 was released today and contains only documentation changes compared to 5.2 M1. 5.2 GA is scheduled for next Sunday, April 29.
-   Matt Raible's epic talk, [*Bootiful Development with Spring Boot and React*](https://www.infoq.com/presentations/java8-boot-react-web-dev), is now available online!
-   The Baeldung blog has a nice post on [the `@Lookup`\-annotation](http://www.baeldung.com/spring-lookup) and the dependency *lookup* mechanism in Spring Framework.
-   Techcrunch has a nice post detailing some of the [ways Cloud Foundry and Kubernetes have grown closer](https://techcrunch.com/2018/04/20/kubernetes-and-cloud-foundry-grow-closer/amp/?__twitter_impression=true). The post looks at some of the things to come out of CF Summit last week.
-   Our very own Toshiaki Maki has a quick-n-dirty example on Github of using the just open-source FoundationDB with [Spring WebFlux](https://twitter.com/making/status/987939767042981890?s=12).
-   I *loved* the slides to Tomasz Nurkiewicz's talk [on reactive programming (in this case, with Spring WebFlux)](http://nurkiewicz.github.io/talks/2018/reactive-lessons/#/)
-   Hussein Terek has a nice post on [using Spring Boot, Oracle, JPA (via Hibernate) together in this post](https://dzone.com/articles/spring-boot-jpa-hibernate-oracle)
-   Yitao Dong, program manager for Java on Microsoft's Azure cloud platform, [introduces Spring Data Azure Cosmos DB](https://twitter.com/springcentral/status/987386080646201344) which supports the Microsoft Azure multi-model NoSQL data store, Cosmos DB.
-   I really liked the slides [from Simon Basle's talk introducing Reactor](https://t.co/GPYUccMcq4?amp=1)
-   Spring Cloud co-founder Spencer Gibb [teases](https://twitter.com/springcloud/status/987056116558331905) some of the fascinating possibilities for the Spring Cloud Consul integration now that Consul supports *real* service metadata. What do you think?
-   As Dormain says [in the tweet](https://twitter.com/dormaindrewitz/status/986697941787336704?s=12): "2018 is the year of the CloudFoundry in government. [Cloud.gov](http://cloud.gov) is now a certified platform! More to come :D" 'Nuff said!
-   This is an oldie-but-a-goodie; it's an explainer on [the "Poutsma principle,"](http://essentials.xebia.com/poutsma-principle/) named for Spring legend Arjen Poutsma (if you've ever used Spring, Spring MVC, Spring WebFlux, Spring WS, Spring Faces, the `RestTemplate` and a zillion other things, you've used his code!).
-   The Register ("El Reg") have a nice [article](http://www.theregister.co.uk/2018/04/18/could_open_source_serverless/) that looks at [Project Riff](http://projectRiff.io), the open-source function-as-a-service platform from Pivotal that builds atop Kubernetes.
-   Spring Cloud Finchley, [the reactive release train for Spring Cloud, is coming!](https://twitter.com/springcloud/status/986740486709956608)
-   Spring Data mad-scientist Thomas Darimont has a really compelling [Spring Boot 2.0 and Keycloak-based OAuth example](https://t.co/zkC7LcuvXR?amp=1) on his Github account.
-   I love tweets like this one which [explains that RabbitMQ still powers Wunderlist - cool](https://twitter.com/myobie/status/985996621761662976)!
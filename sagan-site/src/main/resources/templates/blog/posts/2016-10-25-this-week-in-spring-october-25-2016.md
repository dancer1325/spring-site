---
title: This Week in Spring - October 25, 2016
source: https://spring.io/blog/2016/10/25/this-week-in-spring-october-25-2016
scraped: 2026-02-23T19:00:21.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 25, 2016 | 1 Comment
---

# This Week in Spring - October 25, 2016

_Engineering | Josh Long |  October 25, 2016 | 1 Comment_

Welcome to another installment of *This Week in Spring*! This week I'll be in Des Moines, Iowa for [the Prairie.Code conference](http://prairiecode.amegala.com/sessions/cloud-native-java). If you're nearby, stop by and say hi!

As usual, we've got a lot to cover so let's get to it.

-   Spring Cloud ninja Marcin Grzejszczak just announced Spring Cloud Camden SR1. [The Spring Cloud release train is such a thing of beauty](https://spring.io/blog/2016/10/24/spring-cloud-camden-sr1-is-available) - just seeing it makes me want to build something cool! It includes Spring Cloud AWS, Bus, Commons, Contract, Config, Netflix, Security, Sleuth, Stream, Task, and Zookeeper.
-   Spring Cloud Data Flow co-founder [Dr. Mark Pollack just announced Spring Cloud Data Flow 1.1.M2](https://spring.io/blog/2016/10/18/spring-cloud-data-flow-1-1-m2-released).
-   Want help automating the pipeline that sees your application move from a `git push` to a successfully deployed application in production? Check out the new project, [Spring Cloud Pipelines](https://spring.io/blog/2016/10/18/spring-cloud-pipelines), which is a set of `shell` scripts that can be plugged in portably across Pivotal Concourse or Jenkins. Remember: microservices are only useful insofar as they help you get to continuous delivery. In continuous delivery you need an automated pipeline and the ability to automatically deploy (naturally, for this we have Pivotal Cloud Foundry)!
-   Allard Buijze from Trifork and I will be presenting a [webinar on Nov 16th, 2016](https://spring.io/blog/2016/10/25/webinar-bootiful-cqrs-with-axon-nov-16) about Spring Boot and the Axon Framework. If you're curious about event driven microservices, this session should give you plenty to think about.
-   Last week I continued my series of hot-take introductions to various aspect of the Spring ecosystem with the *Spring Tips* series and looked at how [to use Spring with crazy cool Kotlin programming language](https://spring.io/blog/2016/10/19/spring-tips-the-kotlin-programming-language)
-   Spring Data and Apache Geode ninja John Blum has released [Spring Data Geode 1.0.0.APACHE-GEODE-INCUBATING-M3](https://spring.io/blog/2016/10/11/spring-data-geode-1-0-0-apache-geode-incubating-m3-released), which - besides helping migrate from Gemfire to the Geode codebase - also features great Java configuration support for consuming Apache Geode. This stuff is white-hot and I'm embarrassed I neglected to include it before!
-   [Spring Cloud Camden](http://spring.io/projects/spring-cloud) is packed with great features, one of which is support for defining and consuming service contracts. While this post, in particular, has nothing to do with Spring I think it's a nice background for people who want to learn about [the motivations behind Consumer Driven Contracts and Consumer Driven Contract Testing](http://martinfowler.com/articles/consumerDrivenContracts.html)
-   Speaking of Kotlin, want to learn how [some Pivotal Labs engineering folks use Kotlin with (and without!) Spring](http://engineering.pivotal.io/categories/kotlin/)?
-   I though this example application, that demonstrates [how to build applications in terms of eventing and Spring Cloud, was worth a look](http://idugalic.github.io/micro-company/)
-   Barb Darrow did an ice job in this Fortune magazine article [articulating why Google Compute Engine is an amazing place to run Pivotal Cloud Foundry](http://fortune.com/2016/10/19/google-pivotal-cloud/)
-   the fine folks over at Lightbend just announced support for [using Akka, a powerful actor-system, on Pivotal Cloud Foundry](https://www.lightbend.com/blog/hakktivism-akka-cluster-now-works-on-pivotal-cloud-foundry). Congrats to the teams!
---
title: This Week in Spring - October 3rd, 2017 - Spring Framework 5.0 Edition!
source: https://spring.io/blog/2017/10/03/this-week-in-spring-october-3rd-2017-spring-framework-5-0-edition
scraped: 2026-02-23T16:20:00.747Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 03, 2017 | 0 Comments
---

# This Week in Spring - October 3rd, 2017 - Spring Framework 5.0 Edition!

_Engineering | Josh Long |  October 03, 2017 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This last week's been *nuts*! So much good stuff on offer. Spring Framework 5.0 is now available! And with Spring Framework 5.0 comes a deluge of releases, all of which you'll see in this post. Also, this week I - and others from the Pivotal and Spring teams - are at JavaOne and I hope [you'll come find us and say hi at our booth or the various talks](https://spring.io/blog/2017/09/28/pivotal-and-spring-team-at-javaone-2017).

-   Last week I looked at using Spring Framework 5's support for [building reactive websocket-based applications](https://spring.io/blog/2017/09/27/spring-tips-reactive-websockets-with-spring-framework-5).
-   Spring AMQP and Spring Integration lead Gary Russell [has just announced Spring AMQP 2.0.RC2](https://spring.io/blog/2017/09/27/spring-amqp-2-0-release-candidate-2-available).
-   At long last, Spring Framework 5.0.GA is here! The new release integrates with Project Reactor, includes a reactive web runtime, Kotlin extensions, and baselines on Java EE 7 and Java 8. The new release has entirely too many new things to hope to capture here so check out the [release blog](https://spring.io/blog/2017/09/28/spring-framework-5-0-goes-ga) and then [check out the *What's New* post](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-the-Spring-Framework#whats-new-in-spring-framework-5x)
-   Spring and Reactor ninja Simon Baslé just [announced the Reactor Bismuth release](https://spring.io/blog/2017/09/28/reactor-bismuth-is-out). This new release sets the foundation for Spring Framework 5.0 and is, itself, also packed with features!
-   The Spring Framework 5.0 release opens the doors for a number of other [projects, including Spring Data Kay](https://spring.io/blog/2017/10/02/spring-data-release-train-kay-goes-ga). This is the largest revision of Spring Data since Spring Data's inception in 2009! This new release has a baseline against Spring Framework 5.0, Java 8 and Java EE 7. It includes a revised repository APIs (complete support for `Optional<T>`), support for reactive data access (Cassandra, Couchbase, MongoDB and Redis), the addition of Spring Data Geode to the release train, use of nullability annotations and advanced runtime checks on those, Kotlin support for null-safety and immutable data classes supported through Kotlin constructors, Java 9 compatibility, and sooo much more!
-   Spring messaging and integration ninja Artem Bilan [just announced Spring for Apache Kafka 2.0.GA](https://spring.io/blog/2017/10/02/spring-for-apache-kafka-2-0-ga-available). The new release includes Apache Kafka support, transaction support, headers mapping, Apache Kafka Streams support, a new `KafkaAdmin`, error handling and group support in the `@KafkaListener` and `Consumer` resolution. It also supports `@EmbeddedKafka` for testing.
-   Spring Cloud ninja Ryan Baxter just announced [Spring Cloud Dalston SR4](https://spring.io/blog/2017/10/03/spring-cloud-dalston-sr4-is-now-available). The new release updates Spring Cloud Contract, Spring Cloud Config, Spring Cloud Commons, Spring Cloud Netflix, and Spring Cloud Sleuth.
-   Spring REST Docs lead Andy Wilkinson [just announced Spring REST Docs 1.2.2.RELEASE](https://spring.io/blog/2017/09/28/spring-rest-docs-1-2-2-release). This maintenance release includes a handful of bug fixes and documentation improvements and so is a recommended upgrade
-   Check out the implementation of [Spring Framework 5's new autowire-by-constructor wiring](https://github.com/spring-projects/spring-framework/commit/23497a7ece7aac1591187b46f4b601d2f48764e0)
-   I liked this German-language [interview with Andreas Falk on new features in Spring Framework 5.0 and Spring Security 5.0](https://jaxenter.de/spring-security-interview-falk-62685).
-   This post, by Zoltan Altfatter, looks at how to [launch a Spring Batch `Job`](http://blog.mimacom.com/blog/2017/09/29/trigger-a-spring-batch-job-with-a-jms-message/) as the result of an incoming JMS message in a Spring Integration flow.
-   Rohit Kelapure‏ looks at why Pivotal's Cloud Foundry [is the best place to run Spring Boot applications](https://twitter.com/rkela/status/914924780373073920) in this epic Twitter thread.
-   In this post, Cristina Negrean looks at [using Spring Cloud Data Flow for real-time analytics](https://cristinanegrean.github.io/2017/10/01/spring-cloud-dataflow-for-real-time-analytics-with-twitter-api).
-   Gabriela Motroc put together a nice post [for JAXEnter on the new Spring Framework 5 release](https://jaxenter.com/spring-framework-5-0-137677.html). There's so much to like.
-   Aboullaite Mohammed put together a very good post [on monitoring metrics using Elasticsearch and Kibana and Spring Boot](https://aboullaite.me/spring-boot-elastic-kibana/)
-   The Ordina JWorks blog has a nice post on [securing microservices with Spring Cloud](https://ordina-jworks.github.io/microservices/2017/09/26/Secure-your-architecture-part1.html)
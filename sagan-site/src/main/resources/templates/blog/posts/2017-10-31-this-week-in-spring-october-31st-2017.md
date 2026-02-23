---
title: This Week in Spring - October 31st, 2017
source: https://spring.io/blog/2017/10/31/this-week-in-spring-october-31st-2017
scraped: 2026-02-23T16:16:54.912Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 31, 2017 | 0 Comments
---

# This Week in Spring - October 31st, 2017

_Engineering | Josh Long |  October 31, 2017 | 0 Comments_

Hi Spring fans and welcome to another installment of *This Week in Spring*! This week I'm in San Francisco for the [first, and sure-to-be-amazing, Kotlin Conf](https://www.kotlinconf.com/) 2017. I'll be talking about Spring Boot and Kotlin, and I hope you'll [join me](http://twitter.com/starbuxman) if you're around.

We've got a lot to cover this week so let's get to it!

-   Spring Batch lead Michael Minella [just announced Spring Batch 4.0.0.M5](https://spring.io/blog/2017/10/24/spring-batch-4-0-0-m5-is-now-available) which includes, among other things, an `ItemProcessor` implementation that supports Java 8 `Function` implementations, updated documentation and much more.
-   Spring Framework lead Juergen Hoeller [announced Spring Framework 5.0.1](https://spring.io/blog/2017/10/24/spring-framework-5-0-1-available-now) which includes a few bug fixes which in turn pick up fixes in Reactor Netty and welcome performance improvements in AspectJ 1.8.12.
-   Last week, in another installment of *Spring Tips*, [I looked at HTTP based contracts with Spring Cloud Contract](https://spring.io/blog/2017/10/25/spring-tips-spring-cloud-contract-http).
-   Spring Cloud co-founder Spencer Gibb announced the first release candidate to Spring Cloud Edgware. There are some changes to not in the artifact names for various starters. Spring Cloud Edgware [has a *lot* of new features](https://spring.io/blog/2017/10/25/spring-cloud-edgware-rc1-released) so be sure to investigate the release notes.
-   Do you ever wonder what the difference between Apache Geode and Pivotal Gemfire is? [Let Spring Data Geode/Gemfire lead John Blum illuminate the differences in this post](https://spring.io/blog/2017/10/26/diff-q-spring-data-gemfire-spring-data-geode). TL;DR: not much!
-   Project Reactor lead [Stephane Maldini just announced Reactor Bismuth SR3](https://spring.io/blog/2017/10/27/reactor-bismuth-sr3-is-now-available) which is packed with bug-fixes and improvements. Reactor Bismuth SR3 is available in Spring Framework 5.0.1.
-   Spring REST Docs lead Andy Wilkinson [just announced Spring REST Docs 2.0.0.RC1](https://spring.io/blog/2017/10/30/spring-rest-docs-2-0-0-rc1). The new release requires Spring Framework 5.0 and Java 8. The main highlight of the 2.0 release is support for using Spring WebFlux's `WebTestClient` to document an API.
-   Spring Web Services lead Greg Turnquist [just announced Spring Web Services 3.0.0.RELEASE](https://spring.io/blog/2017/10/30/spring-web-services-3-0-0-release-2-4-2-release-is-out). The new release has a number of new features including better handling of large attachments, SAML callbacks, upgrades to the latest version of AspectJ, support the up-and-coming Axiom 1.3, and much more. Of note, and thanks, is that 75% of the 3.0 release was contributed by the community!
-   Dr. Mark Pollack just [announced Spring Cloud Skipper 1.0 M1](https://spring.io/blog/2017/10/30/spring-cloud-skipper-1-0-m1-released). From the article: "Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment."
-   I love the [new Spring Framework documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/index.html) starting in Spring Framework 5.0.1. The new landing page is gorgeous and just click on any of the sections and you'll see how the outline really cleans up nicely.
-   Spring Integration ninja Artem Bilan explores the testy subject of integration [testing Spring Cloud Stream applications in this recommended new post](https://spring.io/blog/2017/10/24/how-to-test-spring-cloud-stream-applications-part-i).
-   Speaking of consumer driven contract testing, Spring Cloud Contract lead Marcin Grzejszczak takes [a more interesting perspective in this talk from earlier this year](https://www.youtube.com/watch?list=PLxZQe6I1pYpfbUI587PZ7CY0l3oKPg9hH&v=UwwaWodTj1k)
-   Oleh Dokuka [looks at the Reactive Streams specification's `Publisher` type](https://medium.com/@olehdokuka/mastering-own-reactive-streams-implementation-part-1-publisher-e8eaf928a78c) in terms of Pivotal's Reactor implementation. As Lightbend's [Konrad Malawski says](https://twitter.com/ktosopl/status/924958966269935617): "Probably the only post about #reactivestreams implementations and #flow #jdk9 out there that explains using the tck/rules well :)"
-   Can you believe it's already been more than a year since the last SpringOne Platform event? We're only a month away from the big one in San Francisco for 2018! (Do you have your tickets, yet?) [There are going to be a lot of great Apache Geode talks, among many other things, at SpringOne Platform](https://twitter.com/apachegeode/status/923279646757548033) and we hope you'll join us.
-   Spring founder and Atomist CEO Rod Johnson and I wrote a post that looks at how to automate the gestation [of a reactive, Kotlin-based Spring Boot 2.0 application with the Atomist automation service](https://the-composition.com/turn-any-repo-into-a-software-factory-exploring-spring-5-and-kotlin-2f58283421a2) - check it out!
-   Reactor ninja Simon Basle put together a short-and-sweet look at how to read a file [with Project Reactor](https://simonbasle.github.io/2017/10/file-reading-in-reactor/) and the `java.nio.*` support.
-   I loved this post by Simon Wirtz that looks at some of [the interesting integrations for Spring Framework 5 and Kotlin](https://tech.io/playgrounds/8594/spring-5---dedicated-kotlin-features).
-   Raja Sundaram Ganesan put together a very nice post on [developing reactive microservices using Spring Boot 2.0 and Kotlin](http://bytesville.com/developing-reactive-microservice-using-springboot-2/).
-   Are you [using Microsoft Azure? You'll be delighted to know](https://twitter.com/snicoll/status/922748372620120064) there are now dedicated starters and auto-configurations for Spring Boot [on the Spring Initializr](http://start.spring.io). Take a look at the [code while you're at it!](https://github.com/Microsoft/azure-spring-boot).
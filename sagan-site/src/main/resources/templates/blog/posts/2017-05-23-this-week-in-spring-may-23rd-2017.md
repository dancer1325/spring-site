---
title: This Week in Spring - May 23rd, 2017
source: https://spring.io/blog/2017/05/23/this-week-in-spring-may-23rd-2017
scraped: 2026-02-23T16:31:18.844Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 23, 2017 | 2 Comments
---

# This Week in Spring - May 23rd, 2017

_Engineering | Josh Long |  May 23, 2017 | 2 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm in Amsterdam, NL and Essen, DE, talking to customers about cloud-native transformation. We've got a lot to cover so let's get to it.

-   [Spring Tool Suite lead Martin Lippert](https://spring.io/blog/2017/05/18/new-beta-versions-of-concourse-pipeline-and-cloud-foundry-manifest-editing-support-released-for-visual-studio-code) just announced a preview of Concourse Pipeline and Cloud Foundry manifest editing support releases as *a language server*. These language servers can be used by any IDE or text editor that supports them, including in this case Microsoft's Visual Studio Code and later STS itself.
-   Spring Cloud Stream ninja Soby Chako [just announced Spring Cloud Stream.SR2](https://spring.io/blog/2017/05/17/spring-cloud-stream-chelsea-sr2-released)
-   Simon Baslé just announced [the Reactor Bismuth release train M1](https://spring.io/blog/2017/05/16/reactor-bismuth-release-train-first-milestone-available)
-   Stéphane Nicoll just announced [Spring Boot 2.0M1](https://spring.io/blog/2017/05/16/spring-boot-2-0-0-m1-available-now)! It's finally here! Get the bits of the first major release towards a reactive Spring Boot 2.0. There's so much good stuff, including an updated Gradle plugin, relaxed binding improvements, major dependency upgrades and so much more!
-   I think this [article by Paweł Chudzik on *poor man's batch*](https://blog.pchudzik.com/201705/batch-processing/) solutions - iterating over large datasets - was very interesting. The conclusion is obvious: if you want to scroll through a large amount of records then use a `java.util.Stream<T>` finder query in your Spring Data repository. That's *one* obvious conclusion. May I also humbly recommend that you look at [Spring Batch](https://spring.io/blog/2017/02/01/spring-tips-spring-batch) and have a rich man's batch at poor man's prices? :)
-   Want easier handling form encoded JSON in Spring MVC? Vote for [this issue](https://jira.spring.io/browse/SPR-13433)!
-   I liked this walk through on how to [implement a forgot password flow with Spring Boot](https://www.codebyamir.com/blog/forgot-password-feature-with-java-and-spring-boot) on the *Code by Amir* blog by Amir Boroumand.
-   Amir Boroumand *also* has a nice walkthrough [on creating a REST API with Spring Boot](https://www.codebyamir.com/blog/create-rest-api-with-spring-boot)
-   Our friends at JDriven are doing what appears to be an awesome (though I think Dutch-language) on [MQTT and Spring Cloud Stream and Spring Cloud Data Flow](https://www.jdriven.com/event/workshop/mqtt/)
-   I liked this fairly approachable look at how to [deploy Hashicorp Vault to Cloud Foundry](https://github.com/making/cf-vault) by our very own Toshiaki Maki.
-   Want a bit of insight into what the future of Serverless looks for Spring? Check out the slides to the good Dr. Dave Syer's presentation [on Spring Cloud Function](http://presos.dsyer.com/decks/road-to-serverless.html) at Spring IO
-   WeaveWorks' Scope is now available and [supports Cloud Foundry](https://www.weave.works/blog/scope-illuminates-cloud-foundry/)
-   I liked this rant from Steve Yegge on \[why Kotlin is a nice language\]([http://steve-yegge.blogspot.com/2017/05/why-kotlin-is-better-than-whatever-dumb.html](http://steve-yegge.blogspot.com/2017/05/why-kotlin-is-better-than-whatever-dumb.html)

). Interesting reading!
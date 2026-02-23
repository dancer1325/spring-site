---
title: This Week in Spring - July 18th, 2017
source: https://spring.io/blog/2017/07/18/this-week-in-spring-july-18th-2017
scraped: 2026-02-23T16:27:15.727Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 18, 2017 | 0 Comments
---

# This Week in Spring - July 18th, 2017

_Engineering | Josh Long |  July 18, 2017 | 0 Comments_

Hi Spring fans! This week I'm in Crete, Greece, for the epic JCrete un-conference and then it's off to Istanbul, Turkey for next week's visits with customers and for the Spring meetup. [I hope you'll join me in Istanbul](https://www.meetup.com/Istanbul-Spring-Meetup/)!

As usual, we've got a lot to cover so let's get to it!

-   Spring Integration ninja Artem Bilan just announced [the Spring Integration Extension for Hazlecast 1.0.0.GA](https://spring.io/blog/2017/07/17/spring-integration-extension-for-hazelcast-1-0-0-ga-available). This new release features mainly bug fixes and improvements. It also adds support distributed, clustered applications with implementations of `HazelcastMessageStore`, `HazelcastLockRegistry`, and `HazelcastMetadataStore`.
-   Spring Security ninja Joe Grandja [just announced Spring Security OAuth 2.2.0.RC1](https://spring.io/blog/2017/07/14/spring-security-oauth-2-2-0-rc1-released). This new release includes improvements to the way JWT tokens and claim sets are handled. Do not miss the update!
-   Want to [profile Java applications on Cloud Foundry](https://github.com/cloudfoundry/java-buildpack/blob/master/docs/framework-your_kit_profiler.md)? This useful tip from Ben Hale, lead of the Java experience on Cloud Foundry, should get you started!
-   This tip from Pivotal's own Luke Shannon on how to fix a broken 'Organize Imports' command [in Spring Tool Suite](https://t.co/DQaEFcFMbf?ssr=true) when upgrading could be useful to some of you!
-   I liked this French-language [look at some of the new features coming in Spring Framework 5](http://blog.xebia.fr/2017/07/17/spring-framework-5-tour-dhorizon-des-nouveautes/).
-   I loved this project, [called Trampoline](https://github.com/ErnestOrt/Trampoline), which helps start and stop Spring Boot-based services. This looks super convenient during development!
-   The work on the open-service broker API is moving forward at full-speed. Recently, work on creating [on-demand service brokers](https://content.pivotal.io/pivotal-blog/building-cloud-foundry-on-demand-services-just-got-a-lot-easier) just got a lot easier and this post does a great job explaining how.
-   Java 9 is just around the corner and there's a lot to recommend it beyond the modularity support. I liked this look on the Oracle blog [on Java 9 Collections updates](https://blogs.oracle.com/java//collections-refueled).
-   Want to get a feel for some of the [new tooling in JDK 9](https://blogs.oracle.com/java/jdk-9-language-tooling-libraries)? Check out this nice post on the Oracle blog.
-   Atomist's [Jessica Karr](http://twitter.com/jessitron) looks at what it takes to move an application [using HTTPS from AWS to Pivotal Web Services](http://blog.jessitron.com/2017/07/routing-custom-domain-to-pivotal-web.html) (or PWS, a multitenant, hosted installation of Pivotal Cloud Foundry run by Pivotal). The blog looks at some things to be aware of. There is an extra bit of information in the comment, by Pivotal's own Glen Oppegard, that's worth checking out as well.
-   Pivotal's own Richard Seroter [looks at some of the ways to support event-driven messaging-based applications on Pivotal Cloud Foundry](https://content.pivotal.io/blog/how-to-deliver-an-event-driven-architecture). He looks at, among other things, Spring Cloud Data Flow, the types of eventing a typical application comprises, and auto-scaling nodes in PCF.
-   This [post looks at building a basic Spring web application](https://rskupnik.github.io/basic-spring-webapp-java-kotlin-scala) in Java, Kotlin and Scala
-   This is a [nice comparison](https://github.com/pdavidson/inner-app-eventing) of inter-app eventing options. Three of the choices come from Spring and Pivotal! This is a very cool post, but I'd urge you to keep in mind that they're looking at a more than two-years old revision of Reactor that looks very different in the light of the Reactive Streams implementation today.
-   Using ElasticSearch via, for example, Spring Data ElasticSearch? You might like this post on [how to integration-test with ElasticSearch](https://blog.jetoile.fr/2017/07/tester-avec-elasticsearch.html) -
-   Ben Wilcock revisits an older application written in 2015 that used the [Axon CQRS framework to build a logical microservices application](https://benwilcock.wordpress.com/2017/07/11/cqrs-and-event-sourcing-microservices-on-cloudfoundry/). In this new version, Ben looks at Axon v3, Cloud Foundry, and Concourse, among other things. All off this greatly simplifies his code.
-   This is an oldie-but-a-goodie that looks at [the idea of rollbacks and other deployment myths that we tell ourselves](http://blog.lusis.org/blog/2011/10/18/rollbacks-and-other-deployment-myths/). Definitely worth a read, even if it doesn't have all that much to do with Spring itself!
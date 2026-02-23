---
title: This Week in Spring - May 15th, 2018
source: https://spring.io/blog/2018/05/15/this-week-in-spring-may-15th-2018
scraped: 2026-02-23T15:24:32.355Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 15, 2018 | 0 Comments
---

# This Week in Spring - May 15th, 2018

_Engineering | Josh Long |  May 15, 2018 | 0 Comments_

Hi Spring fans and welcome to another installment of *This Week in Spring*! I just returned from a month of travel on Saturday, and on Sunday I was off to Denver, CO, for the epic SpringOne Tour Denver show. Now, I'm off to begin a 10 day tour of Kyiv, Ukraine ([JEEConf](https://jeeconf.com/)); Dublin, Ireland and Belfast, Northern Ireland; and Barcelona, Spain ([Spring I/O](https://2018.springio.net/)). I hope to [see you around! (@starbuxman)](http://twitter.com/Starbuxman)

We've got a *ton* of good stuff to look at today so let's get to it!

-   Check out this Micrometer extravaganza webinar [from Micrometer lead Jon Schneider](https://content.pivotal.io/webinars/may-9-micrometer-its-slf4j-but-for-metrics-webinar)
-   I love this new guide on building [Spring Boot applications with Kotlin](https://spring.io/guides/tutorials/spring-boot-kotlin/)
-   Do you want to generate Spring REST Docs from Spring Cloud Contract DSLs? Check out how to specify [a proper base class here](https://cloud.spring.io/spring-cloud-contract/single/spring-cloud-contract.html#_generating_spring_rest_docs_snippets_from_the_contracts)
-   Brian McClain has a nice post on speeding [software development using build pipelines and Concourse CI](https://content.pivotal.io/pivotal-blog/to-speed-software-development-use-build-pipelines-then-use-concourse-dashboards-to-analyze-progress)
-   Christoph Stroble [has debuted transaction support in Spring Data MongoDB's reactive module](https://github.com/spring-projects/spring-data-mongodb/pull/560). Take a look!
-   Spring Security lead Rob Winch has also debuted [the new reactive Spring Security OAuth support in 5.1.0.M1](https://spring.io/blog/2018/05/15/spring-security-5-1-0-m1-released). Try it out now!
-   Want to reduce the startup time footprint for Spring applications? Check out [this Java processor that generates an index of components in a given \`.jar that the runtime can use to short circuit the component scanning process](https://github.com/spring-projects/spring-framework/blob/master/spring-context-indexer/src/main/java/org/springframework/context/index/CandidateComponentsIndexer.java).
-   Spring and Kotlin ninja Sébastien Deleuze debuts the aforementioned tutorial [on using Spring Boot and Kotlin](https://spring.io/blog/2018/05/11/new-tutorial-about-spring-boot-and-kotlin)
-   Spring IO Platform lead Andy Wilkinson has just announced [Spring IO Platform Cairo SR1](https://spring.io/blog/2018/05/10/spring-io-platform-cairo-sr1)
-   Never one to rest on his laurels Andy Wilkinson has also just announced [Spring IO Platform Brussels SR10](https://spring.io/blog/2018/05/10/spring-io-platform-brussels-sr10)
-   Dr. Mark Pollack has just announced [Spring Cloud Data Flow 1.5 RC1 has been released](https://spring.io/blog/2018/05/09/spring-cloud-data-flow-1-5-rc1-released). The new release features an improved dashboard, updated application starters, and [a greatly refined Kubernetes Server](https://spring.io/blog/2018/05/09/spring-cloud-data-flow-1-5-rc1-released)
-   Spring web ninja Rossen Stoyanchev has [just published information on a few new CVEs](https://spring.io/blog/2018/05/09/spring-project-vulnerability-reports-published) - these are strongly recommended updates!
-   Hi Spring fans! In last week's installment of *Spring Tips* we look at the OAuth support [in Spring Security 5.0](https://spring.io/blog/2018/05/09/spring-tips-spring-security-5-oauth-clients). I'm happy to report that similar support is now available in Spring Security 5.1 for reactive REST services, as well.
-   Spring Boot legend [Andy Wilkinson has just announced Spring Boot 2.0.2](https://spring.io/blog/2018/05/09/spring-boot-2-0-2). The release includes over 80 fixes, improvements, and dependency updates.
-   Spring Boot legend Andy Wilkinson has just [announced Spring Boot 1.5.13](https://spring.io/blog/2018/05/09/spring-boot-1-5-13), which is itself chock-full of updates and new dependencies.
-   Joe Grandja, lead developer of the Spring Security OAuth efforts, has just [announced Spring Security OAuth 2.3.3, 2.2.2, 2.1.2, and 2.0.15](https://spring.io/blog/2018/05/08/spring-security-oauth-2-3-3-2-2-2-2-1-2-2-0-15-released)
-   Spring Session and Spring Security lead Rob Winch has just announced Spring Session Apple SR2. The new release includes an update to the core module and support for [Spring Session for Apache Geode](https://spring.io/blog/2018/05/08/spring-session-apple-sr2)
-   Spring Security lead Rob Winch has [just announced Spring Security 4.2.6](https://spring.io/blog/2018/05/08/spring-security-4-2-6-released)
-   New Spring Security team member Josh Cummings (welcome aboard Josh!) has [just announced Spring Security 5.0.5](https://spring.io/blog/2018/05/08/spring-security-5-0-5-released)
-   Check out the SpringOne Platform 2017 talk by Arjen Poutsma on the new [functional web framework in Spring Framework 5](https://www.infoq.com/presentations/spring-functional-web-framework)
-   This Japanese language post relays [the news that Fujitsu and Pivotal has partnered to deliver agile solutions](https://cloud.watch.impress.co.jp/docs/news/1121231.html)
-   Tom Hombergs put together a nice post on ["Consumer-Driven Contracts with Pact, Feign and Spring Data REST"](https://reflectoring.io/consumer-driven-contracts-with-pact-feign-spring-data-rest/)
-   Check out Brian Clozel's epic SpringOne Platform 2017: ["From Zero to Hero with Spring Boot 2.0."](https://www.infoq.com/presentations/spring-boot-web-dev)
-   Zoltan Alfatter looks at using the Spring Boot Admin with service registration and discovery and [Spring Cloud's `DiscoveryClient` support](http://zoltanaltfatter.com/2018/05/15/spring-cloud-discovery-with-spring-boot-admin/).
-   Spring Boot has had support for "thin" `.jar` artifacts for a while. Thin jars are Spring Boot `.jar`s that declare their dependencies and then dynamically download those dependencies at runtime. The result is smaller artifacts that can be more readily stored in artifact repositories with the tradeoff that startup take can be dramatically extended, especially on first run. The startup cost isn't such a big deal except on cloud platforms which a) might not know what to do with such an artifact and b) might try to kill the application for failing to respond to a health check after launch within a certain threshold. Cloud Foundry, on the other hand, has no such limitations, as this [epic tweet shows](https://twitter.com/springcentral/status/996063447950417920)
-   Did you miss last week's webinar introducing [all things new and shiny and reactive in the upcoming Spring Cloud Finchley](https://twitter.com/springcloud/status/995989131435085824)
-   I loved this panel on the state of [Java and Spring at Microsoft's Build conference](https://sec.ch9.ms/ch9/9b4a/234a161a-fa75-4b95-80c5-ee65b86e9b4a/Build2018DoesYourChoiceInProgrammingLanguageMatte.mp3)
-   You might like this oldie-but-a-goodie from [Oracle's Java Magazine in which I introduce reactive Spring applications](https://twitter.com/springcentral/status/995419405700878336)
-   This tweet is just a friendly reminder that reactive [type-safe Spring Boot applications in Kotlin are both concise and expressive](https://twitter.com/starbuxman/status/995345245347893248)
-   I really liked Piotr Mińkowski's blog post on microservices with Spring Boot 2.0 and Spring Cloud\]([https://dzone.com/articles/quick-guide-to-microservices-with-spring-boot-20-e](https://dzone.com/articles/quick-guide-to-microservices-with-spring-boot-20-e))
-   This is an interesting [post on how to develop Amazon Alexa skills with Spring Boot](https://dzone.com/articles/amazon-alexa-skill-development-and-deployment-step) - nice!
-   Want to learn more about the Pivotal function-as-a-service, Project Riff? Check out this [amazing post](https://medium.com/@mgray_94552/brief-intro-to-riff-is-for-functions-ad693242994c) by our very own Mario Gray
-   Mario's not one to rest on his laurels! He *also* has a nice post on [distributed tracing with Spring Cloud Sleuth and Zipkin](https://medium.com/@mgray_94552/application-tracing-with-zipkin-spring-41d30407ac02)
-   This post from Keyhole Software looks at the different ways to [configure applications with Spring Boot profiles](https://keyholesoftware.com/2018/04/18/spring-boot-profiles-a-strategic-way-to-configure-applications/)
-   Our very own Neven has a nice post [that looks at porting stateless applications to Cloud Foundry](https://medium.com/@nevenc/stateless-microservices-on-application-platform-ce6dea9c9821)
-   The Kotlin Expertise blog has a very nice look at [building reactive Spring WebFlux applications with Kotlin](https://kotlinexpertise.com/spring-webflux-with-kotlin-reactive-web/)
-   I just want to recognize Spring Security lead Rob Winch [for getting the reactive OAuth support in Spring Security 5](https://twitter.com/rob_winch/status/994871039669792768?s=12) working so quickly. The work was not easy but it's *so* worth it! Thank you Rob! It allowed [Okta's Matt Raible](https://twitter.com/mraible/status/996393640829255680) and I to demonstrate it in Denver at SpringOne Denver yesterday and it was *awesome*! Also, thanks Matt for co-presenting with me on short-notice and bringing the OAuth and security win!
-   Dr. Mark Pollack has [just announced Spring Cloud Data FLow 1.5 RC1](https://twitter.com/springcentral/status/994326146316562432)
-   StubHub have bet big on Pivotal Cloud Foundry and Google Cloud. [Learn how](https://techcrunch.com/2018/05/09/stubhub-bets-on-pivotal-and-google-cloud-as-it-looks-to-go-beyond-tickets/amp/?__twitter_impression=true) in this [TechCrunch article](https://techcrunch.com/2018/05/09/stubhub-bets-on-pivotal-and-google-cloud-as-it-looks-to-go-beyond-tickets/amp/?__twitter_impression=true)
-   Rafał Głowiński has a [nice post on using Spring @WebMvcTest with Spock Framework](https://allegro.tech/2018/04/Spring-WebMvcTest-with-Spock.html)
-   Check out this step-by-step guide on [using Spring Cloud Pipelines with Cloud Foundry](https://twitter.com/springcentral/status/994019154121310208)
-   InfoQ have posted my SpringOne Platform 2017 talk on ["Programmatic Bean Registration with Spring Framework 5.0"](https://www.infoq.com/presentations/bean-registration-spring-5)
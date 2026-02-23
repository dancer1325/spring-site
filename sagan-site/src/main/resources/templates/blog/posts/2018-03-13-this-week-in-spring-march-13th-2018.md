---
title: This Week in Spring - March 13th, 2018
source: https://spring.io/blog/2018/03/13/this-week-in-spring-march-13th-2018
scraped: 2026-02-23T16:06:03.298Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 13, 2018 | 0 Comments
---

# This Week in Spring - March 13th, 2018

_Engineering | Josh Long |  March 13, 2018 | 0 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I'm in blizzard-besieged Boston, Massachusetts, for the epic Spring One Tour Boston event. Unfortunately, due to this *crazy* snow storm / blizzard, the event's been postponed one day as we all grapple with the weather. Hope you were able to join the Spring Boot 2.0 launch webinar! If not the replay will be available [here](https://content.pivotal.io/webinars/mar-13-introducing-spring-boot-2-0-webinar) and don't forget to check out the launch [blog](https://content.pivotal.io/blog/opening-doors-with-spring-boot-2-0)!

![](https://pbs.twimg.com/media/DYK9ObmWkAA3QYH.jpg) ![](https://pbs.twimg.com/media/DYK-rfQXkAEuK8W.jpg)

Snow or no snow! The show must go on, at least here on the Spring blog, so without further ado:

-   The Reactor team is looking for a [motivated new engineer to join the team](https://pivotal.io/careers/posting/staff-software-engineer-reactor-reactive-spring/1077260) - apply now!
-   Spring Cloud Data Flow ninja Gunnar Hillert has just announced [Spring Cloud Data Flow 1.4 RC1](https://spring.io/blog/2018/03/12/spring-cloud-data-flow-1-4-rc1-released)
-   [Spring IO Platform Cairo-RC1](https://spring.io/blog/2018/03/12/spring-io-platform-cairo-rc1) lead Andy Wilkinson has just announced the latest updates, including Spring Boot 2.0. Check it out and make sure works as you expect it to.
-   I love this [post](https://spring.io/blog/2018/03/12/upgrading-start-spring-io-to-spring-boot-2) by Spring team legend Stéphane Nicoll on upgrading the [Spring Initializr (http://start.spring.io)](http://start.spring.io) to Spring Boot 2.0.
-   [The Spring Data JDBC project has added `@Modify` for marking queries](https://github.com/spring-projects/spring-data-jdbc/commit/73fe1ca93bb7c5f9e31292343c0b06f981e51284) that perform DML or DDL. Modifying queries will return type `boolean` or `Boolean` when the number of updated rows is greater 0. This shouldn't be used for DML statements since it will always return false.
-   Spring Web Flow lead Rossen Stoyanchev has just [announced Spring Web Flow 2.5](https://spring.io/blog/2018/03/07/spring-web-flow-2-5-released). This release provides an upgrade path for applications using Web Flow to Spring Framework 5 with Java 8, Servlet 3.1, Hibernate 5, Tiles 3, and JSF 2.2 as minimum requirements.
-   Spring Boot legend Madhura Bhave looks at support for [testing auto-configurations in Spring Boot 2.0](https://spring.io/blog/2018/03/07/testing-auto-configurations-with-spring-boot-2-0)
-   Spring Batch ninja Mahmoud Ben Hassine has [just announced Spring Batch 3.0.9 and 4.0.1](https://spring.io/blog/2018/03/07/spring-batch-3-0-9-release-and-4-0-1-release-are-now-available), both with several improvements, bug fixes and documentation updates.
-   Spring Data lead Oliver Gierke out a [Request for Feedback on this proposed API draft for more fine-grained control over the HTTP methods exposed by Spring Data REST](https://jira.spring.io/browse/DATAREST-948). Please give the snapshots a try and report feedback!
-   Spring Data lead [Oliver Gierke looks at the history of a CVE](https://spring.io/blog/2018/03/06/security-issue-in-spring-data-rest-cve-2017-8046) that was discovered, and fixed, last Fall.
-   Spring Boot lead Phil Webb talks to InfoQ [about the recently released Spring Boot 2.0](https://www.infoq.com/news/2018/03/spring-boot-2.0-ga)
-   Jeffrey Haskovec has a nice roundup [of what's new in Spring Boot 2](https://haskovec.com/spring-boot-2-0/)
-   This is a simple and interesting example of [using the retry operator in a Spring WebFlux](https://github.com/bjartek/webflux-retry/blob/master/src/main/kotlin/org/bjartek/webfluxretry/WebfluxRetryApplication.kt)\-based application. It also demonstrates error-handling mechanisms.
-   The [Cloud Foundry Day in Copenhagen](https://www.cloudfoundry.org/blog/may-1st-cloud-foundry-day-copenhagen-sponsorships-available-cfp-open/) is coming and the CFP is open!
-   Tim Spann has a funnily named new blog post that is [a guide to using Spring Boot 2.0 with Apache Hive LLAP ACID](https://dzone.com/articles/spring-boot-20-on-acid-big-data-spring-boot) tables to make the most of a Big Data pipeline.
-   The [Microsoft Azure Spring Boot starters](https://twitter.com/brunoborges/status/971685078551035904) have been updated to support Spring Boot 2.0! Hurray!
-   Nominate a [community member that is an active advocate of the Cloud Foundry technology](https://www.cloudfoundry.org/blog/community-awards-cloud-foundry-na-summit-2018/).
-   This thread is a nice breakdown on some ways [to approach error handling using Project Reactor](https://twitter.com/smaldini/status/973228433860837376?s=12), as in a Spring WebFlux application.
-   This is an interesting post that looks at a particular way to quantify how responsive [a system is - Apdex](https://medium.com/@tristan_96324/prometheus-apdex-alerting-d17a065e39d0). It's yet another useful application of a time series DB (like Prometheus, Graphite, InfluxDB, etc.) and you're going to need a metrics facade like Micrometer to use it.
-   RxJava 2 lead and frequent Pivotal Reactor contributor David Karnok [has a nice benchmark of RxJava and Reactor](https://github.com/akarnokd/akarnokd-misc/issues/2)
-   Check out Christoph Strobl and Mark Paluch's talk on [Reactive Data Access with Spring](https://www.infoq.com/presentations/reactive-spring-data)
-   The SivaLabs blog continues its series on building microservices with Spring. [This is part 4 and it looks at circuit breakers with Spring Cloud Netflix Hystrix](https://sivalabs.in/2018/03/spring-cloud-netflix-circuit-breaker/)
-   Dhaval Shah has a nice post, ["Bootiful Test Driven Development"](https://t.co/s7gilJuRhy?ssr=true)
-   Our very own Pivotal legend Toshiaki Maki put together a BOSH release [to deploy the Sonatype Nexus artifact repository](https://github.com/making/nexus-boshrelease/releases/tag/0.8.0). Nice!
-   Gunter Rotsaert has written a quick, interesting [introduction to the Reactive Streams and Spring Web Flux with Java 9](https://t.co/QPLsbo9WF2?ssr=true)
-   Raj Saxena has a [performance test comparing Spring WebFlux and Spring MVC](https://t.co/Cp3fvQ8BZn?ssr=true)
-   [How Cerner Leverages Concourse's CI Platform for Regulated Environments - The New Stack](https://thenewstack.io/cerner-uses-concourses-continuous-integration-platform-regulated-environments/?_lrsc=aeb08570-7015-4076-91b7-ecc52aaaa2c1)
-   This new post on the Cloud Foundry community site looks [at *polyglot service discovery*](https://www.cloudfoundry.org/blog/polyglot-service-discovery-container-networking-cloud-foundry/) in Cloud Foundry
-   I love this post - on the Kotlin Development blog - on why [Spring Web Flux](https://www.kotlindevelopment.com/kotlin-webflux/) is so amazing. Plus, Kotlin!
-   Claus Ibsen on Twitter: "What version of [#ApacheCamel supports Spring Boot 2](https://twitter.com/davsclaus/status/972144268017061888)? That is easy to remember, the version starting with all the 2's, eg v2.22 (planned for early summer 2018)"
-   Mark Paluch explains [how to use Kotlin default methods with Spring Data repository interfaces](https://twitter.com/SpringData/status/972061237734494209). TL;DR: you can't.
-   In which Spring Data lead Oliver Gierke [alludes to some interesting integration possibilities](https://twitter.com/SpringData/status/972061189302833152) with Camunda, the BPMN engine forked from Activit.
-   This is interesting - [it's a prototype JWT integration with Spring WebFlux and Spring Security 5](https://github.com/raphaelDL/spring-webflux-security-jwt)
-   Great Tweet from [Addison Huddy](https://twitter.com/addisonhuddy/status/971795942595747840): "The power of @springcentral reactor clicked for me yesterday. 'B/c async programming is callback hell.'"
-   Microsoft have published a nice blog: [build Spring Boot 2.0 apps with AAzure starters and new VSCode etensions](https://azure.microsoft.com/en-us/blog/build-spring-boot-2-0-apps-with-azure-starters-and-new-vscode-extensions/)
-   Interesting Google community doc: ["Run a Kotlin Spring Boot application on Google Kubernetes Engine"](https://cloud.google.com/community/tutorials/kotlin-springboot-container-engine)
-   The process to develop open source practices [inside Home Depot has led to becoming a CloudFoundry foundation member...](https://twitter.com/cloudfoundry/status/971510174367338496)
-   Check out this upcoming webinar from Pivotal's Richard Seroter and Microsoft's Asir Vedamuthu that looks at [how to run Spring applications on Microsoft Azure](https://twitter.com/springcentral/status/971507034800754689)
-   Brian McClain looks at what goes into [creating a Project Riff with this quick rundown](https://medium.com/@brianmmcclain/anatomy-of-a-riff-function-3524d84feb9a).
-   Registration *and* the CFP for [SpringOne Platform 2018 are both now open!](https://twitter.com/springcentral/status/971490856313151488)
-   The [Gradle Initializr now runs on Spring Boot 2.0](http://bmuschko.com/blog/gradle-project-generation/). You can even enjoy the custom Gradlephant banner if you'd like.
-   We're growing [the Spring community in Minnesota](https://www.meetup.com/SpringMN/events/246492750/?_lrsc=7d17a732-8fa2-44e3-8ee8-9d271de18519&_cookie-check=BKO9-hM4zzyV8nkq). Let's keep the momentum going from our first #meetup. Join us on 3/12!
-   Spring Social lead Craig Walls has a *great* post that looks at how to [use Spring Security 5’s OAuth2 client support to integrate with external APIs such as Facebook](https://twitter.com/springcentral/status/971159310226006016).
-   I really liked this discussion on [the types of data streaming platforms](https://yokota.blog/2018/03/05/stream-relational-processing-platforms/amp/?__twitter_impression=true)
-   I was one of many in the [Off Heap podcast episode recorded live at the Atlanta DevNexus 2018 event](https://twitter.com/offheap/status/970920533893271553?s=12) - enjoy!
-   The Pivotal conversations podcast [has a nice interview with Spring Tools lead Martin Lippert](https://twitter.com/cote/status/970803667593916417?s=12)
-   [ascii in java](https://t.co/uJBAzQs7mH?ssr=true)
-   The Heroku blog has a nice post by [Joe Kutner on using Spring Boot 2.0 on Heroku](https://twitter.com/codefinger/status/970783853215473666?s=12)
-   The *Talking Kotlin* podcast discusses [how one company uses Spring Boot and Kotlin together in building their cloud-based offering](https://itunes.apple.com/us/podcast/talking-kotlin/id1194631266?mt=2&i=1000404125552).
-   Check out all [the improvements to the Spring Boot Netbeans integration](https://twitter.com/aless_falappa/status/970743733628088320?s=12)
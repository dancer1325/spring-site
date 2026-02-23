---
title: This Week in Spring - June 26th, 2018
source: https://spring.io/blog/2018/06/26/this-week-in-spring-june-26th-2018
scraped: 2026-02-23T15:20:37.760Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 26, 2018 | 0 Comments
---

# This Week in Spring - June 26th, 2018

_Engineering | Josh Long |  June 26, 2018 | 0 Comments_

Hi Spring fans and welcome to another installment of *This Week in Spring*! This last week's been fun! Since we last spoke, I have been in Amsterdam (customers), London (SpringOne Tour London); Paris, Fr (JHipster Conf); Krakow, Pl (Devoxx PL); and now Sao Paulo, Br (Spring Connect SP). It's been a wild ride and it's nice to conclude the journey here in Brazil with one of the largest Java communities on earth.

And, as a cherry on top, there is a *ton* of great stuff to look at in this week's roundup so let's get to it!

-   Spring Data Geode / Gemfire lead John Blum has just announced the Spring Boot integration for [Apache Geode and Pivotal Gemfire 1.0.0.M1](https://spring.io/blog/2018/06/26/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-m1-released). It supports look-aside caching using Spring’s Cache Abstraction, system of record (SOR) using Spring Data Repositories and Spring transaction management, distributed compute using function implementation & executions, event stream processing (ESP) using continuous query, domain object versioning/serialization using PDX, Security, authentication / authorization, and TLS using SSL.
-   Not one to rest on his laurels, Spring Data Geode/Gemfire lead John Blum [has announced Spring Session for Apache Geode/Pivotal Gemfire 2.0.3.RELEASE](https://spring.io/blog/2018/06/21/spring-session-for-apache-geode-pivotal-gemfire-2-0-3-release-released)
-   Check out this minimal [Spring Fu webapp that now compiles to a native image successfully](https://github.com/spring-projects/spring-fu/issues/29#issuecomment-398791917) with Graal 1.0.0.RC2 and Kotlin 1.2.60 (will also work with 1.2.51), and Netty! Startup time is < 3 ms with Graal on my admittedly fairly quick Linux/Dell Precision 5520 (to be compared with 900 ms with Java 10). The self-sufficient [executable size is 50 MB but there's every reason to think we can reduce it.](https://github.com/spring-projects/spring-fu/issues/29#issuecomment-398791917)
-   Hi Spring fans! We've officially concluded [our latest season of Spring Tips, season 4](https://spring.io/blog/2018/06/20/spring-tips-season-4-recap). If you want to learn more you should check out this recap post which lists every installment of *Spring Tips* to date. As always I'm keen on any suggestions [for the latest and greatest tips](http://twitter.com/Starbuxman). And don't worry, we'll be back! :)
-   Now that Spring Cloud Finchley GA is out, I thought I'd put together a recap of the road to reactive Spring Cloud. [3 Comments](https://spring.io/blog/2018/06/20/the-road-to-reactive-spring-cloud#disqus_thread)
-   Good news everybody! [The Vaadin guide on Spring.io/guides](https://spring.io/guides/gs/crud-with-vaadin/) has been updated to Vaadin 10 [thanks to Vaadin's very own Matti Tahvonen](https://twitter.com/gregturn/status/1011617414314889216?s=12)
-   This is super cool! Project Blockhead is an open [service broker compliant implementation that supports Ethereum](https://www.cloudfoundry.org/blog/cloud-foundry-summit-hackathon-project-blockhead/), the result of a hackathon, too!
-   Stephane Nicoll and Brian Clozel's talk, *Spring Boot 2.0 Web Applications*, is now available online. Here is the [video](https://www.youtube.com/watch?v=E3I7SlZ2QdU&feature=youtu.be) and here is the [code](https://github.com/snicoll-demos/smart-meter).
-   I did a talk, *Bootiful Kotlin*, from Kotlin Conf 2017, that is [now available online](https://www.youtube.com/watch?v=SlBRce-aBOc&feature=youtu.be). It's a little outdated but it's a roving tour of all sorts of integrations, classic and cutting edge, in the Spring and Kotlin universes.
-   I really like this post from Pivotal's own Richard Seroter on four Spring Cloud projects [that you should definitely check out](https://seroter.wordpress.com/2018/06/25/four-spring-cloud-projects-that-you-should-be-using/)
-   I love Spring Test lead and JUnit lead Sam Brannen's explanation on the differences in [autowiring in a regular Spring component versus its use in a JUnit test class](https://twitter.com/sam_brannen/status/1011306247499509761?s=12).
-   German consultancy and software house Codecentric, who've appeared in *This Week in Spring* a number of times, [have announced their hiterto German-languge only *Softwerker* magazine is now available in English](https://codecentric.rs/). They often have articles on Spring so I'd bookmark this. And if you read German, check out the back-issues!
-   Check out [Spring Data Gremlin](https://github.com/Microsoft/spring-data-gremlin), Microsoft's integration for any database that supports the Gremlin query language, of which CosmosDB is but one particularly interesting option
-   This is an oldie-but-a-goodie from Michael Simons on how to [configure a Spring Boot application to use JUnit 5](https://twitter.com/springcentral/status/1011320403023749121)
-   I like this post on using the [functional and reactive Spring support in Spring Framework 5 and Spring Boot 2](https://www.e4developer.com/2018/06/22/cia-world-factbook-api-with-functional-spring/), as a microframework of sorts, to turn the World Factbook API into a REST API
-   Jenn Strater's epic talk [on documenting RESTful APIs with Spring REST Docs on InfoQ](https://www.infoq.com/presentations/documentation-api-spring-rest)
-   Check out this video tutorial [series on using BOSH](https://www.youtube.com/playlist?list=PLu8oHHyQbBrTGvoGdF7NuZqKqU_31cKkc) to manage infrastructure.
-   I love this blog on optionally [injecting dependencies into your Spring code](http://blog.marcosbarbero.com/optional-di-spring/). Did you know you can inject dependencies that *may* be present (or not) using Java 8's `Optional<T>`, JSR 330's `Provider<T>` and Spring's longest supported `ObjectProvider<T>`?
-   This is a super cool tweet from Noopur Gupta demonstrating running tests on [specific platforms using new JUnit 5 annotations](https://twitter.com/noopur2507/status/1010123137793642496?s=12)
-   I like this example [demonstrating Spring Webflux and the `reactive-pg-client`](https://github.com/pacphi/reactive-jdbc-demo).
-   Codecentric's Spring Boot Admin 2.0.1 released! The new release now [includes Spring Cloud `DiscoveryClient` support](https://github.com/codecentric/spring-boot-admin/issues?utf8=%E2%9C%93&q=milestone%3A2.0.1), now that Spring Cloud Finchley is GA. Hurray and congrats to the Codecentric team!
-   The next iteration of Spring Boot, Spring Boot 2.1, [is going to be awesome](https://twitter.com/snicoll/status/1009163242172813312). It includes faster startup, immutable and scannable `@ConfigurationProperties`, **Netty support for HTTP/2**, functional bean registration support, and more!
-   Check out Spencer Gibb's Spring I/O 2018 talk, [*Introducing Spring Cloud Gateway*](https://youtu.be/NkgooKSeF8w)
-   JHipster v5.0.0 has been released, the day before Jhipster Conf, and it features support for Angular 6, React, Webpack 4, Spring Boot 2 [and more](https://twitter.com/springcentral/status/1009599149904314368)
-   Is Cloud Foundry still relevant in the age of containers and serverless? Yes. In fact, it's even more relevant. [Check out this amazing writeup](https://www.youtube.com/watch?v=hU239WlrtBk)
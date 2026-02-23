---
title: This Week in Spring - January 3rd, 2017
source: https://spring.io/blog/2017/01/03/this-week-in-spring-january-3rd-2017
scraped: 2026-02-23T18:52:08.681Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 03, 2017 | 4 Comments
---

# This Week in Spring - January 3rd, 2017

_Engineering | Josh Long |  January 03, 2017 | 4 Comments_

Welcome to another installment of *This Week in Spring*! We're now squarely in 2017, and 0 as always - there is *much* to cover!

This is also the first week of the year. I note it with some pride because it also marks the 6th anniversary of the first installment of *This Week in Spring*, in January 2011, which I've since continued every Tuesday without fail come sickness, holiday, travel or otherwise. It's been a heckuva run and I'm excited to see what will grace This Week in Spring in the next 6+ years! I'm eternally grateful for all the people (from the community and internal to VMWare and now Pivotal) that have contributed to This Week in Spring over the years! For the last 3+ years my friend and Pivotal's own [Pieter Humphrey](https://twitter.com/PieterHumphrey) has been an amazing help in making this happen, so thanks Pieter!

As usual, if you have things you would like to see added to This Week in Spring, then don't hesitate to [ping me on Twitter](http://twitter.com/starbuxman) or ping [me by email](mailto:josh@joshlong.com).

Now then, let's get to it!

-   Spring Framework lead and co-founder Juergen Hoeller [just announced Spring Framework 5.0 M4](https://spring.io/blog/2016/12/30/spring-framework-5-0-m4-released)
-   Last week, I didn't publish a new Spring Tips video (and nor will I tomorrow) since I'm on vacation ( *This Week in Spring* aside!) but I did look at [resources every user should be aware to find educational content on all things Spring](https://spring.io/blog/2016/12/28/spring-tips-spring-tips-2016)
-   Spring Integration and messaging ninja [Artem Bilan just announced Spring AMQP 1.7RC1](https://spring.io/blog/2016/12/28/spring-amqp-1-7-rc1-available-now) which includes new support for the Amqp Client 4.0, updates to Log4j 2.7, Spring Retry 1.2, new support in `spring-rabbit-junit` for convenient rules like `BrokerRunning` and support for configuring how connections appear from the broker itself.
-   If you've ever wondered how you can extend Spring Boot, community contributor Dieter Hubau from Ordina / JWorks did a great talk on [Writing your own Spring Boot Starter](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-writing-your-own-spring-boot-starter) at SpringOne Platform 2016.
-   Greg Turnquist talks about [Continuous Delivery with Spinnaker](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-spinnaker-land-of-a-1000-builds) in this SpringOne Platform 2016 replay. After watching, make sure to check out the [latest M3 release](https://spring.io/blog/2016/12/19/spring-cloud-spinnaker-1-0-0-m3) of Spring Cloud Spinnaker while you're at it!
-   Ever wondered why Spring on Cloud Foundry is such a smooth experience? Or Groovy? Or Grails? Watch SpringOne rockstar speaker & a buildpack team lead Ben Hale talk about [updates to the Cloud Foundry Java Buildpack](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-java-buildpack-developer-enhancements) in his SpringOne Platform replay. Building on a base of amazing features like the [memory calculator](https://github.com/cloudfoundry/java-buildpack/blob/master/docs/jre-open_jdk_jre.md) Ben gives you the latest on why the buildpack provides the best Java SE support avaialble on the cloud today.
-   Christoph Strobl takes us through the latest in [Spring Data Redis](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-next-level-redis-with-spring) in his SpringOne Platform 2016 talk.
-   Eitan Suez explains [how Apache Geode fits into CQRS architecture](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-where-does-apache-geode-fit-in-cqrs-architectures) in this SpringOne Platform 2016 replay.
-   Never worked with Spring Data before? Here's a [great introduction](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-introduction-to-spring-data) from Greg Turnquist given at the SpringOne Platform 2016 conference.
-   Mark Paluch talks about Spring Cloud's support for HashiCorp Vault in his SpringOne Platform replay, [Managing scerets at scale](https://spring.io/blog/2017/01/03/springone-platform-2016-replay-managing-secrets-at-scale)
-   the Asimio Tech blog has a few nice posts up of late. This one looks at [centralizing configuration with the Spring Cloud Config Server](http://tech.asimio.net/2016/12/09/Centralized-and-Versioned-Configuration-using-Spring-Cloud-Config-Server-and-Git.html)
-   .. and this one looks at troubleshooting [timeouts with Spring's `RestTemplate`](http://tech.asimio.net/2016/12/27/Troubleshooting-Spring-RestTemplate-Requests-Timeout.html)
-   take a peak at some of what we're experimenting with around serverless function-type workloads in the recently announced but still very early days [Spring Cloud Function project](https://github.com/markfisher/spring-cloud-function)
-   this is a short-and-sweet look at how to apply [Craig Burke](https://twitter.com/craigburke1)'s [Bower Gradle plugin](http://josdem.io/techtalk/spring/spring_boot_bower_plugin/) to a Gradle-build (not really all that much to do with Spring Boot, despite the title, but interesting nonetheless)
-   learn how to separate integration from [unit tests through JUnit or Spring Boot](https://moelholm.com/2016/10/22/spring-boot-separating-tests/)
-   this Japanese-language post looks at [constructor injection in a Spring application](http://pppurple.hatenablog.com/entry/2016/12/29/233141)
-   Spring MVC ninja Rossen Stoyanchev hints that the Spring 5 web and reactive effort, informally referred to as Spring Reactive thus far, [will get a name in early January](https://twitter.com/rstoya05/status/814539765601157120)
-   this is an oldie but a goodie from Pivotal's own David Julia, [looking at how to write expressive REST APIs](https://blog.pivotal.io/pivotal-labs/products/refactoring-towards-expressive-rest-apis-let-your-code-be-your-guide)
-   This seems to be a very cool (non-Pivotal) community for [Chinese-language speakers using Spring Cloud](http://springcloud.cn/) complete with examples of its use in China. Very cool!
-   Matt Raible wrote a really nice post detailing some useful tips when [building Spring Boot and Angular.js applications with Stormpath](https://stormpath.com/blog/angularjs-spring-boot-tips)
-   I really enjoyed Bartosz Jedrzejewski's blog looking at [building Spring Boot applications with MongoDB](http://blog.scottlogic.com/2016/11/22/spring-boot-and-mongodb.html)
-   this is a nice post that simply looks at how to [stand up Spring Boot applications that listen on multiple ports](https://github.com/neo4j-examples/movies-java-spring-boot-jdbc)
-   Spring Data Neo4j lead Michael Hunger just updated a very nice example of [using Neo4j's Cypher language to communicate through a JDBC driver with Neo4j](https://github.com/neo4j-examples/movies-java-spring-boot-jdbc)
-   the *Trying Things* blog has a nice look [at writing Cucumber tests with Spring Boot](https://tryingthings.wordpress.com/2016/12/19/cucumber-selenium-spring-boot/)
-   Karl Penzhorn did a nice job looking at how to build a simple CRUD application [using Spring Boot, React, complete with security and user authentication](https://www.javacodegeeks.com/2016/12/build-crud-application-react-spring-boot-user-authentication.html)
-   I dig [this Spanish-language look at building a Spring Boot-based web application](http://ledze.mx/index.php/10-spring-boot/restful/8-spring-boot-datarest-restful-mvc-thymeleaf-extrabonus-actuator-y-remote-shell) that features all the usual goodies plus Actuator, Thymeleaf, and even the Spring Boot remote shell!
-   the folks in the RedHat/JBoss Ininispan group just released [some nice Infinispan Spring Boot starters data grid and Spring Boot](http://blog.infinispan.org/2016/12/spring-boot-starters.html)
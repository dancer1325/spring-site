---
title: This Week in Spring  - November 4th, 2014
source: https://spring.io/blog/2014/11/04/this-week-in-spring-november-4th-2014
scraped: 2026-02-23T22:09:28.418Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 04, 2014 | 1 Comment
---

# This Week in Spring  - November 4th, 2014

_Engineering | Josh Long |  November 04, 2014 | 1 Comment_

Welcome to another installment of *This Week in Spring*! This week I'm on the road talking to enthusiastic Spring developers in Casablanca, Morocco at the [JMaghreb](http://www.jmaghreb.io/) conference and then it's off to London (again!) for the amazing [Spring eXchange](http://spring.io/blog/2014/10/29/pivotal-at-spring-exchange-2014-in-london-uk). If you're at either, be sure to say hi!

-   Artem Bilan, Spring Integration ninja and a personal hero of mine, has [just announced the Spring Integration RC1](http://spring.io/blog/2014/10/31/spring-integration-java-dsl-1-0-rc1-released) release. I don't know if you've seen the Java configuration DSL, but it makes writing complex integration flows a breeze! It takes advantage of Java 8's lamba support. Check it out! Remember, microservices aren't exclusively REST centric. If you're trying to build a microservice and expose it over any other mechanism, I'd start with Spring Integration.
-   Spring ninja Thomas Risberg just [announced Spring for Hadoop 2.0.3](http://spring.io/blog/2014/11/03/spring-for-apache-hadoop-2-0-3-released)! This release adds support for Apache Hadoop 2.5.1 (hadoop25) and Pivotal HD 2.1 (phd21).
-   [Spring Data ninja Christoph Strobl just announced Spring Data Evans service release 1 (SR1)](http://spring.io/blog/2014/11/03/spring-data-evans-sr1-released). The new release contains many important updates and is a recommended upgrade.
-   I'll be doing a webinar with ZeroTurnaround's Adam Koblentz introducing how to use [Spring (and Spring Boot in particular) and JRebel 6](http://spring.io/blog/2014/10/28/webinar-spring-boot-and-jrebel-6-0). Spring Boot makes Java as productive as it can get, but sometimes you need a little bit more to get around Java's traditionally awful support for things like live-reloading code during development (to expedite iteration). In this webinar, we'll look at how that's done with JRebel!
-   Check out the replay of my webinar about [Building “Bootful” UIs with Spring Boot and Vaadin](http://spring.io/blog/2014/11/04/webinar-replay-building-bootful-uis-with-spring-boot-and-vaadin)
-   Check out the replay of Russ Danner's webinar introducing [how to build content-enabled web and mobile applications](http://spring.io/blog/2014/10/30/webinar-replay-content-enabled-web-and-mobile-applications-with-spring-groovy-and-crafter)
-   I loved Matt Raible's epic post introducing how he built [a REST API using Spring MVC, SPring Data REST (HAL support), Swagger, Liquibase, and JAXB](http://raibledesigns.com/rd/entry/building_a_rest_api_with), all of it of course [through Spring Boot](http://start.spring.io). This post earned a bookmark!
-   Did you see Thomas Risberg's epic talk on *Spring Boot for Hadoop* at the meetup last week in Boston? If not, [check out the code and slides on GitHub](http://github.com/trisberg/bostonhadoop)! They're illuminating!
-   Dennis Schulte, over on the CodeCentric blog put together a *very* nice post on [using Logstash, ElasticSearch, and Spring Boot](http://blog.codecentric.de/en/2014/10/log-management-spring-boot-applications-logstash-elastichsearch-kibana/). Check it out!
-   I spent some time helping a misguided few with the [nuances of Spring's `@Qualifier` annotation](http://spring.io/blog/2014/11/04/a-quality-qualifier) and published the details on the Spring blog. Hopefully this is helpful for somebody out there!
-   Ben Hale, who leads the Java experience on Cloud Foundry and who is a Spring rockstar in his own right, did a [guest post for New Relic on the 1-click deployment experience to setup New Relic on a Cloud Foundry based application](http://blog.newrelic.com/2014/10/27/cloud-foundry-java-buildpack-new-relic-2/). Definitely worth a read! If you want a look at what New Relic means for Spring developers, may I humbly recommend [this webinar that New Relic's Ashly Puls and I did earlier this year](http://www.youtube.com/watch?v=ixnlDL6wli4)?
-   Recently, community member Marc Schipperheyn opened up a [JIRA seeking guidance of the role of Spring in modern single-page application-style web applications](http://jira.spring.io/browse/SPR-12266). The ensuing discussion is *very* illuminating for numerous reasons besides that it'll inspire changes in our documentation! Check it out and your $02.00 if you've got it to contribute!
-   Our pal Petri Kainulainen put together a nice [post on resetting auto-increment columns before Spring-based unit tests](http://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-resetting-auto-increment-columns-before-each-test-method/)
-   Our pal Rafal Borowiec is back at it again, this time with a post that looks at how to [create Spring Boot actuator endpoints](http://www.javacodegeeks.com/2014/10/spring-boot-actuator-custom-endpoint-with-mvc-layer-on-top-of-it.html)
-   Are you using Apache Camel? Did you know that it [now provides a Spring Boot-based auto-configuration](http://camel.apache.org/spring-boot.html)?
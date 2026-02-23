---
title: This Week in Spring - April 7th, 2015
source: https://spring.io/blog/2015/04/07/this-week-in-spring-april-7th-2015
scraped: 2026-02-23T21:07:55.731Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 07, 2015 | 5 Comments
---

# This Week in Spring - April 7th, 2015

_Engineering | Josh Long |  April 07, 2015 | 5 Comments_

Welcome to another installment of *This Week in Spring*! This week, I'm off to Paris, France for Devoxx France. Many of us on the Spring and Cloud Foundry teams will be there, so don't hesitate [to reach out](http://twitter.com/starbuxman) if you're about, we'd love to hear from you! Also, even if you're not at the show, come [meet many of us on the Spring team (including Juergen Hoeller himself, Stéphane Nicoll, Brian Clozel, Sébastien Deleuze and of course yours truly) at this free Devoxx France event](https://www.eventbrite.com/e/venez-decouvrir-devoxx-france-le-temps-dune-soiree-tickets-16446026508).

Also, this Thursday I'll be speaking at the vJUG again, [this time on building microservices with Spring Cloud](http://www.meetup.com/virtualJUG/events/221218834/). Don't miss it!

Erratum: @springjuergen, @snicoll, @sdeleuze, @brianclozel mais aussi très probablement @starbuxman. Pas d'excuses : eventbrite.com/e/venez-decouv…

-   Spring Boot co-lead Phil Webb just announced that [Spring Boot 1.1.12](https://spring.io/blog/2015/03/31/spring-boot-1-1-12-released) and [Spring Boot 1.2.3 are now available](https://spring.io/blog/2015/03/31/spring-boot-1-2-3-released)
-   Big-data ninja Thomas Risberg just released [Spring for Apache Hadoop 2.1.2](https://spring.io/blog/2015/04/03/spring-for-apache-hadoop-2-1-2-released)
-   Spring Social lead Craig Walls just announced [Spring Social Facebook 2.0.0.RC1](https://spring.io/blog/2015/04/07/spring-social-facebook-2-0-0-rc1-released). The new release brings Spring Social Facebook up to version 2.3 of the Facebook API and includes backwards incompatible changes.
-   Spring ninja Andy Wilkinson just announced the latest cut [of the Spring IO Platform BOM, 1.1.2](https://spring.io/blog/2015/04/01/spring-io-platform-1-1-2-released) and [Spring IO Platform 1.0.5](https://spring.io/blog/2015/04/01/spring-io-platform-1-0-5-released)
-   Matt Stine just announced the availability of two new guides and related Spring Cloud support for [building Spring applications with Docker and running them on the Lattice distributed runtime](https://spring.io/blog/2015/04/06/lattice-and-spring-cloud-resilient-sub-structure-for-your-cloud-native-spring-applications). What is Lattice? It's a much smaller subset of Cloud Foundry, that you can run on your local desktop, somewhat comparable to things like Kubernetes and Mesos + Marathon.
-   Done with the microservices hype? Then let's get practical [on April 21st](https://spring.io/blog/2015/03/17/webinar-smarter-service-to-service-invocations-with-spring-cloud). I'll be talking about how Spring Cloud integrates service registration (e.g.: Eureka, Consul, or Zookeeper), declarative REST clients (with Netflix's Feign), reactive programming and the circuit breaker pattern with Hystrix to support easy, robust service-to-service invocations.
-   Marius Bogoevici and Mark Pollack are teaming up for a webinar on Tues April 28th about [Reactive data-pipelines with Spring XD and Kafka](https://spring.io/blog/2015/03/17/webinar-reactive-data-pipelines-with-spring-xd-and-kafka), a must for any big / fast data enthusiasts.
-   Spring framework lead Juergen Hoeller put together a nice post [highlighting the continued, ongoing support for Java 6, 7, and 8 in Spring framework](https://spring.io/blog/2015/04/01/ongoing-support-for-java-7-and-even-java-6)
-   and then Spring framework ninja Stéphane Nicoll followed up with a look at how, exactly, Spring maintains its precarious [backwards compatibility across Java 6, 7, and 8](https://spring.io/blog/2015/04/03/how-spring-achieves-compatibility-with-java-6-7-and-8)
-   Spring Integration ninja Artem Bilan just announced [Spring AMQP 1.4.4 and Spring Integration 3.0.7, 4.0.7, and 4.1.3 are now available](https://spring.io/blog/2015/04/07/spring-amqp-1-4-4-and-spring-integration-3-0-7-4-0-7-and-4-1-3-are-available). These are mostly maintenance releases.
-   Spring ninja Greg Turnquist has converted the good Dr. Dave Syer's epic [blog series on single page application security with Spring Security OAuth, Spring Cloud and Angular.js into a tutorial](https://spring.io/blog/2015/04/02/check-out-dave-syer-s-spring-security-and-angularjs-blog-series-converted-to-tutorial)! Hurray!
-   Spring Security lead Rob Winch has just [announced Spring Security Kerbreros 1.0.0.RC2](https://spring.io/blog/2015/04/02/spring-security-kerberos-1-0-0-rc2-released)
-   Not strictly Spring-related, but I enjoyed this post, [*Upgrading Java 8 at scale*](http://product.hubspot.com/blog/upgrading-to-java-8-at-scale)
-   Check out this post (that follows [this first installment from 2014](http://java.dzone.com/articles/building-microservices-spring) ) by Sergei Egorov on building [microservices with Spring Boot, Apache Thrift and Facebook's Swift (which removes Swift IDL files for server code)](http://bsideup.blogspot.de/2015/04/spring-boot-thrift-part2.html). You might *also* revisit my post from a few weeks ago on using [Spring framework's Google Protocol Buffers support](https://spring.io/blog/2015/03/22/using-google-protocol-buffers-with-spring-mvc-based-rest-services)
-   Our friend is back, this time with a post on cleanly [injecting configuration properties into Spring beans](http://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-injecting-property-values-into-configuration-beans/). Ultimately, this looks very similar to Spring Boot's `@ConfigurationProperties` mechanism, so check that out if you're using Spring Boot!
-   [Packt has just published a new book on Spring framework](http://learningspringapplicationdevelopment.com/) by a Ravi Kant Soni.
-   You know what made my day? Seeing the third party Vaadin support for Spring Boot enumerated among the checkboxes [on the Spring Initialzr](http://start.spring.io). That's awesome!
-   MOAR Groovy and Grails replays from SpringOne2GX are released (in celebration of Grails 3.0 release), Lari Hotari's [Performance Tuning Grails Applications](https://spring.io/blog/2015/04/08/springone2gx-2014-replay-performance-tuning-grails-applications), Jeff Scott Brown's [Runtime Metaprogramming With Groovy](https://spring.io/blog/2015/04/08/springone2gx-2014-replay-runtime-metaprogramming-with-groovy), Bobby Warner's [Groovy Mobile Automation](https://spring.io/blog/2015/04/08/springone2gx-2014-replay-groovy-mobile-automation) and Gareme Rocher's [Advanced GORM: Beyond Relational](https://spring.io/blog/2015/04/08/springone2gx-2014-replay-advanced-gorm-beyond-relational). Enjoy!
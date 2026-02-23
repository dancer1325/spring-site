---
title: This Week in Spring - June 19th, 2018
source: https://spring.io/blog/2018/06/20/this-week-in-spring-june-19th-2018
scraped: 2026-02-23T15:20:46.527Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 20, 2018 | 0 Comments
---

# This Week in Spring - June 19th, 2018

_Engineering | Josh Long |  June 20, 2018 | 0 Comments_

Hi Spring fans! Welcome to another wonderful and wild *This Week in Spring*! This week I'm in Amsterdam, NL (visiting customers); London, UK (for both [the London Java Community Java User Group talk](https://opentechcalendar.co.uk/event/6915-cloud-native-java-part-deux) and [the SpringOne Tour event](https://springonetour.io/2018/london)); Paris, FR (for the [first JHipster Conf](https://jhipster-conf.github.io/)); Krakow, PL (for [Devoxx Poland](http://devoxx.pl/)) and then it's off to Sao Paolo, BR ([for the Spring Connect show](https://connect.pivotal.io/Spring-Connect-Brazil-2018-BR.html)). If you're in any of those places, [say hi](http://twitter.com/starbuxman)!

-   [Spring Cloud Finchley.RELEASE is available](https://spring.io/blog/2018/06/19/spring-cloud-finchley-release-is-available). This is the big one! It's finally here! The final piece of the reactive puzzle. This release culminates an almost year long journey from Spring Framework 5 (released in September of 2017) which introduced the world of Spring to reactive programming. Then we saw Spring Data Kay, Spring Cloud Stream, Spring Security 5, Spring Boot 2 (just a few months ago) and now, finally, Spring Cloud Finchley all embrace reactive programming wherever it makes sense. Spring Framework 5 is the new baseline and with it comes a new Java baseline requirement; Spring Cloud Finchley assumes Java 8 or better. This release is not just a refresh, though! Furthest thing from it! This release also includes two (effectively) brand new projects called Spring Cloud Function and Spring Cloud Gateway. Spring Cloud Function [supports serverless programming](https://www.youtube.com/watch?v=E55oAtOhWZU) and Spring Cloud Gateway is [an API Gateway](https://www.youtube.com/watch?v=TwVtlNX-2Hs).
-   Sprinf IO Platform lead Andy Wilkinson has [just announced Spring IO Platform Cairo SR2](https://spring.io/blog/2018/06/18/spring-io-platform-cairo-sr2)
-   Not one to rest on his laurels, Andy Wilkinson also just announced [Spring IO Platform Brussels SR11](https://spring.io/blog/2018/06/18/spring-io-platform-brussels-sr11)
-   Brian Clozel published the following [Spring Framework-related CVEs!](https://spring.io/blog/2018/06/14/spring-project-vulnerability-reports-published)
-   Brian Clozel [has just announced Spring Boot 2.0.3](https://spring.io/blog/2018/06/14/spring-boot-2-0-3-available-now)
-   Stéphane Nicoll has [just announced Spring Boot 1.5.14](https://spring.io/blog/2018/06/14/spring-boot-1-5-14-available-now)
-   Simon Baslé has just [announced the Reactor Bismuth-SR10 release](https://spring.io/blog/2018/06/14/announcing-reactor-bismuth-sr10).
-   [Spring Session Apple SR3 Released](https://spring.io/blog/2018/06/14/spring-session-apple-sr3-released)
-   Mark Paluch [announced Spring Data Ingest SR13 and Spring Data Key SR8](https://spring.io/blog/2018/06/14/spring-data-ingalls-sr13-and-kay-sr8-released)
-   Spring Cloud Stream ninja Soby Chacko [has some nice examples demonstrating partitioning](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/partitioning-samples)
-   [Spring Cloud Stream Ditmars.SR4 Released](https://spring.io/blog/2018/06/13/spring-cloud-stream-ditmars-sr4-released)
-   [Spring Security 5.0.6 and 4.2.7 Released](https://spring.io/blog/2018/06/13/spring-security-5-0-6-and-4-2-7-released)
-   [Spring Cloud Pipelines 1.0.0.M8 Released](https://spring.io/blog/2018/06/13/spring-cloud-pipelines-1-0-0-m8-released)
-   [Spring Frameworks 5.0.7 and 4.3.18 are available now](https://spring.io/blog/2018/06/13/spring-framework-5-0-7-and-4-3-18-available-now)
-   In last week's [Spring Tips, we looked at the brand new Spring Fu project](https://spring.io/blog/2018/06/13/spring-tips-spring-fu). Spring Fu is an experiment where we investigate options for a Kotlin-first and functional configuration-centric approach to microframeworks. It is also *really* fast. Try it out!
-   Spring community legend Michael Simons has a nice post on [how to use JUnit 5 with Spring Boot for unit and integration tests](https://info.michael-simons.eu/2018/06/18/maven-use-junit-5-with-spring-boot-for-unit-and-integration-tests/)
-   This is a wonderful post by Martin Deinum on [the structure of the `ApplicationContext`](https://mdeinum.github.io/2018-04-12-on-spring-applicationcontext-and-bean-creation/), and how the various kinds of "configuration" are supported in Spring. This is an absolutely golden post and I'm so happy to see someone talking about these often overlooked details.
-   This post by Okta Developer Advocate Matt Raible details how to [secure a Spring Boot and Angular PWA application as a single artifact](https://developer.okta.com/blog/2018/06/18/spring-boot-angular-auth-code-flow)
-   Spring Data Geode/Gemfire lead John Blum has a fantastic example of [using Spring Data Geode/Gemfire to build a sample application. Check it out](https://github.com/pivotal-cf/PCC-Sample-App-PizzaStore/pull/6)
-   Check out the [new release of the Chaos Monkey for Spring Boot](https://twitter.com/springcentral/status/1009120028652814336). This release supports Spring Boot 2.x, improved documentation and improved JMX Actuator support.
-   Check out this new `cf` CLI plugin to [plugin to enable pushing artifacts to cloud foundry by maven coordinates](https://twitter.com/cloudfoundry/status/1008793109763780608)
-   [Tricks with 'var' and anonymous classes (that you should never use at work) - blog@CodeFX](https://blog.codefx.org/java/tricks-var-anonymous-classes/)
-   Did you miss Spring I/O 2018 in Barcelona, Spain? (If so, why?) [Check out this recap post](https://www.diva-e.com/de/news/neues-von-der-spring-io-2018-in-barcelona/)
-   The Java Revisited blog has a nice post on [why every developer should use Spring to build REST APIs](https://medium.com/javarevisited/why-java-developer-should-use-spring-to-develop-restful-web-services-efe36d7a6727?source=userActivityShare-a17df5ec14a4-1529129919)
-   I really liked this post on [user impersonation with Spring Security](http://blog.marcosbarbero.com/user-impersonation-with-spring-security/)
-   Our very own Toshiaki Maki [put together a really cool demo that Spring Boot 2 and iText (OpenPDF) and `AbstractPdfStamperView` to create a `.PDF` template](https://github.com/making/demo-pdf-stamper)
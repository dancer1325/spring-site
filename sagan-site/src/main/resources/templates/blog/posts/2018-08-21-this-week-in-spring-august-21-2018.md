---
title: This Week in Spring - August 21, 2018
source: https://spring.io/blog/2018/08/21/this-week-in-spring-august-21-2018
scraped: 2026-02-23T15:16:15.667Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 21, 2018 | 0 Comments
---

# This Week in Spring - August 21, 2018

_Engineering | Josh Long |  August 21, 2018 | 0 Comments_

Hi Spring fans and welcome to another installment of *This Week in Spring*. This week I've been in [smokey Seattle](https://www.vox.com/energy-and-environment/2018/8/21/17761908/seattle-air-quality-haze-smoke-wildfire-health) and I just arrived in hot-n-humid NYC, in both cases to visit customers and Spring teammates. We've got so much to cover, so without further ado, let's get to it!

The Spring team are all heads down as we [near the epic SpringOne Platform 2018 event](https://springoneplatform.io/). Are you going to be there? It's going to be September 24-27th, 2018 in Washington, DC. Do *not* miss this premier event uniting practicioners of agile, Cloud Foundry, Kubernetes, devops, and of course Spring in one place.

-   With this [change in Spring Boot 2.1](https://github.com/spring-projects/spring-boot/commit/6a48a440b2ec978908fa3768898cb22922fa2be7#diff-fca138b47abb58b721c4b5938e83b046), you don't even need to annotate your Spring-based JUnit 5 tests with `@ExtendWith(SpringExtension.class)`
-   Josh Cummings has just [announced Spring Security 5.1RC1](https://spring.io/blog/2018/08/21/spring-security-5-1-0-rc1-released) which includes, among *many* other things, support for OAuth resource servers and improved support for CORS and secure headers
-   [Spring Boot 2.1 M2 available now](https://spring.io/blog/2018/08/21/spring-boot-2-1-m2-available-now)
-   [Spring Data Lovelace RC2 available](https://spring.io/blog/2018/08/20/spring-data-lovelace-rc2-available)
-   Hi Spring fans! I've just started an eight-part blog series, with installments being released every Monday and Thursday, that introduces [Spring Cloud for the Google Cloud Platform](https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8). In this first installment, we look at setting up a basic Spring Cloud GCP project. Stay tune for the next installment in which we'll connect our application to an RDBMS using Spring Cloud GCP.
-   [Spring Session Bean-M1 and Apple-SR4 Released](https://spring.io/blog/2018/08/17/spring-session-bean-m1-and-apple-sr4-released)
-   [Spring Framework 5.1 RC2 available now](https://spring.io/blog/2018/08/17/spring-framework-5-1-rc2-available-now)
-   I really liked Richard Seroter's new post on how [to consume different clouds successfully](https://content.pivotal.io/blog/it-s-a-multi-cloud-world-here-s-how-to-consume-it-successfully)
-   If you are using Spring Boot 2.0.4 with Spring Data Neo4j please [keep an eye on this issue](https://github.com/spring-projects/spring-boot/issues/13999)
-   Check out this feature preview that supports deferment of \[Spring Data JPA repository initialization to [expedite startup of a typical Spring Boot application](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/deferred)
-   Paul Czarkowski's posted a [nice introduction to KNative and Kubernetes](https://medium.com/@pczarkowski/introduction-to-knative-b93a0b9aeeef)
-   Mike Villager has created TWO ConcourseCI resources. The first one [implements a Dynatrace UFO](https://github.com/akirasoft/dynatrace-ufo-resource) but the second one is way more fun, use it to easily push metadata about a deployment event up to [Dynatrace](https://github.com/akirasoft/dynatrace-resource)
-   Interesting! Messaging technology NATS has a new Kafka-like log API. [Check out this infoQ interview that introduces the new feature](https://www.infoq.com/news/2018/08/nats-liftbridge)
-   [Deep Dive into JUnit 5 Extension Model](https://www.infoq.com/articles/deep-dive-junit5-extensions)
-   Check [out this talk](https://twitter.com/cloudfoundry/status/1031641521248985090) by Pivotal's Richard Seroter and Microsoft's Asir Vedamuthu Selvasingh in which they highlight the event-driven architecture of Azure, and how Cloud Foundry and Spring solve problems for users!
-   The next installment of a multipart series on JAXenter.com, on the future of Java, in which I was privileged enough to participate, has just been published. This installment talks about the [end of the road for certain APIs in the JDK](https://jaxenter.com/java-influencers-series-part-2-148371.html).
-   Hackerman has a nice post on why you should [use Spring to develop REST services](https://hackernoon.com/why-use-spring-to-develop-java-web-services-ba0dcb2cafbf?source=userActivityShare-a17df5ec14a4-1534745879)
-   Coming to SpringOne Platform 2018? Check out Rossen Stoyanchev's talk - [a guide to "Reactive" for Spring MVC Developers](https://twitter.com/springcentral/status/1031260061379657728)
-   Rafael Winterhalter [has a nice prototype of a Spring Boot that does static proxy initialization at buildtime with ByteBuddy](https://twitter.com/rafaelcodes/status/1030556197445885952?s=12). This is super interesting!
-   [Testing a Spring Boot REST API against a Contract with Spring Cloud Contract - Reflectoring](https://reflectoring.io/consumer-driven-contract-provider-spring-cloud-contract/)
-   [Michael Cote from Pivotal on Programming the Business](https://www.infoq.com/podcasts/michael-cote-pivotal-business-programming)
-   Check out Arjen Poutsma's SpringOne Platform 2018 talk, "Have Fun with the Functional Web Framework," in which he goes beyond the basics [and shows the more advanced use cases](https://twitter.com/springcentral/status/1030546952998379520)
-   I like this post on using Microsoft Azure's SQL engine with Spring Boot-based applications using the Microsoft-developed [and supported Spring integration for Microsoft Azure](https://dzone.com/articles/pcf-spring-boot-applications-using-azure-sql-part)
-   This is promising - maybe the next release [of the Couchbase reactive Java SDK](https://twitter.com/springcentral/status/1030529075520004097) will be based on Reactor? Fingers crossed!
-   As if you needed any other reasons to come to SpringOne Platform 2018? [Michael Dell will be there!](https://twitter.com/springcentral/status/1030491229971144705)
-   Richard Seroter [makes yet another great point](https://twitter.com/rseroter/status/1030197865623183361): at what other conference do the likes of Amazon Web Services, Google Cloud, Microsoft Azure and VMWare all sponsor? \[Come to SpringOne Platform 2018 and [find out what all the fuss is about](http://springoneplatform.io)!
-   A recent employee Pulse Survey at Pivotal [had 92% participation and an NPS of 45](https://twitter.com/joemilitello10/status/1029876256295153664?s=12). All categories we measured improved. “I have confidence in the future of this company” is 16 points higher than the industry norm. NPS scores are read on a spectrum from -100 to +100. +45, thus, is very good. 100 would be world class. Obviously, we have a ways to go, but things are looking up!
-   This is a nice new cheat sheet from Snyk security: [10 Spring Boot security best practices by Simon Maple and Okta's Matt Raible](https://snyk.io/blog/spring-boot-security-best-practices/)
-   Simon Wirtz has a nice post on using [Hibernate and Spring Boot with Kotlin](https://kotlinexpertise.com/hibernate-with-kotlin-spring-boot/)
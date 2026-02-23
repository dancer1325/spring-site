---
title: This Week in Spring - October 1, 2019 - Spring Framework 5.2 Edition
source: https://spring.io/blog/2019/10/01/this-week-in-spring-october-1-2019-spring-framework-5-2-edition
scraped: 2026-02-23T14:35:17.718Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 01, 2019 | 0 Comments
---

# This Week in Spring - October 1, 2019 - Spring Framework 5.2 Edition

_Engineering | Josh Long |  October 01, 2019 | 0 Comments_

Oh emm geee y'all! We just released Spring Framework 5.2, complete with new RSocket support, and a slew of projects have followed suit in the intervening... *day*! I expect we'll see more soon, followed not too far behind by Spring Boot! And, of course, next week is the biggest week in all of Springdom every week: SpringOne Platform 2019!

I can't wait to get there, but first I'm off to Taipei for the JCCConf. THere's a ton to get to let's dive right in!

-   [Spring HATEOAS 1.0.0.RELEASE is released!](https://spring.io/blog/2019/09/30/spring-hateoas-1-0-0-release-is-released)
-   [Spring Cloud Open Service Broker 3.1.0.M2 Released](https://spring.io/blog/2019/09/30/spring-cloud-open-service-broker-3-1-0-m2-released)
-   [Spring Data Lovelace SR11 released](https://spring.io/blog/2019/09/30/spring-data-lovelace-sr11-released)
-   [Spring Framework 5.2 goes GA](https://spring.io/blog/2019/09/30/spring-framework-5-2-goes-ga)
-   [Spring REST Docs 2.0.4.RELEASE](https://spring.io/blog/2019/09/30/spring-rest-docs-2-0-4-release)
-   [Spring Framework 5.1.10 available now](https://spring.io/blog/2019/09/28/spring-framework-5-1-10-available-now)
-   [A Bootiful Podcast: Java Champion and Jetbrains Developer Advocate Mala Gupta](https://spring.io/blog/2019/09/27/a-bootiful-podcast-java-champion-and-jetbrains-developer-advocate-mala-gupta)
-   [Spring Boot for Apache Geode & Pivotal GemFire 1.2.0.M3 Released](https://spring.io/blog/2019/09/24/spring-boot-for-apache-geode-pivotal-gemfire-1-2-0-m3-released)
-   [How to configure RSocket security in a Spring Boot application with Spring Security - Stack Overflow](https://stackoverflow.com/questions/58130652/how-to-configure-rsocket-security-in-a-spring-boot-application-with-spring-secur)
-   [twitter.com](https://twitter.com/springrod/status/1178903600791085056?s=12)
-   [https://twitter.com/springcentral/status/1178773296839565312](https://twitter.com/springcentral/status/1178773296839565312)
-   [Reactive programming with Neo4j - Hantsy - Medium](https://medium.com/@hantsy/reactive-programming-with-neo4j-fb926a423d33)
-   [Spring Boot 2 - Internationalization (i18n) Auto-configuration](https://howtodoinjava.com/spring-boot2/rest/i18n-internationalization/)
-   [Pivotal have a cool tweet-bot that, if you star the tweet, it'll remind you when the SpringOne Platform 2019 keynotes start next week)](https://twitter.com/pivotal/status/1177319466247438336?s=12)
-   [check out this German-language article on Spring Cloud Pipelines](https://jaxenter.de/microservices-spring-cloud-pipelines-woock-87432)
-   [I love these Spanish-language articles on Spring by Codesolt](https://www.codesolt.com/category/tutoriales/)
-   [They've updated the JAsync R2DBC MySQL implementation, get the bits and check it out!](https://twitter.com/mirromutth/status/1177921854524116992?s=12)
-   Want to know why reactive programming is more relevant than ever in light of Project Loom? [Spring Data lead Mark Paluch](https://www.reddit.com/r/java/comments/d9nxpo/r2dbc_08_release_candidate_1_released/f1ls3ot/?utm_name=iossmf) put it as best as I've ever seen anyone put it:

> Reactive programming and Loom aim for different goals. Reactive is all about message passing and events, Loom is about scheduling.

> With Loom, consumption of streaming sources (Pub/Sub, change stream, live queries) remains as ugly as it currently is (Listeners, Message Containers). So basically, your code remains the same. You still require multiple server roundtrips or even query executions ("Paging") to fetch a lot of data and latency behavior stays as-is because most APIs return a List. Your code has still to wait until a response arrives as today's imperative drivers aren't backpressure-aware and cannot request data while you're processing the chunk you previously received.

> With Reactive Streams, any stream of data (Pub/Sub, change stream, live queries) is just yet another Publisher. Consuming unbounded data sources does not look any different than consuming a query with a bounded result count.

> A proper, non-blocking Reactive Streams implementation comes with improved latency behavior because a Reactive Streams database driver can pre-fetch data from cursors as it is backpressure-aware. A stream does not require pagination for the sake of fetching lots of data because each element is emitted individually and there's no need in the first place to aggregate data to a List. You get much better memory and latency characteristics by design.

-   [The latest version of SpringMockK 1.1.3, which provides `@MockBean` and `@SpyBean` but for MockK, not Mockito](https://twitter.com/jbnizet/status/1178224705607802881?s=12)
-   [twitter.com](https://twitter.com/aless_falappa/status/1177632974709444608?s=12)
-   [They’re starting to integrate R2DBC oath yugabyte DB](https://twitter.com/karthikr/status/1177321766198231040?s=12)
-   This was a [nice talk on R2DBC](https://twitter.com/siromaha/status/1177947412654166017?s=12)
-   [Spring Boot for Apache Geode and Pivotal GemFire Released (Ver. 1.2.0)](https://dzone.com/articles/spring-boot-for-apache-geode-and-pivotal-gemfire-r)
-   [R2DBC 0.8 Release Candidate 1 released](https://r2dbc.io/2019/10/26/r2dbc-0-8-rc1-1-released)
-   [Come see Juergen Hoeller, cofounder of Spring Framework, and I as we bring the Spring in Prague!](https://twitter.com/vojtechruzicka/status/1177594271005904897?s=12)
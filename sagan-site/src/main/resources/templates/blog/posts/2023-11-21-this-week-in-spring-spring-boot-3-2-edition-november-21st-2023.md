---
title: This Week in Spring - Spring Boot 3.2 edition - November 21st, 2023
source: https://spring.io/blog/2023/11/21/this-week-in-spring-spring-boot-3-2-edition-november-21st-2023
scraped: 2026-02-23T09:09:06.908Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 21, 2023 | 2 Comments
---

# This Week in Spring - Spring Boot 3.2 edition - November 21st, 2023

_Engineering | Josh Long |  November 21, 2023 | 2 Comments_

Hi, Spring fans! Welcome to another epic installment of *This Week in Spring*! As amazing as the week's already been, it's all leading up to this Thursday - Thanksgiving day! - when we release Spring Boot 3.2! (and yes, I am very grateful). This release is stuffed to the gills with a ton of new features:

-   reloadable SSL support
-   the new `JdbcClient` and the new `RestClient`, from Spring Framework 6.1.
-   Java 21 virtual threads (project Loom)
-   Coordinated Restore at Checkpoint (CRaC)
-   observability improvements
-   a *ton* of new and updated dependencies, like the newly integrated Spring for Apache Pulsar starter and autoconfiguration, the new Testcontainer support for ActiveMQ, and so much more.

All of this lands in just two days! You know where [to go and what to do (start.spring.io)](https://start.spring.io).

My friends, we've also got a ton of stuff to get into this week, so let's dive right into it.

-   [Spring for Apache Pulsar goes GA](https://spring.io/blog/2023/11/21/spring-for-apache-pulsar-1-0-0-goes-ga)
-   [Spring Security 6.2 goes GA](https://spring.io/blog/2023/11/20/spring-security-6-2-goes-ga)
-   By the way I'll be speaking at the Nashville JUG on December 1st, 2023, so come out and say hi if you're about. We'll be talking about Spring Boot 3.2, of course!
-   Are you still using the Paketo Bionic builder? Why? It's considered unsafe because it's built on an older operating system. Check [out this blog for more](https://blog.paketo.io/posts/paketo-bionic-builder-is-unsafe/)
-   Fun fact: we have an amazing CLI called [the Spring CLI](https://github.com/spring-projects/spring-cli). Even cooler: it's released using another opensource project that I think interesting: [JReleaser](https://jreleaser.org)
-   [Spring Data 2023.0.6, 2022.0.12, and 2021.2.18 are available now](https://spring.io/blog/2023/11/17/spring-data-2023-0-6-2022-0-12-and-2021-2-18-available-now)
-   [Spring Framework 5.3.31, and 6.0.14 are available now!](https://spring.io/blog/2023/11/16/spring-framework-5-3-31-and-6-0-14-available-now)
-   great tip from Micrometer lead [Tommy Ludwig](https://twitter.com/tommyludwig/status/1724755324090073487?s=12&t=n-UflcIbnx1lage-TBk0Cg): Micrometer 1.12.0 (which is out now) has a bunch of cool features, including support for generational ZGC added in Java 21 with JEP 439, and they updated the GC metrics in Micrometer to support it with the new release
-   Piotr has a nice blog on [using Kafka tracing with Spring Boot and OpenTelemetry](https://piotrminkowski.com/2023/11/15/kafka-tracing-with-spring-boot-and-open-telemetry/)
-   Kotlin product manager at Google and industry legend James Ward has a [nice look at using Spring and Kotlin and Testcontainers together](https://www.youtube.com/watch?v=JnC0VlRej3Y)

And finally, for those who celebrate, it's Thanksgiving in the United States this Thursday, the same day as we release Spring Boot 3.2. I know I speak for everyone when I say that I hope you find yourselves healthy, happy and hopeful this Thanksgiving, and that we are grateful - *thankful* - for you, dear community. Happy Thanksgiving!

![](https://raw.githubusercontent.com/joshlong/blog-images/master/this-week-in-spring/this-week-in-spring-thanksgiving-2023/one.jpg)
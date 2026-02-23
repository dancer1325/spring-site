---
title: This Week in Spring - September 20, 2016
source: https://spring.io/blog/2016/09/20/this-week-in-spring-september-20-2016
scraped: 2026-02-23T19:04:25.395Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 20, 2016 | 0 Comments
---

# This Week in Spring - September 20, 2016

_Engineering | Josh Long |  September 20, 2016 | 0 Comments_

Hello world! Since we last talked, I've been in multiple cities in China, including Hangzhou, Shanghai, Beijing, Guangzhou, Shenzhen and Hong Kong, talking to customers and community members alike. It's fascinating to see what our amazing customers in China do with our technologies in the hypercompetitive Chinese market. And, tasty!

-   Spring Cloud Camden is almost here! Spring Cloud co-founder Spencer Gibb just announced Spring Cloud Camden RC1, which in turn includes a lot [of improvements and a really cool new module, Spring Cloud Contract](https://spring.io/blog/2016/09/14/spring-cloud-camden-rc1-is-available)
-   Spring for Apache Kafka lead Artem Bilan just announced [that Spring for Apache Kafka 1.1 GA and Spring Integration Kafka 2.1 GA are now available](https://spring.io/blog/2016/09/19/spring-for-apache-kafka-1-1-ga-and-spring-integration-kafka-2-1-ga-are-available)
-   Spring Integration ninja Artem Bilan has *also* [just announced that Spring Integration 4.3.2 has just been released](https://spring.io/blog/2016/09/19/spring-integration-4-3-2-is-available), with polish around the RMI adapters, TCP, and a few new global tweaks like `spring.integration.readOnly.headers` global property. This is a small but worthy update on the journey to Spring Integration 5.0, with a milestone due in a month's time!
-   Spring framework ninja Stéphane Nicoll [has just announced Spring framework 4.3.3 and 4.2.8 are now available](https://spring.io/blog/2016/09/19/spring-framework-4-3-3-and-4-2-8-available-now)
-   Spring Cloud Data Flow ninja Thomas Risberg just [announced Spring Cloud Data Flow 1.1 M1 and 1.0.1 GA](https://spring.io/blog/2016/09/16/spring-cloud-data-flow-1-1-m1-and-1-0-1-ga-released)! The 1.1 M1, in particular, is *very* exciting! It adds LDAP backend support, HTTP BASIC backend authentication, file backend authentication, Spring Boot 1.3 and 1.4 support, UI improvements, and a slew of other niceties.
-   Never one to relax, Spring Integration Java DSL lead Artem Bilan *also* [just announced 1.2 M2](https://spring.io/blog/2016/09/15/java-dsl-for-spring-integration-1-2-milestone-2-is-available), which includes JPA support, mid-flow transaction support, scatter-gather support, improved routers, and more!
-   Spring Security and Spring Session lead Rob Winch just announced Spring Session 1.3.0 M2 which is packed with first class support for Hazelcast, support for Spring Security concurrent session management, a Redis JSON serialization example, easier configuration for the Redis cleanup task and *lots* of performance improvements and bug fixes. Get it while it's hot!
-   I really dig this post from community hero Michael Simmons on running \[Hibernate Search on Pivotal Cloud Foundry with ElasticSearch\]([http://info.michael-simons.eu/2016/09/20/running-hibernate-search-with-elasticsearch-on-pivotal-cf/](http://info.michael-simons.eu/2016/09/20/running-hibernate-search-with-elasticsearch-on-pivotal-cf/)
-   I really liked this talk by Alex Blewitt [on the internals of Hotspot](https://www.infoq.com/presentations/hotspot-memory-data-structures). Also: check out his *epic* tie!
-   I was very interested to learn about this configuration server from eBay Shanghai, [called *YiDB*](https://github.com/eBay/YiDB). Might be worth a look!
-   this blog from Riot Games on some of the optimizations they've [made when using Zuul is *very* informative](http://engineering.riotgames.com/news/riot-games-api-fulfilling-zuuls-destiny)
-   this is a *very* cool talk [from JavaZone by Sebastian Dehne](http://dehnes.com/software/2016/09/09/zero-downtime-deplayments-with-database-changes.html) on zero-downtime deployments with database changes.
-   speaking of, there is a *very* cool [thread in the Spring Cloud Netflix Github Issues on using Eureka for 0-downtime blue/green deployments](https://github.com/spring-cloud/spring-cloud-netflix/issues/1290#issuecomment-246707450)
-   [Java 9 will, unfortunately, be delayed 4 months](http://mail.openjdk.java.net/pipermail/jdk9-dev/2016-September/004887.html)
-   I dig this look at edge [service choices and - in particular - at the look at Netflix Zuul filters](https://tech.knewton.com/blog/tag/rate-limiting/) which you can of course use with Spring Cloud Netflix
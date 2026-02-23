---
title: This Week in Spring - April 10th, 2018
source: https://spring.io/blog/2018/04/11/this-week-in-spring-april-10th-2018
scraped: 2026-02-23T15:28:17.827Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 11, 2018 | 0 Comments
---

# This Week in Spring - April 10th, 2018

_Engineering | Josh Long |  April 11, 2018 | 0 Comments_

Hi Spring fans! This week I'm in Atlanta, Indianapolis and Cincinnati! I'll be speaking at the [Atlanta, GA Spring Meetup on Tuesday the 10th](https://www.meetup.com/AtlantaSpring/events/244444404/) where I'll be looking about all things new, *bootiful* and *cloud-native* including reactive programming, Spring Web Flux, Spring Cloud Finchley, Spring Cloud Function and [Project Riff](http://ProjectRiff.io). Then it's off [to Indianapolis where I'll be doing the same talk](https://www.meetup.com/Indianapolis-Java-User-Group/events/248184994/) on Thursday the 12th.

What a crazy week it's been! There's so much to get to this week. I want to call out, first, that there are some CVEs out there and if you haven't already, you should be updating urgently and accordingly. Read on for more information.

Secondly, our amazing Renaissance nerd and mad scientist [Andy Wilkinson](http://twitter.com/ankinson) takes top spot for most announcements this week. What an amazing person and prolific engineer! Week after week, year after year, he's tirelessly working on stuff that underpins what you see reflected on this blog, but it's rarer to see him blog so often. I just wanted to point him out because he's made your lives better at some point and you probably didn't even realize it :)

Anyway, without further ado! Let's get to it!

-   There's a new [Spring Integration 5.0.4 release](https://github.com/spring-projects/spring-integration/releases).
-   Spring IO Platform lead Andy Wilkinson [has just announced Spring IO Platform Brussels SR9](https://spring.io/blog/2018/04/10/spring-io-platform-brussels-sr9) which contains updated versions of Spring Boot and Spring Framework 4.3.16.
-   Spring Cloud Stream lead Oleg Zhurakousky has just announced Spring Cloud Stream 2.0. The new release contains a *lot* of improvements [so definitely read the blog](https://spring.io/blog/2018/04/10/announcing-general-availability-of-spring-cloud-stream-elmhurst-release-2-0-0-release). I also did a *Spring Tips* installment [on one of the new features, Spring Cloud Streams Kafka Streams](https://spring.io/blog/2018/04/04/spring-tips-spring-cloud-stream-kafka-streams)
-   Spring Boot lead Phil Webb has [just announced Spring Boot 1.5.12](https://spring.io/blog/2018/04/10/spring-boot-1-5-12-available-now) which is a recommended update for all Spring Boot users. It includes the updated Spring Framework release which in turn addresses a recent CVE.
-   Spring Framework ninja Rossen Stoyanchev has just released an updated Spring Framework [release to address CVE 2018 1270](https://spring.io/blog/2018/04/09/cve-2018-1275-address-partial-fix-for-cve-2018-1270). Upgrade ASAP!
-   Spring IO Platform lead Andy Wilkinson [has just announced Spring IO Platform Cairo-RELEASE](https://spring.io/blog/2018/04/09/spring-io-platform-cairo-release). The Cairo generation of the Platform builds on top of Spring Framework 5.0 and Spring Boot 2.0 and requires Java 8.
-   Spring IO Platform lead Andy Wilkinson [has just announced that the Spring IO Platform project will end twelve months from today, 9 April 2019](https://spring.io/blog/2018/04/09/spring-io-platform-end-of-life-announcement), and that the project will be moved to the attic. Maintenance releases of both the Brussels and Cairo lines will continue to be published up until that time.
-   Spring Framework ninja Rossen Stoyanchev has announced fixes for mutliple CVEs related to the Spring Framework. [Upgrade now!](https://spring.io/blog/2018/04/05/multiple-cve-reports-published-for-the-spring-framework)
-   Spring Cloud Stream legend Soby Chacko reminds us that [the samples have been updated in preparation for Spring Cloud Stream 2.0 release](https://github.com/spring-cloud/spring-cloud-stream-samples)
-   Spring Boot ninja Stéphane Nicoll has just announced [the first maintenance release of Spring Boot 2](https://spring.io/blog/2018/04/05/spring-boot-2-0-1-available-now) which includes over 160 fixes, improvements and dependency updates.
-   Spring Security ninja Joe Grandja just [announced Spring Security 5.0.4 and 4.2.5](https://spring.io/blog/2018/04/05/spring-security-5-0-4-and-4-2-5-released). Both releases primarily deliver bug fixes and dependency version updates along with some minor improvements.
-   Spring Boot [ninja Stéphane Nicoll just announced Spring Boot 1.5.11](https://spring.io/blog/2018/04/05/spring-boot-1-5-11-available-now) which includes over 70 fixes, improvements and dependency updates.
-   Spring Vault lead Mark Paluch just [announced that Spring Vault 1.1.2 and 2.0.1 have been released](https://spring.io/blog/2018/04/05/spring-vault-1-1-2-and-2-0-1-released). Bot releases primarily deliver bug fixes and dependency version updates along with some minor improvements.
-   Spring Data ninja Mark Paluch has [just announced Ingalls SR11 and Kay SR6 service releases](https://spring.io/blog/2018/04/04/spring-data-ingalls-sr11-and-kay-sr6-released). The Ingalls service release ships on top of the just-released Spring Framework 4.3.15 and in preparation of the upcoming Spring Boot 1.5.11 release. The Kay service release picks up Spring Framework 5.0.5 and will be picked up by Spring Boot 2.0.1 for your convenience.
-   Spring REST Docs lead Andy Wilkinson [has announced a recommended upgrade for all Spring REST Docs 2.x users](https://spring.io/blog/2018/04/04/spring-rest-docs-2-0-1-release).
-   And, not one to rest on his laurels, Spring REST Docs lead Andy Wilkinson has *also* announced a maintenance release that includes a handful of bug fixes [and documentation improvements for all Spring REST Docs 1.x users](https://spring.io/blog/2018/04/04/spring-rest-docs-1-2-4-release)
-   In this first [*Spring Tips* installment](https://spring.io/blog/2018/04/04/spring-tips-spring-cloud-stream-kafka-streams) for the year (!!) we look at Spring Cloud Stream Kafka Streams. Apache Kafka Streams supports Spark-like stream processing in your JVM-based code. You manage the clustering, and Kafka manages the rest. You don't need to deploy a dedicated Spark cluster to get the benefits for stream processing with Apache Kafka Streams. Spring Cloud Stream Kafka Streams makes it simple to, in typical, concise Spring Cloud Stream fashion, configure Spring Cloud Streams and Apache Kafka Streams. In this video, we look at some of the details for stream processing including `KStream`s and `KTable`s, joining, serialization and de-serialization, and more.
-   I like this long-ish [article by Adrian Marszałek on reactive microservices with Spring Boot 2 and Kotlin](https://amarszalek.net/blog/2018/04/02/reactive-web-services-kotlin-spring-boot-2/)
-   This is an oldie-but-a-goodie: Andrew Fitzgerald has a nice post on using [Spring Cloud Gateway with a Cloud Foundry route service](https://twitter.com/Fitzoh/status/962462273972441088)
-   There's a lot to love in the new `cf` CLI command. [Check out this blog for all the details](https://www.cloudfoundry.org/blog/cloud-foundry-cli-top-10-tips-updates/). Did you know that the `cf` CLI is now 700% faster in some cases?
-   Simon Moser has put together a [nice history of Cloud Foundry and Kubernetes](https://medium.com/@sdmoser/cloud-foundry-and-kubernetes-a-brief-history-of-cf-k8s-4cf9c1614416). This is a really interesting read!
-   Neo4j evangelist extraordinairre Jennifer Reif has a great post on [using Spring Data Neo4j and Spring Boot](https://t.co/10c8pdsfui?amp=1) - do NOT miss this post!
-   The legendaryy Aboullaite Mohammed has put together a very cool [post on using Spring Boot and the Micrometer project with the TICK stack: Telegrap/InfluxDB/Chronograph/Kapacitor](https://aboullaite.me/spring-boot-metrics-monitoring-using-tick-stack/).
-   I loved this post. It explains how one developer, Andrei Chernyshev, [moved a Kotlin-language based Spring Boot application from JVM 8 to JVM 10](https://itnext.io/java-10-migration-story-cdc65c05bb5a).
-   Spring Security lead Rob Winch has [a great talk up on InfoQ on the reactive bits in Spring Security 5](https://www.infoq.com/presentations/spring-security-3-reactive)
-   Want to speak at [SpringOne Platform 2018](https://springoneplatform.io/cfp)? Submit your talk tout-de-suite! CFP's closing soon!
-   [Project Riff, the function-as-a-service platform from Pivotal, have just announced Riff 0.0.6](https://projectriff.io/blog/announcing-riff-0-0-6/). Get the bits ASAP!
-   Micrometer lead and master-of-metrics Jon Schneider has a great example [of embedding the Netflix Atlas project in a Spring Boot application](https://t.co/mcJkLLfhEB?amp=1)
-   Flowable 6.3.0 release has been [updated to use Spring Boot 2.0](https://blog.flowable.org/2018/04/04/flowable-6-3-0-release/)
-   Java Champion and Java legend Simon Maple has been [blogging about security for Java applications on Cloud Foundry. Check this out!](https://www.cloudfoundry.org/blog/security-corner-snyk-top-six-vulnerabilities-maven-npm/)
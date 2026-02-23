---
title: This Week in Spring - December 14th, 2021
source: https://spring.io/blog/2021/12/14/this-week-in-spring-december-14th-2021
scraped: 2026-02-23T13:01:07.887Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 14, 2021 | 1 Comment
---

# This Week in Spring - December 14th, 2021

_Engineering | Josh Long |  December 14, 2021 | 1 Comment_

Hi, Spring fans! How are you? Welcome to another installment of *This Week in Spring*! I'm doing alright! It's noon as I write this, and I've got GSUG joint presentation with [Matt Raible](https://twitter.com/mraible) later today. Then, tonight at midnight my time to 5 am or 6 am, I'm kicking off a two-day workshop for GOTO! I look forward to seeing ya there! Anyway, we've got a lot to cover so let's dive into it!

-   Read this first! If you've been living under a rock, you may not have heard of the recent Log4J2 vulnerability. If you're using the default, out-of-the-box Spring Boot logging support, then this does *not* apply to you! But, if you are using Log4j2, specifically, then you need to read this post on [Log4j2 and Spring Boot](https://spring.io/blog/2021/12/10/log4j2-vulnerability-and-spring-boot)!
-   [Bruno Borges tweets this very simple workaround for those of you who are using Log4j2 and can't change the startup scripts of your application afflicted by the Log4j2 exploit](https://twitter.com/brunoborges/status/1469426918550245377?s=12)
-   Once you're sure your applications are healthy and happy, check out the new Spring Native 0.11 release! And its new AOT engine, which [brings Spring Native to the Next Level](https://spring.io/blog/2021/12/09/new-aot-engine-brings-spring-native-to-the-next-level).
-   Don't want to read the blog? I did a [Spring Tips (@SpringTipsLive) video](https://twitter.com/SpringTipsLive) you can [watch to see everything new and nice in Spring Native 0.11](https://www.youtube.com/watch?v=DVo5vmk5Cuw&feature=emb_title). This video goes deep, starting with the basics, looking at performance numbers (dramatic reductions in compile-time, startup time, and runtime memory footprint) for some typical workloads, and then looks at the new AOT engine's extension planes.
-   [A Bootiful Podcast: Transformative leader, brilliant technologist, my friend, Patrick Chanezon](https://spring.io/blog/2021/12/09/a-bootiful-podcast-transformative-leader-brilliant-technologist-my-friend-patrick-chanezon)
-   [Secure communications end-to-end for Spring Boot apps – in Zero Trust environment](https://spring.io/blog/2021/12/08/secure-communications-end-to-end-for-spring-boot-apps-in-zero-trust-environment)
-   [Spring Cloud Gateway and gRPC](https://spring.io/blog/2021/12/08/spring-cloud-gateway-and-grpc)
-   [Spring Cloud Square 0.4.0-RC1 is available](https://spring.io/blog/2021/12/14/spring-cloud-square-0-4-0-rc1-is-available)
-   [Spring GraphQL 1.0.0-M4 Released](https://spring.io/blog/2021/12/14/spring-graphql-1-0-0-m4-released)
-   [Spring Native for Serverless Java](https://www.youtube.com/embed/uJwx8km1N2w)
-   [Spring Tools 4 on Twitter](https://twitter.com/springtools4/status/1468665152140685320?s=12)
-   [Spring Tools 4.13.0 released](https://spring.io/blog/2021/12/08/spring-tools-4-13-0-released)
-   [Both Vaadin Flow and Vaadin Fusion versions of the Spring Petclinic sample have joined the Spring Petclinic Community](https://twitter.com/rey_antoine/status/1469686287808737280?s=12)
-   [The amazing Gunnar Hillert has posted the Oracle Coherence Sock Shop Microservices example app for Spring Boot, which adds better Tracing support using Spring Cloud Sleuth for Jaeger and Zipkin. This is based on an original app from Weaveworks.](https://twitter.com/ghillert/status/1468401392570097666?s=12)
-   [Neo4j's Michael Simons has this great tweet: Did you know that Neo4js releases the Neo4j Java driver as a slim option, under the coordinates `org.neo4j.driver`:`neo4j-java-driver-slim`, without shaded dependencies? This might be handy if your project already has a dependency to Project Reactor or Netty.](https://twitter.com/rotnroll666/status/1470007457044967424?s=12)
-   [Microsoft's Rory Preddy tweeted that a demo-heavy Monitoring Java on Azure series is now available. Besides data migration, end-to-end monitoring is the #1 challenge for developers migrating Spring Boot apps to the cloud - in this series, we demystify all!](https://twitter.com/rorypreddy/status/1470090509549023240?s=12)
-   [Now Available: JDK migration guide Includes significant changes & enhancements in #JDK17 ☕️ Move your Java version forward](https://twitter.com/sharat_chander/status/1468849392404811780?s=21)
-   [Piotr Mińkowski has a nice little tip: If you use a dedicated management port for Actuator endpoints starting from Spring Boot 2.6 you may expose a particular health group on the server main port under the additional path. It is useful in #Kubernetes liveness and readiness probes.](https://twitter.com/piotr_minkowski/status/1468874124575580160?s=12)
-   [Tanzu Tuesdays 74 - Carvel support in Kubeapps - New pluggable gRPC-based architecture - YouTube](https://www.youtube.com/watch?v=rS2AhcIPQEs)
-   [Azure Spring Cloud scales #SpringBoot apps to billions of requests per day without the hassle of managing infrastructure. See it in action](https://twitter.com/JavaAtMicrosoft/status/1469017124328730627)
-   [This is a great, video overview of VMware’s free, open-source Kubernetes distro, the Tanzu Community Edition.](https://twitter.com/VMware/status/1468962596879417355)
-   A nice report on the Microsoft Tech Community: [How developers migrate Spring apps to the cloud](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/2021-report-how-developers-migrate-spring-apps-to-the-cloud/ba-p/3021421)
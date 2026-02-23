---
title: This Week in Spring - December 15th, 2020
source: https://spring.io/blog/2020/12/16/this-week-in-spring-december-15th-2020
scraped: 2026-02-23T13:36:56.942Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 16, 2020 | 0 Comments
---

# This Week in Spring - December 15th, 2020

_Engineering | Josh Long |  December 16, 2020 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! Can you believe it's already December 15th? Me either! Another few weeks and this soul annhilating year will be over with and we'll be staring down 2021 filled with new hopes and possibilities! How are you? (Have you dipped into the eggnog yet?) I'm doing alright, thanks! I've been busy, as usual.

Most of that was fun stuff. But, some of that, I confess, was a mess of my own making. I spent Monday cleaning up a fire I'd set for myself. You see, I got a little sloppy with last week's podcast episode. Last week, I was editing the audio for an episode with Spring Batch colead Mahmoud Ben Hassine and - in the middle of that - was pushing an interview I'd done with Dion Almaer out the door for publication that week. So, two episodes: one with Dion, one with Mahmoud. Dion was slated for last week. Mahmoud's was slated for a future week. On top of that I've been toiling night and day it feels like on [the production pipeline for my podcasts](http://github.com/bootiful-podcast), living that `kubectl apply -k $WORKING_DIR` life, and I was tired of some of the issues still lingering but figured I could, basically trust the system. So I published the episode with Dion. I got everything right, *except* the interview was with Mahmoud. Not Dion. So it said Dion. But I'd accidentally sent out the wrong episode. Awkward. Worse, after I published that episode, figuring I had a week to make a mess before I'd next have to publish an episode, I started making a mess of the codebase. I broke stuff. Would've been no big deal. I would've sorted it out! But yesterday, Monday, I realize people are complaining that I'd bungled the audio: published the preface and description for Dion but published the audio interview with Mahmoud. So I raced to fix it, except production was down! So I spent Monday dodging between meetings and calls and trying to get the system restored. I finally got the system on its feet again late last night - both episodes with the correct titling and audio and links and photos went out and it was good. Thank you so much for your patience, community. I have egg on my face.

Anyway, everything's fine now. I'm not gonna touch a thing until the new episode, due later this week, rolls out! And, bonus, you get not one, but *two* episodes this week: I published both episodes last night. So, in total, you'll get three episodes in a seven-day period, not one. Huzzah.

This morning I had the privilege of speaking at the Warsaw JUG at their last meeting for the year. Thank you so much for a lively crowd and a wonderful event, Warsaw!

Now then, we've got a lot of good stuff to get to this week so, without further ado...

-   [A Bootiful Podcast: Spring Batch co-lead Mahmoud Ben Hassine](https://spring.io/blog/2020/12/15/a-bootiful-podcast-spring-batch-co-lead-mahmoud-ben-hassine)
-   [A Bootiful Podcast: open-web legend Dion Almaer](https://spring.io/blog/2020/12/14/a-bootiful-podcast-open-web-legend-dion-almaer)
-   [A dirty hack to ease the usage of Log4J2 in Spring Boot](https://blog.frankel.ch/hack-ease-usage-log4j2-spring-boot/)
-   [Case Study: Change Data Capture (CDC) Analysis with CDC Debezium source and Analytics sink in Real-Time](https://spring.io/blog/2020/12/14/case-study-change-data-capture-cdc-analysis-with-cdc-debezium-source-and-analytics-sink-in-real-time)
-   [Cloud Events and Spring - part 1](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1)
-   [Correct usage of LoadbalanceRSocketClient with Spring's RSocketRequester - Stack Overflow](https://stackoverflow.com/questions/65254112/correct-usage-of-loadbalancersocketclient-with-springs-rsocketrequester/65268468#65268468)
-   [Episode 9 “Project Panama - The Foreign Memory Access API” with Maurizio Cimadamore and Jorn Vernee](https://inside.java/2020/12/11/podcast-009/)
-   [Expedia Group: Bootiful APIs With GraphQL and Kotlin – Kotlin Blog | JetBrains](https://blog.jetbrains.com/kotlin/2020/12/expedia-group-bootiful-apis-with-graphql-and-kotlin/)
-   [First milestone of Spring Data 2021.0.0 released](https://spring.io/blog/2020/12/09/first-milestone-of-spring-data-2021-0-0-released)
-   [Kotlin Belfast User Group (KBUG) on Twitter: "In lieu of a Dec event please accept our Kotlin Christmas Stocking. 16 sets of recommendations, from recognised experts, to improve your @kotlin coding. We hope you enjoy. Thanks to all our contributors. Merry](https://twitter.com/KotlinKbug/status/1337328725348716546)
-   [Kubernetes 1.20: Q&A with Release Lead and VMware Engineer Jeremy Rickard](https://www.infoq.com/news/2020/12/kubernetes-120-rickard/)
-   [Reactive Summit 2020: Josh Long, Bootiful RSocket - YouTube](https://www.youtube.com/watch?v=cEjU6-WOb3Q&list=PLKKQHTLcxDVbJtlef15003TYaEkq1ZY8c&index=15)
-   [Salt Enhances a Number of Key Open Source Projects](https://blogs.vmware.com/opensource/2020/12/09/salt-open-source-projects/)
-   [Scaling Secure Applications with Spring Session and Redis | Okta Developer](https://developer.okta.com/blog/2020/12/14/spring-session-redis)
-   [Spring Boot 2.2.12 available now](https://spring.io/blog/2020/12/10/spring-boot-2-2-12-available-now)
-   [Spring Boot 2.3.7 available now](https://spring.io/blog/2020/12/11/spring-boot-2-3-7-available-now)
-   [Spring Boot 2.4.1 available now](https://spring.io/blog/2020/12/11/spring-boot-2-4-1-available-now)
-   [Spring Cloud 2020.0.0-RC1 (aka Ilford) Is Available](https://spring.io/blog/2020/12/15/spring-cloud-2020-0-0-rc1-aka-ilford-is-available)
-   [Spring Cloud Config for Shared Microservice Configuration | Okta Developer](https://developer.okta.com/blog/2020/12/07/spring-cloud-config)
-   [Spring Cloud Config for Shared Microservice Configuration | Okta Developer](https://developer.okta.com/blog/2020/12/07/spring-cloud-config?fbclid=IwAR05sW4ucHtjyqKIpzFn7OS6tjaaYzj86Ll3Y1aaUPi-X1HhztW_uix3BAs)
-   [Spring Cloud Data Flow for Kubernetes 1.2 is now available for desert](https://tanzu.vmware.com/content/blog/spring-cloud-data-flow-for-kubernetes-1-2-offers-real-time-alerts-and-new-dashboard)
-   [Spring Data 2020.0.2, Neumann-SR6, and Moore-SR12 available](https://spring.io/blog/2020/12/09/spring-data-2020-0-2-neumann-sr6-and-moore-sr12-available)
-   [Spring Framework 5.3.2, 5.2.12, 5.1.20, 5.0.20, and 4.3.30 available now](https://spring.io/blog/2020/12/09/spring-framework-5-3-2-5-2-12-5-1-20-5-0-20-and-4-3-30-available-now)
-   [Spring Statemachine 3.0.0-RC1 Released](https://spring.io/blog/2020/12/11/spring-statemachine-3-0-0-rc1-released)
-   [Spring Vault 2.2.3.RELEASE available](https://spring.io/blog/2020/12/10/spring-vault-2-2-3-release-available)
-   [Spring Vault 2.3.0 RC1 available](https://spring.io/blog/2020/12/10/spring-vault-2-3-0-rc1-available)
-   [Testing Spring Cloud Stream Applications - Part 1](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-1)
-   [Testing Spring Cloud Stream Applications - Part 2](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-2)
-   [vSphere With Tanzu DDS - Ep 5 - Exploring a Tanzu Kubernetes Cluster - YouTube](https://www.youtube.com/watch?app=desktop&v=rWNYPRxihno)
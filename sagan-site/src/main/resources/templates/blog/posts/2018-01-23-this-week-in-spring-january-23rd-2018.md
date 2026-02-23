---
title: This Week in Spring - January 23rd, 2018
source: https://spring.io/blog/2018/01/23/this-week-in-spring-january-23rd-2018
scraped: 2026-02-23T16:11:09.193Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 23, 2018 | 1 Comment
---

# This Week in Spring - January 23rd, 2018

_Engineering | Josh Long |  January 23, 2018 | 1 Comment_

Hi Spring fans! Welcome to another installment of *This Week In Spring*. This week I'm in Los Angeles (warm!) talking to customers and then it's off to Chicago (not warm!). There's so much good stuff to cover this week so let's get to it!

-   In PCF 2.0, the application runtime is now joined by an enterprise-grade Kubernetes service, called Pivotal Container Service, and a new Functions-as-a-Service offering, Pivotal Function Service. [Pivotal's Jared Ruckle joins Jeff and Dormain for a look at PCF 2.0 in this new podcast](https://content.pivotal.io/podcasts/pcf-2-0-brings-kubernetes-functions-to-the-pivotal-platform-ep-54?_lrsc=8640ca61-b02e-473e-8be9-a376c2d951ed)
-   [Spring Cloud Sleuth now integrates with Brave](https://github.com/spring-cloud/spring-cloud-sleuth#distributed-tracing-with-brave) and it's an exciting time for distributed tracing.
-   Spring Cloud Vault lead Mark Paluch [has integrated Spring Security with Spring Cloud Vault](https://github.com/spring-projects/spring-vault/commit/28ff17d4f8cbd09114bb9f2a841ac51aa24402bc)
-   It's been a busy wek for the Spring Cloud Sleuth team! This commit makes [Spring Cloud Sleuth OpenTracing-compatible](https://github.com/spring-cloud/spring-cloud-sleuth/commit/22d91bac247e8273fa93ffe05f50179182425f72)
-   Support for [integrating Micrometer (think SLF4J, but for metrics) with Jersey 2 (a JAX-RS implementation) has just landed](https://github.com/micrometer-metrics/micrometer/pull/228)!
-   The [new release of AWS' Java container for serverless](https://github.com/awslabs/aws-serverless-java-container/releases/tag/aws-serverless-java-container-0.9) supports activation [of Spring profiles](https://github.com/awslabs/aws-serverless-java-container/issues/88). Anyway, this is cool. But use [Spring Cloud Function and the AWS adapter](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-adapters/spring-cloud-function-adapter-aws); it's a cleaner integration.
-   The Spring Boot support for VS Code [features in this week's installment of "Azure Fridays"](https://twitter.com/azurefriday/status/955593853888733184?ref_src=twcamp%5Eshare%7Ctwsrc%5Eios%7Ctwgr%5Ecom.blork.Pinner.AddBookmarkExtension)
-   This is [an interesting list of ten books people building microservices and cloud native applications should read](http://techprehension.com/2018/01/21/10-must-read-books-for-every-micro-services-and-cloud-native-professional/). I'm pleased that the book, *Cloud Native Java*, is in the list.
-   Paweł Urban has a nice post on how [to receive Spring Boot error alerts by email with Logstash](https://medium.com/@urbanpawel/receive-spring-boot-exception-alerts-via-email-using-logstash-c29b83368275)
-   Spring Boot lead Phillip Webb [tweeted on the exciting progress of Spring Boot 2.0 so far](https://twitter.com/springcentral/status/955516012383813632): there have been 17 weeks work, 6099 commits, and 1153 issues closed! WOW!
-   This is a great look at [Java's service loader mechanism](https://javax0.wordpress.com/2018/01/10/java-9-module-services/), and in particular it looks at how the service loader mechanism in Java 9 modules works. It also looks, incidentally, at how Spring itself does component scanning on the classpath.
-   Spring Test lead and JUnit project lead Sam Brannen [has just debuted support for programmatic extension registration via @RegisterExtension in the upcoming #JUnit 5.1 release](http://junit.org/junit5/docs/snapshot/user-guide/#extensions-registration-programmatic)! This bodes well for future integrations in Spring projects like Spring REST Docs. JUnit 5 is an exciting horizon for application developers. Learn more about it [by watching Sam's JavaOne 2017 talk](https://www.youtube.com/watch?time_continue=1&v=-mIrA5cVfZ4)
-   This isn't specifically to do with Spring, itself, [but it's an interesting look at the differences between immutable and unmodifiable in the upcoming JDK 10](http://marxsoftware.blogspot.de/2018/01/schopenhauers-law-immutability.html?m=1). Check it out!
-   [This is an oldie-but-a-goodie](https://blog.takipi.com/pivotal-cloud-foundry-vs-kubernetes-choosing-the-right-cloud-native-application-deployment-platform/?_lrsc=a9da2d09-785e-40fd-bb30-d5762c6c5848): it looks at when to choose Pivotal Cloud Foundry, Kubernetes, or both.
-   Richard Seroter and Jeff Hammond's SpringOne Platform 2017 talk [introducing Pivotal Cloud Foundry 2.0 is now up on InfoQ](https://www.infoq.com/presentations/pcf-2-future)
-   The Spring Data team has contributed a [lot of small improvements to the JQAssistant project plugin for Spring](https://github.com/buschmais/jqa-spring-plugin/pull/15). [JQAssistant](https://jqassistant.org/) supports scanning and validating Java-based projects. This new support looks very promising.
-   What should [your monitoring architecture include](http://bit.ly/2mLVHtq)? Cloud Foundry talks all about it in the 2018 Dzone Guide to #DevOps
-   Hibernate ORM 5.3.0.Beta1 has been [released with support for #JPA 2.2.](http://in.relation.to/2018/01/18/hibernate-orm-530-beta1-release/)
-   Dr. Mark Pollack just [announced Spring Cloud Skipper 1.0 RC1](https://twitter.com/springcentral/status/954397044302426114).
-   This Polish-language look at [Spring Cloud Contract looks very interesting](https://codecouple.pl/2018/01/19/26-spring-boot-consumer-driven-contract/)
-   [@pivotal tweeted](https://twitter.com/pivotal/status/953694959378448385): 'Maybe we should regularly play a "Where in the world is @starbuxman?" game in 2018?' Indeed, 2018 is starting to move in gear and I'll be bringing Spring wherever I can. [Find me in these cities](https://twitter.com/starbuxman/status/953577456492937216)
-   Spring Cloud ninja Ryan Baxter just announced [Spring Cloud Edgware Service Release 1 (SR1) has been released.](https://twitter.com/springcentral/status/953690920595070976). The new release is jam-packed with new released. Check 'em out!
-   This post - introducing Spring Boot - was voted one [of IBM DeveloperWorks' top 2017 posts](https://www.ibm.com/developerworks/java/library/j-spring-boot-basics-perry/index.html)
-   Spring Data lead [Oliver Gierke celebrates the tenth anniversary](https://github.com/synyx/hades/commit/09d2f72) of the first commits that would eventually become Spring Data JPA. Happy birthday Spring Data JPA (then called "Hades")!!
-   Project Reactor lead Simon Baslé introduces better error handling, an upcoming feature of Reactor 3.2, [that's now available in milestone releases](https://twitter.com/springcentral/status/953350596857229312)
-   Check out the new [Spring Session for Apache Geode and Pivotal Gemfire releases](https://twitter.com/springcentral/status/953348839125131264)!
-   Get trained on Cloud Foundry in this *free* [Cloud Foundry course offered by the Linux Foundation](https://www.edx.org/course/introduction-cloud-foundry-cloud-native-linuxfoundationx-lfs132x#!?_lrsc=3b7be921-f2cf-4716-9876-e5a96fdc824f&utm_source=employee-social&utm_medium=twitter&utm_campaign=employee_advocacy)
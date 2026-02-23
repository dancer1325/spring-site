---
title: This Week in Spring - July 3rd, 2018
source: https://spring.io/blog/2018/07/03/this-week-in-spring-july-3rd-2018
scraped: 2026-02-23T15:20:00.503Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 03, 2018 | 0 Comments
---

# This Week in Spring - July 3rd, 2018

_Engineering | Josh Long |  July 03, 2018 | 0 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I'm fresh of the amazing Spring Connect São Paulo event and speaking with some customers, and now I'm in beautiful Rio de Janeiro soaking up the winter rays by he beach, connecting with people in the community, and delivering a (virtual!) 2 day live training course for O'Reilly on building cloud-native Java-based applications. In less than two days I'll be home for the first time in almost a month to celebrate the 4th of July. If you're in America, let me be the first to wish you a happy holiday. As usual, we've got a ton of things to dive into so I'll leave you to it. Let's get going.

-   Our very own Josh McKenty has a wonderful post, [*Why I Love Redis*](https://content.pivotal.io/blog/why-i-love-redis)
-   If you're in the Seattle area don't miss this wonderful Spring and [cloud-native bootcamp done in cooperation with Pivotal, Microsoft and Perficient](https://connect.pivotal.io/Java-Spring-Cloud-Native-Bootcamp-Seattle.html)
-   This is promising! This issue [means that you can now use a reactive `WebClient` and have it automatically obtain a new OAuth access token](https://github.com/spring-projects/spring-security/issues/4371#issuecomment-401914335) on your behalf using a `refresh` token.
-   [Spring Cloud Edgware.SR4 Has Been Released](https://spring.io/blog/2018/07/02/spring-cloud-edgware-sr4-has-been-released)
-   [Spring Cloud Open Service Broker 2.0.0.RELEASE is now available](https://spring.io/blog/2018/07/02/spring-cloud-open-service-broker-2-0-0-release-is-now-available)
-   [Spring Cloud Task 1.2.3.RELEASE is now available](https://spring.io/blog/2018/07/02/spring-cloud-task-1-2-3-release-is-now-available)
-   Hurray! PKS (our enterprise-grade Kubernetes distribution) 1.1 is [now available](https://content.pivotal.io/blog/pivotal-container-service-1-1-now-ga-helps-you-run-kubernetes-without-complexity-why-pks-just-works)
-   [Spring Cloud Stream Fishtown.M1 /2.1.0.M1 Release Announcement](https://spring.io/blog/2018/06/28/spring-cloud-stream-fishtown-m1-2-1-0-m1-release-announcement)
-   [Spring Cloud GCP 1.0.0.RC1 Now Available](https://spring.io/blog/2018/06/28/spring-cloud-gcp-1-0-0-rc1-now-available)
-   We also have an opening on [the Spring reliability engineering team](https://pivotal.io/careers/openings/senior-software-engineer-spring-engineering-team/1223475)
-   We have an opening on [the Spring Cloud Services team](https://pivotal.io/careers/openings/software-engineer-spring-cloud-services/680482) - join us!
-   Codecentric have [updated their Spring Batch starter to 2.0.1](https://blog.codecentric.de/en/2018/06/batch-web-spring-boot-starter-2-0-1-released/). This starter goes further than Spring Boot's built-in stater and adds a lot of useful functionality that you'd do well to consider when using Spring Batch.
-   Our very own Mario Gray does a wonderful job looking at [reactive authentication and authorization with Spring Security](https://medium.com/@mgray_94552/reactive-authorization-in-spring-security-943e6534aaeb)
-   Interesting [insight from the Zipkin project](https://twitter.com/zipkinproject/status/1013981608611680257) twitter handle: 1) authorization services often blamed for latency, even though getting security services in your traces is a win for transparency. Also, errors are two-sided: ideally, visualize HTTP 400 as success from server point-of-view to better aim blame.
-   Vojtech Ruzicka's done a nice job looking at detecting build version and time at [runtime in Spring Boot](https://www.vojtechruzicka.com/spring-boot-version/)
-   *The Foundry* is a gateway to the Cloud Foundry ecosystem [of ISVs, distributions, consulting and so much more](https://www.cloudfoundry.org/thefoundry/)
-   This blog looks at [Spring WebFlux and the RxJava2JDBC project](https://medium.com/netifi/spring-webflux-and-rxjava2-jdbc-83a94e71ba04)
-   With MongoDB 4.0 GA, [here's what you need to know for multi-document ACID transactions with Spring Data MongoDB](https://twitter.com/springcentral/status/1012495018068594699).
-   Microsoft's Yitao Dong just announced that the Spring Boot starter for Microsoft Azure Active Directory is now integrated with Spring Security 5. With only a few lines of configuration, you can build apps that [perform authentication with Azure Active Directory OAuth2 and manage authorization with AAD groups](https://twitter.com/matthew_dyt/status/1012174445505536000?s=12)
-   Community legend Nicolas Frankel has a nice pokst on \_how to migrate an app [from Spring Boot 1.5's metrics subsystem to Micrometer-based metrics](https://blog.frankel.ch/metrics-spring-boot-2/1/)
-   Check out Jen Strater's Warsaw JUG talk on test [driven documentation with Spring REST Docs](https://speakerdeck.com/jlstrater/test-driven-docs-warsaw-jug-2018)
-   Former SpringSource CTO Adrian Colyer runs a wonderful series called *The Morning Paper*. In this post [he looks at secure coding practices in Java and the challenges](https://blog.acolyer.org/2018/06/27/secure-coding-practices-in-java-challenges-and-vulnerabilities/) therein. Surprise, surprise: Spring Security is, and has always been, a very popular choice for people trying to address these problems.
-   Check out Andy Wilkinson's Spring I/O 2018 talk ["Mastering Actuator"](https://www.youtube.com/watch?v=lW3aN-7izCY&feature=youtu.be)
-   Check out Dr. Dave Syer's Spring I/O 2018 talk [*Serverless Spring*](https://www.youtube.com/watch?v=TDEVSnjnSR8&feature=youtu.be)
-   [JUnit 5.3 M1 is out](https://junit.org/junit5/docs/5.3.0-M1/release-notes/)! Please try out the new parallel test execution support and provide feedback *before* the 5.3 GA release!
-   Does your Kotlin backend use Project Reactor? Good news! The functional composition library, [Aarrow, now has support for Project Reactor](https://github.com/arrow-kt/arrow/pull/706), including async/await syntax for `Flux` and `Mono`
-   Don't miss [the training](https://springoneplatform.io/2018/training) for Spring Boot and Spring Cloud at [this year's SpringOne Platform 2018](https://springoneplatform.io/)
-   Check out this upcoming Cloud Foundry webinar on July 18, [*Bring Your Own Code vs. Bring Your Own Container*](https://www.brighttalk.com/webcast/16813/327047)
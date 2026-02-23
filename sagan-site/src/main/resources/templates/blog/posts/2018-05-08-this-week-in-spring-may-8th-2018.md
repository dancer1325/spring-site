---
title: This Week in Spring - May 8th, 2018
source: https://spring.io/blog/2018/05/08/this-week-in-spring-may-8th-2018
scraped: 2026-02-23T15:25:49.053Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 08, 2018 | 0 Comments
---

# This Week in Spring - May 8th, 2018

_Engineering | Josh Long |  May 08, 2018 | 0 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I'm in Manchester, UK, for an appearance at the [Manchester JUG](https://www.meetup.com/ManchesterUK-Java-Community/events/248184150/) and then it's off to London, UK, for some customer visits and [the epic Devoxx UK event](https://www.devoxx.co.uk/). This time next week I'll be in [Denver, USA, for the SpringOne Tour event](https://springonetour.io/2018/denver). If you're in any of these places, as usual, don't hesitate to [reach out and say hi (@starbuxman)](http://twitter.com/Starbuxman)

-   Missed an installment of *This Week in Spring*? Well, have no fear there's now a monthly aggregation of the weekly aggregation! [Here's the April edition](https://content.pivotal.io/blog/this-month-in-spring-may-2-2018)
-   Dormain Drewitz swoops in for the kill with this *epic* announcement: Pivotal and Confluent are teaming up [to make Pivotal's Kubernetes environment, PKS, the best place to run Confluent Kafka](https://content.pivotal.io/blog/operationalizing-apache-kafka-on-kubernetes-pivotal-and-confluent-team-up)
-   Spring Framework luminary Stéphane Nicoll just [announced Spring Framework .3.17 and 5.0.6](https://spring.io/blog/2018/05/08/spring-framework-4-3-17-and-5-0-6-available-now)
-   Spring Data legend Mark Paluch just announced the [release of Spring Data Ingalls SR12 and Kay SR7](https://spring.io/blog/2018/05/08/spring-data-ingalls-sr12-and-kay-sr7-released). These releases are, as usual, *packed* with new releases!
-   Spring Batch and Spring Cloud Task lead [Michael Minella has just announced Spring Cloud Task 2.0.0.RELEASE](https://spring.io/blog/2018/05/07/spring-cloud-task-2-0-0-release-is-now-available). The new release updates dependencies, supports restricts concurrent task execution, and refined behavior when a failed batch job execution fails a task.
-   The Pivotal blog looks [at state management with Spring Session](https://content.pivotal.io/blog/why-is-session-state-management-so-hard-with-spring-session-it-doesnt-have-to-be).
-   In last week's *Spring Tips*, I looked at using the new metrics collection [facade *Micrometer* in the Actuator in Spring Boot 2](https://spring.io/blog/2018/05/02/spring-tips-metrics-collection-in-spring-boot-2-with-micrometer). Check it out!
-   BOSH is an abstraction layer that lets you describe immutable infrastructure in a IaaS-agnostic way. There are BOSH providers for AWS, GCP, Azure, OpenStack, VSphere, and a zillion other service providers. Cloud Foundry, which is optimized for the management of applications, builds on top of BOSH. This allows for its unparalleled portability. Now, [there is a Kubernetes BOSH CPI](https://github.com/bosh-cpis/bosh-kubernetes-cpi-release). This is *very* promising!
-   *The New Stack* looks at T-Mobile's ushering [in of 5G with Tibco and CloudFoundry](https://thenewstack.io/how-t-mobile-is-ushering-in-5g-with-tibco-and-cloud-foundry/)
-   Check out senior Spring fan Matt Raible's ["The Hitchhiker's Guide to Testing Spring Boot APIs and Angular Components with WireMock, Jest, Protractor, and Travis CI"](https://developer.okta.com/blog/2018/05/02/testing-spring-boot-angular-components) over on the Okta blog.
-   Pivotal Principal Technologist Jim Weaver looks at [reactive programming with this *amazing* demo](https://www.youtube.com/watch?v=Dk5ReiVQTaM).
-   I love this post! It's got nothing to do with Spring, *but* you'll probably want to read it if you're an aspiring cloud-native. It's a post from folks at Pivotal on the soft touch reconfigurations that they made to the use of public cloud IaaS resources [to save as much as $675,000 per year](https://builttoadapt.io/how-to-save-a-fortune-on-cloud-infrastructure-5ff418c7658c).
-   [https://twitter.com/springframework/status/993844928915623936](https://twitter.com/springframework/status/993844928915623936)
-   The Swisscom blog looks at the power of buildpacks. Buildpacks stage an environment for a particular type of application workload that then gets turned into a container that then is run on [a platform like Heroku or Cloud Foundry](https://ict.swisscom.ch/2018/05/blog-buildpack-security/)
-   The Baeldung has a nice post that looks at [the `Assert` class in Spring Framework](http://www.baeldung.com/spring-assert). Short and sweet!
-   This E4Developer blog looks into [Spring Data and its various applications](https://www.e4developer.com/2018/05/05/spring-data-microservices-data-companion/) in the world of microservices.
-   This isn't related to Spring, *per se*, but it's interesting; it's a post on the jOOQ blog that looks at the different [ways to reflectively access default methods on interfaces in Java 8, 9 and 10.](https://blog.jooq.org/2018/03/28/correct-reflective-access-to-interface-default-methods-in-java-8-9-10/)
-   Community comrade Michael Simons does a nice job [introducing reactive Spring in this German language post](https://www.informatik-aktuell.de/entwicklung/programmiersprachen/4-jahre-spring-boot.html)
-   Pivotal Principal Technologist Mario Gray looks at websockets, complete with a Spring-based demo. [This is well worth a read and bookmark!](https://medium.com/@mgray_94552/reactive-web-sockets-with-spring-5-3beef359a85b)
-   Pivotal Principal technologist Jakub Pilimon has put together a nice post [on testing distributed message-driven applications with Spring](http://pillopl.github.io/testing-messaging/). It iterates, starting from the lowest level primitives in Spring's messaging support and then moving to Spring Cloud Contract. This is an *awesome* post - read it!
-   Community patron Nicolas Frankel has a nice post [on checking the quality of Kotlin code](https://blog.frankel.ch/check-quality-kotlin-code/) with Detekt and SonarQube. If you're a Spring devloper writing your code in Kotlin, you might like this.
-   Speaking of testing messaging code, Clinton Magro put together Spring Boot autoconfiguration and starter that lets [you embed the Qpid AMQP-compatible broker](https://github.com/clintonmagro/embedded-qpid-spring-boot-starter) for, among other things, ease of testing
-   [twitter.com](https://twitter.com/jmckenty/status/992527387479818242?s=12)
-   Piotr Szybicki looks at [performance testing Angular and Spring applications secured with Keycloak using Gatlin](https://medium.com/12-developer-labors/performance-testing-angular-spring-app-secured-with-keycloak-using-gatling-1-2-98dfa55bd565). This is the first of two worth-a-read posts.
-   The Java Mission Control application - your one-stop-shop for debugging and diagnostics of Java applications that has historically shipped in Oracle's JDK - [is now open source](http://hg.openjdk.java.net/jmc)! Hurray!
-   Spring Data's Christoph Strobl [teased some of the new transaction support in Spring Data MongoDB](https://twitter.com/stroblchristoph/status/992357037362249728?s=12)
-   Last week Pivotal and Confluent announced a partnership to bring Kafka to Pivotal's Kubernetes environment and I hope you'll forgive my indulgent reminder that you'll probably love this oldie-but-a-goodie [Spring Tips video on Spring Cloud Stream and Kafka Streams](https://www.youtube.com/watch?v=YPDzcmqwCNo&app=desktop)
-   Microservices thought leader (I'm not being ironic!) Daniel Bryant has put together a table that looks at the [steps to cloud-native for both developers and platforms](https://articles.microservices.com/developer-workflow-trail-for-cloud-native-applications-request-for-feedback-a9365b64c790)
-   Rajagopal ParthaSarathi looks at [parallel processing with Spring Batch](https://examples.javacodegeeks.com/enterprise-java/spring/batch/spring-batch-parallel-processing-example/)
-   This is pretty cool - the Oracle Devs blog [has a nice post on distributed tracing infrastructure with OpenZipkin](https://medium.com/oracledevs/setup-a-distributed-tracing-infrastructure-with-zipkin-kafka-and-cassandra-d0a68fb3eee6), Apache Kafka, and Apache Cassandra. It even uses Spring!
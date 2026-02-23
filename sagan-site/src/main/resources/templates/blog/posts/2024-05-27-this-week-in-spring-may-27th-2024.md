---
title: This Week in Spring - May 27th, 2024
source: https://spring.io/blog/2024/05/27/this-week-in-spring-may-27th-2024
scraped: 2026-02-23T08:37:05.777Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 27, 2024 | 0 Comments
---

# This Week in Spring - May 27th, 2024

_Engineering | Josh Long |  May 27, 2024 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! And what a week it will be! I'm in Venice, Italy, on a little vacation, but tomorrow I begin a quick journey to beautiful Sofia, Bulgaria, where I'll be speaking at the amazing [JPrime](https://jprime.io) software show (it's my first time speaking there, though not even my 20th time speaking in Bulgaria!). I'm so looking forward to it.

Then, I turn right back around and head to Barcelona, Spain, for the not-to-be-missed Spring IO event! I love Spring IO, and you should too! It is, in my estimation, *the* premier Spring event in EMEA and an amazing opportunity to learn about the latest and greatest in the wide and wonderful world of Springdom. Will you be there? I hope so!

As always, it's that time of year when we have a ton of new releases leading up to and including the latest Spring Boot installment, Spring Boot 3.3, which just dropped a few days ago! It has a *ton* of exciting features, including:

-   Jersey observability
-   Flyway 10
-   Infinispan 15
-   CDS support
-   Observability improvements: for example, support for Micrometer's @SpanTag, a process InfoContributor, and Prometheus 1.x support
-   Spring Security improvements
-   Virtual threads-aware WebSocket support
-   Base64 resources
-   SBOM Actuator Endpoint
-   Bitnami container images
-   Service connections for LDAP, ActiveMQ, Artemis
-   Embedded web server SSL with SNI
-   Much improved documentation!
-   A ton of new dependency upgrades

For more, obviously, [feel free to check the release notes](https://t.co/4CUNuoJ1ms).

Of note, of course, [is that Spring Boot 3.1 and earlier are now no longer under open-source support, so be sure to upgrade!](https://spring.io/projects/spring-boot#support).

I feel like this super cute dog that my partner Tammie found in Sicily must feel: happy to be in the mix!

![](https://pbs.twimg.com/media/GOSBe6JXEAAEHlA?format=jpg&name=medium)

So, as you can imagine, we've got a *ton* of things to get into, so let's dive right into it! It all just makes me so happy!

-   [Spring Boot 3.3 was released!](https://spring.io/blog/2024/05/23/spring-boot-3-3-0-available-now)
-   [Spring Modulith 1.2, 1.1.5, and 1.0.8 released](https://spring.io/blog/2024/05/24/spring-modulith-1-2-1-1-5-and-1-0-8-released). This latest release, 1.2, depends on Spring Boot 3.3
-   Spring Boot teammate Moritz Halbritter has a nice post on the new [SBOM (software bill-of-materials) support in Spring Boot 3.3](https://spring.io/blog/2024/05/24/sbom-support-in-spring-boot-3-3)
-   In last week's installment of *A Bootiful Podcast*, I talked to JetBrains' [Tagir Valeev, a fellow Java Champion and IntelliJ IDEA Java legend](https://spring.io/blog/2024/05/23/a-bootiful-podcast-tagir-valeev-fellow-java-champion-and-intellij-idea-java)
-   I love this blog by community legend Simon Verhoeven on the top seven (yes, it's a listicle, but it's really good!) [observability improvements in Spring Boot 3.3](https://digma.ai/spring-boot-3-3-observability-enhancements/)
-   Also, there's a [new service release of Spring Boot, 3.2.6](https://spring.io/blog/2024/05/23/spring-boot-3-2-6-available-now)
-   [Spring Boot 3.1.12 is also available](https://spring.io/blog/2024/05/23/spring-boot-3-1-12-available-now)
-   [Spring Framework 6.2.0-M3 is available now](https://spring.io/blog/2024/05/22/spring-framework-6-2-0-m3-available-now). [Be sure to check out the *What's New* page here](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62)
-   [Spring Framework 6.1.8, 6.0.21, and 5.3.36 are also available now](https://spring.io/blog/2024/05/22/spring-framework-6-1-8-6-0-21-and-5-3-36-available-now)
-   [Spring Integration 6.3, 6.2.5, and 6.1.9 are available](https://spring.io/blog/2024/05/22/spring-integration-6-3-available-also-6-2-5-and-6-1-9)
-   [Spring Batch 5.0.6, 5.1.2 available now](https://spring.io/blog/2024/05/22/spring-batch-5-0-6-and-5-1-2-available-now)
-   [Spring Authorization Server 1.3 Goes GA](https://spring.io/blog/2024/05/22/spring-authorization-server-1-3-goes-ga)
-   [Spring Session 3.3 goes GA](https://spring.io/blog/2024/05/21/spring-session-3-3-goes-ga)
-   Good stuff for Azure Spring Apps users in this new blog: [Deploy and Scale Spring Batch in the Cloud - with Adaptive Cost Control](https://spring.io/blog/2024/05/21/deploy-and-scale-spring-batch-in-the-cloud-with-adaptive-cost-control)
-   [Spring Security 6.3.0 goes GA](https://spring.io/blog/2024/05/21/spring-security-6-3-0-goes-ga)
-   [Spring for GraphQL 1.3.0 Released](https://spring.io/blog/2024/05/21/spring-for-graphql-1-3-0-released)
-   [Spring for Apache Kafka 3.2.0, 3.1.5, and 3.0.17 available now](https://spring.io/blog/2024/05/21/spring-for-apache-kafka-3-2-0-3-1-5-and-3-0-17-available-now)
-   [The documentation for HashiCorp Vault now includes a section on reloading passwords with Spring Cloud `@RefreshScope`](https://developer.hashicorp.com/vault/tutorials/app-integration/spring-reload-secrets)
-   This JetBrains blog by Aleksey Stukalov and Catherine Edelveis offers [a nice look at IntelliJ IDEA's insights from the Spring Boot point of view](https://blog.jetbrains.com/idea/2024/05/java-runtimes-insights-from-the-spring-boot-point-of-view/)
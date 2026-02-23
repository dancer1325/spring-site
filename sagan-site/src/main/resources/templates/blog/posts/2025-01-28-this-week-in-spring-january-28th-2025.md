---
title: This Week in Spring - January 28th, 2025
source: https://spring.io/blog/2025/01/28/this-week-in-spring-january-28th-2025
scraped: 2026-02-23T07:54:26.331Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 28, 2025 | 0 Comments
---

# This Week in Spring - January 28th, 2025

_Engineering | Josh Long |  January 28, 2025 | 0 Comments_

Hi, Spring fans! Welcome to another rip-roarin' and exciting installment of *This Week in Spring*, wherein we look at the amazing week that was in the Spring community. And what a week it's been! In addition to tons of cool tooling and AI related stuff, this week saw the release of the first steps towards Spring Framework 7.0 and Spring Boot 3.5. Spring Framework 7.0, of course, is also the foundation upon which Spring Boot 4.0 will be based. So, that's exciting! Let's dive right in!

-   Exciting news from Michael Minella: we're now [publishing milestones to Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).
-   [Spring Data 2025.1.M1 is out!](https://spring.io/blog/2025/01/24/spring-data-2025). This is the first milestone in the 2025.1.0 line and has tons of nice new changes. It raises the baseline to Jakarta EE 11 (which includes Hibernate ORM 7 and Hibernate Validator 9) and Kotlin 2.x. This release also finally does away with long-deprecated features like `ListenableFuture`. Spring Data JPA has seen major changes! Derived queries now use JPQL (not the `Criteria` API, as before), resulting in much faster performance thanks to Hibernate Query Structure Caching.
-   [One of my favorite projects, Spring Modulith, has several new releases](https://spring.io/blog/2025/01/24/spring-modulith-1-2-3-1-3-2-and-1-4-m1-released): 1.2.8, 1.3.2, and 1.4 M1. It includes much better integration with observability, upgrades to Spring Boot 3.5 M1, uses Structurizr 3.1, and more.
-   [In last week's installment of *A Bootiful Podcast*](https://spring.io/blog/2025/01/23/a-bootiful-podcast-billy-korando), I talked to Oracle Java Developer Advocate Billy Korando.
-   The MCP revolution is here! [Spring AI MCP 0.6.0 (a milestone) is now available](https://spring.io/blog/2025/01/23/spring-ai-mcp-0). MCP, or *Model Context Protocol*, is an initiative and spec (vaguely) for integrating random services with an LLM. It was first supported by Claude, which allows its use as extensions for the Claude Desktop application. Spring AI makes it trivial to develop MCP services (and clients, too). There are MCP services that integrate Google Maps, Spring project documentation, filesystem access, and countless other things, too.
-   New year, new Boot! [Announcing Spring Boot 3.5.0.M1](https://spring.io/blog/2025/01/23/spring-boot-3-5-0-M1-available-now).
-   [Spring for Apache Pulsar 1.1.8 and 1.2.2 are available](https://spring.io/blog/2025/01/23/spring-for-apache-pulsar-1-1-8-and-1-2-2-are-now-available).
-   [Spring Framework 7.0.0 M1 is available now](https://spring.io/blog/2025/01/23/spring-framework-7-0-0-M1-available-now). This is a big release, and in keeping with earlier announcements, it's also available on Maven Central! This ships with new baseline changes, including Jakarta EE 11. It does continue to support Java 17, however.
-   [Spring Boot 3.4.2 is available](https://spring.io/blog/2025/01/23/spring-boot-3-4-2-available-now).
-   [Spring Boot 3.3.8 is available](https://spring.io/blog/2025/01/23/spring-boot-3-3-8-available-now).
-   [Spring Integration 6.5.M1 is available now](https://spring.io/blog/2025/01/22/spring-integration-6-5-M1-released).
-   [Spring for Apache Kafka 3.3.2](https://spring.io/blog/2025/01/22/spring-kafka-3) is available now!
-   [Spring AMQP 3.2.2 is available now](https://spring.io/blog/2025/01/22/spring-amqp-3-2-2-available).
-   [Agentic AI is the future! Agentic AI is now!](https://spring.io/blog/2025/01/21/spring-ai-agentic-patterns) Read this *incredible* blog (I bookmarked it!) to learn about what "agentic" means in the context of your Spring AI solutions. A *must-read* blog! Expect to see more on this topic soon!
-   My friend and teammate Dashaun has a nice blog [on using Cloud Foundry via Kubernetes (Korifi) on a Raspberry Pi](https://dashaun.com/posts/korifi-on-raspberry-pi/).
-   [Interesting! JetBrains has a new coding assistant they're calling Junie](https://blog.jetbrains.com/junie/2025/01/meet-junie-your-coding-agent-by-jetbrains/).
-   Did you know that Spring Tools (including Eclipse and Visual Studio Code) have [nice symbols for request mappings](https://x.com/springtools4/status/1882016588884541502?s=12) in the outline view and command palette? These symbols are shown when working with Spring Web MVC and Spring WebFlux controller mappings, even for functional router implementations!
-   Speaking of Spring, tooling, and AI, Spring Tools lead Martin Lippert put together an awesome Spring AI MCP service that makes [information about Spring projects available to the LLM](https://github.com/martinlippert/spring-io-api-mcp).
-   The official [MCP page has Spring AI's MCP support listed](https://docs.mcp.run/tutorials/mcpx-spring-ai-java/).
-   [Spring AWS 3.3.0 is available](https://github.com/awspring/spring-cloud-aws/releases/tag/v3.3.0).
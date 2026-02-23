---
title: This Week in Spring - April 15th, 2025
source: https://spring.io/blog/2025/04/15/this-week-in-spring-april-15th-2025
scraped: 2026-02-23T07:46:59.190Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 15, 2025 | 0 Comments
---

# This Week in Spring - April 15th, 2025

_Engineering | Josh Long |  April 15, 2025 | 0 Comments_

-   [Spring AI M7 is here!](https://spring.io/blog/2025/04/10/spring-ai-1-0-0-m7-released) This new release includes a bunch of awesome new features! And some refactorings. Notably that the Spring AI auto-configuration has changed from a single monolithic artifact to individual auto-configuration artifacts per model, vector store, and other components. This change was made to minimize the impact of different versions of dependent libraries conflicting, such as Google Protocol Buffers, Google RPC, and others. By separating auto-configuration into component-specific artifacts, you can avoid pulling in unnecessary dependencies and reduce the risk of version conflicts in your application. In additon some of the names of the starters have been changed: Model starters: `spring-ai-{model}-spring-boot-starter` → `spring-ai-starter-model-{model}`. Vector Store starters: `spring-ai-{store}-store-spring-boot-starter` → `spring-ai-starter-vector-store-{store}`. MCP starters: `spring-ai-mcp-{type}-spring-boot-starter` → `spring-ai-starter-mcp-{type}`.
-   Want to learn about Spring, MCP, and more? Check out this talk that Spring AI founder and lead Dr. Mark Pollack and [I gave at Devnexus 2025 just a month and some change ago](https://www.youtube.com/watch?v=uPWebxgEwlE).
-   *READ THIS!* This blog post by Spring AI lead Christian Tsolov explains some of the patterns in Google's new *Prompt Engineering* whitepaper in terms [of Spring AI](https://spring.io/blog/2025/04/14/spring-ai-prompt-engineering-patterns).
-   Speaking of Christian's blog, I did a quick two-minute [digest of the blog and the patterns here](https://www.youtube.com/shorts/B1dan9IWph0).
-   In last week's installment of *A Bootiful Podcast*, I had the privilege to [talk to WireMock's Lee Turner and Tom Akehurst](https://spring.io/blog/2025/04/10/a-bootiful-podcast-wiremock).
-   Community legend Eddú Meléndez put together a great blog on the new [support for Docker Model Runner in Spring AI](https://spring.io/blog/2025/04/10/spring-ai-docker-model-runner).
-   [Spring Cloud 2025.0.0-M3 (aka Northfield) has been released](https://spring.io/blog/2025/04/08/spring-cloud-2025-0-0-m3-released).
-   Have you booked your ticket for the upcoming [Spring I/O 2025 event in beautiful Barcelona, Spain](https://2025.springio.net)? Don't miss it! There will be tons of amazing sessions. One that I'm especially looking forward to is Anton Arhipov's talk, [*El Rapido! Coding Like Josh Long*](https://2025.springio.net/sessions/el-rapido-coding-like-josh-long/).
-   My recorded talk, *Bootiful Spring Boot: A DOGumentary*, from 2024's YOW! conference (well, one of the stops on the tour, anyway) is now [available online](https://www.youtube.com/watch?v=NMPf373dzvM).
-   Here's an MCP service [you can use to get JVM diagnostics](https://github.com/brunoborges/jvm-diagnostics-mcp).
-   I'm very curious about A2A (Agent2Agent), a new MCP orchestration proposal from Google. I also talked about [it in a quick YouTube short here](https://www.youtube.com/shorts/s8IvsUJ9b0s).
-   Build WebAssembly from Java? Yes, it's possible (though not quite practical yet)! Check out this quick look at how to build WebAssembly [applications with Java using GraalVM for Java 25 early access](https://www.youtube.com/shorts/VqhO3AkB-2M). There are caveats, so this won’t be typical for Spring apps anytime soon—but the horizon seems closer than ever!
-   Want to learn all about MCP? [Check out this video I did a month ago](https://www.youtube.com/watch?v=cE1h-rC2o2U&t=1s).
-   I loved Neo4j’s Michael Hunger’s explanation: [*Everything a Developer Needs to Know About the Model Context Protocol (MCP) - Graph Database & Analytics*](https://neo4j.com/blog/developer/model-context-protocol/).
-   [Want to use the DeepSeek model with Spring AI? Read on!](https://github.com/apappascs/spring-ai-examples/tree/main/spring-ai-deepseek)
-   Stephan Janssen, creator of Devoxx, just released a [100% Java GitHub MCP application built on Spring AI](https://x.com/Stephan007/status/1910640447740838356?s=12).
-   Speaking of MCP, our very own Mahmoud Ben Hassine, lead of the Spring Batch project, put together [an MCP service for introspecting a Spring Batch application—*awesome*](https://github.com/fmbenhassine/spring-batch-lab/tree/main/sandbox/spring-batch-mcp-server).
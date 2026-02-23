---
title: This Week in Spring - April 8th, 2025
source: https://spring.io/blog/2025/04/08/this-week-in-spring-april-8th-2025
scraped: 2026-02-23T07:47:26.733Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 08, 2025 | 0 Comments
---

# This Week in Spring - April 8th, 2025

_Engineering | Josh Long |  April 08, 2025 | 0 Comments_

Hi, Spring fans! How are ya? I'm doing fine. Excited, even. You see, Spring AI M7 is coming soon! In theory, [it drops on Thursday](https://calendar.spring.io). Don't hold us to that — these things can change :-) But *soon*, and it's turning out to be a whopper of a release!

You should try upgrading your application to the new M7 by using the `-SNAPSHOT` builds. The coordinates for the various starters have been reworked, so things will break there. Don't panic — you just need to update the coordinates. There's good [information in the documentation](https://docs.spring.io/spring-ai/reference/upgrade-notes.html).

Here's the gist:

-   Model starters: `spring-ai-{model}-spring-boot-starter` → `spring-ai-starter-model-{model}`
-   Vector Store starters: `spring-ai-{store}-store-spring-boot-starter` → `spring-ai-starter-vector-store-{store}`
-   MCP starters: `spring-ai-mcp-{type}-spring-boot-starter` → `spring-ai-starter-mcp-{type}`

Also, note that the Spring AI auto-configuration has changed from a single monolithic artifact to individual auto-configuration artifacts per model, vector store, and other components. This change was made to minimize the impact of different versions of dependent libraries conflicting, such as Google Protocol Buffers, Google RPC, and others. By separating auto-configuration into component-specific artifacts, you can avoid pulling in unnecessary dependencies and reduce the risk of version conflicts in your application.

Nice! OK, let's dive into this week's roundup!

-   [Spring Cloud 2025.0.0-M3 has been updated](https://spring.io/blog/2025/04/08/spring-cloud-2025-0-0-m3-released)
-   [Spring Cloud Config 3.1.10, 4.0.10, 4.1.6, 4.2.1, 4.3.0-M3 released, including fixes for CVE-2025-22232](https://spring.io/blog/2025/04/07/spring-cloud-config-3-1-10-4-0-10-4-1-6-4-2-1-4-3-0-m3-released)
-   [Spring gRPC 0.6.0 is available now!](https://spring.io/blog/2025/04/05/spring-grpc-0-6-0-available-now)
-   One of the recordings of my [talks at YOW! 2024 (a conference circuit in three cities in Australia) is up](https://www.youtube.com/watch?v=NMPf373dzvM)
-   An interesting [MCP service to debug JVM performance issues](https://x.com/brunoborges/status/1908200114210103799?s=12)
-   An interesting blog: [Unlocking AI coding assistants to generate Spring Boot applications](https://mydeveloperplanet.com/2025/04/02/unlocking-ai-coding-assistants-generate-spring-boot-application/)
-   AWS developer advocate extraordinaire James Ward and I did [a demo looking at how to integrate Spring AI and AWS Bedrock together](https://www.youtube.com/watch?v=Y291afdLroQ)
-   That video James and I did [inspired him to write this nifty blog](https://community.aws/content/2v8AETAkyvPp9RVKC4YChncaEbs/running-mcp-based-agents-clients-servers-on-aws)
-   Which, in turn, was incorporated by [AWS VP Swami Sivasubramaniam, who just announced AWS's big new MCP push](https://www.linkedin.com/posts/swaminathansivasubramanian_agentic-systems-offer-possibilities-that-activity-7312929166201405440-EZv2?rcm=ACoAAACXdIABb8VbfXttpb7WA9oliQsXOS5rEgw)
-   Oh, and by the way — yes, you guessed it — [James Ward is this week's podcast guest](https://spring.io/blog/2025/04/04/a-bootiful-podcast-james-ward)!
-   Our very own Michael Coté also put together [this nice Dungeons and Dragons MCP server in Java and Spring AI](https://www.youtube.com/watch?v=iROihhd_OiI)
-   The JavaCodeGeeks blog has a nice post [on one-time tokens in Spring Security](https://www.javacodegeeks.com/spring-security-one-time-token-login-example.html)
---
title: This Week in Spring (AI) - May 27th, 2025
source: https://spring.io/blog/2025/05/27/this-week-in-spring-may-27th-2025
scraped: 2026-02-23T07:40:44.869Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 27, 2025 | 0 Comments
---

# This Week in Spring (AI) - May 27th, 2025

_Engineering | Josh Long |  May 27, 2025 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! This time, I'm talking to you after an *insane* week behind me. Last week I flew from San Francisco to Stockholm, Sweden where I was the speaker for the JForum event, a monthly meetup. Spring drew the largest audience to JForum since before the pandemic! Then, it was off to beautiful Barcelona for the *fantastic* Spring I/O event, where I did a keynote with Dr Mark Pollack on Spring AI, then hosted a joint talk with Spring cofounders Rod Johnson and Juergen Hoeller. Then, I did a joint talk with GraalVM found and Oracle vice president Thomas Wuerthinger. Then, it was off to Madrid where I met some customers and users. Then, it was off to beautiful Coimbra, Portgual, for the *amazing* JNation.pt conference!

All of which is to say, I had a *ton* of fun! But I am exhausted and eager to just chill out in Lisboa for a few days before heading to Amsterdam for the amazing JSpring and, separately, to the IntelliJ IDEA Conf, then off to Tokyo for the JJUG Spring event!

That excitement is only possible because our community is *amazing*! And on that note, let's dive into this week's roundup.

-   [Spring AI is 1.0!](https://spring.io/blog/2025/05/20/spring-ai-1-0-GA-released) This release was years in the making but represents the first GA release of Spring AI of dozens (but still less than a hundred, I think) of different modules support chat models, image models, transcription models, embedding models, and vector stores.
-   want to get started? Look no further than [this blog: *Your First Spring AI 1.0 application*](https://spring.io/blog/2025/05/20/your-first-spring-ai-1) which features Anthropic as the chat model, PostgresML for embeddings, PostgreSQL as the vector store, and Spring AI.

This isn't the only place you can read about Spring AI 1.0, however! Some of our friends in the community chimed in, too! For example:

-   Microsoft Azure [put out a nice blog](https://techcommunity.microsoft.com/blog/appsonazureblog/spring-ai-1-0-ga-is-here---build-java-ai-apps-end-to-end-on-azure-today/4414763) and [Video](https://youtu.be/nkB2fnq-HOg). A special thanks to [Asir Selvasingh](https://www.linkedin.com/in/asir-architect-javaonazure) who helped us [launch Spring AI](https://youtu.be/zIYmgEbUl4U?feature=shared&t=4970) back at the Spring One conference in Vegas in 2023.
-   AWS has a nice article [on the new Spring AI release, also!](https://community.aws/content/2xLkItwKHrZ5EweKTz9uPpYHyPk/spring-ai-1-0-brings-ai-to-the-developer-masses) - Spring AI 1.0 Brings AI to the Developer Masses
-   Google has a nice blog [on the new Spring AI 1.0 release, too!](https://cloud.google.com/blog/topics/developers-practitioners/google-cloud-and-spring-ai-10) - Google Cloud and Spring AI 1.0
-   I put out a video on [Spring AI and CloudFoundry called *Bootiful, Agentic, Production-Worthy, Cloud-Native Systems and Services*](https://youtu.be/mBMq2BqfjyA)
-   Elastic has a nice blog [on using Spring AI as a vector store with Spring AI](https://www.elastic.co/search-labs/blog/spring-ai-elasticsearch-application) \- Spring AI and Elasticsearch as your vector database
-   Redis [has a nice blog on using Redis as a vector store (is there nothing Redis can not do?)](https://redis.io/blog/build-fast-production-worthy-ai-apps-with-spring-ai-and-redis/) — Build fast, production-worthy AI apps with Spring AI and Redis
-   MongoDB [has a nice blog on using MongoDB as a vector store with Spring AI 1.0](https://dev.to/mongodb/how-to-build-rag-applications-with-spring-ai-and-mongodb-5gaj) - Spring AI and MongoDB: How to Build RAG Applications
-   Oracle [has a nice blog on using Oracle DB as a Vector Store with Spring AI 1.0—](https://blogs.oracle.com/developers/post/spring-ai-10-ga-released-with-oracle-vector-database-support)Spring AI 1.0 GA released with Oracle Vector Database support
-   InfoQ put together a news post [on Spring AI 1.0—](https://www.infoq.com/news/2025/05/spring-ai-1-0-streamlines-apps/)Spring AI 1.0 Released, Streamlines AI Application Development with Broad Model Support
-   The New Stack has an [Article](https://thenewstack.io/production-worthy-ai-with-spring-ai-1-0/) - Production-Worthy AI With Spring AI 1.0
-   This is an article from Daniel Garnier-Moiroux on [MCP Authorization in practice with Spring AI and OAuth2](https://spring.io/blog/2025/05/19/spring-ai-mcp-client-oauth2) that is *well* worth reading if you intend to take this stuff to production!

As you can see, *tons* of interest in the Spring AI 1.0 release! Thank you, community! And tons of interest in all the other amazing releases, too!

-   I love this blog Spring Data lead Mark Paluch [looking at repository vector search methods](https://spring.io/blog/2025/05/23/vector-search-methods)
-   In last week's installment of *A Bootiful Podcast*, [I talk to Spring IO foudner Sergi Almar](https://spring.io/blog/2025/05/22/a-bootiful-podcast-sergi-almar)
-   Speaking of Spring Data, did you see this incredible [new Spring Data AOT repository support](https://spring.io/blog/2025/05/22/spring-data-ahead-of-time-repositories)? Right now it's only available for JDBC and MongoDB, but we're working on expanding support. TL;DR: you can have Spring Data code-generate the repository at compilation that would otherwise be generated at runtime. This results in code that's more debuggable, takes less RAM, and starts up quicker. *Nice!*
-   [Spring Integration 6.5 GA is available](https://spring.io/blog/2025/05/22/spring-integration-6-5-released)
-   [Spring Boot 3.5.0 available now](https://spring.io/blog/2025/05/22/spring-boot-3-5-0-available-now)
-   [Spring Boot 3.4.6 is available now](https://spring.io/blog/2025/05/22/spring-boot-3-4-6-available-now)
-   [Spring Boot 3.3.12 is available now](https://spring.io/blog/2025/05/22/spring-boot-3-3-12-available-now)
-   [`vite-spring-boot 0.9.0`](https://github.com/wimdeblauwe/vite-spring-boot/releases/tag/0.9.0) released with support for JTE as an alternative to Thymeleaf as template engine for Spring Boot so you can have all the Vite niceness for your CSS and JavaScript bits.
-   preliminary for the faster, more memory-efficient, and more debuggable [Spring Data AOT-based repositories is now previewing in IntellIJ IDEA!](https://twitter.com/belyaev_andrey/status/1927072372101656643?s=12)
-   an oldie-but-a-goodie: [12 Factor Applications with Spring Boot](https://reflectoring.io/spring-boot-12-factor-app/)
-   this is an interesting exploration of a (since-patched) bug in [Spring Retry and the unintended growth of Metaspace usage when used with Spring Cloud Config Client](https://www.linkedin.com/pulse/when-metaspace-strikes-deep-dive-java-memory-mystery-evgeny-lazarev-ofxjf/)
-   an interesting [look at validation with Spring Boot](https://mydeveloperplanet.com/2024/04/17/validation-with-spring-boot/)
-   speaking of Spring IO 2025, [do *not* miss this jam-packed keynote!](https://www.youtube.com/watch?v=oUK1Np4OvnM)
-   Spring Framework contributor and legend Arjen Poutsma talks about [building fluent API designs](https://poutsma-principles.com/blog/2025/05/20/method-chaining/)
-   this blog from AWS is *very* interesting! It looks at building MCP services and - most notably - [it demonstrates all the code in terms of Spring AI](https://aws.amazon.com/blogs/opensource/open-protocols-for-agent-interoperability-part-1-inter-agent-communication-on-mcp/)
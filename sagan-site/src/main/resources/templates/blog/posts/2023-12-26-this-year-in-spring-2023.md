---
title: This Year in Spring - 2023
source: https://spring.io/blog/2023/12/26/this-year-in-spring-2023
scraped: 2026-02-23T09:02:06.002Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 26, 2023 | 0 Comments
---

# This Year in Spring - 2023

_Engineering | Josh Long |  December 26, 2023 | 0 Comments_

Welcome to another installment of *This Week in Spring*! It's December 26th, 2023, and we're staring down the new year! And you know what that means, right? It's time for our annual roundup, looking at all the latest and greatest in the wild and wonderful world of Springdom. This is *This Year in Spring*. So, here are some of the biggest themes in the year 2023, and then we'll get to our regularly scheduled roundup.

### [](#artificial-intelligence-ai)Artificial Intelligence (AI)

You've no doubt heard all about the incredible leapfrogging advancements being made in the area of artificial intelligence! It's *everywhere*! Even before ChatGPT leapt onto the scene, we had GitHub's Copilot and Codota showing developers everywhere what an accelerant AI could be for their code. Now the rest of the world sees the potential, too. AI is awesome! And while most of it is implemented in terms of low-level code and Python, most of us don't need to care. In the same way that we don't care in what language most databases are implemented. Most of us don't write our own SQL databases. So, what really matters is the ergonomics of writing applications that integrate AI. And here, I think, Spring AI is particularly compelling. All LLMs offer an API, usually HTTP-based. So that's easy. What else is there? Well, AI offerings deal in terms of *tokens* - essentially a measure of how much data a given request to the LLM might involve (in both the request and the response). The smaller the number of tokens, the less data you can send the LLM to inform its response. Imagine you're trying to build a bot that can answer questions about books in a library or that can answer questions about your bank account. You'll need to give it a way to access that data and you'll need to find a way to fit that data in the context window for the given LLM. This whole pipeline - from ingest to summarization to retrieval via a vector store - requires the elegance and ergonomics that Java and Spring excel at. I looked at this whole end-to-end pipeline (sometimes referred to as R.A.G., or *retreival augmented generation*, in [a recent video I did with Intel's Arun Gupta](https://www.youtube.com/watch?v=N5HqaIBT1v0)

### [](#graalvm)GraalVM

We introduced GraalVM native image support in Spring Boot 3.0 as a GA production-ready feature in November of last year. The core idea behind GraalVM is that it's an ahead-of-time compiler, proactively taking code and allowing you to turn it into operating system and architecture-specific native code. The results are stunning! Markedly faster startup time *and* markedly smaller RAM footprint. But there are some costs, some concessions. You'll need to furnish configuration files that the compiler can use to understand when and where you might do dynamic things like reflection, serialization, JDK proxies, etc. Spring Boot 3.0 and later ship with an AOT engine that analyzes your Spring Boot applications at compile time and emits the relevant configuration for you. The result? Most of the time, for the common cases, your applications can be turned into a GraalVM native image and enjoy those amazing benefits. Try it out today: start.spring.io and add `GraalVM native image` support. I wrote an ebook that you might like all about the [amazing opportunities in Spring's AOT engine](https://tanzu.vmware.com/content/white-papers/spring-boot-3). It's free. If you'd prefer to watch a video, you might [check out my in-depth tutorial on the technology here](https://www.youtube.com/watch?v=TOfYlLjXufw)

### [](#virtual-threads-project-loom)Virtual Threads (Project Loom)

Java 21 is, in my estimation, the single most important release of any Java release since, arguably, Java 1.0. It's chock-full of features - like records, pattern matching, smart switch expressions, auto inference, multiline strings, and a million other features besides - that make it a must-have upgrade for folks on Java 8. It also makes it Java the most productive and one of the most performant and energy-efficient platforms out there.

My favorite feature is Project Loom, or *virtual threads*. Virtual threads offer a lightweight thread runtime which detects *blocking actions* - `Thread.sleep`, `InputStream#read`, etc., and moves them off the thread on which they're executing, effectively freeing that thread to handle other things in the system. Are you in a system bogged down by IO, with constant requests going across the wire to other network services? Then you're probably spending more time waiting for data than anything else. This means that if you have a bunch of requests coming in, they might very well have to wait to be served while those other threads are just idle-waiting for data to arrive, unable to move forward. Project Loom fixes this, ensuring that you're never monopolizing a thread while idle. And, best of all, using it is effectively a one-liner wherever you use threads or, if you're using Spring Boot 3.2, as simple as setting one property in one place for your whole application. Easy! I looked at virtual threads in [this video introducing Spring Boot 3.2](https://youtu.be/dMhpDdR6nHw?si=WazaM5xqoKjiIlh3&t=679)

### [](#coordinated-restore-at-checkpoint-project-crac)Coordinated Restore at Checkpoint (Project CRaC)

Notice I said "*most* of the time" when talking about GraalVM native images? That's because it doesn't always work. It works often enough, but it's doing something different than the JRE is doing and so sometimes runs afoul of the promises of the JRE. For example, Java agents don't work in a GraalVM native image. What if you just want faster startup time, for example in a serverless context?

Programs (running on an operating system like Linux) typically startup, initialize data structures, load them into RAM, and then start executing. This initialization can be slow - as in most programs running on the JRE. CRIU is a mechanism in Linux which lets you take a snapshot of the running state of an application and then write that snapshot to disk. You can then load that snapshot into another running program and skip past the initialization. The result? Instantly fast startup time. There's some lifecycle involved. Your program needs to know when its about to be snapshotted. Otherwise, it wouldn't have a chance to clean up any sensitive passwords and close any ephemeral sockets that you wouldn't want captured in a snapshot and written to disk. For Java programs, Project CRaC (coordinated restore at checkpoint) offers a simple way to participate in this lifecycle. And Spring Boot 3.2 supports CRaC now, too. I looked [at Project CRaC in this video introducing Spring Boot 3.2](https://youtu.be/dMhpDdR6nHw?si=_EAy39tyvsIouelG&t=2646)

### [](#docker-driven-development)Docker-Driven Development

In May, we released Spring Boot 3.1 which introduced new support for Docker-driven development. Now, Spring Boot can derive connectivity information from either a local Docker Compose description file or Testcontainers, sparing you from having to furnish connection details for your database, and providing a much nicer way to have Spring help you with the lifecycle of your infrastructure services in a development environment. [I looked at at these exciting new possibilities in this video](https://www.youtube.com/watch?v=kWb-orCsCM0)

### [](#spring-modulith)Spring Modulith

Spring Boot is a chance to pair program with the Spring team. It is an opinionated approach to how to integrate and avail yourself of the technologies in your Java and Spring-based applications. And it supports a number of different architectures. Not all architectures are created equal. If you want to build a distributed system, there's Spring Cloud. But what if you want to build up a codebase and do so in a manner designed to promote modularity, scalability of teams, and clean, tangle-free architecture? Here's where Spring Modulith comes into play. Spring Modulith lead Oliver Drotbohm looked [introduced Spring Modulith in this talk at SpringOne](https://www.youtube.com/watch?v=430YOyMNjhs)

## [](#and-now-for-your-regularly-scheduled-programming)And now for your regularly scheduled programming...

Here's the weekly roundup you've been waiting for.

-   Neat reference [on the new Spring AI](https://javatechonline.com/spring-ai-reference/), though I would caution that this is mostly conceptual at this point because they just did a major refactoring of the codebase in the Spring AI project itself. For example, `AiClient` is now `ChatClient`, etc.
-   Nice article [on using Liberica and Spring Boot to build images](https://www.baeldung.com/spring-docker-liberica)
-   How to migrate your [Spring Boot applications with ease using OpenRewrite](https://www.youtube.com/watch?v=fvRtZzNzWEk)
-   [Testing AWS services with LocalStack and Spring Boot](https://testcontainers.com/guides/testing-aws-service-integrations-using-localstack/)
-   In this episode of a *Bootiful Podcast*, [I talked to cloud-native Whitney Lee](https://spring.io/blog/2023/12/22/a-bootiful-podcast-cloud-native-whitney-lee/)
-   Spring Modulith 1.0.4 and 1.1.1 have [been released](https://spring.io/blog/2023/12/21/spring-modulith-1-0-4-and-1-1-1-released/)
-   [Spring Boot 3.2.1](https://spring.io/blog/2023/12/21/spring-boot-3-2-1-available-now/) and [Spring Boot 3.1.7](https://spring.io/blog/2023/12/21/spring-boot-3-1-7-available-now/) are both available now.
-   [Spring Cloud Jubilee 2021.0.9 is now available](https://spring.io/blog/2023/12/20/spring-cloud-2021-0-9-aka-jubilee-is-now-available/)

This is the last roundup for the year 2023. I hope this year's been good and the next one even better. I look forward to seeing you at the beginning of the year, in 2024, for a brand new year and - of course - the 13th anniversary of *This Week in Spring* itself. Whoa. Blows my mind even writing.

Happy new year, everybody!
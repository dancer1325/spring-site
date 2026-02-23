---
title: This Year in Spring – December 30th, 2025
source: https://spring.io/blog/2025/12/30/this-year-in-spring-december-30th-2025
scraped: 2026-02-22T22:03:37.302Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 30, 2025 | 1 Comment
---

# This Year in Spring – December 30th, 2025

_Engineering | Josh Long |  December 30, 2025 | 1 Comment_

Hi, Spring fans! Can you believe it? It's already the 30th of December! I celebrated Christmas with my family in Los Angeles, then we jumped on a flight headed for Southeast Asia to ring in the New Year with more friends and family. I'm sitting at a café in the sweltering city of Kuala Lumpur, Malaysia as I write this - looking back fondly at the last week of, and the entire year of, **2025**.

That's right! It's time for my yearly tradition of retroactive year-end navel‑gazing and analysis; it's time for *This Year in Spring*, where we review the good, the great, and the amazing: the top five best things of one incredible year. (And then we do the usual recap looking into the week's roundup, too.)

So, first up, let's look at five of the major themes of 2026.

## [](#spring-boot-4)Spring Boot 4

Well, you knew this one was coming. 2025 was a *huge* year as the Spring ecosystem turned the page on a new generation, starting with Spring Framework 7 and all the various Spring projects that build upon it - Spring Security 7, Spring Batch 6, and more. Then we got Spring Boot 4! (Actually, we're already at Spring Boot 4.0.1 now, by the way...)

Spring Boot 4 is jam-packed with amazing new features, pulling in improvements across the ecosystem *as well as* delivering niceties directly in Spring Boot itself. Highlights include declarative interface clients, API versioning, consolidated Spring Security support, the new Spring Batch resourceless and MongoDB‑based repositories, a new configuration model called `BeanRegistrar`, and so much more.

On top of this release came the so‑called "post‑Boot" projects that take Spring Boot itself as a dependency. This includes projects like Spring Cloud, Spring Modulith, Spring gRPC (for now), and Spring AI. All of these - except Spring AI - have released Spring Boot 4-compatible GA versions, and you can try Spring AI 2.0 as a milestone.

This new version of Spring Boot represents a new generation with profound new features. Try it out, as usual, on the [Spring Initializr](https://start.spring.io)!

## [](#ainext)AI.next

In 2025, through my work on YouTube, the podcast, and countless conference talks, I spoke to millions of people about the amazing Spring AI project. It’s such an incredible effort, providing the richest integration with AI technologies on the JVM.

In November 2024, more than a year ago, we also started work on an integration for the MCP specification - then a nascent effort by Anthropic. In early 2025, we donated that work to the MCP project itself, becoming the lead developers of the official Java SDK for MCP. We then rebased our Spring AI integration on top of this new foundational SDK. That work continued apace, tracking spec change after spec change while improving the component model and more. MCP is generational technology, allowing a whole ecosystem of integrations and opportunities. What will you build with it?

When was the last time you talked to an AI LLM and felt like you got the right response on the first try? Almost never, I’d wager. This effect is even more pronounced with cheaper, smaller models that have tons of utility but lack the "it read my mind!" quality of frontier models. You can accrete state over a set of well‑defined steps to get better results - this is the domain of so‑called *agentic* frameworks like Embabel, which builds on Spring AI.

Speaking of, Spring AI is growing like crazy. While it ships with 20+ model integrations and 20+ vector store integrations, not everything can live in Spring AI itself. That's why we created the [Spring AI Community organization](https://github.com/spring-ai-community), where you'll find even more models and integrations.

Three projects I’d definitely check out:

-   [Spring AI Agents](https://github.com/spring-ai-community/spring-ai-agents)
-   [Spring MCP Security](https://github.com/spring-ai-community/mcp-security)
-   [Spring AI Bench](https://github.com/spring-ai-community/spring-ai-bench)

The Spring AI Agents project supports wrapping agentic CLIs - like OpenAI Codex and Claude Code - as well as providing a rich wrapper for the ACP (Agent Client Protocol). Why use the CLI instead of the model directly? Because your operating system offers a rich array of tools, and AI can do amazing things with them. Cut out the middleman - or orchestrate them - with Spring AI Agents.

The AI agentic CLI community has a benchmarking problem. The de facto standard is the SWE benchmark, but it’s written in Python and the tasks are years old. Let’s be honest: the models have learned the test. They do very well there - 70% or more. Switch the tasks to Java, though, and the scores plummet. Spring AI Bench aims to provide realistic, modern workloads that are quickly and reproducibly testable.

Spring MCP Security, as you might have guessed, tracks MCP security specification changes and delivers a tight integration for Spring AI and Spring Security users. Security, observability, and scalability are core tenants of enterprise‑grade AI - and nobody delivers that like Spring.

## [](#security-as-a-feature)Security as a Feature

Spring Security had a *huge* year. Recent Spring Security 6.x releases brought one‑time tokens and WebAuthn (better known as passkeys). Passkeys are an *amazing*, ergonomic, and highly secure way to integrate biometrics and multi‑factor authentication into applications.

Spring Security 7 - part of the Spring Boot 4 train - goes even further with built‑in multi‑factor authentication. This builds on already‑rich integrations like SAML, Kerberos, and OAuth. By the way: the Kerberos support *and* the standalone Spring Authorization Server (a full OAuth Identity Provider) are now part of Spring Security 7, too!

## [](#the-open-web)The Open Web

Spring began as a web framework. Spring MVC has shipped since the earliest days of the Spring Framework. Not long after, Spring‑WS debuted in 2007 for SOAP services. In 2009, Spring Framework 3 added robust HTTP support for REST services - later enriched with hypermedia via Spring HATEOAS.

We then explored binary protocols with RSocket, followed by full‑featured GraphQL support in collaboration with the GraphQL Java team. More recently, we announced Spring gRPC, providing first‑class gRPC support with security, observability, and GraalVM compilation. Spring gRPC went GA shortly after Spring Boot 4 - try it now!

## [](#a-java-for-today-and-tomorrow)A Java for Today and Tomorrow

Quick: what language is this?

```java
Copyvoid main() {
  IO.println("hello, world!");
}
```

You guessed it: Java. Put it in `script.java` and run it with `java script.java`. No compilation step required. You’ve just run the first *good* Java script. There are many bad JavaScripts - but this is a *Java script*, and it's awesome! Note that there was no compilation required? Also, did you notice that there was no containing class? It, like me, has no class! The developer ergonomics are getting better and better with every passing release!

Java today scales effortlessly with virtual threads, offering Go-like scalability without the verbosity of `async`/`await`. You can turn a Spring Boot app into a GraalVM native image by selecting GraalVM on the Spring Initializr and running:

```shell
Copy./mvnw -Pnative native:compile
```

Not ready to make the jump to full native images? Project Leyden and AOT caches provide comparable startup improvements - often cutting startup time by 75% or more. And of course we have built-in support for that, too!

Brian Goetz’s talk *Growing the Java Language* laid out a compelling philosophy of "growable" features - where syntax, types, and libraries evolve together. Examples include `Iterable<T>` and `AutoCloseable`, both of which unlock powerful language features through simple interfaces.

This mindset is crucial for efforts like Project Valhalla, which aims to introduce user‑defined value types that behave like primitives while remaining expressive and safe. Valhalla will unlock dramatic performance improvements and power efforts like the Vector API - keeping Java competitive with C, Go, and Rust.

There's never been a better time to be a Java and Spring developer, and next year will continue that trend!

So, without further ado, let's dive right into this week's roundup!

## [](#the-roundup)The Roundup

-   [Evolving Spring Vault: Introducing VaultClient](https://spring.io/blog/2025/12/26/evolving-spring-vault)
-   Last week on *A Bootiful Podcast*, I spoke with [Nate Schutta](https://spring.io/blog/2025/12/25/a-bootiful-podcast-nate-schutta)
-   Efficient Spring AI tool calls from [Christian Tsolov](https://spring.io/blog/2025/12/23/spring-ai-tool-argument-augmenter-tzolov/)
-   [Spring Boot 4: Breaking Changes](https://medium.com/@pmLearners/spring-boot-4-the-7-breaking-changes-every-developer-must-know-99de4c2b60e2)
-   Orchestrating flows with [Orkes Conductor](https://www.baeldung.com/orkes-conductor-guide)
-   [FaunaDB with Spring](https://www.baeldung.com/faunadb-spring)
-   James Ward asks: [*Will 2026 be the year of agentic AI?*](https://x.com/jamesward/status/2005742419594117291?s=12)
-   Kotlin serialization in [Spring Boot 4](https://itnext.io/first-class-kotlin-serialization-support-in-spring-boot-4-54a8e930c60b)
-   [Spring Boot + Temporal.io](https://blog.stackademic.com/spring-boot-temporal-io-why-orchestrators-are-the-future-of-java-2025-edition-a7c2d6ff8b48)
-   [An introduction to HikariCP](https://www.baeldung.com/hikaricp)
-   IntelliJ IDEA support for [Spring Data JDBC](https://x.com/intellijidea/status/2000566592384422334?s=12)
-   Saving date values with [Spring Data Cassandra](https://www.baeldung.com/spring-data-cassandra-dates)
-   Tanzu Platform is [still the best place for enterprise Java apps](https://blogs.vmware.com/tanzu/tanzu-platform-still-the-best-place-for-enterprise-java-apps/)
-   My favorite enterprise starter: [Spring Boot Governance Starter](https://youtube.com/shorts/Gi3L9lVKUzw?si=lCEru6DD8q5wx60V)

And that's that! This is the last installment of *This Week in Spring* for the year that was 2025. Next week will be the first one of the year 2026. Which is a crazy thing to say, since I started writing these posts the first week of 2011, so next will mark 15 years of *This Week in Spring*! (And I haven't missed a week!)

I am quite sure I speak for the whole Spring team when I wish you and yours a very safe, happy and healthy *Happy New Year*!
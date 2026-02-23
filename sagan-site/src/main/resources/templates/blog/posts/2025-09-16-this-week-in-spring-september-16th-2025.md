---
title: This Week in Spring - September 16th, 2025
source: https://spring.io/blog/2025/09/16/this-week-in-spring-september-16th-2025
scraped: 2026-02-23T07:30:00.740Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 16, 2025 | 3 Comments
---

# This Week in Spring - September 16th, 2025

_Engineering | Josh Long |  September 16, 2025 | 3 Comments_

Hi, Spring fans! Welcome to another extra special installment of *This Week in Spring*, wherein we celebrate a very auspicious day indeed: the release of [Java 25](https://docs.oracle.com/en/java/javase/25/index.html) and [GraalVM 25](https://www.graalvm.org)! That's right: an incredible new iteration of the JVM has just dropped and with it come a ton of features! Let's go through some of my favorites.

One nicety is the new **Module import declarations** - import all the packages in a given module with a new `import` variant. (Does not require importer be in a module). So now you could do: `import module java.base;` to get most of the core JDK types in your program in a single line. Easy!

And, finally, it can be said that Java supports **Java.. scripts**. That's right, Java scripts, the only *good kind* of Java... scripts!: This is one of my all time favorite new features! Finally, at long last, wayward students looking for salvation in a rough-n-tumble new language will find it: you can create hello world in 3 lines of code, as is true in most other languages! Here's a valid example:

Put this in `script.java`:

```
Copyvoid main(){
	IO.println("Hello, Java 25!");
}
```

Then run it:

```
Copy> java script.java
```

You could run Java source code files for years using the `java <file>` construct. The new and novel feature here is that you can now create a program that doesn't have a public class and a `public static void main` method. It couldn't be simpler. Notice that the `main` method is the absolute minimum required: a return type, a name, and the usual parenthesis and curly-brackets. So nice!

The new **AOT support for method profiling** is here, too, and allows the existing AOT machinery to now compute new native code for fast native methods on startup, immediately, instead of waiting for method profiling. The AOT caches other things, like classes that it'll need to load and link, so this is just an extension of an already useful set of features.

And of course there are a million other smaller features that [I'm looking forward to](https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#NewFeature). Get the bits and try it out! I use the amazing SDKMAN.io version manager, and it's trivial to upgrade versions from there!

And, you can expect support on the Spring Initializr for Java 25 hopefully very soon, of course!

Let's dive right into this week's roundup, as always, there's a lot to it!

-   [Spring for GraphQL 2.0.0-M3 released](https://spring.io/blog/2025/09/16/spring-for-graphql-2-0-0-m3-released)
-   [Spring for GraphQL 1.4.2 released](https://spring.io/blog/2025/09/16/spring-for-graphql-1-4-2-released)
-   you have to check out this release! [Spring AI's new MCP support is better than ever, and Christian Tsolov explains why](https://spring.io/blog/2025/09/16/spring-ai-mcp-intro-blog)
-   in yet another exciting entry on the road to GA, [Rossen Stoyanchev looks at API versioning in Spring](https://spring.io/blog/2025/09/16/api-versioning-in-spring)
-   [Spring for Apache Pulsar 1.2.10 and 2.0.0-m3 are available now](https://spring.io/blog/2025/09/16/spring-for-apache-pulsar-1-2-10-and-2-0-0-M3-are-now-available)
-   [Spring Security 6.4.10 and 6.5.4 released](https://spring.io/blog/2025/09/15/spring-security-6-4-10-and-6-5-4-released)
-   [Spring Security and Spring Framework Release Fixes for CVE-2025-41248 and CVE-2025-41249](https://spring.io/blog/2025/09/15/spring-framework-and-spring-security-fixes-for-CVE-2025-41249-and-CVE-2025-41248)
-   [Spring AMQP 4.0 milestone 5 available](https://spring.io/blog/2025/09/15/spring-amqp-4-0-0-m5-available)
-   [Spring Data 2025.1.0-M6 released](https://spring.io/blog/2025/09/12/spring-data-2025-1-0-M6-released)
-   [Spring Cloud 2025.1.0-M2 (aka Oakwood) has been released](https://spring.io/blog/2025/09/12/spring-cloud-2025-1-0-M2-aka-oakwood-has-been-released)
-   [Spring Data 2025.0.4 and 2024.1.10 released](https://spring.io/blog/2025/09/12/spring-data-2025-0-4-and-2024-1-10-released)
-   in last week's installment of *A Bootiful Podcast*, I talked [to the legendary Purnima Padmanabhan, General Manager, Tanzu Division, Broadcom](https://spring.io/blog/2025/09/11/a-bootiful-podcast-purnima-padmanabhan)
-   good news everybody! [Spring Authorization Server is moving to Spring Security 7.0](https://spring.io/blog/2025/09/11/spring-authorization-server-moving-to-spring-security-7-0)
-   [Spring Framework 7.0.0 M9 is available now](https://spring.io/blog/2025/09/11/spring-framework-7-0-0-M9-available-now)
-   [Spring Framework 6.2.11 is available now](https://spring.io/blog/2025/09/11/spring-framework-6-2-11-available%20now)
-   [Spring gRPC 0.11.0 is available now](https://spring.io/blog/2025/09/10/spring-grpc-0-11-1-available)
-   [Spring Tools 4.32.0 available now](https://spring.io/blog/2025/09/10/spring-tools-4-32-0-released)
-   [Access API moves to Spring Security Access](https://spring.io/blog/2025/09/09/access-api-moves-to-spring-security-access)
-   did you see all the cool new [core primitives in Spring Framework including `@ConcurrencyLimit`, `@Retryable`, and `RetryTemplate`](https://spring.io/blog/2025/09/09/core-spring-resilience-features)?
-   [Spring AI 1.1.0-m1 available now](https://spring.io/blog/2025/09/09/spring-ai-1-1-0-M1-available-now)
-   a nice look [at what a modular monolith is](https://thetshaped.dev/p/what-is-a-modular-monolith-benefits-and-microservices-challenges) - though I think they should've mentione Spring Modulith :-)
-   I like this tutorial for creating [private AI Spring AI applications with Spring AI and `gpt-oss`](https://ik.am/entries/867/en)
-   [Micrometer.io 1.16.0 M3 is out](https://github.com/micrometer-metrics/micrometer/releases/tag/v1.16.0-M3)
-   And [Micrometer Tracing 1.6.0-M3 is out](https://github.com/micrometer-metrics/tracing/releases)
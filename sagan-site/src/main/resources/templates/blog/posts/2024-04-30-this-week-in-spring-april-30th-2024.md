---
title: This Week in Spring - April 30th, 2024
source: https://spring.io/blog/2024/04/30/this-week-in-spring-april-30th-2024
scraped: 2026-02-23T08:43:55.748Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 30, 2024 | 0 Comments
---

# This Week in Spring - April 30th, 2024

_Engineering | Josh Long |  April 30, 2024 | 0 Comments_

Welcome to yet another amazing installment of *This Week in Spring*!

As usual, we've got a ton of stuff to get into, so let's dive right into it!

-   Chris Bono announces the new versions of [Spring Functions Catalog and Spring Cloud Streams Applications](https://spring.io/blog/2024/04/30/spring-functions-catalog-5-0-0-rc1-and-spring-cloud-stream-applications-2024)
-   In last week's installment of *A Bootiful Podcast*, I talked to [Spring Cloud Services and security guru Daniel Garnier-Moiroux](https://spring.io/blog/2024/04/26/a-bootiful-podcast-daniel-garnier-moiroux-on-passkeys-and-spring-security) about the nascent world and support in Spring Security of Passkeys.
-   [Spring Modulith 1.0.7 and 1.1.4 have been released!](https://spring.io/blog/2024/04/29/spring-modulith-1-0-7-and-1-1-4-released) This introduces an updated ArchUnit 1.1.1 release, which in turn includes a fix to now support the new fat `.jar` format of Spring Boot. Spring Modulith applications that were using the runtime, actuator, and observability modules had been affected and should now properly work.
-   I liked this post titled, *Advanced Practices in Spring Boot: [Building a Modular Application with Docker, Zipkin, and 100% Code Coverage](https://www.makariev.com/blog/advanced-spring-boot-structure-clean-architecture-modulith/)*.
-   There's a very interesting thread by Java community luminaries [Simon Martinelli and Gunnar Morling](https://twitter.com/simas_ch/status/1784133141050925458?s=12&t=n-UflcIbnx1lage-TBk0Cg) about the pros and cons of using two-phase commit (2PC), as well as a discussion of some alternatives. Very good, even if it's not specific to Spring, *per se*. I say this as the person who contributed the XA support for Spring Boot (close to a decade ago) and who avoids XA at all costs these days.
-   Want a very detailed discussion of all things cloud native? Check out this discussion I had with Thomas Vitale to promote his new book [*Cloud Native Spring in Action*](https://www.buzzsprout.com/1714721/14948449). I endorsed the book, and was excited to talk to him in this interview. Check it out! We get really into the weeds.
-   Good news from Abel Salgado Romero: the Asciidoclet, which lets you [write Javadoc using Asciidoctor, is back!](https://twitter.com/abelsromero/status/1783618624927707191?s=12&t=n-UflcIbnx1lage-TBk0Cg)
-   Nice, quick LinkedIn post from Spring Cloud lead Spencer Gibb on [handling errors in Spring Cloud Gateway's MVC routes](https://www.linkedin.com/posts/spencergibb_httpsdocsspringiospring-frameworkdocs-activity-7188198127974203393-hhAU/).
-   Spring Data and Neo4j legend Michael Hunger has a nice recap of the recent Google Cloud Next event (where I did a keynote, showcasing Spring AI and Spring AI's support for Gemini, Spring Boot, virtual threads, and GraalVM)\]([https://medium.com/@mesirii/google-cloud-next-recap-from-a-genai-and-databases-perspective-e0bce24b4535](https://medium.com/@mesirii/google-cloud-next-recap-from-a-genai-and-databases-perspective-e0bce24b4535)).
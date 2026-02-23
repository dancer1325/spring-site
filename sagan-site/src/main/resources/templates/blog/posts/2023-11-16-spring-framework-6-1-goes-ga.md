---
title: Spring Framework 6.1 goes GA
source: https://spring.io/blog/2023/11/16/spring-framework-6-1-goes-ga
scraped: 2026-02-23T09:10:32.403Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  November 16, 2023 | 2 Comments
---

# Spring Framework 6.1 goes GA

_Releases | Juergen Hoeller |  November 16, 2023 | 2 Comments_

Dear Spring community,

On behalf of the core framework team, it is my pleasure to announce that Spring Framework 6.1.0 is generally available from Maven Central now! The 6.1 generation comes with several key themes:

-   **Embracing JDK 21 LTS**
-   **Virtual Threads** (Project Loom)
-   **JVM Checkpoint Restore** (Project CRaC)
-   **Resource Lifecycle Management**, revisited
-   **Data Binding and Validation**, revisited
-   **New [RestClient](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/web/client/RestClient.html) and [JdbcClient](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/jdbc/core/simple/JdbcClient.html) APIs**

Virtual Threads are a perfect fit for Spring MVC on a lean Servlet stack (typically on Tomcat), providing a new degree of scalability with imperative programming in common web applications. At the same time, Spring's reactive infrastructure is considered complete now, with reactive caching and reactive scheduling available for a consistent reactive stack with Spring WebFlux (typically on Netty). So whether you are building on Spring MVC or Spring WebFlux, 6.1 provides attractive options for taking your system to the next level!

In terms of efficient deployment options on the HotSpot JVM, Spring Framework 6.1 closely integrates with Project CRaC for a JVM checkpoint arrangement: see [JVM Checkpoint Restore](https://docs.spring.io/spring-framework/reference/6.1/integration/checkpoint-restore.html). Furthermore, Spring users are empowered to adopt the latest AppCDS capabilities in JDK 21, pre-aligning with OpenJDK's Project Leyden; more on this soon.

Note that Spring Framework 6.1 provides a first-class experience on JDK 21 and Jakarta EE 10 at runtime while retaining a JDK 17 and Jakarta EE 9 baseline. Spring also tracks the evolution of GraalVM for JDK 21 with refined metadata inference while remaining compatible with GraalVM 22.3 for the time being.

Check out our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x) for details about the specific features in 6.1. We recommend an upgrade for all 6.0.x users at your earliest convenience!

Cheers, Juergen
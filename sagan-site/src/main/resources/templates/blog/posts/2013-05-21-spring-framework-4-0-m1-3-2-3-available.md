---
title: Spring Framework 4.0 M1 & 3.2.3 available
source: https://spring.io/blog/2013/05/21/spring-framework-4-0-m1-3-2-3-available
scraped: 2026-02-24T08:05:12.005Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  May 21, 2013 | 0 Comments
---

# Spring Framework 4.0 M1 & 3.2.3 available

_Engineering | Juergen Hoeller |  May 21, 2013 | 0 Comments_

Dear Spring community,

It's my pleasure to announce the **first milestone towards Spring Framework 4.0**, delivering a first cut of our work on several key themes:

-   the first wave of **Java SE 8 / OpenJDK 8 support** (some details following below)
-   initial support for **JMS 2.0, JPA 2.1, Bean Validation 1.1, and JSR-236 concurrency** (from the EE 7 umbrella)
-   a first cut of our **generalized condition mechanism for bean definitions** (@Conditional along the lines of @Profile)
-   Spring's **WebSocket endpoint model** (which Rossen will be introducing in more detail soon)

With respect to Java SE 8, we support OpenJDK 8 build 88+ in several areas of the framework:

-   support for the **1.8 bytecode format** in component scanning and subclass generation
-   **lambda expressions and method references** against Spring callback interfaces
-   **JSR-310 Date-Time** value types for Spring data binding and formatting
-   initial support for the JDK 8 **parameter name discovery** mechanism

Note: Spring's Java 8 support is a work in progress and tracking OpenJDK 8 snapshots on their way to the **JDK 8 Developer Preview date** in September (see [](http://openjdk.java.net/projects/jdk8/)[http://openjdk.java.net/projects/jdk8/](http://openjdk.java.net/projects/jdk8/)). We expect to release a corresponding Spring Framework 4.0 release candidate around that time, to be presented at SpringOne (September 9-12; see [](http://springone2gx.com)[http://springone2gx.com](http://springone2gx.com)).

Along with 4.0 M1, we've released **Spring Framework 3.2.3**, containing fixes for recently reported issues but also coming with OpenJDK 8 runtime support. Spring Framework 3.2.x will support **deployment on JDK 8 runtimes for applications compiled against JDK 7** (with -target 1.7) or earlier. Note that it won't support JDK 8's bytecode format (-target 1.8, as needed for lambdas); please upgrade to Spring Framework 4.0 for that purpose.

Enjoy your first experiences with Spring on OpenJDK 8, and let us know how it works for you!

Cheers, Juergen
---
title: From Spring Framework 6.2 to 7.0
source: https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0
scraped: 2026-02-23T07:29:32.951Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  October 01, 2024 | 12 Comments
---

# From Spring Framework 6.2 to 7.0

_Engineering | Juergen Hoeller |  October 01, 2024 | 12 Comments_

Dear Spring community,

Spring Framework 6.2 is shaping up for general availability in November 2024, with particularly significant revisions in the core container and in our web support: see ["What's New in Spring Framework 6.2"](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x#whats-new-in-version-62). This release is designed for use with JDK 17-23 and Jakarta EE 9-10.

At the same time, we are planning toward 2025 already, and it is my pleasure to announce that our November 2025 release will be the start of a new major generation: **Spring Framework 7.0!**

We will upgrade our baseline to **Jakarta EE 11** (Tomcat 11, Hibernate ORM 7, Hibernate Validator 9) and embrace the upcoming **JDK 25 LTS**, while retaining a **JDK 17 baseline** in alignment with the wider Java ecosystem. For Kotlin applications, we intend to base Spring Framework 7's support on **Kotlin 2**. Last but not least, our null-safety strategy is converging with the recently released **JSpecify** annotations.

Our strategic alignment with GraalVM and Project Leyden will continue, as well as our focus on Spring AOT. In terms of the programming model, we expect a revision of Spring's JPA and JMS support and some deprecations of outdated functionality, while generally aiming for a smooth upgrade path.

A first Spring Framework 7.0 milestone is expected to arrive in early 2025. Note that Spring Boot 3.5 and Spring Cloud 2025.0 (May 2025) will still be based on Spring Framework 6.2.x, whereas Spring Boot 4.0 and Spring Cloud 2025.1 (November 2025) are going to build on Spring Framework 7.0 GA.

Cheers, Juergen
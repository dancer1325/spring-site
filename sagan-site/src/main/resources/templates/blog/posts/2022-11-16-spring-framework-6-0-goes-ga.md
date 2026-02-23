---
title: Spring Framework 6.0 goes GA
source: https://spring.io/blog/2022/11/16/spring-framework-6-0-goes-ga
scraped: 2026-02-23T10:26:17.606Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  November 16, 2022 | 44 Comments
---

# Spring Framework 6.0 goes GA

_Releases | Juergen Hoeller |  November 16, 2022 | 44 Comments_

Dear Spring community,

It is my pleasure to announce that Spring Framework 6.0.0 is generally available from Maven Central now! This is the start of a new framework generation for 2023 and beyond, embracing current and upcoming innovations in OpenJDK and the Java ecosystem. At the same time, we carefully designed it as a straightforward upgrade from Spring Framework 5.3.x for modern-day runtime environments.

As a major revision of the core framework, Spring Framework 6.0 comes with a Java 17+ baseline and a move to Jakarta EE 9+ (in the `jakarta` namespace), with a focus on the recently released Jakarta EE 10 APIs such as Servlet 6.0 and JPA 3.1. This provides access to the latest web containers such as [Tomcat 10.1](https://tomcat.apache.org/whichversion.html) and the latest persistence providers such as [Hibernate ORM 6.1](https://hibernate.org/orm/releases/6.1/). Don't be stuck on Java EE 8, make the leap to the `jakarta` namespace, ideally straight to the Jakarta EE 10 level! The upcoming Spring Boot 3.0.0 release includes corresponding managed dependencies for you.

Infrastructure-wise, 6.0 introduces a foundation for [Ahead-Of-Time transformations](https://spring.io/blog/2022/03/22/initial-aot-support-in-spring-framework-6-0-0-m3) and the corresponding AOT processing support for Spring application contexts. This enables first-class support for [GraalVM native images with Spring Boot 3](https://spring.io/blog/2022/09/26/native-support-in-spring-boot-3-0-0-m5). You may also explore [Project Loom](https://openjdk.org/jeps/425)'s virtual threads with Spring applications - see ["Embracing Virtual Threads"](https://spring.io/blog/2022/10/11/embracing-virtual-threads) - and dive into [Project CRaC](https://github.com/CRaC/docs) 's checkpoint restore approach for faster JVM startups, both of which are in preview at this point but expected to become first-class features for Spring Framework 6.x based applications.

There are many further features and refinements available in Spring Framework 6.0, e.g. an [HTTP interface client](https://docs.spring.io/spring-framework/docs/6.0.0/reference/html/integration.html#rest-http-interface), support for [RFC 7807 problem details](https://docs.spring.io/spring-framework/docs/6.0.0/reference/html/web.html#mvc-ann-rest-exceptions), and Micrometer-based observability for HTTP clients. Please see our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-6.x/) for a comprehensive overview and give 6.0.0 an early try!

Cheers, Juergen

[Project Page](https://projects.spring.io/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework/milestones) | [Documentation](https://docs.spring.io/spring-framework/docs/6.0.0/reference/html/)
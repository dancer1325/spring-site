---
title: Spring Framework 6.0 goes RC1
source: https://spring.io/blog/2022/10/12/spring-framework-6-0-goes-rc1
scraped: 2026-02-23T10:37:35.414Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  October 12, 2022 | 6 Comments
---

# Spring Framework 6.0 goes RC1

_Releases | Juergen Hoeller |  October 12, 2022 | 6 Comments_

Dear Spring community,

It is my pleasure to announce that a feature-complete Spring Framework 6.0 release candidate is [available](https://repo.spring.io/) now! We are expecting a further release candidate in time for the first Spring Boot 3.0 release candidate next week, and then our final releases for general availability in November.

As a major revision of the core framework, 6.0 RC1 comes with a Java 17+ baseline, a move to Jakarta EE 9+ (in the `jakarta` namespace superseding the former `javax` based EE APIs), and a broader infrastructure revision. This provides access to the latest web containers such as [Tomcat 10](https://tomcat.apache.org/whichversion.html) / [Jetty 11](https://www.eclipse.org/jetty/download.php) and the latest persistence providers such as [Hibernate ORM 6.1](https://hibernate.org/orm/releases/6.1/) - all of which are exclusively available with the jakarta-namespaced variants of the Servlet API and JPA. It also sets the stage for the further evolution of those APIs and providers, as well as the further evolution of the JDK itself.

Most importantly, this release completes our foundation for [Ahead-Of-Time transformations](https://spring.io/blog/2022/03/22/initial-aot-support-in-spring-framework-6-0-0-m3) and the corresponding AOT processing support for Spring application contexts. This opens up a wide range of optimized deployment arrangements, from fine-tuned JVM deployments to first-class support for GraalVM native images (see the [related Spring Boot 3 blog post](https://spring.io/blog/2022/09/26/native-support-in-spring-boot-3-0-0-m5)). Stay tuned for Spring Boot 3.0 RC1!

On a timely note, there is also an opportunity to explore virtual threads (the "Project Loom" preview in JDK 19) with Spring-based applications: See ["Embracing Virtual Threads"](https://spring.io/blog/2022/10/11/embracing-virtual-threads) for an overview. At this point, we provide customization options to plug in virtual-thread based `Executor` implementations; we aim to provide first-class configuration options when Project Loom goes out of preview.

There are many further features and refinements available in Spring Framework 6.0, e.g. an [HTTP interface client](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/integration.html#rest-http-interface) based on `@HttpExchange` service interfaces, support for [RFC 7807 problem details](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/web.html#mvc-ann-rest-exceptions), and Micrometer-based observability for Spring's HTTP clients. Please see our [What's New page](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-6.x/) for a comprehensive overview and give 6.0 an early try!

Cheers, Juergen

[Project Page](https://projects.spring.io/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework/milestones) | [Documentation](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/)
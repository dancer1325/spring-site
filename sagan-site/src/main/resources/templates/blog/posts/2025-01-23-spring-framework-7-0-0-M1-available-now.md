---
title: Spring Framework 7.0.0-M1 Available Now
source: https://spring.io/blog/2025/01/23/spring-framework-7-0-0-M1-available-now
scraped: 2026-02-23T07:39:39.760Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  January 23, 2025 | 0 Comments
---

# Spring Framework 7.0.0-M1 Available Now

_Releases | Brian Clozel |  January 23, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the first milestone of the next Spring Framework generation.

As [announced previously](https://spring.io/blog/2025/01/21/milestones-to-central), we shipped "7.0.0-M1" to the usual repo.spring.io artifact repository, but also to Maven Central. We hope to collect more feedback from the community this year along the way; we are targeting November 2025 for the official release date.

This first milestone partially delivers [the baseline changes that we shared last October](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0). Spring Framework still expects a JDK 17-27 compatibility range and raises its minimum requirements to Jakarta EE 11 (Tomcat 11, Hibernate ORM 7, Hibernate Validator 9), Kotlin 2.x and GraalVM 23. This is also an opportunity for us to ship API removals and deprecations that we intend to enforce as of 7.0.

There are quite a few features scheduled already and the team is working on bringing them in the next milestones. 7.0.0-M1 ships a first round of [Null Safety](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/core/null-safety.html#null-safety-migrating) work, retiring former `org.springframework.lang` annotations in favor of JSpecify. We will share a dedicated blog post soon!

This first milestone kicks off the entire release train for the Spring portfolio, so you can expect new milestones from your favorite Spring projects very soon. If you would like to test this in your Spring Boot application, keep an eye on [the Boot milestone page](https://github.com/spring-projects/spring-boot/milestones) and this blog for updates.

[Project Page](https://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/reference/)
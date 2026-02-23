---
title: New tutorial about Spring Boot and Kotlin
source: https://spring.io/blog/2018/05/11/new-tutorial-about-spring-boot-and-kotlin
scraped: 2026-02-23T15:24:38.716Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  May 11, 2018 | 6 Comments
---

# New tutorial about Spring Boot and Kotlin

_Engineering | Sébastien Deleuze |  May 11, 2018 | 6 Comments_

For 2 years, we have introduced Kotlin support in Spring projects (Framework, Boot, Data) and published various blog posts, sample projects, slides and documentation. Today, we are publishing an opinionated tutorial intended to summarize in a single place how to build a Spring Boot web application in Kotlin leveraging these features and following best practices: [https://spring.io/guides/tutorials/spring-boot-kotlin/](https://spring.io/guides/tutorials/spring-boot-kotlin/)

Topics covered are:

-   How to create a Spring Boot 2 project in Kotlin
-   Understanding the build configuration
-   Testing with JUnit 5: integration tests, `@WebMvcTest` + mocking
-   Persistence with JPA and data classes
-   Creating your own extensions
-   Rendering web pages with Mustache
-   HTTP API with `@RestController`
-   Configuration properties

Another tutorial will follow in order to show how WebFlux functional Kotlin DSL, `WebClient` and `WebTestClient` can be used to build Reactive application with Spring Boot 2 and Kotlin.
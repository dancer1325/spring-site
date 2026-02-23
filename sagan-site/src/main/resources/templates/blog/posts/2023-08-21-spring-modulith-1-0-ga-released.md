---
title: Spring Modulith 1.0 GA released
source: https://spring.io/blog/2023/08/21/spring-modulith-1-0-ga-released
scraped: 2026-02-23T09:28:34.809Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 21, 2023 | 1 Comment
---

# Spring Modulith 1.0 GA released

_Releases | Oliver Drotbohm |  August 21, 2023 | 1 Comment_

On behalf of the community and everyone who contributed, I'm proud to announce the release of Spring Modulith 1.0 GA. What started as an R&D side project over 5 years ago, became an experimental Spring project in 2022 is now available as a fully supported, top-level project to the Spring community.

Just as Spring has evolved over [the last 20 years](https://springone.io/history-of-spring) we always wanted Java developers to be able to build software that's evolvable over time. Back then, placing dependency injection at the heart of the component model was revolutionary and enabled developers to unit test their code easily. Spring's support for integration testing outside an application server was unprecedented at the time, too, and helped to raise the quality of enterprise applications significantly. We now continue that mission on a slightly higher, architectural level of abstraction.

In the same way that Spring Boot has an opinion on the technical arrangement of an application, Spring Modulith implements an opinion on how to structure it functionally and how the individual, logical parts of it should interact with each other. As a result, it allows developers to build high-quality applications that are evolvable to accommodate changing business requirements over time.

At its core, Spring Modulith provides…

-   … [a convention-based module model](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/#fundamentals.modules) for Spring Boot applications
-   … [verification](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/#verification) that the functional architecture does not accidentally degrade
-   … [the ability to integration test](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/#testing) functional modules individually
-   … an opinionated, eventually consistent [application module interaction model](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/#events)
-   … support to [derive architectural documentation](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/#documentation) from the arrangement
-   … [application observability and actuators](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/#production-ready) driven by the functional architecture

If you want to find out more about the individual features, please check out the [reference documentation](https://docs.spring.io/spring-modulith/docs/1.0.0/reference/html/). Beyond that, the [blog post](https://spring.io/blog/2022/10/21/introducing-spring-modulith) originally announcing the project is a great overview, too.

I would like to thank everyone who has accompanied the project until this point through ideas, feedback, or even pull requests.
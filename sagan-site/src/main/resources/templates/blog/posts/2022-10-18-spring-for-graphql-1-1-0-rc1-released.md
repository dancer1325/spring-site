---
title: Spring for GraphQL 1.1.0-RC1 released
source: https://spring.io/blog/2022/10/18/spring-for-graphql-1-1-0-rc1-released
scraped: 2026-02-23T10:37:15.741Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  October 18, 2022 | 0 Comments
---

# Spring for GraphQL 1.1.0-RC1 released

_Releases | Brian Clozel |  October 18, 2022 | 0 Comments_

I'm pleased to announce that the first release candidate of Spring for GraphQL 1.1.0 is now available from our [Milestone repository](https://repo.spring.io/milestone). This version will be shipped with Spring Boot 3.0.0-RC1 due for release later this week.

This release candidate is the last stop for shipping new features; from that point, we'll be focusing on bug fixes and documentation improvements. Our goal is to stabilize the current branch for [our GA release scheduled next month](https://github.com/spring-projects/spring-graphql/milestone/14).

With RC1, we're shipping our new Observability support in Spring for GraphQL. Based on the [new Micrometer Observation work](https://spring.io/blog/2022/10/12/observability-with-spring-boot-3), this infrastructure replaces [the former GraphQL Metrics support in Spring Boot 2.7](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.metrics.supported.spring-graphql). GraphQL is a good use case for Observability in general, as the GraphQL engine can distribute the data fetching operations over caches, databases, REST APIs and more. It's important not only to keep track of performance metrics for your GraphQL API, but also to be able to explore traces and investigate production issues.

We didn't have time to tackle features like [Pagination/Relay](https://github.com/spring-projects/spring-graphql/issues/103) or [AOT/Native support](https://github.com/spring-projects/spring-graphql/issues/495), but we're listening to the community. We're working on our roadmap for the next feature version, so now is the time to vote on existing issues to show your interest!

The annual [Spring survey is here](https://spring.io/survey), it's a great way to let us know what you think!

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.1.0-RC1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
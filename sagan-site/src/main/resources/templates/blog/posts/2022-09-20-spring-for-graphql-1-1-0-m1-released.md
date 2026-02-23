---
title: Spring for GraphQL 1.1.0-M1 released
source: https://spring.io/blog/2022/09/20/spring-for-graphql-1-1-0-m1-released
scraped: 2026-02-23T10:40:24.936Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  September 20, 2022 | 2 Comments
---

# Spring for GraphQL 1.1.0-M1 released

_Releases | Brian Clozel |  September 20, 2022 | 2 Comments_

I'm pleased to announce the first milestone release of Spring for GraphQL 1.1.0 is now available from our [Milestone repository](https://repo.spring.io/milestone). This version will be shipped with Spring Boot 3.0.0-M5 due for release later this week.

Spring Boot 3.0 is around the corner and the community is expecting a compatible Spring for GraphQL version to go with it. Currently, [the best way to prepare for the Spring Boot 3.0 upgrade](https://spring.io/blog/2022/05/24/preparing-for-spring-boot-3-0) is to upgrade to Spring Boot 2.7 and Java 17, but Spring Boot 3.0 has new baseline requirements, namely Java 17, Jakarta APIs and Spring Framework 6.0.

Given that Spring for GraphQL 1.0.0 was released towards the end of May this year, we didn't feel we would have enough time nor feedback to go with a major release of the project for Boot 3.0. This is why the goal of the 1.1 release is simply to adapt to the new baseline requirements and provide a smooth upgrade to Spring Boot 3.0 for existing projects.

This first milestone brings those foundational changes: the Java 17, Jakarta APIs, and a Spring Framework 6.0 baseline. We're also taking the opportunity to upgrade to GraphQL Java 19.x -- a painless upgrade on our side, thanks to the GraphQL Java team! We've also replaced our internally developed [context propagation mechanism](https://docs.spring.io/spring-graphql/docs/1.0.1/reference/html/#execution-context) with the new [Micrometer Context Propagation](https://github.com/spring-projects/spring-graphql/issues/459) library, that's intended for use broadly across Spring projects. It allows Spring applications to propagate context across various such mechanisms, e.g. `ThreadLocal`, Reactor `Context`, `GraphQLContext`, and others.

In the next milestones, we will consider how we can adapt our current arrangement with important themes in Spring Boot 3.0: GraalVM native image and Micrometer Observability support. Given the short timeline, we might schedule some changes for a future version -- again, a smooth upgrade is our top priority here.

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.1.0-M1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
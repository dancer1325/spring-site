---
title: Spring for GraphQL 1.2.5 released
source: https://spring.io/blog/2024/02/21/spring-for-graphql-1-2-5-released
scraped: 2026-02-23T08:54:53.276Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  February 21, 2024 | 0 Comments
---

# Spring for GraphQL 1.2.5 released

_Releases | Brian Clozel |  February 21, 2024 | 0 Comments_

I am pleased to announce that Spring for GraphQL 1.2.5 is now available on Maven Central.

This release closes [20 issues](https://github.com/spring-projects/spring-graphql/releases/tag/v1.2.5). We have shipped important fixes for [`@SubscriptionMapping` support](https://github.com/spring-projects/spring-graphql/issues/861), which was not working properly with graphql-java 21.x+ versions, and for scrolling with [offset positions](https://github.com/spring-projects/spring-graphql/issues/916), which did not correctly match the Relay spec.

The 1.2.5 version will ship with Spring Boot 3.1.9 and 3.2.3, [to be released later this week](https://calendar.spring.io/). We are excited to ship [Milestone 1 of Spring for GraphQL 1.3.0](https://spring.io/blog/2024/02/21/spring-for-graphql-1-3-m1-released) today.

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/reference) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
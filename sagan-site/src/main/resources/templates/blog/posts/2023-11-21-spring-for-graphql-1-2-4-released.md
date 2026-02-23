---
title: Spring for GraphQL 1.2.4 released
source: https://spring.io/blog/2023/11/21/spring-for-graphql-1-2-4-released
scraped: 2026-02-23T09:08:34.874Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  November 21, 2023 | 0 Comments
---

# Spring for GraphQL 1.2.4 released

_Releases | Brian Clozel |  November 21, 2023 | 0 Comments_

I am pleased to announce that Spring for GraphQL 1.2.4 is now available on Maven Central.

This release closes [23 issues](https://github.com/spring-projects/spring-graphql/releases/tag/v1.2.4). Thanks to community feedback, there are several bug fixes, some minor improvements, and documentation updates that help us evolve 1.2.x specific features such as pagination support, and exception handling with annotated controller methods.

The 1.2.4 version will ship with Spring Boot 3.1.6 and 3.2.0, [to be released later this week](https://calendar.spring.io/). As a reminder, [we are not releasing a new minor version with Spring Boot 3.2](https://spring.io/blog/2023/09/19/spring-for-graphql-1-0-5-1-1-6-1-2-3-released#spring-for-graphql-13), and intend to release 1.3 with Spring Boot 3.3 in May, next year instead.

While the 1.2.4 release is mostly about evolving our current features, we've also added a new section in the reference docs on [Code generation](https://docs.spring.io/spring-graphql/reference/codegen.html). Spring for GraphQL does not offer infrastructure for code generation, but tools such as this can be useful for implementing clients. [DGS Code Generation](https://netflix.github.io/dgs/generating-code-from-schema/), created by our friends at Netflix, is a good option and supports numerous features, from request builders to actual data type classes. We also intend to take this a bit further in 1.3, see [issue #846](https://github.com/spring-projects/spring-graphql/issues/846).

In the mean time,if you'd like to give this a try, go to [https://start.spring.io](https://start.spring.io), select "Spring for GraphQL" and "GraphQL DGS Code Generation", and you'll get a Gradle or Maven project with the required setup to generate GraphQL types automatically contributed to your application build.

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/reference) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
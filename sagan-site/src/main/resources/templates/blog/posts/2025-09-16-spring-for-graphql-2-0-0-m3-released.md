---
title: Spring for GraphQL 2.0.0-M3 released
source: https://spring.io/blog/2025/09/16/spring-for-graphql-2-0-0-m3-released
scraped: 2026-02-23T07:30:05.066Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  September 16, 2025 | 0 Comments
---

# Spring for GraphQL 2.0.0-M3 released

_Releases | Brian Clozel |  September 16, 2025 | 0 Comments_

I am pleased to announce that the third Spring for GraphQL 2.0 Milestone release is now available.

## [](#nullability-support-in-schema-mapping-inspection)Nullability support in schema mapping inspection

Our [Schema Mapping Inspection](https://docs.spring.io/spring-graphql/reference/2.0/request-execution.html#execution.graphqlsource.schema-mapping-inspection) feature got a recent upgrade thanks to our work on Null-safety in Spring projects.

If your application is written in Kotlin, or is using [Null-safety](https://docs.spring.io/spring-framework/reference/core/null-safety.html#page-title) annotations, further inspections will be performed. The GraphQL schema can declare nullable types (`Book`) and non-nullable types (`Book!`). We can ensure that both the schema and the application are in sync when it comes to nullability information.

-   For schema fields, we can check that the relevant `Class` properties and `DataFetcher` return types with the same nullability.
-   For field arguments, we can ensure that `DataFetcher` parameters have the same nullability

With this feature, we are finally connecting the nullability information from the schema to application types.

## [](#aligning-with-the-cursor-connection-support)Aligning with the cursor connection support

We fixed the generation process for the [`*Connection` types in your schema](https://docs.spring.io/spring-graphql/reference/2.0/request-execution.html#execution.pagination.types). We are now better aligning with the official specification by creating a nullable collection `edges: [*Edge]` instead of the previously non-nullable one.

This is a small but important change that will be reflected in your application schema.

## [](#request-cancellation-support)Request cancellation support

Spring for GraphQL already supported request cancellation, effectively preventing further data fetching if the main request is cancelled by the client. With GraphQL Java 25, we have now switched to the new official implementation of that feature by the project team.

## [](#whats-next)What's next?

We have [compiled all release notes on our wiki](https://github.com/spring-projects/spring-graphql/wiki/Spring-for-GraphQL-2.0). Our first and only release candidate is scheduled next month. We have completed [most of our goals for this generation](https://github.com/spring-projects/spring-graphql/milestone/52), but it's still time to send feedback our way!

2.0.0-M3 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

## [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/reference) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
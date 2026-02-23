---
title: Spring for GraphQL 1.2.0 released
source: https://spring.io/blog/2023/05/17/spring-for-graphql-1-2-0-released
scraped: 2026-02-23T09:50:12.472Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  May 17, 2023 | 1 Comment
---

# Spring for GraphQL 1.2.0 released

_Releases | Brian Clozel |  May 17, 2023 | 1 Comment_

I'm pleased to announce that Spring for GraphQL 1.2.0 is now available on Maven Central. This version will ship with Spring Boot 3.1.0 later this week.

This is a new feature release for the Spring Boot 3.1.x generation. If you are still using Spring for GraphQL 1.0.x, please consider upgrading to Spring Boot 3.x as [OSS support will end next November](https://spring.io/projects/spring-graphql#support). We have also raised the baseline version for GraphQL Java to 20.x and we will align with the [new GraphQL Java release policy](https://github.com/graphql-java/graphql-java/discussions/3138) from now on.

We have worked on the most popular issues from the community.

### [](#pagination-support)Pagination Support

This release provides first-class support for pagination, seamlessly adapting Spring Data pagination to the GraphQL [Cursor Connection specification](https://relay.dev/graphql/connections.htm), including support for the latest and greatest [Scroll API](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2023.0-%28Ullman%29-Release-Notes#new-and-noteworthy) in Spring Data 2023.01. To learn more about the pagination support in Spring GraphQL 1.2, check out the project's [reference documentation](https://docs.spring.io/spring-graphql/docs/1.2.0/reference/html/#execution.pagination).

### [](#schema-mapping-checks)Schema Mapping Checks

If you are a GraphQL Java Kickstart user, you're probably missing the feature to check schema mappings on startup. We've taken inspiration and created a similar feature to detect schema fields without a corresponding `DataFetcher` or Java object property, and likewise to detect controller methods and `DataFetcher` registrations to non-existing fields.

You can enable this through the `GraphQlSource.Builder`, get access to a `SchemaReport` on startup, and decide how to handle it. To learn more this, check out the project's [reference documentation](https://docs.spring.io/spring-graphql/docs/1.2.0/reference/html/#execution.graphqlsource.schema-mapping-inspection).

### [](#annotated-exception-handling)Annotated Exception Handling

Starting in this release, you can handle exceptions from `@SchemaMapping` controller methods via `@GraphQlExceptionHandler` annotated handler methods. Those can be declared and apply locally within the same `@Controller`, or globally with `@ControllerAdvice`.

One benefit of this is the ability to also handle exceptions from `@SubscriptionMapping` methods, including exceptions raised later after the `Publisher` has started emitting data. To learn more, check out the project's [reference documentation](https://docs.spring.io/spring-graphql/docs/1.2.0/reference/html/#controllers.exception-handler).

## [](#other)Other

For a list of all enhancements, see the [Versions](https://github.com/spring-projects/spring-graphql/wiki/Spring-for-GraphQL-Versions) wiki page.

## [](#in-conclusion)In Conclusion

We expect to have our next minor release 1.3 in about 6 months, later this year, and look forward to continued feedback and evolution of our programming model and features set.

We are also at [Spring I/O](https://2023.springio.net/) this week where we will present [Observing Spring for GraphQL in Action](https://2023.springio.net/sessions/observing-spring-for-graphql-in-action/). For those attending the conference, we look forward to seeing you and chatting.

Last but not least, check out the newly published book [GraphQL with Java and Spring](https://leanpub.com/graphql-java) from our collaborators, Andi Marek and Donna Zhou.

### [](#how-to-get-involved)How to get involved?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.2.0/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
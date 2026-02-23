---
title: Spring for GraphQL 1.2.0-M1 released
source: https://spring.io/blog/2023/03/21/spring-for-graphql-1-2-0-m1-released
scraped: 2026-02-23T09:55:03.285Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  March 21, 2023 | 0 Comments
---

# Spring for GraphQL 1.2.0-M1 released

_Releases | Brian Clozel |  March 21, 2023 | 0 Comments_

I am pleased to announce the first milestone release of Spring for GraphQL 1.2.0 is now available from our [Milestone repository](https://repo.spring.io/milestone). This version will be shipped with Spring Boot 3.1.0-M2 due for release this Thursday.

This first milestone raises the baseline to GraphQL Java 20.0 and we will align with the [new GraphQL Java release policy](https://github.com/graphql-java/graphql-java/discussions/3138) in the future. We are also upgrading to the next generations of Spring Framework, Spring Data and Spring Security.

### [](#pagination-support)Pagination Support

When it comes to navigating large result sets with GraphQL, the [Cursor Connection Specification](https://relay.dev/graphql/connections.htm) is very popular. With the features added to support it, Spring for GraphQL applications can leverage the specification and offer modern pagination and scrolling features to clients.

The specification assigns each result item a unique cursor that a client can use to request the next items after or the previous items before the cursor reference, as a way of navigating forward or backward.

With the following schema, we will notice the "Connection" field type without a corresponding declaration for the type:

```
CopyQuery {
    books: BookConnection
}

type Book {
    id: ID!
    title: String!
}
```

Spring for GraphQL will automatically add the required boilerplate, schema type definitions - you will not need to write the following in your schema:

```
Copytype BookConnection {
    edges: [BookEdge]!
    pageInfo: PageInfo!
}

type BookEdge {
    node: Book!
    cursor: String!
}

type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
}
```

Also, there is no need to change your Controllers to return and populate such `Connection` types, wrapping the underlying data items, and creating item cursors. There is a new `ConnectionAdapter` contract that implements this boilerplate work once, and applies it to every `Connection` type field.

Developers can implement their own, or use the built-in adapters for the existing Spring Data `Slice` pagination type and the new `Window` type. We worked together with the Spring Data team to provide cursor support that aligns with the needs of GraphQL applications. For more details, see [blog post](https://spring.io/blog/2023/03/20/spring-data-2023-0-m1-and-service-release-2022-0-4-and-2021-2-10-released) on the new Spring Data Scroll API that supports offset and key based pagination.

To learn more about the pagination support in Spring GraphQL 1.2 M1, check out the project's updated [reference documentation](https://docs.spring.io/spring-graphql/docs/1.2.0-M1/reference/html/#execution.pagination).

### [](#schema-mapping-checks-on-startup)Schema Mapping Checks On Startup

Spring for GraphQL favors a schema-first approach, where the schema is a well-written, documented contract with clients. The Controller annotation model makes it easy to map to that schema without writing boilerplate code. One aspect, however, is that it is possible to miss a Java property or a `@SchemaMapping` annotation somewhere in your code during the development cycle, and as a result a field may remain unmapped. Developers will notice this when testing the GraphQL API and it returns unexpected `null` bits in the response graph.

Our community requested that Spring for GraphQL warns them at startup if their `DataFetcher` or `@Controller` arrangement doesn't fulfill the entire schema. You will see logs similar to this during the startup phase:

```
CopyINFO 91221 --- [  restartedMain] efaultSchemaResourceGraphQlSourceBuilder :
  GraphQL schema inspection found missing mappings for: Query[authorById], Book[missing].
```

Spring for GraphQL will visit the `Query`, `Mutation` and `Subscription` types recursively, checking if `DataFetcher` instances or Controller handlers are registered for fields, or if a Java property exists. Missing entries will not fail the startup sequence, but will be reported in the console logs.

This could be a first step towards a richer feature, but for now we do not expose any public API for configuring it. We are also aware of several limitations, such as the inspection of Union types (those are skipped entirely). Please report problems you encountered with your schema in our issue tracker!

### [](#annotated-exception-handler-methods)Annotated Exception Handler Methods

We did not add this from the beginning with the thought that applications can register any number of `DataFetchingExceptionResolver` instances, each one handling a specific exception. However, the absence of a built-in facility to match exceptions resulted in plenty of `instanceof` type checks, and often a single resolver that handles exceptions.

The first 1.2 milestones provides support for `@GraphQlExceptionHandler` annotated handler methods, declared and applied locally within a `@Controller`, or across controllers and data fetchers through an `@ControllerAdvice`.

Such annotated exception handler methods can also handle exceptions from `@SubscriptionMapping` methods, both for exceptions that occur in the beginning when the method is invoked to return a `Publisher` and later after the `Publisher` has started emitting data.

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.2.0-M1/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
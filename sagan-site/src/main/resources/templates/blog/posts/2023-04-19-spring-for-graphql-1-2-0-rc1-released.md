---
title: Spring for GraphQL 1.2.0-RC1 released
source: https://spring.io/blog/2023/04/19/spring-for-graphql-1-2-0-rc1-released
scraped: 2026-02-23T09:54:39.143Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rossen Stoyanchev |  April 19, 2023 | 0 Comments
---

# Spring for GraphQL 1.2.0-RC1 released

_Releases | Rossen Stoyanchev |  April 19, 2023 | 0 Comments_

I'm happy to announce that a Spring for GraphQL 1.2 release candidate is now available via [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

## [](#pagination-for-querydsl-and-query-by-example)Pagination for Querydsl and Query By Example

The [M1 release](https://spring.io/blog/2023/03/21/spring-for-graphql-1-2-0-m1-released) provided abstractions and infrastructure for [pagination and sorting](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#execution.pagination), including support for input and output types on [annotated controller methods](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#controllers.schema-mapping.subrange) that minimize what applications need to do to support paginated queries.

The current release candidate completes this by extending pagination support to our [Querydsl](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#data.querydsl) and [Query By Example](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#data.querybyexample) `DataFetcher` implementations, both of which now expose a `scrollable` factory method.

In addition, the auto-registration for both Querydsl and Query by Example repositories has been extended to work for queries that return a [Connection type](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#execution.pagination.types).

## [](#schema-mappings-inspection)Schema Mappings Inspection

The M1 release provided a very essential [schema mappings inspection](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#execution.graphqlsource.schema-mapping-inspection) feature that checks whether all schema fields are covered by a `DataFetcher` registration, or have a matching Java object property.

In the current release candidate, this feature has been extended further to recognize paginated queries that return a [Connection type](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#execution.pagination.types), and to properly nest within their `EdgeNode` type on the schema type, as well as within the generic parameter of the Java type, in order to correctly compare the structures within.

The schema mappings inspection has also been updated to support schema interfaces and to report any types that were not inspected because of insufficient Java type information, e.g. schema `union` types that would be declared as `java.lang.Object` in a controller method return type.

If you haven't tried this feature yet, please do so and provide us with feedback.

## [](#single-input-type-with-querydsl-and-query-by-example)Single Input Type with Querydsl and Query By Example

For queries with a single argument that is a GraphQL input type, both Querydsl and Query by Example have been a little awkward to use, requiring an artificial wrapper type that has the single argument, whereas the actual data is nested in the structure of that argument's GraphQL input type.

In the current release candidate, such a wrapper type is no longer needed with Querydsl and Query by Example repositories, which can now bind to an object that reflects the GraphQL input type directly.

## [](#argument-binding-with-direct-field-access)Argument Binding with Direct Field Access

Spring for GraphQL argument binding already supports binding to a higher level target Object via constructor and property initialization, including Object structures with any level of nesting. However, sometimes property names may follow a different convention, and perhaps you don't own the objects and can't change them.

In current release candidate, we've added an option to allow falling back on direct field access which may help in such a situation.

## [](#in-closing)In Closing

Our next stop is the GA release on 17 May, followed by the fantastic [Spring I/O](https://2023.springio.net/) conference where Brian and I will present [Observing Spring for GraphQL In Action](https://2023.springio.net/sessions/observing-spring-for-graphql-in-action/). If you're going to be at the conference, please come say hello. We'd love to speak with you!
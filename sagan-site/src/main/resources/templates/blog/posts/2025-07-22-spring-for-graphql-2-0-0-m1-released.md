---
title: Spring for GraphQL 2.0.0-M1 released
source: https://spring.io/blog/2025/07/22/spring-for-graphql-2-0-0-m1-released
scraped: 2026-02-23T07:35:32.003Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  July 22, 2025 | 0 Comments
---

# Spring for GraphQL 2.0.0-M1 released

_Releases | Brian Clozel |  July 22, 2025 | 0 Comments_

I am pleased to announce that the first Spring for GraphQL 2.0 Milestone release is now available. This generation builds on top of [Spring Framework 7.0 and requires the same baseline upgrades](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#baseline-upgrades).

## [](#baseline-upgrades)Baseline upgrades

Spring for GraphQL now requires graphql-java 24.0, but we are still tracking the upcoming 25.0 as a potential baseline for this generation. The 25.0 version is likely to bring interesting features, including a [complete support for request cancellation in the core engine](https://github.com/graphql-java/graphql-java/issues/3879).

We are following the lead of Spring Framework, as we've upgraded to Kotlin 2.2.0. Similarly, spring-graphql now picks Jackson 3.x as the default but still supports Jackson 2.x as a fallback option. If you are upgrading your project, check out [this section on major changes for this Jackson upgrade](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-7.0-Release-Notes#jackson-3x-support).

## [](#new-features)New features

### [](#nullability-and-jspecify)Nullability and JSpecify

We have applied the [JSpecify annotations](https://jspecify.dev/docs/user-guide/) to its entire public API. This should now help IDEs provide you with consistent warnings, avoiding `NullPointerExceptions` in production when using Spring for GraphQL.

If you are using Kotlin 2.1+, such annotations are directly baked in Kotlin types and used at compile time. Nullability checks on the spring-graphql codebase are performed automatically at build time. Please share your upgrade experience with us!

This first milestone ships a few new features requested by the community.

### [](#flexible-binding-for-input-types)Flexible binding for input types

Did you ever encounter type attributes in your GraphQL schema with a syntax that's not compatible with Java field names, or not aligned with your code style? For example, an input type like:

```graphql
Copyinput CreateProjectInput {
    id: ID!
    project_slug: String
}
```

`GraphQlArgumentBinder` now has options for allowing mapping GraphQL arguments to Object property names. Yau can provide a custom function that will adapt the schema name to a style of your choosing.

```java
Copy// configure binding options for GraphQL
var options = GraphQlArgumentBinder.Options.create()
    .nameResolver(name -> toCamelCase(name));
```

You can then set those options on `AnnotatedControllerConfigurer#setBinderOptions`.

### [](#argumentvalue-for-client-input)ArgumentValue for client input

By default, input types in GraphQL are nullable and optional. An input value (or any of its fields) can be set to the `null` literal, or not provided at all. This distinction is useful for partial updates with a mutation where the underlying data may also be, either set to null or not changed at all accordingly.

On the client side, we could not express this properly for `*Input` types as Java does not have this present/null/ommitted concept. We now support the `ArgumentValue<T>` type on input types when serializing request variables. This is supported thanks to a Jackson module and [documented in "Optional input" section](https://docs.spring.io/spring-graphql/reference/2.0/client.html#client.argumentvalue).

### [](#multiple-queries-with-dgsgraphqlclient)Multiple queries with `DgsGraphQlClient`

The DGS GraphQL client allows sending multiple queries in a single request with a dedicated contract. This is now possible with the `DgsGraphQlClient`, since you can chain multiple `request()` calls for a single request exchange. See [the reference documentation for more](https://docs.spring.io/spring-graphql/reference/2.0/client.html#client.dgsgraphqlclient).

## [](#whats-next)What's next?

This is only the first milestone, and [we have other features in mind](https://github.com/spring-projects/spring-graphql/milestone/52). We are also considering the new GraphQL over HTTP specification changes, including the [HTTP 294 response status for partial responses](https://github.com/graphql/graphql-over-http/pull/346).

We are [compiling all release notes on our wiki](https://github.com/spring-projects/spring-graphql/wiki/Spring-for-GraphQL-2.0); in the meantime, don't hesitate to reach out with feedback and enhancement requests!

2.0.0-M1 is now available from [https://repo.spring.io](https://repo.spring.io) and [Maven Central](https://spring.io/blog/2025/01/21/milestones-to-central).

## [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/reference) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
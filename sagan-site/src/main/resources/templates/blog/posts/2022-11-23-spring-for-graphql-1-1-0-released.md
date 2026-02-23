---
title: Spring for GraphQL 1.1.0 released
source: https://spring.io/blog/2022/11/23/spring-for-graphql-1-1-0-released
scraped: 2026-02-23T10:26:41.254Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  November 23, 2022 | 0 Comments
---

# Spring for GraphQL 1.1.0 released

_Releases | Brian Clozel |  November 23, 2022 | 0 Comments_

I'm pleased to announce that Spring for GraphQL 1.1.0 is now available on Maven Central. This version will ship with Spring Boot 3.0.0 later this week.

Spring for GraphQL 1.0.0 was released 6 months ago, so why a new minor version now? The team initially planned a 1.1.0 release with one goal in mind: support Spring Framework 6.0 / Spring Boot 3.0 and adapt to the new baseline for that generation:

-   Java 17
-   Jakarta EE 9
-   GraphQL Java 19

In addition, we shipped some new and noteworthy features we think you'll like:

## [](#observability)Observability

Observability is a major theme across the Spring portfolio in this major new Spring Framework 6 generation. Spring projects now have their own, built-in instrumentation for metrics and traces based on the [new Observation API](https://spring.io/blog/2022/10/12/observability-with-spring-boot-3) from Micrometer. This new instrumentation in Spring for GraphQL replaces [the former GraphQL Metrics support](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.metrics.supported.spring-graphql) in Spring Boot 2.7. This is important to keep track of performance metrics for your GraphQL API, as well as to to explore traces and investigate production issues. GraphQL is a good use case for Observability in general, as the GraphQL engine can fan out data fetching across REST APIs, data stores, caches, and more.

## [](#context-propagation)Context Propagation

Observability depends on transparent context propagation. This is particularly important for GraphQL applications where a request may start in an HTTP handler, and result in calls to many `DataFetcher` components, each of which can be asynchronous, and also reactive in Spring for GraphQL.

In version 1.0, we provided the `ThreadLocalAccessor` contract to allow applications to hook any `ThreadLocal` into context propagation. For version 1.1, we collaborated with the Micrometer and the Reactor teams to extract a separate library, and this is what lead to the [Micrometer Context Propagation Library](https://github.com/micrometer-metrics/context-propagation#context-propagation-library).

In version 1.1, context propagation is based on this new library. It should work just the same, but your `ThreadLocalAccessor` implementations will need to be switched to the contract from the new library. There are benefits too. The new library provides a more transparent and more flexible mechanism, as well as a dedicated public API to register accessors, to take snapshots, to restore context, and so on, all of which increases its usability and provides more control to applications.

As one example of where the new library brings something new, a `ThreadLocal` value from the HTTP layer (e.g. Spring MVC) will now appear as a name-value pair in the `GraphQLContext` that's exposed to `DataFetcher` components, and therefore a controller method can access that via `@ContextValue`.

## [](#aot-and-graalvm-native-images)AOT and GraalVM Native Images

Spring Framework 6 and Spring Boot 3.0 introduce support for building memory-efficient and fast, operating system- and architecture-specific, native binaries with GraalVM's native image compiler. To enable this for Spring for GraphQL applications, first we collaborated with the GraphQL Java team to [contribute GraphQL Java metadata](https://github.com/oracle/graalvm-reachability-metadata/pull/102) to the GraalVM Reachability Metadata Repository, which benefits the entire Java community, not just Spring applications. This covers GraphQL Java itself, but the GraphQL Java engine also needs to perform reflection on application Java types that map to the schema. To accommodate this, we've also created a dedicated AOT processor that inspects your GraphQL controllers at build time, and makes the necessary registrations.

If you'd like to give this a try, please start with the [Spring Boot reference documentation on Native Images](https://docs.spring.io/spring-boot/docs/3.0.0-SNAPSHOT/reference/html/native-image.html#native-image), and follow the latest updates [on the Spring Boot wiki](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-with-GraalVM).

## [](#argument-binding)Argument Binding

We've had plenty of great feedback related to argument binding. There are some limitations from the way we used Spring Framework's `DataBinder` to bind from the GraphQL arguments map to `@Argument` method parameters. This included specific scenarios with non-ordered collection types, generics, and others on the target objects.

Furthermore, a major requirement was to support GraphQL nullability which differentiates between an input argument that is explicitly set to `null` vs omitted entirely. This is commonly used to support partial updates. However, with argument binding to higher level objects, a mere `null` property in the resulting object graph does not help to differentiate whether the value was set to `null` by the client or was not provided at all.

In version 1.1, we have introduced the following changes to `GraphQlArgumentBinder` that unlocks more possibilities:

-   binding to all types of Collections (`List`, `Map`, `Set`)
-   not requiring constructor binding for advanced cases
-   [new `ArgumentValue` wrapper type](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#controllers-schema-mapping-argument-value) that exposes information about whether the argument was omitted entirely

For 1.1, we did not have time to properly tackle important features like [Pagination/Relay](https://github.com/spring-projects/spring-graphql/issues/103), but we're listening to the community. We're working on our roadmap for the next feature version, so now is the time to vote on existing issues to show your interest!

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.1.0/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
---
title: Spring for GraphQL 1.3 M1 Released
source: https://spring.io/blog/2024/02/21/spring-for-graphql-1-3-m1-released
scraped: 2026-02-23T08:41:11.318Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rossen Stoyanchev |  February 21, 2024 | 1 Comment
---

# Spring for GraphQL 1.3 M1 Released

_Releases | Rossen Stoyanchev |  February 21, 2024 | 1 Comment_

On behalf of the Spring for GraphQL team, I am pleased to announce the availability of our first 1.3 milestone. The release includes a number of new features described in this post.

## [](#synchronous-graphqlclient)Synchronous GraphQlClient

`GraphQlClient` provides a common workflow for GraphQL requests over any transport including HTTP, WebSocket, and RSocket. Following the availability of Project Loom in Java 21, and a new synchronous [RestClient](https://spring.io/blog/2023/07/13/new-in-spring-6-1-restclient) in Spring Framework 6.1, we've now added the option to use `GraphQlClient` on a blocking stack, and to use a synchronous API. See the [reference docs](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/client.html#client.httpsyncgraphqlclient) for details on how to create `GraphQlClient` with a `RestClient`\-based transport.

`GraphQlClient` continues to be a common API over blocking and non-blocking transports, now also offering a choice of synchronous vs asynchronous usage. This means at build time you choose whether to run on blocking or non-blocking transport, and at runtime you retain the choice to perform requests synchronously or asynchronously.

## [](#dgsgraphqlclient)DgsGraphQlClient

To perform GraphQL requests, you need to provide the GraphQL operation as text, a String literal or loaded from a document file. Alternatively, [DGS Codegen](https://github.com/Netflix/dgs-codegen) can generate a Java client API to define requests. We've now added a new `DgsGraphQlClient` that makes it easy to use DGS code generated classes.

`DgsGraphQlClient` is a thin wrapper around any `GraphQlClient`. It provides a dedicated workflow to define the request, but otherwise uses `GraphQlClient` to perform requests, and exposes the same API to handle the response.

See [reference docs](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/client.html#client.dgsgraphqlclient) for details. In addition [Spring Initializer](https://start.spring.io) supports creating Spring GraphQL projects with DGS codegen enabled.

## [](#sse-support)SSE Support

We now provide support for handling GraphQL subscription requests over SSE with Spring MVC and WebFlux based on the [GraphQL over SSE](https://github.com/graphql/graphql-over-http/blob/main/rfcs/GraphQLOverSSE.md) spec. See the [reference docs](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/transports.html#server.transports.sse) for details.

On the client side, `HttpGraphQlClient` now supports GraphQL subscriptions over SSE.

## [](#apollo-federation)Apollo Federation

When a federated GraphQL service starts, it needs to initialize the `GraphQLSchema` through the [federation-jvm](https://github.com/apollographql/federation-jvm) library to add support for federation directives, and to handle requests for federated entities types.

We now provide `FederationSchemaFactory` to perform this configuration step. The factory detects `@EntityMapping` controller methods that you can use to load federated entity types. Such methods can use `@Argument` annotated method parameters to access entity id values with type conversion. They can execute synchronously or asynchronously. They can also have exceptions resolved via `@GraphQlExceptionHandler` methods resolved to `GraphQLError`s.

For details see the [reference docs](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/federation.html).

## [](#other)Other

Last but not least, we have collaborated with the DGS team on a common foundation for Spring GraphQL applications. You can [read a summary](https://github.com/Netflix/dgs-framework/pull/1766) of the effort. As a result there is a new integration in the DGS Framework that's being finalized, and there have been a number of important updates in the [Spring for GraphQL 1.2.5 release](https://spring.io/blog/2024/02/21/spring-for-graphql-1-2-5-released) that enable the integration, for the benefit of all Spring for GraphQL applications. We thank the DGS team and look forward to our continued collaboration!

Please, give the 1.3 M1 release a try via [https://repo.spring.io/milestone](https://repo.spring.io/milestone), and provide us with feedback at our [issue tracker](https://github.com/spring-projects/spring-graphql/issues)!
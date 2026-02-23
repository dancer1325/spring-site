---
title: Introducing Spring GraphQL
source: https://spring.io/blog/2021/07/06/introducing-spring-graphql
scraped: 2026-02-23T13:15:17.604Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  July 06, 2021 | 15 Comments
---

# Introducing Spring GraphQL

_Engineering | Rossen Stoyanchev |  July 06, 2021 | 15 Comments_

Following the Spring GraphQL project [announcement](https://spring.io/blog/2021/07/06/hello-spring-graphql) and the availability of a 1.0 milestone, this blog post aims to provide more details.

### [](#introduction)Introduction

If you're looking to get started, please head over to our [reference documentation](https://github.com/spring-projects/spring-graphql#documentation) and read the "Boot Starter" section, or run the [samples](https://github.com/spring-projects/spring-graphql/tree/main/samples).

If you don't know much about GraphQL, there are plenty of good resources. You can start at [graphql.org/learn](https://graphql.org/learn/).

GraphQL is [widely adopted](https://landscape.graphql.org/card-mode?category=graph-ql-adopter&grouping=category) and in "Early Majority" based on the InfoQ [Architecture Trends](https://www.infoq.com/articles/architecture-trends-2020/) for 2020. It provides an alternative to REST APIs that is more focused on data, and provides a schema and a query language for clients to use. The appeal from a client perspective is clear in this State of JavaScript [report](https://2020.stateofjs.com/en-US/technologies/datalayer/). You can read [GitHub's story](https://docs.github.com/en/graphql/overview/about-the-graphql-api) on why it uses GraphQL.

### [](#foundational-support)Foundational Support

As Andy Marek wrote in the [opening blog](https://spring.io/blog/2021/07/06/hello-spring-graphql), Spring GraphQL was conceived as the successor of the [GraphQL Java Spring](https://github.com/graphql-java/graphql-java-spring) project from the GraphQL Java team. This is why the initial focus of our collaboration was to match that functionality as well as integrate GraphQL Java and Spring in the best possible way.

To that end we created the following foundational support:

-   HTTP handlers -- available for both Spring MVC and WebFlux, built on [WebMvc](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#webmvc-fn) and [WebFlux](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#webflux-fn) functional endpoint APIs.
-   WebSocket handlers -- following the [protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) from [graphql-ws](https://github.com/enisdenjo/graphql-ws) with support for GraphQL subscription streams.
-   Web Interception -- ability to intercept every GraphQL request, inspect HTTP headers, and modify the GraphQL `ExecutionInput` or `ExecutionResult`.
-   Boot starter -- put it all together into a runnable application.

Beyond that we started looking at key aspects such as security, testing, and metrics.

### [](#security)Security

The URL for a GraphQL endpoint is easy to secure as usual. For more fine-grained security, applications can use Spring Security annotations on data retrieval methods. This requires Spring Security context to propagate to data retrieval methods, and while GraphQL Java is [neutral to threads](https://www.graphql-java.com/blog/threads/), components in the execution can themselves be asynchronous and cause a switch of threads.

This lead us to add support for context propagation from the Web framework level, through the GraphQL engine, and to data fetching components. This includes both `ThreadLocal` context and Reactor `Context` for Spring MVC and WebFlux applications respectively. After those features are in place, Spring Security works without the need for any further specialized integration.

The [webmvc-http](https://github.com/spring-projects/spring-graphql/tree/main/samples/webmvc-http) and the [webflux-security](https://github.com/spring-projects/spring-graphql/tree/main/samples/webflux-security) samples demonstrate the use of Spring Security.

### [](#exception-handling)Exception Handling

Spring GraphQL enables applications to create multiple, independent `GraphQlExceptionResolver` components to resolve exceptions to GraphQL errors for inclusion in the GraphQL response. It also provides an `ErrorType` type to use to classify errors with common categories such as `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, or `INTERNAL_ERROR` by default.

### [](#testing)Testing

You can test GraphQL requests using [WebTestClient](https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#webtestclient), just send and receive JSON. However, GraphQL specific details make this approach more cumbersome than it should be.

This is why Spring GraphQL includes `WebGraphQlTester` that defines a workflow for testing GraphQL requests. It provides the following benefits:

-   Verify GraphQL responses are 200 (OK).
-   Verify no unexpected errors under the "errors" key in the response.
-   Decode under the "data" key in the response.
-   Use JsonPath to decode different parts of the response.
-   Test subscriptions.

All [samples](https://github.com/spring-projects/spring-graphql/tree/main/samples) use the `GraphQlTester`.

### [](#metrics)Metrics

When the starter `spring-boot-starter-actuator` is present, metrics for GraphQL requests are collected, including request and `DataFetcher`execution timers, and an error counter.

### [](#querydsl-integration)Querydsl Integration

Querydsl provides a flexible and typesafe approach to express query predicates. Spring GraphQL builds on the Spring Data [Querydsl extension](https://docs.spring.io/spring-data/commons/docs/current/reference/html/#core.extensions) to make it easy to create a Querydsl backed `DataFetcher`. It prepares a Querydsl `Predicate` from GraphQL request parameters, and uses it to fetch data and that works for JPA, MongoDB, and LDAP.

The [webmvc-http](https://github.com/spring-projects/spring-graphql/tree/main/samples/webmvc-http) sample uses Querydsl.

### [](#schema-first-vs-object-first)Schema-First vs Object-First

GraphQL provides a schema language that helps clients to create valid requests, enables the GraphiQL UI editor, promotes a common vocabulary across teams, and so on. It also brings up the age old schema vs object-first development dilemma.

Our take is that schema-first development should be preferred. It facilitates a conversation among people of technical and non-technical background, it helps with tooling, it makes it easier to track changes, and so on. There is also no one-for-one mapping between GraphQL schema and Java types.

That said there is room for code generation too, to get started, for clients to create queries, and so on. Frameworks like [Netflix DGS](https://netflix.github.io/dgs/generating-code-from-schema/) have excellent support for this that can be used with Spring GraphQL.

### [](#roadmap-and-feedback)Roadmap and Feedback

We intend to have a 2nd milestone before [SpringOne](https://springone.io/), September 2-3. We have a number of [issues for M2](https://github.com/spring-projects/spring-graphql/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0.0-M2) in the queue already from early feedback, including support for a GraphQL client, BatchLoader registrations, file uploads, and more.

The milestone phase will continue until after Spring Boot 2.6 in November, at which point the Boot starter is scheduled to move into the Spring Boot repository, for inclusion in Boot 2.7.

We aim to have stable APIs and enter an RC phase late this year. To get there, we need your feedback. Please, give it a try, and create an issue, or comment under existing issues in our [issue tracker](https://github.com/spring-projects/spring-graphql/issues).

### [](#resources)Resources

For more details on Spring GraphQL features, please check the [reference documentation](https://github.com/spring-projects/spring-graphql#documentation).

The GraphQL Java and Spring teams will present jointly at this year's [SpringOne](https://springone.io) conference, which is once again free and online for a second straight year. Please, register to attend our talk and to interact with speakers and attendees.
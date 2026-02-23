---
title: Spring for GraphQL 1.0 Milestone 6 Released
source: https://spring.io/blog/2022/03/22/spring-for-graphql-1-0-milestone-6-released
scraped: 2026-02-23T12:47:31.458Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  March 22, 2022 | 0 Comments
---

# Spring for GraphQL 1.0 Milestone 6 Released

_Engineering | Rossen Stoyanchev |  March 22, 2022 | 0 Comments_

On behalf of everyone involved, I'm pleased to announce the availability of the sixth and final milestone of Spring for GraphQL on the way to 1.0. Our next stop is RC1 in 4 weeks, followed by the GA on May 17.

### [](#graphql-client)GraphQL Client

A GraphQL client is something we identified as a goal quite early on. It's issue number 10 from 336 at present in the issue tracker, but we viewed testing support as higher priority and so the [GraphQL Tester](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#testing) came first and has been available from the start.

The Tester did prove valuable and popular, but we knew we had to fully explore the client before 1.0 as the two are closely related but have slightly different perspectives, and we wanted to make sure they're aligned with each other.

A second point is that the Tester has supported testing subscriptions on the server side, but not over WebSocket. This was important to explore since unlike HTTP where one GraphQL request maps to one HTTP request, in Websocket, many GraphQL requests share the same connection which is a fundamentally different mode of operation. For example the WebSocket transport needs to connect transparently when a request is made, ensure a single, shared connection, manage its lifecycle, and as a long lived connection, provide controls for starting and stopping.

I'm happy to say that milestone 6 includes a GraphQL Client. It supports single response requests (queries and mutations) over HTTP, and subscriptions along with queries and mutations over WebSocket.

Some example usage:

```Java
CopyString document = "{" +
        "  project(slug:\"spring-framework\") {" +
        "   name" +
        "   releases {" +
        "     version" +
        "   }"+
        "  }" +
        "}";

Mono<Project> projectMono = graphQlClient.document(document)
        .retrieve("project")
        .toEntity(Project.class);
```

The response data is decoded to a `Project`. The request document can also be stored in a file and referred to by a simple name (e.g. "project"), or you can create it through a code generated request such as the `GraphQLQueryRequest` from [Netflix DGS](https://netflix.github.io/dgs/generating-code-from-schema/#generating-client-apis).

Some example usage for a subscription:

```Java
CopyFlux<String> projectFlux = client.document("subscription { projects { name } }")
        .retrieveSubscription("projects")
        .toEntity(Project.class);
```

There is lots more to discover. Please, see the new [Client section](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#client) in the reference documentation.

### [](#graphql-tester)GraphQL Tester

The GraphQL Tester has been updated to align with the new client. The two share the underlying contract for a GraphQL transport, and as a result the Tester now also supports WebSocket.

Some parts of the API have changed, in part to align with the client, but also for other reasons such as to use correct terminology and avoid overloaded use of `query` among others. See [this issue](https://github.com/spring-projects/spring-graphql/issues/310) and links for more details.

One noteworthy API change is the use of a dedicated type to represent a GraphQL error which also exposes the error path as a "." separated String (e.g. "project.name") which makes it quite easy to check expected field errors via String comparison.

The choice for inspecting response data at a given JSON path have also been narrowed down to provide more guidance and focus on what matters. These include the `hasValue`, `isNull`, and `doesNotExist` for a field, and that's in addition to the option to decode to a higher level object for further assertion.

### [](#spring-security)Spring Security

Spring Security users will be familiar with `@AuthenticationPincipal` annotation, which you can now use on method parameter of a `@SchemaMapping` method in a data controller. This provides access to the `Principal` from Spring Security's authentication.

### [](#argument-binding)Argument Binding

So far you've been able to use `@Argument` to bind a specific argument onto an object of your choice. You can now use `@Arguments` to bind the full arguments map onto an object.

A GraphQL argument can be a complex input type with nested objects or lists of nested objects. The argument binding feature supports mapping this onto a matching Java object structure, including support for constructor and property initialization, along with type conversion for scalar values. This makes it a challenge to work with conversion and other initialization errors that may occur at any level.

Argument binding now raises `BindException` with all accumulated errors. The binding algorithm now does not give up at the fist error, but continues and accumulates as many errors as possible. Each error contains a `field` property that is a "." separate path to the argument where the error occurred.

### [](#api-changes)API Changes

This release includes a number of API changes. In most cases those changes should be straight forward to address, and not difficult to address. Much of those have been driven by the introduction of the client to ensure symmetry and consistent naming between client and server.

This is expected to be the last such major round of changes. The RC1 release should be fairly quite in terms of backwards compatible changes and the APIs stable thereafter.

### [](#boot-starter)Boot Starter

The Spring for GraphqL Boot starter which now lives in Spring Boot proper has followed all the changes. The latest Spring Boot 2.7 snapshots are up-to-date and 2.7 M3 release is due this week on Thursday.

### [](#community)Community

Last but not least, thanks for the continued feedback and discussions in the Spring for GraphQL issue tracker. We really appreciate it as it makes the project stronger and better!
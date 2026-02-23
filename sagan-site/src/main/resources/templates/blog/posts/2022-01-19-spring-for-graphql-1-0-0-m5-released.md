---
title: Spring for GraphQL 1.0.0-M5 Released
source: https://spring.io/blog/2022/01/19/spring-for-graphql-1-0-0-m5-released
scraped: 2026-02-23T12:55:15.864Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  January 19, 2022 | 0 Comments
---

# Spring for GraphQL 1.0.0-M5 Released

_Releases | Brian Clozel |  January 19, 2022 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring for GraphQL `1.0.0-M5` is now available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

The M5 release is a quick follow-on after the feature-rich [M4 release](https://spring.io/blog/2021/12/14/spring-graphql-1-0-0-m4-released) from December. The main goal for M5 was to move the Boot starter out of the Spring GraphQL repository and into Spring Boot proper, ahead of the first Spring Boot 2.7 milestone this Thursday. In addition to that, as always, there was plenty of feedback leading to a number of refinements and fixes.

### [](#spring-boot-graphql-starter)Spring Boot GraphQL Starter

The GraphQL starter has moved out of the Spring for GraphQL project repository and into the Spring Boot repository, from where it will be made available in [the upcoming 2.7.0-M1 release](https://github.com/spring-projects/spring-boot/milestone/235). Here is the [GraphQL section](https://docs.spring.io/spring-boot/docs/2.7.x-SNAPSHOT/reference/html/web.html#web.graphql) in the Spring Boot docs.

To make the experience easier, the starter is now also available on start.spring.io - [try out this link to create your own GraphQL application](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.7.0-SNAPSHOT&packaging=jar&jvmVersion=11&groupId=com.example&artifactId=graphql-sample&name=graphql-sample&description=Demo%20project%20for%20Spring%20for%20GraphQL&packageName=com.example.graphql.sample&dependencies=graphql)!

### [](#web-interception)Web Interception

`WebInterceptor` instances intercept GraphQL over HTTP or over WebSocket requests. It allows getting information about the HTTP request or WebSocket handshake and to customize the `ExecutionInput` and `ExecutionResult`.

This is useful for common use cases with GraphQL such as:

-   fetching data from the HTTP request and adding it to the `GraphQLContext`.
-   getting information from the `GraphQLContext` after the request and exposing an HTTP response header.

In this release, the `WebInput` and `WebOutput` types, which have been available from the beginning, have been reviewed and refactored a bit to make them easier to use. The specific goal was to ensure easy access to the `GraphQLContext` for both inbound and for outbound interception. So you can now do the following:

```java
Copypublic class CustomHeaderWebInterceptor implements WebInterceptor {

	@Override
	public Mono<WebOutput> intercept(WebInput input, WebInterceptorChain chain) {
		return chain.next(input).doOnNext(output -> {
			GraphQLContext context = output.getExecutionInput().getGraphQLContext();
			String value = context.get("...");
			webOutput.getResponseHeaders().set("Custom-Header", value);
		});
	}
}
```

### [](#executionid)ExecutionId

On the topic of web interception, it is now also easier to set the `ExecutionId` for the GraphQL request from a `WebInterceptor`.

In GraphQL Java, it is possible to tag each request with a unique `ExecutionId`, which by default is a UUID. In Spring for GraphQL, we're hooking in a web transport layer id, for example [WebFlux requestId](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#webflux-logging-id) which could make it easier to correlate log messages with the Web transport.

However, we've also made changes to make it easier to customize the `ExecutionId` through a `WebInterceptor` and it's now also possible to configure your own `ExecutionIdProvider` in `graphq.GraphQL` that would override the default id used in Spring GraphQL.

### [](#querydsl-and-query-by-example-auto-registration)Querydsl and Query By Example Auto-Registration

This release improves how auto-registration is performed for Querydsl and Query by Example for `@GraphQlRepository` annotated, Spring Data repositories. The root of the challenge is that auto-registration should apply only if there isn't a `DataFetcher` registered for that field and there are multiple ways to register those, as well as to decorate them, as some 3rd libraries do, and that can interfere with the auto-registration.

In this milestone, we have switched from using a Schema `TypeVisitor` to a `WiringFactory` for auto-registration. This should provide a more stable mechanism that works better in a range of scenarios and alongside other libraries.

If you want to learn more about Querydsl and Query by Example support, please check the [documentation](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#data).

### [](#graphiql-websocket-support)GraphiQL WebSocket support

Spring for GraphQL ships with [a simple GraphiQL integration](https://github.com/graphql/graphiql#graphiql); this tool is not only useful at development time to craft queries and test an API we're building, but also a nice way to explore an API for client developers.

While we think that for more specific needs, applications should build their own page, we've improved our default experience to include WebSocket support. You can now test subscriptions over WebSocket in the GraphiQL UI!

### [](#more)More

More [improvements and fixes made their way into their release](https://github.com/spring-projects/spring-graphql/milestone/6?closed=1) and they're available right now in the new Spring for GraphQL 1.0.0-M5 release from the Spring Milestone repository.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, you can [get started with Spring GraphQL](https://docs.spring.io/spring-graphql/docs/1.0.0-M4/reference/html/#boot-graphql) and [raise issues on our GitHub project](https://github.com/spring-projects/spring-graphql/issues). If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/docs/1.0.0-M5/reference/html/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
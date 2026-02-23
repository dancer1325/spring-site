---
title: Spring for GraphQL 1.4 M1 Released
source: https://spring.io/blog/2025/03/18/spring-for-graphql-1-4-m1-released
scraped: 2026-02-23T07:41:58.314Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  March 18, 2025 | 0 Comments
---

# Spring for GraphQL 1.4 M1 Released

_Releases | Brian Clozel |  March 18, 2025 | 0 Comments_

On behalf of the Spring for GraphQL team, I am pleased to announce the availability of our first 1.4 milestone.

## [](#aligning-with-the-graphql-over-http-specification)Aligning with the GraphQL over HTTP specification

The [GraphQL over HTTP draft specification](https://graphql.github.io/graphql-over-http/draft/) is making good progress, so we have decided to fully align with it for our 1.4 release. Previous versions of Spring for GraphQL already supported the official `"application/graphql-response+json"`, and it has been our default response media type for a while now.

Usually, GraphQL HTTP clients should expect 4xx/5xx HTTP responses if the server is unavailable, security credentials are missing or if the request body is not valid JSON. The remaining gap with this new specification was about the HTTP response status behavior in case of complete GraphQL engine failures. With recent changes, "application/graphql-response+json" responses will also use 4xx statuses if the GraphQL document sent by the client cannot be parsed or is considered invalid by the GraphQL engine. We are keeping the former behavior when clients request the `"application/json"` media type.

This change is a step towards a better understanding of GraphQL exchanges by platforms and tools in production, using the HTTP response status. This does not replace the need for dedicated GraphQL metrics and traces. Spring for GraphQL has [outstanding observability support already](https://docs.spring.io/spring-graphql/reference/observability.html) and plans on extending it with [DataLoader instrumentation](https://github.com/spring-projects/spring-graphql/issues/1034) soon.

## [](#new-transport-features)New Transport features

In addition to supporting the GraphQL over HTTP spec, we keep on improving our transport support. This new milestone brings performance improvements for Servlet-based applications, keep-alive for subscriptions over Server Sent Events and global HTTP timeout support with [the new `WebGraphQlInterceptor`](https://docs.spring.io/spring-graphql/reference/1.4/request-execution.html#execution.timeout).

## [](#better-federation-support)Better Federation support

Spring for GraphQL upgrades to Apollo GraphQL Federation 5.3.0 and refines our Federation support. We know support `DataLoader` arguments for `@EntityMapping` methods; this has been requested by GraphQL Java Kickstart developers migrating to our stack.

Also, our schema inspection feature now detects and reports federated entities not covered by any `@EntityMapping` method. This gives you the confidence that your entire schema is implemented by the application.

## [](#next-steps)Next steps

Please, give the 1.4 M1 release a try via [https://repo.spring.io/milestone](https://repo.spring.io/milestone), and provide us with feedback at our [issue tracker](https://github.com/spring-projects/spring-graphql/issues)! Now is the time to suggest improvements as we are targeting an official release in May along with Spring Boot 3.5.0.
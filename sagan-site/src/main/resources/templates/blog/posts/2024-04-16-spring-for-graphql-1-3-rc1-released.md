---
title: Spring for GraphQL 1.3 RC1 Released
source: https://spring.io/blog/2024/04/16/spring-for-graphql-1-3-rc1-released
scraped: 2026-02-23T08:41:19.442Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rossen Stoyanchev |  April 16, 2024 | 0 Comments
---

# Spring for GraphQL 1.3 RC1 Released

_Releases | Rossen Stoyanchev |  April 16, 2024 | 0 Comments_

On behalf of the Spring for GraphQL team, I am pleased to announce the availability of 1.3 RC1. This post describes the release. For more on other upcoming features in 1.3, see the [1.3 M1 blog post](https://spring.io/blog/2024/02/21/spring-for-graphql-1-3-m1-released).

## [](#graphql-java-22)GraphQL Java 22

The 1.3 release candidate builds on GraphQL Java 22, released earlier today. GraphQL Java 22 includes a lot of new features including major performance improvements, experimental support for the up and coming [Defer and Stream Directives](https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md) addition to the GraphQL spec, and much more.

The release includes breaking changes too, and this is a good time to experiment in your environment. See the [GraphQL Java 22 release page](https://github.com/graphql-java/graphql-java/releases/tag/v22.0) for more details.

## [](#schema-inspection)Schema Inspection

The schema inspection report on startup has proven to be a popular feature. However, as it depends on controller method signatures to be able to match schema to Java type, it did not fully inspect schema interface and union types because in such cases the controller method return type does not provide enough information about actual types at runtime.

The 1.3 release candidate adds support for inspecting interfaces and unions, which depending on the exact naming convention, can transparently discover Java types that correspond to interface implementing and union member types. If necessary, [there are options to customize](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/request-execution.html#execution.graphqlsource.schema-mapping-inspection-unions-interfaces) this to help the inspection.

Schema inspection has also been enhanced to detect and report mismatches between `@Argument` controller method parameters and field arguments declared in the schema.

## [](#schema-interface-mapping)Schema Interface Mapping

If you use schema interfaces, you would have run into the need to repeat mappings for the same field once for every implementing object.

The 1.3 release candidate adds support for mapping to schema interface fields by making those repeated registrations transparently unless they already exist. This works for both [@SchemaMapping](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/controllers.html#controllers.schema-mapping.interfaces) and for [@BatchMapping](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/controllers.html#controllers.batch-mapping.interfaces) methods.

## [](#batch-loading-with-entitymapping)Batch Loading with `@EntityMapping`

1.3 M1 added federation support to load federated entities through `@EntityMapping` annotated, controller methods. Thanks to early feedback, we've enhanced this with a batch mode where an `@EntityMapping` method can return all entities for a given type. See the updated [Federation section](https://docs.spring.io/spring-graphql/reference/1.3-SNAPSHOT/federation.html) in the documentation.

## [](#websocket-keep-alive)WebSocket Keep-Alive

WebSocket transports now support sending keep-alive PING messages at regular intervals if no other messages have been sent. On the server side, this is enabled through the Spring Boot property `spring.graphql.websocket.keep-alive`. On the client side, this is enabled through the client builder.

## [](#jackson-codec-for-graphql-vs-other-endpoints)Jackson Codec for GraphQL vs Other Endpoints

It is now possible to configure a Jackson codec for a GraphQL endpoint separate from the one used for HTTP and web endpoints. This can be important to render GraphQL responses as needed (e.g. with `null` values) without causing side effects for regular HTTP endpoints.

For the list of all changes, see the [v1.3.0-RC1 release](https://github.com/spring-projects/spring-graphql/releases/tag/v1.3.0-RC1) page.

## [](#netflix-dgs)Netflix DGS

We continue to work closely with the DGS team on an integration that enables a common foundation for both frameworks to run on. The DGS team has now made the integration available for general use, and outlined a roadmap.

Please, see the [announcement blog post](https://netflixtechblog.medium.com/a-tale-of-two-frameworks-the-domain-graph-service-framework-meets-spring-graphql-f8237f09c389) and Josh's [Bootiful Podcast](https://spring.io/blog/2024/04/04/a-bootiful-podcast-netflixs-paul-bakker-and-kavitha-srinivasan-on-scaling) with Paul Bakker and Kavitha Srinivasan is also worth watching.

## [](#conclusion)Conclusion

Next up is the GA release on May 21. As always, your feedback is vital and much appreciated! Please, give the release a try and let us know how it works.

A week after the GA release is the 2024 edition of the [Spring I/O conference](https://2024.springio.net/) on May 30-31 where we have a [dedicated session](https://2024.springio.net/sessions/graphql-java-and-spring-the-latest-features/) for GraphQL Java 22 and Spring for GraphQL 1.3. I look forward to seeing those who are planning to attend. There are only a few tickets left!
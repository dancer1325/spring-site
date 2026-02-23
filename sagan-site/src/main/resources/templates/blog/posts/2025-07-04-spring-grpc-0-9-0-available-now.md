---
title: Spring gRPC 0.9.0 available now
source: https://spring.io/blog/2025/07/04/spring-grpc-0-9-0-available-now
scraped: 2026-02-23T07:36:38.088Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  July 04, 2025 | 0 Comments
---

# Spring gRPC 0.9.0 available now

_Releases | Dave Syer |  July 04, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I'm happy to announce that Spring gRPC `0.9.0` has been released and is now available from Maven Central. We are still planning to have a 1.0.0 release around the same time as Spring Boot 4.0.0.

The main changes in this release are

-   Upgrade to Spring Boot 3.5.
-   `StubFactory` contract changes: the "supports" method is now a static method (it is called before an instance is created).
-   Removed `GrpcClientFactoryCustomizer` in favour of `GrpcChannelBuilderCustomizer`.
-   Added ability to filter interceptors in in-process gRPC clients.
-   Added ability to filter global interceptors and service definitions - easy to do for `InProcessGrpcServer` and possible to do for `NettyGrpcServer` by registering a customizer.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the open [issues](https://github.com/spring-projects-experimental/spring-grpc/issues). If you have general questions, please ask on Stack Overflow using the [`spring-grpc` tag](https://stackoverflow.com/tags/spring-grpc).

[GitHub](https://github.com/spring-projects-experimental/spring-grpc) | [Issues](https://github.com/spring-projects-experimental/spring-grpc/issues) | [Documentation](https://docs.spring.io/spring-grpc/reference/) | [Stack Overflow](https://stackoverflow.com/tags/spring-grpc)
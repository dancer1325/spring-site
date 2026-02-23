---
title: Spring for GraphQL 1.0 Release
source: https://spring.io/blog/2022/05/19/spring-for-graphql-1-0-release
scraped: 2026-02-23T12:40:45.745Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  May 19, 2022 | 5 Comments
---

# Spring for GraphQL 1.0 Release

_Engineering | Rossen Stoyanchev |  May 19, 2022 | 5 Comments_

![](https://raw.githubusercontent.com/spring-projects/spring-graphql/main/spring-graphql-docs/src/docs/spring-graphql.svg) On behalf of the Spring for GraphQL team and every contributor, it is my pleasure to announce the [1.0 GA release](https://github.com/spring-projects/spring-graphql/releases/tag/v1.0.0). It's been 10 months since the project was [announced](https://spring.io/blog/2021/07/06/hello-spring-graphql) and under 2 years since the [first commit](https://github.com/spring-projects/spring-graphql/commit/6b4aeb074e6ac14cb92d4211f13e7376f71684e0), unremarkably called "first commit". The project began with the modest goal to replace the (now archived) minimal [GraphQL Java Spring](https://github.com/graphql-java/graphql-java-spring) integration, but has since moved significantly beyond through community feedback and collaboration across Spring Boot, Spring Framework, Spring Data, and Spring Security.

The following are highlights from the release:

-   Annotation-based programming model for data fetchers
-   Data binding from input arguments with validation
-   Field-level security through annotations on data `@Controller` methods
-   Server handlers and interception over HTTP, WebSocket, and RSocket
-   [Querydsl](http://www.querydsl.com/) and [Query by Example](https://docs.spring.io/spring-data/commons/docs/current/reference/html/#query-by-example) repositories as data fetchers
-   Batch loading support
-   Client for executing over HTTP, WebSocket, and RSocket
-   Test support with HTTP, WebSocket, RSocket, or directly, without a client
-   GraphiQL page and schema printing page

Due to release today, Spring Boot 2.7 adds a Spring for GraphQL starter with auto-config goodness to declare GraphQL endpoints, GraphiQL and schema print pages, properties, callback interfaces, test support, and more. Use [Spring Initializer](https://start.spring.io/) to create a GraphQL application.

We've already spotted some wonderful resources from the community:

-   [GraphQL Petclinic](https://github.com/spring-petclinic/spring-petclinic-graphql)
-   comprehensive [blog](https://www.danvega.dev/blog/2022/05/17/spring-for-graphql/), auspiciously timed by [Dan Vega](https://twitter.com/therealdanvega)
-   excellent batch loading [video tutorial](https://twitter.com/nilshartmann/status/1519198358556057600) by [Nils Hartman](https://twitter.com/nilshartmann)
-   [book announcement](https://twitter.com/graphql_java/status/1523793861356953600) from GraphQL Java founder [Andreas Marek](https://twitter.com/andimarek), we are looking forward to this one!
-   it is also *rumored*, the inimitable [Josh Long](https://joshlong.com/) is putting the finishing touches on a multipart [Spring Tips](https://joshlong.com/#youtube) video series featuring Andreas Marek and one more guest. Stay tuned on this site.

Looking forward to next week when [Spring I/O](https://2022.springio.net/), a unique conference with a strong focus on community and technical content, resumes after a 2 year hiatus. It gives us the first opportunity to present this project after its GA release and have direct interactions. GraphQL coverage features in the keynote and in a dedicated session.

As always, if you've taken the time to report an issue, provide feedback, test, or participate in discussions, contributing thoughts and ideas, thank you! Every little bit helps to make an open-source project stronger.
---
title: Spring for GraphQL 1.4 RC1 Released
source: https://spring.io/blog/2025/04/17/spring-for-graphql-1-4-rc1-released
scraped: 2026-02-23T07:42:02.710Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  April 17, 2025 | 0 Comments
---

# Spring for GraphQL 1.4 RC1 Released

_Releases | Brian Clozel |  April 17, 2025 | 0 Comments_

On behalf of the Spring for GraphQL team, I am pleased to announce the availability of 1.4.0-RC1, our last stop before the generally available release. In case you missed it, [1.4.0-M1 already shipped lots of new features and improvements](https://spring.io/blog/2025/03/18/spring-for-graphql-1-4-m1-released).

You can read the [full changelog for 1.4.0-RC1](https://github.com/spring-projects/spring-graphql/releases/tag/v1.4.0-RC1) and [the upgrade notes on our wiki](https://github.com/spring-projects/spring-graphql/wiki/Spring-for-GraphQL-1.4).

## [](#dataloader-observations)DataLoader observations

The Spring for GraphQL instrumentation creates Micrometer Observations for GraphQL requests and `DataFetcher` operations. Some data fetching operations are relying on [batch loading calls](https://docs.spring.io/spring-graphql/reference/controllers.html#controllers.batch-mapping) to avoid the "N+1 problem". In previous generations, one would not see the difference between a "full" data fetching operation and one that simply delegates to `DataLoader` for loading entries in a batch operation.

We added a [new `"graphql.dataloader"` observation](https://docs.spring.io/spring-graphql/reference/1.4-SNAPSHOT/observability.html#observability.server.dataloader) that measures data loading operations. `graphql.datafetcher` observations are not recorded anymore for such operations. With this change, recorded traces are much more precise as we clearly see when the "N+1 problem" happens for a given GraphQL request: "N data fetching operations" vs. "a single batch loading operation".

## [](#transport-improvements)Transport improvements

When a transport client (for example, an HTTP client) closes the connection early, the cancellation signal is now propagated to data fetchers. This was not the case previously, and data fetchers were completing their operations even if the client was gone.

From now on, reactive data fetchers operations will be cancelled in-flight and further data fetching calls (blocking or reactive) will be avoided. This is done for you automatically and should save server resources in such cases. This [inspired a feature request in graphql-java](https://github.com/graphql-java/graphql-java/issues/3879), and we're looking forward to using it in Spring for GraphQL.

## [](#next-steps)Next steps

Spring Boot 3.5.0-RC1 ships next week, so this will be the best way to try new features and [suggest feedback](https://github.com/spring-projects/spring-graphql/issues) before the official release.
---
title: Spring for GraphQL 1.0.5, 1.1.6, 1.2.3 released
source: https://spring.io/blog/2023/09/19/spring-for-graphql-1-0-5-1-1-6-1-2-3-released
scraped: 2026-02-23T09:08:44.803Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  September 19, 2023 | 0 Comments
---

# Spring for GraphQL 1.0.5, 1.1.6, 1.2.3 released

_Releases | Brian Clozel |  September 19, 2023 | 0 Comments_

> These maintenance releases fix the newly published ["CVE-2023-34047: Exposure of data and identity to wrong session in Spring for GraphQL"](https://spring.io/security/cve-2023-34047) - please upgrade at your earliest convenience

> Update: we have just released [1.0.6](https://github.com/spring-projects/spring-graphql/releases/tag/v1.0.6) and [1.1.7](https://github.com/spring-projects/spring-graphql/releases/tag/v1.1.7) to address a missing backport. This backport is not related to the CVE fix released earlier today.

I'm pleased to announce that Spring for GraphQL 1.0.6, 1.1.6 and 1.2.3 are now available on Maven Central. With this triple maintenance release ships with many bug fixes and upgrades and are drop-in replacements for your current version in production.

The 1.0.5 release includes [7 fixes and documentation improvements](https://github.com/spring-projects/spring-graphql/releases/tag/v1.0.5). This version will be shipped with Spring Boot 2.7.16, [to be released later this week](https://calendar.spring.io/).

The 1.1.6 release includes [12 fixes and documentation improvements](https://github.com/spring-projects/spring-graphql/releases/tag/v1.1.6). This version will be shipped with Spring Boot 3.0.11, [to be released later this week](https://calendar.spring.io/).

Finally, the 1.2.3 release includes [24 fixes and documentation improvements](https://github.com/spring-projects/spring-graphql/releases/tag/v1.2.3). This version will be shipped with Spring Boot 3.1.4, [to be released later this week](https://calendar.spring.io/).

### [](#spring-for-graphql-13)Spring for GraphQL 1.3

The Spring Boot team is currently working on the 3.2 minor release due in November. Spring Boot 3.2 will remain on the current 1.2.x branch of Spring for GraphQL, but upgrade to GraphQL Java 21.

Spring for GraphQL 1.3 will join the next Spring Boot 3.3 release train in May, 2024. There are [a few requests in our backlog right now](https://github.com/spring-projects/spring-graphql/milestone/29) and we expect to have more added along the way. In addition, we have began collaborating with the [the DGS team](https://netflix.github.io/dgs/) on a closer integration between the two frameworks. Stay tuned for more details!

Note that OSS support for 1.2.x is extended to 2024-11-30.

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/reference) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)
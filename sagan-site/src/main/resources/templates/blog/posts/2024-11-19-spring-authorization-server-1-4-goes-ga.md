---
title: Spring Authorization Server 1.4 goes GA
source: https://spring.io/blog/2024/11/19/spring-authorization-server-1-4-goes-ga
scraped: 2026-02-23T08:06:08.132Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Joe Grandja |  November 19, 2024 | 0 Comments
---

# Spring Authorization Server 1.4 goes GA

_Releases | Joe Grandja |  November 19, 2024 | 0 Comments_

On behalf of the team and everyone who has contributed, it is my pleasure to announce the release of Spring Authorization Server 1.4.

The 1.4 release contains a few noteworthy new features:

-   Simplified configuring authorization server using `HttpSecurity.with()` [(gh-1725)](https://github.com/spring-projects/spring-authorization-server/pull/1725)
-   Support for OpenID Connect 1.0 `prompt=none` parameter [(gh-501)](https://github.com/spring-projects/spring-authorization-server/issues/501)
-   Ability to customize validation of OpenID Connect 1.0 RP-Initiated Logout Requests [(gh-1723)](https://github.com/spring-projects/spring-authorization-server/pull/1723)
-   Ability to customize success handling of OpenID Connect 1.0 RP-Initiated Logout Requests [(gh-1244)](https://github.com/spring-projects/spring-authorization-server/issues/1244)
-   Added [How-to guide](https://docs.spring.io/spring-authorization-server/reference/guides/how-to-redis.html) demonstrating how to implement the core services with Redis

To get started using Spring Authorization Server, see the [Getting Started](https://docs.spring.io/spring-authorization-server/reference/getting-started.html) chapter of the reference documentation and the [samples](https://github.com/spring-projects/spring-authorization-server/tree/main/samples) to become familiar with setup and configuration.

[Project Page](https://spring.io/projects/spring-authorization-server) | [GitHub Issues](https://github.com/spring-projects/spring-authorization-server/issues) | [Project Board](https://github.com/orgs/spring-projects/projects/8/views/21)
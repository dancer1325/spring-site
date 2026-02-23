---
title: Spring Authorization Server 0.1.0 available now
source: https://spring.io/blog/2021/02/11/spring-authorization-server-0-1-0-available-now
scraped: 2026-02-23T13:32:17.079Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Joe Grandja |  February 12, 2021 | 6 Comments
---

# Spring Authorization Server 0.1.0 available now

_Releases | Joe Grandja |  February 12, 2021 | 6 Comments_

On behalf of the team and everyone who has contributed, it is my pleasure to announce the general availability of Spring Authorization Server 0.1.0.

You can download it from [repo.spring.io](https://repo.spring.io/release/) and Maven Central by using the module coordinates:

```
Copycompile 'org.springframework.security.experimental:spring-security-oauth2-authorization-server:0.1.0'
```

For additional details on this new project, see the [initial announcement](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server) and [project page](https://github.com/spring-projects-experimental/spring-authorization-server).

The main features delivered in this release are:

-   OpenID Connect Core 1.0 — [Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)
    
-   OpenID Connect Discovery 1.0 — [OpenID Provider Configuration](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)
    
-   JSON Web Token (JWT) headers and claims customizer
    

See the [release notes](https://github.com/spring-projects-experimental/spring-authorization-server/releases/tag/0.1.0) for complete details.

To get started using Spring Authorization Server, see the [sample](https://github.com/spring-projects-experimental/spring-authorization-server/tree/master/samples/boot/oauth2-integration) to become familiar with setup and configuration.

We would love to gather your feedback as we strive to improve and build upon this release.

[Project Page](https://github.com/spring-projects-experimental/spring-authorization-server) | [GitHub Issues](https://github.com/spring-projects-experimental/spring-authorization-server/issues) | [ZenHub Board](https://app.zenhub.com/workspaces/authorization-server-5e8f3182b5e8f5841bfc4902/board?repos=248032165)
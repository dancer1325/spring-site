---
title: Spring Authorization Server 0.1.2 available now
source: https://spring.io/blog/2021/07/09/spring-authorization-server-0-1-2-available-now
scraped: 2026-02-23T13:19:14.763Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Joe Grandja |  July 09, 2021 | 1 Comment
---

# Spring Authorization Server 0.1.2 available now

_Releases | Joe Grandja |  July 09, 2021 | 1 Comment_

On behalf of the team and everyone who has contributed, it is my pleasure to announce the general availability of Spring Authorization Server 0.1.2.

You can download it from Maven Central by using the module coordinates:

```
Copycompile 'org.springframework.security.experimental:spring-security-oauth2-authorization-server:0.1.2'
```

For additional details on this new project, see the [initial announcement](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server) and [project page](https://github.com/spring-projects-experimental/spring-authorization-server).

The main features delivered in this release are:

-   Ability to configure a custom Authorization Consent page ([gh-283](https://github.com/spring-projects-experimental/spring-authorization-server/issues/283))
    
-   JDBC implementation of `RegisteredClientRepository` ([gh-265](https://github.com/spring-projects-experimental/spring-authorization-server/issues/265)), `OAuth2AuthorizationService` ([gh-245](https://github.com/spring-projects-experimental/spring-authorization-server/issues/245)) and `OAuth2AuthorizationConsentService` ([gh-313](https://github.com/spring-projects-experimental/spring-authorization-server/issues/313))
    
-   Ability to configure the Authorization Endpoint ([gh-342](https://github.com/spring-projects-experimental/spring-authorization-server/issues/342))
    
-   Ability to configure the Token Endpoint ([gh-319](https://github.com/spring-projects-experimental/spring-authorization-server/issues/319))
    

See the [release notes](https://github.com/spring-projects-experimental/spring-authorization-server/releases/tag/0.1.2) for complete details.

To get started using Spring Authorization Server, see the [sample](https://github.com/spring-projects-experimental/spring-authorization-server/tree/main/samples/boot/oauth2-integration) to become familiar with setup and configuration.

We would love to gather your feedback as we strive to improve and build upon this release.

[Project Page](https://github.com/spring-projects-experimental/spring-authorization-server) | [GitHub Issues](https://github.com/spring-projects-experimental/spring-authorization-server/issues) | [ZenHub Board](https://app.zenhub.com/workspaces/authorization-server-5e8f3182b5e8f5841bfc4902/board?repos=248032165)
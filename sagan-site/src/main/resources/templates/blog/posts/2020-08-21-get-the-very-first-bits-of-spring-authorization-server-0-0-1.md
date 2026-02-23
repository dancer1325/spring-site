---
title: Get the very first bits of Spring Authorization Server 0.0.1 !
source: https://spring.io/blog/2020/08/21/get-the-very-first-bits-of-spring-authorization-server-0-0-1
scraped: 2026-02-23T13:50:34.647Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Joe Grandja |  August 21, 2020 | 9 Comments
---

# Get the very first bits of Spring Authorization Server 0.0.1 !

_Releases | Joe Grandja |  August 21, 2020 | 9 Comments_

On behalf of the team and everyone who has contributed, we are very excited to deliver the very first bits of Spring Authorization Server in the 0.0.1 release!

You can download it from [repo.spring.io](https://repo.spring.io/release/) and Maven Central by using the module coordinates:

```
Copycompile 'org.springframework.security.experimental:spring-security-oauth2-authorization-server:0.0.1'
```

For additional details on this new project, see the [initial announcement](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server) and [project page](https://github.com/spring-projects-experimental/spring-authorization-server).

The main features delivered in this initial release are:

-   OAuth 2.0 Authorization Code Grant — [RFC 6749](https://tools.ietf.org/html/rfc6749#section-4.1)
    
-   OAuth 2.0 Client Credentials Grant — [RFC 6749](https://tools.ietf.org/html/rfc6749#section-4.4)
    
-   JSON Web Token (JWT) — [RFC 7519](https://tools.ietf.org/html/rfc7519)
    
-   JSON Web Signature (JWS) — [RFC 7515](https://tools.ietf.org/html/rfc7515)
    
-   JSON Web Key (JWK) — [RFC 7517](https://tools.ietf.org/html/rfc7517)
    
-   Key Management for providing key(s) when signing a JWT (JWS)
    

See the [release notes](https://github.com/spring-projects-experimental/spring-authorization-server/releases/tag/0.0.1) for complete details.

To get started using Spring Authorization Server, see the [sample](https://github.com/spring-projects-experimental/spring-authorization-server/tree/master/samples/boot/oauth2-integration) to become familiar with setup and configuration.

We would love to gather your feedback as we strive to improve and build upon this initial release.

[Project Page](https://github.com/spring-projects-experimental/spring-authorization-server) | [GitHub Issues](https://github.com/spring-projects-experimental/spring-authorization-server/issues) | [ZenHub Board](https://app.zenhub.com/workspaces/authorization-server-5e8f3182b5e8f5841bfc4902/board?repos=248032165)
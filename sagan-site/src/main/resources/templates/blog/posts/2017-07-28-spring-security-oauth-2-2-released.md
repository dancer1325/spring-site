---
title: Spring Security OAuth 2.2 Released
source: https://spring.io/blog/2017/07/28/spring-security-oauth-2-2-released
scraped: 2026-02-23T16:25:11.708Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Joe Grandja |  July 28, 2017 | 0 Comments
---

# Spring Security OAuth 2.2 Released

_Releases | Joe Grandja |  July 28, 2017 | 0 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security OAuth 2.2.0.RELEASE.

The [2.2.0.RELEASE](https://github.com/spring-projects/spring-security-oauth/milestone/27?closed=1) includes the following new features:

-   `JwtClaimsSetVerifier` that provides the capability of verifying the claim(s) contained in a JWT Claims Set.
    
-   `IssuerClaimVerifier` that verifies the Issuer (iss) claim contained in the JWT Claims Set.
    
-   `DelegatingJwtClaimsSetVerifier` that simply delegates claims verification to it’s internal list of `JwtClaimsSetVerifier`(s).
    
-   `ProviderDiscoveryClient` that is capable of discovering provider configuration information as defined by the [OpenID Connect Discovery 1.0](http://openid.net/specs/openid-connect-discovery-1_0.html) specification.
    
-   `JwkTokenStore` now supports multiple JWK Set URL’s.
    
-   The ability to supply a custom `AccessTokenConverter` to `JwkTokenStore`.
    

This release also includes a small number of bug fixes and minor enhancements.

[Project Page](http://projects.spring.io/spring-security-oauth/) | [GitHub](https://github.com/spring-projects/spring-security-oauth/) | [Documentation](http://projects.spring.io/spring-security-oauth/docs/Home.html) | [Help](http://stackoverflow.com/questions/tagged/spring-security-oauth2)
---
title: Spring Security OAuth 2.0.4.RELEASE Available Now
source: https://spring.io/blog/2014/11/11/spring-security-oauth-2-0-4-release-available-now
scraped: 2026-02-23T22:08:31.772Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  November 11, 2014 | 2 Comments
---

# Spring Security OAuth 2.0.4.RELEASE Available Now

_Releases | Dave Syer |  November 11, 2014 | 2 Comments_

[Spring Security OAuth](http://projects.spring.io/spring-security-oauth/) 2.0.4.RELEASE is available now in the usual repositories. It's a bug fix release, so upgrading is recommended, but there is also a small set of new features:

-   The `OAuth2Request` (and hence `OAuth2Authentication`) can now be

queried explicitly to find the grant type for the associated token. If the token is being refreshed the grant type in the `OAuth2Request` presented to a `TokenEnhancer` is the original grant type, not "refresh\_token".

-   The client authorities are exposed in the "/check\_token" endpoint
    
-   Password grants are more flexible and open to extension because both client and server can add additional parameters to the request. A custom `AuthenticationManager` on the server side should still expect a `UsernamePasswordAuthenticationToken`, but the additional parameters will be available in the `AuthenticationDetails`. Multi-factor authentication for mobile devices could be implemented in this way, for instance.
    
-   Keystore support for JWT token signing and verification.
    

User provides a Resource and a password and can then lift the keys out of the store by name. As long as they are RSA keys they can be injected into a `JwtAccessTokenConverter` (using a new setter).

There were numerous community contributions to this release, for which many thanks!
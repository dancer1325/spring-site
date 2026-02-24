---
title: Spring Security OAuth 2.0.3 Available Now
source: https://spring.io/blog/2014/09/01/spring-security-oauth-2-0-3-available-now
scraped: 2026-02-23T22:16:46.034Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  September 01, 2014 | 0 Comments
---

# Spring Security OAuth 2.0.3 Available Now

_Releases | Dave Syer |  September 01, 2014 | 0 Comments_

Spring Security OAuth 2.0.3 is available now in all the usual Maven repositories. It's a bug fix release, nothing major, so upgrading from 2.0.x should be painless (and is recommended). Some people were having issues getting JWT tokens to work properly, and those should be fixed. The only noteworthy functional change is that Resource Servers (if configured with `@Configuration`) will now check the validity of the client and scopes before allowing access to protected resources. This means that client privileges can be revoked quickly, but may also lead to a performance penalty (so caching the `ClientDetailsService` results would be recommended).
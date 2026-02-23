---
title: Spring Security OAuth 2.0.6.RELEASE Available Now
source: https://spring.io/blog/2015/02/02/spring-security-oauth-2-0-6-release-available-now
scraped: 2026-02-23T21:57:55.244Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  February 02, 2015 | 0 Comments
---

# Spring Security OAuth 2.0.6.RELEASE Available Now

_Releases | Dave Syer |  February 02, 2015 | 0 Comments_

Spring Security OAuth 2.0.6.RELEASE is available now in the usual repositories. It's a bug fix release, and users of 2.0.5.RELEASE should upgrade. The only critical bug was for users of JWT with refresh tokens, and there were also some people experiencing double encoding of redirect uris, which is now fixed. Highlights of new features:

-   (Much requested) ability to have non-expiring refresh tokens with no customizations (just set the validity period to zero or less)
    
-   The /token endpoint only accepts POST requests by default
    
-   Resource servers do not accept cookie based authentication by default (you have to switch it on)
    
-   Resource server configuration has a few new options including the ability to inject custom error handlers
    

Thanks, as usual, go to the community for contributing code and ideas. It feels like the community is growing, and that's always good to see. Finally, watch out for a new blog on Angular JS with Spring Security and OAuth2 coming out soon here.
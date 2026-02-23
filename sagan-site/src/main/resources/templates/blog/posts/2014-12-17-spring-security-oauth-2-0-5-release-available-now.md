---
title: Spring Security OAuth 2.0.5.RELEASE Available Now
source: https://spring.io/blog/2014/12/17/spring-security-oauth-2-0-5-release-available-now
scraped: 2026-02-23T22:03:10.620Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  December 17, 2014 | 1 Comment
---

# Spring Security OAuth 2.0.5.RELEASE Available Now

_Releases | Dave Syer |  December 17, 2014 | 1 Comment_

Spring Security OAuth 2.0.5.RELEASE is available now in all the usual Maven repositories. This is a bugfix release but nothing critical. We recommend upgrading if you are having trouble with customizing the Java config, since most of the issues resolved relate to that (for instance it is much easier to customize the password encoder for client secrets). There is a small breaking change for anyone using the `AuthorizationServerEndpointsConfigurer` directly to configure a `ClientDetailsService` (it doesn't work that way, so you would be failing to configure it anyway).

For a range of samples using and displaying all the features of Spring Security OAuth please look in the github project (e.g. at the [integration tests](https://github.com/spring-projects/spring-security-oauth/tree/master/tests) or the [samples](https://github.com/spring-projects/spring-security-oauth/tree/master/samples)).
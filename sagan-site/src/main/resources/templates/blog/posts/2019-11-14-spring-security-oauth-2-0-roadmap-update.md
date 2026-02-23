---
title: Spring Security OAuth 2.0 Roadmap Update
source: https://spring.io/blog/2019/11/14/spring-security-oauth-2-0-roadmap-update
scraped: 2026-02-23T14:01:41.933Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Josh Cummings |  November 14, 2019 | 60 Comments
---

# Spring Security OAuth 2.0 Roadmap Update

_News | Josh Cummings |  November 14, 2019 | 60 Comments_

Note

See the latest announcement on [Announcing the Spring Authorization Server](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server). This post is a follow-up to [Next Generation OAuth 2.0 Support with Spring Security](https://spring.io/blog/2018/01/30/next-generation-oauth-2-0-support-with-spring-security)

## [](#current-state)[](#current-state)Current State

In the Spring Security 5.x release train, we’ve endeavored to replace and simplify the feature set found in the [Spring Security OAuth](https://spring.io/projects/spring-security-oauth) 2.x legacy project. In the process, we’ve also added numerous new features, including support for OpenID Connect 1.0.

We are pleased to announce that as of the 5.2 release, we are very close to [feature parity](https://github.com/spring-projects/spring-security/wiki/OAuth-2.0-Features-Matrix) with the client and resource server legacy support. What remains is quite minimal, and we fully anticipate announcing feature parity as part of the 5.3 release.

We would like to issue a special thank you to all those in the community who have brought Spring Security this far! We hope to see many more contributions from everyone down the road.

## [](#no-authorization-server-support)[](#no-authorization-server-support)No Authorization Server Support

In October 2012, [RFC 6749](https://tools.ietf.org/html/rfc6749), the OAuth 2.0 Authorization Framework, was published. Subsequently in May 2014, Spring Security OAuth released its 2.0.0 version with support for Authorization Server, Resource Server, and Client. This made a great deal of sense in the absence of OAuth 2.0 libraries and products.

Spring Security’s Authorization Server support was never a good fit. An Authorization Server requires a library to build a product. Spring Security, being a framework, is not in the business of building libraries or products. For example, we don’t have a JWT library, but instead we make [Nimbus](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk) easy to use. And we don’t maintain our own SAML IdP, CAS or LDAP products.

In 2019, there are plenty of both commercial and [open-source](https://www.keycloak.org/) authorization servers available. Thus, the Spring Security team has decided to no longer provide support for authorization servers.

**UPDATE**: We’d like to thank everyone for your feedback on the decision to not support Authorization Server. Due to this feedback and some internal discussions, we are taking another look at this decision. We’ll notify the community on any progress.

## [](#support-lifetime-for-spring-security-oauth-2x)[](#support-lifetime-for-spring-security-oauth-2-x)Support Lifetime for Spring Security OAuth 2.x

At the start of 2018, we [announced](https://spring.io/blog/2018/01/30/next-generation-oauth-2-0-support-with-spring-security) the Spring Security OAuth project is officially in maintenance mode. We’ve already discontinued support for 2.0.x, in line with Boot’s 1.x End-of-Life (EOL), as well as 2.1.x and 2.2.x. And our plan is to discontinue the remaining support in the near future.

The currently supported branches are 2.3.x and 2.4.x. The 2.3.x line will reach EOL in March 2020. We will support the 2.4.x line at least one year after reaching feature parity.

To that end, with the release of Spring Security 5.2, we are strongly encouraging users to [start migrating their legacy OAuth 2.0 client and resource server](https://github.com/spring-projects/spring-security/wiki/OAuth-2.0-Migration-Guide) applications to the new support in Spring Security 5.2.

## [](#up-next)[](#up-next)Up Next

We hope that you will continue with us on this exciting journey of making OAuth 2.0 easier to use in your Java applications. Please take a moment to check out what we currently have planned for the 5.3 release. We hope you will continue to provide feedback and hopefully a contribution or two!
---
title: Spring Security 6.5.0-RC1 Is Out!
source: https://spring.io/blog/2025/04/21/spring-security-6-5-0-RC1-is-out
scraped: 2026-02-23T07:46:24.449Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Cummings |  April 21, 2025 | 0 Comments
---

# Spring Security 6.5.0-RC1 Is Out!

_Releases | Josh Cummings |  April 21, 2025 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce the release candidate milestone for the final Spring Security 6 minor release.

Among a number of feature enhancements, there are some that we'd love your attention on as we prepare them for general availability:

## [](#core)Core

-   Complete Deprecation of `ConfigAttribute`, `SecurityConfig`, and other Access API components.

Specifically, please speak up if you are using any of [the ACL Access components](https://github.com/spring-projects/spring-security/commit/3aec6c2f6eec425624a1970a33f548ec9b4e4539) that were deprecated.

## [](#oauth-20)OAuth 2.0

-   Further refinements to DPoP support - [#16937](https://github.com/spring-projects/spring-security/issues/16937), [#16921](https://github.com/spring-projects/spring-security/issues/16921), and [#16900](https://github.com/spring-projects/spring-security/issues/16900)

## [](#saml-20)SAML 2.0

-   Simplified SAML 2.0 Response validation [(docs)](https://docs.spring.io/spring-security/reference/6.5/servlet/saml2/login/authentication.html#servlet-saml2login-opensamlauthenticationprovider-additionalvalidation), Assertion validation [(docs)](https://docs.spring.io/spring-security/reference/6.5/servlet/saml2/login/authentication.html#_performing_additional_assertion_validation), and Authentication conversion [(docs)](https://docs.spring.io/spring-security/reference/6.5/servlet/saml2/login/authentication.html#_converting_an_assertion_into_an_authentication)
-   A RelayState-based Authentication Request Repository - [#14793](https://github.com/spring-projects/spring-security/issues/14793)

## [](#web)Web

-   Further refinements to `PathPatternRequestMatcher` - [#16765](https://github.com/spring-projects/spring-security/issues/16765)
-   Support for PathPatten in WebSocket - [#16635](https://github.com/spring-projects/spring-security/pull/16635), [#16766](https://github.com/spring-projects/spring-security/issues/16766)
-   Improved integration between Spring MVC and `@AuthorizeReturnObject` - [#16059](https://github.com/spring-projects/spring-security/issues/16059)

This is in addition to features released [in previous milestones](https://spring.io/blog/2025/03/19/spring-security-6-5-0-M3-available-now), which you can read more about in our [What's New](https://docs.spring.io/spring-security/reference/6.5-SNAPSHOT/whats-new.html) section of the reference.

Also, since this is the target release for migrating from 6.x to 7.x, please also begin reviewing [the migration guide](https://docs.spring.io/spring-security/reference/6.5-SNAPSHOT/migration-7/index.html).

Please check [the changelog](https://github.com/spring-projects/spring-security/releases/tag/6.5.0-RC1) for more details.

[Project Page](https://spring.io/projects/spring-security/) | [GitHub](https://github.com/spring-projects/spring-security) | [Issues](https://github.com/spring-projects/spring-security/issues) | [Documentation](https://docs.spring.io/spring-security/reference/)
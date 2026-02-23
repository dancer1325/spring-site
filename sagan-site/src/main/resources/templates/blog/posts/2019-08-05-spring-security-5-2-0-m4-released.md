---
title: Spring Security 5.2.0.M4 Released
source: https://spring.io/blog/2019/08/05/spring-security-5-2-0-m4-released
scraped: 2026-02-23T14:40:27.947Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Filip Hanik |  August 05, 2019 | 0 Comments
---

# Spring Security 5.2.0.M4 Released

_Releases | Filip Hanik |  August 05, 2019 | 0 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.2.0.M4! You can find the complete details in the [changelog](https://github.com/spring-projects/spring-security/milestone/142?closed=1) and the highlights below:

## [](#oauth-20)[](#oauth-2-0)OAuth 2.0

##### [](#gh-6811-for-servlets---introduce-oauth2authorizedclient-managerprovider)[](#gh-6811-for-servlets-introduce-oauth2authorizedclient-managerprovider)[gh-6811 for Servlets](https://github.com/spring-projects/spring-security/pull/6845) - Introduce OAuth2AuthorizedClient Manager/Provider

##### [](#gh-6886---openid-connect-userinfo-not-fetched-for-custom-claims)[](#gh-6886-openid-connect-userinfo-not-fetched-for-custom-claims)[gh-6886](https://github.com/spring-projects/spring-security/issues/6886) - OpenID Connect Userinfo not fetched for custom claims

##### [](#gh-7033---add-resource-server-jwe-sample)[](#gh-7033-add-resource-server-jwe-sample)[gh-7033](https://github.com/spring-projects/spring-security/issues/7033) - Add Resource Server JWE Sample

##### [](#gh-7034---nimbus-jwt-decoders-should-not-force-signedjwt)[](#gh-7034-nimbus-jwt-decoders-should-not-force-signedjwt)[gh-7034](https://github.com/spring-projects/spring-security/issues/7034) - Nimbus Jwt decoders should not force SignedJWT

## [](#core)[](#core)Core

##### [](#gh-6506---add-generic-authenticationfilter)[](#gh-6506-add-generic-authenticationfilter)[gh-6506](https://github.com/spring-projects/spring-security/issues/6506) - Add Generic [`AuthenticationFilter`](https://github.com/spring-projects/spring-security/blob/f1187bdfc2c248291df9981bbbdb9f68d53e759c/web/src/main/java/org/springframework/security/web/authentication/AuthenticationFilter.java#L65-L86)

##### [](#gh-5300---allow-configuration-of-sessionauthenticationstrategy-for-csrf)[](#gh-5300-allow-configuration-of-sessionauthenticationstrategy-for-csrf)[gh-5300](https://github.com/spring-projects/spring-security/pull/7083) - Allow configuration of SessionAuthenticationStrategy for CSRF

##### [](#gh-5557---dsl-nested-builder-for-http-security)[](#gh-5557-dsl-nested-builder-for-http-security)[gh-5557](https://github.com/spring-projects/spring-security/issues/5557) - DSL nested builder for HTTP security

##### [](#gh-7082---add-chinese-traditional-localized-messages)[](#gh-7082-add-chinese-traditional-localized-messages)[gh-7082](https://github.com/spring-projects/spring-security/pull/7082) - Add Chinese Traditional localized messages

##### [](#gh-7042---allow-upgrading-between-different-bcrypt-encodings)[](#gh-7042-allow-upgrading-between-different-bcrypt-encodings)[gh-7042](https://github.com/spring-projects/spring-security/pull/7042) - Allow upgrading between different BCrypt encodings

##### [](#gh-7057---allow-upgrading-between-different-scrypt-encodings)[](#gh-7057-allow-upgrading-between-different-scrypt-encodings)[gh-7057](https://github.com/spring-projects/spring-security/pull/7057) - Allow upgrading between different SCrypt encodings

##### [](#from-previous-520m3-release---add-nohttp-to-build)[](#from-previous-5-2-0-m3-release-add-nohttp-to-build)From previous, 5.2.0.M3, release - Add nohttp to build

For more information about the nohttp project see this [blog post](https://spring.io/blog/2019/06/10/announcing-nohttp).

## [](#web)[](#web)Web

##### [](#gh-4310---added-hostname-features-to-stricthttpfirewall)[](#gh-4310-added-hostname-features-to-stricthttpfirewall)[gh-4310](https://github.com/spring-projects/spring-security/issues/4310) - Added Hostname Features to StrictHttpFirewall

##### [](#gh-7168---basic-authentication-case-sensitivity)[](#gh-7168-basic-authentication-case-sensitivity)[gh-7168](https://github.com/spring-projects/spring-security/issues/7163) - BASIC authentication case sensitivity

## [](#webflux)[](#webflux)WebFlux

##### [](#gh-7107---support-nested-builder-in-dsl-for-reactive-apps)[](#gh-7107-support-nested-builder-in-dsl-for-reactive-apps)[gh-7107](https://github.com/spring-projects/spring-security/issues/7107) - Support nested builder in DSL for reactive apps

##### [](#gh-7113---support-disabled-users)[](#gh-7113-support-disabled-users)[gh-7113](https://github.com/spring-projects/spring-security/issues/7113) - Support disabled users

## [](#dependencies-and-ci)[](#dependencies-and-ci)Dependencies and CI

##### [](#gh-7147---upgrade-external-dependencies)[](#gh-7147-upgrade-external-dependencies)[gh-7147](https://github.com/spring-projects/spring-security/pull/7147) - Upgrade external dependencies

##### [](#travis-ci---build-using-openjdk8-on-travis-ci)[](#travis-ci-build-using-openjdk8-on-travis-ci)[travis-ci](https://github.com/spring-projects/spring-security/pull/7147/commits/a8936189bea1a5726df35a75fd7a4501b44717d7) - Build using OpenJDK8 on Travis CI

[Project Site](http://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security/site/docs/5.2.0.M2/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)
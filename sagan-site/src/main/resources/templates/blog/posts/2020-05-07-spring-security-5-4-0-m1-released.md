---
title: Spring Security 5.4.0-M1 Released
source: https://spring.io/blog/2020/05/07/spring-security-5-4-0-m1-released
scraped: 2026-02-23T13:56:21.010Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eleftheria Stein-Kousathana |  May 07, 2020 | 0 Comments
---

# Spring Security 5.4.0-M1 Released

_Releases | Eleftheria Stein-Kousathana |  May 07, 2020 | 0 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.4.0-M1! You can find the complete details in the [release notes](https://github.com/spring-projects/spring-security/releases/tag/5.4.0-M1) and the highlights below:

## [](#oauth-20)[](#oauth-2-0)OAuth 2.0

##### [](#gh-8185---resource-server-configurers-pick-up-a-jwtauthenticationconverter-bean)[](#gh-8185-resource-server-configurers-pick-up-a-jwtauthenticationconverter-bean)[gh-8185](https://github.com/spring-projects/spring-security/issues/8185) - Resource Server configurers pick up a JwtAuthenticationConverter bean

##### [](#gh-8324---configure-authoritiesmapper-in-reactive-oauth2login)[](#gh-8324-configure-authoritiesmapper-in-reactive-oauth2login)[gh-8324](https://github.com/spring-projects/spring-security/issues/8324) - Configure AuthoritiesMapper in Reactive OAuth2Login

##### [](#gh-8324---validate-id-token-issuer)[](#gh-8324-validate-id-token-issuer)[gh-8324](https://github.com/spring-projects/spring-security/issues/8321) - Validate ID Token Issuer

##### [](#gh-8337---allow-custom-header-during-bearer-token-extraction)[](#gh-8337-allow-custom-header-during-bearer-token-extraction)[gh-8337](https://github.com/spring-projects/spring-security/issues/8337) - Allow custom header during bearer token extraction

##### [](#gh-8332---provide-possibility-to-use-custom-cache-to-store-jwk-set)[](#gh-8332-provide-possibility-to-use-custom-cache-to-store-jwk-set)[gh-8332](https://github.com/spring-projects/spring-security/pull/8332) - Provide possibility to use custom cache to store JWK Set

## [](#web)[](#web)Web

##### [](#gh-8033---add-server-request-cache-that-uses-cookie)[](#gh-8033-add-server-request-cache-that-uses-cookie)[gh-8033](https://github.com/spring-projects/spring-security/issues/8033) - Add server request cache that uses cookie

##### [](#gh-2693---transfer-sessions-max-inactive-interval-in-sessionfixationprotectionstrategy)[](#gh-2693-transfer-sessions-max-inactive-interval-in-sessionfixationprotectionstrategy)[gh-2693](https://github.com/spring-projects/spring-security/issues/2693) - Transfer session’s max inactive interval in SessionFixationProtectionStrategy

##### [](#gh-4183---switchuserfilter-vulnerable-to-csrf)[](#gh-4183-switchuserfilter-vulnerable-to-csrf)[gh-4183](https://github.com/spring-projects/spring-security/issues/4183) - SwitchUserFilter vulnerable to CSRF

## [](#docs)[](#docs)Docs

##### [](#gh-8391---documented-dependencies-for-opaque-resource-server)[](#gh-8391-documented-dependencies-for-opaque-resource-server)[gh-8391](https://github.com/spring-projects/spring-security/issues/8391) - Documented dependencies for opaque Resource Server

##### [](#gh-8182---add-figures-to-resource-server-docs)[](#gh-8182-add-figures-to-resource-server-docs)[gh-8182](https://github.com/spring-projects/spring-security/issues/8182) - Add Figures to Resource Server Docs

##### [](#gh-8110-gh-8077-and-gh-8074---document-oauth-20-xml-support)[](#gh-8110-gh-8077-and-gh-8074-document-oauth-2-0-xml-support)[gh-8110](https://github.com/spring-projects/spring-security/issues/8110), [gh-8077](https://github.com/spring-projects/spring-security/issues/8077) and [gh-8074](https://github.com/spring-projects/spring-security/issues/8074) - Document OAuth 2.0 XML support

##### [](#gh-8050---add-oauth-20-test-support-docs)[](#gh-8050-add-oauth-2-0-test-support-docs)[gh-8050](https://github.com/spring-projects/spring-security/issues/8050) - Add OAuth 2.0 Test Support Docs

## [](#kotlin)[](#kotlin)Kotlin

##### [](#gh-5558---idiomatic-kotlin-dsl-for-configuring-http-security)[](#gh-5558-idiomatic-kotlin-dsl-for-configuring-http-security)[gh-5558](https://github.com/spring-projects/spring-security/issues/5558) - Idiomatic Kotlin DSL for configuring HTTP security

## [](#crypto)[](#crypto)Crypto

##### [](#gh-8402---allow-creating-aesbytesencryptor-with-key)[](#gh-8402-allow-creating-aesbytesencryptor-with-key)[gh-8402](https://github.com/spring-projects/spring-security/issues/8402) - Allow creating AesBytesEncryptor with key

## [](#ldap)[](#ldap)LDAP

##### [](#gh-8393---flag-to-enable-searching-of-ldap-groups-on-subtrees)[](#gh-8393-flag-to-enable-searching-of-ldap-groups-on-subtrees)[gh-8393](https://github.com/spring-projects/spring-security/issues/8393) - Flag to enable searching of LDAP groups on subtrees

## [](#saml)[](#saml)SAML

##### [](#gh-8356---saml2authenticationrequestcontext-should-be-extendible)[](#gh-8356-saml2authenticationrequestcontext-should-be-extendible)[gh-8356](https://github.com/spring-projects/spring-security/issues/8356) - Saml2AuthenticationRequestContext should be extendible

[Project Site](http://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security/site/docs/5.4.0-M1/reference/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)
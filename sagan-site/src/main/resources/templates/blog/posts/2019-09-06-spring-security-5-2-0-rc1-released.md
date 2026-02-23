---
title: Spring Security 5.2.0.RC1 Released
source: https://spring.io/blog/2019/09/06/spring-security-5-2-0-rc1-released
scraped: 2026-02-23T14:37:15.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eleftheria Stein-Kousathana |  September 06, 2019 | 5 Comments
---

# Spring Security 5.2.0.RC1 Released

_Releases | Eleftheria Stein-Kousathana |  September 06, 2019 | 5 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.2.0.RC1! You can find the complete details in the [release notes](https://github.com/spring-projects/spring-security/releases/tag/5.2.0.RC1) and the highlights below:

## [](#rsocket)[](#rsocket)RSocket

##### [](#gh-7360---add-rsocket-support)[](#gh-7360-add-rsocket-support)[gh-7360](https://github.com/spring-projects/spring-security/issues/7360) - Add RSocket Support

## [](#saml)[](#saml)SAML

##### [](#gh-6019---add-saml-service-provider-support)[](#gh-6019-add-saml-service-provider-support)[gh-6019](https://github.com/spring-projects/spring-security/issues/6019) - Add SAML Service Provider Support

## [](#oauth-20)[](#oauth-2-0)OAuth 2.0

#### [](#resource-server)[](#resource-server)Resource server

##### [](#gh-7101---jwtgrantedauthoritiesconverter-allows-configuring-the-authority-prefix)[](#gh-7101-jwtgrantedauthoritiesconverter-allows-configuring-the-authority-prefix)[gh-7101](https://github.com/spring-projects/spring-security/issues/7101) - JwtGrantedAuthoritiesConverter allows configuring the authority prefix

##### [](#gh-7100---jwtgrantedauthoritiesconverter-allows-configuring-the-authorities-claim-name)[](#gh-7100-jwtgrantedauthoritiesconverter-allows-configuring-the-authorities-claim-name)[gh-7100](https://github.com/spring-projects/spring-security/issues/7100) - JwtGrantedAuthoritiesConverter allows configuring the authorities claim name

##### [](#gh-7345---opaque-token-introspector-returns-an-authenticated-principal)[](#gh-7345-opaque-token-introspector-returns-an-authenticated-principal)[gh-7345](https://github.com/spring-projects/spring-security/issues/7345) - Opaque Token Introspector returns an Authenticated Principal

##### [](#gh-7346---add-adapter-to-translate-jwt-to-bearertokenauthentication)[](#gh-7346-add-adapter-to-translate-jwt-to-bearertokenauthentication)[gh-7346](https://github.com/spring-projects/spring-security/issues/7346) - Add Adapter to Translate Jwt to BearerTokenAuthentication

##### [](#gh-5334-and-gh-7284---resource-server-supports-webclient-bearer-token-propagation)[](#gh-5334-and-gh-7284-resource-server-supports-webclient-bearer-token-propagation)[gh-5334](https://github.com/spring-projects/spring-security/issues/5334) and [gh-7284](https://github.com/spring-projects/spring-security/issues/7284) - Resource Server supports WebClient Bearer Token propagation

#### [](#client)[](#client)Client

##### [](#gh-7228---prevent-null-value-in-context-if-subscribe-was-invoked-outside-of-web-context)[](#gh-7228-prevent-null-value-in-context-if-subscribe-was-invoked-outside-of-web-context)[gh-7228](https://github.com/spring-projects/spring-security/issues/7228) - Prevent null value in Context if subscribe was invoked outside of Web Context

##### [](#gh-7114---allow-configurable-clock-in-oauth2authorizedclientprovider-implementations)[](#gh-7114-allow-configurable-clock-in-oauth2authorizedclientprovider-implementations)[gh-7114](https://github.com/spring-projects/spring-security/issues/7114) - Allow configurable Clock in OAuth2AuthorizedClientProvider implementations

##### [](#gh-7293---fix-webclient-memory-leaks)[](#gh-7293-fix-webclient-memory-leaks)[gh-7293](https://github.com/spring-projects/spring-security/issues/7293) - Fix WebClient Memory Leaks

##### [](#gh-7222---allow-setting-securitycontextrepository-for-reactive-oauth2-login)[](#gh-7222-allow-setting-securitycontextrepository-for-reactive-oauth2-login)[gh-7222](https://github.com/spring-projects/spring-security/issues/7222) - Allow setting securityContextRepository for reactive OAuth2 login

##### [](#gh-7051---allow-setting-authenticationfailurehandler-for-reactive-oauth2-login)[](#gh-7051-allow-setting-authenticationfailurehandler-for-reactive-oauth2-login)[gh-7051](https://github.com/spring-projects/spring-security/issues/7051) - Allow setting authenticationFailureHandler for reactive OAuth2 login

##### [](#gh-7232---oauth2loginconfigurer-discovers-oauth2userservice-beans)[](#gh-7232-oauth2loginconfigurer-discovers-oauth2userservice-beans)[gh-7232](https://github.com/spring-projects/spring-security/issues/7232) - OAuth2LoginConfigurer discovers OAuth2UserService beans

##### [](#gh-7339---defaultoauth2userservice-and-oidcuserservice-extract-authorities-from-scopes)[](#gh-7339-defaultoauth2userservice-and-oidcuserservice-extract-authorities-from-scopes)[gh-7339](https://github.com/spring-projects/spring-security/issues/7339) - DefaultOAuth2UserService and OidcUserService extract authorities from scopes

##### [](#gh-7122---oauth2authorizedclientmanager-works-outside-of-a-request)[](#gh-7122-oauth2authorizedclientmanager-works-outside-of-a-request)[gh-7122](https://github.com/spring-projects/spring-security/issues/7122) - OAuth2AuthorizedClientManager works outside of a request

##### [](#gh-6003---support-resource-owner-password-credentials-grant)[](#gh-6003-support-resource-owner-password-credentials-grant)[gh-6003](https://github.com/spring-projects/spring-security/issues/6003) - Support Resource Owner Password Credentials grant

#### [](#jose)[](#jose)JOSE

##### [](#gh-6883---jwt-decoding-supports-multiple-algorithms)[](#gh-6883-jwt-decoding-supports-multiple-algorithms)[gh-6883](https://github.com/spring-projects/spring-security/issues/6883) - JWT decoding supports multiple algorithms

##### [](#gh-7290---nimbusjwtdecoderjwksupport-supports-applicationjwk-setjson-accept-header)[](#gh-7290-nimbusjwtdecoderjwksupport-supports-applicationjwk-setjson-accept-header)[gh-7290](https://github.com/spring-projects/spring-security/issues/7290) - NimbusJwtDecoderJwkSupport supports "application/jwk-set+json" Accept header

## [](#core)[](#core)Core

##### [](#gh-7154---performance-enhancement-replace-internal-stream-usage-with-for-loops)[](#gh-7154-performance-enhancement-replace-internal-stream-usage-with-for-loops)[gh-7154](https://github.com/spring-projects/spring-security/issues/7154) - Performance enhancement: Replace internal Stream usage with for loops

##### [](#gh-7155---performance-enhancement-remove-internal-optional-usage-in-favor-of-null-checks)[](#gh-7155-performance-enhancement-remove-internal-optional-usage-in-favor-of-null-checks)[gh-7155](https://github.com/spring-projects/spring-security/issues/7155) - Performance enhancement: Remove internal Optional usage in favor of null checks

##### [](#gh-5354---add-argon2passwordencoder)[](#gh-5354-add-argon2passwordencoder)[gh-5354](https://github.com/spring-projects/spring-security/issues/5354) - Add Argon2PasswordEncoder

##### [](#gh-7287---add-catalan-localization-messages)[](#gh-7287-add-catalan-localization-messages)[gh-7287](https://github.com/spring-projects/spring-security/issues/7287) - Add Catalan localization messages

## [](#web)[](#web)Web

##### [](#gh-7249---authentication-mechanisms-default-their-serversecuritycontextrepository)[](#gh-7249-authentication-mechanisms-default-their-serversecuritycontextrepository)[gh-7249](https://github.com/spring-projects/spring-security/issues/7249) - Authentication mechanisms default their ServerSecurityContextRepository

##### [](#gh-7166---expire-multiple-sessions-if-they-exceed-maximum-number-allowed)[](#gh-7166-expire-multiple-sessions-if-they-exceed-maximum-number-allowed)[gh-7166](https://github.com/spring-projects/spring-security/issues/7166) - Expire multiple sessions if they exceed maximum number allowed

##### [](#gh-7060---ignore-multipart-requests-in-session-request-cache-matcher)[](#gh-7060-ignore-multipart-requests-in-session-request-cache-matcher)[gh-7060](https://github.com/spring-projects/spring-security/issues/7060) - Ignore multipart requests in session request cache matcher

## [](#ldap)[](#ldap)LDAP

##### [](#gh-7236---expose-getport-in-apachedscontainer)[](#gh-7236-expose-getport-in-apachedscontainer)[gh-7236](https://github.com/spring-projects/spring-security/issues/7236) - Expose getPort in ApacheDsContainer

[Project Site](http://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security/site/docs/5.2.0.RC1/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)
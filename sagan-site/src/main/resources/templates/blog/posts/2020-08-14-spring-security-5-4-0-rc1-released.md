---
title: Spring Security 5.4.0-RC1 Released
source: https://spring.io/blog/2020/08/14/spring-security-5-4-0-rc1-released
scraped: 2026-02-23T13:51:28.797Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eleftheria Stein-Kousathana |  August 14, 2020 | 2 Comments
---

# Spring Security 5.4.0-RC1 Released

_Releases | Eleftheria Stein-Kousathana |  August 14, 2020 | 2 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.4.0-RC1! You can find the complete details in the [release notes](https://github.com/spring-projects/spring-security/releases/tag/5.4.0-RC1) and the highlights below:

## [](#oauth-20)[](#oauth-2-0)OAuth 2.0

##### [](#gh-8903---allow-for-custom-clientregistrationclientauthenticationmethod)[](#gh-8903-allow-for-custom-clientregistration-clientauthenticationmethod)[gh-8903](https://github.com/spring-projects/spring-security/issues/8903) - Allow for custom ClientRegistration.clientAuthenticationMethod

##### [](#gh-6489---simplify-retrieving-introspection-specific-attributes)[](#gh-6489-simplify-retrieving-introspection-specific-attributes)[gh-6489](https://github.com/spring-projects/spring-security/issues/6489) - Simplify retrieving Introspection-specific attributes

## [](#web)[](#web)Web

##### [](#gh-8804---remove-need-for-websecurityconfigureradapter)[](#gh-8804-remove-need-for-websecurityconfigureradapter)[gh-8804](https://github.com/spring-projects/spring-security/issues/8804) - Remove need for WebSecurityConfigurerAdapter

##### [](#gh-8599---reactive-switchuserwebfilter-for-user-impersonation)[](#gh-8599-reactive-switchuserwebfilter-for-user-impersonation)[gh-8599](https://github.com/spring-projects/spring-security/issues/8599) - Reactive SwitchUserWebFilter for user impersonation

##### [](#gh-8854---add-authenticationconverterserverwebexchangematcher)[](#gh-8854-add-authenticationconverterserverwebexchangematcher)[gh-8854](https://github.com/spring-projects/spring-security/pull/8854) - Add AuthenticationConverterServerWebExchangeMatcher

## [](#kotlin)[](#kotlin)Kotlin

##### [](#gh-8783---support-custom-filter-in-server-kotlin-dsl)[](#gh-8783-support-custom-filter-in-server-kotlin-dsl)[gh-8783](https://github.com/spring-projects/spring-security/issues/8783) - Support custom filter in Server Kotlin DSL

## [](#saml-20)[](#saml-2-0)SAML 2.0

##### [](#gh-8887---add-relyingpartyregistrationresolver)[](#gh-8887-add-relyingpartyregistrationresolver)[gh-8887](https://github.com/spring-projects/spring-security/issues/8887) - Add RelyingPartyRegistrationResolver

##### [](#gh-8484---add-metadata-based-relyingpartyregistration-construction)[](#gh-8484-add-metadata-based-relyingpartyregistration-construction)[gh-8484](https://github.com/spring-projects/spring-security/issues/8484) - Add Metadata-based RelyingPartyRegistration construction

##### [](#gh-8693---support-saml-20-sp-metadata-endpoints)[](#gh-8693-support-saml-2-0-sp-metadata-endpoints)[gh-8693](https://github.com/spring-projects/spring-security/issues/8693) - Support SAML 2.0 SP Metadata Endpoints

##### [](#gh-8141---add-authnrequest-customization-support)[](#gh-8141-add-authnrequest-customization-support)[gh-8141](https://github.com/spring-projects/spring-security/issues/8141) - Add AuthnRequest Customization Support

##### [](#gh-8769---add-conditionvalidator-configuration-support)[](#gh-8769-add-conditionvalidator-configuration-support)[gh-8769](https://github.com/spring-projects/spring-security/issues/8769) - Add ConditionValidator Configuration Support

## [](#deprecation-notice)[](#deprecation-notice)Deprecation Notice

Note that some APIs in OAuth 2.0 and SAML 2.0 were deprecated in this release:

##### [](#gh-8908---deprecate-customusertypesoauth2userservice)[](#gh-8908-deprecate-customusertypesoauth2userservice)[gh-8908](https://github.com/spring-projects/spring-security/issues/8908) - Deprecate CustomUserTypesOAuth2UserService

##### [](#gh-8906---deprecate-clientregistrationredirecturitemplate)[](#gh-8906-deprecate-clientregistration-redirecturitemplate)[gh-8906](https://github.com/spring-projects/spring-security/issues/8906) - Deprecate ClientRegistration.redirectUriTemplate

##### [](#gh-8902---deprecate-implicitgrantconfigurer)[](#gh-8902-deprecate-implicitgrantconfigurer)[gh-8902](https://github.com/spring-projects/spring-security/issues/8902) - Deprecate ImplicitGrantConfigurer

##### [](#gh-8845---saml2authenticationtoken-should-take-a-relyingpartyregistration)[](#gh-8845-saml2authenticationtoken-should-take-a-relyingpartyregistration)[gh-8845](https://github.com/spring-projects/spring-security/issues/8845) - Saml2AuthenticationToken should take a RelyingPartyRegistration

##### [](#gh-8788---relyingpartyregistration-credentials-should-be-split-by-party)[](#gh-8788-relyingpartyregistration-credentials-should-be-split-by-party)[gh-8788](https://github.com/spring-projects/spring-security/issues/8788) - RelyingPartyRegistration Credentials Should Be Split by Party

##### [](#gh-8777---relyingpartyregistration-should-use-metadata-spec-language)[](#gh-8777-relyingpartyregistration-should-use-metadata-spec-language)[gh-8777](https://github.com/spring-projects/spring-security/issues/8777) - RelyingPartyRegistration should use metadata spec language

[Project Site](http://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security/site/docs/5.4.0-RC1/reference/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)
---
title: Spring Security 5.2.0.M3 Released
source: https://spring.io/blog/2019/06/17/spring-security-5-2-0-m3-released
scraped: 2026-02-23T14:44:30.493Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eleftheria Stein-Kousathana |  June 17, 2019 | 1 Comment
---

# Spring Security 5.2.0.M3 Released

_Releases | Eleftheria Stein-Kousathana |  June 17, 2019 | 1 Comment_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.2.0.M3! You can find the complete details in the [changelog](https://github.com/spring-projects/spring-security/milestone/141?closed=1) and the highlights below:

## [](#oauth-20)[](#oauth-2-0)OAuth 2.0

##### [](#gh-6727---support-for-multi-tenancy-in-reactive-resource-server)[](#gh-6727-support-for-multi-tenancy-in-reactive-resource-server)[gh-6727](https://github.com/spring-projects/spring-security/issues/6727) - Support for Multi-tenancy in Reactive Resource Server

##### [](#gh-6798---support-for-custom-parameters-in-opaque-token)[](#gh-6798-support-for-custom-parameters-in-opaque-token)[gh-6798](https://github.com/spring-projects/spring-security/issues/6798) - Support for custom parameters in Opaque Token

##### [](#gh-6239---finer-variables-for-oauth2-redirecturitemplate-expansion)[](#gh-6239-finer-variables-for-oauth2-redirecturitemplate-expansion)[gh-6239](https://github.com/spring-projects/spring-security/issues/6239) - Finer variables for OAuth2 `redirectUriTemplate` expansion

##### [](#gh-6863---oauth2-login-has-configurable-authentication-success-handler)[](#gh-6863-oauth2-login-has-configurable-authentication-success-handler)[gh-6863](https://github.com/spring-projects/spring-security/issues/6863) - OAuth2 login has configurable authentication success handler

##### [](#gh-6832--gh-6849---jwt-and-opaque-token-have-configurable-authentication-manager)[](#gh-6832-gh-6849-jwt-and-opaque-token-have-configurable-authentication-manager)[gh-6832](https://github.com/spring-projects/spring-security/issues/6832) & [gh-6849](https://github.com/spring-projects/spring-security/issues/6849) - JWT and opaque token have configurable authentication manager

##### [](#gh-6634---support-for-mock-jwt-in-tests)[](#gh-6634-support-for-mock-jwt-in-tests)[gh-6634](https://github.com/spring-projects/spring-security/issues/6634) - Support for mock JWT in tests

Similar to other request post processors, `jwt()` can be used to establish a `SecurityContext` with a `JwtAuthenticationToken`.

```
CopymockMvc.perform(get("/")
       .with(jwt(jwt -> jwt.claim("scope", "message:read"))));
```

## [](#core)[](#core)Core

##### [](#gh-6819---add-nohttp-to-build)[](#gh-6819-add-nohttp-to-build)[gh-6819](https://github.com/spring-projects/spring-security/issues/6819) - Add nohttp to build

For more information about the nohttp project see this [blog post](https://spring.io/blog/2019/06/10/announcing-nohttp).

##### [](#gh-4469---support-for-path-variables-in-message-expressions)[](#gh-4469-support-for-path-variables-in-message-expressions)[gh-4469](https://github.com/spring-projects/spring-security/issues/4469) - Support for path variables in message expressions

##### [](#gh-6818---configuration-classes-are-proxy-less-and-support-proxybeanmethodsfalse)[](#gh-6818-configuration-classes-are-proxy-less-and-support-proxybeanmethodsfalse)[gh-6818](https://github.com/spring-projects/spring-security/issues/6818) - Configuration classes are proxy-less and support `proxyBeanMethods=false`

This feature includes breaking changes to the classes `AbstractSecurityWebSocketMessageBrokerConfigurer` and `GlobalMethodSecurityConfiguration`.

In order to accomodate these changes, users extending `AbstractSecurityWebSocketMessageBrokerConfigurer`, who override the method `inboundChannelSecurity` will need to update the method signature to match the following.

```
Copy@Bean
public ChannelSecurityInterceptor inboundChannelSecurity(
    MessageSecurityMetadataSource messageSecurityMetadataSource) {
// implementation
}
```

Similarly, users extending `GlobalMethodSecurityConfiguration` who override the method `methodSecurityInterceptor` will need to update the method signature to match the following.

```
Copy@Bean
public MethodInterceptor methodSecurityInterceptor(
    MethodSecurityMetadataSource methodSecurityMetadataSource) {
// implementation
}
```

## [](#web)[](#web)Web

##### [](#gh-5038---support-for-x509-reactive)[](#gh-5038-support-for-x509-reactive)[gh-5038](https://github.com/spring-projects/spring-security/issues/5038) - Support for X509 Reactive

[Project Site](http://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security/site/docs/5.2.0.M2/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)
---
title: Spring Security 5.2.0.M2 Released
source: https://spring.io/blog/2019/04/16/spring-security-5-2-0-m2-released
scraped: 2026-02-23T14:50:56.745Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Cummings |  April 16, 2019 | 2 Comments
---

# Spring Security 5.2.0.M2 Released

_Releases | Josh Cummings |  April 16, 2019 | 2 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.2.0.M2! This release includes [100+ updates](https://github.com/spring-projects/spring-security/milestone/132?closed=1). You can find the highlights below:

## [](#oauth-20)[](#oauth-2-0)OAuth 2.0

##### [](#gh-6446---client-support-for-pkce)[](#a-href-https-github-com-spring-projects-spring-security-issues-6446-gh-6446-a-client-support-for-pkce)[gh-6446](https://github.com/spring-projects/spring-security/issues/6446) - Client Support for PKCE

[PKCE](https://tools.ietf.org/html/rfc7636) isn’t just for [native](https://tools.ietf.org/html/rfc8252) or [browser-based apps](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-01), but for any time we want to have a public client. Spring Security 5.2 introduces a secure way for backends to authenticate as public clients.

##### [](#gh-5350---openid-connect-rp-initiated-logout)[](#a-href-https-github-com-spring-projects-spring-security-issues-5350-gh-5350-a-openid-connect-rp-initiated-logout)[gh-5350](https://github.com/spring-projects/spring-security/issues/5350) - OpenID Connect RP-Initiated Logout

##### [](#gh-5465---ability-to-use-symmetric-keys-with-jwtdecoder)[](#a-href-https-github-com-spring-projects-spring-security-issues-5465-gh-5465-a-ability-to-use-symmetric-keys-with-code-jwtdecoder-code)[gh-5465](https://github.com/spring-projects/spring-security/issues/5465) - Ability to use symmetric keys with `JwtDecoder`

##### [](#gh-5397---ability-for-nimbusreactivejwtdecoder-to-take-a-custom-processor)[](#a-href-https-github-com-spring-projects-spring-security-issues-5937-gh-5397-a-ability-for-code-nimbusreactivejwtdecoder-code-to-take-a-custom-processor)[gh-5397](https://github.com/spring-projects/spring-security/issues/5937) - Ability for `NimbusReactiveJwtDecoder` to take a custom processor

##### [](#gh-6513--gh-5200---support-for-resource-server-token-introspection)[](#a-href-https-github-com-spring-projects-spring-security-issues-6513-gh-6513-a-a-href-https-github-com-spring-projects-spring-security-issues-5200-gh-5200-a-support-for-resource-server-token-introspection)[gh-6513](https://github.com/spring-projects/spring-security/issues/6513) & [gh-5200](https://github.com/spring-projects/spring-security/issues/5200) - Support for Resource Server Token Introspection

Resource Server now supports a second OAuth 2.0 token verification strategy: [Token Introspection](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2resourceserver-opaque). This is handy when a Resource Server wants to or must verify the token remotely.

##### [](#gh-5351---support-for-resource-server-multi-tenancy-servlet-only)[](#a-href-https-github-com-spring-projects-spring-security-issues-5351-gh-5351-a-support-for-resource-server-multi-tenancy-servlet-only)[gh-5351](https://github.com/spring-projects/spring-security/issues/5351) - Support for Resource Server Multi-tenancy (Servlet only)

With the introduction of `AuthenticationManagerResolver`, initial support for [multi-tenant Resource Servers](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2resourceserver-multitenancy) has arrived.

## [](#core)[](#core)Core

##### [](#gh-6494---converting-key-material-into-key-instances)[](#a-href-https-github-com-spring-projects-spring-security-issues-6494-gh-6494-a-converting-key-material-into-code-key-code-instances)[gh-6494](https://github.com/spring-projects/spring-security/issues/6494) - Converting key material into `Key` instances

Spring Security 5.2 simplifies converting X.509 and PKCS#8 key material into `RSAPublicKey` and `RSAPrivateKey` instances by registering `Converter` s to the `ConversionService` and `PropertyEditor` s to the `PropertyEditorRegistry`. You can see an example in the [Resource Server static key sample](https://github.com/spring-projects/spring-security/blob/master/samples/boot/oauth2resourceserver-static/src/main/java/sample/OAuth2ResourceServerSecurityConfiguration.java#L34).

##### [](#gh-6774---support-for-jdk-12)[](#a-href-https-github-com-spring-projects-spring-security-issues-6774-gh-6774-a-support-for-jdk-12)[gh-6774](https://github.com/spring-projects/spring-security/issues/6774) - Support for JDK 12

##### [](#gh-6722---introducing-authenticationmanagerresolver)[](#a-href-https-github-com-spring-projects-spring-security-issues-6722-gh-6722-a-introducing-code-authenticationmanagerresolver-code)[gh-6722](https://github.com/spring-projects/spring-security/issues/6722) - Introducing `AuthenticationManagerResolver`

##### [](#gh-6546---introducing-currentsecuritycontext-for-method-arguments)[](#a-href-https-github-com-spring-projects-spring-security-issues-6546-gh-6546-a-introducing-code-currentsecuritycontext-code-for-method-arguments)[gh-6546](https://github.com/spring-projects/spring-security/issues/6546) - Introducing `@CurrentSecurityContext` for method arguments

Like `@AuthenticationPrincipal` before it, `@CurrentSecurityContext` works with an argument resolver to retrieve aspects of the `SecurityContext`:

```
Copypublic String hello(@CurrentSecurityContext
        SecurityContext context) {
    return Optional.ofNullable(context.getAuthentication())
            .map(Authentication::getName).orElse("world");
}

// or

public String hello(@CurrentSecurityContext
        (expression="authentication.name") String name) {
    return Optional.ofNullable(name).orElse("world");
}
```

## [](#web)[](#web)Web

##### [](#gh-4187---support-for-the-clear-site-data-header)[](#a-href-https-github-com-spring-projects-spring-security-issues-4187-gh-4187-a-support-for-the-clear-site-data-header)[gh-4187](https://github.com/spring-projects/spring-security/issues/4187) - Support for the Clear-Site-Data header

##### [](#gh-6312---support-for-hsts-preload)[](#a-href-https-github-com-spring-projects-spring-security-issues-6312-gh-6312-a-support-for-hsts-preload)[gh-6312](https://github.com/spring-projects/spring-security/issues/6312) - Support for HSTS preload

##### [](#gh-6453---introducing-compositeheaderwriter-as-well-as-some-other-header-writing-cleanup)[](#a-href-https-github-com-spring-projects-spring-security-issues-6453-gh-6453-a-introducing-code-compositeheaderwriter-code-as-well-as-some-other-a-href-https-github-com-spring-projects-spring-security-issues-6454-header-writing-cleanup-a)[gh-6453](https://github.com/spring-projects/spring-security/issues/6453) - Introducing `CompositeHeaderWriter`, as well as some other [header-writing cleanup](https://github.com/spring-projects/spring-security/issues/6454).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security/site/docs/5.2.0.M2/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)
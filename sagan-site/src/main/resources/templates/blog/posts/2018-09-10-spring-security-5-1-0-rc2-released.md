---
title: Spring Security 5.1.0.RC2 Released
source: https://spring.io/blog/2018/09/10/spring-security-5-1-0-rc2-released
scraped: 2026-02-23T15:14:26.747Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Cummings |  September 10, 2018 | 0 Comments
---

# Spring Security 5.1.0.RC2 Released

_Releases | Josh Cummings |  September 10, 2018 | 0 Comments_

On behalf of the community I am pleased to announce the release of Spring Security 5.1.0.RC2. This release comes with [50+ tickets](https://github.com/spring-projects/spring-security/milestone/121?closed=1) closed.

As always we look forward to hearing your [feedback](https://github.com/spring-projects/spring-security/issues)! You can find the highlights below:

# [](#table-of-contents)[](#table-of-contents)Table of Contents

-   [Simplified DSL for OAuth2](#simplified-dsl-for-oauth2)
    
-   [WebClient Extensions](#webclient-extensions)
    
-   [Servlet Enhancements](#servlet-enhancements)
    
    -   [OAuth2](#oauth2)
        
        -   [Token Request Configuration](#token-request-configuration)
            
        -   [More Provider Configuration Metadata Available](#more-provider-configuration-metadata-available)
            
        -   [Resource Server Claims Mapping](#resource-server-claims-mapping)
            
        -   [RestOperations Support](#restoperations-support)
            
    -   [Other Improvements](#other-improvements)
        
        -   [X.509 Principal Extractor](#x-509-principal-extractor)
            
        -   [LDAP Custom Environment Variables](#ldap-custom-environment-variables)
            
-   [WebFlux Enhancements](#webflux-enhancements)
    
    -   [OAuth2 Resource Server](#oauth2-resource-server)
        
    -   [OAuth2 Client](#oauth2-client)
        
    -   [Redirect to Https](#redirect-to-https)
        
-   [Dependency Updates](#dependency-updates)
    

# [](#simplified-dsl-for-oauth2)[](#simplified-dsl-for-oauth2)Simplified DSL for OAuth2

In the beginning, the Spring Security DSL had two oauths:

```
Copyhttp
    .oauth2Login()...
```

and

```
Copyhttp
    .oauth2()
        .client()...
```

which made some sense, since one was an authentication mechanism, like `formLogin` and `openidLogin` and the others--`client`, `resourceServer`, and `authorizationServer`\--were a bit more like OAuth 2.0 personalities.

In the end, though, that separation felt like needless extra typing, so we resolved to flatten out the hierarchy, which means that, as of this release, we now have:

```
Copyhttp
    .oauth2Login()...
    .oauth2Client()...
    .oauth2ResourceServer()
```

There are no functionality or feature changes tied to this refactoring of the DSL, just less typing for you.

# [](#webclient-extensions)[](#webclient-extensions)WebClient Extensions

The team has been hard at work with WebClient, and we are excited to announce some new OAuth 2.0 WebClient extensions for both Servlet and WebFlux applications. These extensions make it easy to transmit OAuth 2.0 authorities seamlessly from machine to machine.

Read up on all the details in the [OAuth 2.0 Web Client master ticket](https://github.com/spring-projects/spring-security/issues/4921).

# [](#servlet-enhancements)[](#servlet-enhancements)Servlet Enhancements

## [](#oauth2)[](#oauth2)OAuth2

### [](#token-request-configuration)[](#token-request-configuration)Token Request Configuration

The first part of the OAuth 2.0 journey was spec compliance. This next release introduces much more support for configuring Spring Security to work with providers that extend or deviate from the spec.

For example, it’s now possible to [customize the token request made from a client to the authorization server](https://github.com/spring-projects/spring-security/issues/5466).

### [](#resource-server-claims-mapping)[](#resource-server-claims-mapping)Resource Server Claims Mapping

Along those same lines, Resource Server is shipping with support for [customizing the claim set](https://github.com/spring-projects/spring-security/issues/5223) that is parsed from incoming JWTs. This is handy when the application needs to add or remove a claim or needs to parse a claim in a custom way:

```
CopyNimbusJwtDecoderJwkSupport decoder = // ...
decoder.setClaimSetConverter(
    MappedJwtClaimSetConverter
        .withDefaults("custom-date", this::convertToInstant));
```

### [](#more-provider-configuration-metadata-available)[](#more-provider-configuration-metadata-available)More Provider Configuration Metadata Available

And the journey towards spec compliance also continues. In this release, support for collecting and providing [any metadata returned from the OIDC Provider Configuration endpoint](https://github.com/spring-projects/spring-security/pull/5729) was added.

Now, `ClientRegistration` ships with `getConfigurationMetadata` which sits alongside methods targeted at specific properties and returns the entire map of provider attributes.

### [](#restoperations-support)[](#restoperations-support)RestOperations Support

This release also ships with support for [complete customization of the HTTP request](https://github.com/spring-projects/spring-security/issues/5602) [to various](https://github.com/spring-projects/spring-security/issues/5600) [endpoints](https://github.com/spring-projects/spring-security/issues/5547).

This is handy for configuring timeouts, discovery, caching and otherwise taking full advantage of RestTemplate’s sophistication when communicating with an authorization server.

## [](#other-improvements)[](#other-improvements)Other Improvements

### [](#x509-principal-extractor)[](#x-509-principal-extractor)X.509 Principal Extractor

Support has also been added for [deriving the X.509 principal via a strategy](https://github.com/spring-projects/spring-security/issues/5771).

### [](#ldap-custom-environment-variables)[](#ldap-custom-environment-variables)LDAP Custom Environment Variables

And support was added for configuring [custom environment variables that inform the creation of an `LdapContext`](https://github.com/spring-projects/spring-security/pull/5674).

# [](#webflux-enhancements)[](#webflux-enhancements)WebFlux Enhancements

## [](#oauth2-resource-server)[](#oauth2-resource-server)OAuth2 Resource Server

Several features initially released for the Servlet-based Resource Server were added in RC2 on the WebFlux side. [The reactive](https://github.com/spring-projects/spring-security/issues/5650) [capabilities](https://github.com/spring-projects/spring-security/issues/5649) [are similar](https://github.com/spring-projects/spring-security/issues/5720), with a small but important exception.

In Spring Security WebFlux, it is more typical to have an authentication manager per request type. In this release, then, WebFlux ships with [authentication manager configuration for Resource Server](https://github.com/spring-projects/spring-security/issues/5750):

```
Copyhttp
    .oauth2ResourceServer()
        .authenticationManager(customAuthenticationManager())
```

This is helpful in situations where the application needs to do some custom conversion of the `Jwt` to a set of granted authorities.

## [](#oauth2-client)[](#oauth2-client)OAuth2 Client

The [`@RegisteredOAuth2AuthorizedClient` annotation now supports the client\_credentials grant](https://github.com/spring-projects/spring-security/issues/5733) in WebFlux.

## [](#redirect-to-https)[](#redirect-to-https)Redirect to Https

Last but not least, [https redirection support](https://github.com/spring-projects/spring-security/issues/5749) has been added to WebFlux and is accessible through `http.redirectToHttps()` or directly via the `HttpsRedirectWebFilter`.

# [](#dependency-updates)[](#dependency-updates)Dependency Updates

And we’ve updated our dependencies to be on the latest and greatest to ensure our transitive dependencies are up to date.

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.1.0.RC1/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)